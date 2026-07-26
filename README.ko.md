# Cybereun Motion Lab

<div align="center">
  <img src="./public/cybereun-icon.png" alt="Cybereun Motion Lab 아이콘" width="112" />

  <h3>보고, 움직이고, 복사해서 바로 사용하는 React 모션 실험실</h3>

  <p>
    178개의 마이크로 인터랙션을 두 가지 탐색 방식으로 체험하고,<br />
    독립 실행형 CLI로 필요한 TSX 소스만 내 프로젝트에 추가할 수 있습니다.
  </p>

  <p>
    <a href="https://cybereun-motion-lab.vercel.app"><strong>라이브 데모</strong></a>
    ·
    <a href="./README.md">English</a>
    ·
    <a href="https://github.com/cybereun/cybereun-motion-lab">GitHub</a>
    ·
    <a href="https://www.threads.com/@gogo_lebi">Threads @gogo_lebi</a>
  </p>

  <p>
    <a href="https://cybereun-motion-lab.vercel.app">
      <img alt="Vercel 배포" src="https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white" />
    </a>
    <a href="https://github.com/cybereun/cybereun-motion-lab">
      <img alt="버전" src="https://img.shields.io/badge/version-1.1.0-2563eb?style=for-the-badge" />
    </a>
    <a href="./LICENSE">
      <img alt="MIT 라이선스" src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&logo=opensourceinitiative&logoColor=white" />
    </a>
  </p>

  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" />
    <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Motion 12" src="https://img.shields.io/badge/Motion-12-fff312?style=flat-square&logo=framer&logoColor=111111" />
    <img alt="Vite 6" src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white" />
    <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img alt="독립 CLI" src="https://img.shields.io/badge/CLI-cybereun--motion-22d3ee?style=flat-square" />
    <img alt="PWA 지원" src="https://img.shields.io/badge/PWA-Ready-7c3aed?style=flat-square&logo=pwa&logoColor=white" />
  </p>
</div>

![Cybereun Motion Lab 미리보기](./public/og.png)

## 프로젝트 소개

**Cybereun Motion Lab**은 React 마이크로 인터랙션을 한눈에 탐색하거나 하나씩 크게
체험하고, 필요한 구현을 내 프로젝트로 가져갈 수 있는 인터랙티브 갤러리입니다.

첫 화면은 제품의 목적과 사용 흐름을 설명하는 전체 화면 인트로입니다. 포인터에 반응하는
`DotField` 배경 위에서 라이브러리의 특징을 확인한 뒤 Motion Lab에 입장할 수 있습니다.
입장 후에는 원본의 전체 갤러리 구조를 보존한 **전체 보기**가 먼저 열리고, 필요할 때
새롭게 만든 **개별 보기(Motion Gallery Studio)**로 전환할 수 있습니다.

이 프로젝트는 단순한 전시 페이지에 그치지 않습니다. 저장소 안에
`cybereun-motion` 독립 CLI가 포함되어 있어, 레지스트리에 준비된 컴포넌트의 TSX
소스를 다른 React 프로젝트에 직접 복사하고 자유롭게 수정할 수 있습니다.

## 지금 앱에서 달라진 점

- 짙은 남색 중심이던 원본을 더 밝고 선명한 남색·청록·보라 계열로 재설계했습니다.
- 처음 접속하면 앱의 목적을 설명하는 전체 화면 인트로가 표시됩니다.
- 인트로와 전체 보기 배경에 반응형 `DotField`를 적용했습니다.
- 전체 갤러리와 집중형 스튜디오를 오가는 이중 탐색 구조를 제공합니다.
- 개별 보기의 가운데 무대, 컴포넌트 브라우저, 컬렉션 요약을 새롭게 구성했습니다.
- 컨트롤 패널을 열면 미리보기를 흐리지 않고 중앙 공간이 자동으로 줄어듭니다.
- 미리보기 크기, 배경 광원, 강조 색상을 조절할 수 있으며 검정 강조 색상도 제공합니다.
- 로더의 회색 표현을 고대비 흰색 계열로 보정하고 터미널 커서는 회색으로 구분했습니다.
- 카드 스프레드의 hover 반응, 페이지 화살표 정렬과 버튼 스크롤 점프를 수정했습니다.
- 기존 X 링크를 제거하고 GitHub와 Threads `@gogo_lebi`로 연결했습니다.
- 설치 탭과 Skills 탭을 Cybereun 전용 내용으로 전면 교체했습니다.
- 투명 배경 앱 아이콘, 파비콘, PWA 설치 아이콘과 소셜 미리보기를 적용했습니다.
- GitHub에서 설치할 수 있는 독립 실행형 `cybereun-motion` CLI를 추가했습니다.

