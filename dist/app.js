const items = {
 jangbumi: ['장부미', 'PaddleOCR 영수증 인식과 Azure 배포·운영을 연결했습니다.'],
 adclear: ['AD-CLEAR', 'Azure AI Search의 근거 검색을 구축하고, AI 판정과 출처를 데이터로 연결했습니다.'],
 jjirit: ['찌릿', '계절·불쾌지수 피처와 회귀 모델을 설계하고, 오차와 사용자 범위를 함께 평가했습니다.']
};
const buttons = [...document.querySelectorAll('.file')];
function select(key) {
 if (!items[key]) return;
 buttons.forEach(b => {const active = b.dataset.project === key; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active));});
 document.getElementById('screen-title').textContent = items[key][0];
 document.getElementById('screen-description').textContent = items[key][1];
 const link = document.getElementById('open-project'); link.href = '#' + (key === 'adclear' ? 'project-rag' : key); link.setAttribute('aria-label',items[key][0]+' 프로젝트로 이동');
}
buttons.forEach((b,i) => {
 b.addEventListener('click',()=>select(b.dataset.project));
 b.addEventListener('keydown', e=>{
 if (!['ArrowDown','ArrowUp','Home','End'].includes(e.key)) return;
 e.preventDefault();
 const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length-1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
 buttons[next].focus(); select(buttons[next].dataset.project);
 });
});

const projectMedia = {
  jangbumi: { name: '장부미', duration: '02:25', ratio: 'portrait' },
  adclear: { name: 'AD-CLEAR', duration: '09:29', ratio: 'landscape' },
  jjirit: { name: '찌릿', duration: '01:46', ratio: 'portrait' }
};

function createProjectMedia(article) {
  const key = article.dataset.projectKey || article.id;
  const media = projectMedia[key];
  const architecture = [...article.querySelectorAll(':scope > .project-image')];
  if (!media || architecture.length === 0) return;
  if (key === 'jjirit') {
    architecture.forEach(item => {
      const image = item.querySelector('img');
      item.href = item.href.replace(/v=\d+/, 'v=3');
      image.src = image.src.replace(/v=\d+/, 'v=3');
      image.setAttribute('width', '1020');
    });
  }

  const shell = document.createElement('div');
  shell.className = 'project-media';
  shell.innerHTML = `
    <div class="media-tabs" role="tablist" aria-label="${media.name} 미디어 선택">
      <button type="button" role="tab" id="${key}-demo-tab" aria-controls="${key}-demo" aria-selected="true" data-media="demo">서비스 시연</button>
      <button type="button" role="tab" id="${key}-architecture-tab" aria-controls="${key}-architecture" aria-selected="false" tabindex="-1" data-media="architecture">구조 · 설계</button>
    </div>
    <div class="media-panel demo-panel ${media.ratio}" role="tabpanel" id="${key}-demo" aria-labelledby="${key}-demo-tab">
      <div class="video-frame">
        <video controls preload="none" muted playsinline poster="assets/${key}-poster.jpg" aria-label="${media.name} 팀 프로젝트 서비스 시연">
          <source src="assets/${key}-web.mp4" type="video/mp4">
          <a href="assets/${key}-web.mp4">영상 파일 열기</a>
        </video>
        <button type="button" class="video-start" aria-label="${media.name} 시연 영상 재생"><span aria-hidden="true">▷</span><small>시연 재생</small></button>
      </div>
      <div class="video-caption"><span>${media.name} / 실제 서비스 시연</span><span>${media.duration} · 팀 프로젝트</span></div>
    </div>
    <div class="media-panel${['jjirit', 'adclear'].includes(key) ? ' architecture-stack' : ''}" role="tabpanel" id="${key}-architecture" aria-labelledby="${key}-architecture-tab" hidden></div>`;

  architecture[0].replaceWith(shell);
  shell.querySelector(`#${key}-architecture`).append(...architecture);

  const duplicateVideo = article.querySelector('details video');
  if (duplicateVideo) duplicateVideo.closest('.detail-body')?.remove();

  const tabs = [...shell.querySelectorAll('[role="tab"]')];
  const video = shell.querySelector('video');
  const start = shell.querySelector('.video-start');
  const activate = tab => {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (tab.dataset.media !== 'demo') video.pause();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
        (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      activate(tabs[next]);
    });
  });

  start.addEventListener('click', async () => {
    try { await video.play(); } finally { start.hidden = true; }
  });
  video.addEventListener('play', () => {
    start.hidden = true;
    document.querySelectorAll('.project-media video').forEach(other => {
      if (other !== video) other.pause();
    });
  });
}

