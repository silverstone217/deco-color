"use client";
import { rubik } from "@/lib/fonts";
import { buttonsDataInfo } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Loader, Palette } from "lucide-react";
import AlertPopup from "./AlertPopup";
import AbsoluteViewPalette, { PaletteType } from "./AbsoluteViewPalette";

// const COLORS = {
//   accent: { value: "#4A8B88", label: "Turquoise Doux" },
//   neutral: { value: "#F5F5F5", label: "Blanc Cassé" },
//   primary: { value: "#D2B48C", label: "Sable Chaud" },
//   secondary: { value: "#8C5A26", label: "Terracoda" },
// };

const MainCompnent = () => {
  const [loading, setLoading] = useState(false);
  const [decoStyle, setDecoStyle] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [error, setError] = useState("");
  //   const [success, setSuccess] = useState("");

  const [dataColors, setDataColors] = useState<PaletteType | null>(null);

  const handleGenerateColors = async (value: string) => {
    setDecoStyle(value);
    setLoading(true);
    setError("");
    // setSuccess("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deco: value }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.message);
        setIsOpen(true);
        setLoading(false);
        return;
      }

      //   console.log(data.data);
      setDataColors(data.data);

      console.log("Colors generated successfully!");
      setShow(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Une erreur est survenue");
      setLoading(false);
      setDecoStyle("");
    }
  };

  return (
    <main className="mt-4 flex flex-col gap-6 w-full">
      {/* type de style */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
        {buttonsDataInfo.map((deco, idx) => {
          return (
            <div key={idx} className="w-full flex flex-col shadow-lg ">
              {/* image */}
              <Image
                src={deco.image}
                alt={deco.title}
                width={300}
                height={300}
                priority
                className="w-full object-cover h-52 "
              />
              <div className="bg-gray-100 w-full p-4 flex items-center justify-between text-secondary">
                <h2
                  className={`text-base font-bold ${rubik.className} capitalize`}
                >
                  {deco.title}
                </h2>
                <button
                  className="text-sm font-medium flex items-center gap-1.5  
                hover:text-primary transition-all duration-300 ease-in-out
                cursor-pointer disabled:cursor-default
                "
                  onClick={() => handleGenerateColors(deco.value)}
                  disabled={loading && decoStyle === deco.value}
                >
                  {loading && decoStyle === deco.value ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <Palette size={20} />
                  )}
                  generer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/*  error | success*/}
      {isOpen && (
        <AlertPopup
          title="Oops! une erreur"
          message={error}
          type="error"
          onCancel={() => setIsOpen(false)}
        />
      )}

      {/* view data response */}
      {show && (
        <AbsoluteViewPalette
          show={show}
          setShow={setShow}
          palette={dataColors}
          decoStyle={decoStyle}
          setDecoStyle={setDecoStyle}
          loading={loading}
          handleGenerateColors={() => handleGenerateColors(decoStyle)}
        />
      )}
    </main>
  );
};

export default MainCompnent;
