# MINOS Evals tanıtım sitesi: tasarım dokümanı

Tarih: 2026-11-06
Referans deneme: [`docs/superpowers/mocks/2026-11-06-tam-sayfa/index.html`](../mocks/2026-11-06-tam-sayfa/index.html). Bu atılacak bir denemedir, kodu üretime taşınmaz. Görünüm, hareket ve Türkçe metin için kaynak olarak kullanılır.

Bu doküman `BRIEF.md` ve `PRODUCT.md` ile birlikte okunur. Çelişki olursa bu doküman geçerlidir. Değişen maddeler "Brief'ten değişenler" bölümünde yazılıdır.

## Amaç

MINOS Evals, kurumsal yapay zekâ asistanını kaynak koduna dokunmadan dışarıdan test eden, cevapları kural ve LLM judge ile puanlayan, insana yalnızca belirsiz kalanları bırakan bir değerlendirme ve izleme katmanıdır.

Site bunu tanıtır. Hedef kitle, şirketinde dahili asistan olan ya da kuracak olan, teknik okuryazarlığı yüksek ve yapay zekâ iddialarına şüpheyle bakan kişilerdir. Başarı ölçütü: siteyi gören kişinin "bizim asistanımız için de böyle bir değerlendirme kuralım" demesidir. Site satış hunisi değildir, ana eylem yoktur, iletişim bilgisi en altta durur.

Sitenin fikri ismin kaynağından gelir. Platon'un *Gorgias* diyaloğunda (524a) ölüleri üç yargıç yargılar, diğer ikisi kararsız kalırsa son sözü Minos söyler. Üründe de önce kurallar ve LLM judge konuşur, belirsiz kalan cevap insana gelir.

## Hedefler

- Ziyaretçi ilk ekranda ürünün ne yaptığını ve neden farklı olduğunu anlar.
- Sayfa, gerçek bir resmin ağırlığını taşır ama sade kalır: tek font ailesi, az renk, bol boşluk, kısa düz metin.
- Sitenin tek hareketi akılda kalır: tablonun küçülüp menü barına yerleşmesi.
- Türkçe ve İngilizce yayınlanabilir.

## Hedef olmayanlar

- Satış, demo formu, fiyat, kayıt, ürün turu.
- Blog, doküman, çok sayfalı yapı.
- Ürünün ekran görüntüleri ya da ürün arayüzünün taklidi.

## Olursa başarısız sayılacaklar

- AI slop: mor gradyan, parlayan kenar, aynı boy ikon kartları, sahte istatistik, her bölümde aynı kaydırma animasyonu, ortalanmış jenerik hero.
- Çizilmiş ya da taklit fresk görünümü. Beğenilen şey gerçek resmin kendisidir, mitoloji süsü değildir.
- Bölüm başlıklarının üstüne küçük etiketler koymak, mit dilini teknik metne taşımak (yargıç, hüküm, kürsü gibi başlıklar).
- İlk ekranda göğsün alt kısmının görünmesi. Kurumsal okuyucu için tablo baş, omuz ve üst göğüs bölgesiyle sınırlı kalır.

## Kesin kurallar

`BRIEF.md`'den aynen geçerlidir:

- Müşteri ve asistan adları ile sektörü ele veren ayrıntılar hiçbir yerde geçmez.
- Uydurma müşteri, yorum, benchmark, fiyat, lisans iddiası yoktur. Örnek veri "Örnek" diye etiketlenir.
- "Black box" terimi kullanılmaz. Güvenli ifade "kaynak kod gerekmez" ya da "kaynak koduna dokunmadan" ifadesidir.
- "Her LLM'i test eder" denmez. Yeni hedef sistem eklemek kod değişikliği ister.
- Metrik ağırlıkları ve 0.7 eşiği sayı olarak yayınlanmaz.

## Kararlar

### Kullanıcının kararları

