/* Shared project navigation, disclosure and reading position. */
(() => {
  const work = document.getElementById('work');
  const projects = [...work.querySelectorAll('article.project')];
  const names = ['장부미', 'AD-CLEAR', '찌릿'];
  const nav = document.createElement('nav');
  nav.className = 'project-navigation';
  nav.setAttribute('aria-label', '프로젝트 탐색');
  nav.innerHTML = '<span>PROJECTS</span>' + projects.map((p,i)=>`<a href="#${p.id}"><small>0${i+1}</small> ${names[i]}</a>`).join('');
  work.insertBefore(nav, projects[0]);

  projects.forEach((p,i) => {
    const header = document.createElement('header');
    header.className = 'project-header';
    header.append(p.querySelector(':scope > .project-meta'),p.querySelector(':scope > .project-grid'));
    p.prepend(header);
    p.querySelector('h3').id = `${p.id}-title`;
    p.setAttribute('aria-labelledby',`${p.id}-title`);
    const detail = p.querySelector(':scope > details');
    const summary = detail.querySelector(':scope > summary');
    summary.innerHTML = `${names[i]} 상세 보기 <span class="disclosure-mark" aria-hidden="true"></span>`;
    const close = document.createElement('button');
    close.type='button';close.className='close-project-detail';close.textContent='상세 내용 접기 ↑';
    close.addEventListener('click',()=>{detail.open=false;summary.focus({preventScroll:true});summary.scrollIntoView({block:'start',behavior:'instant'});history.replaceState(null,'',`#${p.id}`);});
    detail.append(close);
    detail.addEventListener('toggle',schedule);
  });

  // Preserve the two JJIRIT diagrams' content, with native readable text.
  const jp=document.getElementById('jjirit-architecture');
  const card=(title,body,note='')=>`<li><strong>${title}</strong><p>${body}</p>${note?`<small>${note}</small>`:''}</li>`;
  jp.innerHTML=`<section class="shared-diagram"><p class="diagram-eyebrow">01 / 팀 서비스 전체 구조</p><h4>사용자 입력이 예측 리포트로 돌아오는 흐름</h4><p>김예찬은 Machine Learning 영역을 담당했습니다.</p><ol class="shared-diagram-flow">${card('Frontend','에어컨 유무<br>하루 사용시간')}${card('FastAPI','입력 검증<br>피처 변환')}${card('Azure ML','월 사용량<br>kWh 예측')}${card('Bill Logic','한전 요금식<br>요금 범위 변환')}${card('Report','요금 범위<br>비교 리포트')}</ol><div class="shared-diagram-notes"><div><b>데이터</b><span>에코마일리지 · 날씨 · 한전 요금표</span></div><div><b>배포</b><span>Cloudflare Pages · Azure App Service</span></div><div><b>원칙</b><span>개인정보 최소 수집 · 예측 범위와 한계 고지</span></div></div></section>
  <section class="shared-diagram contribution-diagram"><p class="diagram-eyebrow">02 / 김예찬 · Machine Learning 기여</p><h4>데이터의 제약을 서비스 입력과 모델 설계로 연결했습니다</h4><p>데이터 분석부터 피처 구성, 알고리즘 선택, 서비스 대상 조정까지 맡았습니다.</p><ol class="shared-diagram-flow">${card('데이터 이해','월 사용량에는 가전·집 구조·생활패턴 정보가 없음','먼저 한계를 정의')}${card('입력 설계','5월 중앙값 115kWh + 에어컨 사용시간','115 + 시간 × 0.65 × 30일 × 0.60<br>전년 사용량 입력 대리값')}${card('피처 엔지니어링','month_sin · month_cos<br>기온 · 습도 · 강수량<br>불쾌지수 THI','계절 순환성과 온·습도 관계 반영')}${card('알고리즘 선정','Boosted Decision Tree Regression','온도·습도 조건이 겹치는 비선형 구간 포착')}${card('평가·범위 조정','MAE · RMSE · R²<br>세 지표 함께 검토','300 → 500kWh<br>고사용량 1인 가구도 서비스 대상에 포함')}</ol><p class="shared-diagram-result"><b>최종 R² 0.7424</b><span>데이터 범위가 달라 MAE·RMSE의 증감을 같은 조건의 성능 비교로 단정하지 않습니다.</span></p></section>`;

  let pending=false;
  function update(){
    pending=false;
    const threshold=nav.getBoundingClientRect().height+24;
    let current=projects[0];
    for(const p of projects) if(p.getBoundingClientRect().top<=threshold) current=p;
    nav.querySelectorAll('a').forEach(a=>{if(a.hash===`#${current.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  function reveal(hash,focus=false){
    let target;
    try{target=document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return;}
    if(!target)return;
    const detail=target.closest('article.project > details');
    if(detail)detail.open=true;
    requestAnimationFrame(()=>{
      target.scrollIntoView({block:'start',behavior:focus&&!reduced()?'smooth':'instant'});
      if(focus){if(!target.hasAttribute('tabindex'))target.tabIndex=-1;target.focus({preventScroll:true});}
      schedule();
    });
  }
  // Capture project-internal links so individual renderers cannot compete on scrolling.
  work.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');if(!link)return;
    const hash=link.getAttribute('href');if(!document.getElementById(hash.slice(1)))return;
    event.preventDefault();event.stopPropagation();
    if(location.hash!==hash)history.pushState(null,'',hash);
    reveal(hash,true);
  },true);
  addEventListener('hashchange',()=>reveal(location.hash));
  addEventListener('popstate',()=>reveal(location.hash));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  new ResizeObserver(schedule).observe(work);
  update();
  if(location.hash)reveal(location.hash);
  document.fonts.ready.then(()=>{if(location.hash)reveal(location.hash);});
})();
