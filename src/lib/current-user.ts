import { Role } from "@/config/roles";
import { auth } from "@/lib/auth";

export type CurrentUser = {
  id: string;
  name: string;
  role: Role;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const session = await auth();
  const envRole = process.env.NEXT_PUBLIC_DEFAULT_ROLE as Role | undefined;
  const defaultRole = envRole && Object.values(Role).includes(envRole) ? envRole : Role.OWNER;
  const sessionRole = session?.user?.role as Role | undefined;
  const resolvedRole = sessionRole && Object.values(Role).includes(sessionRole) ? sessionRole : defaultRole;

  return {
    id: session?.user?.id ?? "demo-user",
    name: session?.user?.name ?? "Demo User",
    role: resolvedRole,
  };
}
