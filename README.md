# KKUSVERSE

Next.js 15 기반으로 구축된 웹사이트로, 재미있는 도구들과 정적 생성 블로그를 제공합니다. MDX 파일 기반의 블로그 포스트를 빌드 타임에 정적으로 생성하여 빠른 로딩 속도와 SEO 최적화를 제공합니다. 다국어 지원(한국어/영어)과 다크 모드를 지원하며, 반응형 디자인으로 다양한 기기에서 사용할 수 있습니다.

## ✨ 주요 기능

### 🛠️ 유틸리티 도구

- **호흡 가이드**: 애니메이션을 따라 호흡하며 마음을 안정시킬 수 있는 명상 도구
- **랜덤 추첨기**: 입력한 항목 중 하나를 무작위로 선택
- **다중 랜덤 추첨기**: 입력한 항목 중 원하는 개수만큼 무작위로 선택
- **뽀모도로 타이머**: 공부와 업무 집중을 위한 뽀모도로 기법 타이머
- **10 Block**: 숫자 블록을 드래그하여 합이 10이 되도록 맞추는 퍼즐 게임
- **슬라이딩 퍼즐**: 타일을 움직여 퍼즐을 원래 순서대로 맞추는 클래식 게임

### 📝 정적 블로그

- **정적 사이트 생성(SSG)**: Next.js의 `generateStaticParams`를 활용하여 빌드 타임에 모든 포스트를 정적으로 생성
- **MDX 기반**: 마크다운과 React 컴포넌트를 결합한 MDX 형식으로 콘텐츠 작성
- **코드 하이라이팅**: Shiki와 rehype-pretty-code를 사용한 아름다운 코드 블록
- **빠른 로딩 속도**: 정적 생성으로 인한 즉각적인 페이지 로딩
- **SEO 최적화**: 빌드 타임에 생성된 정적 페이지로 검색 엔진 최적화

### 🌐 다국어 지원

- 한국어 (ko)
- 영어 (en)

### 🎨 테마

- 다크 모드 / 라이트 모드 지원
- 시스템 테마 자동 감지

## 🛠️ 기술 스택

### Core

- **Next.js** `15.4.3` - React 기반 풀스택 프레임워크 (정적 사이트 생성 지원)
- **TypeScript** `5` - 정적 타입 지원
- **React** `19.1.0` - UI 라이브러리

### Styling

- **Tailwind CSS** `4.1.11` - 유틸리티 기반 CSS 프레임워크
- **next-themes** `0.4.6` - 다크 모드 관리

### State & Form Management

- **zustand** `5.0.8` - 경량 상태 관리
- **react-hook-form** `7.62.0` - 폼 관리

### Internationalization

- **next-intl** `4.3.4` - 다국어 지원

### Blog

- **next-mdx-remote** `5.0.0` - MDX 콘텐츠 렌더링
- **rehype-pretty-code** `0.14.1` - 코드 하이라이팅
- **shiki** `3.12.2` - 코드 하이라이팅 엔진

## 📁 프로젝트 구조

```
kkusverse/
├── messages/            # 다국어 메시지 파일
├── public/              # 정적 파일
├── src/
│   ├── app/             # Next.js App Router
│   │   └── [locale]/    # 다국어 라우팅
│   │       ├── blog/    # 블로그 페이지
│   │       ├── ...
│   ├── components/      # 공통 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── i18n/            # 다국어 설정
│   ├── lib/             # 유틸리티 함수
│   ├── posts/           # MDX 블로그 포스트
│   ├── providers/       # Context Provider
│   ├── stores/          # Zustand 스토어
│   └── styles/          # 전역 스타일
├── next.config.ts       # Next.js 설정
├── tsconfig.json        # TypeScript 설정
└── package.json
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요.

```env
# 사이트 도메인 (robots.txt, sitemap, 메타데이터 등에서 사용)
# 배포 시 실제 도메인으로 변경하세요.
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 2. 개발 서버 실행

```bash
npm run dev
```

## 📝 정적 블로그 포스트 작성

블로그 포스트는 `src/posts/` 디렉토리에 MDX 형식으로 작성합니다. 빌드 시점에 자동으로 정적 페이지로 생성됩니다.

### 디렉토리 구조

```
src/posts/
└── [category]/
    └── [post-name]/
        └── content.mdx
```

### MDX 파일 작성

```mdx
---
title: '포스트 제목'
desc: '포스트 설명'
tags: [태그1, 태그2]
date: 2025-01-01
---

## 본문 내용

마크다운 문법과 React 컴포넌트를 함께 사용할 수 있습니다.
```
