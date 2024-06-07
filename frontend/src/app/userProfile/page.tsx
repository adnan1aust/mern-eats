import UserProfileForm from "@/components/UserProfileForm.component";
import { getCurrentUser } from "@/lib/actions";

const Page = async () => {
  const { data, error } = await getCurrentUser();
  if (error) {
    console.log(data);
    return (
      <div className="text-center text-red-500">Something went wrong!</div>
    );
  }

  return (
    <div>
      <UserProfileForm userData={data.user} />
    </div>
  );
};

export default Page;
