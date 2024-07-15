import { posts } from '#/site/content'
import { MDXContent } from '@/components/mdx-components'
import { notFound } from 'next/navigation'

import '@/styes/mdx.css'
import { TracingBeam } from '@/components/aceternity/tracing-beam'
import { formatDate } from '@/lib/utils'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
  const post = posts.find((post) => post.slugAsParams === slug)

  return post
}

// we know posts at build time
export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function postPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)
  if (!post || !post.published) {
    notFound()
  }

  return (
    <main>
      <article className="container py-6 max-w-5xl mx-auto pt-10 sm:pt-20">
        <TracingBeam>
          <div className="mb-12 w-full border-b">
            <h1 className="text-center mb-0">{post.title}</h1>
            <p className="text-center opacity-80 pb-5">{post.description}</p>
            <div className="flex justify-between opacity-80 text-sm pb-1">
              <p>Written by Vishrut Agrawal</p>
              <p>{formatDate(post.date)}</p>
            </div>
          </div>
          <MDXContent code={post.body} />
        </TracingBeam>
      </article>
    </main>
  )
}
