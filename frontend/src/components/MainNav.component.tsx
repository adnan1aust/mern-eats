"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu.component";
import { Loader2 } from "lucide-react";

const MainNav = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      {isLoading ? (
        <div className="w-[100px] justify-center py-2 hidden md:flex">
          <Loader2 className="animate-spin h-6 w-6 text-primary" />
        </div>
      ) : (
        <div className="hidden md:block">
          {isAuthenticated && user ? (
            <UserNameMenu />
          ) : (
            <Button
              variant="ghost"
              className="font-bold"
              onClick={async () => {
                await loginWithRedirect();
              }}
            >
              Log In
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default MainNav;
