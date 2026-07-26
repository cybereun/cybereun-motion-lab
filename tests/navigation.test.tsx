import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { MotionWorkspace } from '../src/components/MotionWorkspace';
import { CliPage } from '../src/components/CliPage';
import { SkillsPage } from '../src/components/SkillsPage';

test('the header links the Threads icon to @gogo_lebi', () => {
  const html = renderToStaticMarkup(<App initiallyEntered />);

  assert.match(html, /href="https:\/\/www\.threads\.com\/@gogo_lebi"/);
  assert.match(html, /aria-label="Visit @gogo_lebi on Threads"/);
});

test('the intro explains the product before entering the library', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /Cybereun Motion Lab에 오신 것을 환영합니다/);
  assert.match(html, /모션 랩 입장하기/);
  assert.match(html, /살아 움직이는 React 마이크로 인터랙션 라이브러리/);
  assert.match(html, /직접 느끼는/);
  assert.match(html, /나만의 모션\./);
  assert.match(html, /data-testid="hero-dot-field"/);
  assert.match(html, /aria-label="포인터에 반응하는 점 배경"/);
  assert.match(html, /hero-dot-field/);
});

test('the entered experience defaults to the preserved original overview', () => {
  const html = renderToStaticMarkup(<App initiallyEntered />);

  assert.match(html, /aria-label="Library view"/);
  assert.match(html, /전체 보기/);
  assert.match(html, /개별 보기/);
  assert.match(html, /의도를 담아 움직이는/);
  assert.match(html, /인터페이스\./);
  assert.match(html, /data-testid="hero-dot-field"/);
  assert.doesNotMatch(html, /aria-label="Motion Gallery Studio"/);
});

test('the library view switcher is limited to component pages', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const overviewSource = readFileSync(
    new URL('../src/OriginalGalleryApp.tsx', import.meta.url),
    'utf8',
  );

  assert.match(appSource, /libraryView === 'detail' \|\| overviewPage === 'home'/);
  assert.match(appSource, /onPageChange=\{setOverviewPage\}/);
  assert.match(overviewSource, /onPageChange\?\.\(currentPage\)/);
});

test('the detail experience remains available as Motion Gallery Studio', () => {
  const html = renderToStaticMarkup(<MotionWorkspace onExit={() => undefined} />);

  assert.match(html, /aria-label="Motion Gallery Studio"/);
  assert.match(html, /aria-label="Component categories"/);
  assert.match(html, /aria-label="Component browser"/);
  assert.match(html, /aria-label="Collection summary"/);
  assert.match(html, /Search 178 motions/);
  assert.match(html, /Download for Mac/);
  assert.doesNotMatch(html, /aria-label="Inspector panel"/);
  assert.doesNotMatch(html, /aria-label="Component filmstrip"/);
});

test('opening controls reallocates workspace width without blurring the preview', () => {
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(css, /\.gallery\.has-controls \.gallery-body\s*{[^}]*margin-right:/s);
  assert.match(css, /\.controls-drawer\s*{[^}]*top: 76px;[^}]*bottom: 110px;/s);
  assert.doesNotMatch(css, /\.controls-backdrop/);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur\(5px\)/);
});

test('browser pagination centers both arrows around a fixed-width counter', () => {
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(css, /\.browser-pagination\s*{[^}]*grid-template-columns: 30px 44px 30px;/s);
  assert.match(css, /\.browser-pagination button\s*{[^}]*place-items: center;/s);
  assert.match(css, /\.browser-pagination span\s*{[^}]*text-align: center;/s);
});

test('card previews keep their own hover state instead of being forced open', () => {
  const source = readFileSync(
    new URL('../src/components/MotionWorkspace.tsx', import.meta.url),
    'utf8',
  );

  assert.doesNotMatch(source, /const shared = \{\s*hovered:\s*true/);
  assert.match(source, /const shared = \{ className: 'gallery-card-demo' \}/);
});

test('motion controls include a visible black accent option', () => {
  const source = readFileSync(
    new URL('../src/components/MotionWorkspace.tsx', import.meta.url),
    'utf8',
  );
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(source, /'#000000'/);
  assert.match(css, /\.control-accents button\s*{[^}]*box-shadow:\s*inset/s);
});

test('the focused studio preview promotes neutral loaders to a high-contrast palette', () => {
  const source = readFileSync(
    new URL('../src/components/MotionWorkspace.tsx', import.meta.url),
    'utf8',
  );
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(source, /gallery dark/);
  assert.match(css, /\.gallery \.focused-preview-scale[\s\S]*\[class\*="bg-zinc-800"\]/);
  assert.match(css, /background-color: #ffffff !important/);
  assert.match(css, /background-color: #c9d2dc !important/);
  assert.match(css, /border-color: #ffffff !important/);
});

test('the terminal loader cursor remains gray against its white card', () => {
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(css, /\[class\*="bg-zinc-900"\][\s\S]*\[class\*="dark:bg-zinc-800"\]/);
  assert.match(css, /background-color: #6b7280 !important/);
});

test('the install guide uses the real Cybereun GitHub workflow', () => {
  const html = renderToStaticMarkup(
    <CliPage theme="dark" onNavigateHome={() => undefined} />,
  );

  assert.match(html, /Cybereun Motion Lab 설치/);
  assert.match(html, /git clone https:\/\/github\.com\/cybereun\/cybereun-motion-lab\.git/);
  assert.match(html, /npm install/);
  assert.match(html, /npm link/);
  assert.match(html, /cybereun-motion init/);
  assert.match(html, /cybereun-motion add fade-in/);
  assert.match(html, /Syed Subhan Uddin/);
  assert.doesNotMatch(html, /npx @subhanhq\/amicro/);
});

test('the skills guide contains Cybereun prompt recipes and project commands', () => {
  const html = renderToStaticMarkup(
    <SkillsPage theme="dark" onNavigateHome={() => undefined} />,
  );

  assert.match(html, /Motion Lab AI Skills/);
  assert.match(html, /새 React 모션 컴포넌트를 추가해줘/);
  assert.match(html, /cybereun GitHub/);
  assert.match(html, /Syed Subhan Uddin/);
  assert.doesNotMatch(html, /transitions\.dev/);
  assert.doesNotMatch(html, /Jakubantalik/);
});
