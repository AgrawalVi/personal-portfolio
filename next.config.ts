import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/ponovo',
        destination: 'https://ponovo.app',
        permanent: false
      },
      {
        source: '/tanks',
        destination: 'https://www.youtube.com/watch?v=w69SsBIJABA',
        permanent: false
      },
      {
        source: '/shelfwise',
        destination: 'https://www.youtube.com/watch?v=ljWgrLuKK-s',
        permanent: false
      },
      {
        source: '/sweetbeasts',
        destination: 'https://sweetbeasts.shop',
        permanent: false
      },
      {
        source: '/sweetbeasts-admin',
        destination: 'https://sweetbeasts.shop',
        permanent: false
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
      },
      // Redirect all project detail slugs to the projects index until dedicated project detail pages are built.
      {
        source: '/projects/:slug',
        destination: '/projects',
        permanent: false
      }
    ]
  }
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      'remark-gfm',
      ['remark-toc', { heading: 'Contents' }],
    ],
    rehypePlugins: [
      'rehype-slug',
      ['rehype-pretty-code', { theme: 'github-dark', keepBackground: false }],
      'rehype-autolink-headings',
    ],
  },
})

export default withMDX(nextConfig)
