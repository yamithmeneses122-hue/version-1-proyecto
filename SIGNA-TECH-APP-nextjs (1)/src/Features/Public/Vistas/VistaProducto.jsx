"use client";

import EncabezadoProducto from "../Componentes/EncabezadoProducto.jsx";
import CaracteristicasProducto from "../Componentes/CaracteristicasProducto.jsx";
import PanelDescargaProducto from "../Componentes/PanelDescargaProducto.jsx";

export default function VistaProducto() {
    return (
        <>
            <EncabezadoProducto />
            <CaracteristicasProducto />
            <PanelDescargaProducto />
        </>
    );
}