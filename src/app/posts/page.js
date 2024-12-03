import { db } from '@/utils/db';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function PostsPage() {
  const user = await currentUser();

  const { userId } = await auth();
  const response = await db.query(`SELECT * FROM posts`);
  const posts = response.rows;

  async function handleSubmit(formData) {
    'use server';
    const content = formData.get('content');
    db.query('INSERT INTO posts (content, clerk_id) VALUES ($1, $2)', [
      content,
      userId,
    ]);
  }

  return (
    <div>
      <div className="ml-40">
        <h1 className="text-xl text-teal-800">Make a posts here</h1>
        <SignedIn>
          <form action={handleSubmit}>
            <textarea
              className="border rounded-md border-neutral-800 block w-64"
              name="content"
              placeholder="Write you posts here!"
              required
            ></textarea>
            <button className=" bg-white text-black 2xl:font-bold border-green-800 border-2 hover:bg-green-700 hover:text-white hover:border-gray-950 rounded-md w-32 text-center mb-4 mt-2">
              Post
            </button>
          </form>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">Sign in to make a post</Link>
        </SignedOut>
      </div>
      <div className="flex flex-row justify-center">
        <div className="post">
          <p className="mt-3 ml-2 text-black text-xl">{user.firstName}</p>

          {posts.map(post => (
            <div key={post.id}>
              <p className="content"> {post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
