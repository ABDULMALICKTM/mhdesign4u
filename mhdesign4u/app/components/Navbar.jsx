"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/sectors", label: "Sectors" },
  { href: "/services/website-design-development", label: "Services" },
  { href: "/calculator", label: "Calculator" },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    gsap.set(nav, { yPercent: 0 });
    const tween = gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
    );

    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 120) {
        gsap.to(nav, { yPercent: -120, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power3.out" });
      }
      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      tween.kill();
    };
  }, []);

  return (
    <header ref={navRef} className={styles.nav}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.mark} data-cursor="magnetic">
          <span className={styles.markDot} />
          mhdesign4u
        </Link>

        <nav className={styles.links}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} data-cursor="magnetic">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/calculator" className={styles.cta} data-cursor="magnetic">
          Start a project
        </Link>
      </div>
    </header>
  );
}
