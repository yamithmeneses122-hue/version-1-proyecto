"use client";

export default function Icono({ name, className = "h-5 w-5" }) {
    const common = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
    };

    const paths = {
        arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
        mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /><path d="M8 21h8" /></>,
        camera: <><path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></>,
        message: <><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><path d="M7 9h10M7 13h6" /></>,
        brain: <><path d="M9.5 4.5A3.5 3.5 0 0 0 6 8a3 3 0 0 0 .4 1.5A3.5 3.5 0 0 0 7 16a3.5 3.5 0 0 0 3 3.5V4.5Z" /><path d="M14.5 4.5A3.5 3.5 0 0 1 18 8a3 3 0 0 1-.4 1.5A3.5 3.5 0 0 1 17 16a3.5 3.5 0 0 1-3 3.5V4.5Z" /><path d="M9.5 8h-2M9.5 12h-3M14.5 9h2M14.5 14h2" /></>,
        shield: <><path d="M12 3 20 6v5c0 5-3.2 8.4-8 10-4.8-1.6-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
        book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 5.5V21M8 7h8M8 11h8" /></>,
        users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5" /></>,
        check: <path d="m5 12 4 4L19 6" />,
        chevron: <path d="m6 9 6 6 6-6" />,
        quote: <><path d="M7 10h4v4H7zM13 10h4v4h-4z" /><path d="M7 14c0 3-1 4-3 5M13 14c0 3-1 4-3 5" /></>,
    };

    return <svg {...common}>{paths[name] ?? paths.check}</svg>;
}