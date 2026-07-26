import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import skillData from "../Data/TechSkill.json";

const MarqueeRow = ({ skills, direction = 1 }) => {
  const paddedSkillData = skills.length % 2 !== 0 ? [...skills, skills[0]] : skills;
  const totalSkills = paddedSkillData.length;
  const loopSkills = [...paddedSkillData, ...paddedSkillData, ...paddedSkillData, ...paddedSkillData];

  const containerRef = useRef(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setInitialScroll = () => {
      const originalWidth = container.scrollWidth / 4;
      container.scrollLeft = direction === 1 ? originalWidth : originalWidth * 2;
    };

    const timer = setTimeout(setInitialScroll, 100);

    let frameId;
    const scrollSpeed = 2.5 * direction;

    const animate = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        container.scrollLeft += scrollSpeed;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [direction]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const originalWidth = container.scrollWidth / 4;

    if (container.scrollLeft >= originalWidth * 2 && direction === 1) {
      container.scrollLeft -= originalWidth;
    } else if (container.scrollLeft <= originalWidth && direction === -1) {
      container.scrollLeft += originalWidth;
    } else if (container.scrollLeft <= originalWidth && direction === 1) {
      container.scrollLeft += originalWidth;
    } else if (container.scrollLeft >= originalWidth * 2 && direction === -1) {
      container.scrollLeft -= originalWidth;
    }
  };

  const handleMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!isDraggingRef.current || !container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  return (
    <div className="marquee-fade w-full relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        className="overflow-x-auto no-scrollbar flex gap-8 md:gap-12 py-10 cursor-grab active:cursor-grabbing select-none w-full scroll-smooth"
        style={{ scrollBehavior: "auto" }}
      >
        {loopSkills.map((skill, index) => {
          const waveFactor = (index % totalSkills) / totalSkills;
          const baseOffset = Math.sin(waveFactor * Math.PI * 2) * 20;

          const startY = `${baseOffset - 12}px`;
          const endY = `${baseOffset + 12}px`;
          const delay = `${(index % totalSkills) * -0.3}s`;

          return (
            <a
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              key={`${skill.name}-${index}`}
              className="wavy-item group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full bg-[var(--theme-bg)]/60 backdrop-blur-xl border border-[var(--theme-btn-border)] shadow-xl hover:border-accent hover:shadow-2xl transition-all duration-300 cursor-pointer shrink-0"
              style={{
                "--wave-y-start": startY,
                "--wave-y-end": endY,
                animationDelay: delay,
              }}
            >
              <div className="absolute inset-0 bg-[var(--theme-accent)]/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />

              <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 pointer-events-none">
                {skill.image.startsWith("http") ? (
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <i className={`${skill.image} text-xl sm:text-3xl lg:text-5xl text-theme-secondary group-hover:text-theme transition-colors duration-300`}></i>
                )}
              </div>

              <span className="absolute bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] px-2 py-1 rounded-md top-[-2.5rem] left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out metadata-font-size pointer-events-none z-50">
                {skill.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

const TechSkills = () => {
  const half = Math.ceil(skillData.length / 2);
  const row1Skills = skillData.slice(0, half);
  const row2Skills = skillData.slice(half);

  return (
    <div className="lg:min-h-screen flex flex-col justify-center py-24 lg:py-16 w-full select-none overflow-hidden">
      <div className="flex flex-col items-center w-full">
        {/* Centered Title Section */}
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full mb-12 md:mb-20 z-40 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-theme leading-none tracking-tight">
            Tech Stacks
          </h2>
        </motion.div>

        {/* Marquees */}
        <div className="w-full flex flex-col justify-center gap-4 md:gap-8 relative mt-4">
          <MarqueeRow skills={row1Skills} direction={1} />
          <MarqueeRow skills={row2Skills} direction={-1} />
        </div>
      </div>
    </div>
  );
};

export default TechSkills;
