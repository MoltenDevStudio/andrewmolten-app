import Link from "next/link";
import { Arrow } from "@/components/arrow";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="eyebrow">404 · Page not found</p>
      <h1>
        A little
        <br />
        <em>off the map.</em>
      </h1>
      <p>This page isn’t available. Let’s get you back to familiar ground.</p>
      <Link className="button" href="/">
        Back to Andrew’s website <Arrow />
      </Link>
    </main>
  );
}
