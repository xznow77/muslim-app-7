import { db } from "./db";
import { adhkar, asmaUlHusna, islamicEvents } from "@shared/schema";

// أسماء الله الحسنى الـ99 كاملة مع الشرح الأصيل
const asmaData = [
  { order: 1, arabicName: "اللَّهُ", transliteration: "Allah", meaning: "الله", explanation: "الاسم الجامع لجميع صفات الكمال والجلال، وهو الاسم الأعظم", benefits: null, quranicReferences: ["البقرة: 255"] },
  { order: 2, arabicName: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "الرحمن", explanation: "ذو الرحمة الواسعة التي وسعت كل شيء", benefits: null, quranicReferences: ["الفاتحة: 3"] },
  { order: 3, arabicName: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "الرحيم", explanation: "ذو الرحمة الخاصة بالمؤمنين", benefits: null, quranicReferences: ["الفاتحة: 3"] },
  { order: 4, arabicName: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "الملك", explanation: "مالك الملك، له الملك كله", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 5, arabicName: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "القدوس", explanation: "المنزه عن كل عيب ونقص", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 6, arabicName: "السَّلاَمُ", transliteration: "As-Salaam", meaning: "السلام", explanation: "السالم من كل آفة والمسلم عباده", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 7, arabicName: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "المؤمن", explanation: "المصدق رسله بالمعجزات", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 8, arabicName: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "المهيمن", explanation: "الرقيب الحافظ لكل شيء", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 9, arabicName: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "العزيز", explanation: "الذي لا يُغلب ولا يُقهر", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 10, arabicName: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "الجبار", explanation: "الذي يجبر الضعفاء ويقهر الأقوياء", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 11, arabicName: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "المتكبر", explanation: "الذي له الكبرياء في ذاته وصفاته", benefits: null, quranicReferences: ["الحشر: 23"] },
  { order: 12, arabicName: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "الخالق", explanation: "الذي أوجد الأشياء من العدم", benefits: null, quranicReferences: ["الحشر: 24"] },
  { order: 13, arabicName: "الْبَارِئُ", transliteration: "Al-Bari", meaning: "البارئ", explanation: "الذي خلق الخلق بريئاً من التفاوت", benefits: null, quranicReferences: ["الحشر: 24"] },
  { order: 14, arabicName: "الْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "المصور", explanation: "الذي صور المخلوقات ورتبها", benefits: null, quranicReferences: ["الحشر: 24"] },
  { order: 15, arabicName: "الْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "الغفار", explanation: "الذي يغفر الذنوب مهما كثرت", benefits: null, quranicReferences: ["البقرة: 173"] },
  { order: 16, arabicName: "الْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "القهار", explanation: "الذي قهر كل شيء وخضع له كل شيء", benefits: null, quranicReferences: ["الرعد: 16"] },
  { order: 17, arabicName: "الْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "الوهاب", explanation: "الذي يعطي الهبات والعطايا", benefits: null, quranicReferences: ["آل عمران: 8"] },
  { order: 18, arabicName: "الرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "الرزاق", explanation: "الذي يرزق جميع المخلوقات", benefits: null, quranicReferences: ["الذاريات: 58"] },
  { order: 19, arabicName: "الْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "الفتاح", explanation: "الذي يفتح أبواب الرحمة والرزق", benefits: null, quranicReferences: ["سبأ: 26"] },
  { order: 20, arabicName: "اَلْعَلِيْمُ", transliteration: "Al-Alim", meaning: "العليم", explanation: "الذي يعلم كل شيء ظاهراً وباطناً", benefits: null, quranicReferences: ["البقرة: 158"] },
  { order: 21, arabicName: "الْقَابِضُ", transliteration: "Al-Qabid", meaning: "القابض", explanation: "الذي يقبض الأرزاق والأرواح", benefits: null, quranicReferences: null },
  { order: 22, arabicName: "الْبَاسِطُ", transliteration: "Al-Basit", meaning: "الباسط", explanation: "الذي يبسط الرزق والرحمة", benefits: null, quranicReferences: null },
  { order: 23, arabicName: "الْخَافِضُ", transliteration: "Al-Khafid", meaning: "الخافض", explanation: "الذي يخفض المتكبرين", benefits: null, quranicReferences: null },
  { order: 24, arabicName: "الرَّافِعُ", transliteration: "Ar-Rafi", meaning: "الرافع", explanation: "الذي يرفع المؤمنين بالطاعات", benefits: null, quranicReferences: null },
  { order: 25, arabicName: "الْمُعِزُّ", transliteration: "Al-Muizz", meaning: "المعز", explanation: "الذي يعز من يشاء من عباده", benefits: null, quranicReferences: ["آل عمران: 26"] },
  { order: 26, arabicName: "الْمُذِلُّ", transliteration: "Al-Mudhill", meaning: "المذل", explanation: "الذي يذل من يشاء من عباده", benefits: null, quranicReferences: ["آل عمران: 26"] },
  { order: 27, arabicName: "السَّمِيعُ", transliteration: "As-Sami", meaning: "السميع", explanation: "الذي يسمع جميع الأصوات", benefits: null, quranicReferences: ["البقرة: 127"] },
  { order: 28, arabicName: "الْبَصِيرُ", transliteration: "Al-Basir", meaning: "البصير", explanation: "الذي يرى جميع الموجودات", benefits: null, quranicReferences: ["الإسراء: 1"] },
  { order: 29, arabicName: "الْحَكَمُ", transliteration: "Al-Hakam", meaning: "الحكم", explanation: "الذي يحكم بين عباده بالعدل", benefits: null, quranicReferences: ["الأنعام: 114"] },
  { order: 30, arabicName: "الْعَدْلُ", transliteration: "Al-Adl", meaning: "العدل", explanation: "الذي لا يظلم أحداً", benefits: null, quranicReferences: null },
  { order: 31, arabicName: "اللَّطِيفُ", transliteration: "Al-Latif", meaning: "اللطيف", explanation: "الذي يعلم دقائق الأمور", benefits: null, quranicReferences: ["الملك: 14"] },
  { order: 32, arabicName: "الْخَبِيرُ", transliteration: "Al-Khabir", meaning: "الخبير", explanation: "الذي يعلم حقائق الأشياء", benefits: null, quranicReferences: ["الملك: 14"] },
  { order: 33, arabicName: "الْحَلِيمُ", transliteration: "Al-Halim", meaning: "الحليم", explanation: "الذي لا يعجل بالعقوبة", benefits: null, quranicReferences: ["البقرة: 225"] },
  { order: 34, arabicName: "الْعَظِيمُ", transliteration: "Al-Azim", meaning: "العظيم", explanation: "الذي له العظمة في كل شيء", benefits: null, quranicReferences: ["البقرة: 255"] },
  { order: 35, arabicName: "الْغَفُورُ", transliteration: "Al-Ghafur", meaning: "الغفور", explanation: "الذي يغفر الذنوب ويستر العيوب", benefits: null, quranicReferences: ["البقرة: 173"] },
  { order: 36, arabicName: "الشَّكُورُ", transliteration: "Ash-Shakur", meaning: "الشكور", explanation: "الذي يجازي على اليسير من الطاعة", benefits: null, quranicReferences: ["فاطر: 30"] },
  { order: 37, arabicName: "الْعَلِيُّ", transliteration: "Al-Ali", meaning: "العلي", explanation: "الذي علا فوق كل شيء", benefits: null, quranicReferences: ["البقرة: 255"] },
  { order: 38, arabicName: "الْكَبِيرُ", transliteration: "Al-Kabir", meaning: "الكبير", explanation: "الذي هو أكبر من كل شيء", benefits: null, quranicReferences: ["الحج: 62"] },
  { order: 39, arabicName: "الْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "الحفيظ", explanation: "الذي يحفظ أولياءه من المعاصي", benefits: null, quranicReferences: ["هود: 57"] },
  { order: 40, arabicName: "الْمُقيِتُ", transliteration: "Al-Muqit", meaning: "المقيت", explanation: "الذي يعطي أقوات الخلائق", benefits: null, quranicReferences: ["النساء: 85"] },
  { order: 41, arabicName: "الْحسِيبُ", transliteration: "Al-Hasib", meaning: "الحسيب", explanation: "الذي يحاسب العباد", benefits: null, quranicReferences: ["النساء: 6"] },
  { order: 42, arabicName: "الْجَلِيلُ", transliteration: "Al-Jalil", meaning: "الجليل", explanation: "الذي له صفة الجلال والعظمة", benefits: null, quranicReferences: ["الرحمن: 27"] },
  { order: 43, arabicName: "الْكَرِيمُ", transliteration: "Al-Karim", meaning: "الكريم", explanation: "الذي لا ينفد عطاؤه", benefits: null, quranicReferences: ["العلق: 3"] },
  { order: 44, arabicName: "الرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "الرقيب", explanation: "الذي يراقب أحوال العباد", benefits: null, quranicReferences: ["المائدة: 117"] },
  { order: 45, arabicName: "الْمُجِيبُ", transliteration: "Al-Mujib", meaning: "المجيب", explanation: "الذي يجيب دعاء من دعاه", benefits: null, quranicReferences: ["هود: 61"] },
  { order: 46, arabicName: "الْوَاسِعُ", transliteration: "Al-Wasi", meaning: "الواسع", explanation: "الذي وسع كل شيء رحمة وعلماً", benefits: null, quranicReferences: ["البقرة: 247"] },
  { order: 47, arabicName: "الْحَكِيمُ", transliteration: "Al-Hakim", meaning: "الحكيم", explanation: "الذي يضع الأشياء في مواضعها", benefits: null, quranicReferences: ["البقرة: 32"] },
  { order: 48, arabicName: "الْوَدُودُ", transliteration: "Al-Wadud", meaning: "الودود", explanation: "الذي يحب أولياءه ويحبونه", benefits: null, quranicReferences: ["البروج: 14"] },
  { order: 49, arabicName: "الْمَجِيدُ", transliteration: "Al-Majid", meaning: "المجيد", explanation: "الذي له المجد والشرف التام", benefits: null, quranicReferences: ["البروج: 15"] },
  { order: 50, arabicName: "الْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "الباعث", explanation: "الذي يبعث الموتى يوم القيامة", benefits: null, quranicReferences: ["الحج: 7"] },
  { order: 51, arabicName: "الشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "الشهيد", explanation: "الذي لا يغيب عنه شيء", benefits: null, quranicReferences: ["المائدة: 117"] },
  { order: 52, arabicName: "الْحَقُّ", transliteration: "Al-Haqq", meaning: "الحق", explanation: "الذي هو الثابت الذي لا شك فيه", benefits: null, quranicReferences: ["الحج: 6"] },
  { order: 53, arabicName: "الْوَكِيلُ", transliteration: "Al-Wakil", meaning: "الوكيل", explanation: "الذي توكل إليه الأمور", benefits: null, quranicReferences: ["آل عمران: 173"] },
  { order: 54, arabicName: "الْقَوِيُّ", transliteration: "Al-Qawi", meaning: "القوي", explanation: "الذي له القوة الكاملة", benefits: null, quranicReferences: ["الحج: 40"] },
  { order: 55, arabicName: "الْمَتِينُ", transliteration: "Al-Matin", meaning: "المتين", explanation: "الذي له القوة المحكمة الثابتة", benefits: null, quranicReferences: ["الذاريات: 58"] },
  { order: 56, arabicName: "الْوَلِيُّ", transliteration: "Al-Wali", meaning: "الولي", explanation: "الذي يتولى أمور خلقه", benefits: null, quranicReferences: ["البقرة: 257"] },
  { order: 57, arabicName: "الْحَمِيدُ", transliteration: "Al-Hamid", meaning: "الحميد", explanation: "الذي استحق الحمد بفعاله", benefits: null, quranicReferences: ["البقرة: 267"] },
  { order: 58, arabicName: "الْمُحْصِي", transliteration: "Al-Muhsi", meaning: "المحصي", explanation: "الذي أحصى كل شيء عدداً", benefits: null, quranicReferences: ["الجن: 28"] },
  { order: 59, arabicName: "الْمُبْدِئُ", transliteration: "Al-Mubdi", meaning: "المبدئ", explanation: "الذي بدأ خلق كل شيء", benefits: null, quranicReferences: ["يونس: 34"] },
  { order: 60, arabicName: "الْمُعِيدُ", transliteration: "Al-Muid", meaning: "المعيد", explanation: "الذي يعيد الخلق بعد الموت", benefits: null, quranicReferences: ["يونس: 34"] },
  { order: 61, arabicName: "الْمُحْيِي", transliteration: "Al-Muhyi", meaning: "المحيي", explanation: "الذي يحيي الموتى", benefits: null, quranicReferences: ["البقرة: 258"] },
  { order: 62, arabicName: "اَلْمُمِيتُ", transliteration: "Al-Mumit", meaning: "المميت", explanation: "الذي يميت الأحياء", benefits: null, quranicReferences: ["البقرة: 258"] },
  { order: 63, arabicName: "الْحَيُّ", transliteration: "Al-Hayy", meaning: "الحي", explanation: "الذي له الحياة الكاملة", benefits: null, quranicReferences: ["البقرة: 255"] },
  { order: 64, arabicName: "الْقَيُّومُ", transliteration: "Al-Qayyum", meaning: "القيوم", explanation: "القائم بتدبير خلقه", benefits: null, quranicReferences: ["البقرة: 255"] },
  { order: 65, arabicName: "الْوَاجِدُ", transliteration: "Al-Wajid", meaning: "الواجد", explanation: "الذي لا يعوزه شيء", benefits: null, quranicReferences: null },
  { order: 66, arabicName: "الْمَاجِدُ", transliteration: "Al-Majid", meaning: "الماجد", explanation: "الذي له المجد الأعظم", benefits: null, quranicReferences: null },
  { order: 67, arabicName: "الْواحِدُ", transliteration: "Al-Wahid", meaning: "الواحد", explanation: "الذي لا شريك له", benefits: null, quranicReferences: ["الرعد: 16"] },
  { order: 68, arabicName: "اَلاَحَدُ", transliteration: "Al-Ahad", meaning: "الأحد", explanation: "الذي لا يقبل التجزئة", benefits: null, quranicReferences: ["الإخلاص: 1"] },
  { order: 69, arabicName: "الصَّمَدُ", transliteration: "As-Samad", meaning: "الصمد", explanation: "الذي يُقصد في الحوائج", benefits: null, quranicReferences: ["الإخلاص: 2"] },
  { order: 70, arabicName: "الْقَادِرُ", transliteration: "Al-Qadir", meaning: "القادر", explanation: "الذي له القدرة على كل شيء", benefits: null, quranicReferences: ["الأنعام: 65"] },
  { order: 71, arabicName: "الْمُقْتَدِرُ", transliteration: "Al-Muqtadir", meaning: "المقتدر", explanation: "الذي له كمال القدرة", benefits: null, quranicReferences: ["الكهف: 45"] },
  { order: 72, arabicName: "الْمُقَدِّمُ", transliteration: "Al-Muqaddim", meaning: "المقدم", explanation: "الذي يقدم من يشاء", benefits: null, quranicReferences: null },
  { order: 73, arabicName: "الْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", meaning: "المؤخر", explanation: "الذي يؤخر من يشاء", benefits: null, quranicReferences: null },
  { order: 74, arabicName: "الأوَّلُ", transliteration: "Al-Awwal", meaning: "الأول", explanation: "الذي ليس قبله شيء", benefits: null, quranicReferences: ["الحديد: 3"] },
  { order: 75, arabicName: "الآخِرُ", transliteration: "Al-Akhir", meaning: "الآخر", explanation: "الذي ليس بعده شيء", benefits: null, quranicReferences: ["الحديد: 3"] },
  { order: 76, arabicName: "الظَّاهِرُ", transliteration: "Az-Zahir", meaning: "الظاهر", explanation: "الذي ظهر فوق كل شيء", benefits: null, quranicReferences: ["الحديد: 3"] },
  { order: 77, arabicName: "الْبَاطِنُ", transliteration: "Al-Batin", meaning: "الباطن", explanation: "الذي هو أقرب إلينا من حبل الوريد", benefits: null, quranicReferences: ["الحديد: 3"] },
  { order: 78, arabicName: "الْوَالِي", transliteration: "Al-Wali", meaning: "الوالي", explanation: "المالك للأشياء المتصرف فيها", benefits: null, quranicReferences: null },
  { order: 79, arabicName: "الْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "المتعالي", explanation: "الذي جل عن إفك المفترين", benefits: null, quranicReferences: ["الرعد: 9"] },
  { order: 80, arabicName: "الْبَرُّ", transliteration: "Al-Barr", meaning: "البر", explanation: "الذي يُحسن إلى خلقه", benefits: null, quranicReferences: ["الطور: 28"] },
  { order: 81, arabicName: "التَّوَابُ", transliteration: "At-Tawwab", meaning: "التواب", explanation: "الذي يتوب على من تاب", benefits: null, quranicReferences: ["البقرة: 37"] },
  { order: 82, arabicName: "الْمُنْتَقِمُ", transliteration: "Al-Muntaqim", meaning: "المنتقم", explanation: "الذي ينتقم من أعدائه", benefits: null, quranicReferences: ["المائدة: 95"] },
  { order: 83, arabicName: "العَفُوُّ", transliteration: "Al-Afuww", meaning: "العفو", explanation: "الذي يعفو عن السيئات", benefits: null, quranicReferences: ["النساء: 99"] },
  { order: 84, arabicName: "الرَّؤُوفُ", transliteration: "Ar-Ra'uf", meaning: "الرؤوف", explanation: "الذي رأفته أبلغ من الرحمة", benefits: null, quranicReferences: ["البقرة: 143"] },
  { order: 85, arabicName: "مَالِكُ الْمُلْكِ", transliteration: "Malik-ul-Mulk", meaning: "مالك الملك", explanation: "الذي يملك الملك وينزعه ممن يشاء", benefits: null, quranicReferences: ["آل عمران: 26"] },
  { order: 86, arabicName: "ذُوالْجَلاَلِ وَالإكْرَامِ", transliteration: "Dhul-Jalali-wal-Ikram", meaning: "ذو الجلال والإكرام", explanation: "الذي له الجلال والإكرام", benefits: null, quranicReferences: ["الرحمن: 27"] },
  { order: 87, arabicName: "الْمُقْسِطُ", transliteration: "Al-Muqsit", meaning: "المقسط", explanation: "الذي يقسط في حكمه فلا يظلم", benefits: null, quranicReferences: ["المائدة: 42"] },
  { order: 88, arabicName: "الْجَامِعُ", transliteration: "Al-Jami", meaning: "الجامع", explanation: "الذي يجمع الخلائق ليوم القيامة", benefits: null, quranicReferences: ["آل عمران: 9"] },
  { order: 89, arabicName: "الْغَنِيُّ", transliteration: "Al-Ghani", meaning: "الغني", explanation: "الذي لا يحتاج إلى أحد", benefits: null, quranicReferences: ["آل عمران: 97"] },
  { order: 90, arabicName: "الْمُغْنِي", transliteration: "Al-Mughni", meaning: "المغني", explanation: "الذي يغني من يشاء من خلقه", benefits: null, quranicReferences: ["النجم: 48"] },
  { order: 91, arabicName: "الْمَانِعُ", transliteration: "Al-Mani", meaning: "المانع", explanation: "الذي يمنع من أراد إهلاكه", benefits: null, quranicReferences: null },
  { order: 92, arabicName: "الضَّارَّ", transliteration: "Ad-Darr", meaning: "الضار", explanation: "الذي يقدر على الإضرار بمن أراد", benefits: null, quranicReferences: null },
  { order: 93, arabicName: "النَّافِعُ", transliteration: "An-Nafi", meaning: "النافع", explanation: "الذي ينفع من يشاء", benefits: null, quranicReferences: null },
  { order: 94, arabicName: "النُّورُ", transliteration: "An-Nur", meaning: "النور", explanation: "الذي نور السماوات والأرض", benefits: null, quranicReferences: ["النور: 35"] },
  { order: 95, arabicName: "الْهَادِي", transliteration: "Al-Hadi", meaning: "الهادي", explanation: "الذي يهدي من يشاء لدينه", benefits: null, quranicReferences: ["الحج: 54"] },
  { order: 96, arabicName: "الْبَدِيعُ", transliteration: "Al-Badi", meaning: "البديع", explanation: "الذي خلق الخلق لا على مثال", benefits: null, quranicReferences: ["البقرة: 117"] },
  { order: 97, arabicName: "الْبَاقِي", transliteration: "Al-Baqi", meaning: "الباقي", explanation: "الذي يبقى ولا يفنى", benefits: null, quranicReferences: ["الرحمن: 27"] },
  { order: 98, arabicName: "الْوَارِثُ", transliteration: "Al-Warith", meaning: "الوارث", explanation: "الذي يرث الأرض ومن عليها", benefits: null, quranicReferences: ["الحجر: 23"] },
  { order: 99, arabicName: "الرَّشِيدُ", transliteration: "Ar-Rashid", meaning: "الرشيد", explanation: "الذي أرشد الخلق إلى مصالحهم", benefits: null, quranicReferences: null }
];

// بيانات أصيلة للأذكار من حصن المسلم
const adhkarData = [
  {
    category: "morning",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shayin qadeer",
    translation: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    source: "أبو داود",
    repetitions: 1,
    benefits: "حفظ من الشياطين والمصائب",
    tags: ["صباح", "حفظ", "ذكر"]
  },
  {
    category: "morning",
    arabicText: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan nushur",
    translation: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور",
    source: "الترمذي",
    repetitions: 1,
    benefits: "تفويض الأمر إلى الله والتوكل عليه",
    tags: ["صباح", "توكل", "دعاء"]
  },
  {
    category: "evening",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shayin qadeer",
    translation: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    source: "أبو داود",
    repetitions: 1,
    benefits: "حفظ من الشياطين والمصائب",
    tags: ["مساء", "حفظ", "ذكر"]
  },
  {
    category: "after_prayer",
    arabicText: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhan Allah",
    translation: "سبحان الله",
    source: "البخاري ومسلم",
    repetitions: 33,
    benefits: "تسبيح الله وتنزيهه عن النقص",
    tags: ["تسبيح", "بعد_الصلاة"]
  },
  {
    category: "after_prayer",
    arabicText: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdu lillah",
    translation: "الحمد لله",
    source: "البخاري ومسلم",
    repetitions: 33,
    benefits: "حمد الله وشكره على نعمه",
    tags: ["حمد", "بعد_الصلاة"]
  },
  {
    category: "after_prayer",
    arabicText: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "الله أكبر",
    source: "البخاري ومسلم",
    repetitions: 34,
    benefits: "تكبير الله وإعلان عظمته",
    tags: ["تكبير", "بعد_الصلاة"]
  }
];

// أحداث إسلامية مهمة
const eventsData = [
  {
    title: "ليلة القدر",
    titleArabic: "لَيْلَةُ الْقَدْرِ",
    category: "رمضان",
    hijriDate: "27 رمضان",
    gregorianDate: null,
    description: "ليلة خير من ألف شهر، نزل فيها القرآن الكريم",
    significance: "ليلة عظيمة يستجاب فيها الدعاء وتتضاعف الحسنات",
    isRecurring: true
  },
  {
    title: "عيد الفطر",
    titleArabic: "عِيدُ الْفِطْرِ",
    category: "عيد",
    hijriDate: "1 شوال",
    gregorianDate: null,
    description: "عيد الفطر المبارك بعد انتهاء شهر رمضان",
    significance: "يوم فرح وسرور للمسلمين بعد إتمام صيام رمضان",
    isRecurring: true
  },
  {
    title: "عيد الأضحى",
    titleArabic: "عِيدُ الْأَضْحَى",
    category: "عيد",
    hijriDate: "10 ذو الحجة",
    gregorianDate: null,
    description: "عيد الأضحى المبارك في موسم الحج",
    significance: "يوم النحر والتضحية في سبيل الله تعالى",
    isRecurring: true
  }
];

export async function seedDatabase() {
  try {
    console.log("🌱 بدء زراعة البيانات في قاعدة البيانات...");

    // زراعة أسماء الله الحسنى
    console.log("📿 إضافة أسماء الله الحسنى...");
    for (const asma of asmaData) {
      await db.insert(asmaUlHusna).values(asma).onConflictDoNothing();
    }

    // زراعة الأذكار
    console.log("🤲 إضافة الأذكار الأصيلة...");
    for (const dhikr of adhkarData) {
      await db.insert(adhkar).values(dhikr).onConflictDoNothing();
    }

    // زراعة الأحداث الإسلامية
    console.log("📅 إضافة الأحداث الإسلامية...");
    for (const event of eventsData) {
      await db.insert(islamicEvents).values(event).onConflictDoNothing();
    }

    console.log("✅ تم إنجاز زراعة البيانات بنجاح!");

  } catch (error) {
    console.error("❌ خطأ في زراعة البيانات:", error);
    throw error;
  }
}

// تشغيل السكريبت إذا تم استدعاؤه مباشرة
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log("🎉 تم الانتهاء من إعداد قاعدة البيانات!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 فشل في إعداد قاعدة البيانات:", error);
      process.exit(1);
    });
}