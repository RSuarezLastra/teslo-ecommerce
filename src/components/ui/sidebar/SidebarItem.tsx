import Link from "next/link"

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ title, path, icon }: Props) => {
  return (
    <Link
      href={path}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3">{title}</span>
    </Link>
  )
}
