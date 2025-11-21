import { GoogleGenAI, Type } from "@google/genai";
import { ImageResolution } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateArchitecturalImage = async (
  prompt: string,
  resolution: ImageResolution
): Promise<string> => {
  // Enhancing prompt with brand guidelines
  const enhancedPrompt = `
    Architectural render, photorealistic, cinematic lighting.
    Style: Modern minimal, clean lines, precise geometry, warm minimalism.
    Materials: Concrete, stone, wood, matte finishes.
    Lighting: Soft morning or afternoon light, warm tones (3000K), clear highlights, soft intentional shadows.
    Composition: Symmetrical or rule of thirds, straight architectural lines.
    Subject: ${prompt}.
    No clutter, no noise, high contrast.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: resolution, 
        },
      },
    });

    // Iterate to find the image part
    for (const part of response.candidates![0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

export const generateBrandCopy = async (topic: string, type: 'email' | 'social' | 'description'): Promise<string> => {
  const systemInstruction = `
    You are the Brand Director for OAStudio (Origin Architecture Studio).
    
    BRAND VOICE & TONE:
    - Primary Tone: Architectural-Tech Minimalism (Confident, Intelligent, Precise, Modern, Minimal).
    - Secondary Tone: Warm Professionalism (Bold, Structured, Human).
    
    DO:
    - Speak with clarity and confidence.
    - Use short sentences and powerful statements.
    - Use architectural language (space, proportion, light, structure, flow).
    - Speak with intention — no unnecessary words.
    
    DON'T:
    - Don't over-explain.
    - Don't use emotional exaggeration ("amazing", "super").
    - Don't sound corporate or bureaucratic.
    - Don't talk too much — silence and simplicity = premium.
    
    VOCABULARY:
    Clarity, Proportion, Minimal, Refined, Structure, Flow, Materiality, Geometry, Function.
    
    Task: Write a ${type} about: ${topic}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: topic,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: {
            thinkingBudget: 32768, 
        }
      },
    });

    return response.text || "Could not generate text.";
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    throw error;
  }
};
