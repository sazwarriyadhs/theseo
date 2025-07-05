// This file is necessary for the app to function correctly.
// The main layout has been moved to src/app/[lang]/layout.tsx
// to support internationalization.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
