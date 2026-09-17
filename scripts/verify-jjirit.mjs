import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = new URL('../dist/', import.meta.url);
const [html, js, serviceSvg, mlSvg, css] = await Promise.all([
  readFile(new URL('index.html', base), 'utf8'),
  readFile(new URL('app.js', base), 'utf8'),
  readFile(new URL('assets/jjirit.svg', base), 'utf8'),
  readFile(new URL('assets/jjirit-ml-process.svg', base), 'utf8'),
  readFile(new URL('style.css', base), 'utf8'),
]);

assert.match(html, /assets\/jjirit\.svg/);
assert.match(html, /assets\/jjirit-ml-process\.svg/);
assert.match(html, /데이터 분석부터 입력 피처·회귀 모델 설계까지/);
assert.match(html, /예측 대상/);
assert.match(html, /동일 조건의 성능 개선으로 단정하지 않습니다/);
assert.match(js, /querySelectorAll\(':scope > \.project-image'\)/);
assert.match(js, /v=3/);
assert.match(serviceSvg, /Frontend/);
assert.match(serviceSvg, /FastAPI/);
assert.match(serviceSvg, /Azure ML/);
assert.match(serviceSvg, /Bill Logic/);
assert.match(serviceSvg, /Report/);
assert.match(serviceSvg, /translate\(40 174\)/);
assert.match(serviceSvg, /translate\(40 370\)/);
assert.match(serviceSvg, /width="1020" height="540" viewBox="0 0 1020 540"/);
assert.match(mlSvg, /데이터 이해/);
assert.match(mlSvg, /피처 엔지니어링/);
assert.match(mlSvg, /Boosted Decision Tree/);
assert.match(mlSvg, /500kWh/);
assert.match(mlSvg, /translate\(40 174\)/);
assert.match(mlSvg, /width="1020" height="620" viewBox="0 0 1020 620"/);
assert.match(css, /architecture-stack/);

console.log('PASS: 찌릿 구조·설계 콘텐츠와 연결을 확인했습니다.');
