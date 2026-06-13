"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-gray-800/60 bg-[#0a0e17] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 text-xl bg-[#10141f]" style={{ fontFamily: "var(--font-serif)" }}>
            T
          </div>
          <div>
            <span
              className="block text-lg font-medium text-gold-400 tracking-[0.15em] uppercase leading-[1.2] group-hover:text-gold-300 transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tarotism
            </span>
            <span className="block text-[8px] text-gray-500 tracking-[0.25em] uppercase mt-0.5">
              AI Tarot Reading
            </span>
          </div>
        </Link>

        {/* Navigation Pills */}
        <div className="hidden md:flex items-center space-x-10 text-sm tracking-[0.1em] text-[#a3a8b8]">
          <Link
            href="/"
            className="px-5 py-2 rounded-full border border-gray-700/50 bg-[#141b2d] text-gold-400 font-medium transition-colors"
          >
            Home
          </Link>
          <span className="hover:text-gold-400 transition-colors cursor-pointer">
            History
          </span>
          <span className="hover:text-gold-400 transition-colors cursor-pointer">
            About
          </span>
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full border border-gold-500/40 bg-transparent text-xs tracking-widest text-gold-400 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/70 transition-all font-medium uppercase"
          >
            New Reading
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-700/50 bg-[#10141f] text-gray-400 transition-colors hover:text-gold-400 md:hidden"
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
