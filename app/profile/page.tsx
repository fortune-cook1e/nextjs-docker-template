'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuthentication';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const { loading: logoutLoading, logout } = useLogout();
  const { user, loading: userLoading, error } = useUser();

  if (userLoading) return 'loading...';
  if (error) return 'Get user info errro..';

  const onLogout = async () => {
    await logout();
    router.push('/');
    toast.success('logout success');
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>This is your information:</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Username: {user?.user_metadata.username}</p>
          <p>Email: {user?.email}</p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onClick={onLogout} loading={logoutLoading}>
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
