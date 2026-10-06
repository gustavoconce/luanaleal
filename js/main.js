/* ==========================================================
   Luana Leal — scripts
   ========================================================== */

// ---------- Links dos botões ----------
const LINKS = {
    budget: "https://wa.me/5511910441311?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento.",
    instagram: "https://www.instagram.com/bylealfilm/",
};

// ---------- Textos (PT / EN) ----------
const translations = {
    pt: {
        "nav.about": "SOBRE MIM",
        "nav.moments": "MOMENTOS",
        "nav.contact": "CONTATO",
        "hero.subtitle": "Fotógrafa",
        "cta.budget": "Peça seu orçamento",
        "about.title": "Olá, eu sou a Luana!",
        "about.p1": "Desde criança a fotografia faz parte da minha vida, primeiro como curiosidade, depois como escolha.",
        "about.p2": "Ao longo do tempo, entendi que mais do que editar imagens, eu queria aprender a enxergar melhor. Busco usar menos edição e mais intenção, valorizando a verdade em cada detalhe, os gestos espontâneos, os olhares sinceros, a vida como ela é.",
        "about.p3": "Meu propósito é destacar quem você é de forma sensível e real, criando imagens que contem a sua história com autenticidade. Ainda estou construindo a minha trajetória, mas espero ter a oportunidade de fotografar a sua.",
        "moments.title": "Momentos",
        "contact.title": "Entre em Contato",
        "quote": "\"Hoje a gente vive o momento. Amanhã, a foto conta a história.\"",
        "footer.top": "Voltar ao topo",
        "footer.rights": "Todos os direitos reservados.",
        "alt.hero": "Mãos se aproximando em um campo de girassóis",
        "alt.about": "Luana sorrindo em frente a uma porta de madeira em arco",
        "alt.quote": "Casal abraçado sob uma árvore ao pôr do sol",
        "gallery": [
            "Casal caminhando em frente a um museu, em preto e branco",
            "Casal de costas um para o outro em um campo de girassóis",
            "Casal sorrindo em frente a um prédio histórico",
            "Silhueta de casal na janela contra o céu azul",
            "Mulher sorrindo em frente a uma fonte",
            "Família reunida no sofá com duas crianças",
            "Irmãos sorrindo lado a lado",
        ],
    },
    en: {
        "nav.about": "ABOUT ME",
        "nav.moments": "MOMENTS",
        "nav.contact": "CONTACT",
        "hero.subtitle": "Photographer",
        "cta.budget": "Get a quote",
        "about.title": "Hi, I'm Luana!",
        "about.p1": "Photography has been part of my life since I was a child, first as curiosity, then as a choice.",
        "about.p2": "Over time, I realized that more than editing images, I wanted to learn to see better. I aim for less editing and more intention, valuing the truth in every detail, the spontaneous gestures, the sincere glances, life as it is.",
        "about.p3": "My purpose is to bring out who you are in a sensitive and real way, creating images that tell your story with authenticity. I'm still building my own path, but I hope to have the chance to photograph yours.",
        "moments.title": "Moments",
        "contact.title": "Get in Touch",
        "quote": "\"Today we live the moment. Tomorrow, the photo tells the story.\"",
        "footer.top": "Back to top",
        "footer.rights": "All rights reserved.",
        "alt.hero": "Hands reaching for each other in a sunflower field",
        "alt.about": "Luana smiling in front of an arched wooden door",
        "alt.quote": "Couple embracing under a tree at sunset",
        "gallery": [
            "Couple walking in front of a museum, in black and white",
            "Couple standing back to back in a sunflower field",
            "Couple smiling in front of a historic building",
            "Silhouette of a couple in a window against the blue sky",
            "Woman smiling in front of a fountain",
            "Family together on the couch with two children",
            "Siblings smiling side by side",
        ],
    },
};

// ---------- Galeria ----------
// "tall" ocupa 2 linhas no grid (desktop). "position" ajusta o recorte da foto.
const galleryImages = [
    { src: "img/momento-1.webp", tall: true },
    { src: "img/momento-2.webp", position: "center 25%" },
    { src: "img/momento-3.webp", tall: true },
    { src: "img/momento-4.jpg",  tall: true },
    { src: "img/momento-7.webp", tall: true },
    { src: "img/momento-5.jpg",  tall: true },
    { src: "img/momento-6.jpg",  position: "center 40%" },
];

