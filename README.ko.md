# Cybereun Motion Lab

<div align="center">
  <img src="./public/cybereun-icon.png" alt="Cybereun Motion Lab 아이콘" width="104" />

  <p><strong>섬세한 마이크로 인터랙션을 탐색하고 체험하며 코드로 활용할 수 있는 React 모션 라이브러리입니다.</strong></p>

  <p>
    <a href="https://cybereun-motion-lab.vercel.app">웹사이트 열기</a>
    ·
    <a href="./README.md">English README</a>
    ·
    <a href="https://www.threads.com/@gogo_lebi">Threads</a>
  </p>

  <p>
    <a href="https://cybereun-motion-lab.vercel.app"><img alt="Vercel 배포" src="https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a>
    <a href="https://github.com/cybereun/cybereun-motion-lab/stargazers"><img alt="GitHub 스타" src="https://img.shields.io/github/stars/cybereun/cybereun-motion-lab?style=for-the-badge&logo=github&color=0b5cff" /></a>
    <a href="./LICENSE"><img alt="MIT 라이선스" src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&logo=opensourceinitiative&logoColor=white" /></a>
  </p>

  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Motion" src="https://img.shields.io/badge/Motion-12-fff312?style=flat-square&logo=framer&logoColor=111111" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img alt="PWA 지원" src="https://img.shields.io/badge/PWA-Ready-5a0fc8?style=flat-square&logo=pwa&logoColor=white" />
  </p>
</div>

## 프로젝트 소개

Cybereun Motion Lab은 오픈소스 Amicro 프로젝트를 기반으로 개인화하고 기능을 확장한 React 마이크로 인터랙션 컬렉션입니다. 운영 화면은 조금 더 밝은 남색의 **Kinetic Atlas** 작업 공간으로 구성되어 있습니다. 하단 필름스트립에서 모션을 고르고, 중앙 무대에서 직접 체험하고, 우측 인스펙터로 표현을 조정한 뒤 구현 코드를 복사할 수 있습니다.

첫 접속 시에는 전체 화면 인트로가 표시됩니다. 인트로의 `DotField` 배경은 포인터 움직임에 따라 점이 밀려나고 광원이 따라옵니다. 운영체제에서 모션 감소 옵션을 사용하더라도 사용자가 직접 일으키는 포인터 피드백은 유지하며, 자동 물결과 반짝임만 줄입니다.

## 주요 특징

- **전체 화면 인트로** — 라이브러리에 입장하기 전에 앱의 목적과 기능을 안내합니다.
- **반응형 DotField 배경** — Canvas 점 그리드, 커서 팽창, 광원, 반짝임과 물결 효과를 제공합니다.
- **버튼 인터랙션 35개** — 호버, 클릭, 모프, 포커스, 블러, 흔들림, 펄스 등의 피드백 패턴을 제공합니다.
- **공간형 레이아웃 15개** — 카드 아크, 팬, 캐스케이드, 스프레드와 3D 캐러셀을 포함합니다.
- **로더 128개** — 작은 로더부터 물리 기반 대형 로더까지 확인할 수 있습니다.
- **즉시 검색** — 버튼, 카드, 캐러셀과 로더 이름을 기준으로 결과를 바로 필터링합니다.
- **Kinetic Atlas 작업 공간** — 카테고리 레일, 중앙 모션 무대, 라이브 인스펙터, 시네마틱 필름스트립을 결합한 독창적인 운영 UI입니다.
- **라이브 미리보기 제어** — 모션 속도, 미리보기 크기, 주변 광량과 포인트 색상을 한 화면에서 조절합니다.
- **명확한 카테고리 탐색** — Buttons, Card Spreads, 3D Carousels, Loaders 컬렉션을 빠르게 오갈 수 있습니다.
- **코드 복사** — 각 미리보기에서 관련 구현 코드를 바로 복사할 수 있습니다.
- **다크·라이트 테마** — 배경, 테두리, 텍스트와 컴포넌트 스테이지가 테마에 맞춰 변합니다.
- **CLI 및 Skills 안내** — 설치 명령과 활용 흐름을 설명하는 별도 페이지를 제공합니다.
- **반응형 내비게이션** — 데스크톱 카테고리 버튼과 모바일 드롭다운을 지원합니다.
- **개인 소셜 연결** — Threads는 `@gogo_lebi`, GitHub는 현재 저장소로 연결됩니다.
- **PWA 설치 지원** — 전용 매니페스트, 앱 아이콘, 네트워크 우선 서비스 워커를 포함합니다.
- **접근성 고려** — 시맨틱 버튼과 링크, 키보드 포커스, 모션 감소 환경을 지원합니다.

