import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
          // You have to return null here
          // null tells Auth.js that there was an invalid credential set
          // not that there was an error, not that we couldn't connect to the database. You can throw exceptions for that case
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // Compare the password with the hash stored in the database
        // You can't use the hash function again and do a string comparison
        // Because bcrypt salts things you are going to get a different hash each time
        // You have to use the compare function

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      //Note that the user is only available on the first login
      console.log("JWT Callback", { token, user });

      if (user) {
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
