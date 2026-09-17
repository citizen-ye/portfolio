import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const [html, app, css] = await Promise.all([
  readFile(new URL('dist/index.html', root), 'utf8'),
  readFile(new URL('dist/app.js', root), 'utf8'),
  readFile(new URL('dist/style.css', root), 'utf8'),
]);

for (const asset of ['adclear.svg', 'adclear-data-layer.svg', 'adclear-source-normalization.svg', 'adclear-source-search.svg', 'adclear-erd-core.svg', 'adclear-source-erd.svg', 'adclear-master-sync.png']) {
  const info = await stat(new URL(`dist/assets/${asset}`, root));
  assert.ok(info.size > 1000, `${asset} must contain a real visual asset`);
}

assert.match(html, /id="adclear"[\s\S]*adclear-data-layer\.svg/);
assert.match(app, /function enhanceAdclearDetails\(\)/);
assert.match(app, /class="adclear-case-study"/);
for (const id of ['adclear-normalize', 'adclear-rag', 'adclear-search-fix', 'adclear-model', 'adclear-persist', 'adclear-sync']) {
  assert.equal((app.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1, `${id} must exist once`);
}
assert.match(app, /데이터 정규화 · 공동/);
assert.match(app, /RAG 배포 · 공동/);
assert.doesNotMatch(app, /adclear-master-sync\.png/);
assert.doesNotMatch(app, /adclear-erd\.html/);
assert.match(app, /class="read-transaction"/);
assert.match(app, /class="read-sync"/);
assert.doesNotMatch(app, /적재 성공과 유효한 검색/);
assert.doesNotMatch(app, /응답과 검색, 저장을 각각 확인/);
assert.match(app, /class="read-model"/);
assert.doesNotMatch(app, /KNOWN LIMIT|case-limit/);
assert.match(css, /\.adclear-case-study/);
assert.match(css, /\.adclear-case-study \.wide\{grid-column:1\/-1/);
assert.match(css, /\.architecture-stack \.project-image\{max-height:none/);
assert.match(html, /style\.css\?v=[a-z0-9-]+/);

for (const file of ['dist/adclear-erd.html', 'dist/adclear-erd.css', 'dist/adclear-erd.js']) {
  const info = await stat(new URL(file, root));
  assert.ok(info.size > 500, `${file} must contain the ERD viewer`);
}

console.log('PASS: AD-CLEAR 구조·설계와 상세보기 구성을 확인했습니다.');
