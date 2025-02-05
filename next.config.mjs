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
    return [
      {
        source: '/ponovo',
        destination: '/projects/ponovo',
      },
      {
        source: '/sweetbeasts',
        destination: '/projects/sweetbeasts',
      },
      {
        source: '/sweetbeasts-admin',
        destination: '/projects/sweetbeasts-admin',
      },
    ]
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
        destination: 'https://github.com/agrawalvi/shelfwise',
        permanent: false,
      },
    ]
  },
  images: {
    domains: [
      'api.microlink.io', // Microlink Image Preview
    ],
  },
}

export default nextConfig
