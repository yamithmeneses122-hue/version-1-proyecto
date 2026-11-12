export function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filterSigns(signs, query, category = "Todas", status = "Todos") {
  const text = normalizeText(query);
  return signs.filter((sign) => {
    const matchesText =
      !text ||
      normalizeText(sign.word).includes(text) ||
      normalizeText(sign.meaning).includes(text);
    const matchesCategory = category === "Todas" || sign.category === category;
    const matchesStatus = status === "Todos" || sign.status === status;
    return matchesText && matchesCategory && matchesStatus;
  });
}

export function getInitials(name = "Intérprete") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "IM";
}

export function validateSignForm(form) {
  const errors = {};
  if (!form.word.trim()) errors.word = "La palabra es obligatoria.";
  if (!form.meaning.trim()) errors.meaning = "El significado es obligatorio.";
  if (!form.description.trim()) errors.description = "La descripción es obligatoria.";
  return errors;
}
