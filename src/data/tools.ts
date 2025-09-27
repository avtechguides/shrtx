// src/data/tools.ts

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  authorSlug?: string;
  createdAt?: string;
  updatedAt?: string;
  isPremium?: boolean;
  features?: string[];
}

export const tools: Tool[] = [
  {
    slug: "url-shortener",
    title: "URL Shortener",
    description: "Create short, branded links with analytics and API access.",
    category: "url-tools",
    icon: "link",
    authorSlug: "vishu",
    createdAt: "2024-01-01",
    isPremium: true,
    features: [
      "Custom branded URLs",
      "Click analytics",
      "API access",
      "Bulk link shortening"
    ]
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Generate QR codes with custom colors and logos.",
    category: "marketing-tools",
    icon: "qrcode",
    isPremium: true,
    features: [
      "Static and dynamic QR codes",
      "Custom colors and logos",
      "High-resolution export"
    ]
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    description: "Format, validate, and beautify JSON data instantly.",
    category: "developer-tools",
    icon: "code-json",
    isPremium: false,
    features: [
      "JSON validation",
      "Pretty print",
      "Dark mode support"
    ]
  }
  // Add more tools here without trailing comma on last item
];
