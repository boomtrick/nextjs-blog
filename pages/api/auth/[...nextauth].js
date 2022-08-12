import NextAuth from "next-auth";
import IdentityServer4Provider from "next-auth/providers/identity-server4";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: "ID4",
      name:"ID4",
      type: "oauth",
      wellKnown: "http://localhost:5001/.well-known/openid-configuration",
      authorization: {params: {scope: "doughnutapi"}},
      idToken: true,
      checks: ["pkce"],
      profile(profile){
        return{
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      },
      clientId: "wewantdoughnuts",
      clientSecret: "PMPBlazor"
    }
  ],
  callbacks: {
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },

    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
});