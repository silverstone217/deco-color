"use client";
import { rubik } from "@/lib/fonts";
import { Copy, Loader, Palette, X } from "lucide-react";
import React from "react";

type colorType = {
  label: string;
  value: string;
};
export type PaletteType = {
  accent: colorType;
  primary: colorType;
  secondary: colorType;
  neutral: colorType;
};

interface Props {
  palette: PaletteType | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  decoStyle: string;
  setDecoStyle: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleGenerateColors: (value: string) => void;
}

const AbsoluteViewPalette = ({
  palette,
  setShow,
  decoStyle,
  handleGenerateColors,
  loading,
}: Props) => {
  if (!palette || !decoStyle) return null;

  const handleCopyPalette = () => {
    const paletteText = `Primary: ${palette.primary.value} (${palette.primary.label})
Secondary: ${palette.secondary.value} (${palette.secondary.label})
Accent: ${palette.accent.value} (${palette.accent.label})
Neutral: ${palette.neutral.value} (${palette.neutral.label})`;
    navigator.clipboard.writeText(paletteText);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-80 py-6 px-4 sm:px-10 overflow-auto">
      <div className="relative max-w-7xl mx-auto text-center">
        <h2
          className={`text-xl sm:text-3xl font-semibold ${rubik.className} capitalize text-white`}
        >
          Palette {decoStyle}
        </h2>

        <button
          aria-label="Fermer la palette"
          className="absolute top-2 right-2 text-white hover:text-red-500 transition"
          onClick={() => setShow(false)}
          type="button"
        >
          <X size={32} />
        </button>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={handleCopyPalette}
            className="flex items-center justify-center gap-2 border border-white text-white rounded-lg px-5 py-2 font-medium text-sm hover:bg-white hover:text-gray-900 transition"
            type="button"
          >
            <Copy size={20} /> Copier la palette
          </button>
          <button
            onClick={() => handleGenerateColors(decoStyle)}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2 font-medium text-sm border ${
              loading
                ? "border-gray-500 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-900 border-white hover:bg-gray-200"
            } transition`}
            type="button"
          >
            {loading ? (
              <Loader size={20} className="animate-spin text-gray-700" />
            ) : (
              <Palette size={20} />
            )}
            générer une autre
          </button>
        </div>

        <div className="grid grid-rows-4 sm:grid-rows-1 sm:grid-cols-4 gap-6 mt-10 min-h-[60vh]">
          <RenderColor color={palette.primary} labelType="Primary" />
          <RenderColor color={palette.secondary} labelType="Secondary" />
          <RenderColor color={palette.accent} labelType="Accent" />
          <RenderColor color={palette.neutral} labelType="Neutral" />
        </div>
      </div>
    </div>
  );
};

export default AbsoluteViewPalette;

const RenderColor = ({
  color,
  labelType,
}: {
  color: colorType;
  labelType?: string;
}) => {
  const { label, value } = color;

  // Calcul de la couleur du texte selon la luminosité pour lisibilité
  const hexToLuminance = (hex: string) => {
    // Remove #
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    // Compute luminance (https://www.w3.org/TR/WCAG20/#relativeluminancedef)
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };
  const luminance = hexToLuminance(value);
  // Texte clair si fond sombre, sinon texte sombre
  const textColor = luminance < 0.5 ? "text-white" : "text-gray-900";

  return (
    <div
      className={`flex flex-col w-full h-full rounded-xl shadow-lg cursor-pointer select-none relative`}
      style={{
        backgroundColor: value,
      }}
      title={`${labelType} - ${label} (${value})`}
    >
      <div className="absolute top-3 right-3 p-1 rounded hover:bg-white/30 transition">
        <CopyIcon textToCopy={value} textColor={textColor} />
      </div>

      <div className="flex flex-col justify-center items-center h-full px-6 py-8">
        <h3
          className={`font-bold text-2xl ${rubik.className} ${textColor} break-words`}
        >
          {value}
        </h3>
        <p
          className={`text-sm mt-2 opacity-80 ${rubik.className} ${textColor} uppercase tracking-wider`}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

const CopyIcon = ({
  textToCopy,
  textColor,
}: {
  textToCopy: string;
  textColor: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label="Copier la couleur"
      className="text-white hover:text-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
    >
      {copied ? (
        <span className={`text-yellow-400 font-semibold select-none `}>✓</span>
      ) : (
        <Copy className={` ${textColor} w-6 h-6`} />
      )}
    </button>
  );
};
