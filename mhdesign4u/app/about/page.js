"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import PrismOrb from "../components/PrismOrb";

const MILESTONES = [
  {
    year: "2018",
    title: "Two designers, one Bangalore apartment",
    text: "mhdesign4u starts as a two-person freelance practice, taking on brand and web work for early-stage startups around Bangalore.",
  },
  {
    year: "2020",
    title: "First fintech engagement",
    text: "A banking client brings us into a regulated environment for the first time — interfaces where a wrong state costs someone real money.",
  },
  {
    year: "2022",
    title: "Studio, not freelancers",
    text: "We formalize into a studio with dedicated UI/UX, motion, and development tracks, and take on our first HR platform and healthcare clients.",
  },
  {
    year: "2024",
    title: "Seven sectors, one system",
    text: "Our practice areas consolidate into a repeatable system spanning Banking, Healthcare, HR, E-Commerce, B2B, B2C and B2D work.",
  },
  {
    year: "2026",
    title: "Bangalore, still",
    text: "Still headquartered in Bangalore, working with teams across India and remotely worldwide, with PRIS-M as our studio's visual signature.",
  },
];

export default function AboutPage() {
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
        delay: 0.15,
        ease: "power4.out",
      });

      gsap.utils.toArray(`.${styles.milestone}`).forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(`.${styles.reveal}`).forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <span className="eyebrow">The studio</span>
        <h1 className={styles.heroTitle}>
          Built in Bangalore. <br /> Built for systems that hold.
        </h1>
        <p className={styles.heroLead}>
          mhdesign4u has been designing and building digital products since
          2018 — starting in Bangalore, and now working across banking,
          healthcare, HR, and commerce teams who need interfaces that stay
          coherent as they grow.
        </p>
      </section>

      <section className={`shell ${styles.orbSection} ${styles.reveal}`}>
        <div className={styles.orbCopy}>
          <span className="eyebrow">Brand character</span>
          <h2 className={styles.orbTitle}>Meet PRIS-M.</h2>
          <p className={styles.orbText}>
            PRIS-M is mhdesign4u&apos;s visual signature — a translucent glass
            form that never holds one shape for long. It morphs organically
            at rest, and follows your cursor with a half-second of magnetic
            latency, the way considered motion should feel: responsive, but
            never twitchy.
          </p>
          <p className={styles.orbText}>
            Move your cursor over the viewport. PRIS-M is reacting to you in
            real time, rendered entirely in CSS and GSAP — no video, no
            pre-rendered loop.
          </p>
        </div>
        <div className={styles.orbViewport}>
          <PrismOrb size="full" />
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={`${styles.sectionHead} ${styles.reveal}`}>
          <span className="eyebrow">Timeline</span>
          <h2 className={styles.sectionTitle}>Eight years, condensed.</h2>
        </div>

        <div className={styles.timeline}>
          {MILESTONES.map((m) => (
            <div key={m.year} className={`glass ${styles.milestone}`}>
              <span className={styles.milestoneYear}>{m.year}</span>
              <h3 className={styles.milestoneTitle}>{m.title}</h3>
              <p className={styles.milestoneText}>{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={`glass ${styles.valuesPanel} ${styles.reveal}`}>
          <span className="eyebrow">How we work</span>
          <div className={styles.valuesGrid}>
            <div className={styles.value}>
              <h4>Systems before screens</h4>
              <p>We design the underlying structure first, so individual screens stay consistent as the product grows.</p>
            </div>
            <div className={styles.value}>
              <h4>Regulated-industry fluency</h4>
              <p>Years in banking and healthcare mean we default to accessible, auditable, low-ambiguity interfaces.</p>
            </div>
            <div className={styles.value}>
              <h4>One team, full stack</h4>
              <p>Design and development sit in the same studio, so handoff loss doesn&apos;t become your problem.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
