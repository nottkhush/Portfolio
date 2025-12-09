// wrappers/SmoothScroller.tsx
"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ScrollSmoothProvider({ children }: Props) {
  // no custom scroll logic anymore – pure native scroll
  return <>{children}</>;
}
