import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string; }
interface Modality { icon: string; title: string; desc: string; tag: string; img: string; }
interface Stat { number: string; label: string; icon: string; }
interface Testimonial { name: string; role: string; text: string; stars: number; avatar: string; }
interface Plan { name: string; price: string; period: string; features: string[]; highlight: boolean; }
interface Infrastructure { icon: string; title: string; desc: string; }

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const MODALITIES: Modality[] = [
  {
    icon: "🏋️",
    title: "Musculação",
    tag: "Força & Hipertrofia",
    desc: "Equipamentos de última geração para potencializar seus resultados. Acompanhamento profissional individualizado com avaliação física completa.",
    img: "https://images.pexels.com/photos/5327533/pexels-photo-5327533.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
  {
    icon: "🥋",
    title: "Hapkido",
    tag: "Arte Marcial Coreana",
    desc: "A arte marcial da harmonia e autodefesa. Técnicas de alavancagem, chutes e controle que desenvolvem disciplina e equilíbrio corporal.",
    img: "/images/hapkido.png",
  },
  {
        icon: "🥊",
    title: "Karatê",
    tag: "Arte Marcial Japonesa",
    desc: "Disciplina milenar japonesa. Desenvolva postura, concentração, reflexos rápidos e defesa pessoal com tradição e respeito.",
    img: "/images/Karate.png",
 
  },
  {
       icon: "🤼",
    title: "Ballet",
    tag: "Balé, Dança e Alongamento",
    desc: "Aulas de ballet clássico e dança para todas as idades. Desenvolva postura, flexibilidade, coordenação e expressão corporal com professores especializados.",
    img: "/images/Ballet.png",
  },
  {
    icon: "🏊",
    title: "Natação",
    tag: "Aquático",
    desc: "Piscina semiolímpica com aulas para todas as idades e níveis. Desenvolva técnica, resistência e amor pela água com professores certificados.",
    img: "/images/natacao.png",
  },
  {
    icon: "💧",
    title: "Hidroginástica",
    tag: "Baixo Impacto",
    desc: "Exercícios aeróbicos na água com baixo impacto articular. Ideal para todas as idades — melhora o condicionamento, tônus e bem-estar.",
    img: "/images/hidroginastica.png",
  },
];

const STATS: Stat[] = [
  { number: "30+", label: "Anos de Experiência", icon: "🏆" },
  { number: "1.000+", label: "Alunos Ativos", icon: "👥" },
  { number: "8+", label: "Professores Especializados", icon: "🎓" },
  { number: "10+", label: "Modalidades", icon: "🥇" },
];

const INFRASTRUCTURE: Infrastructure[] = [
  { icon: "🏊‍♂️", title: "Piscina Semiolímpica", desc: "Aquecida e coberta, disponível para natação e hidroginástica o ano todo." },
  { icon: "🏋️‍♂️", title: "Sala de Musculação", desc: "Mais de 200 equipamentos de última geração para treino completo." },
  { icon: "🥋", title: "Dojo de Artes Marciais", desc: "Tatame profissional com área ampla para lutas e treinos técnicos." },
  { icon: "🚿", title: "Vestiários Premium", desc: "Amplos e confortáveis com armários individuais, saunas e duchas." },
  { icon: "💆", title: "Supervisão Profissional", desc: "Toda sua experiencia é acompanhada por profissionais qualificados." },
  { icon: "🅿️", title: "Estacionamento Gratuito", desc: "Amplo estacionamento exclusivo para alunos sem custo adicional." },
];

const PLANS: Plan[] = [
  {
    name: "Diaria",
    price: "R$ 29,90",
    period: "/Dia",
    features: [
      "✅ Musculação Livre",
      "✅ Avaliação Física",
      "✅ Aulas experimentais",
      "✅ Acompanhamento Profissional",,
      "❌ Infraestrutura Completa",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "R$ 139,90",
    period: "/mês",
    features: [
      "✅ Musculação Livre",
      "✅ Acompanhamento Profissional",
      "✅ Fitdance incluído",
      "✅ Avaliação Física Mensal",

    ],
    highlight: true,
  },
  {
    name: "Modalidades apartir de",
    price: "R$ 49,90",
    period: "/mês",
    features: [
      "✅ Musculação Livre - R$139,90/mês",
      "✅ Fitdance - R$49,90/mês",
      "✅ Piscina (2x/sem) - R$220,00/mês",
      "✅ Hapkido (2x/sem) - R$110,00/mês",
      "✅ Karatê (2x/sem) - R$110,00/mês",
      "✅ Ballet (2x/sem) - R$130,00/mês",
    ],
    highlight: false,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Mendonça",
    role: "Aluno há 3 anos | Jiu-Jitsu & Musculação",
    text: "A Academia Podium transformou minha vida! Comecei no jiu-jitsu sem saber nada e hoje sou faixa azul. Os professores são excepcionais e a estrutura é de outro nível em Cabreúva!",
    stars: 5,
    avatar: "CM",
  },
  {
    name: "Ana Rodrigues",
    role: "Aluna há 2 anos | Natação & Hidroginástica",
    text: "As aulas de hidroginástica me curaram de dores crônicas nas costas. A piscina aquecida é perfeita o ano todo. Melhor investimento da minha vida!",
    stars: 5,
    avatar: "AR",
  },
  {
    name: "Roberto Lima",
    role: "Aluno há 5 anos | Musculação & Hapkido",
    text: "Profissionalismo incomparável. Perdi 25kg e ganhei uma habilidade em hapkido que não esperava. A equipe Podium é família. Recomendo 1000%!",
    stars: 5,
    avatar: "RL",
  },
  {
    name: "Fernanda Costa",
    role: "Aluna há 1 ano | Karatê",
    text: "Minha filha começou no karatê aqui e a transformação foi incrível — disciplina, foco e autoconfiança. Toda a família virou aluna Podium!",
    stars: 5,
    avatar: "FC",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Components ──────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-glass shadow-lg shadow-yellow-900/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo .png"
              alt="Logo Academia Podium"
              className="w-26 h-30 object-contain rounded-full shadow-lg "
            />
            <div>
              <span className="text-white font-black text-2xl tracking-widest">PODIUM</span>
              <p className="text-yellow-400 text-xs tracking-widest font-semibold -mt-1">ACADEMIA</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm font-semibold tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              className="btn-primary text-black font-black px-6 py-2.5 rounded-full text-sm tracking-wide uppercase"
            >
              Matricule-se
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-yellow-400 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-0.5 bg-yellow-400 mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-yellow-400 mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-yellow-400 transition-all"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-400/20 px-4 py-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 text-base font-semibold uppercase tracking-wide"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-black font-black px-6 py-3 rounded-full text-sm tracking-wide uppercase text-center mt-2"
          >
            Matricule-se Agora
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay absolute inset-0" />

      {/* Decorative yellow lines */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-60" />
      <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-60" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/40 rounded-full px-5 py-2 mb-8 mt-2 sm:mt-0 animate-fadeIn">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">
            A Melhor Academia de Cabreúva
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mb-4 animate-fadeInUp">
          SUPERE SEUS
          <br />
          <span className="text-yellow-400 yellow-glow">LIMITES</span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fadeInUp delay-200">
          Musculação, Artes Marciais, Piscina e muito mais. Na Academia Podium,
          cada treino é um passo rumo ao seu melhor desempenho.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
          <a
            href="#contato"
            className="btn-primary text-black font-black px-10 py-4 rounded-full text-lg uppercase tracking-wide shadow-xl"
          >
            Comece Agora - Grátis
          </a>
          <a
            href="#modalidades"
            className="border-2 border-yellow-400 text-yellow-400 font-bold px-10 py-4 rounded-full text-lg uppercase tracking-wide hover:bg-yellow-400/10 transition-all duration-300"
          >
            Ver Modalidades
          </a>
        </div>

        {/* Quick stats bar */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 animate-fadeInUp delay-500">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="stat-number text-3xl font-black">{stat.number}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

function ModalitiesSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section id="modalidades" className="bg-black py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-3">O Que Oferecemos</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            NOSSAS <span className="text-yellow-400">MODALIDADES</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Treinos para todos os objetivos, níveis e idades. Encontre a modalidade ideal para você.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MODALITIES.map((mod, i) => (
            <div
              key={mod.title}
              className={`modality-card rounded-2xl overflow-hidden card-hover ${
                visible ? `animate-fadeInUp delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={mod.img}
                  alt={mod.title}
                  className="w-full h-full object-cover brightness-75 hover:brightness-90 hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                  {mod.tag}
                </span>
                <span className="absolute bottom-4 right-4 text-4xl">{mod.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-white font-black text-xl mb-2">{mod.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{mod.desc}</p>
                <a
                  href="#contato"
                  className="mt-4 inline-flex items-center gap-2 text-yellow-400 font-bold text-sm hover:gap-3 transition-all"
                >
                  Saber mais <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfrastructureSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section id="estrutura" className="bg-neutral-950 py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-3">Infraestrutura</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            ESTRUTURA DE <span className="text-yellow-400">ALTO NÍVEL</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Mais do que uma academia — um complexo esportivo completo pensado para sua evolução.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INFRASTRUCTURE.map((item, i) => (
            <div
              key={item.title}
              className={`group border border-yellow-400/10 hover:border-yellow-400/50 bg-black rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:bg-yellow-400/5 card-hover ${
                visible ? `animate-fadeInUp delay-${(i % 6) * 100}` : "opacity-0"
              }`}
            >
              <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature banner */}
        <div className={`mt-12 rounded-2xl overflow-hidden relative ${visible ? "animate-fadeInUp delay-600" : "opacity-0"}`}>
          <div
            className="relative h-64 sm:h-90 flex items-center justify-center"
            style={{
              backgroundImage: "url('/images/heroestrutura1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-center px-4">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Venha Conhecer Nossa <span className="text-yellow-400">Estrutura</span>
              </h3>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                Agende uma visita gratuita e descubra por que somos referência em Cabreúva e região.
              </p>
              <a
                href="#contato"
                className="btn-primary text-black font-black px-8 py-3 rounded-full uppercase tracking-wide inline-block"
              >
                Agendar Visita Gratuita
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section id="planos" className="bg-black py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-3">Investimento</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            PLANOS <span className="text-yellow-400">PARA TODOS</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Escolha o plano ideal para seus objetivos. Sem taxa de matrícula no primeiro mês!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlight
                  ? "border-2 border-yellow-400 shadow-2xl shadow-yellow-400/20 scale-105"
                  : "border border-gray-800"
              } ${visible ? `animate-fadeInUp delay-${(i + 1) * 200}` : "opacity-0"}`}
            >
              {plan.highlight && (
                <div className="bg-yellow-400 text-black text-center py-2 font-black text-sm uppercase tracking-widest">
                  Mais Popular
                </div>
              )}
              <div className={`p-8 ${plan.highlight ? "bg-gradient-to-b from-yellow-950/30 to-black" : "bg-neutral-900"}`}>
                <h3 className={`text-xl font-black uppercase tracking-wide mb-2 ${plan.highlight ? "text-yellow-400" : "text-white"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-400 mb-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => {
                    const priceIndex = f.lastIndexOf(" - R$");
                    const label = priceIndex >= 0 ? f.slice(2, priceIndex) : f.slice(2);
                    const price = priceIndex >= 0 ? f.slice(priceIndex + 3) : "";

                    return (
                      <li key={f} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-base leading-none">{f.charAt(0)}</span>
                        <span className={`flex-1 ${f.startsWith("❌") ? "text-gray-600" : ""}`}>
                          {label}
                        </span>
                        {price && <span className="font-bold text-yellow-400 whitespace-nowrap">{price}</span>}
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#contato"
                  className={`block text-center font-black py-3 rounded-full uppercase tracking-wide transition-all duration-300 ${
                    plan.highlight
                      ? "btn-primary text-black"
                      : "border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
                  }`}
                >
                  Escolher Plano
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          * Preços sujeitos a alteração. Consulte condições especiais para família e estudantes.
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section id="depoimentos" className="bg-neutral-950 py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-3">Depoimentos</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            QUEM TREINA <span className="text-yellow-400">APROVA</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card rounded-2xl p-6 card-hover ${
                visible ? `animate-fadeInUp delay-${(i + 1) * 150}` : "opacity-0"
              }`}
            >
              <div className="flex mb-3">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-black text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, visible } = useIntersectionObserver();
  const [form, setForm] = useState({ name: "", phone: "", email: "", modality: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp integration
    const msg = `Olá! Gostaria de informações sobre a Academia Podium Cabreúva.%0A%0A*Nome:* ${form.name}%0A*Telefone:* ${form.phone}%0A*Email:* ${form.email}%0A*Modalidade de Interesse:* ${form.modality}%0A*Mensagem:* ${form.message}`;
    window.open(`https://wa.me/5511940763058?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contato" className="bg-black py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-3">Fale Conosco</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            COMECE SUA <span className="text-yellow-400">JORNADA</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Matricule-se agora e ganhe a primeira semana grátis. Nossa equipe entrará em contato em até 2 horas!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className={`${visible ? "animate-slideInLeft" : "opacity-0"}`}>
            <div className="bg-neutral-900 border border-yellow-400/20 rounded-2xl p-8">
              <h3 className="text-white font-black text-xl mb-6">📋 Quero me Matricular</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm font-semibold block mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full bg-black border border-gray-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm font-semibold block mb-1">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(11) 9 9999-9999"
                      className="w-full bg-black border border-gray-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-semibold block mb-1">E-mail</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full bg-black border border-gray-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-semibold block mb-1">Modalidade de Interesse *</label>
                  <select
                    required
                    value={form.modality}
                    onChange={(e) => setForm({ ...form, modality: e.target.value })}
                    className="w-full bg-black border border-gray-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200"
                  >
                    <option value="" className="text-gray-600">Selecione...</option>
                    <option>Musculação</option>
                    <option>Hapkido</option>
                    <option>Karatê</option>
                    <option>Natação</option>
                    <option>Hidroginástica</option>
                    <option>Ballet</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-semibold block mb-1">Mensagem (opcional)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Alguma dúvida ou informação adicional?"
                    className="w-full bg-black border border-gray-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full text-black font-black py-4 rounded-xl uppercase tracking-wide text-lg flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.65 4.82 1.79 6.85L2 30l7.35-1.76C11.27 29.38 13.59 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5c-2.17 0-4.28-.58-6.12-1.67l-.44-.26-4.57 1.1 1.13-4.44-.28-.46C4.58 20.26 4 18.16 4 16 4 9.37 9.37 4 16 4s12 5.37 12 12-5.37 11.5-12 11.5zm6.58-8.75c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.55 3.9 6.18 5.47.87.37 1.54.59 2.07.76.87.27 1.66.23 2.28.14.7-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
                  </svg>
                  {sent ? "✅ Enviado! Aguarde nosso contato" : "Enviar via WhatsApp"}
                </button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className={`flex flex-col gap-6 ${visible ? "animate-fadeInUp delay-300" : "opacity-0"}`}>
            {/* Address */}
            <div className="bg-neutral-900 border border-yellow-400/20 rounded-2xl p-6">
              <h3 className="text-yellow-400 font-black text-lg mb-4">📍 Localização</h3>
              <p className="text-white font-semibold">Academia Podium</p>
              <p className="text-gray-400 mt-1">Rua Pará, 220, Cabreúva - SP</p>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-700">
                <iframe
                  title="Mapa da Academia Podium em Cabreúva"
                  src="https://www.google.com/maps?q=Academia%20Podium%20Cabre%C3%BAva&z=14&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>

              <a
                href="https://maps.app.goo.gl/xwA3NU2oqr3dvwb9A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm mt-3 hover:underline"
              >
                Ver no Google Maps →
              </a>
            </div>

            {/* Hours */}
            <div className="bg-neutral-900 border border-yellow-400/20 rounded-2xl p-6">
              <h3 className="text-yellow-400 font-black text-lg mb-4">🕐 Horários de Funcionamento</h3>
              <div className="space-y-2 text-sm">
                {[
                  ["Segunda a Sexta", "06h às 00h"],
                  ["Sábado", "07h às 16h"],
                  ["Domingo e Feriados", "08h às 12h"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-gray-300 border-b border-gray-800 pb-2">
                    <span>{day}</span>
                    <span className="text-yellow-400 font-bold">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/5511940763058?text=Olá!+Quero+saber+mais+sobre+a+Academia+Podium+em+Cabreúva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-600 hover:bg-green-500 transition-colors duration-300 rounded-2xl p-6 group"
            >
              <svg viewBox="0 0 32 32" className="w-10 h-10 fill-white group-hover:scale-110 transition-transform" aria-hidden="true">
                <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.65 4.82 1.79 6.85L2 30l7.35-1.76C11.27 29.38 13.59 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5c-2.17 0-4.28-.58-6.12-1.67l-.44-.26-4.57 1.1 1.13-4.44-.28-.46C4.58 20.26 4 18.16 4 16 4 9.37 9.37 4 16 4s12 5.37 12 12-5.37 11.5-12 11.5zm6.58-8.75c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.55 3.9 6.18 5.47.87.37 1.54.59 2.07.76.87.27 1.66.23 2.28.14.7-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
              </svg>
              <div>
                <p className="text-white font-black text-lg">Fale pelo WhatsApp</p>
                <p className="text-green-200 text-sm">Resposta rápida — atendimento imediato!</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/acpodium/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 hover:opacity-90 transition-opacity duration-300 rounded-2xl p-6 group"
            >
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white group-hover:scale-110 transition-transform" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
              </svg>
              <div>
                <p className="text-white font-black text-lg">Siga no Instagram</p>
                <p className="text-pink-200 text-sm">@academiapodiumcabreuva — Conteúdo diário!</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-yellow-400 py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black text-black mb-4 leading-tight">
          SUA TRANSFORMAÇÃO <br />COMEÇA HOJE!
        </h2>
        <p className="text-black/70 text-lg mb-8 max-w-xl mx-auto">
          Não espere mais. Primeira semana grátis, sem compromisso. Venha conhecer a Academia Podium em Cabreúva!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contato"
            className="bg-black text-yellow-400 font-black px-10 py-4 rounded-full text-lg uppercase tracking-wide hover:bg-gray-900 transition-colors duration-300 shadow-xl"
          >
            Matricule-se Agora
          </a>
          <a
            href="https://wa.me/5511940763058"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-black text-black font-black px-10 py-4 rounded-full text-lg uppercase tracking-wide hover:bg-black/10 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.65 4.82 1.79 6.85L2 30l7.35-1.76C11.27 29.38 13.59 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5c-2.17 0-4.28-.58-6.12-1.67l-.44-.26-4.57 1.1 1.13-4.44-.28-.46C4.58 20.26 4 18.16 4 16 4 9.37 9.37 4 16 4s12 5.37 12 12-5.37 11.5-12 11.5zm6.58-8.75c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.55 3.9 6.18 5.47.87.37 1.54.59 2.07.76.87.27 1.66.23 2.28.14.7-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function SeoSection() {
  return (
    <section
      id="seo"
      aria-label="SEO para busca do Google"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <h2>Academia Podium Cabreúva</h2>
      <p>
        Academia em Cabreúva, São Paulo, especializada em musculação, artes marciais, natação,
        hidroginástica, jiu-jítsu, karatê, hapkido e treinamento funcional. Nossa academia oferece
        estrutura premium com equipamentos de última geração, professores especializados, aulas em grupo,
        acompanhamento profissional e ambiente seguro para pessoas de todas as idades. Se você busca a melhor
        academia em Cabreúva para perder peso, ganhar massa muscular, melhorar condicionamento físico,
        aprender defesa pessoal ou praticar esporte em um espaço moderno, a Academia Podium é a escolha ideal.
        Localizada em Cabreúva SP, combinamos qualidade, disciplina, motivação e resultados reais para quem
        quer evoluir com saúde, foco e performance. Academia de musculação em Cabreúva, academia com
        piscina, academia de artes marciais, aulas de hapkido, jiu-jitsu e karatê, treinamento personalizado,
        plano de fitness e estrutura para família e atletas.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-yellow-400/20 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo .png"
                alt="Logo Academia Podium"
                className="w-30 h-30 object-contain"
              />
              <div>
                <span className="text-white font-black text-xl tracking-widest">PODIUM</span>
                <p className="text-yellow-400 text-xs tracking-widest font-semibold -mt-1">ACADEMIA</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A academia de alta performance de Cabreúva. Musculação, Artes Marciais, Piscina e muito mais.
            </p>
          </div>

          {/* Modalidades */}
          <div>
            <h4 className="text-yellow-400 font-black uppercase tracking-wide text-sm mb-4">Modalidades</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Musculação", "Hapkido", "Jiu-Jitsu", "Karatê", "Natação", "Hidroginástica"].map((m) => (
                <li key={m}><a href="#modalidades" className="hover:text-yellow-400 transition-colors">{m}</a></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-yellow-400 font-black uppercase tracking-wide text-sm mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}><a href={item.href} className="hover:text-yellow-400 transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-yellow-400 font-black uppercase tracking-wide text-sm mb-4">Contato</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2"><span>📍</span> Rua Pará, 220, Cabreúva - SP</li>
              <li className="flex items-start gap-2"><span>📞</span> (11) 94076-3058</li>
              <li className="flex items-start gap-2"><span>📧</span> acpodiumcabreuva@hotmail.com</li>
              <li className="flex items-start gap-2"><span>🕐</span> Seg–Sex: 06h–00h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Academia Podium Cabreúva — Todos os direitos reservados.</p>
          <p className="mt-1 text-xs">Desenvolvido com ❤️ para a comunidade de Cabreúva e região.</p>
          <a href="#seo" className="mt-3 inline-block text-yellow-400 hover:text-yellow-300 transition-colors underline-offset-2 hover:underline">
            SEO — Academia Podium Cabreúva
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Floating Button ────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5511940763058?text=Olá!+Quero+saber+mais+sobre+a+Academia+Podium"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 animate-pulse-glow transition-all hover:scale-110"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-9 h-9 fill-white">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.65 4.82 1.79 6.85L2 30l7.35-1.76C11.27 29.38 13.59 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5c-2.17 0-4.28-.58-6.12-1.67l-.44-.26-4.57 1.1 1.13-4.44-.28-.46C4.58 20.26 4 18.16 4 16 4 9.37 9.37 4 16 4s12 5.37 12 12-5.37 11.5-12 11.5zm6.58-8.75c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.55 3.9 6.18 5.47.87.37 1.54.59 2.07.76.87.27 1.66.23 2.28.14.7-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
      </svg>
    </a>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <ModalitiesSection />
      <InfrastructureSection />
      <PlansSection />
      <TestimonialsSection />
      <ContactSection />
      <FinalCTA />
      <SeoSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
