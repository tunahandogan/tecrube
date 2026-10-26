const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

// Fotoğraf alanları: dosya varsa gösterilir, yoksa tasarlanmış yer tutucu kalır
$$('.ph img').forEach(img => {
  const fig = img.closest('.ph');
  const loaded = () => fig.classList.add('is-loaded');
  const missing = () => fig.classList.add('is-empty');
  if (img.complete) (img.naturalWidth ? loaded : missing)();
  else { img.addEventListener('load', loaded, {once:true}); img.addEventListener('error', missing, {once:true}); }
});

// Hero başlığı: kelimeler maskenin altından sırayla yükselir
const heroTitle = $('.hero h1');
if (heroTitle && !reducedMotion){
  let i = 0;
  const walk = node => [...node.childNodes].forEach(child => {
    if (child.nodeType === Node.TEXT_NODE){
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)){ frag.append(part); return; }
        const w = document.createElement('span'); w.className = 'w';
        const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
        w.append(inner); frag.append(w);
      });
      child.replaceWith(frag);
    } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
  });
  heroTitle.setAttribute('aria-label', heroTitle.textContent.trim());
  walk(heroTitle);
  $$('.w', heroTitle).forEach(w => w.setAttribute('aria-hidden', 'true'));
  heroTitle.classList.add('is-split');
}

// Görünür olunca bir kez oynayan gruplar (liste, galeri, kayıt adımları)
const animGroups = $$('[data-anim]');
animGroups.forEach(group => [...group.children].forEach((child, i) => child.style.setProperty('--i', i)));
if ('IntersectionObserver' in window && !reducedMotion){
  const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.2, rootMargin:'0px 0px -8% 0px'});
  animGroups.forEach(g => io.observe(g));
} else animGroups.forEach(g => g.classList.add('in'));

// Kayan seçim göstergesi (hızlı seçim ve program sekmeleri)
function placeIndicator(seg, animate = true){
  const ind = $('.seg-ind', seg);
  const on = seg.querySelector('[aria-pressed="true"], [aria-selected="true"]');
  if (!ind || !on){ seg.classList.remove('has-ind'); return; }
  const snap = !animate || !seg.classList.contains('has-ind');
  if (snap) seg.classList.add('no-anim');
  ind.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
  ind.style.width = `${on.offsetWidth}px`;
  ind.style.height = `${on.offsetHeight}px`;
  if (snap){ void ind.offsetWidth; seg.classList.remove('no-anim'); }
  seg.classList.add('has-ind');
}
const placeAll = animate => $$('.seg').forEach(seg => placeIndicator(seg, animate));
placeAll(false);
document.fonts?.ready.then(() => placeAll(false));
addEventListener('resize', () => placeAll(false));

// Menüde bulunulan sayfayı işaretle
const path = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
$$('.main-nav a').forEach(a => { if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page'); });

// Header gölgesi
const header = $('.site-header');
const onScroll = () => header?.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, {passive:true}); onScroll();

// Mobil menü
const menuButton = $('.menu-button'), menu = $('#mobile-menu');
function setMenu(open){
  if (!menu) return;
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  $('.sr-only', menuButton).textContent = open ? 'Menüyü kapat' : 'Menüyü aç';
  $('use', menuButton).setAttribute('href', open ? '#i-close' : '#i-menu');
}
menuButton?.addEventListener('click', () => setMenu(menu.hidden));
$$('a', menu || document.createElement('div')).forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden){ setMenu(false); menuButton.focus(); } });
matchMedia('(min-width: 961px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

// Program durumu: hızlı seçim, sekmeler, günlük çizelge ve formdaki program alanı aynı seçimi paylaşır
const programs = {
  lgs:{option:'LGS - 8. sınıf', match:/^LGS/, detail:'<strong>LGS · 6, 7 ve 8. sınıf.</strong> Hafta içi 17.00–21.00, hafta sonu 09.00–18.00. Haftada 20 saat sınıf dersi.'},
  yks:{option:'YKS - 12. sınıf', match:/^YKS - (9|10|11|12)\./, detail:'<strong>YKS · 9–12. sınıf.</strong> Okul sonrası 17.00–21.00, kabin sistemi ve birebir özel ders.'},
  mezun:{option:'YKS - Mezun', match:/Mezun/, detail:'<strong>YKS · Mezun.</strong> Tam gün 09.00–21.00, kişiye ait kabin, koçluk ve deneme kulübü.'}
};
const programSelect = $('#f-program');
const tabs = $$('[data-program-tab]');

function selectTab(tab, focus){
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    $('#' + t.getAttribute('aria-controls')).hidden = !on;
  });
  placeIndicator(tab.parentElement);
  if (focus) tab.focus();
}

