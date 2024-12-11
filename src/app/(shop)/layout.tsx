import { Sidebar, TopMenu } from "@/components";

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">

      <TopMenu />
      <Sidebar />

      <div className="px-1 sm:px-10">
        {children}
      </div>
    </div>
  );
}