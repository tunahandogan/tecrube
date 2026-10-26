# Tecrübe Kurs Merkezi

Erzurum Yakutiye'deki Tecrübe Kurs Merkezi için LGS (6, 7, 8. sınıf) ve YKS (9–12. sınıf, mezun) hazırlık sitesi, ön kayıt formu ve başvuru yönetim paneli.

## Çalıştırma

Node.js 20+ yeterli; bağımlılık kurulumu gerekmez.

```
set ADMIN_PASSWORD=guclu-bir-sifre   (PowerShell: $env:ADMIN_PASSWORD='guclu-bir-sifre')
npm start
```

- Site: http://localhost:4173
- Yönetim paneli: http://localhost:4173/yonetim (şifre: `ADMIN_PASSWORD`; tanımlı değilse sunucu her açılışta rastgele bir şifre üretip konsola yazar)

## Sayfalar

| Adres | İçerik |
|---|---|
| `/` | Ana sayfa: hero + ön kayıt formu, sınav geri sayımı, program sekmeleri, günlük çizelge, hizmetler, kurucu sözü, kayıt adımları, SSS |
| `/lgs` | LGS programı, haftalık çizelge |
| `/yks` | YKS programı (mezun ve 9–12), kabin sistemi |
| `/on-kayit` | Ön kayıt formu (`?program=YKS%20-%20Mezun` ile ön seçim) |
| `/kvkk` | Aydınlatma metni (taslak, hukuki kontrol gerekir) |
| `/yonetim` | Başvuru listesi, durum takibi, CSV dışa aktarma |

Ortak header, footer, form ve `<head>` parçaları `public/_partials/` altında; sunucu ve `npm run build` bunları `<!-- @include ad -->` satırlarının yerine yerleştirir.

## Ön kayıt API

- `POST /api/on-kayit`: `{ad, telefon, program, not, kvkk}`. Sunucu doğrulaması, bal küpü alanı, IP başına 10 dakikada 5 başvuru sınırı.
- `GET /api/basvurular`, `PATCH /api/basvurular/:id` (`{durum}`), `DELETE /api/basvurular/:id`: `X-Admin-Password` başlığı ister.
- Kayıtlar `data/basvurular.json` dosyasında tutulur (git dışı). Sunucu taşınırken bu dosya yedeklenmeli.

## Fotoğraflar

Fotoğraf alanları `public/images/` altındaki dosyalara bağlıdır (`hero.jpg`, `bina.jpg`, `sinif.jpg`, `kabin-salonu.jpg`, `kutuphane.jpg`, `deneme.jpg`, `kurucu.jpg`). Dosya yoksa sunucu `<img>` etiketini hiç basmaz ve alanda marka renklerinde "Fotoğraf eklenecek" yer tutucusu görünür; dosya konunca bir sonraki sayfa açılışında fotoğraf gelir (`dist` için `npm run build` tekrar çalıştırılmalı). Kurumdan istenecek liste ve çekim önerileri: `docs/fotograflar.md`. Hazırlama: `python scripts/fotograf.py <klasör>` (Pillow gerekir). Siteyi fotoğraflar tamamlanmadan velilere açacaksanız `FOTO_NOTU=kapali` ile başlatın: yer tutucudaki "Fotoğraf eklenecek" notu gizlenir, renkli alan ve başlık kalır.

## Güncellenecek tek yerler

- **Sınav tarihleri:** `public/index.html` içindeki `data-countdown` değerleri. Şu an tahmini (YKS 19 Haziran 2027, LGS 13 Haziran 2027). ÖSYM/MEB açıkladığında değiştirin.
- **Telefon / WhatsApp:** `public/_partials/header.html` ve `footer.html` (WhatsApp: 0552 632 91 28).
- **Logo:** `public/_partials/header.html` içindeki `#i-mark` sembolü geçici çizimdir; kurumun orijinal logosu gelince değiştirilecek.

## Komutlar

- `npm run check`: JavaScript sözdizimi kontrolü
- `npm run verify`: sunucu açıkken Python Playwright ile tarayıcı testleri ve ekran görüntüleri (`screenshots/`)
- `npm run build`: parçaları birleştirip `dist/` üretir. Form ve panel için Node sunucusu gerekir; yalnızca statik barındırmada form çalışmaz.

## Yayın öncesi

- `robots noindex` kuralını kaldırın (`public/_partials/head.html`).
- Güçlü bir `ADMIN_PASSWORD` tanımlayın, HTTPS arkasında çalıştırın.
- Kaynaklar ve doğrulanacak bilgiler: `docs/sources.md`.
