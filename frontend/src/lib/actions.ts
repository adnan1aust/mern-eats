"use server";

import { postToAPI } from "./utils";
import { APIS } from "@/config/apis";
import { userPayloadType } from "@/types/types";

export async function createUser(payload: userPayloadType) {
  return await postToAPI(APIS.CREATE_USER_API, payload);
}
