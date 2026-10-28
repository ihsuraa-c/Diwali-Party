// RSVPs: add a WhatsApp number (digits, with country code, e.g. "919876543210") and/or an email.
// WhatsApp wins if both are set. Leave both empty and the page just celebrates.
const WHATSAPP = "";
const RSVP_EMAIL = "aarushi23012@iiitd.ac.in";
const PARTY = new Date("2026-11-15T18:00:00+05:30");

const $ = s => document.querySelector(s), cv = $("#fx"), cx = cv.getContext("2d");
let P = [];
function size() { const r = devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; cx.setTransform(r, 0, 0, r, 0, 0); }
size(); addEventListener("resize", size);
const cols = ["#e8c47b", "#f7e5b2", "#ff8fa3", "#ffb347", "#fff5e6"];
function burst(x, y, n = 60) { for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, s = 2 + Math.random() * 5; P.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, c: cols[i % 5], r: 1.5 + Math.random() * 2 }); } }
(function tick() { cx.clearRect(0, 0, innerWidth, innerHeight); P = P.filter(p => p.l > 0); for (const p of P) { p.x += p.vx; p.y += p.vy; p.vx *= .97; p.vy = p.vy * .97 + .07; p.l -= .014; cx.globalAlpha = Math.max(p.l, 0); cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill(); } requestAnimationFrame(tick); })();
addEventListener("pointerdown", e => burst(e.clientX, e.clientY, 50));
addEventListener("pointermove", e => { $("#glow").style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
for (let i = 0; i < 4; i++) setTimeout(() => burst(innerWidth * (.2 + Math.random() * .6), innerHeight * (.15 + Math.random() * .3), 70), 700 + i * 450);
setInterval(() => { if (!document.hidden) burst(innerWidth * Math.random(), innerHeight * (.1 + Math.random() * .4), 70); }, 6000);

let k = 0;
document.querySelectorAll("[data-split]").forEach(el => { el.innerHTML = [...el.textContent].map(c => `<span class="ch" style="--i:${k++}">${c}</span>`).join(""); });
const bl = $(".bulbs");
for (let i = 0; i < Math.round(innerWidth / 55); i++) bl.insertAdjacentHTML("beforeend", `<i style="--d:${Math.random() * 16 | 0};--t:-${(Math.random() * 3).toFixed(1)}s"></i>`);
const t = "LESSGOO ✦ SEQUINS ✦ SAME OLD SPOT ✦ NO CANCELLING ✦ ";
$("#mq").innerHTML = `<span>${t.repeat(4)}</span><span>${t.repeat(4)}</span>`;

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));
document.querySelectorAll(".tile").forEach(el => {
  el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; el.style.setProperty("--mx", x * 100 + "%"); el.style.setProperty("--my", y * 100 + "%"); el.style.setProperty("--rx", (.5 - y) * 10 + "deg"); el.style.setProperty("--ry", (x - .5) * 12 + "deg"); });
  el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
});

function count() { let s = Math.floor((PARTY - Date.now()) / 1e3); const el = $("#count"); if (s <= 0) { el.textContent = "it’s happening"; return; } el.innerHTML = `<b>${s / 86400 | 0}</b>d <b>${s % 86400 / 3600 | 0}</b>h <b>${s % 3600 / 60 | 0}</b>m <b>${s % 60}</b>s`; }
count(); setInterval(count, 1000);

let tt; function toast(m) { const el = $("#toast"); el.textContent = m; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("on"), 2600); }
$("#diya").onclick = e => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 20, 120); document.body.classList.toggle("lit"); };
$("#loc").onclick = async e => { try { await navigator.clipboard.writeText("KNG 3, 1805"); } catch {} toast("copied. no asking for the location now"); };

const no = $("#no"), words = ["nope", "too slow", "nice try", "lol", "almost", "stop", "ok fine"]; let dodges = 0, ox = 0, oy = 0;
function run(e) {
  if (dodges >= 7) return; e.preventDefault(); dodges++;
  const r = no.getBoundingClientRect(); let dx = (Math.random() - .5) * 320, dy = (Math.random() - .5) * 200;
  if (r.left + dx < 10 || r.right + dx > innerWidth - 10) dx = -dx; if (r.top + dy < 80 || r.bottom + dy > innerHeight - 10) dy = -dy;
  ox += dx; oy += dy; no.style.transform = dodges < 7 ? `translate(${ox}px,${oy}px)` : "none"; no.textContent = words[dodges - 1];
}
no.addEventListener("pointerenter", run); no.addEventListener("pointerdown", run);
function send(yes) {
  const n = $("#name"), v = n.value.trim();
  if (!v) { n.classList.add("shake"); setTimeout(() => n.classList.remove("shake"), 400); n.focus(); return toast("name first pls"); }
  const msg = yes ? "Lessgoo! Count me in" : "Can’t make it";
  if (yes) { const r = $(".yes").getBoundingClientRect(); for (let i = 0; i < 5; i++) setTimeout(() => burst(r.left + Math.random() * r.width, r.top, 90), i * 160); }
  toast(yes ? `${v}, you’re in. lessgoo` : `${v}, we’ll miss you`);
  const text = `Diwali Afterglow: ${v} says ${msg}`;
  if (WHATSAPP) setTimeout(() => open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank"), 1400);
  else if (RSVP_EMAIL) setTimeout(() => { location.href = `mailto:${RSVP_EMAIL}?subject=${encodeURIComponent("Diwali Afterglow RSVP: " + v)}&body=${encodeURIComponent(text)}`; }, 1400);
}
$("#f").onsubmit = e => { e.preventDefault(); send(true); };
no.onclick = () => { if (dodges >= 7) send(false); };
