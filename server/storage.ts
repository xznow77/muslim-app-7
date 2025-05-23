import { 
  adhkar,
  asmaUlHusna,
  quranVerses,
  prayerTimes,
  islamicEvents,
  userSettings,
  tasbihSessions,
  type Adhkar, 
  type InsertAdhkar,
  type AsmaUlHusna,
  type InsertAsmaUlHusna,
  type QuranVerse,
  type InsertQuranVerse,
  type PrayerTimes,
  type InsertPrayerTimes,
  type IslamicEvent,
  type InsertIslamicEvent,
  type UserSettings,
  type InsertUserSettings,
  type TasbihSession,
  type InsertTasbihSession
} from "@shared/schema";

export interface IStorage {
  // Adhkar
  getAdhkar(): Promise<Adhkar[]>;
  getAdhkarByCategory(category: string): Promise<Adhkar[]>;
  searchAdhkar(query: string): Promise<Adhkar[]>;
  getAdhkar(id: number): Promise<Adhkar | undefined>;
  createAdhkar(adhkar: InsertAdhkar): Promise<Adhkar>;

  // Asma ul Husna
  getAsmaUlHusna(): Promise<AsmaUlHusna[]>;
  getAsmaUlHusnaByOrder(order: number): Promise<AsmaUlHusna | undefined>;
  searchAsmaUlHusna(query: string): Promise<AsmaUlHusna[]>;

  // Quran
  getQuranVerses(): Promise<QuranVerse[]>;
  getQuranVersesBySurah(surahNumber: number): Promise<QuranVerse[]>;
  getQuranVerse(surahNumber: number, verseNumber: number): Promise<QuranVerse | undefined>;
  searchQuranVerses(query: string): Promise<QuranVerse[]>;

  // Prayer Times
  getPrayerTimes(city: string, date: string): Promise<PrayerTimes | undefined>;
  createPrayerTimes(prayerTimes: InsertPrayerTimes): Promise<PrayerTimes>;

  // Islamic Events
  getIslamicEvents(): Promise<IslamicEvent[]>;
  getIslamicEventsByDate(date: string): Promise<IslamicEvent[]>;
  getIslamicEventsByCategory(category: string): Promise<IslamicEvent[]>;

  // User Settings
  getUserSettings(userId: string): Promise<UserSettings | undefined>;
  createUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<UserSettings>;

  // Tasbih
  getTasbihSessions(userId: string): Promise<TasbihSession[]>;
  createTasbihSession(session: InsertTasbihSession): Promise<TasbihSession>;
  updateTasbihSession(id: number, updates: Partial<TasbihSession>): Promise<TasbihSession>;
}

export class MemStorage implements IStorage {
  private adhkarData: Map<number, Adhkar>;
  private asmaUlHusnaData: Map<number, AsmaUlHusna>;
  private quranVersesData: Map<string, QuranVerse>;
  private prayerTimesData: Map<string, PrayerTimes>;
  private islamicEventsData: Map<number, IslamicEvent>;
  private userSettingsData: Map<string, UserSettings>;
  private tasbihSessionsData: Map<number, TasbihSession>;
  private currentAdhkarId: number;
  private currentAsmaId: number;
  private currentVerseId: number;
  private currentEventId: number;
  private currentSessionId: number;

  constructor() {
    this.adhkarData = new Map();
    this.asmaUlHusnaData = new Map();
    this.quranVersesData = new Map();
    this.prayerTimesData = new Map();
    this.islamicEventsData = new Map();
    this.userSettingsData = new Map();
    this.tasbihSessionsData = new Map();
    this.currentAdhkarId = 1;
    this.currentAsmaId = 1;
    this.currentVerseId = 1;
    this.currentEventId = 1;
    this.currentSessionId = 1;
    this.initializeIslamicData();
  }

