# -*- coding: utf-8 -*-
"""Birinchi ishga tushirishda bazaga solinadigan namunaviy ma'lumotlar.
Barchasini admin paneldan o'zgartirish yoki o'chirish mumkin."""

SETTINGS = {
    "site_name": "Sinov Maydoni",
    "tagline": "Bilimingizni sinang, o‘sishingizni kuzating",
    "phone": "+998 90 000 00 00",
    "email": "info@example.uz",
    "address": "Toshkent shahri",
    "telegram": "https://t.me/",
    "working_hours": "Har kuni 09:00 dan 20:00 gacha",
    "footer_text": "Maktab o‘quvchilari va abituriyentlar uchun onlayn test maydoni.",
    "banner_enabled": "1",
    "banner_text": "Yangi testlar muntazam qo‘shib boriladi — bilimingizni sinab ko‘ring!",
    "banner_cta_text": "Testlarni ko‘rish",
    "banner_cta_url": "/testlar",
    "banner_target_date": "",
    "premium_enabled": "0",
    "about_text": (
        "Sinov Maydoni — bilimni tez va qulay tekshirish uchun yaratilgan onlayn test platformasi.\n\n"
        "Bu yerda fanlar bo‘yicha testlarni vaqt bilan yechish, natijani darhol ko‘rish, xatolar ustida ishlash "
        "va boshqa o‘quvchilar bilan reytingda solishtirish mumkin.\n\n"
        "Har bir savolga izoh berilgan: to‘g‘ri javob nima uchun to‘g‘ri ekani natija sahifasida ko‘rsatiladi. "
        "Belgilangan foizdan yuqori natija ko‘rsatgan foydalanuvchi sertifikat oladi."
    ),
    "registration_open": "1",
}

SUBJECTS = [
    # name, slug, icon, color, description
    ("Matematika", "matematika", "📐", "#1F4FB2", "Algebra, geometriya va mantiqiy masalalar."),
    ("Ona tili va adabiyot", "ona-tili", "🖋️", "#B4442C", "Grammatika, imlo va adabiyot bo‘yicha savollar."),
    ("Tarix", "tarix", "🏛️", "#8A5A12", "O‘zbekiston va jahon tarixidan asosiy voqealar."),
    ("Ingliz tili", "ingliz-tili", "🌐", "#0B7A75", "Grammatika, lug‘at va so‘z shakllari."),
    ("Biologiya", "biologiya", "🧬", "#2E7D32", "Hujayra, o‘simliklar va odam organizmi."),
    ("Kimyo", "kimyo", "⚗️", "#7B3FA0", "Elementlar, birikmalar va kimyoviy jarayonlar."),
    ("Fizika", "fizika", "⚡", "#C17900", "Mexanika, issiqlik va yorug‘lik asoslari."),
    ("Informatika", "informatika", "💻", "#3A4A6B", "Kompyuter savodxonligi va dasturlash asoslari."),
    ("Geografiya", "geografiya", "🌍", "#2E7D32", "Qit'alar, davlatlar, relyef va tabiiy hodisalar."),
    ("Rus tili", "rus-tili", "🇷🇺", "#B4442C", "Grammatika, lug'at va nutq shakllari."),
    ("Huquqshunoslik", "huquq", "⚖️", "#3A4A6B", "Konstitutsiya, fuqarolik va huquq asoslari."),
]

