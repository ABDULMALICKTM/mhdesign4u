"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./page.module.css";
import { services } from "../lib/servicesData";

const ADD_ONS = [
  { id: "rush", label: "Rush delivery (2x speed)", multiplier: 1.35 },
  { id: "multilang", label: "Multi-language / localization", multiplier: 1.18 },
  { id: "ongoing", label: "Ongoing support retainer", multiplier: 1.12 },
  { id: "accessibility", label: "WCAG 2.1 AA accessibility audit", multiplier: 1.08 },
];

export default function CalculatorPage() {
  const [serviceSlug, setServiceSlug] = useState(services[0].slug);
  const [tierIndex, setTierIndex] = useState(0);
  const [addOns, setAddOns] = useState([]);

  const tickerRef = useRef(null);
  const tickerValue = useRef(0);

  const service = useMemo(
    () => services.find((s) => s.slug === serviceSlug) ?? services[0],
    [serviceSlug]
  );
  const tier = service.tiers[tierIndex] ?? service.tiers[0];

  const total = useMemo(() => {
    const multiplier = addOns.reduce((acc, id) => {
      const addOn = ADD_ONS.find((a) => a.id === id);
      return acc * (addOn ? addOn.multiplier : 1);
    }, 1);
    return Math.round((tier.price * multiplier) / 500) * 500;
  }, [tier, addOns]);

  // Animate the ticker to the new total any time it changes.
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return undefined;

    const tween = gsap.to(tickerValue, {
      current: total,
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = `₹${Math.round(tickerValue.current).toLocaleString("en-IN")}`;
      },
    });

    return () => tween.kill();
  }, [total]);

  const toggleAddOn = (id) => {
    setAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  return (
    <div className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <span className="eyebrow">Estimate builder</span>
        <h1 className={styles.heroTitle}>Scope it. See the number move.</h1>
        <p className={styles.heroLead}>
          Pick a service, a tier, and any add-ons. The estimate updates live —
          this is a starting range, not a final quote.
        </p>
      </section>

      <section className={`shell ${styles.grid}`}>
        <div className={styles.controls}>
          <div className={`glass ${styles.controlCard}`}>
            <span className="eyebrow">1. Service</span>
            <div className={styles.serviceList}>
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  className={`${styles.serviceBtn} ${s.slug === serviceSlug ? styles.serviceBtnActive : ""}`}
                  onClick={() => {
                    setServiceSlug(s.slug);
                    setTierIndex(0);
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className={`glass ${styles.controlCard}`}>
            <span className="eyebrow">2. Tier</span>
            <div className={styles.tierList}>
              {service.tiers.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  className={`${styles.tierBtn} ${i === tierIndex ? styles.tierBtnActive : ""}`}
                  onClick={() => setTierIndex(i)}
                >
                  <span className={styles.tierBtnName}>{t.name}</span>
                  <span className={styles.tierBtnDesc}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`glass ${styles.controlCard}`}>
            <span className="eyebrow">3. Add-ons</span>
            <div className={styles.addOnList}>
              {ADD_ONS.map((a) => (
                <label key={a.id} className={styles.addOnRow}>
                  <input
                    type="checkbox"
                    checked={addOns.includes(a.id)}
                    onChange={() => toggleAddOn(a.id)}
                  />
                  <span>{a.label}</span>
                  <span className={styles.addOnMultiplier}>+{Math.round((a.multiplier - 1) * 100)}%</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={`glass ${styles.summary}`}>
          <span className="eyebrow">Estimated range</span>
          <div ref={tickerRef} className={styles.ticker}>
            ₹0
          </div>
          <span className={styles.tickerUnit}>{tier.unit === "per month" ? "per month" : "one-time"}</span>

          <div className={styles.summaryDivider} />

          <div className={styles.summaryLine}>
            <span>Service</span>
            <span>{service.name}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Tier</span>
            <span>{tier.name}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Add-ons</span>
            <span>{addOns.length ? `${addOns.length} selected` : "None"}</span>
          </div>

          <p className={styles.summaryNote}>
            This estimate is directional. Final scope is confirmed after a
            short discovery call.
          </p>

          <a
            href={`mailto:hello@mhdesign4u.com?subject=Project estimate — ${encodeURIComponent(
              service.name
            )} (${tier.name})&body=${encodeURIComponent(
              `Service: ${service.name}\nTier: ${tier.name}\nAdd-ons: ${addOns.join(", ") || "None"}\nEstimated range: ₹${total.toLocaleString("en-IN")}`
            )}`}
            className={styles.emailBtn}
            data-cursor="magnetic"
          >
            Email this estimate to us
          </a>
        </div>
      </section>
    </div>
  );
}
