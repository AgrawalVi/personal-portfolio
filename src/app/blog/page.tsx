import { posts } from '#/site/content'
import PostItem from '@/components/blog/post-item'
import { sortBlogPosts } from '@/lib/utils'

export default async function BlogPage() {
  const sortedPosts = sortBlogPosts(posts.filter((post) => post.published))
  const displayPosts = sortedPosts

  return (
    <main className="flex w-full flex-col items-center justify-center pt-5 sm:pt-10">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center">
        <h1 className="w-full text-center text-5xl sm:text-7xl">Blog</h1>
        {displayPosts.length > 0 ? (
          <ul className="list-none">
            {displayPosts.map((post) => {
              const { slug, title, date, description } = post
              return (
                <li key={slug}>
                  <PostItem
                    slug={slug}
                    title={title}
                    date={date}
                    description={description}
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <p>Stay tuned for more!</p>
        )}
      </div>
    </main>
  )
}
