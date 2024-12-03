import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex justify-between items-center border rounded-md h-16 shadow-lg my-3 p-3 bg-slate-100">
            <div>
              <h4 className="text-cyan-600 text-2xl w-340">
                Social Media Page
              </h4>
            </div>
            <div className="link">
              <Link href="/">Home</Link>
              <Link href="/posts">Posts</Link>
              <Link href="/posts/users">Users</Link>
              <div>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
