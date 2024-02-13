import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import Provider from "@/components/custom/provider/provider";
import MobileOnly from "@/components/custom/container/mobile-only/mobile-only";

export const metadata = {
  title: "PCS Internal",
  description: "Project Management",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative font-sans ${GeistSans.variable}`}>
        <Provider>
          <MobileOnly>
            <div className="min-h-screen">{children}</div>
          </MobileOnly>
        </Provider>
      </body>
    </html>
  );
}
