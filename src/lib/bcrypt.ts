import { CONFIG } from "@/config";
import bcrypt from "bcryptjs";
export const getHash = (value: string, salt: number = CONFIG.HASH_SALT) => {
  return bcrypt.hash(value, salt);
};
