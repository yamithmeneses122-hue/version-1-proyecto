"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Equivalente a NavLink de react-router-dom (soporta `end`, className y children como función).
export default function NavLink({ href, end = false, className, children, ...props }) {
  const pathname = usePathname();
  const isActive = end
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");
  const state = { isActive };

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={typeof className === "function" ? className(state) : className}
      {...props}
    >
      {typeof children === "function" ? children(state) : children}
    </Link>
  );
}
