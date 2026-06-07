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
    const scrollSpeed = 0.8 * direction;

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
        className="overflow-x-auto no-scrollbar flex gap-6 py-6 px-4 cursor-grab active:cursor-grabbing select-none w-full scroll-smooth"
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
              className="wavy-item group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-glossy border border-[var(--theme-btn-border)] hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0"
              style={{
                "--wave-y-start": startY,
                "--wave-y-end": endY,
                animationDelay: delay,
              }}
            >
              <div className="absolute inset-0 bg-[var(--theme-accent)]/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />

              <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 pointer-events-none">
                {skill.image.startsWith("http") ? (
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <i className={`${skill.image} text-xl sm:text-3xl text-theme-secondary group-hover:text-theme transition-colors duration-300`}></i>
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
    <div className="min-h-screen flex flex-col justify-center py-16 px-6 max-w-6xl mx-auto w-full select-none overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Sticky Details */}
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-16 flex flex-col gap-4 text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">03 / Tech Stacks</span>
            <div className="h-px bg-accent/20 flex-1"></div>
          </div>
          <h2 className="title-font-size font-extrabold text-theme leading-none tracking-tight">
            Tech Stacks
          </h2>
          <p className="normal-font-size text-theme-secondary/80 font-medium leading-relaxed max-w-md mt-2">
            My core technical skills, including modern frontend frameworks, backend architectures, databases, and development tools I use daily.
          </p>
        </motion.div>

        {/* Right Column - Marquees */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full gap-4 relative mt-10 lg:mt-0">
          <MarqueeRow skills={row1Skills} direction={1} />
          <MarqueeRow skills={row2Skills} direction={-1} />
        </div>

      </div>
    </div>
  );
};

export default TechSkills;
