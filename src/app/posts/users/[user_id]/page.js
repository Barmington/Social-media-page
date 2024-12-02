import { currentUser } from '@clerk/nextjs/server';

export default async function UserPage({ params }) {
  const { id } = params;
  const user = await currentUser();

  return (
    <div className="ml-4 mt-4 text-amber-600 lg:font-semibold font-mono">
      <h2>
        {user.firstName} {user.lastName}
      </h2>

      {/* <p>
        This page uses the user_id from the params to get the users information
      </p> */}
    </div>
  );
}
