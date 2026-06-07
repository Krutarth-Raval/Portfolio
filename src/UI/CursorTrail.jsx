import React, { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only render on desktop to avoid weird touch behavior
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2 };
    const maxTrail = 40;
    const points = Array.from({ length: maxTrail }, () => ({ x: mouse.x, y: mouse.y }));

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spring physics interpolation
      let px = mouse.x;
      let py = mouse.y;

      points.forEach((pt, index) => {
        // Elastic drag effect: head follows mouse closely, tail drags behind
        const speed = 0.45 - (index * 0.01);
        pt.x += (px - pt.x) * speed;
        pt.y += (py - pt.y) * speed;
        px = pt.x;
        py = pt.y;
      });

      // Draw the fluid trail
      // With mixBlendMode: 'difference' on the canvas, drawing WHITE always inverts the background beneath it, regardless of whether the theme is light or dark.
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw connected tapering lines
      for (let i = 0; i < points.length - 1; i++) {
        const pt = points[i];
        const nextPt = points[i + 1];
        // Calculate dynamic width based on index. Lowered multiplier to make the head thinner.
        const lineWidth = Math.max((maxTrail - i) * 0.5, 0);

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(nextPt.x, nextPt.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      style={{ mixBlendMode: "difference" }}
    />
  );
};

export default CursorTrail;
