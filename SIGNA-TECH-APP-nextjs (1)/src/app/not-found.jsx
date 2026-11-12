import { redirect } from "next/navigation";

// Antes: <Route path="*" element={<Navigate to="/" replace />} />
export default function NotFound() {
  redirect("/");
}
