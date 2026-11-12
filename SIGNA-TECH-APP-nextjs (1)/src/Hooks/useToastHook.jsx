"use client";

import { useCallback, useState } from 'react';

let id = 0;

export function useToast() {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback((mensaje, tipo = 'exito') => {
        const toastId = ++id;
        setToasts((prev) => [...prev, { id: toastId, mensaje, tipo }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((item) => item.id !== toastId));
        }, 3500);
    }, []);

    return { toasts, toast };
}
