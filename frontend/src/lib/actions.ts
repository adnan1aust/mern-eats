"use server";

import { postToAPI, putToAPI, getFromAPI } from "./utils";
import { APIS } from "@/config/apis";
import { userPayloadType } from "@/types/types";

export async function createUser(payload: userPayloadType) {
  return await postToAPI(APIS.USER_API, payload);
}

export async function getCurrentUser() {
  return await getFromAPI(`${APIS.USER_API}`);
}

export async function updateUser(payload: {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}) {
  return await putToAPI(APIS.USER_API, payload);
}
