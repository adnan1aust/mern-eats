import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

const MobileNav = async () => {
  const session = await getSession();
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-primary" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
          <div>
            {session?.user ? (
              <SheetTitle className="flex gap-2 items-center justify-start hover:cursor-pointer">
                <Avatar>
                  <AvatarImage src={session?.user?.picture} alt="user-image" />
                  <AvatarFallback>{`${session?.user?.family_name?.charAt(
                    0
                  )}{user?.given_name?.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <p className="text-primary">{session?.user?.name}</p>
              </SheetTitle>
            ) : (
              <SheetTitle className="text-center">
                <span>Welcome to MernEats.com</span>
              </SheetTitle>
            )}
          </div>

          <Separator />
          <SheetDescription>
            {session?.user ? (
              <div className="w-full flex flex-col gap-2">
                <Button className="w-full font-bold">Profile</Button>
                <Link href="/api/auth/logout">
                  <Button className="w-full font-bold  bg-slate-700 hover:bg-slate-600">
                    Log out
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/api/auth/login">
                <div className="w-full">
                  <Button className="w-full font-bold">Log In</Button>
                </div>
              </Link>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
