# MINOS Evals tanıtım sitesi: brief

## Ne yapıyoruz
MINOS Evals için tanıtım sitesi. Ürün: kurumsal yapay zekâ asistanını **kaynak koduna dokunmadan** (dışarıdan, API üzerinden) test eden, cevapları kural ve LLM judge ile puanlayan, insana yalnızca belirsiz kalanları bırakan değerlendirme ve izleme katmanı.

## Hedef kitle ve amaç
- Kitle: kendi şirketinde dahili yapay zekâ asistanı olan (ya da kuracak olan) kişiler.
- Amaç: siteyi gören "bizim asistanımız için de böyle eval + observability yapalım" desin.
- Ana eylem yok, "sadece tanıt". İletişim bilgisi altta durur. Bilgi: iletişim e-postası henüz belli değil.

## Kesin kurallar
- Müşteri ve asistan adları sitede, metinde, örneklerde ve ekran görüntülerinde **geçmeyecek**. Sektörü ele veren ayrıntılar (özel araç adları, havayolu dili) de yok.
- Uydurma müşteri, yorum, benchmark, fiyat, lisans iddiası yok. Örnek veri "örnek" diye etiketli.
- "Black box" terimini kullanma. Güvenli ifade: **"kaynak kod gerekmez"**. Gerçekte gri kutuya yakın (cevap, süre, araç çağrıları, token görünür; üretilen dosyalar görünmez).
- "Her LLM'i test eder" deme. Yeni hedef sistem eklemek kod değişikliği ister.
- Metrik ağırlıkları ve 0.7 eşiği provisional: sayı olarak yayınlama.
- Dil: Türkçe ve İngilizce. Teknoloji: Next.js.

## Sitede anlatılacaklar
1. Sorun: test ekipleri soruları elle soruyor, cevapları elle notluyor.
2. Akış: vaka yaz (revizyonlu, değiştirilemez) → koşu başlat → cevap + araç çağrıları topla → puanla → insan yalnızca belirsizi etiketler → etiket sonraki koşulara taşınır → baseline ile karşılaştır.
3. Karar kuralı: judge metrik başına geçti/kaldı/bilinmiyor + kanıt yazar; nihai karar deterministik kuraldır. Kritik kanıt yoksa "geçti" değil `needs_review`. Ölçülemeyen metrik başarısız sayılmaz.
4. Judge modları: kapalı, öneri, otomatik.
5. Erişim kademeli: elle toplanan cevapları içe aktar → servis API'si → daha derin kayıtlar.
6. Veri güvenliği: cevaplar yalnızca müşterinin kendi modellerine gider, kodla zorlanır.

## Tasarım istekleri
- **AI slop olmasın:** mor gradyan, parlayan kenar, aynı boy ikon-kartlar, sahte istatistik, her bölümde aynı kaydırma animasyonu, ortalanmış jenerik hero yok.
- Çok iyi görünsün ama sade: tek font ailesi, az renk, bol boşluk, düz kısa metin, az ve anlamlı hareket.
- Hero'nun kendisi **gerçek ürün ekranı** (koşu sonucu ya da iz görünümü).
- Marka: logo iki yarılı (sol siyah, sağ kırmızı bıçak, ortada sap). Bu ikilik "geçti/kaldı" fikrine bağlanabilir. Kırmızı `#c8102e` (koyu modda `#ff5f6d`), logo renkleri `#1B1714` ve `#8F2A22`. Montserrat marka fontu ama siteyi bağlamaz.
- "Eski usul" isteği bırakıldı. Temalı yönler (fresk, sınav kâğıdı vb.) beğenilmedi.
- scroll-world (yapay zekâ videosu) ücretli olduğu için reddedildi.

## Durum
- Üç skill'in çıktısı `options2/` altında (`impeccable`, `taste-skill`, `ui-ux-pro-max`); hangisi seçildi **henüz belli değil**. Seçmeden önce gerçek malzeme gelecek.
- Skill'ler `.claude/skills/` altında kurulu: impeccable, taste-skill, ui-ux-pro-max, scroll-world (sonuncu kullanılmıyor).
- `PRODUCT.md` yazıldı.

## Repodan istenenler (repo tarafındaki Claude Code için)
1. Konsolun **3-4 gerçek ekran görüntüsü**: koşu sonucu, needs_review kuyruğu, iz (trace), run karşılaştırma. Müşteri ve asistan adları sansürlü ya da örnek veriyle.
2. **Logo dosyası**: yüksek çözünürlüklü SVG (tercihen), açık ve koyu zemin için.
3. Yukarıdaki "Sitede anlatılacaklar" maddelerinin **kodla doğrulanması**; yanlış ya da yayına uygun olmayan iddia varsa işaretle.
4. Açık kaynak mı, lisans, fiyatlandırma, iletişim e-postası: var mı, yayınlanabilir mi?
5. Gerçek, ama müşteriyi ele vermeyen bir örnek vaka (soru, referans, kriter, sonuç) ve örnek bir iz.
