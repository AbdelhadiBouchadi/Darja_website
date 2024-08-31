'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Arrow rotation
      gsap.to(arrowRef.current, {
        rotate: 180,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text sliding and fading in
      gsap.to([text1Ref.current, text2Ref.current], {
        y: 50,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Background image zoom effect
      gsap.to(imageContainerRef.current, {
        scale: 1.1, // Slight zoom in
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section about-image once-in"
      data-scroll-section=""
    >
      <div className="bottom-lightgray"></div>
      <div className="container">
        <div className="row">
          <div className="flex-col">
            <div ref={arrowRef} className="arrow">
              <svg
                width="14px"
                height="14px"
                viewBox="0 0 14 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <title>arrow-up-right</title>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Artboard"
                    transform="translate(-1019.000000, -279.000000)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  >
                    <g
                      id="arrow-up-right"
                      transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"
                    >
                      <polyline
                        id="Path"
                        points="2.76923077 0 12 0 12 9.23076923"
                      ></polyline>
                      <line x1="12" y1="0" x2="0" y2="12" id="Path"></line>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <motion.p
              ref={text1Ref}
              data-scroll=""
              data-scroll-speed="-1"
              data-scroll-position="top"
              data-scroll-offset="0%, -50%"
              className="is-inview"
            >
              I help companies from all over the world with tailor-made
              solutions. With each project, I push my work to new horizons,
              always putting quality first.
            </motion.p>
            <motion.p
              ref={text2Ref}
              data-scroll=""
              data-scroll-speed="-1"
              data-scroll-position="top"
              data-scroll-offset="0%, -50%"
              className="is-inview"
            >
              <span
                style={{ opacity: 0.5, display: 'block', paddingTop: '.5em' }}
              >
                Always exploring<span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
              </span>
            </motion.p>
          </div>
          <div className="flex-col">
            <div className="single-about-image">
              <div
                className="image-overlay overlay-image is-inview"
                data-scroll
                data-scroll-speed="-2"
                data-scroll-position="top"
                ref={imageContainerRef}
              ></div>
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