let currentLang = "pt";

function renderGallery() {
    const container = document.getElementById("gallery-container");
    const alts = translations[currentLang].gallery;
    container.innerHTML = galleryImages.map((img, i) => `
        <div class="gallery__item animate-on-scroll scale-in${img.tall ? " gallery__item--tall" : ""}"
             data-index="${i}" style="transition-delay: ${i * 100}ms;">
            <img src="${img.src}" alt="${alts[i]}" loading="lazy"
                 ${img.position ? `style="object-position: ${img.position};"` : ""}>
        </div>
    `).join("");
}

// ---------- Idioma ----------
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t[el.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
        el.alt = t[el.dataset.i18nAlt];
    });
    document.querySelectorAll(".gallery__item img").forEach((img, i) => {
        img.alt = t.gallery[i];
    });

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
    });

    try { localStorage.setItem("lang", lang); } catch (e) { /* sem armazenamento: tudo bem */ }
}

function initLanguage() {
    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });

    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) { /* ignora */ }
    setLanguage(saved || "pt");
}

// ---------- Links ----------
function initLinks() {
    document.querySelectorAll(".js-link-budget").forEach((a) => { a.href = LINKS.budget; });
    document.querySelectorAll(".js-link-instagram").forEach((a) => { a.href = LINKS.instagram; });
}

// ---------- Navbar ----------
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("mobile-menu-btn");

    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const closeMenu = () => {
        navbar.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
        const open = navbar.classList.toggle("menu-open");
        toggle.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll(".mobile-link").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth >= 768) closeMenu(); });
}

// ---------- Animações de scroll ----------
function initScrollAnimations() {
    const elements = document.querySelectorAll(".animate-on-scroll");

    if (!("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    elements.forEach((el) => observer.observe(el));
}

// ---------- Abertura: "Luana Leal" letra por letra ----------
function runIntro(onDone) {
    const intro = document.getElementById("intro");
    const nameEl = document.getElementById("intro-name");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const STAGGER = reduced ? 0 : 110;   // atraso entre letras (ms)
    const LETTER = reduced ? 600 : 1100; // duração de cada letra (ms)
    const HOLD = reduced ? 300 : 700;    // tempo com o nome completo na tela (ms)

    const text = nameEl.textContent.trim();
    nameEl.setAttribute("aria-label", text);
    nameEl.innerHTML = [...text].map((ch, i) => ch === " "
        ? '<span class="intro__space"></span>'
        : `<span class="intro__letter" aria-hidden="true" style="animation-delay: ${i * STAGGER}ms">${ch}</span>`
    ).join("");

    const fontTimeout = new Promise((resolve) => setTimeout(resolve, 1500));
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.race([fontsReady, fontTimeout]).then(() => {
        nameEl.classList.add("is-ready");
        const total = (text.length - 1) * STAGGER + LETTER + HOLD;

        setTimeout(() => {
            nameEl.classList.add("is-leaving");
            intro.classList.add("is-done");
            document.body.classList.remove("is-loading");
            onDone();
            setTimeout(() => intro.remove(), 1300);
        }, total);
    });
}

// ---------- Lightbox ----------
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const imgEl = lightbox.querySelector(".lightbox__img");
    let current = 0;

    const show = (index) => {
        current = (index + galleryImages.length) % galleryImages.length;
        imgEl.src = galleryImages[current].src;
        imgEl.alt = translations[currentLang].gallery[current];
    };
    const open = (index) => {
        show(index);
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };
    const close = () => {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    document.getElementById("gallery-container").addEventListener("click", (e) => {
        const item = e.target.closest(".gallery__item");
        if (item) open(Number(item.dataset.index));
    });

    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
    lightbox.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
    });
}

// ---------- Voltar ao topo ----------
function initBackToTop() {
    document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initLanguage();
    initLinks();
    initNavbar();
    initLightbox();
    initBackToTop();
    document.getElementById("year").textContent = new Date().getFullYear();

    // as animações da página começam quando a abertura termina
    runIntro(initScrollAnimations);
});
