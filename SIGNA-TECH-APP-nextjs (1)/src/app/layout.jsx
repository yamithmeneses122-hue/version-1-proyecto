import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/index.css";

export const metadata = {
  title: "SIGNA-TECH-APP | Tecnología que traduce inclusión",
  description:
    "SIGNA-TECH-APP: tecnología para conectar diferentes formas de comunicación.",
};

export const viewport = {
  themeColor: "#0c1216",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