# (fan slug, sarlavha, tavsif, daqiqa, qiyinlik, o'tish foizi, [(savol, [4 variant], to'g'ri indeks, izoh)])
TESTS = [
    ("matematika", "Algebra asoslari",
     "Tenglamalar, foizlar, darajalar va progressiyalar bo‘yicha o‘n savol.", 15, "oson", 60, [
        ("3x + 7 = 22 tenglamada x nechaga teng?", ["3", "5", "7", "15"], 1, "3x = 22 − 7 = 15, demak x = 15 : 3 = 5."),
        ("240 sonining 15 foizini toping.", ["24", "30", "36", "40"], 2, "240 · 0,15 = 36."),
        ("Katetlari 3 va 4 bo‘lgan to‘g‘ri burchakli uchburchakning gipotenuzasi nechaga teng?", ["5", "6", "7", "12"], 0, "Pifagor teoremasi: √(3² + 4²) = √25 = 5."),
        ("(a + b)² ifodaning yoyilmasi qaysi javobda to‘g‘ri berilgan?", ["a² + b²", "a² + 2ab + b²", "a² − 2ab + b²", "2a + 2b"], 1, "Yig‘indining kvadrati: birinchining kvadrati, ikkilangan ko‘paytma va ikkinchining kvadrati yig‘indisi."),
        ("x² − 9 = 0 tenglamaning ildizlari qaysilar?", ["faqat 3", "faqat −3", "3 va −3", "9 va −9"], 2, "x² = 9 bo‘lgani uchun x = 3 yoki x = −3."),
        ("2⁵ nechaga teng?", ["10", "25", "32", "64"], 2, "2 · 2 · 2 · 2 · 2 = 32."),
        ("Arifmetik progressiyada a₁ = 2 va d = 3 bo‘lsa, a₅ nechaga teng?", ["11", "14", "17", "20"], 1, "a₅ = a₁ + 4d = 2 + 12 = 14."),
        ("Radiusi r bo‘lgan aylana uzunligi qaysi formula bilan topiladi?", ["πr²", "2πr", "πd²", "4πr"], 1, "Aylana uzunligi C = 2πr. πr² esa doira yuzi."),
        ("log₂ 8 nechaga teng?", ["2", "3", "4", "8"], 1, "2³ = 8 bo‘lgani uchun logarifm 3 ga teng."),
        ("Nechta uch xonali natural son bor?", ["899", "900", "999", "1000"], 1, "100 dan 999 gacha: 999 − 100 + 1 = 900 ta."),
     ]),
    ("tarix", "O‘zbekiston tarixidan boshlang‘ich savollar",
     "Buyuk allomalar, shaharlar va mustaqillik bilan bog‘liq sakkiz savol.", 12, "o‘rta", 60, [
        ("Amir Temur qaysi shahar yaqinida tug‘ilgan?", ["Buxoro", "Samarqand", "Shahrisabz (Kesh)", "Xiva"], 2, "Amir Temur 1336-yilda Kesh, ya’ni hozirgi Shahrisabz hududida tug‘ilgan."),
        ("O‘zbekiston Mustaqilligi bayrami qaysi sanada nishonlanadi?", ["1-sentabr", "8-dekabr", "21-mart", "9-may"], 0, "Mustaqillik 1991-yil 31-avgustda e’lon qilingan, bayram esa 1-sentabrda nishonlanadi."),
        ("“Algebra” fanining asoschisi hisoblangan buyuk vatandoshimiz kim?", ["Ibn Sino", "Muhammad al-Xorazmiy", "Abu Rayhon Beruniy", "Mirzo Ulug‘bek"], 1, "Al-Xorazmiyning “Al-jabr val-muqobala” asari algebra fanining nomi va asosini bergan."),
        ("Mirzo Ulug‘bek rasadxonasi qaysi shaharda qurilgan?", ["Toshkent", "Samarqand", "Farg‘ona", "Termiz"], 1, "Ulug‘bek rasadxonasi XV asrda Samarqandda qurilgan."),
        ("Buyuk Ipak yo‘li asosan nimalarni bog‘lagan?", ["Hindistonni Afrika bilan", "Xitoyni O‘rta yer dengizi mamlakatlari bilan", "Rossiyani Yaponiya bilan", "Amerikani Yevropa bilan"], 1, "Ipak yo‘li Sharq va G‘arb o‘rtasidagi savdo hamda madaniy aloqalar tarmog‘i bo‘lgan."),
        ("Ibn Sinoning mashhur tibbiyot asari qaysi?", ["Tib qonunlari", "Boburnoma", "Xamsa", "Zij"], 0, "“Tib qonunlari” asrlar davomida Yevropa va Sharqda tibbiyot darsligi bo‘lgan."),
        ("“Boburnoma” asarining muallifi kim?", ["Alisher Navoiy", "Zahiriddin Muhammad Bobur", "Amir Temur", "Mirzo Ulug‘bek"], 1, "“Boburnoma” — Zahiriddin Muhammad Boburning xotira-tarixiy asari."),
        ("Xivadagi qadimiy ichki qal’a qanday nomlanadi?", ["Ark", "Ichan-Qal’a", "Registon", "Shohi Zinda"], 1, "Ichan-Qal’a — Xiva shahrining ichki, devor bilan o‘ralgan qismi."),
     ]),
    ("ingliz-tili", "English Grammar: Elementary",
     "Sodda zamonlar, artikllar va ko‘plik shakllari bo‘yicha sakkiz savol.", 10, "oson", 60, [
        ("She ___ to school every day.", ["go", "goes", "going", "gone"], 1, "Present Simple zamonida he/she/it bilan fe’lga -s/-es qo‘shiladi."),
        ("Look! The children ___ in the yard now.", ["play", "plays", "are playing", "played"], 2, "“now” va “Look!” hozirgi davom etayotgan harakatni bildiradi: Present Continuous."),
        ("“Buy” fe’lining o‘tgan zamon shakli qaysi?", ["buyed", "bought", "boughten", "buys"], 1, "Buy — bought — bought (noto‘g‘ri fe’l)."),
        ("I eat ___ apple every day.", ["a", "an", "the", "—"], 1, "Unli tovush bilan boshlanadigan so‘z oldidan “an” ishlatiladi."),
        ("They ___ football yesterday.", ["play", "plays", "played", "playing"], 2, "“yesterday” — Past Simple: play + ed."),
        ("“Child” so‘zining ko‘pligi qaysi?", ["childs", "childes", "children", "childrens"], 2, "Child — children (noto‘g‘ri ko‘plik shakli)."),
        ("He is taller ___ his brother.", ["than", "then", "as", "that"], 0, "Qiyosiy darajada “than” (…dan) ishlatiladi."),
        ("If it rains tomorrow, we ___ at home.", ["stay", "stayed", "will stay", "would stayed"], 2, "Birinchi turdagi shartli gapda asosiy qismda will + fe’l ishlatiladi."),
     ]),
    ("informatika", "Kompyuter savodxonligi",
     "Qurilmalar, sanoq tizimlari va internet asoslari bo‘yicha sakkiz savol.", 10, "oson", 60, [
        ("CPU nimani anglatadi?", ["Markaziy protsessor", "Operativ xotira", "Video karta", "Qattiq disk"], 0, "CPU (Central Processing Unit) — kompyuterning markaziy protsessori."),
        ("1 bayt necha bitga teng?", ["2", "4", "8", "16"], 2, "1 bayt = 8 bit."),
        ("Quyidagilardan qaysi biri operatsion tizim?", ["Python", "Linux", "HTML", "Excel"], 1, "Linux — operatsion tizim. Python — dasturlash tili, HTML — belgilash tili, Excel — dastur."),
        ("HTML qisqartmasi nimani bildiradi?", ["HyperText Markup Language", "High Text Machine Language", "Home Tool Markup Language", "Hyperlink Text Making Level"], 0, "HTML — veb-sahifalarning tuzilishini yozish uchun ishlatiladigan belgilash tili."),
        ("Ikkilik sanoq tizimidagi 101 soni o‘nlik sanoq tizimida nechaga teng?", ["3", "4", "5", "6"], 2, "1·4 + 0·2 + 1·1 = 5."),
        ("Quyidagilardan qaysi biri chiqarish qurilmasi?", ["Klaviatura", "Sichqoncha", "Monitor", "Skaner"], 2, "Monitor ma’lumotni ekranga chiqaradi. Qolganlari kiritish qurilmalari."),
        ("“.jpg” kengaytmali fayl qanday turdagi fayl?", ["Matn", "Rasm", "Audio", "Dastur"], 1, "JPG (JPEG) — rasm formati."),
        ("Internetdagi sahifa manzili qanday ataladi?", ["URL", "CPU", "RAM", "BIOS"], 0, "URL — resursning internetdagi to‘liq manzili."),
     ]),
    ("biologiya", "Hujayra va odam organizmi",
     "Hujayra tuzilishi, fotosintez va qon aylanishi bo‘yicha oltita savol.", 8, "o‘rta", 60, [
        ("Hujayraning “energiya stansiyasi” deb qaysi organoid ataladi?", ["Yadro", "Mitoxondriya", "Ribosoma", "Vakuola"], 1, "Mitoxondriyada hujayra uchun zarur energiya (ATF) hosil bo‘ladi."),
        ("Fotosintez jarayonida o‘simlik atmosferaga qaysi gazni chiqaradi?", ["Karbonat angidrid", "Azot", "Kislorod", "Vodorod"], 2, "Fotosintezda CO₂ va suvdan glyukoza hamda kislorod hosil bo‘ladi."),
        ("DNK ning to‘liq nomi qaysi?", ["Dezoksiribonuklein kislota", "Ribonuklein kislota", "Aminokislota", "Adenozintrifosfat"], 0, "DNK — irsiy axborotni saqlovchi dezoksiribonuklein kislota."),
        ("Odam yuragida nechta kamera bor?", ["2", "3", "4", "5"], 2, "Yurak ikkita bo‘lmacha va ikkita qorinchadan iborat."),
        ("Qonda kislorodni tashuvchi hujayralar qaysilar?", ["Leykotsitlar", "Trombotsitlar", "Eritrotsitlar", "Limfotsitlar"], 2, "Eritrotsitlardagi gemoglobin kislorodni biriktirib tashiydi."),
        ("Odam tana hujayralarida odatda nechta xromosoma bo‘ladi?", ["23", "44", "46", "48"], 2, "Odamda 23 juft, ya’ni 46 ta xromosoma bor."),
     ]),
    ("kimyo", "Kimyo asoslari",
     "Formulalar, davriy jadval va muhit turlari bo‘yicha yetti savol.", 10, "oson", 60, [
        ("Suvning kimyoviy formulasi qaysi?", ["CO₂", "H₂O", "O₂", "NaCl"], 1, "Suv molekulasi ikkita vodorod va bitta kislorod atomidan iborat."),
        ("Osh tuzining kimyoviy formulasi qaysi?", ["KCl", "NaOH", "NaCl", "CaCO₃"], 2, "Osh tuzi — natriy xlorid (NaCl)."),
        ("Elementlar davriy jadvalini yaratgan olim kim?", ["D. I. Mendeleyev", "M. Lomonosov", "A. Lavuazye", "N. Bor"], 0, "Davriy qonun va jadval 1869-yilda Mendeleyev tomonidan taklif qilingan."),
        ("Kislorodning tartib raqami nechaga teng?", ["6", "7", "8", "16"], 2, "Kislorod (O) — 8-element, yadrosida 8 ta proton bor."),
        ("pH = 7 bo‘lgan eritma qanday muhitga ega?", ["Kislotali", "Neytral", "Ishqoriy", "Tuzli"], 1, "pH 7 — neytral muhit; 7 dan past kislotali, yuqori ishqoriy."),
        ("Vodorod atomi yadrosida nechta proton bor?", ["0", "1", "2", "3"], 1, "Vodorod — eng oddiy element, uning yadrosida bitta proton bor."),
        ("Eng yengil gaz qaysi?", ["Geliy", "Azot", "Vodorod", "Kislorod"], 2, "Vodorod — barcha gazlar ichida eng yengili."),
     ]),
    ("fizika", "Mexanika asoslari",
     "Kuch, tezlik, ish va quvvat tushunchalari bo‘yicha yetti savol.", 10, "o‘rta", 60, [
        ("Kuchning SI sistemasidagi birligi qaysi?", ["Joul", "Nyuton", "Vatt", "Paskal"], 1, "Kuch nyutonda (N) o‘lchanadi."),
        ("Erkin tushish tezlanishi taxminan nechaga teng?", ["1,6 m/s²", "9,8 m/s²", "98 m/s²", "3,0 m/s²"], 1, "Yer sirti yaqinida g ≈ 9,8 m/s²."),
        ("Yorug‘likning vakuumdagi tezligi taxminan qancha?", ["3 000 km/s", "30 000 km/s", "300 000 km/s", "3 000 000 km/s"], 2, "c ≈ 300 000 km/s."),
        ("Nyutonning ikkinchi qonuni qaysi formula bilan ifodalanadi?", ["F = ma", "E = mc²", "p = F/S", "A = Fs"], 0, "Jismga ta’sir etuvchi kuch massa va tezlanish ko‘paytmasiga teng."),
        ("Mexanik ishning SI dagi birligi qaysi?", ["Nyuton", "Vatt", "Joul", "Kelvin"], 2, "Ish va energiya joulda (J) o‘lchanadi."),
        ("Tekis harakatda tezlik qaysi formula bilan topiladi?", ["v = s · t", "v = s / t", "v = t / s", "v = s + t"], 1, "Tezlik bosib o‘tilgan yo‘lning vaqtga nisbatiga teng."),
        ("Quvvatning SI dagi birligi qaysi?", ["Vatt", "Joul", "Nyuton", "Om"], 0, "Quvvat vattda (W) o‘lchanadi."),
     ]),
    ("ona-tili", "Ona tili va adabiyot: umumiy savollar",
     "Grammatika va adabiyotdan oltita savol.", 8, "o‘rta", 60, [
        ("Alisher Navoiyning “Xamsa”si nechta dostondan iborat?", ["3", "4", "5", "7"], 2, "“Xamsa” — beshlik: besh doston."),
        ("“O‘tkan kunlar” romanining muallifi kim?", ["Cho‘lpon", "Abdulla Qodiriy", "Hamza Hakimzoda", "Oybek"], 1, "“O‘tkan kunlar” — Abdulla Qodiriyning o‘zbek adabiyotidagi birinchi romani."),
        ("Ot so‘z turkumi qanday so‘roqlarga javob beradi?", ["qanday?", "nima qildi?", "kim? nima?", "qancha?"], 2, "Ot shaxs yoki predmet nomini bildiradi va kim? nima? so‘rog‘iga javob bo‘ladi."),
        ("Sifat so‘z turkumi qanday so‘roqqa javob beradi?", ["kim?", "qanday?", "qancha?", "qayerda?"], 1, "Sifat predmetning belgisini bildiradi: qanday? qanaqa?"),
        ("Alisher Navoiyning fors tilidagi taxallusi qaysi?", ["Foniy", "Muqimiy", "Furqat", "Nodira"], 0, "Navoiy turkiyda “Navoiy”, forsiyda “Foniy” taxallusi bilan ijod qilgan."),
        ("Antonim (zid ma’noli) so‘zlar juftini toping.", ["katta — yirik", "issiq — sovuq", "yo‘l — sohil", "ko‘k — moviy"], 1, "Issiq va sovuq bir-biriga qarama-qarshi ma’noli so‘zlardir."),
     ]),
]

