import MainCompnent from "@/components/MainCompnent";
import { rubik } from "@/lib/fonts";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col items-center text-center">
      <h2 className={`${rubik.className} text-4xl lg:text-6xl font-bold`}>
        DECO - Color
      </h2>
      <p className="sm:text-lg max-w-md leading-snug text-gray-400">
        Generateur de palette de couleur {`d'interieur`} (maison, espace, etc.)
        <br />
        Cliquer sur {`l'un`} de ces boutons pour{" "}
        {`générer une nouvelle palette`}
      </p>

      <div className="mt-10 flex flex-col gap-2">
        <h3 className="font-semibold text-xl">Style de design</h3>
        <MainCompnent />
      </div>
    </div>
  );
}
