import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  Copy,
  Github,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface SkillsPageProps {
  theme: 'dark' | 'light';
  onNavigateHome: () => void;
}

const repositoryUrl = 'https://github.com/cybereun/cybereun-motion-lab';

const promptCards = [
  {
    id: 'motion-add',
    title: '새 모션 추가',
    command:
      'Cybereun Motion Lab의 현재 디자인 시스템을 유지하면서 새 React 모션 컴포넌트를 추가해줘. 전체 보기와 개별 보기에서 모두 작동하고, 키보드 및 reduced-motion 접근성도 확인해줘.',
    description: '새 인터랙션을 갤러리 구조에 맞춰 추가합니다.',
    badge: 'BUILD',
  },
  {
    id: 'motion-review',
    title: '모션 품질 점검',
    command:
      '현재 페이지의 모든 모션을 점검해줘. 끊김, 과도한 이동, 작은 글자, 낮은 대비, 클릭 후 스크롤 점프를 찾아서 사용자 경험을 해치지 않는 범위에서 개선해줘.',
    description: '움직임, 가독성, 상호작용 문제를 함께 찾습니다.',
    badge: 'REVIEW',
  },
  {
    id: 'motion-theme',
    title: 'Cybereun 테마 적용',
    command:
      '선택한 컴포넌트를 Cybereun Motion Lab의 밝은 남색, 청록색, 보라색과 검정 포인트 팔레트로 재디자인해줘. 동작 상태가 배경과 명확히 구분되게 해줘.',
    description: 'Motion Lab의 브랜드 색상으로 통일합니다.',
    badge: 'STYLE',
  },
  {
    id: 'motion-responsive',
    title: '반응형 레이아웃 개선',
    command:
      '모바일, 태블릿, 데스크톱에서 Motion Lab 레이아웃을 점검해줘. 사이드 컨트롤을 열어도 중앙 미리보기 폭이 자동 조정되고 요소가 겹치지 않게 수정해줘.',
    description: '화면 크기와 패널 상태에 맞게 간격을 조절합니다.',
    badge: 'LAYOUT',
  },
  {
    id: 'motion-accessibility',
    title: '접근성 강화',
    command:
      '이 모션 컴포넌트에 키보드 포커스, aria-label, 충분한 색상 대비, prefers-reduced-motion 대응을 추가하고 기존 애니메이션의 느낌은 유지해줘.',
    description: '모션을 더 많은 사용자가 편하게 이용하게 합니다.',
    badge: 'A11Y',
  },
  {
    id: 'motion-performance',
    title: '속도 최적화',
    command:
      'Cybereun Motion Lab의 초기 로딩과 애니메이션 성능을 분석해줘. 무거운 컴포넌트는 지연 로딩하고 불필요한 리렌더링을 줄이되 시각적 품질은 유지해줘.',
    description: '초기 로딩과 인터랙션 반응 속도를 개선합니다.',
    badge: 'SPEED',
  },
];

const commandCards = [
  {
    id: 'cmd-dev',
    title: 'CLI 초기 설정',
    command: 'cybereun-motion init',
    description: '현재 React 프로젝트에 Motion Lab 설정을 만듭니다.',
    badge: 'INIT',
  },
  {
    id: 'cmd-test',
    title: '컴포넌트 검색',
    command: 'cybereun-motion list loader',
    description: '이름에 loader가 포함된 모션을 검색합니다.',
    badge: 'LIST',
  },
  {
    id: 'cmd-lint',
    title: '컴포넌트 추가',
    command: 'cybereun-motion add terminal-loader',
    description: '원본 TSX와 필요한 패키지를 프로젝트에 추가합니다.',
    badge: 'ADD',
  },
  {
    id: 'cmd-build',
    title: 'CLI 상태 진단',
    command: 'cybereun-motion doctor',
    description: 'Node.js, 설정 파일과 레지스트리 상태를 확인합니다.',
    badge: 'DOCTOR',
  },
  {
    id: 'cmd-update',
    title: '최신 코드 받기',
    command: 'git pull --ff-only origin main',
    description: 'GitHub main 브랜치의 최신 변경을 안전하게 받습니다.',
    badge: 'UPDATE',
  },
  {
    id: 'cmd-status',
    title: '변경 상태 확인',
    command: 'git status --short',
    description: '현재 수정된 파일을 간단히 확인합니다.',
    badge: 'GIT',
  },
];

