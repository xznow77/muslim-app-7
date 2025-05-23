import { db } from "./db";
import { adhkar, asmaUlHusna, islamicEvents } from "@shared/schema";

// بيانات أصيلة لأسماء الله الحسنى
const asmaData = [
  {
    order: 1,
    arabicName: "اللَّهُ",
    transliteration: "Allah",
    meaning: "الله",
    explanation: "الاسم الجامع لجميع صفات الكمال والجلال، وهو الاسم الأعظم الذي تفرد به الحق سبحانه وتعالى",
    benefits: "الدعاء باسم الله يجلب البركة والهداية والرحمة",
    quranicReferences: ["البقرة: 255", "الإخلاص: 1"]
  },
  {
    order: 2,
    arabicName: "الرَّحْمَنُ",
    transliteration: "Ar-Rahman",
    meaning: "الرحمن",
    explanation: "ذو الرحمة الواسعة التي وسعت كل شيء في الدنيا والآخرة",
    benefits: "يجلب الرحمة والرأفة من الله تعالى",
    quranicReferences: ["الفاتحة: 3", "الرحمن: 1"]
  },
  {
    order: 3,
    arabicName: "الرَّحِيمُ",
    transliteration: "Ar-Raheem",
    meaning: "الرحيم",
    explanation: "ذو الرحمة للمؤمنين يوم القيامة، رحمة خاصة بعباده المؤمنين",
    benefits: "يستجلب رحمة الله الخاصة في الآخرة",
    quranicReferences: ["الفاتحة: 3", "البقرة: 37"]
  }
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