"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import PrismOrb from "./components/PrismOrb";
import TiltCard from "./components/TiltCard";
import { services, sectors } from "./lib/servicesData";

export default function HomePage() {
  const rootRef = useRef(null);
  const rowARef = useRef(null);
  const rowBRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // ---- Intro reveal ----------------------------------------------
      const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      introTl
        .from(`.${styles.eyebrowIn}`, { y: 20, opacity: 0, duration: 0.7 })
        .from(
          `.${styles.rowInner}`,
          { yPercent: 110, duration: 1.1, stagger: 0.08 },
          "-=0.35"
        )
        .from(`.${styles.heroSub}`, { y: 24, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(`.${styles.heroActions} > *`, { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .from(`.${styles.heroOrbWrap}`, { scale: 0.85, opacity: 0, duration: 1 }, "-=0.9");

      // ---- Kinetic header: rows skew/slide opposite directions --------
      gsap.to(rowARef.current, {
        xPercent: -14,
        skewX: -4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(rowBRef.current, {
        xPercent: 14,
        skewX: 4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // ---- Generic scroll reveals for sections -------------------------
      gsap.utils.toArray(`.${styles.reveal}`).forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        });
      });

      // ---- Stat counters -------------------------------------------
      gsap.utils.toArray(`.${styles.statValue}`).forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });

      // ---- Sector marquee, continuous horizontal drift ---------------
      const marquee = document.querySelector(`.${styles.marqueeTrack}`);
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          duration: 26,
          ease: "none",
          repeat: -1,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      {/* ============================= HERO ============================= */}
      <section ref={heroRef} className={styles.hero}>
        <div className={`shell ${styles.heroShell}`}>
          <span className={`eyebrow ${styles.eyebrowIn}`}>
            Bangalore, India — Est. 2018
          </span>

          <h1 className={styles.kinetic} aria-label="mhdesign4u — design & development studio">
            <span ref={rowARef} className={styles.kineticRow}>
              <span className={styles.rowInner}>mhdesign</span>
            </span>
            <span ref={rowBRef} className={`${styles.kineticRow} ${styles.rowAlt}`}>
              <span className={styles.rowInner}>4u&nbsp;studio</span>
            </span>
          </h1>

          <p className={`${styles.heroSub}`}>
            A Bangalore design & development studio building interfaces for
            banking, healthcare, HR and commerce teams who can&apos;t afford a
            confusing screen — since 2018.
          </p>

          <div className={styles.heroActions}>
            <Link href="/calculator" className={styles.primaryBtn} data-cursor="magnetic">
              Estimate a project
            </Link>
            <Link href="/about" className={styles.secondaryBtn} data-cursor="magnetic">
              Meet PRIS-M
            </Link>
          </div>
        </div>

        <div className={styles.heroOrbWrap} data-cursor="view">
          <PrismOrb size="hero" />
        </div>
      </section>

      {/* ============================= MANIFESTO ============================= */}
      <section className={`shell ${styles.section}`}>
        <div className={`glass ${styles.manifesto} ${styles.reveal}`}>
          <span className="eyebrow">What we believe</span>
          <p className={styles.manifestoText}>
            Most agencies decorate a product after it&apos;s built. We architect
            it — research, structure, and interface as one continuous system —
            so the thing you ship still makes sense at feature two hundred.
          </p>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statValue} data-count="2018">2018</span>
              <span className={styles.statLabel}>Founded in Bangalore</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue} data-count="120">0</span>
              <span className={styles.statLabel}>Projects shipped</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue} data-count="7">0</span>
              <span className={styles.statLabel}>Sectors served</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue} data-count="5">0</span>
              <span className={styles.statLabel}>Core disciplines</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= SECTORS MARQUEE ============================= */}
      <section className={styles.section}>
        <div className={`shell ${styles.sectionHead} ${styles.reveal}`}>
          <span className="eyebrow">Sectors we serve</span>
          <h2 className={styles.sectionTitle}>
            Regulated, complex, and detail-heavy industries.
          </h2>
          <Link href="/sectors" className={styles.textLink} data-cursor="magnetic">
            View sector grid →
          </Link>
        </div>

        <div className={styles.marqueeMask}>
          <div className={styles.marqueeTrack}>
            {[...sectors, ...sectors].map((s, i) => (
              <span key={`${s.slug}-${i}`} className={styles.marqueeItem}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= SERVICES GRID ============================= */}
      <section className={`shell ${styles.section}`}>
        <div className={`${styles.sectionHead} ${styles.reveal}`}>
          <span className="eyebrow">What we do</span>
          <h2 className={styles.sectionTitle}>Five disciplines, one system.</h2>
        </div>

        <div className={`${styles.servicesGrid} ${styles.reveal}`}>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} data-cursor="view">
              <TiltCard accent={service.color} className={styles.serviceCard}>
                <span className={styles.serviceIndex}>{service.heroStat.value}</span>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceShort}>{service.short}</p>
                <span className={styles.serviceArrow}>Explore →</span>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className={`shell ${styles.section}`}>
        <div className={`glass ${styles.ctaPanel} ${styles.reveal}`}>
          <h2 className={styles.ctaTitle}>Get a scoped estimate in two minutes.</h2>
          <p className={styles.ctaSub}>
            Pick a service and tier, and our calculator gives you a live number
            — no forms, no follow-up call required to see a range.
          </p>
          <Link href="/calculator" className={styles.primaryBtn} data-cursor="magnetic">
            Open the calculator
          </Link>
        </div>
      </section>

      <footer className={`shell ${styles.footer}`}>
        <span>mhdesign4u © {new Date().getFullYear()} — Bangalore, India</span>
        <span>Founded 2018</span>
      </footer>
    </div>
  );
}
