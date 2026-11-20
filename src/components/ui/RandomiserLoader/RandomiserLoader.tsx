import { useEffect, useState } from "react";
import { Dices } from "lucide-react";
import styles from "./RandomiserLoader.module.css";

const QUIPS = [
  "Scanning your wishlist...",
  "Weighing up the options...",
  "Checking the menus...",
  "Narrowing it down...",
  "Finding your next feast...",
];
const QUIP_INTERVAL_MS = 900;
const FIRST_SPIN_MS = 60;
/** Each spin waits this much longer than the last, so the reel slows down like a slot machine. */
const SLOW_DOWN = 1.15;

export interface RandomiserLoaderProps {
  names: string[];
}

export const RandomiserLoader = ({ names }: RandomiserLoaderProps) => {
  const [spin, setSpin] = useState(0);
  const [quipIndex, setQuipIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setSpin((s) => s + 1), FIRST_SPIN_MS * SLOW_DOWN ** spin);
    return () => clearTimeout(timeout);
  }, [spin]);

  useEffect(() => {
    const interval = setInterval(() => setQuipIndex((i) => i + 1), QUIP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const name = names.length > 0 ? names[spin % names.length] : "???";

  return (
    <div className={styles.container} role="status">
      <Dices size={48} className={styles.dice} />
      <div className={styles.reel}>
        <span key={spin} className={styles.reelName}>
          {name}
        </span>
      </div>
      <p key={quipIndex} className={styles.quip}>
        {QUIPS[quipIndex % QUIPS.length]}
      </p>
    </div>
  );
};

export default RandomiserLoader;
