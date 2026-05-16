 PoseGuide: Mükemmel Pozun Akıllı Rehberi
 Pinterest estetiği ile kamera teknolojisini birleştiren, kullanıcıların her ortamda en iyi kareyi yakalamasını sağlayan Full-Stack bir poz asistanıdır. Sadece bir fotoğraf uygulaması değil, aynı zamanda kişisel bir fotoğrafçılık rehberidir.
 Temel Özellikler

Pinterest Akıllı Filtreleme:** Ortam (Kafe, Sokak, Sahil), Kişi Sayısı ve Samimiyet Seviyesine (Arkadaş, Sevgili, Aile, İş Arkadaşı) göre Pinterest tabanlı anlık poz önerileri.
Canlı Silüet Rehberliği (Ghost Mode):** Seçilen pozu şeffaf bir katman (overlay) olarak kamera ekranına yansıtarak kullanıcının doğru açıyı bulmasını sağlar.
Dinamik Görsel Keşif: Uygulama girişi, fotoğrafçılık dünyasından 15-20 adet canlı ve ilham verici görselden oluşan "Masonry Grid" kolajıyla kullanıcıyı karşılar.
Akıllı Eşleştirme Motoru:** Backend katmanında çalışan mantık sayesinde seçilen kategoriye en uygun silüet ve görseli saniyeler içinde sunar.

 Teknik Mimari

Proje, sürdürülebilir ve ölçeklenebilir bir yapı için modüler bir hiyerarşiyle kurgulanmıştır:

Frontend
- Teknoloji: React / Vanilla JS (Hızlı ve etkileşimli arayüz).
- Tasarım: Canlı Renk Paleti (Pinterest Kırmızısı, Güneş Sarısı), Modern Gölgelendirmeler.
- Kamera API: Gerçek zamanlı overlay katman yönetimi.

Backend
- Runtime: Node.js (Express.js).
- Servisler:Pinterest API Entegrasyonu & Pose-to-Silhouette (Pozdan Silüete) eşleştirme algoritması.
- Klasör Yapısı: MVC (Model-View-Controller) mimarisi.

 Proje Yapısı

```text
/PoseGuide
├── /frontend
│   ├── /src/assets      # Silüetler (SVG/PNG), logolar ve ikonlar
│   ├── /src/components  # Reusable butonlar, kartlar ve kamera bileşenleri
│   ├── /src/pages       # Giriş Sayfası, Filtreleme Ekranı, Kamera Ekranı
│   ├── /src/services    # API bağlantıları (Pinterest & Backend)
│   └── /src/styles      # Global CSS ve canlı renk tanımları
│
└── /backend
    ├── /models          # Veri şemaları
    ├── /controllers     # Filtreleme ve eşleştirme mantığı
    └── /routes          # API uç noktaları

