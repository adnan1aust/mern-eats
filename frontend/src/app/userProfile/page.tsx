import UserProfileForm from "@/components/UserProfileForm.component";
import { getCurrentUser } from "@/lib/actions";

const Page = async () => {
  const { data, error } = await getCurrentUser();

  return (
    <div>
      <UserProfileForm userData={data.user} />
    </div>
  );
};

export default Page;
