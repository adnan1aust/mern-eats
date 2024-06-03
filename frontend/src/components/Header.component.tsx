import Link from "next/link";
import MobileNav from "./MobileNav.component";
import MainNav from "./MainNav.component";

const Header = () => {
  return (
    <div className="border-b-2 border-b-primary py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-tight text-primary"
          href="/"
        >
          MernEats.com
        </Link>
        <MobileNav />
        <MainNav />
      </div>
    </div>
  );
};

export default Header;
