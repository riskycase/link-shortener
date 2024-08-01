import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://short.riskycase.in",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://short.riskycase.in/notFound",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.8,
    },
  ];
}
