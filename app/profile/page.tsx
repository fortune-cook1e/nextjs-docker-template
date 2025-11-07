import { createClient } from '@/lib/supabase/server';
import { userSchema } from '@/lib/validators';

const Page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = userSchema.parse(data.user);

  return (
    <div>
      <h1>this is User Page</h1>
      <p>Username:{user.user_metadata.username}</p>
      <p>Email:{user.email}</p>
    </div>
  );
};

export default Page;