- Tema: Minos, gerçek tabloyla. Tablo arka plana karışır.
- Yön: "A · Karanlık" (figür karanlıktan çıkar).
- Tüm site koyu.
- Üründen ekran görüntüsü yok, site metin üzerine kurulu.
- İlk ekranda yazı tablonun sağında durur.
- Aşağı kaydırınca sekmeli menü barı yukarıda kalır, tablo küçülerek menü barının arka planına yerleşir.
- Minos hikâyesi kısa bir bölümde anlatılır, sitenin geri kalanı düz ve teknik yazılır.
- Sorun bölümü kullanıcının verdiği metinle yazılır ve ürünün sorunu olabildiğince deterministik hâle getirmeye çalıştığını söyler.
- Tablonun kaynak satırı sayfanın en altında durur.
- Teknoloji Next.js, diller Türkçe ve İngilizce (brief).

### Tasarımı yapanın kararları (değiştirilebilir)

- Başlık: "İki yargıç kararsız kalırsa, son söz sizin." ve sayfanın Türkçe metinleri.
- Font: Commissioner.
- Tek uzun sayfa, bölüm sırası ve "Neden Minos" sekmesi.
- Kapanışın tablonun kırmızı kumaşıyla yapılması.
- Tablodaki küçük hasarların rötuşlanması.
- Mobil davranış ve statik çıktı.

## Brief'ten değişenler

- "Hero'nun kendisi gerçek ürün ekranı" iptal. Yerine tablo ve metin geldi.
- "Repodan istenenler" 1. madde (ekran görüntüleri) ve 5. maddenin örnek iz kısmı artık gerekmiyor.
- `PRODUCT.md`'deki "old-school feel" satırı geçersizdir, `BRIEF.md` bunu bırakmıştır. Uygulama sırasında `PRODUCT.md` düzeltilir. Aynı dosyanın "illustrative sample data" notu artık yalnızca yazılı örnek vaka için geçerlidir.

## Sayfa yapısı

Tek sayfa. Türkçe metnin kaynağı referans denemedir, aynen kullanılır, doğrulama sonucu değişenler hariç. Sorun bölümünün metni denemede eskidir, güncel metin uygulama planındadır.

| Sıra | Bölüm | Sekme | İçerik |
|---|---|---|---|
| 1 | Hero | | Solda tablo, sağda başlık ve kısa açıklama. Düğme yok. |
| 2 | Sorun | | Klasik testlerin LLM uygulamalarında neden yetmediği: büyük başlık, kısa giriş, üç madde (birden çok geçerli cevap, koşudan koşuya değişen sonuç, her zaman haklı olmayan judge). Sonunda elle test gerçeği ve ürünün sorunu olabildiğince deterministik hâle getirmeye çalıştığı söylenir. |
| 3 | Nasıl çalışır | Nasıl çalışır | Yedi adımlı akış. Başlık solda sabit kalır, adımlar sağda akar. Numaralar sırayı gösterdiği için durur. İnsanın devreye girdiği 5. adım kırmızıdır. |
| 4 | Karar kuralı | Karar kuralı | Dört kısa cümle ve yanında yazılı "Örnek" vaka. |
| 5 | Neden Minos | Neden Minos | Büyük `ΜΙΝΩΣ` yazısı ve kısa Platon hikâyesi. |
| 6 | Judge modları | | Kapalı, öneri, otomatik. Üç eşit sütun, ikon yok. |
| 7 | Erişim | Erişim | Üç aşama, merdiven gibi girintili satırlar. |
| 8 | Veri güvenliği | Veri güvenliği | Büyük tek cümle ve kısa açıklama. |
| 9 | Kapanış | | Kırmızı kumaş zemin, tek cümle, e-posta, en altta kaynak satırı. |

Menü barının sağında TR / EN seçici durur. Aktif bölümün sekmesi kırmızı alt çizgiyle gösterilir. Sekmeye basınca sayfa o bölüme kayar, bölüm başlığı menü barının altında kalmaz.

## Tablonun hareketi

Sitenin tek imza hareketi budur. Referans denemedeki gibi çalışır. Hareket zamanlı değildir, kaydırmaya doğrudan bağlıdır: kullanıcı durunca durur, geri kaydırınca geri gelir.

İlerleme `p`, sayfanın en üstünde 0, kaydırma 0,8 ekran yüksekliğine ulaştığında 1 olur. Değerler 1440×900 için referans denemeden alınmıştır:

