"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PrismOrb.module.css";

/**
 * PRIS-M — the mhdesign4u brand character.
 * A translucent glass orb that:
 *  1. Organically morphs its border-radius on an infinite GSAP timeline.
 *  2. Follows the cursor with magnetic latency (slow quickTo lag) when
 *     the pointer is inside its bounding viewport.
 *  3. Idles back to center with a gentle float when the pointer leaves.
 *
 * size: "hero" (nav-scale, small) | "full" (about page viewport, large)
 */
export default function PrismOrb({ size = "full" }) {
  const viewportRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const orb = orbRef.current;
    if (!viewport || !orb) return undefined;

    // Organic shape morph — infinite, alternating, never fully symmetric.
    const morphTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 4, ease: "sine.inOut" } });
    morphTl
      .to(orb, { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" })
      .to(orb, { borderRadius: "60% 40% 30% 70% / 55% 65% 35% 45%" })
      .to(orb, { borderRadius: "35% 65% 55% 45% / 65% 35% 65% 35%" });

    // Slow ambient float so it never looks fully static at rest.
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(orb, { y: -18, x: 10, duration: 5, ease: "sine.inOut" });

    const moveX = gsap.quickTo(orb, "x", { duration: 1.1, ease: "power3.out" });
    const moveY = gsap.quickTo(orb, "y", { duration: 1.1, ease: "power3.out" });
    const scaleTo = gsap.quickTo(orb, "scale", { duration: 0.6, ease: "power2.out" });

    let hovering = false;

    const handleMove = (e) => {
      const rect = viewport.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      const clampX = gsap.utils.clamp(-rect.width * 0.25, rect.width * 0.25, relX * 0.4);
      const clampY = gsap.utils.clamp(-rect.height * 0.25, rect.height * 0.25, relY * 0.4);
      moveX(clampX);
      moveY(clampY);
    };

    const handleEnter = () => {
      hovering = true;
      scaleTo(1.08);
      floatTl.pause();
    };

    const handleLeave = () => {
      hovering = false;
      scaleTo(1);
      moveX(0);
      moveY(0);
      floatTl.play();
    };

    viewport.addEventListener("mousemove", handleMove);
    viewport.addEventListener("mouseenter", handleEnter);
    viewport.addEventListener("mouseleave", handleLeave);

    return () => {
      viewport.removeEventListener("mousemove", handleMove);
      viewport.removeEventListener("mouseenter", handleEnter);
      viewport.removeEventListener("mouseleave", handleLeave);
      morphTl.kill();
      floatTl.kill();
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${size === "hero" ? styles.heroScale : styles.fullScale}`}
      data-cursor="magnetic"
    >
      <div className={styles.grid} />
      <div ref={orbRef} className={styles.orb}>
        <div className={styles.core} />
        <div className={styles.sheen} />
      </div>
      {size === "full" && (
        <span className={styles.tag}>
          PRIS-M <em>// live viewport</em>
        </span>
      )}
    </div>
  );
}
