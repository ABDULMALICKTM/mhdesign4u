"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./TiltCard.module.css";

/**
 * TiltCard — wraps children in a card that tilts on the X/Y axes
 * based on the cursor's position relative to the card's center.
 * Also drives a glare highlight that tracks the pointer.
 */
export default function TiltCard({ children, className = "", intensity = 12, accent = "violet" }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return undefined;

    const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.45, ease: "power3.out" });
    const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.45, ease: "power3.out" });
    const translateZ = gsap.quickTo(card, "z", { duration: 0.45, ease: "power3.out" });
    const glareX = glare ? gsap.quickTo(glare, "x", { duration: 0.3, ease: "power3.out" }) : null;
    const glareY = glare ? gsap.quickTo(glare, "y", { duration: 0.3, ease: "power3.out" }) : null;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      rotateY(px * intensity);
      rotateX(-py * intensity);
      translateZ(18);

      if (glareX && glareY) {
        glareX(px * rect.width);
        glareY(py * rect.height);
      }
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
      translateZ(0);
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity]);

  return (
    <div className={styles.wrap}>
      <div ref={cardRef} className={`${styles.card} ${styles[accent] || ""} ${className}`}>
        <div ref={glareRef} className={styles.glare} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
