import { addHistory, getSigns, saveSigns } from "./interpreterStorage";

export function changeSignStatus(signId, status, user = "Intérprete", reason = "") {
  const signs = getSigns();
  const sign = signs.find((item) => item.id === signId);
  if (!sign) return null;

  const updated = signs.map((item) =>
    item.id === signId ? { ...item, status } : item
  );

  saveSigns(updated);
  addHistory({
    word: sign.word,
    action: status === "Validada" ? "Validación" : "Revisión",
    user,
    status,
    reason: status === "Rechazada" ? reason.trim() : "",
    date: new Date().toLocaleDateString("es-CO")
  });

  return updated;
}

export function updateSign(sign, user = "Intérprete") {
  const signs = getSigns();
  const previousSign = signs.find((item) => item.id === sign.id);
  if (!previousSign) return null;

  const correctedSign = { ...sign, status: "Corregida" };
  const changedFields = ["word", "category", "meaning", "description"]
    .filter((field) => (previousSign[field] || "") !== (correctedSign[field] || ""))
    .map((field) => ({
      word: "palabra",
      category: "categoría",
      meaning: "significado",
      description: "descripción"
    })[field]);
  const updated = signs.map((item) => (item.id === sign.id ? correctedSign : item));
  saveSigns(updated);
  addHistory({
    word: correctedSign.word,
    action: "Corrección",
    user,
    status: "Corregida",
    date: new Date().toLocaleDateString("es-CO"),
    changes: changedFields.length ? `Campos actualizados: ${changedFields.join(", ")}.` : "Contenido revisado."
  });
  return updated;
}

export function registerSign(form, user = "Intérprete") {
  const signs = getSigns();
  const newSign = {
    ...form,
    id: Date.now(),
    status: "Pendiente",
    date: new Date().toLocaleDateString("es-CO")
  };
  saveSigns([...signs, newSign]);
  addHistory({
    word: newSign.word,
    action: "Revisión",
    user,
    status: "Pendiente",
    date: newSign.date
  });
  return newSign;
}
