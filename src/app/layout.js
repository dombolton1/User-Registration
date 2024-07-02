import { Inter } from "next/font/google";
import "./globals.css";

import Banner from './components/Banner';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "User registration",
  description: "Simple user set up",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Banner/>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
