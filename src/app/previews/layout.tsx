import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website concept",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

// Isolated from the personal homepage: each client can have its own visual system.
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
