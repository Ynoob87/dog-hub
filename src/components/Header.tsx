import Link from "next/link";

const Header = () => {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <Link href="#">
          <div className="flex items-center space-x-3">
            <span className="text-4xl font-bold text-white">Dog</span>
            <span className="text-4xl font-bold text-rose-400">Hub</span>
            <span className="text-4xl">🐶</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
