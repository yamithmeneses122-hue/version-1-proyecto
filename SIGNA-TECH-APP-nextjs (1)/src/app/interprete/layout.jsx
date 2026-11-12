import DisenoInterprete from "@/Features/Interprete/Componentes/DisenoInterprete";
import { ThemeProvider } from "@/componentes/tema/TemaProvider";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <DisenoInterprete>{children}</DisenoInterprete>
    </ThemeProvider>
  );
}