  private initializeIslamicData() {
    // Initialize Asma ul Husna (99 Beautiful Names of Allah)
    const asmaUlHusnaList: InsertAsmaUlHusna[] = [
      {
        order: 1,
        arabicName: "الرَّحْمَٰنُ",
        transliteration: "Ar-Rahman",
        meaning: "الرحيم الرؤوف",
        explanation: "هو الذي وسعت رحمته كل شيء، ورحمته عامة تشمل جميع المخلوقات في الدنيا والآخرة. وهو اسم مختص بالله تعالى لا يجوز أن يطلق على غيره.",
        benefits: "من دعا بهذا الاسم 100 مرة بعد كل صلاة فريضة، فتح الله عليه أبواب الرزق والرحمة",
        quranicReferences: ["الفاتحة:3", "البقرة:163", "الرحمن:1"]
      },
      {
        order: 2,
        arabicName: "الرَّحِيمُ",
        transliteration: "Ar-Raheem",
        meaning: "المتصف بالرحمة",
        explanation: "هو المنعم على عباده المؤمنين، وهو الذي يرحم عباده برحمة خاصة يوم القيامة، فيدخلهم الجنة ويضاعف لهم الحسنات.",
        benefits: "من أكثر من ذكر هذا الاسم رُزق الرحمة في قلبه والرأفة بالخلق",
        quranicReferences: ["الفاتحة:3", "البقرة:37", "النور:20"]
      },
      {
        order: 3,
        arabicName: "الْمَلِكُ",
        transliteration: "Al-Malik",
        meaning: "المالك المتصرف",
        explanation: "هو الملك الحق الذي له الملك، وله الحكم، وله الثناء الحسن، لا إله إلا هو، عليه توكلت وهو رب العرش العظيم.",
        benefits: "من أكثر من ذكره أعزه الله وأغناه عن الناس",
        quranicReferences: ["الحشر:23", "الملك:1", "آل عمران:26"]
      },
      {
        order: 4,
        arabicName: "الْقُدُّوسُ",
        transliteration: "Al-Quddus",
        meaning: "المنزه عن العيوب والنقائص",
        explanation: "هو الطاهر المنزه عن العيوب والأوصاف القبيحة، والمقدس المعظم الذي قدسته الملائكة المقربون وعظمته، وهو المنزه عن جميع صفات المخلوقين.",
        benefits: "من أكثر من ذكره طهر الله قلبه من الذنوب والمعاصي",
        quranicReferences: ["الحشر:23", "الجمعة:1"]
      },
      {
        order: 5,
        arabicName: "السَّلَامُ",
        transliteration: "As-Salaam",
        meaning: "السالم من العيوب",
        explanation: "هو السالم من جميع العيوب والآفات والنقائص، وهو الذي سلمت ذاته من النقص والعيب والفناء، وسلمت صفاته من كل عيب ونقص.",
        benefits: "من أكثر من ذكره سلمه الله من الآفات والبلايا",
        quranicReferences: ["الحشر:23"]
      }
    ];

    asmaUlHusnaList.forEach(asma => {
      const asmaItem: AsmaUlHusna = { ...asma, id: this.currentAsmaId++ };
      this.asmaUlHusnaData.set(asma.order, asmaItem);
    });

    // Initialize Adhkar (Daily Remembrance)
    const adhkarList: InsertAdhkar[] = [
      {
        arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir",
        translation: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        category: "morning",
        source: "صحيح مسلم",
        repetitions: 1,
        benefits: "من قال هذا الذكر في الصباح والمساء، كان حقاً على الله أن يرضيه يوم القيامة",
        tags: ["صباح", "ملك", "توحيد"]
      },
      {
        arabicText: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur",
        translation: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور",
        category: "morning",
        source: "سنن الترمذي",
        repetitions: 1,
        benefits: "ذكر يحفظ العبد في يومه ويبارك له في عمله",
        tags: ["صباح", "حياة", "موت"]
      },
      {
        arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir",
        translation: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        category: "evening",
        source: "صحيح مسلم",
        repetitions: 1,
        benefits: "من قال هذا الذكر في الصباح والمساء، كان حقاً على الله أن يرضيه يوم القيامة",
        tags: ["مساء", "ملك", "توحيد"]
      },
      {
        arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        transliteration: "Subhan Allah wa bihamdih",
        translation: "سبحان الله وبحمده",
        category: "general",
        source: "صحيح البخاري",
        repetitions: 100,
        benefits: "من قالها في يوم مائة مرة حُطت خطاياه وإن كانت مثل زبد البحر",
        tags: ["تسبيح", "حمد", "عام"]
      },
      {
        arabicText: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir",
        translation: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        category: "after_prayer",
        source: "صحيح البخاري",
        repetitions: 10,
        benefits: "من قالها عشر مرات بعد المغرب كانت له بكل واحدة عشر حسنات",
        tags: ["بعد الصلاة", "توحيد", "تهليل"]
      }
    ];

    adhkarList.forEach(dhikr => {
      const adhkarItem: Adhkar = { ...dhikr, id: this.currentAdhkarId++ };
      this.adhkarData.set(adhkarItem.id, adhkarItem);
    });

    // Initialize some Islamic events
    const islamicEventsList: InsertIslamicEvent[] = [
      {
        title: "ليلة القدر",
        titleArabic: "ليلة القدر",
        description: "ليلة خير من ألف شهر، تنزل فيها الملائكة والروح بإذن ربهم من كل أمر",
        hijriDate: "27 رمضان",
        category: "religious",
        significance: "ليلة مباركة يستجاب فيها الدعاء وتنزل فيها البركات",
        isRecurring: true
      },
      {
        title: "عيد الفطر",
        titleArabic: "عيد الفطر المبارك",
        description: "عيد المسلمين بعد انتهاء شهر رمضان المبارك",
        hijriDate: "1 شوال",
        category: "religious",
        significance: "يوم فرح وسرور للمسلمين بعد إتمام صيام رمضان",
        isRecurring: true
      },
      {
        title: "عيد الأضحى",
        titleArabic: "عيد الأضحى المبارك",
        description: "عيد الأضحى المبارك الذي يوافق يوم النحر في الحج",
        hijriDate: "10 ذو الحجة",
        category: "religious",
        significance: "عيد التضحية والفداء، ذكرى لقصة سيدنا إبراهيم وابنه إسماعيل",
        isRecurring: true
      }
    ];

    islamicEventsList.forEach(event => {
      const eventItem: IslamicEvent = { ...event, id: this.currentEventId++ };
      this.islamicEventsData.set(eventItem.id, eventItem);
    });
  }

