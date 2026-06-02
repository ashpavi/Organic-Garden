import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutHeroArtwork from "../../components/store/AboutHeroArtwork";

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

  switch (name) {
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M2 12h20M12 2c2 3 2 7 0 12c2-5 2-9 0-12z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M21 11c-3 1-6 1-9 4-3 3-4 6-4 6s3-1 6-4c3-3 3-6 4-9z" />
          <path d="M7 7c4 0 6 4 10 8" />
        </svg>
      );
    case "tea":
      return (
        <svg {...common}>
          <path d="M3 8h13v5a4 4 0 01-4 4H9" />
          <path d="M17 10a3 3 0 010 6" />
        </svg>
      );
    case "chili":
      return (
        <svg {...common}>
          <path d="M3 21c6-6 10-10 18-12" />
          <path d="M14 7c2 2 4 4 6 6" />
          <path d="M20 4c-1 1-2 1-3 2" />
        </svg>
      );
    case "fruit":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M14 8c1-1 2-2 3-2" />
        </svg>
      );
    case "bowl":
      return (
        <svg {...common}>
          <path d="M3 12c3 4 6 6 9 6s6-2 9-6" />
          <path d="M8 8c1-2 3-3 4-3s3 1 4 3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

const aboutSectionsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --purple: #1a5228;
    --purple-mid: #2e8b57;
    --purple-light: #d8f3de;
    --gold: #2e8b57;
    --gold-light: #e8f8ee;
    --editorial-blue: #2e8b57;
    --dark: #0f3d1d;
    --text: #1f5f2f;
    --muted: #6b7280;
    --white: #ffffff;
    --off-white: #fafaf9;
    --border: #e5e7eb;
  }

  .values-section {
    padding: 88px 40px 40px;
    background: var(--white);
    position: relative;
    overflow: hidden;
  }

  .values-section::before {
    content: '';
    position: absolute;
    top: -120px; left: -120px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,139,87,0.1) 0%, transparent 70%);
  }

  .values-section::after {
    content: '';
    position: absolute;
    bottom: -100px; right: -80px;
    width: 350px; height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,139,87,0.1) 0%, transparent 70%);
  }

  .section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #2e8b57;
    margin-bottom: 16px;
    display: block;
  }

  .values-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 58px);
    font-weight: 700;
    color: var(--dark);
    line-height: 1.15;
    margin-bottom: 16px;
  }

  .values-title em {
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-weight: 700;
    color: #2e8b57;
  }

  .values-subtitle {
    font-size: 16px;
    color: var(--muted);
    max-width: 420px;
    line-height: 1.7;
    margin-bottom: 64px;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    position: relative;
    z-index: 1;
  }

  .value-card {
    padding: 40px 32px;
    border: 1px solid var(--border);
    background: #fdfcf9;
    transition: background 0.3s ease, transform 0.3s ease;
    cursor: default;
    font-family: 'Playfair Display', serif;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .value-card:hover {
    background: #e8f8ee;
    transform: translateY(-4px);
  }

  .value-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(46,139,87,0.14);
    color: var(--purple-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    font-size: 22px;
  }

  .category-number {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #2e8b57;
    margin-bottom: 8px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .value-name {
    font-size: 22px;
    font-weight: 700;
    color: var(--dark);
    letter-spacing: 0.2px;
    margin-bottom: 12px;
  }

  .value-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #4b5563;
    line-height: 1.75;
  }

  .value-number {
    font-family: 'Playfair Display', serif;
    font-size: clamp(54px, 4.5vw, 68px);
    font-weight: 700;
    font-variant-numeric: oldstyle-nums proportional-nums;
    font-feature-settings: "onum" 1, "pnum" 1;
    letter-spacing: 0.5px;
    color: rgba(46,139,87,0.42);
    position: absolute;
    top: 12px;
    right: 20px;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  .how-section {
    padding: 56px 40px 100px;
    background: var(--white);
    position: relative;
  }

  .how-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .how-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 14px;
  }

  .how-title span {
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-weight: 700;
    color: #2e8b57;
  }

  .how-sub {
    font-size: 16px;
    color: var(--muted);
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .how-steps {
    display: grid;
    grid-template-columns: 1fr 60px 1fr 60px 1fr;
    align-items: start;
    max-width: 900px;
    margin: 0 auto;
    gap: 0;
  }

  .how-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    color: var(--purple-light);
    font-size: 28px;
  }

  .how-step {
    text-align: center;
    padding: 0 16px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .how-step.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .step-circle {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 32px;
    position: relative;
    transition: background 0.3s;
  }

  .step-icon {
    color: var(--purple-mid);
    font-size: 30px;
    line-height: 1;
  }

  .how-step:hover .step-circle {
    background: var(--purple-mid);
  }

  .step-num {
    position: absolute;
    top: -6px; right: -6px;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--purple-mid);
    color: var(--white);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 10px;
  }

  .step-title .accent-amp {
    color: #2e8b57;
  }

  .step-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 200px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .values-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }
    .values-section { padding: 56px 24px 28px; }
  }
