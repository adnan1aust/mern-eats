"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const router = useRouter();
  const isCalled = useRef(false);

  const addUserToDB = async () => {
    if (user?.sub && user.email && !isCalled.current) {
      isCalled.current = true;
      const { error } = await createUser({
        auth0Id: user?.sub,
        email: user?.email,
      });
      if (error) {
        alert("Could not create the user!");
      } else {
        router.push("/");
      }
    }
  };
  useEffect(() => {
    addUserToDB();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader2 className="animate-spin h-24 w-24 text-primary" />
    </div>
  );
};

export default AuthCallbackPage;