function enhanceJjiritDetails() {
  const details = document.querySelector('#jjirit details');
  if (!details) return;

  details.innerHTML = `
    <summary>상세 보기 <span>↗</span></summary>
    <div class="jjirit-case-study">
      <header class="case-intro">
        <p class="case-kicker">MY ROLE / MACHINE LEARNING</p>
        <h4>고객번호 없이도 예측할 수 있는 입력과 모델을 설계했습니다.</h4>
        <p>월별 데이터를 분석해 입력값을 설계하고, 월의 sin·cos 변환과 불쾌지수 THI로 피처를 구성했습니다. Boosted Decision Tree Regression을 선택한 뒤 MAE·RMSE·R²와 서비스 대상 범위를 함께 검토했습니다.</p>
        <div class="role-strip" aria-label="담당 범위"><span>데이터 분석</span><span>입력 피처 설계</span><span>알고리즘 선정</span><span>모델 평가</span></div>
      </header>

      <section class="case-step has-evidence">
        <div class="case-copy"><span class="step-index">01 / DATA LIMIT</span><h4>개인화 정보가 없는 데이터에서 기준점을 찾았습니다.</h4><p>원본 데이터는 월별 최종 사용량 중심이라 에어컨, 집 구조, 생활패턴을 직접 알 수 없었습니다. 월별 평균과 중앙값을 비교해 냉난방 영향이 적은 5월을 기준 달로 정하고, 이상치의 영향을 덜 받는 중앙값 115kWh를 기저 사용량의 대리값으로 선택했습니다.</p><div class="decision-note"><b>판단</b><span>5월 평균 139.7kWh보다 중앙값 115kWh가 극단값의 영향을 덜 받는 기준이라고 보았습니다.</span></div></div>
        <a class="evidence-image" href="assets/jjirit-baseline.png" target="_blank" rel="noopener"><img src="assets/jjirit-baseline.png" alt="월별 평균과 중앙값을 비교하고 5월 중앙값 115kWh를 표시한 분석 그래프" loading="lazy"><span>프로젝트 분석 자료 · 원본 크게 보기 ↗</span></a>
      </section>

      <section class="case-step formula-step">
        <div class="case-copy"><span class="step-index">02 / INPUT DESIGN</span><h4>사용시간을 모델이 사용할 수 있는 전력량으로 바꿨습니다.</h4><p>사용자가 알고 있는 하루 에어컨 사용시간을 받아, 모델의 전년 사용량 입력을 대신할 추정값으로 변환했습니다. 이 값은 실측치가 아니라 고객번호 없이 예측하기 위한 MVP의 설계 가정입니다.</p></div>
        <div class="formula-card" aria-label="전년 사용량 추정식"><p><span>추정 입력값</span><strong>115 + 사용시간 × 0.65 × 30 × 0.60</strong><em>kWh</em></p><dl><div><dt>115</dt><dd>5월 중앙값</dd></div><div><dt>0.65kW</dt><dd>에어컨 소비전력 가정</dd></div><div><dt>30일</dt><dd>월 단위 환산</dd></div><div><dt>0.60</dt><dd>가동 계수</dd></div></dl></div>
      </section>

      <section class="case-step feature-step">
        <div class="case-copy"><span class="step-index">03 / FEATURE ENGINEERING</span><h4>계절의 순환성과 온·습도 관계를 피처로 표현했습니다.</h4><p>12월과 1월이 이어지는 계절 특성을 보존하기 위해 월을 sin·cos로 변환했습니다. 기온과 습도를 결합한 불쾌지수 THI를 추가해 냉방 수요와 관련된 정보를 모델에 전달했습니다.</p></div>
        <div class="feature-map"><div><span>MODEL INPUT · 7</span><code>month_sin</code><code>month_cos</code><code>prev_year_usage</code><code>avg_temperature</code><code>avg_humidity</code><code>total_rainfall</code><code>thi</code></div><b aria-hidden="true">→</b><div class="target"><span>PREDICTION TARGET</span><code>current_usage</code><small>당월 전력 사용량</small></div></div>
        <a class="evidence-image wide" href="assets/jjirit-features.png" target="_blank" rel="noopener"><img src="assets/jjirit-features.png" alt="전처리 후 7개 입력 피처와 current_usage 예측 대상이 포함된 데이터 화면" loading="lazy"><span>전처리된 데이터셋 · 원본 크게 보기 ↗</span></a>
      </section>

      <section class="case-step has-evidence model-step">
        <div class="case-copy"><span class="step-index">04 / MODEL CHOICE</span><h4>조건이 겹치며 달라지는 사용량을 표현할 수 있는 회귀 모델을 골랐습니다.</h4><p>전력 사용량은 기온이 오를 때 항상 같은 폭으로 증가하지 않습니다. 온도와 습도 같은 조건이 함께 작용하는 비선형 관계를 다루기 위해 Azure ML Designer의 Boosted Decision Tree Regression을 선택했습니다.</p><p class="source-note">아래 자료는 알고리즘의 차이를 설명하기 위한 개념도이며, 동일 조건의 모델 성능 비교 결과는 아닙니다.</p></div>
        <a class="evidence-image" href="assets/jjirit-model-choice.png" target="_blank" rel="noopener"><img src="assets/jjirit-model-choice.png" alt="선형 회귀와 Boosted Decision Tree Regression의 가정 차이를 설명하는 개념도" loading="lazy"><span>알고리즘 선정 설명 자료 · 원본 크게 보기 ↗</span></a>
      </section>

      <section class="case-step evaluation-step">
        <div class="case-copy"><span class="step-index">05 / EVALUATION</span><h4>오차뿐 아니라 서비스가 포함해야 할 사용자 범위도 확인했습니다.</h4><p>300kWh 초과 데이터를 제외하면 MAE와 RMSE는 낮아졌지만, 전기를 많이 쓰는 1인 가구가 학습 대상에서 빠집니다. 해당 사용자도 서비스 대상이라고 판단해 상한을 500kWh까지 확대하고 세 지표를 함께 검토했습니다.</p></div>
        <div class="range-decision"><span>팀원 모델<strong>300<small>kWh</small></strong>초과 데이터 제외</span><b aria-hidden="true">→</b><span>최종 조정<strong>500<small>kWh</small></strong>고사용량 가구 포함</span></div>
        <div class="table-scroll"><table><caption>최종 발표자료의 단계별 평가 결과</caption><thead><tr><th>단계</th><th>MAE</th><th>RMSE</th><th>R²</th></tr></thead><tbody><tr><th>THI 포함 기준 모델</th><td>31.386</td><td>45.283</td><td>0.7130</td></tr><tr><th>300kWh 초과 제외 · 팀원</th><td>30.385</td><td>42.657</td><td>0.7086</td></tr><tr class="selected-result"><th>500kWh까지 확대 · 본인</th><td>32.796</td><td>48.277</td><td>0.7424</td></tr></tbody></table></div>
        <p class="metric-note">각 단계는 학습 데이터 범위가 다르므로 동일 조건의 성능 개선으로 단정하지 않습니다. 최종 R²는 0.7424이며, 500kWh 구간의 정확도를 별도로 입증한 수치는 아닙니다.</p>
      </section>
    </div>`;
}

