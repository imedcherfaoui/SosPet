import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 1,
}) => {
  const controls = useAnimation();
  let paragraphs = words.split("\n"); // Splitting text into paragraphs by newline

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
      transition: { delay: i * 0.08, duration: duration },
    }));
  }, [words, filter, duration]);

  const renderParagraphs = () => {
    return paragraphs.map((paragraph, pIdx) => (
      <div key={pIdx} className="mb-4 last:mb-0">
        {" "}
        {/* Each paragraph */}
        {paragraph.split(" ").map(
          (
            word,
            wIdx // Split paragraph into words
          ) => (
            <motion.span
              key={pIdx + "-" + wIdx}
              initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
              custom={pIdx * 10 + wIdx} // Staggering effect considers both paragraph and word index
              animate={controls}
              className="inline-block mr-1 last:mr-0" // Each word treated as inline-block for proper spacing
            >
              {word + (wIdx < paragraph.split(" ").length - 1 ? " " : "")}{" "}
              {/* Preserve spaces between words */}
            </motion.span>
          )
        )}
      </div>
    ));
  };

  return (
    <div
      className={
        className +
        " font-bold text-orange-100 bg-gradient-to-b from-orange-300/30 to-orange-700/30 p-5 rounded-[22px] text-2xl leading-snug tracking-wide h-[20rem] overflow-scroll"
      }
    >
      {renderParagraphs()}
    </div>
  );
};