function setProgram(key, source){
  const p = programs[key]; if (!p) return;
  $$('[data-set-program]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setProgram === key)));
  $$('[data-set-program]').map(b => b.parentElement).filter((p, i, a) => a.indexOf(p) === i).forEach(seg => placeIndicator(seg));
  const detail = $('.qs-detail span'); if (detail) detail.innerHTML = p.detail;
  if (source !== 'tab'){ const tab = tabs.find(t => t.dataset.programTab === key); if (tab) selectTab(tab); }
  const timeline = $('.timeline');
  if (timeline){
    timeline.dataset.active = key;
    $$('[data-program-row]', timeline).forEach(r => r.toggleAttribute('data-match', r.dataset.programRow === key));
  }
  if (programSelect && source !== 'select' && !p.match.test(programSelect.value)){
    programSelect.value = p.option;
    programSelect.dispatchEvent(new Event('change'));
    if (source === 'switch' && !reducedMotion){ programSelect.classList.remove('flash'); void programSelect.offsetWidth; programSelect.classList.add('flash'); }
  }
}

$$('[data-set-program]').forEach(b => b.addEventListener('click', () => setProgram(b.dataset.setProgram, 'switch')));
tabs.forEach((tab, i) => {
  const pick = (t, focus) => { selectTab(t, focus); setProgram(t.dataset.programTab, 'tab'); };
  tab.addEventListener('click', () => pick(tab));
  tab.addEventListener('keydown', e => {
    const step = {ArrowRight:1, ArrowDown:1, ArrowLeft:-1, ArrowUp:-1}[e.key];
    if (step){ e.preventDefault(); pick(tabs[(i + step + tabs.length) % tabs.length], true); }
    if (e.key === 'Home'){ e.preventDefault(); pick(tabs[0], true); }
    if (e.key === 'End'){ e.preventDefault(); pick(tabs.at(-1), true); }
  });
});
programSelect?.addEventListener('change', () => {
  const key = Object.keys(programs).find(k => programs[k].match.test(programSelect.value));
  if (key) setProgram(key, 'select');
});

// Ön kayıt formu
const form = $('[data-enroll-form]');
if (form){
  const select = programSelect;
  const preset = new URLSearchParams(location.search).get('program');
  if (preset && [...select.options].some(o => o.value === preset)) select.value = preset;

  // Programlardaki "Ön kayıt" bağlantıları formu ilgili programla doldurur
  $$('a[data-program]').forEach(a => a.addEventListener('click', () => {
    select.value = a.dataset.program;
    select.dispatchEvent(new Event('change'));
    setTimeout(() => $('#f-ad', form).focus({preventScroll:true}), reducedMotion ? 0 : 500);
  }));

  const fields = {ad:$('#f-ad', form), telefon:$('#f-telefon', form), program:select, kvkk:$('#f-kvkk', form)};
  const status = $('.form-status', form);
  const submit = $('button[type="submit"]', form);

  function showError(name, message){
    const input = fields[name], error = $(`#f-${name}-error`, form);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (message){ input.setAttribute('aria-describedby', error.id); error.textContent = message; error.hidden = false; }
    else { input.removeAttribute('aria-describedby'); error.hidden = true; }
  }
  function validate(){
    const errors = {};
    if (fields.ad.value.trim().length < 3) errors.ad = 'Ad ve soyadı yazın.';
    const digits = fields.telefon.value.replace(/[^\d+]/g, '');
    if (!/^(\+?90|0)?[2-5]\d{9}$/.test(digits)) errors.telefon = 'Telefon numarasını 05xx xxx xx xx biçiminde yazın.';
    if (!fields.program.value) errors.program = 'Bir program seçin.';
    if (!fields.kvkk.checked) errors.kvkk = 'Devam etmek için aydınlatma metnini onaylayın.';
    return errors;
  }
  Object.entries(fields).forEach(([name, input]) => input.addEventListener('change', () => {
    if (input.getAttribute('aria-invalid') === 'true') showError(name, validate()[name]);
  }));

  function offerWhatsApp(){
    const note = $('#f-not', form)?.value.trim();
    const text = ['Merhaba, ön kayıt bırakmak istiyorum.', `Ad soyad: ${fields.ad.value.trim()}`, `Telefon: ${fields.telefon.value.trim()}`, `Program: ${fields.program.value}`, note && `Not: ${note}`].filter(Boolean).join('\n');
    status.classList.add('is-offline');
    status.replaceChildren(
      Object.assign(document.createElement('span'), {textContent:'Form şu an doğrudan iletilemiyor. Bilgileriniz hazır; tek dokunuşla WhatsApp\'tan gönderebilirsiniz.'}),
      Object.assign(document.createElement('a'), {className:'btn btn-wa btn-block', href:`https://wa.me/905526329128?text=${encodeURIComponent(text)}`, target:'_blank', rel:'noopener', textContent:'WhatsApp ile gönder'})
    );
    status.querySelector('a').focus();
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = ''; status.classList.remove('is-offline');
    const errors = validate();
    Object.keys(fields).forEach(name => showError(name, errors[name]));
    const first = Object.keys(fields).find(name => errors[name]);
    if (first){ fields[first].focus(); return; }

    submit.setAttribute('aria-busy', 'true'); submit.disabled = true;
    $('span', submit).textContent = 'Gönderiliyor…';
    try {
      const res = await fetch('/api/on-kayit', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ad:fields.ad.value, telefon:fields.telefon.value, program:fields.program.value, not:$('#f-not', form)?.value || '', kvkk:fields.kvkk.checked, website:$('#f-website', form).value})
      });
      // Statik barındırmada (ör. Vercel) ön kayıt sunucusu yoktur: başvuru WhatsApp'a aktarılır
      if ([404, 405, 501].includes(res.status)){ offerWhatsApp(); return; }
      const data = await res.json().catch(() => ({}));
      if (!res.ok){
        Object.entries(data.fields || {}).forEach(([name, msg]) => fields[name] && showError(name, msg));
        throw new Error(data.error || 'Form gönderilemedi.');
      }
      const success = form.nextElementSibling;
      form.hidden = true; success.hidden = false; success.focus();
    } catch (err) {
      if (err instanceof TypeError){ offerWhatsApp(); return; }
      status.textContent = `${err.message} Dilerseniz 0442 442 52 25 numarasından bize ulaşın.`;
    } finally {
      submit.removeAttribute('aria-busy'); submit.disabled = false;
      $('span', submit).textContent = 'Ön kaydımı gönder';
    }
  });
}

