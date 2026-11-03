import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Allow crawlers to read preview pages so they can see their noindex directives.
  // robots.txt Disallow is deliberately not used for previews.
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
