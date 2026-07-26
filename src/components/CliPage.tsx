import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Github,
  Terminal,
} from 'lucide-react';

interface CliPageProps {
  theme: 'dark' | 'light';
  onNavigateHome: () => void;
}

const repositoryUrl = 'https://github.com/cybereun/cybereun-motion-lab';

const setupSteps = [
  {
    id: 'clone',
    title: '1. GitHub 저장소 받기',
    description: '원하는 작업 폴더에서 Motion Lab 저장소를 복제합니다.',
    command: `git clone ${repositoryUrl}.git`,
  },
  {
    id: 'enter',
    title: '2. 프로젝트 폴더로 이동',
    description: '복제된 프로젝트 폴더 안에서 다음 명령을 계속 실행합니다.',
    command: 'cd cybereun-motion-lab',
  },
  {
    id: 'install',
    title: '3. CLI 프로젝트 패키지 설치',
    description: '독립 CLI를 연결하기 전에 저장소의 패키지를 설치합니다.',
    command: 'npm install',
  },
  {
    id: 'link',
    title: '4. 독립 CLI 명령 연결',
    description: '어느 프로젝트에서든 cybereun-motion 명령을 사용할 수 있게 연결합니다.',
    command: 'npm link',
  },
  {
    id: 'init',
    title: '5. 사용할 React 프로젝트에서 초기화',
    description: '컴포넌트를 추가할 대상 프로젝트 폴더로 이동한 뒤 실행합니다.',
    command: 'cybereun-motion init',
  },
  {
    id: 'add',
    title: '6. 원하는 모션 컴포넌트 추가',
    description: '레지스트리 소스와 필요한 패키지를 대상 프로젝트에 설치합니다.',
    command: 'cybereun-motion add fade-in',
  },
];

const faqs = [
  {
    q: '기존 Amicro CLI를 별도로 설치해야 하나요?',
    a: '아니요. 이 저장소에는 cybereun-motion이라는 독립 CLI가 포함되어 있습니다. GitHub 저장소에서 npm link로 연결하거나 GitHub 주소를 npm 전역 설치하여 사용할 수 있습니다.',
  },
  {
    q: '컴포넌트 코드를 자유롭게 수정할 수 있나요?',
    a: '네. 프로젝트 소스가 로컬에 있으므로 색상, 속도, 레이아웃과 Motion 설정을 직접 변경할 수 있습니다. 재배포할 때는 저장소의 MIT 라이선스와 원작자 고지를 유지해 주세요.',
  },
  {
    q: 'Vercel에 배포하려면 어떻게 하나요?',
    a: 'GitHub 저장소를 Vercel 프로젝트에 연결하면 main 브랜치의 변경 사항을 자동 배포할 수 있습니다. 로컬에서 먼저 npm run build로 프로덕션 빌드를 확인하는 것을 권장합니다.',
  },
  {
    q: 'Windows에서도 같은 명령을 사용하나요?',
    a: '네. PowerShell, Windows Terminal 또는 VS Code 터미널에서 같은 순서로 실행하면 됩니다. Node.js와 Git이 먼저 설치되어 있어야 합니다.',
  },
];

