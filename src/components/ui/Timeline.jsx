import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <>
      <style>{`
        .animated-timeline-container {
          width: 100%;
          font-family: inherit;
          padding: 0 20px;
        }
        @media (min-width: 768px) {
          .animated-timeline-container { padding: 0 40px; }
        }
        .animated-timeline-wrapper {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 80px;
        }
        .animated-timeline-item {
          display: flex;
          justify-content: flex-start;
          padding-top: 40px;
        }
        @media (min-width: 768px) {
          .animated-timeline-item {
            padding-top: 80px;
            gap: 40px;
          }
        }
        .animated-timeline-left {
          position: sticky;
          display: flex;
          flex-direction: column;
          z-index: 40;
          align-items: center;
          top: 160px;
          align-self: flex-start;
          max-width: 300px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .animated-timeline-left {
            flex-direction: row;
          }
        }
        .animated-timeline-dot-wrapper {
          height: 40px;
          width: 40px;
          position: absolute;
          left: 12px;
          border-radius: 50%;
          background-color: #050816;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .animated-timeline-dot {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background-color: #151030;
          border: 1px solid #915EFF;
        }
        .animated-timeline-title {
          display: none;
          font-size: 1.25rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.5);
        }
        @media (min-width: 768px) {
          .animated-timeline-title {
            display: block;
            font-size: 1.5rem;
            padding-left: 80px;
          }
        }
        .animated-timeline-title-mobile {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 16px;
          text-align: left;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.5);
        }
        @media (min-width: 768px) {
          .animated-timeline-title-mobile { display: none; }
        }
        .animated-timeline-content {
          position: relative;
          padding-left: 80px;
          padding-right: 16px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .animated-timeline-content { padding-left: 16px; }
        }
        .animated-timeline-line-bg {
          position: absolute;
          left: 32px;
          top: 0;
          overflow: hidden;
          width: 2px;
          background: linear-gradient(to bottom, transparent 0%, #151030 10%, #151030 90%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .animated-timeline-line-glow {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          width: 2px;
          background: linear-gradient(to top, transparent 0%, #00d4ff 10%, #915EFF 100%);
          border-radius: 9999px;
        }
      `}</style>
      <div className="animated-timeline-container" ref={containerRef}>
        <div ref={ref} className="animated-timeline-wrapper">
          {data.map((item, index) => (
            <div key={index} className="animated-timeline-item">
              <div className="animated-timeline-left">
                <div className="animated-timeline-dot-wrapper">
                  <div className="animated-timeline-dot" />
                </div>
                <h3 className="animated-timeline-title">
                  {item.title}
                </h3>
              </div>

              <div className="animated-timeline-content">
                <h3 className="animated-timeline-title-mobile">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          ))}
          <div
            style={{ height: height + "px" }}
            className="animated-timeline-line-bg"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="animated-timeline-line-glow"
            />
          </div>
        </div>
      </div>
    </>
  );
};
