import { getCollection } from "astro:content";

export async function GET() {
  // Collect all content from blog + tools
  const blogPosts = await getCollection("blog");
  const tools = await getCollection("tools");

  // Normalize data for search
  const data = [...blogPosts, ...tools].map((entry) => ({
    title: entry.data.title,
    slug: entry.slug,
    collection: entry.collection,
    description: entry.data.description || "",
  }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
