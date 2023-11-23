import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';

export function AuthShowcase() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSecretMessage = async () => {
      try {
        const { data } = await api.post.getSecretMessage.useQuery(undefined, {
          enabled: sessionData?.user !== undefined,
        });
        setSecretMessage(data || null); // Ensure `data` is not undefined
      } catch (err: any) {
        setError(err);
      }
    };

    if (sessionData?.user !== undefined) {
      fetchSecretMessage();
    }
  }, [sessionData]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the user is already signed in
    if (sessionData) {
      router.push('/home'); // Redirect to the home page if already signed in
    } else {
      // If not signed in, initiate the sign-in process
      await signIn('your-provider', { callbackUrl: '/home' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name || 'Unknown'}</span>}
        {secretMessage !== null && <span> - {secretMessage}</span>}
      </p>
      {error ? (
        <p>Error loading secret message</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          >
            {sessionData ? 'Go to Home' : 'Sign in'}
          </button>
        </form>
      )}
    </div>
  );
}
