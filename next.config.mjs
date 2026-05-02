const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const { build } = await import('velite')
  await build({ watch: isDev, clean: !isDev })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/ponovo', destination: '/projects/ponovo' }]
  },
  async redirects() {
    return [
      {
        source: '/tanks',
        destination: 'https://www.youtube.com/watch?v=w69SsBIJABA',
        permanent: true,
      },
      {
        source: '/shelfwise',
        destination: 'https://www.youtube.com/watch?v=ljWgrLuKK-s',
        permanent: false,
      },
      {
        source: '/sweetbeasts',
        destination: '/experience/sweetbeasts',
        permanent: false,
      },
      {
        source: '/sweetbeasts-admin',
        destination: '/experience/sweetbeasts',
        permanent: false,
      },
      {
        source: '/resume',
        destination: 'https://drive.google.com/file/d/1_euc4NMr6xQrrPhRQh94nQ2NGSiAIXeo/view?usp=drivesdk',
        permanent: false
      },
      {
        source: '/resume/mba',
        destination: 'https://drive.google.com/file/d/1rk2hhINRasavxC8V0s4WG8WhE9-A2lpU/view?usp=sharing',
        permanent: false
      }
    ]
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.microlink.io' }],
  },
}

export default nextConfig
