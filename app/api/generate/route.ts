import { gateway } from "@ai-sdk/gateway";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { deco } = await request.json();

    if (!deco || typeof deco !== "string" || deco.trim() === "") {
      return NextResponse.json(
        { error: "Impossible de continuer sans le style de décor" },
        { status: 400 }
      );
    }

    const prompt = `Génère strictement une palette de couleurs pour un style "${deco}" correspondant à un design de maison ou d'espace intérieur.  
L'IA doit retourner uniquement **un objet JSON** avec exactement ces clés :  
{  
  "primary": { "value": "#xxxxxx", "label": "nom_de_la_couleur" },  
  "secondary": { "value": "#xxxxxx", "label": "nom_de_la_couleur" },  
  "accent": { "value": "#xxxxxx", "label": "nom_de_la_couleur" },  
  "neutral": { "value": "#xxxxxx", "label": "nom_de_la_couleur" }  
}  

**Important :**  
- Le champ "value" doit toujours être un code HEX valide (commençant par #, 6 caractères hexadécimaux).  
- Le champ "label" doit être un nom simple et court de la couleur (ex : "Bleu ciel", "Gris clair", "Terracotta").  
- Aucune autre information, description ou commentaire ne doit être présent dans la réponse, strictement cet objet JSON unique (respecte bien la syntaxe JSON).  
- Ne retourne qu’une seule palette.  
`;

    const result = await generateText({
      model: gateway("xai/grok-3"),
      prompt: prompt,
    });

    const colors = result.steps[0].content[0]; // Contient le texte JSON

    if (colors.type === "text" && typeof colors.text === "string") {
      try {
        const parsedData = JSON.parse(colors.text);

        return NextResponse.json({ data: parsedData });
      } catch (jsonError) {
        console.error("Erreur parsing JSON palettes :", jsonError);
        return NextResponse.json(
          { error: "Le format des couleurs générées est invalide." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Réponse IA non disponible au format texte." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur de génération de couleurs IA :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue, veuillez réessayer." },
      { status: 500 }
    );
  }
}
