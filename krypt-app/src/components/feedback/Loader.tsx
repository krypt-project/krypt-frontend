import { motion } from "framer-motion";
import clsx from "clsx";

interface LoaderProps {
  variant?: "inline" | "global";
  size?: number;
  message?: string;
}

export default function Loader({
  variant = "inline",
  size = 24,
  message,
}: LoaderProps) {
  const isGlobal = variant === "global";
  const dimension = isGlobal ? 40 : size;

  return (
    <div
      className={clsx("flex items-center justify-center", {
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm": isGlobal,
        "w-fit h-fit": !isGlobal,
      })}
    >
      {isGlobal ? (
        <div className="bg-[var(--background)] rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
          <motion.div
            className="rounded-full border-2 border-[var(--primary)] border-t-transparent"
            style={{ width: dimension, height: dimension }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
          />
          {message && <p className="mt-4 text-black text-center">{message}</p>}
        </div>
      ) : (
        <motion.div
          className="rounded-full border-2 border-[var(--primary)] border-t-transparent"
          style={{ width: dimension, height: dimension }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1,
          }}
        />
      )}
    </div>
  );
}
