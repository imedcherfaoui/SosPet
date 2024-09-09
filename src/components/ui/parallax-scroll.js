import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { cn } from "../../utils/utils";

export const ParallaxScroll = ({ animals, className }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(animals.length / 3);

  const firstPart = animals.slice(0, third);
  const secondPart = animals.slice(third, 2 * third);
  const thirdPart = animals.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-full mx-auto gap-10 py-40 px-10 bg-yellow-200">
        <div className="grid gap-10">
          {firstPart.map((animal, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              className="bg-neutral-600/60 shadow-lg rounded-lg p-5"
            >
              <h2 className="text-lg text-neutral-50 font-bold mb-10">
                {animal.name}
              </h2>
              {Object.entries(animal.characteristics).map(([key, value], i) => (
                <p key={i} className="text-neutral-200">
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((animal, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <h2 className="text-lg font-bold">{animal.name}</h2>
              {Object.entries(animal.characteristics).map(([key, value], i) => (
                <p key={i}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((animal, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <h2 className="text-lg font-bold">{animal.name}</h2>
              {Object.entries(animal.characteristics).map(([key, value], i) => (
                <p key={i}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
