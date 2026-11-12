import { ThemeProvider } from "@/componentes/tema/TemaProvider";

export default function OperadorLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
