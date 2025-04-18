"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

export function LinkButton({
  href,
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps & { className?: string }>) {
  const pathname = usePathname();

  return (
    <Link href={href} {...props}>
      <Button
        variant="link"
        className={cn(
          "p-0",
          {
            underline: pathname === href,
          },
          className
        )}
      >
        {children}
      </Button>
    </Link>
  );
}
