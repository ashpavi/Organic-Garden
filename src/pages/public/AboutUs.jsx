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
    max-width: 850px;
    line-height: 1.8;
    margin: 0 auto 64px auto;
    text-align: center;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 450px));
    justify-content: center;
    gap: 32px;
  }

  .value-card {
    padding: 40px 32px;
    border-radius: 24px;
    border: 1px solid #e5f4e9;
    background: white;
    box-shadow: 0 8px 25px rgba(0,0,0,0.04);
    transition: all 0.3s ease;
  }

 .value-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(46,139,87,0.15);
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

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">

          <span className="section-label">
            WHAT WE STAND FOR
          </span>

          <h2 className="values-title">
            About <em>Organic Garden</em>
          </h2>

          <p className="values-subtitle">
            At Organic Garden, we believe that nature provides the best
            solutions for a healthy lifestyle. Our mission is to bring
            high-quality, natural, and carefully prepared organic products
            directly to your home while promoting healthy living through
            traditional herbal goodness.
          </p>

          <p
            className="text-gray-500 max-w-4xl mx-auto mt-6 leading-8"
            style={{
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            We specialize in producing and supplying a wide range of natural
            and herbal food products made using carefully selected ingredients
            and modern dehydration technology to preserve freshness,
            nutrition, and authentic flavor.
          </p>

        </div>

        {/* MISSION & VISION */}

        <div
          className="values-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 450px))",
            justifyContent: "center",
          }}
        >

          {values.map((v, i) => (

            <div
              className="value-card"
              key={i}
              style={{
                position: "relative",
                borderRadius: "24px",
                background: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid #e8f5ea",
              }}
            >

              <div className="value-icon">
                <Icon name={v.icon} size={22} />
              </div>

              <div className="value-name">
                {v.name}
              </div>

              <div className="value-desc">
                {v.desc}
              </div>

            </div>

          ))}

        </div>

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

      <WhyChooseUsSection />

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
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">

  <span className="section-label">
    OUR PRODUCT CATEGORIES
  </span>

  <h2 className="values-title">
    Our Product <em>Categories</em>
  </h2>

  <p className="values-subtitle">
    Explore our range of carefully prepared organic and herbal products,
    crafted to bring natural nutrition, convenience, and wellness to your daily life.
  </p>

</div>
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
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const reasons = [
    "100% Natural & Organic Products",
    "Hygienically Processed",
    "Rich in Nutritional Value",
    "No Harmful Chemicals",
    "Islandwide Delivery",
  ];

  return (
    <section className="py-16 px-6 bg-[#f8fcf8]">

      <div className="max-w-6xl mx-auto text-center">

        <span className="section-label">
          WHY CHOOSE US
        </span>

        <h2 className="values-title">
          Why Choose <em>Organic Garden</em>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">

          {reasons.map((item) => (

            <div
              key={item}
              className="bg-white p-5 rounded-2xl border border-green-100
              hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            >

              <div className="text-3xl mb-3">
                🌿
              </div>

              <p className="text-sm font-medium text-gray-700">
                {item}
              </p>

            </div>

          ))}

        </div>

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

          <p className="mt-6 text-gray-300 text-base sm:text-lg leading-8">
            Nature's Goodness for Healthy Living. We bring carefully prepared
            herbal teas, natural spices, dehydrated fruits, vegetables, and
            healthy soup mixes directly to your home while promoting a healthier
            lifestyle through natural and sustainable food products.
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