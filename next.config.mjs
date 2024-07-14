/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    domains: [
      'api.microlink.io', // Microlink Image Preview
    ],
  },
}

export default withMdx(nextConfig)
