---
name: Tecrübe Kurs Merkezi
description: Erzurum'da YKS ve LGS hazırlık kursu için kurumun kendi mavi-sarı kimliğiyle kurulmuş, bilgisi derli toplu, fotoğrafa hazır klasik dershane sitesi.
colors:
  navy-950: "#071339"
  navy-900: "#0c1d5c"
  navy-800: "#132a7a"
  blue-700: "#1b3fa8"
  blue-600: "#2451c7"
  blue-200: "#c7d5f7"
  blue-100: "#e4ebfc"
  blue-50: "#f3f6fd"
  yellow-400: "#f8c51c"
  yellow-500: "#ecb400"
  yellow-100: "#fff3c4"
  ink: "#0d1633"
  text: "#2a3352"
  muted: "#58617f"
  line: "#dce3f1"
  white: "#ffffff"
  on-navy: "#c9d4f3"
  field-border: "#c3cde3"
  danger: "#b42318"
  success: "#11734b"
  now-red: "#d92d20"
  whatsapp: "#1a8f4f"
typography:
  display:
    fontFamily: "Archivo, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 3.9vw, 4.4rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 104"
  headline:
    fontFamily: "Archivo, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3.1rem)"
    fontWeight: 850
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 110"
  title:
    fontFamily: "Archivo, Segoe UI, sans-serif"
    fontSize: "clamp(1.45rem, 1.2rem + 0.8vw, 1.85rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 108"
  body:
    fontFamily: "Figtree, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"tnum\" 1"
  label:
    fontFamily: "Archivo, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.1
  button:
    fontFamily: "Archivo, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    letterSpacing: "-0.005em"
  photo-label:
    fontFamily: "Archivo, Segoe UI, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  pill: "99px"
spacing:
  gutter: "clamp(16px, 4vw, 32px)"
  section: "clamp(64px, 9vw, 120px)"
  container: "1200px"
  photo-gap: "14px"
components:
  button-yellow:
    backgroundColor: "{colors.yellow-400}"
    textColor: "{colors.navy-950}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.7em 1.3em"
    height: "48px"
  button-yellow-hover:
    backgroundColor: "#ffd23d"
  button-primary:
    backgroundColor: "{colors.blue-700}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.7em 1.3em"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.navy-800}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy-900}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.7em 1.3em"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.blue-50}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
    height: "50px"
  program-tab:
    backgroundColor: "{colors.blue-50}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  program-tab-selected:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.white}"
  seg-indicator:
    backgroundColor: "{colors.navy-900}"
    rounded: "{rounded.md}"
  tag:
    backgroundColor: "{colors.blue-100}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card-enroll:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "clamp(22px, 3vw, 32px)"
  panel-navy:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.on-navy}"
    rounded: "{rounded.md}"
    padding: "28px"
  photo-slot:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.on-navy}"
    typography: "{typography.photo-label}"
    rounded: "{rounded.lg}"
    padding: "20px"
  photo-slot-blue:
    backgroundColor: "{colors.blue-700}"
    textColor: "{colors.on-navy}"
  photo-slot-light:
    backgroundColor: "{colors.blue-100}"
    textColor: "{colors.muted}"
  photo-note:
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  cabin-inset:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "14px"
    width: "66%"
---

# Design System: Tecrübe Kurs Merkezi

## Overview

**Creative North Star: "Broşürün Düzenli Hali"**

Sistem, kurumun kendi broşüründeki kraliyet mavisi, lacivert ve sarıyı (kullanıcı onaylı) alır ve onu kategorinin standart dili olan klasik dershane sitesine, ulusal zincirlerin üstünde bir işçilikle yerleştirir. Site **fotoğrafa hazırdır**: hero, galeri, kurucu portresi, YKS kabin bölümü ve LGS sayfası, `public/images/<ad>.jpg` dosyalarına (hero, bina, sinif, kabin-salonu, kutuphane, deneme, kurucu) bağlı fotoğraf alanları taşır. Kullanıcının bu turdaki yanıtı: kurum fotoğrafları henüz yok; site bugün sahibine gösterilirken fotoğraf alanlarında "şık yer tutucu" duracak, kurum fotoğrafları sonra gönderecek. Bu yüzden her alanın iki tasarlanmış hali vardır: dosya yokken düz marka tonunda yer tutucu, dosya gelince kendiliğinden görünen fotoğraf. Fotoğraf gelene kadar da sayfa boş durmaz; geniş lacivert ve açık mavi alanlar, sarı dolgular, köşeden giren eğik sarı şerit ve gerçek bilgiyi taşıyan bileşenler (saat çizelgesi, geri sayım, saat tabloları) görsel ağırlığı üstlenir.

