"use client";

import Link from "next/link";
function PiePagina() {
    const descargarFicha = () => {
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = '/documentos/ficha-producto-signa-tech.pdf';
        enlaceDescarga.download = 'ficha-producto-signa-tech.pdf';
        enlaceDescarga.click();
    };

    return (
        <footer
            className="
                border-t
                border-white/[.05]
                bg-black/[.25]
                px-6
                py-16
                text-white
                backdrop-blur-xl
                lg:px-12
            "
        >

            <section
                className="
                    mx-auto
                    grid
                    max-w-[1600px]
                    gap-10
                    md:grid-cols-3
                "
            >

                {/* INFORMACIÓN */}
                <article>

                    <img
                        src="/images/logo/logo.jpeg"
                        alt="Logotipo de SIGNA-TECH-APP"
                        className="
                            h-[60px]
                            w-[60px]
                            rounded-full
                            object-cover
                        "
                    />

                    <h1
                        id="sobrenosotros"
                        className="
                            mt-4
                            text-xl
                            font-bold
                        "
                    >
                        SIGNA-TECH-APP
                    </h1>

                    <p
                        className="
                            mt-4
                            max-w-sm
                            text-sm
                            leading-7
                            text-[#c7d0d9]
                        "
                    >
                        Comunicación accesible para todos.
                        Conectando personas más allá del lenguaje.
                    </p>

                </article>


                {/* PRODUCTO */}
                <article>

                    <span
                        className="
                            text-lg
                            font-semibold
                            text-white
                        "
                    >
                        Producto
                    </span>

                    <ul className="mt-4 space-y-4">

                        <li>
                            <Link
                                href="/product"
                                className="
                                    text-sm
                                    text-[#c7d0d9]
                                    transition
                                    duration-300
                                    hover:text-[#00CCFF]
                                "
                            >
                                Características
                            </Link>
                        </li>

                        <li>
                            <button
                                type="button"
                                className="
                                    text-sm
                                    text-[#c7d0d9]
                                    transition
                                    duration-300
                                    hover:text-[#00CCFF]
                                "
                                onClick={descargarFicha}
                                style={{ background: 'none', border: 0, padding: 0, font: 'inherit', cursor: 'pointer' }}
                            >
                                Descargar ficha PDF
                            </button>
                        </li>

                    </ul>

                </article>


                {/* CONTACTO */}
                <article>

                    <span
                        className="
                            text-lg
                            font-semibold
                            text-white
                        "
                    >
                        Contáctanos
                    </span>

                    <ul
                        className="
                            mt-4
                            space-y-4
                            text-sm
                            text-[#c7d0d9]
                        "
                    >

                        <li>
                            Correo
                        </li>

                        <li>
                            yamithmeneses122@gmail.com
                        </li>

                        <li>
                            Contacto
                        </li>

                        <li>
                            3127567859
                        </li>

                    </ul>

                </article>

            </section>

        </footer>
    );
}

export default PiePagina;