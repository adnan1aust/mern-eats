import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const postToAPI = async (endpoint: string, data: object) => {
  try {
    const headers = {
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
