import { Role } from "@/config/roles";
import { auth } from "@/lib/auth";

export type CurrentUser = {
  id: string;
  name: string;
  role: Role;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const session = await auth();
  const defaultRole =
    (process.env.NEXT_PUBLIC_DEFAULT_ROLE as Role | undefined) ??
    Role.OWNER;

  return {
    id: session?.user?.id ?? "demo-user",
    name: session?.user?.name ?? "Demo User",
    role: session?.user?.role ?? defaultRole,
  };
}