function enhanceAdclearDetails() {
  const details = document.querySelector('#project-rag details');
  if (!details) return;

  details.innerHTML = `
    <summary>상세 보기 <span>↗</span></summary>
    <div class="adclear-case-study">
      <header class="case-intro">
        <p class="case-kicker">MY ROLE / BACKEND DATA &amp; RAG</p>
        <h4>광고 문구에서 법적 근거를 찾는 RAG 데이터 기반을 구축했습니다.</h4>
        <p>데이터 정규화와 Azure AI Search 인덱싱·RAG 배포에 공동 참여하고, 중첩 JSON으로 발생한 검색 문제를 해결했습니다. 검색한 근거와 AI 판정을 추적할 수 있도록 15개 테이블 설계·트랜잭션 저장·마스터 동기화도 맡았습니다.</p>
        <div class="role-strip" aria-label="담당 범위"><span>데이터 정규화 · 공동</span><span>RAG 배포 · 공동</span><span>DB 설계·저장 구현</span><span>마스터 동기화</span></div>
        <div class="tags"><span>PostgreSQL</span><span>asyncpg</span><span>FastAPI</span><span>Pydantic</span><span>Azure Blob Storage</span><span>Azure AI Search</span></div>
      </header>

      <section id="adclear-normalize" class="case-step ad-section">
        <div class="case-copy"><span class="step-index">01 / DATA NORMALIZATION</span><h4>JSON 데이터 정규화</h4><p>법령·사례·판례 데이터를 팀 공용 스키마에 맞춰 정규화했습니다. 중첩 JSON을 평면 레코드로 바꾸고, 사례의 법령 참조 배열과 판례의 사건번호·청크 ID를 구분해 검색 결과가 원문으로 연결되도록 정리했습니다.</p></div>
        <ol class="read-flow"><li><span class="flow-number">01</span><strong>중첩 JSON</strong><small>여러 층에 나뉜 본문과 참조</small></li><li><span class="flow-number">02</span><strong>평면 레코드</strong><small>본문 · 식별자 · 원문 참조</small></li><li><span class="flow-number">03</span><strong>검색용 데이터</strong><small>법령 · 사례 · 판례</small></li></ol>
      </section>

      <section id="adclear-rag" class="case-step ad-section">
        <div class="case-copy"><span class="step-index">02 / RAG DEPLOYMENT</span><h4>Azure AI Search 인덱싱·RAG 배포</h4><p>법령·사례·판례 인덱스 구성과 인덱싱, RAG 배포에 공동 참여했습니다. 정규화한 본문과 벡터 필드를 연결하고 실제 광고 문구로 관련 근거가 검색되는지 확인했습니다.</p><p>팀 공용 스키마는 검색 본문 <code>text</code>를 <code>text-embedding-3-large</code>로 변환해 3,072차원 <code>content_vector</code>에 담습니다. 텍스트는 한국어 분석기 <code>ko.lucene</code>로 검색하며, 팀 검색 설계는 BM25와 벡터 검색을 함께 사용해 단어 일치와 의미 유사성을 보완합니다.</p></div>
        <ol class="read-flow"><li><span class="flow-number">01</span><strong>정규화 JSON</strong><small>검색할 본문과 참조 ID</small></li><li><span class="flow-number">02</span><strong>3,072차원 임베딩</strong><small>text-embedding-3-large</small></li><li><span class="flow-number">03</span><strong>키워드 + 벡터 검색</strong><small>Azure AI Search · 관련 근거 반환</small></li></ol>
        <div class="decision-note wide"><b>검색 단위</b><span>법령·사례·판례는 근거 종류로 구분합니다. 공용 스키마는 식품표시광고법 제8조를 ‘호’ 단위로 나누어 ‘질병 예방·치료’, ‘의약품 오인’ 같은 규칙을 개별 근거로 찾도록 정리했습니다. 사례에는 여러 법령을 연결할 수 있는 law_refs 배열을 둡니다.</span></div>
      </section>

      <section id="adclear-search-fix" class="case-step ad-section">
        <div class="case-copy"><span class="step-index">03 / SEARCH TROUBLESHOOTING</span><h4>중첩 JSON으로 발생한 청킹·검색 문제 해결</h4><p>인덱싱은 완료됐지만 광고 문구에 맞는 법령이 검색되지 않았습니다. Azure 설정과 청킹 결과를 단계적으로 확인해 당시 마법사의 처리 방식과 중첩 JSON 구조가 맞지 않는 문제를 찾았습니다. 데이터를 평탄화한 뒤 같은 문구로 재검색해 관련 법령이 반환되는 것을 확인했습니다.</p></div>
        <ol class="ad-troubleshoot"><li><i aria-hidden="true">!</i><b>검색 불일치</b><span>인덱싱 완료<br>근거는 부정확</span></li><li><i aria-hidden="true">⌕</i><b>원인 추적</b><span>Azure 설정<br>청킹 결과 점검</span></li><li><i aria-hidden="true">{ }</i><b>구조 수정</b><span>중첩 JSON<br>평면 레코드</span></li><li><i aria-hidden="true">✓</i><b>재검색 확인</b><span>같은 광고 문구로<br>관련 법령 검색</span></li></ol>
        <p class="source-note wide">본인 회고 기반 해결 과정입니다.</p>
      </section>

      <section id="adclear-model" class="case-step ad-section">
        <div class="case-copy"><span class="step-index">04 / DATA MODEL</span><h4>PostgreSQL 데이터 모델링 · 15개 테이블 설계</h4><p>검사 원문, 개별 주장, 판정, 인용 근거와 대체문구를 관계로 연결했습니다. 어떤 주장에 어떤 판정과 근거가 붙었는지 조회할 수 있도록 설계했고, 마스터 데이터는 판정 기록과 구분해 관리했습니다.</p><p>발표자료 기준 제 설계 범위는 런타임 5개, 유저·이력 4개, 마스터 3개, 품질 2개, 대시보드 1개입니다.</p></div>
        <div class="read-model" aria-label="판정 기록의 핵심 데이터 관계">
<p class="diagram-label">판정 기록의 관계</p>
<div class="model-spine"><div><strong>검사</strong><code>screening</code><small>사용자가 제출한 광고</small></div><span class="relation-label">하나의 검사에 여러 주장</span><div><strong>광고 속 주장</strong><code>claim</code><small>검사할 개별 문장</small></div><span class="relation-label">주장별 판정 연결</span><div><strong>판정</strong><code>judgment</code><small>통과 · 주의 · 위반</small></div></div>
<div class="model-children"><div><strong>인용 근거</strong><code>judgment_evidence</code><small>판정에 사용한 법령·사례·판례 참조</small></div><div><strong>대체문구</strong><code>suggestion</code><small>해당 판정에 연결된 수정 제안</small></div></div>
<div class="master-strip"><strong>근거 원문 저장소</strong><span>법령 · 사례 · 판례</span><small>판정 기록과 분리해 관리 · 인용 근거에서 유형과 ID로 참조</small></div></div>
<div class="model-groups"><details><summary>사용자·이력</summary><p>사용자, 로그인 정보, 세션과 검사 이력을 관리합니다.</p></details><details><summary>판정 기록</summary><p>검사·주장·판정에 인용 근거와 대체문구를 연결합니다.</p></details><details><summary>근거 원문</summary><p>법령·사례·판례 마스터를 원문 식별자로 관리하고 갱신합니다.</p></details></div>
      </section>

      <section id="adclear-persist" class="case-step ad-section">
        <div class="case-copy"><span class="step-index">05 / ASYNCPG TRANSACTION</span><h4>asyncpg 트랜잭션 기반 판정 결과 저장</h4><p>AI 판정 결과의 형식과 참조 관계를 검사한 뒤 검사·주장·판정·근거 기록을 하나의 트랜잭션으로 저장했습니다. 모두 성공하면 확정하고, 중간 SQL 오류가 발생하면 이번 트랜잭션에서 쓴 내용을 모두 취소하도록 구성했습니다.</p></div>
        <div class="read-transaction">
<div class="tx-intake"><strong>AI 판정 결과 수신</strong><small>형식과 참조 관계 검사</small></div>
<div class="validation-outcomes"><div><b>검증 실패</b><span>저장 시작 전 중단 · 오류 전달</span></div><div><b>검증 통과</b><span>아래 트랜잭션 시작</span></div></div>
<div class="transaction-scope"><p class="diagram-label">하나의 DB 트랜잭션</p><ol class="read-flow"><li><span class="flow-number">01</span><strong>검사 기록</strong><small>screening</small></li><li><span class="flow-number">02</span><strong>개별 주장</strong><small>claim</small></li><li><span class="flow-number">03</span><strong>판정·근거</strong><small>judgment · evidence</small></li></ol><div class="transaction-outcomes"><div><b>모두 성공 → COMMIT</b><span>이번 저장 확정</span></div><div><b>중간 SQL 오류 → ROLLBACK</b><span>이 묶음에서 쓴 변경을 모두 취소</span></div></div></div></div>
      </section>

      <section id="adclear-sync" class="case-step ad-section">
        <div class="case-copy"><span class="step-index">06 / MASTER SYNC</span><h4>Pydantic 검증·UPSERT 기반 마스터 동기화 자동화</h4><p>Blob Storage의 법령·사례·판례 JSON을 내려받아 필수값과 자료형, 중복 ID를 검증하고 PostgreSQL 마스터에 UPSERT하는 절차를 코드로 구성했습니다. 원본이 바뀌면 같은 절차를 다시 실행해 신규 데이터는 추가하고 기존 ID의 내용은 갱신할 수 있습니다.</p></div>
        <div class="read-sync"><p class="diagram-label">원본 변경 후 동기화 실행</p><ol class="read-flow"><li><span class="flow-number">01</span><strong>Blob JSON</strong><small>공통 원본 다운로드</small></li><li><span class="flow-number">02</span><strong>Pydantic 검증</strong><small>필수값 · 자료형 · 중복 ID</small></li><li><span class="flow-number">03</span><strong>UPSERT</strong><small>새 ID는 추가 · 기존 ID는 갱신</small></li><li><span class="flow-number">04</span><strong>PostgreSQL</strong><small>마스터 데이터 반영</small></li></ol><p class="diagram-note">검증·갱신 절차를 코드로 자동화했습니다.</p></div>
        <aside class="azure-note"><span>AZURE TROUBLESHOOTING</span><h5>Azure Blob 403 접근 오류 점검</h5><p>Owner 역할은 리소스 관리 권한이므로 실제 파일 읽기 권한과 구분했습니다. 요청 인증 방식, Blob 데이터 접근 권한, SAS 범위와 유효기간을 함께 점검했습니다.</p></aside>
      </section>
      <p class="case-disclosure">팀 서비스의 전체 구조와 실제 산출물을 바탕으로, 김예찬의 데이터 계층 담당과 데이터 정규화·RAG 배포 공동 참여를 정리했습니다.</p>
    </div>`;
}

