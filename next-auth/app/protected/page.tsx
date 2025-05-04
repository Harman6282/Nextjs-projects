import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if(!session){
    redirect("/login");
  }
  return <div>Protected route
    <br />
    <p>{session?.user?.name}</p> 
    <p>{session?.user?.email}</p>
  </div>;
};

export default page;
