"use client";

// // import { nextAuthConnection } from "@neosoft-technologies/utils/lib/authUtils";
// // import type { NextAuthOptions } from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";

// import getConfig from "next/config";
// import NextAuth from "next-auth";

// const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

// // export const authOptions = NextAuthOptions(<any>{
// //   clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID,
// //   clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
// //   keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
// //   nextAuthSecret: process.env.NEXTAUTH_SECRET,
// //   realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,

// // });

// export const authOptions = KeycloakProvider(<any>{
//   clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID,
//   clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
//   keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
//   nextAuthSecret: process.env.NEXTAUTH_SECRET,
//   realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
// });

// export default NextAuth(authOptions);

import KeycloakProvider from "next-auth/providers/keycloak";
import getConfig from "next/config";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: "marketing",
      clientSecret: "AQHMEYJ0d4F2e3awQr4sjBWgiVsOPTqW",
      issuer: "http://localhost:8080/realms/ampercent",
    }),
  ],
};

export default NextAuth(authOptions);
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
