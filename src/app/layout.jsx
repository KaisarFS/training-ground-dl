import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: "Kaisar Next CRUD App",
  description: "A CRUD build with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-800 text-white sticky top-0">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl">My CRUD App</h1>
            <ul className='flex space-x-4'>
              <li>
                <Link href={'/'} className='hover:underline'>Home</Link>
              </li>
              <li>
                <Link href={'/create'} className='hover:underline'>Create</Link>
              </li>
              <li>
                <Link href={'/about'} className='hover:underline'>About</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
