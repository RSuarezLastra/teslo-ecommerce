import { titleFont } from "@/config/fonts"

interface Props {
  title: String;
  subtitle?: String;
  className?: String;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-10`}>
        {title}
      </h1>

      {
        subtitle && (
          <h3 className="text-xl mb-10">{subtitle}</h3>
        )
      }
    </div>
  )
}
