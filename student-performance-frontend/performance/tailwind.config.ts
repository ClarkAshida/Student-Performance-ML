import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Cores do Sistema Shadcn/UI
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Cores Principais do Projeto - Verde Jade
        jade: {
          DEFAULT: "#00BB77",
          50: "#F0FDF9",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#00E893", // Tom mais claro
          500: "#00BB77", // Cor principal
          600: "#00A366",
          700: "#008B55",
          800: "#006B44",
          900: "#00452C", // Tom mais escuro
          950: "#002E1D",
        },

        // Cores de Fundo
        surface: {
          primary: "#F4F6F8", // Fundo principal
          card: "#FFFFFF", // Fundo de cards/componentes
        },

        // Cores de Status e Predição
        success: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#2E7D32",
        },
        danger: {
          DEFAULT: "#D32F2F", // Vermelho para falha confirmada
          light: "#EF5350",
          dark: "#C62828",
        },
        warning: {
          DEFAULT: "#FFA000", // Laranja para predições de risco
          light: "#FFB74D",
          dark: "#F57C00",
        },

        // Cores de Texto
        text: {
          primary: "#1A237E", // Títulos (mesma cor primária)
          body: "#333333", // Corpo de texto
          secondary: "#757575", // Texto secundário (placeholders, anotações)
          muted: "#9E9E9E", // Texto ainda mais suave
        },

        // Cores Antigas (mantidas para compatibilidade)
        "brand-primary": "#1A237E",
        "brand-secondary": "#3F51B5",
        "brand-jade": "#00BB77",
        "brand-jade-light": "#00E893",
        "brand-jade-dark": "#00452C",
        error: {
          DEFAULT: "#D32F2F",
          light: "#E57373",
          dark: "#C62828",
        },
      },
      fontFamily: {
        // Tipografia Principal
        heading: ["Poppins", "sans-serif"], // Para títulos e cabeçalhos
        body: ["Inter", "sans-serif"], // Para corpo de texto e parágrafos
        roboto: ["Roboto", "sans-serif"], // Alternativa para corpo de texto
        sans: ["Inter", "sans-serif"], // Padrão do Tailwind
      },
      fontSize: {
        // Tamanhos customizados para headings
        display: ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
        medium: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
        strong: "0 8px 24px 0 rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
