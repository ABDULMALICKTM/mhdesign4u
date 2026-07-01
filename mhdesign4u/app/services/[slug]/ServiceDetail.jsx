"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import TiltCard from "../../components/TiltCard";

export default function ServiceDetail({ service, otherServices }) {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(`.${styles.heroEyebrow}`, { y: 16, opacity: 0, duration: 0.6 })
        .from(`.${styles.heroTitle}`, { y: 36, opacity: 0, duration: 0.9 }, "-=0.3")
        .from(`.${styles.heroSummary}`, { y: 20, opacity: 0, duration: 0.8 }, "-=0.55")
        .from(`.${styles.heroStat}`, { scale: 0.9, opacity: 0, duration: 0.7 }, "-=0.6");

      gsap.utils.toArray(`.${styles.reveal}`).forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(`.${styles.processStep}`).forEach((el, i) => {
        gsap.from(el, {
          x: -30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: i * 0.02,
        });
      });
    }, rootRef);

    return () => ctx.revert();
    // Re-run whenever the slug (and therefore content) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.slug]);

  return (
    <div ref={rootRef} key={service.slug} className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <span className={`eyebrow ${styles.heroEyebrow}`}>Capability</span>
        <h1 className={styles.heroTitle}>{service.name}</h1>
        <p className={styles.heroSummary}>{service.summary}</p>
        <div className={styles.heroStat}>
          <span className={styles.heroStatValue}>{service.heroStat.value}</span>
          <span className={styles.heroStatLabel}>{service.heroStat.label}</span>
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={`glass ${styles.deliverablesPanel} ${styles.reveal}`}>
          <span className="eyebrow">What's included</span>
          <ul className={styles.deliverablesList}>
            {service.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={`${styles.sectionHead} ${styles.reveal}`}>
          <span className="eyebrow">How it runs</span>
          <h2 className={styles.sectionTitle}>Process</h2>
        </div>
        <div className={styles.processList}>
          {service.process.map((p, i) => (
            <div key={p.step} className={styles.processStep}>
              <span className={styles.processIndex}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.processTitle}>{p.step}</h3>
                <p className={styles.processDetail}>{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={`${styles.sectionHead} ${styles.reveal}`}>
          <span className="eyebrow">Investment</span>
          <h2 className={styles.sectionTitle}>Indicative tiers</h2>
        </div>
        <div className={`${styles.tiersGrid} ${styles.reveal}`}>
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`glass ${styles.tierCard}`}>
              <h3 className={styles.tierName}>{tier.name}</h3>
              <p className={styles.tierPrice}>
                ₹{tier.price.toLocaleString("en-IN")}
                <span> / {tier.unit}</span>
              </p>
              <p className={styles.tierDesc}>{tier.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/calculator" className={styles.calcLink} data-cursor="magnetic">
          Get an exact estimate in the calculator →
        </Link>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={`${styles.sectionHead} ${styles.reveal}`}>
          <span className="eyebrow">More capabilities</span>
          <h2 className={styles.sectionTitle}>Other services</h2>
        </div>
        <div className={`${styles.otherGrid} ${styles.reveal}`}>
          {otherServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} data-cursor="view">
              <TiltCard accent={s.color} className={styles.otherCard}>
                <h4>{s.name}</h4>
                <p>{s.short}</p>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
