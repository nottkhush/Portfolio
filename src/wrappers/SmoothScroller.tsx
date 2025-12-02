"use client";

import { ReactNode, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import _ScrollSmoother, { ScrollSmoother } from "gsap/ScrollSmoother";

export const ScrollSmoothProvider = ({ children }: { children: ReactNode }) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, _ScrollSmoother);

    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.4, // much shorter smoothing time on touch devices (default is 0.1)
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};
