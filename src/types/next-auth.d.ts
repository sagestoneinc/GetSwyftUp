import type { DefaultSession } from "next-auth";
import type { Role } from "@/config/roles";
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: Role;
  }

  interface Session {
    user: {
      id?: string | null;
      role?: Role | null;
    } & DefaultSession["user"];
  }
}
