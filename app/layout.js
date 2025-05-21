import Navbar from '@/components/Navbar';
import "./globals.css";
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>

  );
}