export function SkillsPage({ theme, onNavigateHome }: SkillsPageProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'prompts' | 'commands'>('prompts');
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

  const cards = activeTab === 'prompts' ? promptCards : commandCards;

  return (
    <div
      className={`relative w-full min-h-dvh flex flex-col antialiased transition-colors duration-300 ${
        isDark
          ? 'bg-[#020617] text-white selection:bg-cyan-400/30'
          : 'bg-[#f3f7ff] text-[#081426] selection:bg-blue-200'
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

      <div className="relative z-10 flex-1 w-full max-w-[1240px] mx-auto px-6 flex flex-col items-center">
        <header className="mt-12 mb-12 text-center w-full flex flex-col items-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold mb-6 border ${
              isDark
                ? 'bg-cyan-400/10 border-cyan-300/20 text-cyan-200'
                : 'bg-cyan-50 border-cyan-200 text-cyan-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            CYBEREUN WORKFLOW
          </div>
          <h1 className="text-[42px] sm:text-[62px] font-bold leading-[1.08] tracking-tight mb-4">
            Motion Lab AI Skills
          </h1>
          <p
            className={`text-[16px] sm:text-[18px] leading-7 max-w-[680px] ${
              isDark ? 'text-blue-100/60' : 'text-blue-950/65'
            }`}
          >
            Cybereun Motion Lab을 더 빠르게 개조하기 위한 나만의 AI 작업 레시피입니다.
            원하는 카드를 복사해 Codex, Claude Code 또는 Cursor에 바로 요청하세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full">
            <button
              onClick={() =>
                document.getElementById('skills-grid-anchor')?.scrollIntoView({ behavior: 'smooth' })
              }
              className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-[13.5px] font-semibold cursor-pointer border-0 ${
                isDark ? 'bg-cyan-300 text-[#021020]' : 'bg-blue-800 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              레시피 시작하기
            </button>
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-[13.5px] font-semibold border no-underline ${
                isDark
                  ? 'bg-[#061328] border-blue-300/15 text-white hover:bg-[#0b2040]'
                  : 'bg-white border-blue-950/10 text-blue-950 hover:bg-blue-50'
              }`}
            >
              <Github className="w-4 h-4" />
              cybereun GitHub
            </a>
          </div>

          <div
            id="skills-grid-anchor"
            className="flex items-center gap-3 mt-14 scroll-mt-24 w-full max-w-[430px] justify-center mx-auto"
          >
            <div
              className={`w-full flex items-center p-1 rounded-full border ${
                isDark
                  ? 'bg-[#061328] border-blue-300/10'
                  : 'bg-blue-100/70 border-blue-950/10'
              }`}
            >
              <button
                onClick={() => setActiveTab('prompts')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium cursor-pointer border-0 ${
                  activeTab === 'prompts'
                    ? isDark
                      ? 'bg-cyan-300 text-[#021020]'
                      : 'bg-white text-blue-950 shadow-sm'
                    : isDark
                      ? 'text-blue-100/50 hover:text-white'
                      : 'text-blue-950/60 hover:text-blue-950'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI 작업 레시피
              </button>
              <button
                onClick={() => setActiveTab('commands')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium cursor-pointer border-0 ${
                  activeTab === 'commands'
                    ? isDark
                      ? 'bg-cyan-300 text-[#021020]'
                      : 'bg-white text-blue-950 shadow-sm'
                    : isDark
                      ? 'text-blue-100/50 hover:text-white'
                      : 'text-blue-950/60 hover:text-blue-950'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                프로젝트 명령
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12 w-full max-w-[1080px]">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => (
              <motion.article
                key={card.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.2, delay: index * 0.025 }}
                className={`relative min-h-[260px] rounded-[24px] border p-5 flex flex-col ${
                  isDark
                    ? 'bg-[#061328] border-blue-300/10 hover:border-cyan-300/25'
                    : 'bg-white border-blue-950/10 hover:border-blue-400/30 shadow-[0_8px_28px_rgba(15,60,120,0.06)]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-full ${
                      isDark
                        ? 'bg-cyan-400/10 text-cyan-200'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {card.badge}
                  </span>
                  <button
                    onClick={() => copyToClipboard(card.command, card.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-0 cursor-pointer ${
                      isDark
                        ? 'bg-white/[0.08] hover:bg-white/[0.14] text-blue-100'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                    }`}
                    aria-label={`${card.title} 복사`}
                  >
                    {copiedText === card.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <h2 className="text-[17px] font-bold mb-2">{card.title}</h2>
                <p className={`text-[12.5px] leading-5 mb-4 ${isDark ? 'text-blue-100/50' : 'text-blue-950/60'}`}>
                  {card.description}
                </p>
                <div
                  className={`mt-auto rounded-2xl p-4 min-h-[110px] flex items-center ${
                    isDark ? 'bg-[#020b1c]' : 'bg-[#edf4ff]'
                  }`}
                >
                  <code
                    className={`text-[11.5px] leading-[1.65] break-words ${
                      isDark ? 'text-blue-100/75' : 'text-blue-950/80'
                    }`}
                  >
                    {card.command}
                  </code>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <aside
          className={`w-full max-w-[1080px] rounded-3xl border px-6 py-5 mb-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDark
              ? 'bg-blue-400/[0.05] border-blue-300/10'
              : 'bg-blue-50 border-blue-950/10'
          }`}
        >
          <div>
            <p className="text-[13px] font-semibold mb-1">오픈소스 및 원작자 고지</p>
            <p className={`text-[12px] leading-5 ${isDark ? 'text-blue-100/45' : 'text-blue-950/55'}`}>
              이 프로젝트는 Syed Subhan Uddin의 Amicro를 기반으로 하며 MIT 라이선스 고지를
              유지합니다. AI 작업 레시피와 한국어 안내는 cybereun이 새롭게 구성했습니다.
            </p>
          </div>
          <a
            href={`${repositoryUrl}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 text-[12px] font-semibold no-underline ${
              isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            MIT 라이선스 보기 →
          </a>
        </aside>
      </div>
    </div>
  );
}
