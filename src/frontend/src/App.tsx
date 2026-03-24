import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gauge,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  Settings,
  Shield,
  Star,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "НАЧАЛО", href: "#home" },
  { label: "ЗА НАС", href: "#about" },
  { label: "УСЛУГИ", href: "#services" },
  { label: "ОБОРУДВАНЕ", href: "#equipment" },
  { label: "КОНТАКТИ", href: "#contact" },
];

const SERVICES = [
  {
    num: "01",
    icon: <Wrench className="w-8 h-8" />,
    title: "Монтаж и Инсталация",
    desc: "Професионален монтаж на горивни колонки и оборудване за бензиностанции от всички водещи производители.",
  },
  {
    num: "02",
    icon: <Settings className="w-8 h-8" />,
    title: "Техническо Обслужване",
    desc: "Редовна профилактика и техническо обслужване за безпрепятствена работа на цялото оборудване.",
  },
  {
    num: "03",
    icon: <Gauge className="w-8 h-8" />,
    title: "Ремонт на Оборудване",
    desc: "Бърз и качествен ремонт на горивни колонки, системи за управление и периферни устройства.",
  },
  {
    num: "04",
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "Калибриране и Тестване",
    desc: "Прецизно калибриране и сертифицирано тестване за точност и съответствие с нормативните изисквания.",
  },
];

const DISPENSERS = [
  {
    brand: "Tokheim",
    model: "Tokheim Premier",
    img: "/assets/generated/tokheim-dispenser.dim_400x500.png",
    desc: "Tokheim е световен лидер в производството на горивни колонки. Моделите Premier осигуряват висока точност, надеждност и модерен дизайн, подходящи за всеки тип бензиностанция.",
    features: [
      "Висока точност на измерване",
      "Компактен дизайн",
      "Многопродуктова функция",
    ],
  },
  {
    brand: "Wayne Dresser",
    model: "Wayne Helix",
    img: "/assets/generated/wayne-dispenser.dim_400x500.png",
    desc: "Wayne Dresser предлага иновативни решения за горивни колонки с акцент върху надеждността и лесната поддръжка. Хеликсовата серия е предпочитана от операторите в цял свят.",
    features: ["Модулна конструкция", "Лесна поддръжка", "Енергоефективност"],
  },
  {
    brand: "Gilbarco SK700",
    model: "Gilbarco SK700",
    img: "/assets/generated/gilbarco-dispenser.dim_400x500.png",
    desc: "Gilbarco SK700 е един от най-разпространените модели горивни колонки в България. Известен с изключителната си надеждност, точност и лесното обслужване.",
    features: [
      "Проверена надеждност",
      "Широко разпространен",
      "Богати резервни части",
    ],
  },
];

const WHY_CHOOSE = [
  {
    id: "exp",
    icon: <Award className="w-5 h-5" />,
    text: "20 години опит в бранша",
  },
  {
    id: "cert",
    icon: <Shield className="w-5 h-5" />,
    text: "Сертифицирани техници",
  },
  { id: "247", icon: <Clock className="w-5 h-5" />, text: "Поддръжка 24/7" },
  {
    id: "brands",
    icon: <Wrench className="w-5 h-5" />,
    text: "Работим с всички марки",
  },
  {
    id: "fast",
    icon: <Zap className="w-5 h-5" />,
    text: "Бърза реакция при повреди",
  },
  {
    id: "warranty",
    icon: <CheckCircle2 className="w-5 h-5" />,
    text: "Гаранция на всички ремонти",
  },
];

const CONTACT_INFO = [
  {
    id: "phone",
    icon: <Phone className="w-5 h-5" />,
    label: "+359 888 123 456",
  },
  {
    id: "mail",
    icon: <Mail className="w-5 h-5" />,
    label: "info@llservice.bg",
  },
  {
    id: "location",
    icon: <MapPin className="w-5 h-5" />,
    label: "София, България",
  },
];

