import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL_MS = 2500;

type SliderProps = {
  images: string[];
};

export default function Slider({ images }: SliderProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* 슬라이드 트랙 */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full">
            <img
              src={src}
              alt={`banner-${i}`}
              className="w-full h-[280px] object-cover md:h-[300px]"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 도트 내비게이션 */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75 dark:bg-neutral-500 dark:hover:bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
