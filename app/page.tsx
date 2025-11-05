import { LoginForm } from '@/app/login-form';
import { SWRProvider } from '@/providers/swr-provider';

export default function Home() {
  return (
    <SWRProvider>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </SWRProvider>
  );
}
