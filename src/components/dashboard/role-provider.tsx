'use client';

import { createContext, useContext } from "react";
import type { Role } from "@/config/roles";

type RoleContextValue = {
  role: Role;
  userId: string;
  name?: string;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({
  role,
  userId,
  name,
  children,
}: {
  role: Role;
  userId: string;
  name?: string;
  children: React.ReactNode;
}) {
  return <RoleContext.Provider value={{ role, userId, name }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return ctx.role;
}

export function useIdentity() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useIdentity must be used within RoleProvider");
  }
  return ctx;
}
