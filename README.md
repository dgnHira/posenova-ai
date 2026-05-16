# PoseGuide: Mükemmel Pozun Akıllı Rehberi

PoseGuide, Pinterest estetiği ile kamera teknolojisini birleştiren, kullanıcıların her ortamda en iyi kareyi yakalamasını sağlayan Full-Stack bir poz asistanıdır. Fotoğraf çekimini daha profesyonel, eğlenceli ve yaratıcı hale getirmek için tasarlanmıştır.

---

## Temel Özellikler

* **Pinterest Akıllı Filtreleme:** Ortam (Kafe, Sokak, Sahil), Kişi Sayısı ve Samimiyet Seviyesine (Arkadaş, Sevgili, Aile, İş Arkadaşı) göre Pinterest tabanlı anlık poz önerileri.
* **Canlı Silüet Rehberliği (Ghost Mode):** Seçilen pozu şeffaf bir katman (overlay) olarak kamera ekranına yansıtır. Kullanıcı, modelini bu silüetin içine yerleştirerek mükemmel kompozisyonu yakalar.
* **Dinamik Görsel Keşif:** Uygulama girişi; hayvanlar, portreler, doğa ve teknoloji temalı 20 adet canlı ve ilham verici görselden oluşan "Masonry Grid" kolajıyla kullanıcıyı karşılar.
* **Akıllı Eşleştirme Motoru:** Arka planda (backend) çalışan algoritma, seçilen kategoriye en uygun silüeti ve referans görseli saniyeler içinde eşleştirir.

---

## Teknik Mimari

Proje, sürdürülebilir ve ölçeklenebilir bir yapı için modüler bir hiyerarşiyle kurgulanmıştır:

### Frontend (Ön Yüz)
- **Teknoloji:** React / HTML5 & CSS3 (Dinamik ve akıcı arayüz).
- **Tasarım:** Canlı Renk Paleti (Pinterest Kırmızısı, Güneş Sarısı), Modern Gölgelendirmeler.
- **Kamera API:** Gerçek zamanlı silüet katmanı yönetimi.

### Backend (Arka Yüz)
- **Runtime:** Node.js (Express.js).
- **Servisler:** Pinterest API Entegrasyonu & Pose-to-Silhouette (Pozdan Silüete) eşleştirme algoritması.
- **Klasör Yapısı:** MVC (Model-View-Controller) mimarisi.

---

## Proje Yapısı

```text
/PoseGuide
├── /frontend
│   ├── /src/assets      # Silüetler (SVG/PNG), logolar ve ikonlar
│   ├── /src/components  # Tekrar kullanılabilir butonlar, kartlar ve kamera bileşenleri
│   ├── /src/pages       # Giriş Sayfası, Filtreleme Ekranı, Kamera Ekranı
│   ├── /src/services    # API bağlantıları (Pinterest & Backend)
│   └── /src/styles      # Global CSS ve canlı renk tanımları
│
└── /backend
    ├── /models          # Veri şemaları
    ├── /controllers     # Filtreleme ve eşleştirme mantığı
    └── /routes          # API uç noktaları

