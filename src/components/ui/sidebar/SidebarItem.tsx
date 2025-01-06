import { useUiStore } from "@/store";
import Link from "next/link"

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem = ({ title, path, icon, onClick }: Props) => {


  return (
    <Link
      href={path}
      onClick={() => onClick && onClick()}
      className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3">{title}</span>
    </Link>
  )
}
