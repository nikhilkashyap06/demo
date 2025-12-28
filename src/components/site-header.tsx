"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavDropdown } from "./nav-dropdown";
import { getSiteContent } from "@/lib/content";

interface NavItem {
  label: string;
  href: string;
  items?: NavItem[];
}

const { navItems } = getSiteContent();

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-green-600">
          Ion Green
        </Link>
        
        <nav className="hidden items-center space-x-8 text-sm font-medium lg:flex">
          {navItems.map((item) =>
            item.items ? (
              <NavDropdown
                key={item.href}
                item={item}
                isActive={
                  pathname === item.href ||
                  (item.items?.some((subItem) => pathname === subItem.href) ?? false)
                }
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-gray-700 nav-item transition-colors hover:text-green-600",
                  pathname === item.href && "text-green-600 active"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-green-600"></span>
                )}
              </Link>
            )
          )}
        </nav>
        
        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 btn-hover hover-scale"
          >
            Contact Us
          </Link>
        </div>
        
        <MobileMenu navItems={navItems} />
      </div>
    </header>
  );
}

interface MobileMenuProps {
  navItems: NavItem[];
}

function MobileMenu({ navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-white/25 px-3 py-2 text-sm text-white/90"
        aria-expanded={open}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-slate-950 px-4 py-4">
          <div className="flex flex-col gap-3 text-white">
            {navItems.map((item) => (
              <div key={item.href} className="w-full">
                {item.items ? (
                  <div className="space-y-1">
                    <span className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium">
                      {item.label}
                    </span>
                    <div className="ml-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-white/10",
                            pathname === subItem.href ? "text-green-400" : "text-white/80"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-white/10",
                      pathname === item.href ? "text-green-400" : "text-white/80"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-md bg-green-500 px-3 py-2 text-center text-sm font-semibold text-slate-900 btn-hover hover-scale"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

