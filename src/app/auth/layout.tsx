
export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-red-800">
      {children}
    </div>
  );
}