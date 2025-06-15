import React, { useEffect, useRef } from 'react';

const SplitText = ({
  text,
  className,
  delay = 50,
  animationFrom,
  animationTo,
  easing = 'ease',
  threshold = 0.1,
  rootMargin = '0px',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('.letter');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            letters.forEach((letter, index) => {
              setTimeout(() => {
                Object.assign(letter.style, {
                  ...animationTo,
                  transition: `all 0.5s ${easing}`,
                });

                if (index === letters.length - 1 && onLetterAnimationComplete) {
                  onLetterAnimationComplete();
                }
              }, delay * index);
            });
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animationTo, delay, easing, onLetterAnimationComplete, rootMargin, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="d-inline-block me-1" style={{ whiteSpace: 'nowrap' }}>
          {word.split('').map((letter, index) => (
            <span
              key={index}
              className="letter d-inline-block"
              style={{ ...animationFrom, display: 'inline-block', transition: 'none' }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default SplitText;