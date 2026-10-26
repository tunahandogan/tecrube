# Kurumdan istenecek fotoğraflar

Fotoğraflar `public/images/` klasörüne aşağıdaki adlarla konduğunda sitede kendiliğinden görünür. Dosya yoksa ilgili alanda marka renklerinde "Fotoğraf eklenecek" yer tutucusu durur.

| Dosya adı | Ne çekilmeli | Yön | Nerede görünür |
|---|---|---|---|
| `hero.jpg` | Sınıf ya da kabin salonunun geniş, aydınlık genel görünümü | Yatay | Ana sayfa ilk ekran, lacivert alanın arkasında (üstüne lacivert örtü gelir) |
| `bina.jpg` | Bina girişi, tabela görünür şekilde | Dikey ya da kare | Ana sayfa galeri (en büyük kare) |
| `sinif.jpg` | Sınıf, tahta ve sıralar | Yatay | Ana sayfa galeri, LGS sayfası |
| `kabin-salonu.jpg` | Kabinlerin sıralı görünümü | Yatay | Ana sayfa galeri, YKS kabin bölümü |
| `kutuphane.jpg` | Kütüphane / kitaplık | Kare ya da dikey | Ana sayfa galeri |
| `deneme.jpg` | Deneme sınavı anı ya da deneme kitapları | Yatay | Ana sayfa galeri, LGS sayfası |
| `kurucu.jpg` | Kurucu Müdür Ertaş Cevizliler portresi | Dikey | Ana sayfa kurucu bölümü |

## Çekim önerileri

- Gün ışığında, ışıklar açıkken, telefon yatay tutularak (portre hariç) çekin.
- Masaları toparlayın; tahtada güncel bir ders ya da kurumun adı olsun.
- **Öğrenci yüzü görünecekse velinin yazılı izni alınmalı** (KVKK). İzin yoksa öğrencileri arkadan ya da yüzleri görünmeyecek şekilde çekin.
- WhatsApp fotoğrafı sıkıştırır; mümkünse "belge olarak" gönderin ya da orijinal dosyayı paylaşın.
- Instagram hesabındaki (@ertecrubekurs) fotoğrafların orijinalleri de kullanılabilir.

## Fotoğrafları hazırlama

Telefon fotoğrafları 3–6 MB olur ve konum bilgisi (EXIF) taşır. Gelen dosyaları bir klasöre yukarıdaki adlarla koyup çalıştırın:

```
pip install pillow
python scripts/fotograf.py "C:\gelen-fotograflar"
```

Betik fotoğrafları döndürür, en fazla 2000px'e küçültür, konum bilgisini siler ve `public/images/` içine yazar.
