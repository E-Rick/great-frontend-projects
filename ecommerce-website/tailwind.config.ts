import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.neutral[900],
        'primary-hover': colors.neutral[950],
        'primary-invert': colors.white,
        secondary: colors.neutral[600],
        tertiary: colors.neutral[500],
        brand: colors.indigo[700],
        disabled: colors.neutral[400],
        error: colors.red[600],
        'error-emphasize': colors.red[800],
        success: colors.green[700],
        warning: colors.amber[700],
        'primary-bg': colors.white,
        'primary-inverted-bg': colors.neutral[950],
        'primary-hover-bg': colors.neutral[50],
        'secondary-bg': colors.gray[200],
        'secondary-hover-bg': colors.gray[300],
        'tertiary-bg': colors.neutral[50],
        'disabled-bg': colors.neutral[100],
        'disabled-emphasize': colors.gray[100],
        'line-primary': colors.neutral[200],
        'line-secondary': colors.gray[400],
        'line-success': colors.green[200],
        'brand-solid': colors.indigo[600],
        'brand-subtle': colors.indigo[200],
        'error-subtle': colors.red[200],
        'warning-subtle': colors.amber[200]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
