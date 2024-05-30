"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const MainNav = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="hidden md:block">
      <Button
        variant="ghost"
        className="font-bold"
        onClick={async () => {
          await loginWithRedirect();
        }}
      >
        Log In
      </Button>
    </div>
  );
};

export default MainNav;
