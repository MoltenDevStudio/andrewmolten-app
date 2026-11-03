import Image from "next/image";
import { projects } from "@/lib/site";

export function ProjectPreview({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className={`project-preview ${project.id}`}>
      <div className="preview-orbit" aria-hidden="true" />
      <div className="desktop-frame">
        <div className="browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className="desktop-screen">
          {project.desktopImage ? (
            <Image
              src={project.desktopImage}
              alt={`${project.name} desktop website preview`}
              fill
              sizes="(max-width: 700px) 80vw, 40vw"
            />
          ) : (
            <div className="screen-placeholder">
              <span className="placeholder-mark" aria-hidden="true">
                {project.id === "massage" ? "ab" : "J."}
              </span>
              <span>
                Desktop screenshot
                <br />
                to be added
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mobile-frame">
        <div className="phone-camera" aria-hidden="true" />
        {project.mobileImage ? (
          <Image
            src={project.mobileImage}
            alt={`${project.name} mobile website preview`}
            fill
            sizes="140px"
          />
        ) : (
          <div className="screen-placeholder">
            <span className="placeholder-mark" aria-hidden="true">
              {project.id === "massage" ? "ab" : "J."}
            </span>
            <span>
              Mobile
              <br />
              screenshot
              <br />
              to be added
            </span>
          </div>
        )}
      </div>
      {!project.desktopImage && (
        <span className="preview-caption">
          Preview placeholders · actual screenshots coming soon
        </span>
      )}
    </div>
  );
}
