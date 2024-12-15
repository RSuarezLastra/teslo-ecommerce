import Link from "next/link"
import { titleFont } from "@/config/fonts"

export const Footer = () => {
  return (
    <div className="flex justify-center w-full mb-6 text-sm">

      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span> | Shop</span>
        <span> © {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3 hover:underline">
        Privacidad y legal
      </Link>

      <Link href="/" className="mx-3 hover:underline">
        Ubicaciones
      </Link>

    </div>
  )
}
