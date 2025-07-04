"use client";
import {
  HydrationBoundary,
  HydrationBoundaryProps,
} from "@tanstack/react-query";
const HydrationProvider = (props: HydrationBoundaryProps) => {
  return <HydrationBoundary {...props} />;
};
export default HydrationProvider;