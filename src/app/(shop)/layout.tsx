import { TopMenu } from "@/components";

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopMenu />
      {children}
    </div>
  );
}