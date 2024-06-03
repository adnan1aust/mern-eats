"use client";

import { createUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const AuthCallbackPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const isCalled = useRef(false);

  const addUserToDB = async () => {
    if (user?.sub && user?.email && !isCalled.current) {
      isCalled.current = true;
      const { error } = await createUser({
        auth0Id: user?.sub,
        email: user?.email,
      });
      if (error) {
        console.error("Could not create the user!", error);
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (user && !isCalled.current) {
      addUserToDB();
      isCalled.current = true;
    }
  }, [user]);

  return <div className=""></div>;
};

export default AuthCallbackPage;
