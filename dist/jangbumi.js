/* Jangbumi case study. Kept separate from the other project renderers. */
(() => {
  const project = document.getElementById('jangbumi');
  const panel = document.getElementById('jangbumi-architecture');
  if (!project || !panel) return;
  const shapes = {
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 7h6M9 11h6M9 15h3"/>',
    server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5"/>',
    check: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M2 12h20M8 7h8M8 17h8"/>',
    branch: '<circle cx="6" cy="4" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="6" cy="20" r="2"/><path d="M6 6v12M18 7v2c0 4-12 3-12 7"/>',
    cloud: '<path d="M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13 1 4.5 4.5 0 0 1 0 9M12 21V10m-4 4 4-4 4 4"/>',
    chat: '<path d="M4 3h16v14H9l-5 4V3Z"/><path d="M8 8h8M8 12h5"/>',
    book: '<path d="M12 5v16M3 3c4 0 6 0 9 2 3-2 5-2 9-2v16c-4 0-6 0-9 2-3-2-5-2-9-2V3Z"/>',
  };
  const icon = name => `<svg class="jb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.check}</svg>`;
  const node = (title, sub, symbol = 'check') => `<div class="jb-node">${icon(symbol)}<strong>${title}</strong><span>${sub}</span></div>`;
  const arrow = '<span class="jb-arrow" aria-hidden="true">→</span>';
  const flow = (nodes, extra = '') => `<div class="jb-flow ${extra}">${nodes.join(arrow)}</div>`;
  const heading = (id, n, category, title, body) => `<header class="jb-copy"><p class="jb-kicker">${n} / ${category}</p><h4 id="jangbumi-${id}" tabindex="-1">${title}</h4><p>${body}</p></header>`;

  panel.classList.add('jb-architecture');
  panel.innerHTML = `
    <div class="jb-board">
      <p class="jb-kicker">01 / 팀 서비스 구조</p>
      <h4>영수증 입력부터 AI 사전진단과 장부 저장까지</h4>
      ${flow([node('영수증·텍스트', '지출 내역 입력', 'receipt'), node('FastAPI', '기능별 요청 처리', 'server'), node('결과 검토', '사용자 확인·수정', 'check'), node('장부 저장', 'PostgreSQL', 'db')])}
      <div class="jb-support"><div>${icon('scan')}<div><strong>PaddleOCR</strong><span>영수증의 날짜·금액·거래처 추출</span></div></div><div>${icon('chat')}<div><strong>AI 사전진단·챗봇</strong><span>RAG + LLM Wiki 기반 세무 근거</span></div></div></div>
      <p class="jb-caption">사용자 흐름을 중심으로 재구성했습니다. OCR은 영수증 입력에 사용하며, 결과는 사용자가 검토합니다.</p>
    </div>
    <div class="jb-contribution-wrap"><p class="jb-kicker">02 / 김예찬 · 주요 기여</p><div class="jb-contributions">
      <a href="#jangbumi-ocr" data-jb-target="ocr">${icon('scan')}<span class="jb-card-number">01</span><strong>OCR 기능 개발</strong><span>기능 구현 · 서비스 통합<br>실제 영수증 검증</span><small>공동 개발 <span aria-hidden="true">↗</span></small></a>
      <a href="#jangbumi-fastapi" data-jb-target="fastapi">${icon('server')}<span class="jb-card-number">02</span><strong>FastAPI 전환</strong><span>API 계약 유지 · 리팩토링<br>팀 협업 규칙</span><small>백엔드 전환 <span aria-hidden="true">↗</span></small></a>
      <a href="#jangbumi-cicd" data-jb-target="cicd">${icon('cloud')}<span class="jb-card-number">03</span><strong>CI/CD 구축</strong><span>앱·OCR 배포<br>서비스 상태 확인</span><small>배포·운영 <span aria-hidden="true">↗</span></small></a>
    </div></div>`;

  const details = project.querySelector('details');
  details.innerHTML = `<summary>상세 보기 <span>↗</span></summary><div class="jangbumi-case-study">
    <p class="jb-intro">기존 프로젝트에 합류해 OCR 기능을 함께 구현하고, Python 백엔드 전환부터 Azure 배포와 운영 검증까지 담당했습니다.</p>
    <div class="jb-tags">${['Python', 'FastAPI', 'PaddleOCR', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'OpenAPI', 'Docker', 'GitHub Actions', 'Azure App Service'].map(t=>`<span>${t}</span>`).join('')}</div>

    <section class="jb-section">
      ${heading('evolution','01','서비스 발전','입력부터 상담까지, 기존 사전진단 서비스를 확장했습니다.','장부미는 지출 내역을 입력하면 필요경비 여부를 근거와 함께 살펴볼 수 있는 서비스입니다. 3차 프로젝트에서는 영수증 OCR로 입력 부담을 줄이고, AI 챗봇과 LLM Wiki로 질문과 세무 근거를 연결했습니다.')}
      <div class="jb-evolution"><div class="jb-before">${icon('receipt')}<small>기존 서비스</small><strong>지출 입력·사전진단</strong><span>입력한 지출을 근거와 함께 확인</span></div><span class="jb-arrow" aria-hidden="true">→</span><div class="jb-growth">${node('OCR 입력','영수증에서 입력 초안 생성','scan')}${node('AI 챗봇','질문과 추가 확인','chat')}${node('LLM Wiki','세무 지식과 출처 연결','book')}</div></div>
      <p class="jb-base">개발·운영 기반 <strong>FastAPI 전환 · 구조 리팩토링 · CI/CD</strong></p>
    </section>

    <section class="jb-section">
      ${heading('ocr','02','OCR · 주요 기여 · 공동 개발','영수증을 읽고, 확인할 수 있는 입력으로 연결했습니다.','날짜·금액·거래처·결제 내용을 다시 입력해야 하는 불편을 줄이기 위해 OCR 기능을 함께 개발했습니다. 구현된 기능을 서비스 브랜치에 통합하고 배포한 뒤, 여러 영수증을 넣어 담당 개발자와 추출 결과와 응답을 확인했습니다.')}
      <div class="jb-board jb-ocr-board">${flow([node('영수증 사진','촬영 또는 갤러리','receipt'),node('PaddleOCR','한국어 문자 인식','scan'),node('필드별 초안','날짜·금액·거래처','server'),node('사용자 확인','수정 후 반영','check')])}<div class="jb-field-preview"><span>입력 초안</span><div>날짜 <i>확인·수정</i></div><div>금액 <i>확인·수정</i></div><div>거래처 <i>확인·수정</i></div><div>결제 내용 <i>확인·수정</i></div></div><p class="jb-caption">자동 확정이 아닌, 사용자가 검토할 수 있는 초안으로 제공합니다.</p></div>
      <div class="jb-three jb-reasons"><div><strong>한국어 인식</strong><p>PP-OCRv5 한국어 모델</p></div><div><strong>내부 처리</strong><p>외부 OCR API로 전송하지 않는 구성</p></div><div><strong>Docker 배포</strong><p>컨테이너 이미지에 모델 포함</p></div></div>
      <p class="jb-note"><b>팀 OCR 고도화</b> 촬영 품질 확인 · 긴 영수증 분할 촬영 · 후보값 검토</p>
    </section>

    <section class="jb-section">
      ${heading('fastapi','03','백엔드 전환','API 계약을 유지하며 Express를 FastAPI로 전환했습니다.','팀이 익숙한 Python과 개발 중인 PaddleOCR을 함께 유지보수할 수 있도록 백엔드를 전환했습니다. 기존 화면이 사용하던 API 경로와 응답 형식, PostgreSQL 구조는 최대한 유지했습니다.')}
      <div class="jb-migration">${node('Express','기존 백엔드','server')}${arrow}<div class="jb-contract"><small>유지한 계약</small><strong>API 경로</strong><strong>응답 형식</strong><strong>DB 구조</strong></div>${arrow}${node('FastAPI','책임 분리·자동 검증','server')}</div>
      <div class="jb-three jb-reasons"><div><strong>SQLAlchemy</strong><p>데이터 접근 표준화</p></div><div><strong>Alembic</strong><p>DB 변경 이력 관리</p></div><div><strong>OpenAPI</strong><p>API 계약·프론트 타입 동기화</p></div></div>
    </section>

    <section class="jb-section">
      ${heading('collaboration','04','리팩토링 · 협업','폴더의 역할과 PR 병합 순서를 함께 정리했습니다.','서로 다른 구조로 개발한 결과를 합치면서 변경 범위를 파악하기 어려웠습니다. 코드의 책임을 나누고 기존 코드는 레거시 영역으로 분리했습니다. 개인 브랜치부터 팀 브랜치, dev, main으로 검토와 병합을 이어가도록 규칙을 정했습니다.')}
      <div class="jb-boundaries"><span>프론트엔드</span><span>백엔드</span><span>도메인 서비스</span><span>OCR</span><span>인프라</span><span>레거시</span></div>
      <p class="jb-caption">역할별 책임 구획 · 실제 디렉터리명을 복제한 그림은 아닙니다.</p>
      <div class="jb-board">${flow([node('개인 브랜치','담당 기능 개발','branch'),node('front · back','팀별 코드 통합','branch'),node('dev','PR 검토·통합 검증','check'),node('main','PR 검토·배포','cloud')])}</div>
      <blockquote class="jb-quote">팀원들로부터 병합 부담이 줄고, 맡은 부분을 더 안심하고 개발할 수 있었다는 피드백을 받았습니다.</blockquote>
    </section>

    <section class="jb-section">
      ${heading('cicd','05','GitHub Actions · Azure','PR 검증부터 배포와 상태 확인까지 연결했습니다.','정적 검사와 테스트를 배포 흐름에 연결했습니다. 앱과 OCR은 각각 배포하고, 배포 후에는 서비스 실행 여부와 요청을 받을 준비 상태를 확인했습니다.')}
      <div class="jb-board">${flow([node('PR','변경 제안','branch'),node('검사·테스트','실패하면 수정 후 재검사','check'),node('병합','검증한 변경 통합','branch'),node('배포','앱·OCR 각각 배포','cloud')])}
      <div class="jb-deploy-lanes"><div><strong>앱</strong><span>Azure App Service</span>${arrow}<span class="jb-status">서비스 상태 확인</span></div><div><strong>OCR</strong><span>Docker · GHCR · 사이드카</span>${arrow}<span class="jb-status">모델 준비 상태 확인</span></div></div>
      <div class="jb-health"><div><strong>Health</strong><span>서비스가 실행 중인가</span></div><div><strong>Readiness</strong><span>모델 로딩 후 요청을 받을 수 있는가</span></div></div></div>
      <p class="jb-note"><b>배포 인증·버전 관리</b> OIDC 인증 · 외부 액션 커밋 SHA 고정</p>
    </section>

    <section class="jb-section">
      ${heading('troubleshooting','06','트러블슈팅','OCR 시작 지연과 API 계약 불일치를 해결했습니다.','프로세스가 실행된 것과 OCR 모델이 요청을 처리할 준비가 된 것은 달랐습니다. Health와 Readiness를 구분해 상태 확인 기준을 바꾸고, 배포된 서비스에서 여러 영수증으로 실제 동작을 확인했습니다.')}
      <div class="jb-board jb-troubleshoot">${flow([node('증상','OCR 시작 시 응답 지연','scan'),node('원인','모델 로딩으로 준비 지연','server'),node('조치','Health·Readiness 분리','branch'),node('확인','준비 상태 확인 후 요청 처리','check')])}</div>
      <div class="jb-issue-list"><div><strong>API 계약 불일치</strong><p>OpenAPI 계약 재생성·검증 절차 추가</p><span>프론트엔드 타입 동기화</span></div><div><strong>CI Artifact 누적</strong><p>약 2.28GiB · 보존 기간 90일 → 1일</p><span>장기 보관량 관리 기준 조정</span></div></div>
    </section>

    <section class="jb-section">
      ${heading('ai','07','팀 서비스 발전 · AI 챗봇 · LLM Wiki','챗봇의 질문에 세무 근거를 연결했습니다.','서비스는 지출 입력에서 AI 챗봇을 통한 질문과 추가 확인으로 확장됐습니다. 팀은 LLM Wiki로 세무 자료의 판단 기준·필요 증빙·출처를 연결하고, RAG로 질문에 필요한 컨텍스트를 찾도록 구성했습니다.')}
      <div class="jb-board jb-knowledge"><p class="jb-lane-label">지식 구성</p>${flow([node('세무 원문','법령·판례·공식 자료','book'),node('요약·관계 연결','판단 기준·증빙·출처','branch'),node('LLM Wiki','연결된 지식','book')])}<div class="jb-knowledge-link"><span>질문에 필요한 지식 제공</span><span aria-hidden="true">↓</span></div><p class="jb-lane-label">질문 처리</p>${flow([node('사용자 질문','지출·세무 질문','chat'),node('RAG 검색','관련 컨텍스트 검색','scan'),node('근거 포함 답변','사용자가 출처 확인','check')])}<p class="jb-caption">지식 구성과 검색의 역할을 설명한 개념도입니다.</p></div>
      <div class="jb-benchmark"><div><span>Wiki OFF</span><strong>25<small> / 36</small></strong></div><div class="jb-benchmark-delta">동일 모델·동일 문항<span>7문항 더 정답</span></div><div><span>Wiki ON</span><strong>32<small> / 36</small></strong></div></div><p class="jb-caption">발표자료의 Q-net 기반 36문항 비교 평가 · 실서비스 세무 정확도를 뜻하지 않습니다.</p>
    </section>

    <section class="jb-section jb-results">
      ${heading('results','08','검증 결과','OCR 통합과 배포 후 동작까지 확인했습니다.','OCR 통합 후 실제 테스트를 수행했고, Python 전환 후 웹 서비스와 CI/CD를 다시 배포했습니다. 기능 담당자와 여러 영수증·화면 동작을 확인하며 개발 의도와 사용자 경험을 함께 검토했습니다.')}
      <div class="jb-three jb-done"><div>${icon('check')}<strong>OCR 통합·테스트</strong><span>실제 영수증으로 동작 확인</span></div><div>${icon('check')}<strong>FastAPI 전환·배포</strong><span>전환한 웹 서비스 배포</span></div><div>${icon('check')}<strong>PR·자동 검증</strong><span>변경부터 배포까지 검증 연결</span></div></div>
      <div class="jb-evaluation"><div><h5>프로젝트 테스트 현황</h5><dl><div><dt>백엔드</dt><dd>138<small>개</small></dd></div><div><dt>프론트엔드</dt><dd>207<small>개</small></dd></div></dl><p>발표 당시 프로젝트 기준</p></div><div><h5>팀 OCR 필드별 평가</h5><dl><div><dt>날짜</dt><dd>134<small>/134</small></dd></div><div><dt>금액</dt><dd>128<small>/128</small></dd></div><div><dt>거래처</dt><dd>122<small>/122</small></dd></div></dl><p>발표자료의 평가 표본 기준</p></div></div>
    </section>
  </div>`;

})();
