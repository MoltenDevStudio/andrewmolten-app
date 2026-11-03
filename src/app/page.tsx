import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { Spark } from "@/components/spark";
import { ContactForm } from "@/components/contact-form";
import { ProjectPreview } from "@/components/project-preview";
import { projects, site } from "@/lib/site";
import { configuredEndpoint } from "@/lib/enquiry";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const services = [
  [
    "01",
    "A fresh start",
    "New websites",
    "A considered, easy-to-use website that introduces your business and helps people take the next step.",
  ],
  [
    "02",
    "A better first impression",
    "Website redesigns",
    "Turn an outdated or hard-to-navigate website into something clearer, more useful, and more you.",
  ],
  [
    "03",
    "The details that matter",
    "Improvements & mobile",
    "Thoughtful updates to your existing site, with attention to how it feels on every screen.",
  ],
  [
    "04",
    "Someone in your corner",
    "Hosting & ongoing care",
    "Help keeping your website up to date and running smoothly, with ongoing support if you need it.",
  ],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header shell">
        <a href="#" aria-label="Andrew Molten, home" className="wordmark">
          andrew molten<span>.</span>
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a className="nav-contact" href="#contact">
            Let’s talk <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="location-dot" />
              Independent web designer & developer
            </p>
            <h1 id="hero-title">
              Better websites.
              <br />
              <em>
                A personal
                <br className="desktop-break" /> approach.
              </em>
            </h1>
            <p className="hero-intro">
              I’m Andrew, a web developer and small business owner in
              Christchurch. I build thoughtful websites for businesses like
              yours.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                Let’s talk about your website <Arrow />
              </a>
              <a className="text-link" href="#work">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-location">
              <svg
                aria-hidden="true"
                width="15"
                height="17"
                viewBox="0 0 20 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M18 9c0 6-8 13-8 13S2 15 2 9a8 8 0 1 1 16 0Z" />
                <circle cx="10" cy="9" r="2.5" />
              </svg>{" "}
              Christchurch, New Zealand <span>·</span> Working locally &
              remotely
            </p>
          </div>
          <figure className="portrait-composition">
            <div className="portrait-arch">
              {site.portraitImage ? (
                <Image
                  src={site.portraitImage}
                  alt="Andrew Molten, independent web designer and developer in Christchurch"
                  fill
                  priority
                  sizes="(max-width: 600px) 88vw, 40vw"
                  className="portrait-photo"
                />
              ) : (
                <>
                  <svg
                    className="portrait-art"
                    viewBox="0 0 430 530"
                    role="img"
                    aria-labelledby="portrait-placeholder-title"
                  >
                    <title id="portrait-placeholder-title">
                      Placeholder for Andrew’s personal photograph
                    </title>
                    <path d="M-50 415C35 292 114 271 210 310S355 399 477 252" />
                    <path d="M-50 443C35 320 114 299 210 338S355 427 477 280" />
                    <path d="M-50 471C35 348 114 327 210 366S355 455 477 308" />
                    <circle cx="312" cy="148" r="58" />
                    <text x="215" y="274" textAnchor="middle">
                      am.
                    </text>
                  </svg>
                  <span className="portrait-placeholder">
                    Your portrait goes here
                  </span>
                </>
              )}
            </div>
            <div className="portrait-note">
              <Spark className="note-spark" />
              <span>
                Good websites start
                <br />
                with a real conversation.
              </span>
            </div>
            <figcaption>
              <svg
                className="handwritten-arrow"
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 26 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M3 2c0 10 5 16 19 16m-6-6 6 6-6 6" />
              </svg>{" "}
              The person behind your website.
            </figcaption>
          </figure>
        </section>
        <div className="principles shell">
          <p>Thoughtfully designed.</p>
          <Spark />
          <p>Built around your business.</p>
          <Spark />
          <p>Personal from start to finish.</p>
        </div>

        <section
          id="work"
          className="work-section section-space shell"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A little of what I do</p>
              <h2 id="work-title">
                Selected <em>work.</em>
              </h2>
            </div>
            <p>
              From my own small business
              <br className="desktop-break" /> to something a little more
              ambitious.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project" key={project.id}>
                <ProjectPreview project={project} />
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3>
                  {project.name}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name} (opens in new tab)`}
                    >
                      <Arrow diagonal />
                    </a>
                  )}
                </h3>
                <p className="project-description">{project.description}</p>
                <p className="project-focus">{project.focus}</p>
                {project.url ? (
                  <a
                    className="text-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit live website <Arrow diagonal />
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                ) : (
                  <span className="pending-link">
                    Live website link to be added <Arrow diagonal />
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="shell about-inner">
            <div className="about-heading">
              <p className="eyebrow">
                A developer. A business owner. A real person.
              </p>
              <h2 id="about-title">
                Your business
                <br />
                is personal.
                <br />
                <em>Mine is too.</em>
              </h2>
              <div className="about-signature">
                Andrew<span className="signature-dot">.</span>
              </div>
              <p className="signature-caption">Your designer & developer</p>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I know there’s a lot that goes into running a small business.
                Your website should make things a little easier.
              </p>
              <p>
                Alongside web development, I run my own massage therapy
                business. My website plays an important part in helping people
                find me, understand what I offer, and book an appointment.
              </p>
              <p>
                That experience shapes how I build websites: clear information,
                thoughtful design, and a straightforward way for customers to
                get in touch.
              </p>
              <p>
                When we work together, you’ll deal directly with me. We’ll talk
                about your business, work out what you need, and build something
                that feels right for you.
              </p>
              <a className="text-link" href="#contact">
                Let’s get to know your business <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="services-section section-space shell"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">How I can help</p>
              <h2 id="services-title">
                The right website.
                <br />
                <em>Without the fuss.</em>
              </h2>
            </div>
            <p>
              Whether you’re starting fresh or
              <br className="desktop-break" /> your current website needs some
              care.
            </p>
          </div>
          <div className="services-list">
            {services.map(([number, subtitle, title, description]) => (
              <article className="service" key={number}>
                <span className="service-number">{number}</span>
                <div className="service-title">
                  <p>{subtitle}</p>
                  <h3>{title}</h3>
                </div>
                <p className="service-description">{description}</p>
                <Arrow diagonal className="service-symbol" />
              </article>
            ))}
          </div>
          <div className="process-note">
            <Spark />
            <p>
              We’ll start with a conversation, agree on a clear scope, and take
              it from there.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="shell contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">A good place to start</p>
              <h2 id="contact-title">
                Something
                <br />
                in mind?
                <br />
                <em>Let’s talk.</em>
              </h2>
              <p>
                Tell me a little about your business and what you’d like your
                website to do. We can work out the next step together.
              </p>
              <a className="email-link" href={`mailto:${site.email}`}>
                {site.email}
                <Arrow diagonal />
              </a>
              <p className="contact-location">
                Based in Christchurch, New Zealand.
                <br />
                Happy to meet locally or chat over a call.
              </p>
            </div>
            <ContactForm enabled={Boolean(configuredEndpoint())} />
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <a href="#" className="wordmark">
          andrew molten<span>.</span>
        </a>
        <p>Thoughtful websites. Personal service.</p>
        <span>© {new Date().getFullYear()} Andrew Molten</span>
        <a className="back-top" href="#">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
