import DogCard from "@/components/DogCard";
import { getDog } from "@/lib/api";

export default async function DogsPage() {
  const [initialDog, nextDog] = await Promise.all([getDog(), getDog()]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-rose-400">Dog</span>
        <span className="text-white">Hub</span>
        <span className="ml-2">🐶</span>
      </h1>

      <DogCard initialDog={initialDog} preloadedDog={nextDog} />

      <p className="mt-8 text-sm text-slate-400">
        向左/右滑動或點擊按鈕查看更多狗狗
      </p>
    </div>
  );
}
