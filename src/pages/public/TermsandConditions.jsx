import { ShieldCheck, Package, Truck, RotateCcw, User, Lock, Copyright, HeartPulse, Phone } from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    title: "1. General",
    content: [
      "Organic Garden is committed to providing high-quality natural and organic products, including herbal teas, natural spices, dehydrated fruits, dehydrated vegetables, and ready-to-cook soups.",
      "We reserve the right to update, modify, or replace any part of these Terms & Conditions at any time without prior notice."
    ]
  },
  {
    icon: Package,
    title: "2. Product Information",
    content: [
      "All products are prepared using carefully selected natural ingredients.",
      "Product images displayed on the website are for illustrative purposes only and may slightly differ from the actual product.",
      "Herbal and natural products may affect individuals differently.",
      "Customers are advised to consult a healthcare professional before using herbal products when necessary."
    ]
  },
  {
    icon: ShieldCheck,
    title: "3. Orders & Payments",
    content: [
      "Orders are confirmed only after customer verification.",
      "We reserve the right to cancel suspicious or incomplete orders.",
      "Cash on Delivery (COD) is available for eligible locations within Sri Lanka.",
      "Prices are subject to change without prior notice."
    ]
  },
  {
    icon: Truck,
    title: "4. Delivery",
    content: [
      "Islandwide delivery services are available.",
      "Delivery times may vary depending on location and courier services.",
      "Organic Garden is not responsible for delays caused by courier companies or unforeseen circumstances."
    ]
  },
  {
    icon: RotateCcw,
    title: "5. Returns & Refunds",
    content: [
      "Opened food and herbal products cannot be returned.",
      "Refunds or replacements are only provided for damaged or incorrect items reported within 24 hours of delivery.",
      "Customers must provide clear photos when requesting replacements."
    ]
  },
  {
    icon: User,
    title: "6. Customer Responsibilities",
    content: [
      "Customers must provide accurate contact, delivery, and payment information when placing orders."
    ]
  },
  {
    icon: Lock,
    title: "7. Privacy",
    content: [
      "Customer information is kept confidential and used only for order processing, delivery, and communication purposes.",
      "We do not sell or share customer data with unauthorized third parties."
    ]
  },
  {
    icon: Copyright,
    title: "8. Intellectual Property",
    content: [
      "All website content including logos, product descriptions, images, and branding belongs to Organic Garden.",
      "Content may not be copied, reproduced, or used without written permission."
    ]
  },
  {
    icon: HeartPulse,
    title: "9. Health Disclaimer",
    content: [
      "Our products are natural wellness products and are not intended to diagnose, treat, cure, or prevent any disease.",
      "Results may vary from person to person."
    ]
  },
  {
    icon: Phone,
    title: "10. Contact Information",
    content: [
      "For questions regarding these Terms & Conditions, please contact Organic Garden through our Contact Us page."
    ]
  }
];

export default function TermsConditions() {
  return (
    <div className="bg-[#fafcf9] min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-950 via-green-900 to-green-800 text-white">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-300 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-green-400 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">

          <span className="uppercase tracking-[0.3em] text-green-300 text-sm">
            Organic Garden
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-6">
            Terms & Conditions
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-green-100 leading-8">
            Please read these Terms & Conditions carefully before using
            our website or purchasing products from Organic Garden.
          </p>

        </div>

      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">

        <h2 className="text-3xl font-bold text-green-900 mb-6">
          Welcome to Organic Garden
        </h2>

        <p className="text-gray-600 leading-8">
          These Terms & Conditions govern your use of the Organic Garden
          Online Store website and services. By using our website or
          purchasing products from us, you agree to comply with the
          following terms and conditions.
        </p>

      </section>

      {/* TERMS SECTIONS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid gap-6">

          {sections.map((section, index) => {

            const Icon = section.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-green-100 p-8
                shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex items-center gap-4 mb-6">

                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                    <Icon className="text-green-700" size={24} />

                  </div>

                  <h3 className="text-2xl font-bold text-green-900">
                    {section.title}
                  </h3>

                </div>

                <ul className="space-y-3">

                  {section.content.map((item, i) => (

                    <li
                      key={i}
                      className="flex gap-3 text-gray-600 leading-7"
                    >

                      <span className="text-green-700 font-bold">
                        •
                      </span>

                      <span>{item}</span>

                    </li>

                  ))}

                </ul>

              </div>
            );
          })}

        </div>

      </section>

      {/* FOOTER NOTE */}
      <section className="bg-green-50 border-t border-green-100">

        <div className="max-w-6xl mx-auto px-6 py-10 text-center">

          <p className="text-gray-600">
            By continuing to use Organic Garden, you acknowledge that
            you have read, understood, and agreed to these Terms &
            Conditions.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Last Updated: June 2026
          </p>

        </div>

      </section>

    </div>
  );
}