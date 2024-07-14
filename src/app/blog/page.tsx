import { posts } from '#/site/content'

export default async function BlogPage() {
  const displayPosts = posts

  return (
    <main>
      <div>Blog</div>
      {displayPosts.length > 0 && (
        <ul>
          {displayPosts.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slugAsParams}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