const FOOTER_CONTACT = [
  {
    id: "phone",
    icon: <Phone className="w-4 h-4" />,
    text: "+359 888 123 456",
  },
  { id: "mail", icon: <Mail className="w-4 h-4" />, text: "info@llservice.bg" },
  {
    id: "location",
    icon: <MapPin className="w-4 h-4" />,
    text: "София, България",
  },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const submitContact = useSubmitContact();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );
    for (const s of document.querySelectorAll("section[id]")) {
      observer.observe(s);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(formData);
      toast.success("Вашето запитване беше изпратено успешно!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Грешка при изпращане. Моля опитайте отново.");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.16 0.022 240)" }}
    >
      <Toaster />

      {/* NAVIGATION */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: "oklch(0.13 0.02 240 / 0.97)",
          borderColor: "oklch(0.28 0.03 240)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <Settings
              className="w-6 h-6"
              style={{ color: "oklch(0.62 0.19 35)" }}
            />
            <span className="text-2xl font-black tracking-tight">
              <span style={{ color: "oklch(0.62 0.19 35)" }}>LL</span>
              <span style={{ color: "oklch(0.93 0.01 240)" }}>Service</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-xs font-bold tracking-widest uppercase transition-all duration-200 pb-1"
                style={{
                  color:
                    activeSection === link.href.slice(1)
                      ? "oklch(0.62 0.19 35)"
                      : "oklch(0.7 0.015 240)",
                  borderBottom:
                    activeSection === link.href.slice(1)
                      ? "2px solid oklch(0.62 0.19 35)"
                      : "2px solid transparent",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded"
            style={{ color: "oklch(0.93 0.01 240)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: "oklch(0.13 0.02 240)",
                borderTop: "1px solid oklch(0.28 0.03 240)",
              }}
              className="md:hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-bold tracking-widest uppercase py-2"
                    style={{ color: "oklch(0.75 0.015 240)" }}
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.025 240) 0%, oklch(0.16 0.025 230) 50%, oklch(0.12 0.03 220) 100%)",
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.7 0.015 240) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.015 240) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "oklch(0.62 0.19 35)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded"
                style={{
                  backgroundColor: "oklch(0.62 0.19 35 / 0.2)",
                  color: "oklch(0.62 0.19 35)",
                }}
              >
                Професионални Услуги
              </span>
              <h1
                className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 uppercase"
                style={{ color: "oklch(0.95 0.01 240)" }}
              >
                ПРОФЕСИОНАЛНА
                <br />
                <span style={{ color: "oklch(0.62 0.19 35)" }}>ПОДДРЪЖКА</span>
                <br />
                НА БЕНЗИНОСТАНЦИИ
              </h1>
              <p
                className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
                style={{ color: "oklch(0.65 0.015 240)" }}
              >
                Над 20 години опит в монтаж, обслужване и ремонт на горивни
                колонки. Работим с всички водещи марки — Tokheim, Wayne Dresser,
                Gilbarco.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" data-ocid="hero.primary_button">
                  <button
                    type="button"
                    className="btn-orange flex items-center gap-2"
                  >
                    ПОИСКАЙ ОФЕРТА
                  </button>
                </a>
                <a href="#services" data-ocid="hero.secondary_button">
                  <button
                    type="button"
                    className="btn-outline flex items-center gap-2"
                  >
                    НАШИТЕ УСЛУГИ <ChevronDown className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.45 0.015 240)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ChevronDown
              className="w-5 h-5"
              style={{ color: "oklch(0.45 0.015 240)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-24"
        style={{ backgroundColor: "oklch(0.14 0.022 240)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "oklch(0.62 0.19 35)" }}
            >
              Нашите Услуги
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "oklch(0.93 0.01 240)" }}
            >
              КАКВО ПРЕДЛАГАМЕ
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="section-card flex flex-col gap-4 group hover:border-orange transition-all duration-300"
                style={{ borderColor: "oklch(0.28 0.03 240)" }}
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className="text-xs font-black tracking-widest"
                  style={{ color: "oklch(0.62 0.19 35)" }}
                >
                  {s.num}
                </div>
                <div style={{ color: "oklch(0.62 0.19 35)" }}>{s.icon}</div>
                <h3
                  className="text-lg font-bold uppercase tracking-wide"
                  style={{ color: "oklch(0.93 0.01 240)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.6 0.015 240)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / EXPERIENCE */}
      <section
        id="about"
        className="py-24"
        style={{ backgroundColor: "oklch(0.16 0.022 240)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div
                className="relative w-64 h-64 rounded-full flex flex-col items-center justify-center border-4"
                style={{
                  backgroundColor: "oklch(0.19 0.03 240)",
                  borderColor: "oklch(0.62 0.19 35)",
                  boxShadow: "0 0 60px oklch(0.62 0.19 35 / 0.25)",
                }}
              >
                <div
                  className="text-8xl font-black leading-none"
                  style={{ color: "oklch(0.62 0.19 35)" }}
                >
                  20
                </div>
                <div
                  className="text-sm font-black tracking-widest uppercase mt-1"
                  style={{ color: "oklch(0.93 0.01 240)" }}
                >
                  ГОДИНИ ОПИТ
                </div>
                <div
                  className="text-xs tracking-wider mt-1"
                  style={{ color: "oklch(0.55 0.015 240)" }}
                >
                  от 1999 насам
                </div>
                <div
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.62 0.19 35)" }}
                >
                  <Star
                    className="w-5 h-5"
                    style={{ color: "oklch(0.98 0 0)" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase mb-4 block"
                style={{ color: "oklch(0.62 0.19 35)" }}
              >
                За Нас
              </span>
              <h2
                className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6"
                style={{ color: "oklch(0.93 0.01 240)" }}
              >
                ДВАЙСЕТ ГОДИНИ В БРАНША
              </h2>
              <div
                className="space-y-4"
                style={{ color: "oklch(0.65 0.015 240)" }}
              >
                <p className="leading-relaxed">
                  От 1999 година LLService е надежден партньор на бензиностанции
                  в цяла България. С над 20 години опит в сферата, ние познаваме
                  в детайли всяка горивна колонка и всяка система за управление.
                </p>
                <p className="leading-relaxed">
                  Нашият екип от сертифицирани техници е готов да отговори на
                  всяко предизвикателство — от рутинна профилактика до
                  комплексен ремонт. Работим с всички водещи марки: Tokheim,
                  Wayne Dresser, Gilbarco и много други.
                </p>
                <p className="leading-relaxed">
                  Гордеем се с бързата реакция при аварии и с качеството на
                  всеки извършен ремонт. Всяка наша услуга идва с гаранция и
                  грижа за вашия бизнес.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section
        id="equipment"
        className="py-24"
        style={{ backgroundColor: "oklch(0.14 0.022 240)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "oklch(0.62 0.19 35)" }}
            >
              Партньори и Оборудване
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "oklch(0.93 0.01 240)" }}
            >
              НАШЕТО ОБОРУДВАНЕ
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DISPENSERS.map((d, i) => (
              <motion.div
                key={d.brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-lg overflow-hidden border flex flex-col"
                style={{
                  backgroundColor: "oklch(0.19 0.026 240)",
                  borderColor: "oklch(0.28 0.03 240)",
                }}
                data-ocid={`equipment.item.${i + 1}`}
              >
                <div
                  className="h-64 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: "oklch(0.14 0.022 240)" }}
                >
                  <img
                    src={d.img}
                    alt={d.brand}
                    className="h-full w-full object-contain p-4"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.19 0.026 240), transparent)",
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <div
                      className="text-xs font-bold tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.62 0.19 35)" }}
                    >
                      {d.brand}
                    </div>
                    <h3
                      className="text-xl font-black uppercase tracking-wide"
                      style={{ color: "oklch(0.93 0.01 240)" }}
                    >
                      {d.model}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.6 0.015 240)" }}
                  >
                    {d.desc}
                  </p>
                  <ul className="mt-auto space-y-2">
                    {d.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "oklch(0.7 0.015 240)" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "oklch(0.62 0.19 35)" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        className="py-24"
        style={{ backgroundColor: "oklch(0.16 0.022 240)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "oklch(0.62 0.19 35)" }}
            >
              Нашите Предимства
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "oklch(0.93 0.01 240)" }}
            >
              ЗАЩО ДА ИЗБЕРЕТЕ <br />
              <span style={{ color: "oklch(0.62 0.19 35)" }}>LLSERVICE?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Checkmarks */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {WHY_CHOOSE.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg border"
                  style={{
                    backgroundColor: "oklch(0.19 0.026 240)",
                    borderColor: "oklch(0.28 0.03 240)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "oklch(0.62 0.19 35 / 0.15)",
                      color: "oklch(0.62 0.19 35)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.85 0.01 240)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: "oklch(0.65 0.015 240)" }}
              >
                LLService е вашият надежден партньор за поддръжка на
                бензиностанции. С над 20 години опит в бранша, ние сме изградили
                репутация на изключителна компетентност и надеждност.
              </p>
              <p
                className="leading-relaxed"
                style={{ color: "oklch(0.65 0.015 240)" }}
              >
                Нашият сертифициран екип от инженери и техници притежава
                задълбочени познания за всички системи на горивните колонки.
                Разполагаме с богат склад от резервни части за всички марки,
                което ни позволява да реагираме светкавично при всяка повреда.
              </p>
              <p
                className="leading-relaxed"
                style={{ color: "oklch(0.65 0.015 240)" }}
              >
                Доверете се на опита ни и ни позволете да се погрижим за вашето
                оборудване, за да работи безотказно всеки ден.
              </p>
              <a href="#contact">
                <button
                  type="button"
                  className="btn-orange mt-4"
                  data-ocid="why.primary_button"
                >
                  СВЪРЖЕТЕ СЕ С НАС
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24"
        style={{ backgroundColor: "oklch(0.14 0.022 240)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "oklch(0.62 0.19 35)" }}
            >
              Контакти
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "oklch(0.93 0.01 240)" }}
            >
              СВЪРЖЕТЕ СЕ С НАС
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3
                  className="text-xl font-bold uppercase mb-4"
                  style={{ color: "oklch(0.93 0.01 240)" }}
                >
                  Информация
                </h3>
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                      style={{ color: "oklch(0.65 0.015 240)" }}
                    >
                      <span style={{ color: "oklch(0.62 0.19 35)" }}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: "oklch(0.19 0.026 240)",
                  borderColor: "oklch(0.28 0.03 240)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock
                    className="w-5 h-5"
                    style={{ color: "oklch(0.62 0.19 35)" }}
                  />
                  <span
                    className="font-bold uppercase tracking-wide"
                    style={{ color: "oklch(0.93 0.01 240)" }}
                  >
                    Работно Време
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.015 240)" }}
                >
                  Понеделник – Петък: 08:00 – 18:00
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.015 240)" }}
                >
                  Събота: 09:00 – 14:00
                </p>
                <p
                  className="text-sm mt-2 font-semibold"
                  style={{ color: "oklch(0.62 0.19 35)" }}
                >
                  Аварийна поддръжка 24/7
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="contact.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    style={{ color: "oklch(0.7 0.015 240)" }}
                    className="mb-1 block text-sm"
                  >
                    Вашето Име *
                  </Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Иван Иванов"
                    required
                    data-ocid="contact.input"
                    style={{
                      backgroundColor: "oklch(0.19 0.026 240)",
                      borderColor: "oklch(0.28 0.03 240)",
                      color: "oklch(0.93 0.01 240)",
                    }}
                  />
                </div>
                <div>
                  <Label
                    style={{ color: "oklch(0.7 0.015 240)" }}
                    className="mb-1 block text-sm"
                  >
                    Телефон *
                  </Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+359 888 ..."
                    required
                    data-ocid="contact.input"
                    style={{
                      backgroundColor: "oklch(0.19 0.026 240)",
                      borderColor: "oklch(0.28 0.03 240)",
                      color: "oklch(0.93 0.01 240)",
                    }}
                  />
                </div>
              </div>
              <div>
                <Label
                  style={{ color: "oklch(0.7 0.015 240)" }}
                  className="mb-1 block text-sm"
                >
                  Имейл
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="example@email.com"
                  data-ocid="contact.input"
                  style={{
                    backgroundColor: "oklch(0.19 0.026 240)",
                    borderColor: "oklch(0.28 0.03 240)",
                    color: "oklch(0.93 0.01 240)",
                  }}
                />
              </div>
              <div>
                <Label
                  style={{ color: "oklch(0.7 0.015 240)" }}
                  className="mb-1 block text-sm"
                >
                  Съобщение *
                </Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Опишете вашето запитване..."
                  required
                  rows={5}
                  data-ocid="contact.textarea"
                  style={{
                    backgroundColor: "oklch(0.19 0.026 240)",
                    borderColor: "oklch(0.28 0.03 240)",
                    color: "oklch(0.93 0.01 240)",
                  }}
                />
              </div>

              {submitContact.isSuccess && (
                <div
                  className="p-3 rounded-lg text-sm font-semibold"
                  style={{
                    backgroundColor: "oklch(0.25 0.08 145)",
                    color: "oklch(0.75 0.12 145)",
                  }}
                  data-ocid="contact.success_state"
                >
                  ✓ Вашето запитване беше изпратено успешно! Ще се свържем с вас
                  скоро.
                </div>
              )}

              <button
                type="submit"
                className="btn-orange w-full"
                disabled={submitContact.isPending}
                data-ocid="contact.submit_button"
              >
                {submitContact.isPending ? "ИЗПРАЩАНЕ..." : "ИЗПРАТИ ЗАПИТВАНЕ"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-12 border-t"
        style={{
          backgroundColor: "oklch(0.11 0.02 240)",
          borderColor: "oklch(0.25 0.03 240)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings
                  className="w-6 h-6"
                  style={{ color: "oklch(0.62 0.19 35)" }}
                />
                <span className="text-2xl font-black">
                  <span style={{ color: "oklch(0.62 0.19 35)" }}>LL</span>
                  <span style={{ color: "oklch(0.93 0.01 240)" }}>Service</span>
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.55 0.015 240)" }}
              >
                Професионална поддръжка на бензиностанции от 1999 година.
              </p>
              <div className="space-y-2">
                {FOOTER_CONTACT.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "oklch(0.55 0.015 240)" }}
                  >
                    <span style={{ color: "oklch(0.62 0.19 35)" }}>
                      {item.icon}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4
                className="font-bold uppercase tracking-widest text-sm mb-4"
                style={{ color: "oklch(0.93 0.01 240)" }}
              >
                Бързи Връзки
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.55 0.015 240)" }}
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4
                className="font-bold uppercase tracking-widest text-sm mb-4"
                style={{ color: "oklch(0.93 0.01 240)" }}
              >
                Услуги
              </h4>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.num}>
                    <a
                      href="#services"
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.55 0.015 240)" }}
                      data-ocid="footer.link"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2"
            style={{ borderColor: "oklch(0.22 0.025 240)" }}
          >
            <p className="text-xs" style={{ color: "oklch(0.45 0.015 240)" }}>
              © {new Date().getFullYear()} LLService. Всички права запазени.
            </p>
            <p
              className="text-xs flex items-center gap-1"
              style={{ color: "oklch(0.4 0.015 240)" }}
            >
              Изградено с{" "}
              <Heart
                className="w-3 h-3"
                style={{ color: "oklch(0.62 0.19 35)" }}
              />{" "}
              използвайки{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(0.62 0.19 35)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
