import Link from 'next/link';

export default function Banner() {
  return (
    <header className="bg-slate-200 py-4 h-28 sticky top-0 z-50">
      <div className="container flex items-center justify-between mx-auto h-full">
        <Link className="text-3xl ml-8 cursor-pointer" href="/">Home</Link>
        <div className="hidden md:flex">
          <nav className="flex space-x-6">
            <Link className="text-2xl cursor-pointer" href="/user/login">Register/Log in</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}