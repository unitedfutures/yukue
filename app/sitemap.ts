import type { MetadataRoute } from "next";
import { getAllItemIds } from "@/data/itemIndex";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yukue.net";
  const itemPages: MetadataRoute.Sitemap = getAllItemIds().map((id) => ({
    url: `${base}/items/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/simulator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...itemPages,
  ];
}
