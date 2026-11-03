import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Explicit allowlist: prospect previews must never be included.
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
