import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) 
{

  const session = await auth();
  
  if(session?.user){
    redirect('/');
  }
  

  return (
    <main className="flex justify-center">
      
      <div className="w-full px-5 sm:px-0 sm:w-[350px]">
        {children}
      </div>
      
    </main>
  );
}