import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, UserRoundCog } from "lucide-react";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

const UserNameMenu = async () => {
  const session = await getSession();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="min-w-[15rem]">
          <div className="flex gap-2 items-center hover:cursor-pointer">
            <Avatar>
              <AvatarImage src={session?.user?.picture} alt="user-image" />
              <AvatarFallback>{`${session?.user?.family_name?.charAt(
                0
              )}{user?.given_name?.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <p className="text-primary">{session?.user?.name}</p>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/userProfile" className="hover:text-primary">
            <MenubarItem className="flex justify-around ">
              <div className="flex gap-2 items-center">
                <p>Profile</p> <UserRoundCog className="w-4 h-4" />
              </div>
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href="/manageRestaurant" className="hover:text-primary">
            <MenubarItem className="flex justify-around ">
              <div className="flex gap-2 items-center">
                <p>Restaurant</p> <UserRoundCog className="w-4 h-4" />
              </div>
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href="/api/auth/logout" className="hover:text-primary">
            <MenubarItem className="flex justify-around">
              <div className="flex gap-2 items-center">
                <button>Log Out</button>
                <LogOut className="w-4 h-4" />
              </div>
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserNameMenu;
