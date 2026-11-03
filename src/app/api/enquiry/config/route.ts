import { configuredEndpoint } from "@/lib/enquiry";

// Read server configuration on every request, including in a prebuilt image.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { enabled: Boolean(configuredEndpoint()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
