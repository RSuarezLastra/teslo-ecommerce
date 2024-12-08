
export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-600">
      {children}
    </div>
  );
}