import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {
    /* otherOptions… */
  },
})

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
