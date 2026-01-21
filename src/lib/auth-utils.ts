import { headers } from 'next/headers';
import { auth } from './auth';
import { redirect } from 'next/navigation';

export const authSession = async () => {
  try {
    const session = auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error('Unauthorized: No valid session found');
    }

    return session;
  } catch (e) {
    throw new Error('Authentication failed!');
  }
};

export const requireAuth = async () => {
  const session = await authSession();

  if (!session) {
    redirect('/login');
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await authSession();

  if (session) {
    redirect(`/dashboard/demos`);
  }

  return session;
};