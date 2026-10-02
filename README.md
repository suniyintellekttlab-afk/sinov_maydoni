# Sinov Maydoni — onlayn test platformasi (Python + Flask)

To'liq ishlaydigan test sayti: ro'yxatdan o'tish, fanlar, vaqtli testlar, natija tahlili,
reyting, sertifikat, yangiliklar, savol-javob, aloqa va **to'liq admin panel**.
Ma'lumotlar bazasi — SQLite (alohida o'rnatish shart emas).

## Tarkibi

| Bo'lim | Manzil |
|---|---|
| Bosh sahifa (namunaviy savol, fanlar, mashhur testlar, reyting, yangiliklar, FAQ) | `/` |
| Testlar katalogi (qidiruv, fan, qiyinlik, saralash) | `/testlar` |
| AI Ustoz (savol-javob yordamchisi) | `/ai-ustoz` |
| DTM simulyatsiyasi (aralash fanlardan mashq testi) | `/dtm-simulyatsiya` |
| Milliy sertifikat (norasmiy mashq testi) | `/milliy-sertifikat` |
| Test tafsiloti, eng yaxshi natijalar | `/testlar/<id>` |
| Test yechish (taymer, avtosaqlash, belgilash, klaviatura) | `/urinish/<id>` |
| Natija va savollar tahlili (izohlar bilan) | `/natija/<id>` |
| Sertifikat (chop etish/PDF) va tekshirish | `/sertifikat/<id>`, `/tekshirish/<id>` |
| Reyting (umumiy va fan bo'yicha) | `/reyting` |
| Profil, statistika, tarix, sozlamalar | `/profil`, `/profil/sozlamalar` |
| Kirish / ro'yxatdan o'tish | `/kirish`, `/royxatdan-otish` |
| Yangiliklar | `/yangiliklar` |
| Biz haqimizda, Savol-javob, Aloqa | `/biz-haqimizda`, `/savol-javob`, `/aloqa` |
| Admin panel | `/admin/` |
| Maktablar ro‘yxatini boshqarish | `/admin/maktablar` |

Admin panelda: boshqaruv paneli (statistika va grafik), fanlar, testlar, savollar
(bittalab, Excel (.xlsx) yuklash yoki matn orqali ommaviy import), foydalanuvchilar (bloklash, admin qilish, parolni tiklash),
natijalar (CSV yuklab olish), aloqa xabarlari, yangiliklar, savol-javob, o'tish ballari
(universitet qabul chegaralari), sayt sozlamalari.

## 1. Kompyuterda sinab ko'rish

```bash
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Brauzerda http://127.0.0.1:5000 ni oching.

Birinchi ishga tushirishda baza yaratiladi va namunaviy fanlar/testlar qo'shiladi.
**Admin login va paroli terminalga chiqadi** va `instance/admin_login.txt` fayliga yoziladi.
Parolni o'zingiz belgilamoqchi bo'lsangiz, birinchi ishga tushirishdan oldin:

```bash
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD=o-zingizning-parolingiz
```

Kirgandan so'ng `instance/admin_login.txt` faylini o'chiring.

## 2. Serverga qo'yish (Ubuntu + Nginx + Gunicorn)

Sertifikatdagi QR-kod telefon orqali ochilishi uchun server muhitida `PUBLIC_BASE_URL` ni
saytning hammaga ochiq HTTPS manziliga sozlang (masalan, `https://example.uz`). Lokal
ishlab chiqishda bu o'zgaruvchi bo'lmasa, QR joriy host manziliga tuziladi.

```bash
sudo apt update && sudo apt install -y python3-venv nginx
sudo mkdir -p /var/www/sinov_maydoni
# loyiha fayllarini shu papkaga ko'chiring, so'ng:
cd /var/www/sinov_maydoni
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
sudo chown -R www-data:www-data /var/www/sinov_maydoni

# Gunicorn xizmati
sudo cp deploy/sinov.service /etc/systemd/system/sinov.service
sudo systemctl daemon-reload
sudo systemctl enable --now sinov
sudo journalctl -u sinov -n 30      # admin paroli shu yerda ko'rinadi (yoki instance/admin_login.txt)

# Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/sinov
sudo nano /etc/nginx/sites-available/sinov      # server_name ga domeningizni yozing
sudo ln -s /etc/nginx/sites-available/sinov /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# HTTPS (bepul sertifikat)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.uz -d www.example.uz
```

HTTPS yoqilgach `sinov.service` dagi `COOKIE_SECURE=1` sozlamasi cookie'larni faqat
xavfsiz ulanishda yuboradi. Agar hozircha faqat http ishlatayotgan bo'lsangiz, bu qatorni
vaqtincha olib tashlang, aks holda tizimga kirib bo'lmaydi.

## 3. Savollarni Excel orqali import qilish

Har bir test sahifasida (Admin → Testlar va savollar → shu test → Savollar) endi
**"Excel (.xlsx) orqali import qilish"** bo'limi bor:

1. "Shablonni yuklab olish" tugmasi orqali tayyor `.xlsx` faylni oling.
2. Uni Excel yoki Google Sheets'da to'ldiring — ustunlar: **Savol, A, B, C, D,
   To'g'ri javob (A/B/C/D), Izoh** (izoh ustuni ixtiyoriy). Birinchi (sarlavha) qatorni
   o'chirmang.
3. To'ldirilgan faylni shu yerga qayta yuklang — savollar avtomatik qo'shiladi.

Bir martada 500 tagacha savol qabul qilinadi. Xato qatorlar (bo'sh variant, noto'g'ri
javob harfi va h.k.) alohida ko'rsatiladi va import qilinmaydi — qolgan to'g'ri qatorlar
baribir qo'shiladi. Matn orqali (`|` belgisi bilan ajratilgan) ommaviy import ham
avvalgidek ishlayveradi, ikkalasini ham xohlagancha ishlatishingiz mumkin.

## 4. AI Ustoz, DTM simulyatsiya, Milliy sertifikat

* **AI Ustoz** (`/ai-ustoz`) — sun'iy intellekt yordamida savol-javob. Ishlashi uchun
  OpenAI-mos API kaliti kerak (OpenAI, yoki OpenAI protokoliga mos boshqa xizmat —
  masalan Groq, Together, DeepSeek). Eng qulay yo'l — `.env` fayli:

  1. `.env.example` faylini nusxalab, nomini `.env` ga o'zgartiring (u `app.py` bilan
     bir papkada turishi kerak).
  2. Faylni oching va `AI_API_KEY=` qatoriga API kalitingizni yozing:
     ```
     AI_API_KEY=sk-...sizning-kalitingiz...
     ```
  3. Boshqa provayder ishlatsangiz, `AI_BASE_URL` va `AI_MODEL` qatorlarini ham
     o'sha provayderga mos qiling (aks holda standart OpenAI manzili ishlatiladi).
  4. Serverni (`python app.py`) qayta ishga tushiring — o'zgartirishlar avtomatik o'qiladi.

  Xohlasangiz, `.env` o'rniga muhit o'zgaruvchisi sifatida ham berish mumkin
  (masalan systemd xizmatida, `deploy/sinov.service` faylida namuna bor):
  ```bash
  export AI_API_KEY="sk-..."
  export AI_BASE_URL="https://api.openai.com/v1"   # ixtiyoriy, standart shu
  export AI_MODEL="gpt-4o-mini"                     # ixtiyoriy, standart shu
  ```
  Haqiqiy muhit o'zgaruvchisi har doim `.env` faylidan ustun turadi.

  `AI_API_KEY` bo'lmasa, sahifa ochiladi, lekin "hali sozlanmagan" degan xabar chiqadi va
  yozish o'chirilgan bo'ladi — sayt boshqa hech nima buzilmaydi. **Diqqat:** bu tashqi
  xizmatga har bir xabar uchun to'lov (yoki limit) bo'lishi mumkin — foydalanuvchilar sonini
  va xarajatni nazorat qiling (yuboriladigan xabarlar allaqachon 1 daqiqada ~12 ta bilan
  cheklangan). **`.env` faylini hech qachon boshqalarga yubormang yoki ommaviy joyga
  (masalan GitHub'ga ochiq repo) yuklamang** — u maxfiy kalitingizni o'z ichiga oladi.

* **DTM simulyatsiyasi** (`/dtm-simulyatsiya`) va **Milliy sertifikat** (`/milliy-sertifikat`) —
  foydalanuvchi bir nechta fan tanlaganda, shu fanlardan tasodifiy savollar birlashtirilib,
  yangi vaqtli test avtomatik yaratiladi va odatdagi test yechish oqimi orqali ishlaydi
  (natija, sertifikat va hokazo — hammasi ishlaydi). **Bular platformaning o'z ichidagi
  norasmiy mashq testlari — davlat tomonidan tan olingan rasmiy DTM yoki Milliy sertifikat
  emas.** Buni foydalanuvchilarga aniq tushuntirib turish kerak (sahifalarda ogohlantirish
  matni allaqachon bor).
* Har bir simulyatsiya generatsiyasi bazada yangi (yashirin) test va savol nusxalari
  yaratadi — vaqt o'tishi bilan bular ko'payib boradi. Katta foydalanuvchi oqimida bazani
  vaqti-vaqti bilan tozalash uchun (masalan, 90 kundan eski, hech qachon yakunlanmagan
  urinishlarga tegishli testlarni o'chirish) alohida texnik xizmat skripti yozib olishni
  tavsiya qilamiz.
* **DTM 1-fan/2-fan juftliklari** `app.py` faylidagi `DTM_PAIRS` lug'atida qat'iy
  belgilangan (haqiqiy DTM tuzilishiga mos). Yangi yo'nalish qo'shish uchun shu joyga
  yozing — kodni tahrirlash kerak, admin panelda emas.

## 5. DTM natija sahifasi, XP, Premium va referal

**DTM natija sahifasi** (DTM simulyatsiyasi yakunlangач):

* **Ball taqsimoti** — 1-fan / 2-fan / majburiy fanlar bo'yicha alohida.
* **Universitetlarga kirish maslahati** — Admin → "O'tish ballari" bo'limida kiritilgan
  **real o'tish ballari** yillar bo'yicha ko'rsatiladi (masalan: 2024 — 80, 2025 — 70, o'zgarish
  ▼10). Bir yo'nalish uchun har yilni alohida qator qilib qo'shasiz. Foydalanuvchi natijasi
  bilan formula orqali solishtirilmaydi — faqat haqiqiy tarix ko'rsatiladi.
* **Mavzular bo'yicha tahlil** — faqat savollarga "Mavzu" yorlig'i berilgan bo'lsa chiqadi
  (bittalab, Excel yoki matn import — hammasida ixtiyoriy "Mavzu" ustuni bor).
* **AI Ustozdan tahlil olish** tugmasi — `AI_API_KEY` sozlangan bo'lsa ko'rinadi.

**XP:** har bir yakunlangan testdan `to'g'ri javoblar × 10` XP, testdan o'tilsa yana `+30`.
Natija sahifasida ("⚡ +160 XP") va profilda umumiy XP ko'rinadi.

**Premium (hozircha o'chiq — hammasi bepul):**

* Admin → Sayt sozlamalari → "Premium cheklovlarini yoqish". **O'chiq** bo'lsa (standart)
  hamma narsa hammaga ochiq. **Yoqilsa**, hozircha AI Ustoz va AI natija tahlili faqat Premium
  foydalanuvchi va adminlarga ochiq bo'ladi (`has_premium_access()` funksiyasi — yangi
  cheklovlarni shu orqali qo'shasiz).
* To'lov (pul olish) tizimi **hali ulanmagan** — Premium hozircha faqat referal orqali beriladi.
  To'lov tizimi (Click, Payme va h.k.) keyinroq alohida ulanadi.
* `/premium` sahifasi imkoniyatlarni tushuntiradi.

**Referal:** har bir foydalanuvchining shaxsiy havolasi bor (`/royxatdan-otish?ref=KOD`) —
profil va Premium sahifasida ko'rinadi, "Telegramda ulashish" tugmasi bilan. Havola orqali
do'sti ro'yxatdan o'tsa, taklif qilgan foydalanuvchiga **7 kunlik Premium** qo'shiladi
(har bir do'st uchun ustma-ust). Premium kunlar to'planib boradi, gating yoqilgach ishlaydi.

## 6. Muhim eslatmalar

* **Zaxira nusxa:** butun ma'lumot `instance/sinov.db` faylida. Uni muntazam nusxalab turing:
  `sqlite3 instance/sinov.db ".backup '/backup/sinov-$(date +%F).db'"`
* **SECRET_KEY** avtomatik yaratiladi va `instance/secret_key` da saqlanadi. O'chirmang.
* **Shriftlar** (Manrope, Unbounded) Google Fonts orqali yuklanadi. Internet bo'lmasa, tizim
  shriftlari ishlatiladi va sayt baribir to'g'ri ishlaydi.
* **Parolni unutgan foydalanuvchi:** Admin → Foydalanuvchilar → "Parolni tiklash".
* Kirish va aloqa formalaridagi urinishlar cheklovi har bir Gunicorn jarayoni ichida hisoblanadi.
* Fanlar, testlar, savollar, matnlar, ranglar (fan rangi), aloqa ma'lumotlari — hammasi admin
  paneldan o'zgartiriladi. Sayt umumiy dizayni `static/css/style.css` faylining boshidagi
  `:root` bo'limida (ranglar va shriftlar) joylashgan.
* **Til almashtirgich** (UZ/RU/ЎЗ) faqat menyu, tugmalar va footer matnlarini tarjima qiladi;
  test savollari va admin panel hozircha faqat o'zbek tilida.
* **Kunduzgi/tungi rejim** foydalanuvchi brauzerida saqlanadi (localStorage), serverga
  bog'liq emas.

## Fayllar tuzilmasi

```
app.py            — barcha yo'nalishlar va mantiq
seed_data.py      — namunaviy fanlar, testlar, savollar, FAQ, yangiliklar
templates/        — HTML shablonlar (admin/ papkasida admin sahifalari)
static/css        — dizayn
static/js         — test yechish, namunaviy savol va boshqa skriptlar

deploy/           — nginx va systemd sozlamalari
instance/         — baza, maxfiy kalit (avtomatik yaratiladi)
```

