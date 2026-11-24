import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim()
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim()
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim()

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ error: 'Spotify credentials not configured.' }, { status: 503 })
  }

  // Exchange refresh token for access token
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }).toString(),
    cache: 'no-store',
  })

  if (!tokenRes.ok) {
    const bodyText = await tokenRes.text()
    console.error('[NOWPLAYING] Token refresh failed:', tokenRes.status, bodyText)

    let isInvalidRefreshToken = false
    try {
      const errorData = JSON.parse(bodyText) as { error?: unknown; error_description?: unknown }
      isInvalidRefreshToken =
        errorData?.error === 'invalid_grant' ||
        (typeof errorData?.error_description === 'string' &&
          errorData.error_description.toLowerCase().includes('refresh token'))
    } catch {
      // Non-JSON error body from Spotify; fall back to generic auth error
    }

    if (isInvalidRefreshToken) {
      return NextResponse.json(
        {
          error:
            "Welp, Vishrut's Spotify refresh token expired again. Tell him to log back in so you can judge his music taste.",
        },
        { status: 503 },
      )
    }

    return NextResponse.json({ error: 'Failed to authenticate with Spotify.' }, { status: 502 })
  }

  const { access_token } = await tokenRes.json()

  if (!access_token) {
    console.error('[NOWPLAYING] Token response missing access_token')
    return NextResponse.json({ error: 'Failed to authenticate with Spotify.' }, { status: 502 })
  }

  // Try currently playing first
  const currentlyPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  })

  if (currentlyPlayingResponse.status === 200) {
    const data = await currentlyPlayingResponse.json()
    if (data?.item && Array.isArray(data.item.artists)) {
      return NextResponse.json({
        track: data.item.name,
        artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
        nowPlaying: Boolean(data.is_playing),
      })
    }
  } else if (!currentlyPlayingResponse.ok && currentlyPlayingResponse.status !== 204) {
    console.error(
      '[NOWPLAYING] Currently playing failed:',
      currentlyPlayingResponse.status,
      await currentlyPlayingResponse.text(),
    )
  }

  // Fall back to recently played
  const recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  })

  if (!recentlyPlayedResponse.ok) {
    console.error(
      '[NOWPLAYING] Recently played failed:',
      recentlyPlayedResponse.status,
      await recentlyPlayedResponse.text(),
    )
    return NextResponse.json({ error: 'Could not fetch Spotify data.' }, { status: 503 })
  }

  const recentlyPlayed = await recentlyPlayedResponse.json()
  const item = recentlyPlayed.items?.[0]?.track
  if (!item || !Array.isArray(item.artists)) {
    return NextResponse.json({ error: 'No recent tracks found.' }, { status: 404 })
  }

  return NextResponse.json({
    track: item.name,
    artist: item.artists.map((a: { name: string }) => a.name).join(', '),
    nowPlaying: false,
  })
}
