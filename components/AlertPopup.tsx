"use client";
import React from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface AlertPopupProps {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel: () => void;
  type: "success" | "error";
}

const AlertPopup = ({
  title,
  message,
  onConfirm,
  onCancel,
  type,
}: AlertPopupProps) => {
  // Choix d’icône et couleur selon type
  const icon =
    type === "success" ? (
      <CheckCircle2 className="w-10 h-10 text-green-500" />
    ) : (
      <XCircle className="w-10 h-10 text-red-500" />
    );

  return (
    // Fond overlay semi-transparent
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Bouton fermer en haut à droite */}
        <button
          aria-label="Fermer"
          onClick={onCancel}
          className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          type="button"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex flex-col items-center p-6 space-y-4 text-center">
          {/* Icone */}
          <div>{icon}</div>

          {/* Titre */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-700 dark:text-gray-300">{message}</p>

          {/* Boutons */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center w-full">
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-green-400"
                type="button"
              >
                OK
              </button>
            )}

            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-5 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              type="button"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
