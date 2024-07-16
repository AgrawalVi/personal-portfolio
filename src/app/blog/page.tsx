import { posts } from '#/site/content'
import { BlogCard } from '@/components/aceternity/blog-card'
import { sortBlogPosts } from '@/lib/utils'

export default async function BlogPage() {
  const displayPosts = sortBlogPosts(posts.filter((post) => post.published))

  return (
    <main className="flex w-full flex-col items-center justify-center pt-5 sm:pt-10">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center">
        <h1 className="w-full pb-10 text-center text-5xl sm:text-7xl">Blog</h1>
        <ul className="grid list-none grid-cols-1 gap-4 space-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => {
            const { slug, title, date, description } = post
            return (
              <li key={slug}>
                <BlogCard
                  title={title}
                  description={description}
                  imageHref={'/blog/post-1.png'}
                  published={date}
                  link={slug}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