## 콘텐츠 구성

| 구역 | 개수 | 제공 기능 |
| --- | ---: | --- |
| Buttons | 35 | 호버·포커스·클릭 체험 및 코드 복사 |
| Card Spreads & 3D Carousels | 15 | 공간형 카드 미리보기와 레이아웃 변경 |
| Loaders | 128 | 화면 진입 시 렌더링되는 애니메이션 미리보기 |
| CLI Install | 안내 | 설치 명령 및 초기 설정 방법 |
| Skills | 안내 | 활용 워크플로와 통합 방법 |

## 시작하기

### 필요 환경

- Node.js 18 이상
- npm

### 로컬 설치 및 실행

```bash
git clone https://github.com/cybereun/cybereun-motion-lab.git
cd cybereun-motion-lab
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

### 검사 명령

```bash
npm test
npm run lint
npm run build
```

### 프로덕션 미리보기

```bash
npm run build
npm run preview
```

## 웹사이트 사용 방법

1. 인트로 화면에서 포인터를 움직여 DotField 반응을 확인합니다.
2. **Enter Motion Lab** 버튼을 선택합니다.
3. Buttons, Card Spreads, 3D Carousels 또는 Loaders 카테고리를 선택합니다.
4. 검색창에 이름을 입력하거나 목록·그리드·매트릭스 보기를 변경합니다.
5. 원하는 컴포넌트 위에서 호버 또는 클릭 동작을 체험합니다.
6. 복사 버튼으로 구현 코드를 복사합니다.
7. **CLI Install**과 **Skills** 페이지에서 추가 설치 방법을 확인합니다.

## 프로젝트 구조

```text
src/
├─ components/
│  ├─ cards/          # 카드 스프레드 및 캐러셀
│  ├─ loaders/        # 로더 컴포넌트
│  ├─ DotField.tsx    # Canvas 기반 반응형 점 배경
│  ├─ IntroPage.tsx   # 전체 화면 앱 소개
│  ├─ AnimatedButton.tsx
│  └─ MotionWorkspace.tsx # Kinetic Atlas 운영 작업 공간
├─ data/              # 카탈로그 메타데이터
├─ utils/             # 코드 생성 및 복사 예제
├─ App.tsx            # 인트로에서 작업 공간으로 전환
└─ main.tsx           # 앱 진입점과 서비스 워커 등록

public/
├─ manifest.webmanifest
├─ sw.js
├─ cybereun-icon.png
└─ icon-*.png
```

## 기술 구성

- React 19
- TypeScript 5
- Motion 12
- Tailwind CSS 4
- Vite 6
- Lucide React
- Canvas 2D 및 SVG
- Vercel

## Vercel 배포

이 앱은 Vite 정적 웹사이트로 구성되어 있으며 Vercel에 배포됩니다.

**[https://cybereun-motion-lab.vercel.app](https://cybereun-motion-lab.vercel.app)**

Vercel CLI 배포:

```bash
npm run build
vercel deploy . --prod
```

## 제작 및 원작자 표기

개인화 및 유지 관리: [cybereun](https://github.com/cybereun)

이 저장소는 **Syed Subhan Uddin**의 오픈소스 프로젝트 **Amicro — Micro Transitions**를 기반으로 합니다. 원작자의 저작권 및 MIT 라이선스 고지를 유지합니다.

- 원작자 GitHub: [Subhan-code](https://github.com/Subhan-code)
- 원본 패키지: [@subhanhq/amicro](https://www.npmjs.com/package/@subhanhq/amicro)
- 현재 저장소: [cybereun/cybereun-motion-lab](https://github.com/cybereun/cybereun-motion-lab)
- Threads: [@gogo_lebi](https://www.threads.com/@gogo_lebi)

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)에 따라 배포됩니다.
