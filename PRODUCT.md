# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Veliler** (birincil karar verici): Erzurum'da çocuğu için YKS ya da LGS kursu arayan, telefondan siteye bakıp "güvenilir mi, ne sunuyor, saatleri ne, nasıl ararım" sorularının cevabını arayan anne/baba.
- **Öğrenciler**: 7–8. sınıf (LGS), 9–12. sınıf ve mezun (YKS) öğrenciler; programı, çalışma düzenini ve kabin sistemini merak eder.
- **Kurum sahibi** (Kurucu Müdür Ertaş Cevizliler): siteyi kurumun vitrini olarak gösterir, ön kayıt başvurularını takip eder.

## Product Purpose

Er Tecrübe Kurs Merkezi'nin (Yakutiye / Erzurum) YKS ve LGS hazırlık programlarını net ve güven veren biçimde anlatmak; veliyi aramaya, WhatsApp'tan yazmaya veya ön kayıt formu doldurmaya yönlendirmek. Başarı: veli birkaç saniyede programı, saatleri ve iletişim yolunu bulur; kurum ön kayıt başvurularını tek yerde görür.

## Positioning

Kalabalık dershane değil, takip edilen öğrenci: YKS'de kişiye ait kabin (çalışma alanı) + birebir özel ders; LGS'de sınıf dersleri + özel ders; herkese eğitim koçluğu, rehberlik, soru çözüm saatleri ve düzenli deneme sınavları. Mezunlar için sabah 9 – akşam 9 tam gün düzen.

## Operating Context

Ders saatleri (kullanıcı onaylı, 26 Ekim 2026):
- YKS mezun: 09:00–21:00
- YKS 9, 10, 11, 12. sınıflar: 17:00–21:00
- LGS: hafta içi 17:00–21:00, hafta sonu 09:00–18:00

Programlar (kullanıcı onaylı): YKS = kabin sistemi + özel ders. LGS = sınıf dersleri + özel ders, kabin yok. Rehberlik var.

## Capabilities and Constraints

- Stack: mevcut statik HTML/CSS/JS + bağımlılıksız Node sunucusu (`scripts/server.mjs`). Ön kayıt formu bu sunucuya POST eder, JSON dosyasına yazar; şifreli basit yönetim sayfasından okunur. Statik barındırmaya taşınırsa form için sunucu gerekir.
- İletişim: sabit 0442 442 52 25; kurum broşüründe cep 0552 632 91 28 (sitede cep/WhatsApp olarak kullanılıyor). Kullanıcı 0538 419 55 70'in de geçerli olduğunu söyledi (MEB kaydı); hangisinin WhatsApp olduğu kurumla teyit edilmeli.
- Programlar (broşür): 6, 7, 8. sınıf (LGS), haftada 20 saat ders; uzman öğretmen kadrosu, eğitim koçluğu, deneme kulübü, kütüphane, özel ders desteği.
- Adres: Muratpaşa Mah. Saraybosna Cad., Dere Camii arkası, Rabia Evler A Blok (MEB kaydı: 4. Vaniefendi Sk. Rabia Evler Er Tecrübe No:3A), Yakutiye / Erzurum.
- YKS 2027 ve LGS 2027 tarihleri ÖSYM/MEB tarafından henüz açıklanmadı (26 Ekim 2026). Geri sayım tahmini tarih kullanır ve "tahmini" diye etiketlenir; tek yerden güncellenir.

## Brand Commitments

- Ad: logoda "TECRÜBE Kurs Merkezi" (MEB kaydı: Özel Tecrübe Özel Öğretim Kursu; firma: Er Tecrübe Eğitim Hizmetleri). Kurum broşüründe logo: mavi açık kitap + sarı figür ve yıldız. Logo dosyası henüz alınmadı; sitedeki işaret geçici çizimdir.
- Kurum renkleri (kullanıcı onaylı, broşür): kraliyet mavisi / lacivert + sarı.
- Slogan (broşür): "Başarıya giden yolda doğru adım!"
- Yön tercihi (26 Ekim 2026): kullanıcı "klasik dershane sitesi" mantığını seçti; başka bir kurumun sitesine benzememeli, daha iyisi olmalı.
- Ses: ciddi, net, veliye saygılı; reklam abartısı yok.

## Evidence on Hand

- Kuruluş: 2020 yaz dönemi (Sosyal TV haberi, 20.07.2020). Kurucu Müdür Ertaş Cevizliler.
- 2020 haberinde: 12 kişilik sınıflar, okul disipliniyle tam gün eğitim, kişiye özel eğitim koçluğu, öğrenci takibi, soru çözüm saatleri, düzenli deneme sınavları. (Güncelliği kurumla teyit edilmeli.)
- Yok: kurum fotoğrafları, logo, öğretmen kadrosu, derece/başarı verisi, öğrenci/veli yorumları, fiyatlar. Bunlar uydurulmaz; kurumdan istenebilir.

## Product Principles

1. Veli önce bilgi ister: program, saat, yer, telefon her zaman bir dokunuş uzakta.
2. Kanıtlanmayan iddia yok; somut düzen (saatler, kabin, koçluk) güveni taşır.
3. Mobil öncelikli: velilerin çoğu telefondan bakar.
4. Her bölüm bir eyleme bağlanır: ara, yaz, ön kayıt.

## Accessibility & Inclusion

WCAG AA kontrast, büyük dokunma alanları, okunaklı gövde metni (veliler geniş yaş aralığında), `prefers-reduced-motion` desteği.
