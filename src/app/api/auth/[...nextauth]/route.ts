import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'hrm_db'
          });

          const [rows]: any = await connection.execute(
            'SELECT id, email, password_hash, organization_id FROM users WHERE email = ?',
            [credentials.email]
          );

          await connection.end();

          if (rows.length === 0) {
            return null;
          }

          const user = rows[0];
          const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash);

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            organizationId: user.organization_id
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.organizationId = user.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).organizationId = token.organizationId;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST }; 