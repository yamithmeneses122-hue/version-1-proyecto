"use client";

import Portada from "../Componentes/Portada.jsx";
import Estadisticas from "../Componentes/Estadisticas.jsx";
import SeccionProblema from "../Componentes/SeccionProblema.jsx";
import FlujoComunicacion from "../Componentes/FlujoComunicacion.jsx";
import SeccionTecnologia from "../Componentes/SeccionTecnologia.jsx";
import VistaPreviaProducto from "../Componentes/VistaPreviaProducto.jsx";
import TarjetaCaracteristica from "../Componentes/TarjetaCaracteristica.jsx";
import ComoFunciona from "../Componentes/ComoFunciona.jsx";
import CasosUso from "../Componentes/CasosUso.jsx";
import SeccionConfianza from "../Componentes/SeccionConfianza.jsx";
import PreguntasFrecuentes from "../Componentes/PreguntasFrecuentes.jsx";
import PanelDescarga from "../Componentes/PanelDescarga.jsx";
import LlamadaAccionFinal from "../Componentes/LlamadaAccionFinal.jsx";

export default function VistaInicio() {
    return (
        <>
            <Portada />
            <Estadisticas />
            <SeccionProblema />
            <FlujoComunicacion />
            <SeccionTecnologia />
            <VistaPreviaProducto />
            <TarjetaCaracteristica />
            <ComoFunciona />
            <CasosUso />
            <SeccionConfianza />
            <PreguntasFrecuentes />
            <PanelDescarga />
            <LlamadaAccionFinal />
        </>
    );
}