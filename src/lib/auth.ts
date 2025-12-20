import NextAuth, { type Session, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { z } from "zod";
import { Role } from "@/config/roles";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" as const },
  pages: { signIn: "/auth/sign-in" },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const authEmail = process.env.AUTH_EMAIL;
        const authPassword = process.env.AUTH_PASSWORD;
        if (!authEmail || !authPassword) {
          console.warn("AUTH_EMAIL or AUTH_PASSWORD not set; rejecting sign-in");
          return null;
        }
        if (email !== authEmail || password !== authPassword) return null;
        return { id: "user_owner", name: "Workspace Owner", email, role: Role.OWNER };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User & { role?: Role } }) {
      if (user && "role" in user) {
        const incomingRole = user.role;
        const isValidRole =
          typeof incomingRole === "string" && Object.values(Role).includes(incomingRole as Role);
        if (isValidRole) {
          token.role = incomingRole;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub;
        const tokenRole = typeof token.role === "string" ? (token.role as Role) : undefined;
        const isValidRole = tokenRole ? Object.values(Role).includes(tokenRole) : false;
        session.user.role = isValidRole ? tokenRole : undefined;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
