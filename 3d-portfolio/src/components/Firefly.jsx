import React from 'react';
import { TweenLite } from 'gsap';

const {
  useRef,
  useLayoutEffect,
} = React;

function R(max) {
  return Math.random() * max;
}

function Firefly(props) {
  const {
    total = 100,
    color = 'yellow',
  } = props;

  const ref = useRef();

  useLayoutEffect(() => {
    const container = ref.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dots = [];

    function addAnimation(elm) {
      return TweenLite.to(elm, R(20) + 10, {
        motionPath: {
          path: [{
            x: R(w),
            y: R(h)
          }, {
            x: R(w),
            y: R(h)
          }],
          curviness: 1
        },
        x: `+=${R(200) - 100}`, // Random movement within a range
        y: `+=${R(200) - 100}`, // Random movement within a range
        opacity: R(1),
        scale: R(1) + 0.5,
        delay: R(2),
        onComplete: addAnimation,
        onCompleteParams: [elm]
      });
    }

    for (let i = 0; i < total; i++) {
      const div = document.createElement('div');
      div.className = 'dot'; 
      div.style.position = 'absolute'; 
      div.style.background = color;
      div.style.borderRadius = '50%'; // Make it circular
      div.style.width = '4px'; 
      div.style.height = '4px'; 
      div.style.boxShadow = `0 0 5px ${color}`; // Add glowing effect

      TweenLite.set(div, {
        x: R(w),
        y: R(h),
        opacity: 0,
      });
      container.appendChild(div);
      const dot = addAnimation(div);
      dot.play();
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
