import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <motion.div
        className="flex gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="block w-3 h-3 rounded-full bg-[var(--primary)]"
            variants={{
              hidden: { y: 0, opacity: 0.3 },
              visible: {
                y: -8,
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.5,
                },
              },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
