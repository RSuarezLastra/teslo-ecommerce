import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div className="">
      <h2>Hola mundo</h2>
      <h2 className={`${titleFont.className} font-bold`}>Hola mundo</h2>
    </div>
  );
}
