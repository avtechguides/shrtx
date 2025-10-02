import type { Tool } from "../tools";

export const conversionTools: Tool[] = [
  {
    slug: "unit-converter",
    title: "Unit Converter",
    description: "Convert between length, weight, temperature, and more units.",
    category: "Conversion Tools",
    categorySlug: "conversion-tools",
    icon: "📏",
    popularity: 90,
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    description: "Convert between world currencies in real-time.",
    category: "Conversion Tools",
    categorySlug: "conversion-tools",
    icon: "💱",
    popularity: 88,
  },
  {
    slug: "timezone-converter",
    title: "Time Zone Converter",
    description: "Convert time between different time zones worldwide.",
    category: "Conversion Tools",
    categorySlug: "conversion-tools",
    icon: "⏰",
    popularity: 85,
  },
  {
    slug: "number-to-words",
    title: "Number to Words Converter",
    description: "Convert numbers into words for readability.",
    category: "Conversion Tools",
    categorySlug: "conversion-tools",
    icon: "🔢",
    popularity: 82,
  },
  {
    slug: "decimal-binary",
    title: "Decimal ↔ Binary / Hex / Octal Converter",
    description: "Convert numbers between decimal, binary, hexadecimal, and octal systems.",
    category: "Conversion Tools",
    categorySlug: "conversion-tools",
    icon: "⚙️",
    popularity: 80,
  },
];
