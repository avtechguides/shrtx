import type { Tool } from "../tools";

export const securityTools: Tool[] = [
  {
    slug: "password-generator",
    title: "Password Generator & Strength Checker",
    description: "Generate strong, random passwords and check their strength.",
    category: "Privacy & Security Tools",
    categorySlug: "security-tools",
    icon: "🔒",
    popularity: 93,
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA1, and SHA256 hashes.",
    category: "Privacy & Security Tools",
    categorySlug: "security-tools",
    icon: "🔐",
    popularity: 84,
  },
  {
    slug: "base64-encode",
    title: "Base64 Encode / Decode",
    description: "Encode and decode text or files in Base64.",
    category: "Privacy & Security Tools",
    categorySlug: "security-tools",
    icon: "🧩",
    popularity: 82,
  },
  {
    slug: "ip-lookup",
    title: "IP Lookup / Geolocation",
    description: "Find IP address details including location and ISP.",
    category: "Privacy & Security Tools",
    categorySlug: "security-tools",
    icon: "🌍",
    popularity: 81,
  },
  {
    slug: "ssl-checker",
    title: "SSL Certificate Checker",
    description: "Check the validity and details of SSL certificates.",
    category: "Privacy & Security Tools",
    categorySlug: "security-tools",
    icon: "✅",
    popularity: 80,
  },
];
