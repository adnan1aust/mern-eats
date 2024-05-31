"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, UserRoundCog } from "lucide-react";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="min-w-[15rem]">
          <div className="flex gap-2 items-center hover:cursor-pointer">
            <Avatar>
              <AvatarImage src={user?.picture} alt="user-image" />
              <AvatarFallback>{`${user?.family_name?.charAt(
                0
              )}{user?.given_name?.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <p className="text-primary">{user?.name}</p>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="flex justify-around hover:text-primary">
            <div className="flex gap-2 items-center">
              <p>Profile</p> <UserRoundCog className="w-4 h-4" />
            </div>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex justify-around" onClick={() => logout()}>
            <div className="flex gap-2 items-center">
              <button>Log Out</button>
              <LogOut className="w-4 h-4" />
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserNameMenu;