`;

const values = [
  {
    icon: "target",
    name: "Our Mission",
    desc: "To provide safe, high-quality organic products that improve the health and well-being of our customers while supporting local agriculture and sustainable production methods.",
  },
  {
    icon: "globe",
    name: "Our Vision",
    desc: "To become a trusted Sri Lankan brand that promotes healthy living through natural, sustainable, and eco-friendly food products — bringing the goodness of nature to every home.",
  },
];


function ValuesSection() {
  return (
    <section className="values-section">
      <span className="section-label">WHAT WE STAND FOR</span>
      <h2 className="values-title">
        Purpose rooted in <em>nature</em>
      </h2>
      <p className="values-subtitle"> </p>
      <div className="values-grid">
        {values.map((v, i) => (
          <div className="value-card" key={i} style={{ position: "relative" }}>
            <div className="value-icon"><Icon name={v.icon} size={22} /></div>
            <div className="value-name">{v.name}</div>
            <div className="value-desc">{v.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


function AboutSections() {
  return (
    <>
      <style>{aboutSectionsStyles}</style>
      <ValuesSection />
      <CategoriesSection />
    </>
  );
}

const categories = [
  {
    icon: "tea",
    number: "01",
    title: "Herbal Tea",
    desc: "Crafted from curry leaves, hibiscus, lotus flowers, and more — designed to support wellness, improve digestion, and boost immunity naturally.",
  },
  {
    icon: "chili",
    number: "02",
    title: "Natural Spices",
    desc: "Premium-quality spices packed with natural aroma and flavor, hygienically processed while maintaining their full nutritional value.",
  },
  {
    icon: "fruit",
    number: "03",
    title: "Dehydrated Fruits",
    desc: "Prepared using advanced dehydration techniques to preserve natural taste, vitamins, and freshness — with no harmful additives.",
  },
  {
    icon: "leaf",
    number: "04",
    title: "Dehydrated Vegetables",
    desc: "Nutritious and convenient — carefully processed to maintain quality and flavor, perfect for healthy cooking and long-term storage.",
  },
  {
    icon: "bowl",
    number: "05",
    title: "Ready-to-Cook Soups",
    desc: "Healthy and convenient soup mixes made from natural vegetables and herbs. Easy to prepare and packed with nutrition for daily wellness.",
  },
];

function CategoriesSection() {
  return (
    <section className="values-section categories-section">
      <span className="section-label">OUR PRODUCT CATEGORIES</span>
      <h2 className="values-title">
        Goodness of nature, <em>every</em> form
      </h2>
      <div className="values-grid category-grid" style={{ marginTop: 24 }}>
        {categories.map((c, i) => (
          <div className="value-card category-card" key={i}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div className="value-icon category-icon"><Icon name={c.icon} size={20} /></div>
              <div>
                <div className="category-number">{c.number}</div>
                <div className="value-name">{c.title}</div>
              </div>
            </div>
            <div className="value-desc" style={{ marginTop: 12 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="relative text-white px-6 py-24 text-center overflow-hidden">

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <AboutHeroArtwork className="h-full w-full" />
        </div>

        <div className="relative max-w-3xl mx-auto">

          <span className="inline-block text-xs tracking-widest uppercase bg-green-500/20 border border-green-300/40 px-4 py-1 rounded-full mb-6">
            Our Story
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Welcome to <span className="text-[#9EF7B1]">Organic Garden</span>
          </h1>

          <p className="mt-6 text-gray-300 text-base sm:text-lg">
            We believe that nature provides the best solutions for a healthy lifestyle.
            Our mission is to bring high-quality, natural, and carefully prepared organic
            products directly to your home.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <button
              onClick={() => navigate("/products")}
              className="bg-[#2E8B57] px-6 py-3 rounded-xl font-semibold hover:bg-[#3A9C66] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.14)] transition"
            >
              Explore Our Store
            </button>

          </div>
        </div>
      </section>

      <AboutSections />


      {/* CTA */}
      <section className="bg-[#143d20]">
        <div className="w-full bg-[#143d20] text-white text-center px-6 py-12 sm:px-10 sm:py-16 shadow-[0_12px_40px_rgba(20,61,32,0.35)]">
          <h2 className="text-3xl font-bold">
            Start Living Healthier, Naturally
          </h2>

          <p className="mt-4 text-white/80">
            Discover premium organic products — 100% natural, no harmful chemicals, islandwide delivery available across Sri Lanka.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-[#2E8B57] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#3A9C66] transition"
          >
            Explore Our Store →
          </button>
        </div>
      </section>

    </div>
  );
}