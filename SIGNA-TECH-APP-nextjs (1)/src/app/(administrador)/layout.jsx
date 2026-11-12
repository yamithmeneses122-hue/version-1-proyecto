import { ThemeProvider } from "@/componentes/tema/TemaProvider";

export default function AdministradorLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
