import { motion } from 'motion/react';
import {
  ArrowRight,
  Boxes,
  Code2,
  Copy,
  Github,
  Layers3,
  Sparkles,
} from 'lucide-react';

import DotField from './DotField';

type IntroPageProps = {
  onEnter: () => void;
};

const previewItems = [
  {
    icon: Sparkles,
    eyebrow: 'MICRO INTERACTIONS',
    title: 'Buttons that respond',
    description: 'Hover, press and focus states with intentional motion.',
    accent: 'from-blue-400 to-cyan-300',
  },
  {
    icon: Layers3,
    eyebrow: 'LAYOUT SYSTEMS',
    title: 'Cards with depth',
    description: 'Spreads, carousels and spatial layouts ready to remix.',
    accent: 'from-cyan-300 to-indigo-400',
  },
  {
    icon: Boxes,
    eyebrow: 'MOTION FEEDBACK',
    title: 'Loaders that delight',
    description: 'Expressive loading states for every kind of product.',
    accent: 'from-indigo-400 to-blue-400',
  },
];

export function IntroPage({ onEnter }: IntroPageProps) {
  return (
    <motion.main
      key="intro-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: 'blur(12px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-dvh w-full overflow-hidden bg-[#020617] text-white"
    >
      <DotField
        data-testid="hero-dot-field"
        aria-label="Interactive dot field background"
        role="img"
        dotRadius={1.8}
        dotSpacing={16}
        cursorRadius={460}
        bulgeStrength={82}
        glowRadius={240}
        sparkle
        waveAmplitude={1.1}
        gradientFrom="rgba(96, 165, 250, 0.48)"
        gradientTo="rgba(34, 211, 238, 0.18)"
        glowColor="rgba(37, 99, 235, 0.42)"
        className="hero-dot-field absolute inset-0 z-0"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_68%_42%,rgba(14,116,144,0.06),transparent_28%),radial-gradient(circle_at_24%_44%,rgba(37,99,235,0.12),transparent_35%),linear-gradient(90deg,rgba(2,6,23,0.42),rgba(2,6,23,0.08)_58%,rgba(2,6,23,0.5))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-48 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#020617] to-transparent" />

      <div className="relative z-[3] mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <img
              src="/cybereun-icon.png"
              alt=""
              className="h-9 w-9 object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.45)]"
            />
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-bold leading-none tracking-[-0.02em]">CYBEREUN</span>
              <span className="mt-1 text-[8px] font-semibold tracking-[0.24em] text-blue-300/55">MOTION LAB</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/cybereun/cybereun-motion-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Cybereun Motion Lab on GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/55 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.threads.com/@gogo_lebi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit @gogo_lebi on Threads"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/55 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white"
            >
              <span
                aria-hidden="true"
                className="block h-[17px] w-[17px] bg-current"
                style={{
                  WebkitMaskImage: "url('/threads.svg')",
                  maskImage: "url('/threads.svg')",
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </a>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-8">
          <section className="mx-auto flex w-full max-w-[720px] flex-col items-start lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-400/[0.08] px-3.5 py-2 text-[9px] font-semibold tracking-[0.18em] text-blue-200 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
              Welcome to Cybereun Motion Lab
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="m-0 max-w-[760px] text-[52px] font-semibold leading-[0.93] tracking-[-0.064em] sm:text-[72px] lg:text-[82px] xl:text-[92px]"
            >
              Motion you can
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                feel and keep.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.6 }}
              className="mb-0 mt-7 max-w-[610px] text-[16px] leading-7 text-blue-100/62 sm:text-[18px] sm:leading-8"
            >
              A living library of React micro-interactions. 버튼, 카드 레이아웃,
              3D 캐러셀과 로더를 직접 움직여 보고 필요한 코드를 바로 복사하세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={onEnter}
                className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full border-0 bg-blue-500 px-7 text-[14px] font-semibold text-white shadow-[0_18px_46px_rgba(37,99,235,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-[0_22px_58px_rgba(37,99,235,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                Enter Motion Lab
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <span className="inline-flex items-center gap-2 px-2 text-[11px] font-medium text-blue-200/40">
                <Code2 className="h-3.5 w-3.5" />
                Explore · Preview · Copy
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200/35"
            >
              <span>35 button motions</span>
              <span>15 spatial layouts</span>
              <span>128 loaders</span>
            </motion.div>
          </section>

          <section aria-label="Library preview" className="relative mx-auto hidden w-full max-w-[540px] lg:block">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
            <div className="relative flex min-h-[520px] flex-col justify-center gap-4">
              {previewItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: 36, rotate: 1.5 }}
                    animate={{ opacity: 1, x: 0, rotate: index === 1 ? 0.8 : index === 2 ? -0.7 : 0 }}
                    transition={{ delay: 0.24 + index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: -8, scale: 1.018, rotate: 0 }}
                    className={`relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071329]/72 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl ${
                      index === 1 ? 'ml-12' : index === 2 ? 'ml-5 mr-7' : 'mr-10'
                    }`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b ${item.accent}`} />
                    <div className="flex items-center gap-4">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-blue-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-[8px] font-bold tracking-[0.17em] text-blue-300/45">{item.eyebrow}</p>
                        <h2 className="mb-0 mt-1 text-[17px] font-semibold tracking-[-0.02em] text-white">{item.title}</h2>
                        <p className="mb-0 mt-1 text-[11px] leading-5 text-blue-100/42">{item.description}</p>
                      </div>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/35">
                        <Copy className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-white/[0.06] pt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-200/28">
          <span>Open source · MIT licensed</span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span className="h-1 w-1 rounded-full bg-cyan-300" />
            Move your cursor to disturb the field
          </span>
        </footer>
      </div>
    </motion.main>
  );
}
