import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Developed by Md. Jahid Hasan with NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="top-center" reverseOrder={false} />
      <body className={inter.className}>
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
