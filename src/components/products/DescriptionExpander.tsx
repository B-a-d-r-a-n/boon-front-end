"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
interface DescriptionExpanderProps {
  text: string;
  truncateAt?: number; 
}
export function DescriptionExpander({
  text,
  truncateAt = 200,
}: DescriptionExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    if (text.length > truncateAt) {
      setIsTruncated(true);
    }
  }, [text, truncateAt]);
  if (!isTruncated) {
    return <p className="text-foreground/80 leading-relaxed">{text}</p>;
  }
  return (
    <div>
      <p className="text-foreground/80 leading-relaxed">
        {isExpanded ? text : `${text.substring(0, truncateAt)}...`}
      </p>
      <Button
        variant="link"
        className="p-0 h-auto mt-1 text-primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "See Less" : "See More"}
      </Button>
    </div>
  );
}