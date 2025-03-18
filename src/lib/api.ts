import { dogNames } from "@/constants";
import { Dog } from "@/types";

export async function getDog(): Promise<Dog> {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
      next: { revalidate: 0 },
    });
    const data = await res.json();

    return {
      id: crypto.randomUUID(),
      name: dogNames[Math.floor(Math.random() * dogNames.length)],
      imageUrl: data.message,
    };
  } catch (error) {
    console.error("獲取狗狗數據失敗:", error);

    return {
      id: "fallback",
      name: "unknown",
      imageUrl: "",
    };
  }
}