## 주요 기능

### 1. 전체 화면 인트로

- 앱이 무엇을 제공하는지 입장 전에 설명합니다.
- Canvas 기반 DotField가 포인터 위치, 광원과 물결에 반응합니다.
- `prefers-reduced-motion` 환경에서는 자동 효과를 줄이면서 직접적인 포인터 피드백은 유지합니다.
- 인트로 디자인은 운영 갤러리와 독립적으로 유지됩니다.

### 2. 두 가지 탐색 방식

| 보기 | 설명 |
| --- | --- |
| 전체 보기 | 원본 갤러리의 한 화면 탐색 구조를 보존한 기본 화면 |
| 개별 보기 | 선택한 모션을 큰 중앙 무대에서 집중적으로 체험하는 Motion Gallery Studio |

입장할 때는 항상 전체 보기가 먼저 표시됩니다. 우측 보기 전환 버튼으로 언제든 개별 보기로
이동할 수 있습니다.

### 3. 178개 모션 프리뷰

| 컬렉션 | 개수 | 내용 |
| --- | ---: | --- |
| Buttons | 35 | hover, press, morph, focus, blur, rotate, pulse, magnetic 등 |
| Card Spreads & 3D Carousels | 15 | arc, fan, cascade, scatter, CoverFlow, Time Machine 등 |
| Loaders | 128 | dots, rings, bars, shapes, text, interface, physics 기반 로더 |
| **합계** | **178** | 웹 갤러리에서 검색하고 직접 체험 가능한 전체 모션 |

### 4. Motion Gallery Studio

- Buttons, Card Spreads, 3D Carousels, Loaders 카테고리 이동
- 이름 기반 실시간 검색
- 서로 다른 형태의 축소 미리보기
- 선택한 컴포넌트를 크게 보여주는 중앙 무대
- 고정 폭 카운터를 사용한 정확한 이전·다음 정렬
- 선택한 컴포넌트의 구현 코드 복사
- 컨트롤 패널 상태에 따라 자동 조정되는 반응형 레이아웃

### 5. 미리보기 컨트롤

- 미리보기 크기 조정
- 주변 광원 강도 조정
- 파랑, 청록, 보라, 검정 강조 색상
- 패널을 열어도 중앙 무대에 blur를 적용하지 않음
- 데스크톱에서는 작업 공간을 재배치하고 작은 화면에서는 겹침을 최소화

### 6. Lab Install 및 AI Skills

- **Lab Install**: GitHub 복제, `npm link`, CLI 초기화와 컴포넌트 설치를 실제 명령으로 안내
- **AI Skills**: 새 모션 추가, 품질 점검, 테마 적용, 반응형 개선, 접근성과 성능 최적화를 위한 복사형 프롬프트
- 프로젝트 명령 탭에서 CLI 명령을 바로 복사
- 존재하지 않는 npm 패키지나 외부 transitions.dev 명령을 표시하지 않음

### 7. PWA 및 소셜 연결

- 데스크톱과 모바일 홈 화면 설치 지원
- 전용 투명 배경 앱 아이콘과 브라우저 파비콘
- 서비스 워커 기반 정적 리소스 처리
- GitHub `cybereun/cybereun-motion-lab`
- Threads `@gogo_lebi`

