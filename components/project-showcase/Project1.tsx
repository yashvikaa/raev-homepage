"use client";

import Image from "next/image";

export default function Project1() {
  return (
    <section id="project1" className="relative w-full h-screen min-h-screen overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/projects/project-1-bg.jpg"
          alt="Project 1 Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>
      {/* Content overlay can be placed here in future */}
    </section>
  );
}