FAQ = [
    ("Testlarni yechish uchun ro‘yxatdan o‘tish shartmi?",
     "Testlarni ko‘rish va bosh sahifadagi namunaviy savolni yechish uchun ro‘yxatdan o‘tish shart emas. Natijani saqlash, reytingda qatnashish va sertifikat olish uchun hisob yaratish kerak."),
    ("Vaqt tugasa nima bo‘ladi?",
     "Test avtomatik yakunlanadi va shu paytgacha belgilangan javoblar hisoblanadi. Javoblar har bir tanlovdan so‘ng saqlab boriladi, shuning uchun internet uzilib qolsa ham natijangiz yo‘qolmaydi."),
    ("Testni qayta yechsam bo‘ladimi?",
     "Ha, istagancha. Reyting va statistikada har bir test bo‘yicha eng yaxshi natijangiz hisobga olinadi."),
    ("Sertifikatni qanday olaman?",
     "Test uchun belgilangan o‘tish foizidan yuqori natija ko‘rsatsangiz, natija sahifasida “Sertifikat” tugmasi paydo bo‘ladi. Uni chop etish yoki PDF sifatida saqlash mumkin."),
    ("Parolimni unutib qo‘ydim, nima qilaman?",
     "“Aloqa” sahifasi orqali foydalanuvchi nomingiz bilan administratorga yozing. Administrator yangi vaqtinchalik parol beradi, keyin uni profil sozlamalarida o‘zgartirishingiz mumkin."),
    ("Savollarni kim tayyorlaydi?",
     "Savollar administratorlar tomonidan kiritiladi va har biriga izoh biriktiriladi. Xato topsangiz, “Aloqa” orqali xabar bering."),
]

