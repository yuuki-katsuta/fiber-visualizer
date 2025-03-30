"use client";
import { useEffect, useRef } from "react";

export const useRenderLogger = (componentName) => {
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("fiberRender", { detail: componentName }),
    );
  });
};

export const Visualizer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let p5Instance;
    const particles = [];

    const initSketch = async () => {
      const p5 = (await import("p5")).default;

      const sketch = (s) => {
        class Particle {
          constructor(x, y, name) {
            this.pos = s.createVector(x, y);
            this.name = name;
            this.alpha = 255;
          }

          show() {
            s.fill(100, 200, 255, this.alpha);
            s.noStroke();
            s.circle(this.pos.x, this.pos.y, 10);
            s.textSize(12);
            s.textAlign(s.CENTER);
            s.fill(255, this.alpha);
            s.text(this.name, this.pos.x, this.pos.y - 15);
          }

          update() {
            this.alpha -= 2;
          }

          isDead() {
            return this.alpha <= 0;
          }
        }

        s.setup = () => {
          s.createCanvas(600, 400);

          // イベント登録をここで行う
          window.addEventListener("fiberRender", (e) => {
            const x = s.random(50, s.width - 50);
            const y = s.random(50, s.height - 50);
            particles.push(new Particle(x, y, e.detail));
          });
        };

        s.draw = () => {
          s.background(30);
          particles.forEach((particle, idx) => {
            particle.show();
            particle.update();
            if (particle.isDead()) particles.splice(idx, 1);
          });
        };
      };

      p5Instance = new p5(sketch, canvasRef.current);
    };

    initSketch();

    return () => {
      p5Instance?.remove();
      window.removeEventListener("fiberRender", () => {});
    };
  }, []);

  return <div ref={canvasRef} />;
};
