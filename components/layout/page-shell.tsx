export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="page-shell aura-scope aura-site">
      {children}
    </main>
  );
}