## 빠른 시작

### 요구 사항

- Node.js 18 이상
- npm
- Git

### 로컬 웹페이지 실행

```bash
git clone https://github.com/cybereun/cybereun-motion-lab.git
cd cybereun-motion-lab
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 검사 및 빌드

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

## 독립 실행형 CLI

### 저장소를 받은 뒤 CLI 연결

```bash
git clone https://github.com/cybereun/cybereun-motion-lab.git
cd cybereun-motion-lab
npm install
npm link
```

또는 GitHub 저장소에서 CLI를 바로 전역 설치할 수 있습니다.

```bash
npm install --global github:cybereun/cybereun-motion-lab
```

### React 프로젝트에서 사용

```bash
cd my-react-project
cybereun-motion init
cybereun-motion list loader
cybereun-motion add terminal-loader
cybereun-motion doctor
```

### CLI 명령

| 명령 | 기능 |
| --- | --- |
| `cybereun-motion init` | `motion-lab.json`과 기본 컴포넌트 폴더 생성 |
| `cybereun-motion list [검색어]` | 설치 가능한 컴포넌트 검색 |
| `cybereun-motion add <이름>` | TSX 소스 복사 및 누락된 의존성 설치 |
| `cybereun-motion doctor` | Node.js, 설정 파일과 레지스트리 상태 진단 |
| `cybereun-motion --help` | 전체 도움말 및 원작자 고지 확인 |
| `cybereun-motion --version` | CLI 버전 확인 |

### CLI 옵션

| 옵션 | 기능 |
| --- | --- |
| `--dir <경로>` | 작업할 React 프로젝트 경로 지정 |
| `--overwrite` | 같은 이름의 기존 컴포넌트 교체 |
| `--skip-install` | 의존성을 설치하지 않고 TSX 소스만 복사 |

웹 갤러리는 178개의 미리보기를 제공하며, 현재 독립 CLI에는 그중 레지스트리 형식으로
준비된 155개의 컴포넌트가 포함되어 있습니다. CLI로 설치된 파일은 기본적으로
`src/components/motion-lab/`에 저장됩니다.

## 웹페이지 사용 방법

1. 인트로 화면에서 포인터를 움직여 DotField 반응을 확인합니다.
2. **Enter Motion Lab**을 선택합니다.
3. 기본으로 표시되는 **전체 보기**에서 모든 컬렉션을 한눈에 살펴봅니다.
4. 더 크게 체험하려면 **개별 보기**로 전환합니다.
5. 카테고리 또는 검색으로 원하는 모션을 찾습니다.
6. 중앙 무대에서 직접 hover, click, drag 동작을 확인합니다.
7. 필요할 때만 **Controls**를 열어 크기, 광원과 강조 색상을 조절합니다.
8. 코드 복사 버튼 또는 CLI를 이용해 구현을 내 프로젝트로 가져갑니다.
9. **Lab Install**과 **AI Skills**에서 설치 명령과 작업 프롬프트를 확인합니다.

## 프로젝트 구조

```text
cybereun-motion-lab/
├─ cli/
│  ├─ cybereun-motion.js       # 독립 실행형 CLI
│  └─ schema.json              # motion-lab.json 설정 스키마
├─ public/
│  ├─ cybereun-icon.png        # 앱 아이콘 원본
│  ├─ favicon.*                # 브라우저 아이콘
│  ├─ icon-192.png             # PWA 아이콘
│  ├─ icon-512.png
│  ├─ manifest.webmanifest
│  ├─ og.png                   # 소셜 미리보기 이미지
│  └─ sw.js                    # 서비스 워커
├─ registry/
│  └─ ui/                      # CLI 설치용 JSON 및 TSX 레지스트리
├─ src/
│  ├─ components/
│  │  ├─ cards/                # 카드 스프레드와 3D 캐러셀
│  │  ├─ CliPage.tsx           # Lab Install 페이지
│  │  ├─ DotField.tsx          # 반응형 Canvas 배경
│  │  ├─ IntroPage.tsx         # 전체 화면 인트로
│  │  ├─ MotionWorkspace.tsx   # 개별 보기 스튜디오
│  │  └─ SkillsPage.tsx        # AI Skills 페이지
│  ├─ data/                    # 버튼, 카드, 로더 카탈로그
│  ├─ utils/                   # 코드 생성과 복사 유틸리티
│  ├─ App.tsx                  # 인트로 및 이중 보기 전환
│  └─ OriginalGalleryApp.tsx   # 보존된 전체 보기
├─ tests/
│  ├─ cli.test.tsx             # CLI 동작 테스트
│  └─ navigation.test.tsx      # 화면 및 탐색 회귀 테스트
├─ README.md                   # 영문 문서
└─ README.ko.md                # 한글 문서
```

## 기술 구성

- React 19
- TypeScript 5
- Motion 12 / Framer Motion 호환 레지스트리
- Tailwind CSS 4
- Vite 6
- Lucide React
- Canvas 2D 및 SVG
- Node.js 기반 독립 CLI
- Vercel

## Vercel 배포

프로덕션 페이지:

**[https://cybereun-motion-lab.vercel.app](https://cybereun-motion-lab.vercel.app)**

Vercel CLI를 이용한 수동 배포:

```bash
npm run build
vercel deploy --prod -y
```

GitHub 저장소를 Vercel 프로젝트에 연결하면 `main` 브랜치의 변경 사항을 자동 배포할 수도
있습니다.

## 접근성 및 성능

- 시맨틱 버튼과 링크
- 키보드 포커스 및 `aria-label`
- `prefers-reduced-motion` 대응
- 패널 상태에 따라 겹침을 줄이는 반응형 레이아웃
- 보이지 않는 로더 렌더링 최소화
- 고대비 로더 팔레트와 명확한 상태 표현
- PWA 설치 및 서비스 워커

## 기여 방법

1. 저장소를 Fork합니다.
2. `codex/기능이름` 형식의 브랜치를 만듭니다.
3. 변경 후 `npm test`, `npm run lint`, `npm run build`를 실행합니다.
4. 변경 목적과 화면 영향을 설명하는 Pull Request를 보냅니다.

버그와 개선 제안은 [GitHub Issues](https://github.com/cybereun/cybereun-motion-lab/issues)에
등록할 수 있습니다.

## 제작 및 출처

개인화, 새 운영 UI, 이중 탐색 구조, 접근성 개선, PWA 아이콘, 문서와 독립 CLI는
[cybereun](https://github.com/cybereun)이 구성하고 관리합니다.

이 저장소는 **Syed Subhan Uddin**의 오픈소스 프로젝트
**Amicro — Micro Transitions**를 기반으로 합니다. 원작자 저작권과 MIT 라이선스
고지는 삭제하지 않고 유지합니다.

- 기반 원작: [Subhan-code/Amicro--Micro-transitions-](https://github.com/Subhan-code/Amicro--Micro-transitions-)
- 원작자: [Syed Subhan Uddin / Subhan-code](https://github.com/Subhan-code)
- 인터랙티브 배경 참고: [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
- 스프링 모션 연구 참고: [ckissi/kinetics](https://github.com/ckissi/kinetics)
- 현재 저장소: [cybereun/cybereun-motion-lab](https://github.com/cybereun/cybereun-motion-lab)
- Threads: [@gogo_lebi](https://www.threads.com/@gogo_lebi)

React Bits와 Kinetics는 참고한 외부 프로젝트이며, 각 프로젝트의 코드와 자산을 직접
재사용하는 경우 해당 저장소의 최신 라이선스 및 이용 조건을 별도로 확인해야 합니다.

## 라이선스

이 프로젝트는 저장소의 [MIT License](./LICENSE)에 따라 배포됩니다. 기존 Amicro에서
파생된 부분에는 원작자 저작권 고지가 계속 적용됩니다.
