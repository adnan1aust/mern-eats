"use client";

import { Loader2, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const MobileNav = () => {
  const { isAuthenticated, user, isLoading, logout, loginWithRedirect } =
    useAuth0();
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-primary" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            <div>
              {isAuthenticated && user ? (
                <SheetTitle className="flex gap-2 items-center justify-start hover:cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user?.picture} alt="user-image" />
                    <AvatarFallback>{`${user?.family_name?.charAt(
                      0
                    )}{user?.given_name?.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                  <p className="text-primary">{user?.name}</p>
                </SheetTitle>
              ) : (
                <SheetTitle className="text-center">
                  <span>Welcome to MernEats.com</span>
                </SheetTitle>
              )}
            </div>
          )}

          <Separator />
          <SheetDescription>
            {isAuthenticated ? (
              <div className="w-full flex flex-col gap-2">
                <Button className="w-full font-bold">Profile</Button>
                <Button
                  className="w-full font-bold  bg-slate-700 hover:bg-slate-600"
                  onClick={() => logout()}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="w-full">
                {!isLoading && (
                  <Button
                    className="w-full font-bold"
                    onClick={async () => {
                      await loginWithRedirect();
                    }}
                  >
                    Log In
                  </Button>
                )}
              </div>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
