import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

export function AuthShowcase() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: secretMessage, error } = api.post.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use type assertion to tell TypeScript that sessionData is of type Session
    if (sessionData as Session) {
      router.push('/home'); // Redirect to the home page if already signed in
    } else {
      try {
        // Use await here
        const { data: secretMessage } = await api.post.getSecretMessage.useQuery(
          undefined,
          { enabled: sessionData?.user !== undefined }
        );

        // Continue with the rest of your logic
        console.log('Secret Message:', secretMessage);
      } catch (error) {
        console.error('Error loading secret message:', error);
        // Handle the error, e.g., display an error message to the user
      }

      // If not signed in, initiate the sign-in process
      await signIn('your-provider', { callbackUrl: '/home' });
    }
  };

  // Rest of your code...
}