Yoğunluk orta-yüksektir; veli program, saat, yer ve telefonu her an bir dokunuş uzakta bulur. Başlıklar ağır ve hafif geniş (Archivo), gövde sakin ve okunaklıdır (Figtree, 17px). Süs yerine bilgi: her bölüm bir eyleme (ara, WhatsApp, ön kayıt) bağlanır; Instagram hesabı (@ertecrubekurs, https://www.instagram.com/ertecrubekurs/, kullanıcı isteğiyle eklendi) ikincil iletişim kanalı olarak üst şerit, iletişim listesi, footer ve galeri başlığında durur. Ses ciddi ve veliye saygılıdır; reklam abartısı, uydurma sayı ve yorum yoktur.

Başlıktaki logo işareti (`#i-mark` sembolü: mavi açık kitap, sarı figür ve yıldız) kurumun orijinal logo dosyası gelene kadar kullanılan **geçici bir çizimdir**; orijinal dosya geldiğinde sembol değiştirilir, çevresindeki yerleşim (46px işaret, "TECRÜBE" 900 ağırlık %112 genişlik, altında "Kurs Merkezi") korunur.

**Key Characteristics:**
- Kurumun broşür renkleri: kraliyet mavisi / lacivert + sarı, beyaz ve çok açık mavi zemin.
- Ağır, hafif geniş Archivo başlıklar; Figtree gövde; her yerde tabular rakamlar.
- Tek kalınlıkta (1.9) çizgi ikonlar, yerel SVG sprite'tan.
- Küçük köşe yarıçapları (6 / 10 / 16px); hap biçimi yalnızca etiket, durum rozeti ve "Fotoğraf eklenecek" notunda.
- Program renk kodu (LGS sarı, YKS 9–12 mavi, YKS Mezun lacivert) tüm bileşenlerde aynı.
- Fotoğrafa hazır: alanlar `public/images/<ad>.jpg` dosyalarına bağlı (hero, bina, sinif, kabin-salonu, kutuphane, deneme, kurucu). Dosyası olmayan alanda sunucu `<img>`'yi çıkarır ve alanı `is-empty` olarak işaretler; yer tutucu = düz marka tonu + sistem çizgi ikonu (1.9) + Archivo 800 etiket + kesikli "Fotoğraf eklenecek" hapı (`FOTO_NOTU=kapali` ile kaldırılır). Dosya gelince fotoğraf alanı kaplar ve yumuşakça belirir, alt kenarda okuma örtülü açıklama, hover'da 1.035 yakınlaşma.
- Tek bir odak açılış sahnesi (hero) ve yalnızca durum bildiren destek hareketleri; içerik JS olmadan da görünür.

## Colors

Tek bir kurumsal mavi ailesi (lacivertten çok açık maviye) ve tek bir sıcak vurgu (marka sarısı); geri kalan her şey mavi tonlu nötrlerdir.

### Primary
- **Kraliyet Mavisi** (blue-700): Birincil marka mavisi. İkincil butonlar, metin bağlantıları, ikon rengi, logo yazısı, CTA bandı zemini, eğik şeridin mavi çerçevesi, mavi tonlu fotoğraf yer tutucusu.
- **Derin Lacivert** (navy-900): Büyük alanların rengi. Hero'nun sağ yarısı, alt sayfa başlığı, kurucu bölümü, kayan seçim göstergesi, saat paneli, koyu program kartı, varsayılan fotoğraf yer tutucusu ve hero fotoğrafının örtüsü (%72 → %90).
- **Gece Laciverti** (navy-950): En koyu yüzey. Üst iletişim şeridi, footer, geri sayım hücreleri, sarı zemin üstündeki metin, fotoğraf açıklamasının alt örtüsü (%78).
- **Koyu Mavi** (navy-800): Yalnızca birincil butonun hover tonu.
- **Program Mavisi** (blue-600): YKS 9–12 program rengi ve odak halkası / alan odak kenarı.

### Secondary
- **Marka Sarısı** (yellow-400): Broşürün sarısı. Ana eylem butonu (Ön Kayıt), başlık vurgu alt çizgisi, eğik şerit, onay rozetleri, aktif menü çizgisi, link alt çizgisi, koyu zemin üstünde küçük vurgu metni ve ikonları (koyu yer tutucudaki ikon ve "EC" monogramı dahil), LGS program rengi, metin seçimi. Bir yüzey tonu olarak yer tutucuya verilmez.
- **Koyu Sarı** (yellow-500) ve **Açık Sarı** (yellow-100): Not kutusu zemini ve yönetim panelinde "yeni" başvuru durumu.

### Neutral
- **Mürekkep** (ink): Başlıklar ve form içi metin.
- **Gövde** (text): Akan metin.
- **Soluk** (muted): Yardımcı metin, alt başlık, açıklama, açık yer tutucunun not metni (açık mavi zemin üzerinde de AA geçer).
- **Çizgi** (line): Ayırıcılar, kart kenarları, çizelge ızgarası.
- **Açık Mavi** (blue-50), **Buz Mavisi** (blue-100), **Sis Mavisi** (blue-200): Alternatif bölüm zemini; etiket, ikon kutusu ve açık fotoğraf yer tutucusu zemini; çerçeve butonu, açık SSS kenarı ve açık yer tutucudaki kesikli not hapının kenarı.
- **Lacivert Üstü Metin** (on-navy): Lacivert yüzeylerdeki gövde metni ve bağlantılar, koyu yer tutucunun not metni. CSS'te özel değişken değil, literal olarak tekrar kullanılıyor.
- **Alan Kenarı** (field-border): Form alanlarının 1.5px kenarı (site ve yönetim paneli).

### Durum renkleri
- **Hata** (danger), **Başarı** (success): Form hataları; "kayıtlar açık" rozeti, başarı ikonu, yönetimde "kayıt oldu" durumu.
- **Şu An Kırmızısı** (now-red): Yalnızca zaman çizelgesindeki "Şu an" çizgisi, nabız atan noktası ve etiketi.
- **WhatsApp Yeşili** (whatsapp): Yalnızca WhatsApp düğmesi ve bağlantıları (hover #157a43).

### Named Rules
**The Broşür Paleti Rule.** Renkler kurumun kendi broşüründen gelir: kraliyet mavisi / lacivert + sarı. Yeni bir marka rengi (bordo, turkuaz, yeşil vurgu vb.) eklenmez; durum renkleri yalnızca durum bildirir. Instagram için marka gradyanı kullanılmaz; ikon sistemin çizgi ikonudur ve bulunduğu yerin rengini alır.

**The Program Renk Kodu Rule.** LGS = yellow-400, YKS 9–12 = blue-600, YKS Mezun = navy-900. Hızlı geçiş renk kareleri, program sekmeleri, zaman çizelgesi çubukları ve LGS haftalık çizelgesi bu eşlemeyi aynen kullanır; LGS hafta sonu için sarının çizgili (135°) varyantı kullanılır. Bir programa başka bir renk atanmaz.

**The Sarı Eylemdir Rule.** Sarı dolgu sayfadaki birincil eylemi (Ön Kayıt) ya da tek bir vurguyu işaret eder; bir ekranda birden fazla sarı dolgu buton yan yana durmaz. Sarı üstündeki metin her zaman navy-950'dir, asla beyaz değildir.

**The Üç Yer Tutucu Tonu Rule.** Fotoğraf yer tutucusu yalnızca üç düz tondan birini alır: navy-900 (varsayılan), blue-700 ya da blue-100. Sarı ton yoktur (Sarı Eylemdir ve Program Renk Kodu ile çakışır), yer tutucuda eğik şerit, desen ya da gradyan yoktur; yan yana alanlar tonları dönüşümlü kullanır.

## Typography

**Display Font:** Archivo (Segoe UI, sans-serif yedekli), yerel barındırılan değişken font, wdth 100–125 / wght 500–900
**Body Font:** Figtree (Segoe UI, sans-serif yedekli), yerel barındırılan, wght 400–700

**Character:** Archivo'nun ağır ve hafif geniş kesimi broşür başlıklarının tok sesini verir; Figtree gövdede sıcak ve sade kalır. Rakamlar her yerde tabular, böylece saatler ve gün sayıları hizalı durur.

### Hierarchy
- **Display** (900, clamp 2.5–4.4rem, 1.02, genişlik %104, -0.035em): Yalnızca hero ve alt sayfa H1'i. İçinde bir ifade kraliyet mavisi ve sarı alt çizgiyle vurgulanır (alt sayfa başlığında sarı metin, çizgisiz).
- **Headline** (850, clamp 2–3.1rem, 1.1, genişlik %110, -0.03em): Bölüm H2'leri. CTA bandı, bölünmüş yerleşim ve ön kayıt yan sütununda %108 genişlikle daha küçük ölçek.
- **Title** (800, clamp 1.45–1.85rem, %108, -0.025em): Ana hizmet başlıkları, program kartı başlıkları, sekme paneli H3.
- **Body** (400, 1.0625rem / mobilde 1rem, 1.6): Akan metin; paragraflar 34–40em, SSS cevapları 62ch ile sınırlı.
- **Label** (700, ~0.95rem): Hızlı geçiş etiketi, menü, sekme adları, saat ölçeği, buton metni (1rem), fotoğraf açıklaması (0.98rem). Büyük harf ve harf aralığı kullanılmaz; tek istisna geri sayımdaki küçük "YKS 2027 / LGS 2027" veri etiketleridir (0.8rem, 0.06em).
- **Fotoğraf etiketi** (Archivo 800, 1.2rem / mobilde 1.02rem): Yer tutucunun ortasındaki alan adı ("Kurumumuz", "Kabin salonu"). Altındaki not hapı 0.78rem, 600.

### Named Rules
**The Ağır ve Geniş Rule.** Başlıklar Archivo 800–900 ağırlıkta, %104–112 genişlikte ve negatif harf aralığıyla yazılır. İnce ya da italik başlık, serif başlık kullanılmaz.

**The Okunaklı Gövde Rule.** Akan metin 1rem'in altına inmez (masaüstü 1.0625rem). 0.78–0.9rem yalnızca not, açıklama ve meta satırları içindir; velilerin yaş aralığı geniştir.

**The Gerçek Rakam Rule.** Rakamlar tabular yazılır ve yalnızca doğrulanmış bilgiyi gösterir: ders saatleri, tahmini olduğu belirtilen sınav geri sayımı, kuruluş yılı. Geri sayım sayfa açıldığında doğrudan doğru gün sayısını gösterir; sıfırdan saymaz, ara değer göstermez.

## Layout

İçerik 1200px'lik bir kapsayıcıda, `clamp(16px, 4vw, 32px)` kenar boşluğuyla durur; bölümler `clamp(64px, 9vw, 120px)` dikey boşlukla ayrılır ve beyaz / açık mavi (blue-50) / lacivert zeminler arasında dönüşümlü ilerler. Masaüstünde baskın kalıp iki sütundur: hero'da sol metin + sağ 470px ön kayıt kartı, bölüm başlığında sol başlık + sağ açıklama, hizmet ve SSS bölümlerinde 380px'lik yapışkan giriş sütunu + akan içerik, kurucu bölümünde 360px portre + söz.

Fotoğraf ızgaraları 14px aralıkla (640px altında 10px) kurulur. Ana sayfa galerisi beş alanlı bir bento'dur: `1.25fr 1fr 1fr 1fr` sütun, `clamp(200px, 20vw, 270px)` yüksekliğinde iki satır; bina iki satır boyunca uzun, sınıf ve deneme iki sütun genişliğinde, kabin salonu ve kütüphane tek hücre. LGS sayfasındaki ikili fotoğraf `1.4fr 1fr` oranındadır.

Kırılımlar: 1100px'te menü sıkışır ve telefon numarası yalnızca ikona iner; 960px'te ana menü yerini menü butonuna bırakır ve tüm iki sütunlu ızgaralar tek sütuna düşer (hero'da lacivert alan ve hero fotoğrafı alt %42'ye geçer), galeri iki sütuna iner (`clamp(150px, 34vw, 240px)` satır; bina, sınıf ve deneme tam genişlik), kurucu portresi 320px kareye döner, YKS kabin planı fotoğrafın altına iner; 640px'te üst şerit gizlenir, alt kenarda sabit üç düğmeli eylem çubuğu (Ara, WhatsApp, Ön Kayıt) belirir, sabit WhatsApp balonu kalkar, ikili fotoğraf tek sütuna iner ve kurucu portresi tam genişlik 4:3 olur. Dokunma hedefleri en az 48px'tir.

### Hareket
Hareket dili bir odak sahne ve onu destekleyen durum hareketlerinden oluşur; tümü `cubic-bezier(.16, 1, .3, 1)` ile.

- **Odak sahne, hero açılışı:** başlığın kelimeleri maskenin altından sırayla yükselir (0.85s, kelime başına 60ms gecikme); vurgu alt çizgisi 0.6s'de soldan dolar; sarı şerit köşeden kayarak girer (1.1s); ön kayıt kartı yalnızca transform ile yükselir (40px ve 0.98 ölçekten, opaklık değişmez); alt metin, butonlar ve hızlı geçiş sırayla (0.25 / 0.33 / 0.41s) 14px'ten yükselir. Alt sayfa başlığında yalnızca şerit girişi oynar.
- **Destek hareketleri (durum bildirir):** kayan seçim göstergesi (0.5s); zaman çizelgesi çubukları görünür olunca soldan sırayla büyür (`data-anim="bars"`, 120ms aralık); kayıt adımlarında kesikli çizgi soldan çizilir ve adım daireleri sırayla belirir (0.35s aralık); galeri ve ikili fotoğraf alanları alttan yukarı clip-path maskesiyle açılır (90ms aralık); ana hizmet listesi sırayla 22px'ten gelir (110ms aralık); sekme paneli 8px'ten gelir; buton oku hover'da 3px ileri itilir; header kaydırınca 80px'ten 68px'e sıkışır ve gölge alır; başarı onay işareti kendini çizer; "Şu an" noktası ve "kayıtlar açık" durum noktası nabız atar; hızlı geçişten program seçilince formdaki program alanı bir kez sarı halka yayar.
- **Geri sayım hareketsizdir:** sayılar sıfırdan saymaz (sayaç bandı jesti reddedildi); hücre yalnızca kartla birlikte yükselir.
- **Erişilebilirlik:** `prefers-reduced-motion: reduce` altında hareket kaldırılır, durum değişiklikleri korunur (seçim göstergesi yalnızca opaklıkla yer değiştirir, kelime bölme ve görünür olunca oynama devre dışı kalır). Görünür olunca oynayan gruplar yalnızca `html.js` sınıfı varken gizli başlar; JS çalışmazsa tüm içerik ve fotoğraflar doğrudan görünür.

## Elevation & Depth

Sistem büyük ölçüde düzdür; derinlik önce renk alanlarıyla (beyaz kart lacivert alanın önünde, açık mavi bölüm beyaz kartı taşır) verilir. Gölgeler lacivert tonludur, yumuşak ve aşağı düşer; sert ofset gölge yoktur. Fotoğraf alanları gölgesizdir.

### Shadow Vocabulary
- **Hafif** (`box-shadow: 0 1px 2px rgb(12 29 92 / .06), 0 2px 8px rgb(12 29 92 / .05)`): Hover'daki hızlı geçiş butonu, açık SSS maddesi, haftalık çizelge.
- **Orta** (`box-shadow: 0 2px 4px rgb(12 29 92 / .05), 0 14px 32px -12px rgb(12 29 92 / .28)`): Kayan seçim göstergesi (seçili sekme / hızlı geçiş), YKS kabin fotoğrafına binen plan kartı, ön kayıt sayfasındaki form kartı, yönetim giriş kartı.
- **Büyük** (`box-shadow: 0 4px 8px rgb(7 19 57 / .08), 0 28px 60px -20px rgb(7 19 57 / .45)`): Yalnızca hero'daki ön kayıt kartı.

### Named Rules
**The Tek Yüzen Kart Rule.** Büyük gölge sayfada yalnızca bir öğede, hero'daki ön kayıt kartında bulunur. Diğer kartlar kenar çizgisiyle (line) durur, durum değişince ya da bir fotoğrafın üstüne bindiğinde hafif veya orta gölge alır.

## Shapes

Köşeler küçüktür: 6px (alanlar, menü bağlantıları, çizelge çubukları), 10px (butonlar, SSS, saat paneli, ikon kutuları, seçim göstergesi), 16px (büyük kartlar, paneller ve fotoğraf alanları; galeri maskesi de 16px yuvarlakla açılır). Hero fotoğrafı köşesizdir, lacivert alanın kendisini doldurur. Tam yuvarlak yalnızca ikon diskleri, adım numaraları ve avatar için; hap biçimi (99px) yalnızca etiket, durum rozeti, yönetim filtreleri ve kesikli "Fotoğraf eklenecek" notu için kullanılır. Kenarlar 1px (line) ya da form alanlarında 1.5px'tir.

Sistemin imza biçimi **eğik sarı şerittir**: -24° dönmüş düz sarı bir bant, bölümün bir köşesinden taşar ve içeriğin arkasında kalır. Hero ve alt sayfa başlığında bandın etrafında 20–22px'lik kraliyet mavisi çerçeve vardır (yayılma gölgesiyle); kurucu bölümü ve CTA bandında çerçevesizdir.

**The Köşeden Giren Şerit Rule.** Bir bantta en fazla bir eğik şerit bulunur, her zaman -24° açıyla, bir köşeye yaslı ve metnin arkasında; içerik alanının ortasını kesmez. Şerit bant (bölüm) düzeyinde bir imzadır; fotoğraf alanı, kart ya da yer tutucu gibi tekrarlanan öğelere konmaz.

## Components

### Buttons
Tok ve net; Archivo 700, en az 48px yükseklik (büyük boy 56px), 10px köşe, 2px kenar boşluğu.
- **Sarı (birincil eylem):** yellow-400 zemin, navy-950 metin, hafif sarı alt parıltı; hover #ffd23d. "Ön Kayıt" ve formu gönder.
- **Mavi (ikincil):** blue-700 zemin, beyaz metin; hover navy-800.
- **Çerçeve:** beyaz zemin, blue-200 kenar, navy-900 metin; hover blue-700 kenar + blue-50 zemin.
- **Koyu zemin hayaleti:** şeffaf, %35 beyaz kenar; hover tam beyaz kenar.
- **Metin butonu / bağlantı:** blue-700, 2px sarı alt çizgi.
- **Etkileşim:** sondaki ok ikonu hover'da 3px ileri itilir; basılınca 1px aşağı iner; `aria-busy` sırasında %70 opaklık. Odak her yerde 3px blue-600 halka, 3px boşlukla.

### Tags / Rozetler
- **Etiket:** blue-100 zemin, navy-900 Archivo 700 0.85rem, hap biçimi; bağlantı olanı hover'da sarıya döner.
- **Saat rozeti:** sarı zemin, navy-950, hap biçimi (program kartlarında).
- **Durum:** açık yeşil zemin, success metin, nabız atan nokta ("kayıtlar açık").

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** beyaz; koyu varyant navy-900 (on-navy metin, beyaz başlık).
- **Shadow Strategy:** kenar çizgisiyle durur; gölge Elevation bölümündeki kurallara göre.
- **Border:** 1px line.
- **Internal Padding:** `clamp(24px, 3–4vw, 36–48px)`.

### Inputs / Fields
- **Style:** beyaz zemin, 1.5px field-border kenar, 6px köşe, en az 50px yükseklik, 1rem ink metin; etiket üstte, 600 ağırlık navy-900, isteğe bağlı kısmı soluk.
- **Focus:** kenar blue-600'e döner, 4px %15 mavi halka.
- **Error:** danger kenar ve 4px %10 kırmızı halka; altında 0.85rem kalın hata metni.

### Navigation
- **Üst şerit:** navy-950, 0.875rem, sarı ikonlar; adres, iki telefon ve Instagram (@ertecrubekurs). 960px altında adres, 640px altında şeridin tamamı gizli.
- **Header:** yapışkan, %97 beyaz, alt çizgili; kaydırınca 80px'ten 68px'e sıkışır ve lacivert tonlu gölge alır; logo + Archivo 600 menü + telefon + sarı Ön Kayıt. Hover blue-50 zemin; aktif sayfa blue-700 metin ve altında 3px sarı çizgi.
- **Mobil:** 48px menü butonu, alt açıklamalı tam genişlik liste; 640px altında sabit alt eylem çubuğu (Ara, WhatsApp, sarı Ön Kayıt).
- **Instagram yerleşimi:** üst şerit, iletişim listesi (ikon kutusu + "Instagram" başlığı + @ertecrubekurs), footer sosyal bağlantısı ve galeri başlığındaki metin bağlantısı. İkon sprite'taki `i-instagram` çizgi ikonudur; her zaman yeni sekmede açılır.

### Program Seçici (imza)
Hero'daki üç program hızlı geçişi, program sekmeleri ve zaman çizelgesi aynı program durumunu paylaşır. Her seçenek renk karesi (Program Renk Kodu) + Archivo 800 ad + soluk alt satırdan oluşur; seçili olan navy-900 zemine, beyaz ada ve sarı/açık alt satıra geçer ve orta gölge alır. Sekme listesi blue-50 kapsül içinde durur.

### Kayan Seçim Göstergesi
Hızlı geçiş ve program sekmeleri aynı göstergeyi paylaşır: düğmelerin arkasında tek bir navy-900, 10px köşeli, orta gölgeli zemin seçili düğmenin konumuna ve boyutuna 0.5s'de kayar; seçili düğmenin kendi zemini şeffaflaşır. İlk yerleşimde, font yüklenince ve yeniden boyutlandırmada animasyonsuz yerine oturur. JS yoksa seçili düğme zemini kendisi boyar; hareket azaltıldığında yalnızca opaklıkla geçer.

### Fotoğraf Alanı (imza)
Fotoğrafa hazır kutu: 16px köşeli, taşmayı kesen, varsayılan navy-900 zeminli bir figür. Her alan `public/images/<ad>.jpg` dosyasına bağlıdır.
- **Yer tutucu (dosya yok):** sunucu `<img>`'yi çıkarıp alanı `is-empty` işaretler (istemci de yükleme hatasında aynısını yapar). Ortada sistemden bir çizgi ikonu (40px, 1.9 kalınlık; koyu tonlarda sarı, açık tonda blue-700), Archivo 800 alan adı (koyu tonda beyaz, açık tonda navy-900) ve kesikli kenarlı "Fotoğraf eklenecek" hapı (0.78rem; koyu tonda %40 beyaz, açık tonda blue-200 kenar). Not, yayında `FOTO_NOTU=kapali` ile kaldırılır.
- **Tonlar:** yalnızca navy-900, blue-700 ve blue-100 (Üç Yer Tutucu Tonu Rule).
- **Fotoğraf (dosya var):** görsel alanı kaplar (cover), yüklenince 0.6s'de belirir; alt kenarda navy-950 %78 örtülü Archivo 700 açıklama; hover'da 1.2s'de 1.035 yakınlaşma.
- **Hero fotoğrafı:** hero'nun lacivert yarısının içinde, köşesiz ve yer tutucusuz (dosya yoksa lacivert alan kendisi durur); varsa %85 doygunlukla, üstünde navy-900 %72 → %90 örtüyle.

### Galeri
Ana sayfada "Kurumumuzdan kareler" başlığı ve yanında Instagram metin bağlantısı; altında beş alanlı bento (bina, sınıf, kabin salonu, kütüphane, deneme), tonlar navy / blue / light / light / navy dönüşümlü. Görünür olunca alanlar sırayla maskeyle açılır.

### Kurucu Portresi
Kurucu bölümünde 4:5 oranlı, blue-700 tonlu fotoğraf alanı. Yer tutucuda ikon yerine sarı "EC" monogramı (Archivo 900, %112 genişlik, 5.5rem / mobilde 4rem) ve not hapı durur.

### YKS Kabin Fotoğrafı
Kabin bölümünde 4:3 kabin salonu fotoğraf alanı ve üstüne sol alt köşeden taşarak binen beyaz plan kartı (kabin kuşbakışı çizimi; genişliğin %66'sı, 14px iç boşluk, 16px köşe, orta gölge). 960px altında plan kartı fotoğrafın altına iner, gölgeli kalır.

### LGS İkili Fotoğraf
LGS sayfasında sınıf dersi (blue) ve deneme kulübü (navy) alanları yan yana: geniş olan 2:1, dar olan aynı yüksekliği doldurur; mobilde alt alta, ikincisi 16:10.

### Günlük Zaman Çizelgesi (imza)
09–21 saat ölçeğinde her programın kurumda geçirdiği saatleri yatay çubuklarla gösterir (çubuk renkleri Program Renk Kodu'na göre). Bir program seçildiğinde diğer satırlar %32 opaklığa iner, eşleşen adın rengi blue-700 olur. Mesai içindeyse now-red renkte 2px "Şu an" çizgisi, nabız atan başlık noktasıyla gösterilir. Mobilde çubuk metni gizlenir, saat adın altına geçer.

### Ön Kayıt Kartı ve Geri Sayım
Beyaz, 16px köşeli, büyük gölgeli kart: başlık + durum rozeti, kısa form, altında navy-950 hücreli geri sayım (sarı küçük etiket, 900 ağırlıkta rakam, "tahmini" notu). Geri sayım rakamı statiktir; sayfa açılınca doğru gün sayısı doğrudan yazılır.

### Saat Paneli ve Hızlı Bilgiler
navy-900 (ya da navy-950 hücreli) koyu paneller; satırlar %14 beyaz çizgiyle ayrılır, sol on-navy etiket, sağda Archivo 800 beyaz değer.

### Hizmetler: Üç Ana Öğe + Ek Liste
Hiyerarşili düzen: üç ana hizmet, 64px lacivert disk içinde sarı ikon + title başlık + paragraf + etiket ile alt alta, çizgilerle ayrılır; altında açık mavi kutuda iki sütunlu "Bunlara ek olarak" onay listesi.

## Do's and Don'ts

### Do:
- **Do** renkleri yalnızca broşür paletinden (mavi / lacivert / sarı) ve mavi tonlu nötrlerden seç.
- **Do** program renk kodunu (LGS yellow-400, YKS 9–12 blue-600, YKS Mezun navy-900) her yeni program bileşeninde aynen uygula.
- **Do** sarı zeminde metni navy-950 yaz.
- **Do** başlıkları Archivo 800–900, %104–112 genişlik ve negatif harf aralığıyla kur; gövdeyi Figtree 1.0625rem / 1.6 tut.
- **Do** ikonları sprite'taki tek kalınlıklı (1.9) çizgi ikonlardan al; yenilerini aynı çizgiyle çiz.
- **Do** köşe yarıçaplarını 6 / 10 / 16px ile sınırla.
- **Do** her bölümü bir eyleme (ara, WhatsApp, ön kayıt) bağla ve dokunma hedeflerini en az 48px yap.
- **Do** yeni bir görsel alanı Fotoğraf Alanı olarak `public/images/<ad>.jpg` dosyasına bağla, navy-900 / blue-700 / blue-100 tonlarından birini ver ve dosya adını `docs/fotograflar.md` listesine ekle.
- **Do** `prefers-reduced-motion` altında hareketi kaldır, durum değişikliğini koru; görünür olunca oynayan içeriği yalnızca `html.js` varken gizle.

### Don't:
- **Don't** uydurma başarı istatistiği, sayaç bandı, öğrenci yorumu ya da fiyat göster.
- **Don't** geri sayımı ya da başka bir rakamı sıfırdan sayarak canlandır.
- **Don't** fontları Google Fonts'tan ya da başka bir dış servisten çek; yerel `/assets/fonts/` kullanılır.
- **Don't** eşit boyutlu "ikon + başlık + metin" kart ızgarası kur; hiyerarşili düzen kullan.
- **Don't** başlıkların üstüne büyük harfli küçük etiket (kicker / eyebrow) ya da "01 / …" bölüm numarası koy.
- **Don't** serif ya da italik vurgulu başlık, krem zemin, bordo, yıldız süsü, kayan slogan şeridi kullan.
- **Don't** sert ofset gölge ya da emoji / glif ikon kullan.
- **Don't** yer tutucuya sarı ton, eğik şerit, desen ya da gradyan ver; kurumun gerçek mekânı olmayan stok fotoğrafı fotoğraf alanına koyma.
- **Don't** geçici logo işaretini kalıcı marka varlığı gibi çoğaltma; orijinal logo dosyası geldiğinde değiştirilecek.

## Reddedilenler

Aşağıdaki tercihler kullanıcıyla değerlendirildi ve reddedildi. Sonraki oturumlarda yeniden önerilmez.

- **Önceki editoryal görünüm** (krem zemin, Bodoni Moda italik vurgulu başlıklar, bordo, ✦ yıldız süsleri, kayan "Emek. Odak. Tecrübe." şeridi, "01 / …" bölüm etiketleri, çok küçük gövde yazıları): Kullanıcı "AI slop / çocuk yapmış gibi" buldu; kurs merkezinden çok parfüm/kuaför markası gibi okunuyordu.
- **"Ders Programı" yönü** (kareli defter zemini, fosforlu kalem blokları, kırmızı kalem "şu an" çizgisi): Yön turunda sunuldu; kullanıcı klasik dershane sitesini seçti. Not: canlı zaman çizelgesi bileşeni (ve "Şu an" çizgisi) klasik yön içinde korundu; defter zemini ve fosforlu kalem dili korunmadı.
- **"Erzurum Taşı ve Çini" yönü** (koyu bazalt, kızıl kesme taş, Selçuklu turkuaz çini, taç kapı çerçevesi): Sunuldu, seçilmedi; ağır / müze gibi okunma riski.
- **"Erzurum Desen Programı" yönü** (arduvaz gri + kırmızı, köşeli harfler, geometrik desen birimleri): Sunuldu, seçilmedi; bilgi aktarımı zayıf.
- **Uydurma başarı istatistikleri / sayaç bandı, öğrenci yorumları, fiyatlar:** Doğrulanmadığı için kullanılmaz.
- **Google Fonts'tan font çekmek:** KVKK nedeniyle fontlar yerel barındırılır.
- **Eşit boyutlu ikon + başlık + metin kart ızgarası** (hizmetler bölümü): Şablon görünümü nedeniyle hiyerarşili "üç ana öğe + ek liste" düzenine çevrildi.
- **Yer tutucularda köşe şeridi:** İmza şeridini tekrarlanan bir bant / süs haline getiriyordu; ayrıca açık zeminde palet dışı bir ton oluşturuyordu.
- **Sarı yer tutucu tonu:** Sarı Eylemdir ve Program Renk Kodu kurallarıyla çakışıyordu.
- **Geri sayımın 0'dan sayması:** Sayaç bandı jestiydi ve ara değerlerde yanlış sayı gösteriyordu; geri sayım statik.
- **Geçici stok fotoğraf:** Kullanıcıya sunuldu; kurumun gerçek mekânı olmadığı için yerine tasarlanmış yer tutucu seçildi.
