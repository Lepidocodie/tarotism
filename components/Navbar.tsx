"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative rounded-full border border-outline-dim bg-surface-strong p-1.5">
            <div className="relative h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-primary text-lg font-bold" style={{ fontFamily: "var(--font-cinzel)" }}>T</span>
            </div>
          </div>
          <div>
            <span
              className="block text-lg font-semibold text-primary transition-colors group-hover:text-purple-light"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Tarotism
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted sm:block">
              AI Tarot Reading
            </span>
          </div>
        </Link>

        {/* Navigation Pills */}
        <nav className="hidden items-center gap-1 rounded-full border border-outline-dim/80 bg-surface-strong p-1 md:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all border border-outline-dim bg-surface-container text-purple"
          >
            Home
          </Link>
          <span className="rounded-full px-4 py-2 text-sm font-medium text-muted cursor-default">
            History
          </span>
          <span className="rounded-full px-4 py-2 text-sm font-medium text-muted cursor-default">
            About
          </span>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className="btn-mystic text-sm px-5 py-2"
          >
            New Reading
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-outline-dim/80 bg-surface-container text-on-surface transition-colors hover:text-purple md:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
