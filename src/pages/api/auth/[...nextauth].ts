import { NextApiResponse, NextApiRequest } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
// import { User } from '@/models/User';
// import { connectDb } from '@/utils';

const options = {
    providers: [
        // OAuth authentication providers
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    database: process.env.DATABASE_URI,
    callbacks: {
        session: async (session, user) => {
            session.userId = user.id;
            // await connectDb();
            // const dbUser = await User.findOne({ _id: user.id });
            // session.userRole = dbUser.role;

            return Promise.resolve(session);
        },
    },
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<any> =>
    NextAuth(req, res, options);
