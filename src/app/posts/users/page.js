import { db } from '@/utils/db';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function UserPage(req, res) {
  try {
    // Get the current user from Clerk
    const user = await currentUser();
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { firstName, lastName, username, id } = user; // Update destructuring based on Clerk's API response

    const response = await db.query('SELECT * FROM users WHERE clerk_id = $1', [
      id,
    ]);
    // Insert user info from clerk into database at sign in for the first time
    if (response.rows.length === 0) {
      db.query(
        'INSERT INTO users (first_name, last_name, username, clerk_id) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, username, id]
      );
    }
    const users = response.rows;
    console.log(users);

    // Fetch all users from the database

    return (
      <div>
        {users.map(user => (
          <div
            key={user.id}
            className="ml-4 mt-4 text-amber-600 lg:font-semibold font-mono text-xl"
          >
            <h3>
              {user.first_name} {user.last_name}
            </h3>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching or storing user:', error);
    return <div>Error: Unable to load user data</div>;
  }
}
