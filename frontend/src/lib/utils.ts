import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSession } from "@auth0/nextjs-auth0";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const postToAPI = async (endpoint: string, data: object) => {
  const session = await getSession();
  try {
    const headers = {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorObject = await response.json();
      return { error: true, data: errorObject };
    }

    return { error: false, data: await response.json() };
  } catch (e) {
    return { error: true, data: e };
  }
};

export const getFromAPI = async (endpoint: string) => {
  const session = await getSession();
  try {
    const headers = {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      const errorObject = await response.json();
      return { error: true, data: errorObject };
    }

    return { error: false, data: await response.json() };
  } catch (e) {
    return { error: true, data: e };
  }
};

export const putToAPI = async (endpoint: string, data: object) => {
  const session = await getSession();
  try {
    const headers = {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorObject = await response.json();
      return { error: true, data: errorObject };
    }

    return { error: false, data: await response.json() };
  } catch (e) {
    return { error: true, data: e };
  }
};