  // Adhkar methods
  async getAdhkar(): Promise<Adhkar[]> {
    return Array.from(this.adhkarData.values());
  }

  async getAdhkarByCategory(category: string): Promise<Adhkar[]> {
    return Array.from(this.adhkarData.values()).filter(adhkar => adhkar.category === category);
  }

  async searchAdhkar(query: string): Promise<Adhkar[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.adhkarData.values()).filter(adhkar => 
      adhkar.arabicText.toLowerCase().includes(lowerQuery) ||
      adhkar.translation.toLowerCase().includes(lowerQuery) ||
      adhkar.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async getAdhkar(id: number): Promise<Adhkar | undefined> {
    return this.adhkarData.get(id);
  }

  async createAdhkar(insertAdhkar: InsertAdhkar): Promise<Adhkar> {
    const id = this.currentAdhkarId++;
    const adhkar: Adhkar = { ...insertAdhkar, id };
    this.adhkarData.set(id, adhkar);
    return adhkar;
  }

  // Asma ul Husna methods
  async getAsmaUlHusna(): Promise<AsmaUlHusna[]> {
    return Array.from(this.asmaUlHusnaData.values());
  }

  async getAsmaUlHusnaByOrder(order: number): Promise<AsmaUlHusna | undefined> {
    return this.asmaUlHusnaData.get(order);
  }

  async searchAsmaUlHusna(query: string): Promise<AsmaUlHusna[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.asmaUlHusnaData.values()).filter(asma => 
      asma.arabicName.toLowerCase().includes(lowerQuery) ||
      asma.transliteration.toLowerCase().includes(lowerQuery) ||
      asma.meaning.toLowerCase().includes(lowerQuery) ||
      asma.explanation.toLowerCase().includes(lowerQuery)
    );
  }

