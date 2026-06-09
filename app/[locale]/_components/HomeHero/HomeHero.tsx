"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  CreditCard,
  Layers3,
  PlugZap,
  Sparkles,
  Workflow,
  ShieldCheck,
  Cpu,
} from "lucide-react";

type Locale = "en" | "zh" | "ar" | "fa" | "ps";

type HeroStat = {
  value: string;
  label: string;
};

type HeroMetric = {
  label: string;
  value: string;
};

type HeroPreview = {
  agentTitle: string;
  agentStatus: string;
  growthTitle: string;
  growthSubtitle: string;
  liveBadge: string;
};

type HomeHeroContent = {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  trustNote: string;
  visualTitle: string;
  visualSubtitle: string;
  workflowLabel: string;
  workflowSteps: string[];
  stats: HeroStat[];
  metrics: HeroMetric[];
  preview: HeroPreview;
};

const SUPPORTED_LOCALES: Locale[] = ["en", "zh", "ar", "fa", "ps"];
const RTL_LOCALES = new Set<Locale>(["ar", "fa", "ps"]);

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

const dashboardIcons = [Bot, Code2, CreditCard, PlugZap];

function getSupportedLocale(locale: string): Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
}

function buildLocalePath(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

function getArrayValue<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function useHomeHeroContent(): { locale: Locale; content: HomeHeroContent } {
  const locale = getSupportedLocale(useLocale());
  const t = useTranslations("HomeHero");

  return {
    locale,
    content: {
      eyebrow: t("eyebrow"),
      headlineLead: t("headlineLead"),
      headlineAccent: t("headlineAccent"),
      description: t("description"),
      primaryAction: t("primaryAction"),
      secondaryAction: t("secondaryAction"),
      trustNote: t("trustNote"),
      visualTitle: t("visualTitle"),
      visualSubtitle: t("visualSubtitle"),
      workflowLabel: t("workflowLabel"),
      workflowSteps: getArrayValue<string>(t.raw("workflowSteps"), []),
      stats: getArrayValue<HeroStat>(t.raw("stats"), []),
      metrics: getArrayValue<HeroMetric>(t.raw("metrics"), []),
      preview: t.raw("preview") as HeroPreview,
    },
  };
}

export default function HomeHero() {
  const { locale, content } = useHomeHeroContent();
  const isRtl = RTL_LOCALES.has(locale);
  const direction = isRtl ? "rtl" : "ltr";

  return (
    <section
      dir={direction}
      aria-labelledby="home-hero-title"
      className="relative isolate w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgb(10_184_251/18%),transparent_32%),radial-gradient(circle_at_85%_10%,rgb(50_75_157/16%),transparent_30%),linear-gradient(180deg,transparent,rgba(10,184,251,0.04))]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(148_198_233/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_198_233/0.08)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-7xl flex-col items-center gap-14"
      >
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            {content.eyebrow}
          </motion.div>

          <motion.h1
            id="home-hero-title"
            variants={fadeUpVariants}
            className="mx-auto mt-8 max-w-5xl text-balance text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {content.headlineLead}{" "}
            <span className="text-color">{content.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href={buildLocalePath(locale, "/contact")}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-color px-7 py-3 text-sm font-semibold shadow-brand transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {content.primaryAction}
              <ArrowRight
                className={`size-4 transition-transform ${
                  isRtl
                    ? "rotate-180 group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
                aria-hidden="true"
              />
            </Link>

            <Link
              href={buildLocalePath(locale, "/services")}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background/75 px-7 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {content.secondaryAction}
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex items-start justify-center gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="max-w-2xl">{content.trustNote}</p>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3"
          >
            {content.stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="rounded-2xl border border-border/70 bg-background/60 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <p className="text-xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUpVariants} className="relative w-full">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 size-136 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/55 p-4 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-color" />

            <div className="mb-6 flex items-center justify-between border-b border-border/70 pb-5">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs font-medium text-muted-foreground sm:flex">
                <Cpu className="size-3.5 text-primary" />
                AI-powered infrastructure
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {content.visualTitle}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                      {content.visualSubtitle}
                    </h2>
                  </div>

                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-color shadow-brand">
                    <Layers3 className="size-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="grid gap-3">
                  {content.metrics.map((metric, index) => {
                    const Icon = dashboardIcons[index] ?? Sparkles;

                    return (
                      <div
                        key={`${metric.label}-${metric.value}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background/65 p-4 transition duration-300 hover:border-primary/40"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                            <Icon className="size-4" aria-hidden="true" />
                          </div>
                          <p className="truncate text-sm text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-foreground">
                          {metric.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-border/70 bg-brand-soft p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background/70 text-primary">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Secure, scalable, production-ready
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Built for fast teams, clean systems, and measurable growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {content.workflowLabel}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {content.preview.liveBadge}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {content.preview.liveBadge}
                  </div>
                </div>

                <div className="space-y-5">
                  {content.workflowSteps.map((step, index) => {
                    const progress = Math.max(30, 92 - index * 13);

                    return (
                      <div key={`${step}-${index}`} className="grid gap-2">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                              {index + 1}
                            </span>
                            <span className="truncate text-sm font-medium text-foreground">
                              {step}
                            </span>
                          </div>

                          <span className="text-xs text-muted-foreground">
                            {progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{
                              duration: 0.85,
                              delay: 0.35 + index * 0.12,
                              ease: smoothEase,
                            }}
                            className="h-full rounded-full bg-color"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 6,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="rounded-2xl border border-border/70 bg-background/70 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                        <Bot className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {content.preview.agentTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {content.preview.agentStatus}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      duration: 7,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.25,
                    }}
                    className="rounded-2xl border border-border/70 bg-background/70 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-color">
                        <Workflow className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {content.preview.growthTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {content.preview.growthSubtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}