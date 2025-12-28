import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-white font-semibold text-lg hover:text-yellow-100 transition-colors duration-200 hover:scale-110"
          >
            <Image
              src="/logo.png"
              alt="KitSavdo Logo"
              width={180}
              height={72}
              className="drop-shadow-md"
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-white font-semibold text-lg hover:text-yellow-100 transition-colors duration-200 hover:scale-110"
          >
            Bosh sahifa
          </Link>
          <Link
            href="/news"
            className="text-white font-semibold text-lg hover:text-yellow-100 transition-colors duration-200 hover:scale-110"
          >
            Yangiliklar
          </Link>
          <Link
            href="/about"
            className="text-white font-semibold text-lg hover:text-yellow-100 transition-colors duration-200 hover:scale-110"
          >
            Biz haqimizda
          </Link>
          <Link
            href="/blog"
            className="text-white font-semibold text-lg hover:text-yellow-100 transition-colors duration-200 hover:scale-110"
          >
            Blog
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="text-white text-3xl">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
