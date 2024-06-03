import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu.component";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

const MainNav = async () => {
  const session = await getSession();
  /*console.log(session); */
  return (
    <>
      {
        <div className="hidden md:block">
          {session?.user ? (
            <UserNameMenu />
          ) : (
            <Button variant="ghost" className="font-bold">
              <Link href="/api/auth/login">Login</Link>
            </Button>
          )}
        </div>
      }
    </>
  );
};

export default MainNav;
