"use client";

import { useCallback, useEffect, useState } from 'react';

export function useBarraLateral() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme =
            localStorage.getItem('tema-sinatex-glasses') === 'claro' ? 'light' : 'dark';
    }, []);

    const toggleMenu = useCallback((e) => {
        e.stopPropagation();
        setMenuAbierto((prev) => !prev);
    }, []);

    const cerrar = useCallback(() => setMenuAbierto(false), []);

    return { menuAbierto, toggleMenu, cerrar };
}
