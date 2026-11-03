import { permanentRedirect } from "next/navigation";

// Keep the previous Vite portfolio address useful without duplicating the homepage.
export default function Projects() {
  permanentRedirect("/#work");
}
