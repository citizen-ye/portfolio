# 김예찬 포트폴리오

Python 기반 백엔드 개발과 AI 서비스 구현 경험을 정리한 개인 포트폴리오입니다.
세 팀 프로젝트에서 맡았던 작업을 서비스 시연, 구조도, 문제 해결 과정과 함께 소개합니다.

## 프로젝트

### 장부미
백엔드를 Python/FastAPI로 전환하고, OCR 기능 추가와 배포 환경 구성을 진행했습니다.
코드와 폴더 구조 정리, 브랜치·PR 협업 규칙, Docker와 GitHub Actions를 이용한 Azure 배포 경험을 담았습니다.

### AD-CLEAR
건강기능식품 광고 문구를 검토하는 RAG 서비스입니다.
PostgreSQL 데이터 모델링과 결과 저장을 담당하고, 근거 데이터 정규화와 Azure AI Search 인덱스 구성·인덱싱에 함께 참여했습니다.

### 찌릿
1인 가구의 여름철 전력 사용량을 예측하는 서비스입니다.
데이터 분석, 피처 엔지니어링, 머신러닝 알고리즘 선정과 학습 데이터 범위 조정을 담당했습니다.
예측 오차뿐 아니라 실제 서비스 이용 대상을 고려해 모델을 개선한 과정을 정리했습니다.

## 웹사이트 구성

HTML, CSS, JavaScript로 구현했으며 별도 빌드 과정은 없습니다.
웹사이트 파일은 `dist/`, 시연영상과 이미지는 `dist/assets/`에 있습니다.

## 로컬 실행

Python이 설치된 환경에서 저장소 루트에서 실행합니다.

```bash
python -m http.server 8765 --directory dist
```

브라우저에서 http://localhost:8765 에 접속합니다.

## 연락처

- 이메일: ckskyccym@gmail.com
- GitHub: https://github.com/citizen-ye