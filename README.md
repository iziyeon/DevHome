# DevHome 🧭

개발자의 이력서와 커뮤니티가 하나로 연결되는 공간, DevHome.  
자신만의 홈페이지에서 이력서를 소개하고, 글을 작성하고,  
다른 개발자들과 함께 기록하고 소통할 수 있습니다.

---

## 🔗 배포 링크

- [DevHome 바로가기](https://dev-home-eta.vercel.app/)

---

## 🖼 주요 화면

| 커뮤니티 메인                          | 마이페이지                          | 이력서 출력                         |
| -------------------------------------- | ----------------------------------- | ----------------------------------- |
| ![](./src/assets/layout/community.png) | ![](./src/assets/layout/mypage.png) | ![](./src/assets/layout/resume.png) |

---

## ✅ MVP 범위 (실제 구현 완료 기준)

```bash
| 분류          | 항목                                                                          | 설명                                    |
| ------------- | ----------------------------------------------------------------------------- | --------------------------------------- |
| 페이지        | `/`, `/login`, `/signup`, `/posts`, `/posts/:id`, `/write`, `/home/:username` | 전체 유저 동선의 핵심 페이지 구성       |
| 인증 기능     | 회원가입 / 로그인 / 소셜 로그인(Google) / 로그아웃                            | Firebase Authentication                 |
| 글 기능       | 작성 / 수정 / 삭제 / 목록 / 상세 / 태그 / 페이지네이션                        | Firestore 기반 게시글 CRUD              |
| 댓글 기능     | 댓글 조회 (비로그인), 댓글 작성 (로그인)                                      | 각 게시글 하단 댓글 기능                |
| 방명록        | 홈 주인에게 메시지 작성                                                       | `/home/:username` 내부 방명록 전용 영역 |
| 검색          | 제목/내용 키워드 기반 검색                                                    | Firestore `query()` 기반 텍스트 검색    |
| GitHub 연동   | username 기반 공개 레포 자동 불러오기                                         | GitHub REST API 사용                    |
| 이력서 기능   | 자기소개 / 기술스택 / GitHub / PDF 출력                                       | `react-to-print` 활용 이력서 출력 지원  |
| 반응형        | Tailwind 기반 모바일 대응                                                     | Tailwind CSS + DaisyUI                  |
| 라우팅        | 전체 경로 구성 및 권한 분기                                                   | `react-router-dom`                      |
| Firebase 연동 | 인증 + DB 통합 연동                                                           | Firestore 컬렉션 구조 설계 포함         |
```

---

## ⏳ 추후 구현 예정 (확장 기능)

```bash

| 분류            | 항목                                   | 설명                        |
| --------------- | -------------------------------------- | --------------------------- |
| 페이지 확장     | `/blog`, `/dashboard`, `/admin/report` | 블로그, 통계, 관리자 페이지 |
| 홈 커스터마이징 | 테마 설정, 레이아웃 변경               | 미니홈피 스타일 개인화      |
| 다크모드        | light/dark 모드 전환                   | Tailwind + localStorage     |
| 좋아요 기능     | 게시글 좋아요/취소                     | 로그인 사용자 한정          |
| 신고 기능       | 댓글/방명록 신고 → 관리자 처리         | 관리자 페이지 연동          |
| 비공개 글       | 나만 보기 설정                         | `isPrivate: true` 필드 활용 |
| 알림 기능       | 댓글/방명록 작성 시 알림 표시          | UI 또는 Firebase Messaging  |
| 블로그 기능     | 블로그 탭, 글 시리즈화, 마크다운 지원  | `/blog` 경로 기반           |
| 통계 기능       | 방문수 / 글수 / 좋아요 수              | `/dashboard` 기반 시각화    |
| SEO / 공유      | meta 태그 / og 태그 / SNS 공유 버튼    | 퍼블릭 최적화 대응          |
| PWA 대응        | 앱 설치 가능                           | manifest + offline 대응     |
```

---

## 🛠 기술 스택

```bash

| 영역          | 사용 기술                                   |
| ------------- | ------------------------------------------- |
| 프론트엔드    | React + TypeScript + Vite                   |
| UI 라이브러리 | Tailwind CSS + DaisyUI                      |
| 인증 / DB     | Firebase Authentication + Firestore         |
| 라우팅        | react-router-dom v6                         |
| 상태 관리     | React Hooks 기반                            |
| 외부 API      | GitHub REST API                             |
| 인쇄 출력     | react-to-print                              |
| 기타          | Swiper.js (슬라이더), lucide-react (아이콘) |
```

---

## 🔧 환경 요구사항

- Node.js: v18 이상
- npm: v9 이상
- OS: Windows / macOS / Linux

설치 여부 확인:

```bash
node -v
npm -v
```

---

## 🚀 설치 및 실행

### 1️⃣ 프로젝트 클론

```bash
git clone https://github.com/your-username/devhome.git
cd devhome
```

### 2️⃣ 의존성 설치

```bash
npm install
```

### 3️⃣ 개발 서버 실행

```bash
npm run dev
```

### 📁 DevHome 폴더 구조

```
📦 devhome/
├── .env                    # Firebase 환경변수
├── index.html              # 진입 HTML
├── README.md               # 프로젝트 문서
├── package.json            # 의존성 정의
├── tailwind.config.js      # Tailwind 설정
├── vite.config.ts          # Vite 빌드 설정
├── tsconfig.json           # TypeScript 설정
├── src/                    # 소스 디렉토리
│   ├── App.tsx             # 최상위 앱 컴포넌트
│   ├── main.tsx            # 앱 진입 파일
│   ├── firebase.ts         # Firebase 초기화
│   ├── index.css           # 전역 스타일
│   ├── assets/             # 이미지, 배경 등 정적 리소스
│   │   └── layout/         # 배경, 로고, 기본 이미지
│   ├── components/         # 재사용 및 페이지별 UI 컴포넌트
│   │   ├── common/         # 버튼, 입력창 등 공통 요소
│   │   ├── layout/         # Header, Footer, PageWrapper
│   │   ├── pages/          # 페이지별 UI 모듈 (커뮤니티, 마이페이지 등)
│   ├── contexts/           # 전역 Context API (Auth 등)
│   ├── data/               # 더미 데이터, 샘플 정보
│   ├── hooks/              # 커스텀 훅 모음
│   ├── pages/              # 페이지 라우트와 연결되는 파일
│   ├── routes/             # react-router 설정
│   ├── services/           # Firestore 등 API 연동
│   │   └── firestore/      # 게시글/유저 저장 관련 함수
│   ├── stores/             # zustand 상태 저장소
│   └── types/              # 전역 타입 선언 (resumeTypes 등)
```

### 5️⃣ 배포

Vercel을 통해 배포 예정

---

## 📌 주요 스크립트

| 명령어           | 설명                   |
| ---------------- | ---------------------- |
| `npm run dev`    | 개발 서버 실행         |
| `npm run build`  | 프로젝트 빌드          |
| `npm run lint`   | ESLint 실행            |
| `npm run format` | Prettier로 코드 포맷팅 |

---

## 📋 커밋 컨벤션

| 태그       | 설명                               |
| ---------- | ---------------------------------- |
| `feat`     | 새로운 기능 추가                   |
| `fix`      | 버그 수정                          |
| `refactor` | 기능 변경 없이 코드 구조 개선      |
| `style`    | 코드 포맷, 스타일 수정 (로직 무관) |
| `docs`     | 문서 변경 (README 등)              |
| `test`     | 테스트 코드 추가/수정              |
| `chore`    | 빌드/배포/패키지 설정 등 기타 변경 |

> 예시: `feat: 게시글 상세 페이지 레이아웃 추가`

---

## 📄 라이선스

MIT License © 2025 YEON