NEWS = [
    ("Platforma ishga tushdi",
     "Sinov Maydoni birinchi sakkiz fan bo‘yicha testlar bilan ochildi.",
     "Bugundan boshlab platformada matematika, tarix, ingliz tili, informatika, biologiya, kimyo, fizika va ona tili fanlaridan testlar mavjud.\n\n"
     "Har bir test vaqt bilan yechiladi, natija esa darhol ko‘rsatiladi. Xatolar ustida ishlash uchun natija sahifasida har bir savolga izoh keltirilgan.\n\n"
     "Yangi testlar muntazam qo‘shib boriladi."),
    ("Reyting qanday hisoblanadi?",
     "Reytingda har bir test bo‘yicha eng yaxshi natijangiz hisobga olinadi.",
     "Foydalanuvchining reyting balli — u yechgan har bir testdagi eng yaxshi foizlarning yig‘indisi.\n\n"
     "Bu shuni anglatadiki, bitta testni ko‘p marta yechish balni oshirmaydi, lekin yangi testlarni yechish oshiradi. "
     "Shuningdek, bir xil natija ko‘rsatgan foydalanuvchilar orasida tezroq yechgan yuqoriroq o‘rin oladi."),
]

REGIONS = [
    "Toshkent shahri", "Toshkent viloyati", "Andijon viloyati", "Buxoro viloyati",
    "Farg‘ona viloyati", "Jizzax viloyati", "Xorazm viloyati", "Namangan viloyati",
    "Navoiy viloyati", "Qashqadaryo viloyati", "Qoraqalpog‘iston Respublikasi",
    "Samarqand viloyati", "Sirdaryo viloyati", "Surxondaryo viloyati",
]

