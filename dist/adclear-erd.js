const BASE_WIDTH = 1500;
const BASE_HEIGHT = 860;
const viewport = document.getElementById('viewport');
const image = document.getElementById('erd');
const output = document.getElementById('zoom-value');
let scale = 1;

function setScale(nextScale, min = .5) {
  const oldWidth = BASE_WIDTH * scale;
  const oldHeight = BASE_HEIGHT * scale;
  const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / oldWidth;
  const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / oldHeight;
  scale = Math.min(2.5, Math.max(min, nextScale));
  image.width = Math.round(BASE_WIDTH * scale);
  image.height = Math.round(BASE_HEIGHT * scale);
  output.value = `${Math.round(scale * 100)}%`;
  requestAnimationFrame(() => {
    viewport.scrollLeft = centerX * image.width - viewport.clientWidth / 2;
    viewport.scrollTop = centerY * image.height - viewport.clientHeight / 2;
  });
}

function fitToWidth() {
  const fitted = Math.min(1, (viewport.clientWidth - 24) / BASE_WIDTH);
  setScale(fitted, .15);
}

document.getElementById('zoom-out').addEventListener('click', () => {
  if (scale > .5) setScale(scale - .25);
});
document.getElementById('zoom-in').addEventListener('click', () => setScale(Math.ceil((scale * 100 + 1) / 25) * .25));
document.getElementById('fit').addEventListener('click', fitToWidth);
window.addEventListener('resize', fitToWidth);
image.addEventListener('load', fitToWidth);

if (image.complete) fitToWidth();