// Sınav geri sayımı (tarihler tahmini; HTML'deki data-countdown değeri güncellenir)
$$('[data-countdown]').forEach(el => {
  const days = Math.max(0, Math.ceil((new Date(el.dataset.countdown) - Date.now()) / 86_400_000));
  el.textContent = days.toLocaleString('tr-TR');
});

// Günlük çizelge: çubuklar görünür olunca uzar (data-anim="bars"), "şu an" çizgisi Türkiye saatine göre konumlanır
const timeline = $('.timeline');
if (timeline){
  const now = $('.tl-now', timeline);
  const place = () => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('tr-TR', {timeZone:'Europe/Istanbul', hour:'numeric', minute:'numeric', hourCycle:'h23'}).formatToParts(new Date()).map(p => [p.type, p.value]));
    const hour = Number(parts.hour) + Number(parts.minute) / 60;
    if (hour < 9 || hour > 21){ now.hidden = true; return; }
    const track = $('.tl-track', timeline).getBoundingClientRect(), box = timeline.getBoundingClientRect();
    now.style.left = `${track.left - box.left + track.width * (hour - 9) / 12}px`;
    $('span', now).textContent = `Şu an ${parts.hour}.${parts.minute}`;
    now.classList.toggle('flip', hour > 17);
    now.hidden = false;
  };
  place(); addEventListener('resize', place); setInterval(place, 60_000);
}

$$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
