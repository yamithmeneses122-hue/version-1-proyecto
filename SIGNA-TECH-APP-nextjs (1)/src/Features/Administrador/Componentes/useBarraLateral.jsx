"use client";

import { useCallback, useState } from 'react';

export function useBarraLateral() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = useCallback((e) => {
        e.stopPropagation();
        setMenuAbierto((prev) => !prev);
    }, []);

    const cerrar = useCallback(() => setMenuAbierto(false), []);

    return { menuAbierto, toggleMenu, cerrar };
}
