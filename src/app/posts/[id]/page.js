import { db } from '@/utils/db';

export default async function SinglePostPage({ params }) {
  try {
    const { id } = params;

    // Fetch the post from the database
    const postResult = await db.query('SELECT * FROM posts WHERE id = $1', [
      id,
    ]);
    const post = postResult.rows[0];

    if (!post) {
      return (
        <div>
          <p>Post not found.</p>
        </div>
      );
    }

    return (
      <div>
        <p>{post.content}</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);

    return (
      <div>
        <p>There was an error loading the post. Please try again later.</p>
      </div>
    );
  }
}
