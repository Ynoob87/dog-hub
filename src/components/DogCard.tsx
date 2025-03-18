"use client";

import { getDog } from "@/lib/api";
import { Dog } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function DogCard({
  initialDog,
  preloadedDog,
}: {
  initialDog: Dog;
  preloadedDog: Dog;
}) {
  const [dog, setDog] = useState<Dog>(initialDog);
  const [nextDog, setNextDog] = useState<Dog>(preloadedDog);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [previousDirection, setPreviousDirection] = useState<
    "left" | "right" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const preloadNextDog = async () => {
    try {
      const newDog = await getDog();
      setNextDog(newDog);
    } catch (error) {
      console.error("預取下一個狗狗失敗:", error);
    }
  };

  const fetchNewDog = async (swipeDirection: "left" | "right") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection(swipeDirection);
    setPreviousDirection(swipeDirection);

    setTimeout(() => {
      setDog(nextDog);
      preloadNextDog();
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    preloadNextDog();
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => fetchNewDog("left"),
    onSwipedRight: () => fetchNewDog("right"),
    trackMouse: true,
  });

  return (
    <div className="relative w-full max-w-xs">
      <AnimatePresence mode="wait">
        {/* 當前卡片 */}
        <motion.div
          key={dog.id}
          initial={{
            x:
              previousDirection === "left"
                ? "100%"
                : previousDirection === "right"
                ? "-100%"
                : 0,
          }}
          animate={{ x: 0 }}
          exit={{
            x:
              direction === "left"
                ? "-100%"
                : direction === "right"
                ? "100%"
                : 0,
          }}
          transition={{ type: "tween", duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          {...swipeHandlers}
        >
          {/* 狗狗圖片 */}
          <div className="aspect-square w-full relative overflow-hidden bg-slate-100">
            <Image
              src={dog.imageUrl}
              alt={dog.name}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              priority
              className="object-cover"
            />
          </div>

          {/* 狗狗名字 */}
          <div className="p-5 flex-1">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800">{dog.name}</h2>
            </div>
          </div>

          {/* 按鈕 */}
          <div className="p-5 flex justify-center gap-12">
            <button
              onClick={() => fetchNewDog("left")}
              className="w-25 h-15 flex items-center justify-center rounded-xl bg-stone-200 text-stone-400 active:scale-95"
            >
              <X size={24} />
            </button>

            <button
              onClick={() => fetchNewDog("right")}
              className="w-25 h-15 flex items-center justify-center rounded-xl bg-red-500 text-white active:scale-95"
            >
              <Heart size={24} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 下一張卡片（隱藏） */}
      <div style={{ display: "none" }}>
        <Image
          src={nextDog.imageUrl}
          alt={nextDog.name}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
