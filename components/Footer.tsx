export default function Footer() {
  return (
    <footer className="mt-24 py-8" style={{ borderTop: "1px solid oklch(0.30 0.025 280 / 0.3)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-primary text-sm" style={{ fontFamily: "var(--font-cinzel)" }}>
            Tarotism
          </span>
          <span className="text-[10px] text-muted/40">·</span>
          <span className="text-xs text-muted/60">
            AI Tarot Reading
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-muted/50">
            For entertainment purposes only
          </span>
          <span className="text-[10px] text-muted/40">·</span>
          <span className="text-[11px] text-muted/40">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
