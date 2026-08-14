import { NextResponse } from 'next/server'

export async function GET() {
  const { OPENWEATHER_API_KEY } = process.env

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json({ error: 'Weather API key not configured.' }, { status: 503 })
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Sunnyvale, CA, USA&appid=${OPENWEATHER_API_KEY}&units=imperial`,
    { cache: 'no-store' },
  )

  if (!res.ok) {
    if (res.status === 429) {
      return NextResponse.json({ error: 'Welp, you hit the rate limit. Try again in a minute.' }, { status: 429 })
    }
    else {
      console.error("[WEATHER] Failed to fetch weather data.", res.status, res.statusText, await res.text())
    }
    return NextResponse.json({ error: 'Failed to fetch weather data.' }, { status: 503 })
  }

  const data = await res.json()

  return NextResponse.json({
    city: data.name,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    humidity: data.main.humidity,
  })
}
