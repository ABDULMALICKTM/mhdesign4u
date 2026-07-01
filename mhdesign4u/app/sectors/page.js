"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import TiltCard from "../components/TiltCard";
import { sectors } from "../lib/servicesData";

export default function SectorsPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.heroTitle}`, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
      gsap.from(`.${styles.heroLead}`, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.12,
        ease: "power4.out",
      });

      gsap.from(`.${styles.gridItem}`, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 80%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <span className="eyebrow">Industries</span>
        <h1 className={styles.heroTitle}>
          Sectors where a confusing screen has a real cost.
        </h1>
        <p className={styles.heroLead}>
          Seven industries, one shared discipline: design that stays legible
          under regulation, scale, and scrutiny. Move your cursor across a
          card to feel the depth.
        </p>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={styles.grid}>
          {sectors.map((sector, i) => (
            <div key={sector.slug} className={`${styles.gridItem} ${i === 0 ? styles.spanLarge : ""}`}>
              <TiltCard accent={sector.color} className={styles.sectorCard} intensity={14}>
                <span className={styles.sectorIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.sectorName}>{sector.name}</h3>
                <p className={styles.sectorBlurb}>{sector.blurb}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
