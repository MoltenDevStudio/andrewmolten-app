import { configuredEndpoint, validateEnquiry } from "@/lib/enquiry";

export async function POST(request: Request) {
  // Require the browser's same-origin request before forwarding personal data.
  // Next may use its bind address in request.url; Host is the browser-facing host.
  const expectedOrigin = `${new URL(request.url).protocol}//${request.headers.get("host")}`;
  if (request.headers.get("origin") !== expectedOrigin) {
    return Response.json({ error: "Request not allowed." }, { status: 403 });
  }
  const endpoint = configuredEndpoint();
  if (!endpoint)
    return Response.json(
      {
        error:
          "The enquiry form is not connected. Please email Andrew directly.",
      },
      { status: 503 },
    );
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Expected JSON." }, { status: 415 });
  }
  // Bound streamed input as well as declared Content-Length.
  const reader = request.body?.getReader();
  if (!reader)
    return Response.json({ error: "Missing enquiry." }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 32768) {
        await reader.cancel();
        return Response.json({ error: "Enquiry too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (body?.company)
      return Response.json(
        { error: "Unable to accept this enquiry." },
        { status: 400 },
      );
    const enquiry = validateEnquiry(body);
    if (!enquiry)
      return Response.json(
        { error: "Please check your enquiry details." },
        { status: 400 },
      );
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_FORM_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_FORM_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok)
      return Response.json(
        { error: "Delivery failed. Please email Andrew directly." },
        { status: 502 },
      );
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof SyntaxError
            ? "Invalid JSON."
            : "Delivery failed. Please email Andrew directly.",
      },
      { status: error instanceof SyntaxError ? 400 : 502 },
    );
  }
}
