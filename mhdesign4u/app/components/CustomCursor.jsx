"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

/**
 * Magnetic custom cursor.
 * - Dot follows the pointer instantly.
 * - Ring follows with GSAP quickTo lag for a "magnetic" feel.
 * - Any element with [data-cursor="magnetic"] pulls the ring toward its center.
 * - Any element with [data-cursor="view"] swaps the ring label to "View".
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let magnetTarget = null;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dotX(mouseX);
      dotY(mouseY);

      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Pull the ring toward the magnetic element's center, with a little give.
        ringX(cx + (mouseX - cx) * 0.35);
        ringY(cy + (mouseY - cy) * 0.35);
      } else {
        ringX(mouseX);
        ringY(mouseY);
      }
    };

    const handleOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;
      const mode = target.dataset.cursor;

      if (mode === "magnetic" || mode === "view" || mode === "drag") {
        magnetTarget = target;
        ring.dataset.state = mode;
        if (labelRef.current) {
          labelRef.current.textContent =
            mode === "view" ? "View" : mode === "drag" ? "Drag" : "";
        }
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;
      magnetTarget = null;
      ring.dataset.state = "";
      if (labelRef.current) labelRef.current.textContent = "";
    };

    const handleDown = () => ring.classList.add(styles.pressed);
    const handleUp = () => ring.classList.remove(styles.pressed);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div className={styles.cursorLayer} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}>
        <span ref={labelRef} className={styles.label} />
      </div>
    </div>
  );
}