document.querySelectorAll('article.project').forEach(createProjectMedia);
enhanceAdclearDetails();
enhanceJjiritDetails();

function refineAdclearArchitecture() {
 const panel = document.getElementById('adclear-architecture');
 if (!panel) return;
 panel.innerHTML = `<div class="read-architecture"><p class="diagram-label">팀 서비스 구조</p><ol class="read-flow"><li><span class="flow-number">01</span><strong>광고 입력</strong><small>문구 · 이미지 · URL</small></li><li><span class="flow-number">02</span><strong>FastAPI</strong><small>입력 검증 · 요청 분기</small></li><li><span class="flow-number">03</span><strong>AI 판정</strong><small>근거 검색 · 판정</small></li><li><span class="flow-number">04</span><strong>결과 표시</strong><small>신호등 · 근거 · 제안</small></li></ol><div class="architecture-support"><div><b>Azure AI Search</b><span>AI 판정에 법령·사례·판례 근거 공급</span></div><div><b>PostgreSQL</b><span>검증한 판정 결과와 인용 근거 저장</span></div></div></div><div class="read-contributions"><div><span>공동 참여</span><strong>데이터 정규화</strong><p>평면 JSON · 원문 참조</p></div><div><span>공동 참여</span><strong>RAG 배포</strong><p>인덱스 구성 · 인덱싱</p></div><div><span>주요 담당</span><strong>백엔드 데이터 계층</strong><p>DB 설계 · 저장 · 동기화</p></div></div>`;
}
refineAdclearArchitecture();
