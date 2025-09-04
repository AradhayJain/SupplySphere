/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Outfit"', "ui-sans-serif", "system-ui"],
        body: ['Inter', "ui-sans-serif", "system-ui"],
      },
      colors: {
        // Brand = the teal you liked on the landing page
        primary: {
          DEFAULT: "#10B981",   // emerald-500
          light: "#34D399",     // emerald-400
          dark:  "#059669",     // emerald-600
        },
        accent: {
          DEFAULT: "#06B6D4",   // cyan-500
          light: "#22D3EE",     // cyan-400
          dark:  "#0891B2",     // cyan-600
        },
        dark: {
          100: "#0B1015",
          200: "#111827",
          300: "#1F2937",
          400: "#374151",
          500: "#4B5563",
        },
        light: {
          100: "#F9FAFB",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
        },
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        "brand-radial":
          "radial-gradient(1200px 600px at -10% -10%, rgba(34,211,238,0.15), transparent 60%), radial-gradient(900px 500px at 120% 120%, rgba(16,185,129,0.15), transparent 60%)",
        "brand-linear":
          "linear-gradient(90deg, #10B981 0%, #06B6D4 100%)",
      },
    },
  },
  plugins: [],
};
