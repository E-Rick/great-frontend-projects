import { cn } from "@/lib/utils";
import React, { MouseEvent, useRef, useState } from "react";

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    scrollContainerRef.current.classList.add("cursor-grabbing");
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove("cursor-grabbing");
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={cn(
        "scrollable-container relative flex w-full cursor-grab gap-4 overflow-hidden overflow-x-scroll",
        className,
      )}
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
