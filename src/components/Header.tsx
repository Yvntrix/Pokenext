import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 z-10 flex items-end justify-between w-full p-4 border shadow-md bg-gray-50/80 border-b-gray-200">
      <Link href="/">
        <h1 className="text-2xl font-semibold text-gray-700">Pokénext</h1>
      </Link>

      <a
        href="https://github.com/Yvntrix"
        className="px-4 py-2 font-medium text-white bg-purple-400 rounded-md hover:bg-purple-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        About Me
      </a>
    </header>
  );
};

export default Header;
