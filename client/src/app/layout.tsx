import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SA Delta Classroom", description: "Learn, practice and grow with SA Delta Classroom." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body>{children}</body></html>;
}
