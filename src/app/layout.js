import { Inter } from 'next/font/google'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "VET Anestesia",
  description: "Calculadora de costos de anestesia veterinaria",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["vet", "anestesia", "veterinaria", "calculadora", "calc"],
  authors: [
    { 
      name: "Agustin Labiano", 
      url: "https://ar.linkedin.com/in/agustin-labiano" 
    },
    {
      name: "Federico Palorma",
      url: "https://ar.linkedin.com/in/federico-palorma-6a693720b",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};

export const viewport = {
  themeColor:  { media: "(prefers-color-scheme: light)", color: "#ffffff" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