| Özellik | p = 0 (hero) | p = 1 (menü barı) |
|---|---|---|
| Tablo kabının yüksekliği | Ekran yüksekliği | Menü barı yüksekliği (84 px) |
| Tablonun ölçeği | 1 (genişlik 1080 px) | 0,78 |
| Tablonun konumu | x −70 px, y −24 px | x −98 px, y −160 px |
| Menü barı zemini | Saydam | Opak `#140c07`. Geçiş `p` 0,55 ile 0,85 arasında |
| Soldan koyu gölge | Yok | Var, marka adı okunsun diye. Geçiş `p` 0,4 ile 0,9 arasında |
| Hero metni | Görünür | `p` yaklaşık 0,36'da tamamen kaybolur |

Tablo her zaman sağa doğru zemine erir. Hero'da altta da erir, böylece göğsün alt kısmı görünmez. Bu erime resmin kendi oranlarına bağlıdır, ekran yüksekliğine değil. Aksi hâlde kısa ekranlarda göğüs açığa çıkar. Son durumda barda gözün olduğu şerit görünür, göz sağa, içeriğe doğru bakar.

Sistemde hareket azaltma tercihi açıksa ara kareler gösterilmez: üstteyken hero, kaydırılınca menü barı durumu görünür.

Başka kaydırma animasyonu eklenmez. Bölümler belirerek gelmez.

## Görsel sistem

| Rol | Değer |
|---|---|
| Zemin | `#140c07` |
| Metin | `#f3e9dd` |
| İkincil metin | `#cbbcaa` |
| Sönük metin | `#a08f7e` |
| Çizgi | `#33241a` |
| Vurgu | `#ff5f6d` (markanın koyu mod kırmızısı) |
| `ΜΙΝΩΣ` yazısı | `#8f5c39` |

Kırmızı yalnızca anlam taşıyan yerde kullanılır: insanın devreye girdiği adım, `needs_review`, aktif sekme.

Tek font ailesi Commissioner'dır. Türkçe karakterleri ve Yunan harflerini destekler. Başlıklarda `FLAR` ekseni 100 kullanılır, gövde metninde kullanılmaz. Font siteden sunulur, üçüncü taraf bağlantısı olmaz. Ağırlıklar ve boyutlar referans denemeden alınır. Hero başlığı 1440 genişlikte yaklaşık 62 px'tir.

Logo iki yarılıdır: sol bıçak `#1B1714`, sağ bıçak `#8F2A22`, ortada sap. Koyu zeminde beyaz karonun üstünde durur, rengi değiştirilmez. Denemedeki çizim geçicidir.

## Görseller ve lisans

- Kaynak fotoğraf: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mural_of_Minos_at_the_National_And_Kapodistrian_University_of_Athens_on_May_22,_2022.jpg), George E. Koronaios, CC BY-SA 4.0, 1387×2080.
- Duvar resmi: Carl Rahl ve Eduard Lebiedzki, Atina Üniversitesi cephesi, 19. yüzyıl.
- `minos-clean.jpg`: rötuşlanmış tablo. `minos-kumas.jpg`: kapanış için kırmızı kumaş kırpımı. İkisi de referans klasöründedir, `prep_mural.py` nasıl üretildiğini gösterir.
- Sayfanın en alt satırı: "Fotoğraf: George E. Koronaios, CC BY-SA 4.0, kırpıldı ve rötuşlandı. Duvar resmi: Carl Rahl ve Eduard Lebiedzki, Atina Üniversitesi." Lisans adı CC BY-SA 4.0 lisans metnine, fotoğraf adı Commons sayfasına bağlantı verir.
- Düzenlenmiş görseller de CC BY-SA 4.0 altındadır. Sitenin kodu ve metinleri bu lisansa dahil değildir (yaygın yorum, hukuki görüş değil).

## Diller

Türkçe `/`, İngilizce `/en` adresindedir. Tarayıcı diline göre otomatik yönlendirme yoktur. Dil seçici aynı bölümde kalır. `html lang` doğru ayarlanır, sayfalar birbirini `hreflang` ile gösterir.

İngilizce metin Türkçeden çevrilir, aynı düz dilde yazılır. Hero önerisi: "When two judges can't decide, the last word is yours." `needs_review`, `judge`, `baseline` iki dilde de aynen kalır.

## Mobil ve küçük ekranlar

