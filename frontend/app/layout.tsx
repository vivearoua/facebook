import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AppProviders>
          <Header />
          <SideBar/>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
