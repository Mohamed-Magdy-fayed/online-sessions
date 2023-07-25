import { cn } from "@/lib/utils.ts";
import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

interface TypographyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Typography = ({ children, className }: TypographyProps) => {
  return <p className={cn("", className)}>{children}</p>;
};

export default Typography;