- 1024 px ve üstü: referans denemedeki yan yana düzen.
- 1024 px altı: tablo üstte, baş ve omuz görünecek şekilde, metin onun altında. Tablo yine zemine erir ve kaydırınca menü barına çekilir.
- Küçük ekranda sekmeler menü barına sığmaz, tek bir menü düğmesi açılır listeye dönüşür. Dil seçici listede durur.
- Yan yana bölümler tek sütuna iner. `ΜΙΝΩΣ` yazısı ekrana sığacak şekilde küçülür, yatay kaydırma oluşmaz.
- Referans denemede kullanılan "her şey ekranla orantılı küçülür" yöntemi üretimde kullanılmaz. Gövde metni 16 px'in altına inmez.
- Çok geniş ekranlarda içerik büyümeyi durdurur. Tablo kaynak genişliğini (1387 px) belirgin biçimde aşmaz, yoksa bulanıklaşır.

## Erişilebilirlik ve performans

- WCAG AA: metin kontrastı en az 4,5:1, büyük metin en az 3:1. Klavye ile tüm sekmelere erişilir, odak halkası görünür.
- Tablo süs görseli olarak işaretlenir, sayfanın anlamı metinle taşınır. `ΜΙΝΩΣ` yazısı ekran okuyucudan gizlenir.
- Hero görseli öncelikli yüklenir ve WebP/AVIF sunulur. Hareket yalnızca `transform`, `opacity` ve tek bir kabın yüksekliğiyle yapılır, kaydırma sırasında takılma olmaz.
- Üçüncü taraf betik, analitik ya da çerez yoktur.

## Teknik

- Next.js, App Router, TypeScript. Tamamen statik çıktı, sunucu kodu yok. Böylece yayın yeri sonradan seçilebilir.
- Site deponun köküne kurulur. `options/` ve `options2/` silinmez, site koduna dahil edilmez.
- İçerik iki dil için tek bir içerik dosyasında tutulur, CMS yoktur.
- Her dil için sayfa başlığı ve açıklaması yazılır. Paylaşım görseli tablonun baş kırpımıdır.
- Depo henüz boştur, ilk commit yapılmamıştır. `.gitignore` eklenir ve `.superpowers/` ile araç klasörleri dışarıda bırakılır.
- Tasarım kuralları için `impeccable` kullanılır, bitişte kontrol aşamaları çalıştırılır. `taste-skill` denetleyicisi ve `ui-ux-pro-max` erişilebilirlik kuralları ek kontrol olarak kullanılabilir. Kuralları bu dokümanla çelişirse bu doküman geçerlidir. Örneğin `taste-skill`'in "her ekranda gerçek ürün göster" kuralı burada geçerli değildir.

## Yayından önce kapanması gerekenler

Bunlar inşayı durdurmaz, yayını durdurur. Site bu öğeler için yer tutucuyla kurulur.

1. **Metinlerin ürün koduyla doğrulanması.** Metinler `BRIEF.md` ve `PRODUCT.md`'den yazıldı. Özellikle: judge modlarının açıklamaları (kapalı modda neyin çalıştığı, otomatik modun karara etkisi), "iki yargıç" eşleşmesinin doğruluğu, toplanan veriler, "kodla zorlanır" iddiası, Sorun bölümündeki "kod kontrolleri her seferinde aynı çalışır" cümlesi.
2. **Gerçek logo dosyası.** Açık ve koyu zemin için SVG.
3. **İletişim e-postası.** Yoksa kapanıştaki bağlantı yayınlanmaz.
4. **İngilizce metnin gözden geçirilmesi.**
5. **Yazılı örnek vaka.** Denemedeki vaka uydurulmuş genel bir örnektir ve "Örnek" etiketlidir. Gerçek ama müşteriyi ele vermeyen bir vaka gelirse değiştirilir.
6. **Alan adı ve yayın yeri.** Henüz seçilmedi.

Açık kaynak, lisans ve fiyat konularında site hiçbir şey söylemez. Şirket adı ya da telif satırı da bilgi gelmeden eklenmez.

## İnşa edene bırakılanlar

- Next.js dosya yapısı, bileşen bölümlemesi, hareketin nasıl kodlanacağı (CSS kaydırma animasyonu ya da küçük bir betik).
- Küçük ekranlardaki boşluk ve punto ince ayarları.
- Görsellerin nihai boyutları ve sıkıştırma ayarları.
- İngilizce metnin ilk taslağı.