  // Quran methods
  async getQuranVerses(): Promise<QuranVerse[]> {
    return Array.from(this.quranVersesData.values());
  }

  async getQuranVersesBySurah(surahNumber: number): Promise<QuranVerse[]> {
    return Array.from(this.quranVersesData.values()).filter(verse => verse.surahNumber === surahNumber);
  }

  async getQuranVerse(surahNumber: number, verseNumber: number): Promise<QuranVerse | undefined> {
    const key = `${surahNumber}:${verseNumber}`;
    return this.quranVersesData.get(key);
  }

  async searchQuranVerses(query: string): Promise<QuranVerse[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.quranVersesData.values()).filter(verse => 
      verse.arabicText.toLowerCase().includes(lowerQuery) ||
      verse.translation.toLowerCase().includes(lowerQuery) ||
      verse.surahName.toLowerCase().includes(lowerQuery)
    );
  }

  // Prayer Times methods
  async getPrayerTimes(city: string, date: string): Promise<PrayerTimes | undefined> {
    const key = `${city}:${date}`;
    return this.prayerTimesData.get(key);
  }

  async createPrayerTimes(insertPrayerTimes: InsertPrayerTimes): Promise<PrayerTimes> {
    const id = Date.now(); // Simple ID generation
    const prayerTimes: PrayerTimes = { ...insertPrayerTimes, id };
    const key = `${prayerTimes.city}:${prayerTimes.date}`;
    this.prayerTimesData.set(key, prayerTimes);
    return prayerTimes;
  }

  // Islamic Events methods
  async getIslamicEvents(): Promise<IslamicEvent[]> {
    return Array.from(this.islamicEventsData.values());
  }

  async getIslamicEventsByDate(date: string): Promise<IslamicEvent[]> {
    return Array.from(this.islamicEventsData.values()).filter(event => event.hijriDate === date);
  }

  async getIslamicEventsByCategory(category: string): Promise<IslamicEvent[]> {
    return Array.from(this.islamicEventsData.values()).filter(event => event.category === category);
  }

  // User Settings methods
  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    return this.userSettingsData.get(userId);
  }

  async createUserSettings(insertSettings: InsertUserSettings): Promise<UserSettings> {
    const id = Date.now(); // Simple ID generation
    const settings: UserSettings = { ...insertSettings, id };
    this.userSettingsData.set(settings.userId, settings);
    return settings;
  }

  async updateUserSettings(userId: string, updates: Partial<UserSettings>): Promise<UserSettings> {
    const existing = this.userSettingsData.get(userId);
    if (!existing) {
      throw new Error("User settings not found");
    }
    const updated = { ...existing, ...updates };
    this.userSettingsData.set(userId, updated);
    return updated;
  }

  // Tasbih methods
  async getTasbihSessions(userId: string): Promise<TasbihSession[]> {
    return Array.from(this.tasbihSessionsData.values()).filter(session => session.userId === userId);
  }

  async createTasbihSession(insertSession: InsertTasbihSession): Promise<TasbihSession> {
    const id = this.currentSessionId++;
    const session: TasbihSession = { ...insertSession, id };
    this.tasbihSessionsData.set(id, session);
    return session;
  }

  async updateTasbihSession(id: number, updates: Partial<TasbihSession>): Promise<TasbihSession> {
    const existing = this.tasbihSessionsData.get(id);
    if (!existing) {
      throw new Error("Tasbih session not found");
    }
    const updated = { ...existing, ...updates };
    this.tasbihSessionsData.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
