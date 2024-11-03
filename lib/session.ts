import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

type SessionType = {
  id?: number;
  email?: string;
};
async function getSession() {
  const session = await getIronSession<SessionType>(await cookies(), {
    password: process.env.SESSION_SECRET!,
    cookieName: process.env.SESSION_NAME!,
  });
  return session;
}
export async function setSession(data: SessionType) {
  const session = await getSession();
  session.id = data.id;
  session.email = data.email;
  await session.save();
}
