"use client";

import { estilosAdmin } from './estilosAdmin';

function EncabezadoTarjetaAdmin({ icon, title, description, teal = false }) {
    return (
        <header className={estilosAdmin.cardHeader}>
            <span className={`${estilosAdmin.icon} ${teal ? estilosAdmin.iconTeal : ''}`} aria-hidden="true">
                <i className={icon} />
            </span>
            <section>
                <h2 className={estilosAdmin.sectionTitle}>{title}</h2>
                <p className={estilosAdmin.sectionDescription}>{description}</p>
            </section>
        </header>
    );
}

export default EncabezadoTarjetaAdmin;
