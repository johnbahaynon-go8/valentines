import "./globals.css";

export const metadata = {
  title: "Valentine's Proposal for My Girl",
  description: "A romantic Valentine proposal page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
