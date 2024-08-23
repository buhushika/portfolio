import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

function R(max) {
  return Math.random() * max;
}

function Firefly(props) {
  const { total = 100, color = 'yellow' } = props;
  const ref = useRef();

  useLayoutEffect(() => {
    const container = ref.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dots = [];

    function addAnimation(elm) {
      return gsap.to(elm, {
        duration: R(100) + 50, // Further increase duration range to slow down movement
        motionPath: {
          path: [
            { x: R(w), y: R(h) },
            { x: R(w), y: R(h) }
          ],
          curviness: 1,
        },
        x: `+=${R(100) - 50}`, // Reduce random movement range
        y: `+=${R(100) - 50}`, // Reduce random movement range
        opacity: R(1),
        scale: R(1) + 0.5,
        delay: R(5), // Increase delay to slow down start of animations
        onComplete: () => addAnimation(elm),
      });
    }

    for (let i = 0; i < total; i++) {
      const div = document.createElement('div');
      div.className = 'dot';
      div.style.position = 'absolute';
      div.style.background = color;
      div.style.borderRadius = '50%';
      div.style.width = '4px';
      div.style.height = '4px';
      div.style.boxShadow = `0 0 5px ${color}`;

      gsap.set(div, {
        x: R(w),
        y: R(h),
        opacity: 0,
      });
      container.appendChild(div);
      const dot = addAnimation(div);
      dots.push(dot);
    }

    return () => {
      dots.forEach(dot => dot.kill());
      container.innerHTML = '';
    };
  }, [total, color]);

  return <div className="fireflies" ref={ref} />;
}

export default Firefly;