export function CliPage({ theme, onNavigateHome }: CliPageProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  const isDark = theme === 'dark';

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedText(id);
        window.setTimeout(() => setCopiedText(null), 2000);
      })
      .catch((error) => console.error('Failed to copy:', error));
  };

  return (
    <div
      className={`w-full min-h-dvh pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#020617] text-white' : 'bg-[#f3f7ff] text-[#081426]'
      }`}
    >
      <div className="w-full max-w-[1240px] mx-auto px-6 pt-6">
        <button
          onClick={onNavigateHome}
          className={`flex items-center gap-2 border-0 bg-transparent p-0 text-[13px] font-medium cursor-pointer transition-colors ${
            isDark ? 'text-blue-200/60 hover:text-white' : 'text-blue-950/60 hover:text-blue-950'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          컴포넌트로 돌아가기
        </button>
      </div>

      <section className="w-full max-w-[900px] mx-auto px-6 pt-12 pb-14 text-center flex flex-col items-center">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-[12px] font-semibold tracking-wide ${
            isDark
              ? 'bg-blue-400/10 border-blue-300/20 text-blue-200'
              : 'bg-blue-100 border-blue-200 text-blue-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          CYBEREUN SETUP
        </div>
        <h1 className="text-[38px] sm:text-[58px] font-bold leading-[1.08] tracking-tight mb-5">
          Cybereun Motion Lab 설치
        </h1>
        <p
          className={`text-[16px] sm:text-[18px] leading-7 max-w-[680px] mb-9 ${
            isDark ? 'text-blue-100/60' : 'text-blue-950/65'
          }`}
        >
          GitHub 저장소를 받은 뒤 독립 CLI를 한 번 연결하세요. 이후 어느 React 프로젝트에서든
          원하는 모션 컴포넌트를 소스 코드로 직접 추가하고 자유롭게 개조할 수 있습니다.
        </p>

        <div
          className={`relative flex items-center justify-between gap-4 p-4 pl-5 rounded-2xl border w-full max-w-[660px] shadow-lg ${
            isDark
              ? 'bg-[#071a36] border-blue-300/15 shadow-blue-950/40'
              : 'bg-white border-blue-950/10 shadow-blue-900/10'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 text-left">
            <span className={isDark ? 'text-cyan-300' : 'text-blue-600'}>$</span>
            <code className="text-[13px] sm:text-[14px] font-mono select-all truncate font-medium">
              git clone {repositoryUrl}.git
            </code>
          </div>
          <button
            onClick={() => copyToClipboard(`git clone ${repositoryUrl}.git`, 'hero-clone')}
            className={`p-2 rounded-lg cursor-pointer shrink-0 border-0 transition-colors ${
              isDark
                ? 'bg-white/10 hover:bg-white/15 text-blue-100'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-900'
            }`}
            aria-label="Git clone 명령 복사"
          >
            {copiedText === 'hero-clone' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </section>

      <section className="w-full max-w-[760px] mx-auto px-6 py-10">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className={`text-[12px] font-semibold tracking-[0.16em] mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
              QUICK START
            </p>
            <h2 className="text-[26px] font-bold tracking-tight">설치 및 실행 순서</h2>
          </div>
          <span className={`hidden sm:block text-[12px] ${isDark ? 'text-blue-200/45' : 'text-blue-950/50'}`}>
            Node.js 18+ · Git 필요
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {setupSteps.map((step) => (
            <article
              key={step.id}
              className={`rounded-2xl border p-5 ${
                isDark ? 'bg-[#061328] border-blue-300/10' : 'bg-white border-blue-950/10'
              }`}
            >
              <h3 className="text-[16px] font-semibold mb-1.5">{step.title}</h3>
              <p className={`text-[13px] mb-4 ${isDark ? 'text-blue-100/55' : 'text-blue-950/60'}`}>
                {step.description}
              </p>
              <div
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-mono ${
                  isDark ? 'bg-[#020b1c] text-blue-50' : 'bg-[#edf4ff] text-blue-950'
                }`}
              >
                <code className="text-[12.5px] sm:text-[13.5px] overflow-x-auto">{step.command}</code>
                <button
                  onClick={() => copyToClipboard(step.command, step.id)}
                  className={`p-1.5 rounded-lg cursor-pointer border-0 shrink-0 ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/15 text-blue-100'
                      : 'bg-white hover:bg-blue-100 text-blue-900'
                  }`}
                  aria-label={`${step.title} 명령 복사`}
                >
                  {copiedText === step.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`mt-5 rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDark
              ? 'bg-cyan-400/[0.06] border-cyan-300/15'
              : 'bg-cyan-50 border-cyan-200'
          }`}
        >
          <div>
            <h3 className="text-[14px] font-semibold mb-1">CLI 설치 상태 확인</h3>
            <p className={`text-[12.5px] ${isDark ? 'text-blue-100/55' : 'text-blue-950/60'}`}>
              Node.js, 설정 파일과 컴포넌트 레지스트리 상태를 진단합니다.
            </p>
          </div>
          <button
            onClick={() => copyToClipboard('cybereun-motion doctor', 'build')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-0 cursor-pointer font-mono text-[13px] ${
              isDark ? 'bg-cyan-300 text-[#021020]' : 'bg-blue-700 text-white'
            }`}
          >
            cybereun-motion doctor
            {copiedText === 'build' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </section>

      <section className="w-full max-w-[760px] mx-auto px-6 py-10">
        <h2 className="text-[26px] font-bold tracking-tight mb-7">자주 묻는 질문</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className={`rounded-2xl border overflow-hidden ${
                isDark ? 'border-blue-300/10 bg-[#061328]' : 'border-blue-950/10 bg-white'
              }`}
            >
              <button
                onClick={() => setFaqOpen((current) => ({ ...current, [index]: !current[index] }))}
                className="w-full flex items-center justify-between p-5 font-semibold text-left cursor-pointer border-0 bg-transparent"
                aria-expanded={faqOpen[index] || false}
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    faqOpen[index] ? 'rotate-180' : ''
                  } ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {faqOpen[index] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p
                      className={`m-0 px-5 pb-5 text-[13.5px] leading-[22px] ${
                        isDark ? 'text-blue-100/55' : 'text-blue-950/65'
                      }`}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[760px] mx-auto px-6 py-8">
        <div
          className={`rounded-3xl border p-6 sm:p-8 ${
            isDark ? 'bg-[#061328] border-blue-300/10' : 'bg-white border-blue-950/10'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className={`text-[11px] font-semibold tracking-[0.16em] mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
                OPEN SOURCE
              </p>
              <h2 className="text-[18px] font-bold mb-1">Cybereun Motion Lab</h2>
              <p className={`text-[12.5px] leading-5 max-w-[470px] ${isDark ? 'text-blue-100/50' : 'text-blue-950/60'}`}>
                Syed Subhan Uddin의 Amicro를 기반으로 개조한 MIT 프로젝트입니다. 원작자
                저작권과 라이선스 고지는 저장소에 유지됩니다.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 h-10 rounded-full no-underline text-[12.5px] font-semibold ${
                  isDark ? 'bg-white text-[#071328]' : 'bg-blue-800 text-white'
                }`}
              >
                <Github className="w-4 h-4" />
                내 GitHub
              </a>
              <a
                href="https://github.com/cybereun/cybereun-motion-lab/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 h-10 rounded-full border no-underline text-[12.5px] font-semibold ${
                  isDark
                    ? 'border-blue-300/15 text-blue-100'
                    : 'border-blue-950/15 text-blue-900'
                }`}
              >
                MIT
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
