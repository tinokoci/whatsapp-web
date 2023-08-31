import { useEffect, useState, CSSProperties } from "react";

interface Props {
  index: number;
  activeIndex: number;
}

const ProgressBar = ({ index, activeIndex }: Props) => {
  const isActive = index == activeIndex;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(
      () => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(id);
          return prev;
        });
      },
      2000 / 100 - 2, // -2 here so that the bar stays full for a fraction of the time before switching to a new story
    );
    return () => clearInterval(id);
  }, [activeIndex]);

  useEffect(() => {
    if (!isActive) return;
    setProgress(0);
  }, [activeIndex]);

  return (
    <div className={`progressBarContainer ${isActive ? "active" : ""}`}>
      <div
        className={`${isActive ? "progressBar" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
