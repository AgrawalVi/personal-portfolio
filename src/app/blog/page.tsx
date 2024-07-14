import { posts } from '#/site/content'
import PostItem from '@/components/blog/post-item'
import { sortBlogPosts } from '@/lib/utils'

export default async function BlogPage() {
  const sortedPosts = sortBlogPosts(posts.filter((post) => post.published))
  const displayPosts = sortedPosts

  return (
    <main>
      <div>Blog</div>
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
    </main>
  )
}
