export type Enquiry = {
  name: string;
  email: string;
  website: string;
  message: string;
};

export function validateEnquiry(input: unknown): Enquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const fields = input as Record<string, unknown>;
  if (
    ["name", "email", "message"].some((key) => typeof fields[key] !== "string")
  )
    return null;
  if (fields.website !== undefined && typeof fields.website !== "string")
    return null;
  const name = (fields.name as string).trim();
  const email = (fields.email as string).trim();
  const message = (fields.message as string).trim();
  const website = (fields.website as string | undefined)?.trim() ?? "";
  if (
    !name ||
    name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    message.length < 10 ||
    message.length > 5000 ||
    website.length > 500
  )
    return null;
  if (website) {
    try {
      if (!["http:", "https:"].includes(new URL(website).protocol)) return null;
    } catch {
      return null;
    }
  }
  return { name, email, website, message };
}

export function configuredEndpoint(): string | null {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return null;
  try {
    return new URL(endpoint).protocol === "https:" ? endpoint : null;
  } catch {
    return null;
  }
}
