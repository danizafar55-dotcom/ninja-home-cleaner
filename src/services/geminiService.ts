import Groq from "groq-sdk";
import { CleaningGuidance } from "../types";

const groq = new Groq({ 
  apiKey: process.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

export async function generateCleaningGuidance(problem: string): Promise<CleaningGuidance> {
  
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are "Ninja Home Cleaner", an expert AI cleaning assistant specialized in natural, chemical-free cleaning solutions and ancient civilization cleaning wisdom.
        Always respond in valid JSON format matching this exact structure:
        {
          "problemAnalysis": "string",
          "naturalMethods": [
            {
              "title": "string",
              "instructions": ["string"],
              "ingredients": ["string"],
              "tip": "string"
            }
          ],
          "ancientSecrets": [
            {
              "civilization": "string",
              "ingredients": "string",
              "howToUse": "string",
              "whyItWorked": "string"
            }
          ],
          "safetyTip": "string"
        }
        Provide exactly 5 naturalMethods and exactly 2 ancientSecrets.
        Return ONLY the JSON object, no extra text.`
      },
      {
        role: "user",
        content: `Cleaning problem: ${problem}`
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error("No response from Ninja Home Cleaner.");
  }

  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as CleaningGuidance;
}
