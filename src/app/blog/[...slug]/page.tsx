import { posts } from '#/site/content'
import { notFound } from 'next/navigation'

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
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
    </article>
  )
}
