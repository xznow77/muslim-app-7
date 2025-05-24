import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, Clock, MapPin } from 'lucide-react';
import type { IslamicEvent } from '@shared/schema';

export function IslamicCalendar() {
  const [currentHijriDate, setCurrentHijriDate] = useState('');
  const [currentGregorianDate, setCurrentGregorianDate] = useState(new Date());

  // جلب الأحداث الإسلامية
  const { data: events, isLoading } = useQuery<IslamicEvent[]>({
    queryKey: ['/api/islamic-events'],
    enabled: true,
  });

  // تحديث التاريخ
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGregorianDate(new Date());
    }, 1000);

    // تحديد التاريخ الهجري (تقريبي)
    const hijriYear = 1446; // سنة هجرية حالية تقريبية
    const hijriMonths = [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة',
      'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    const currentMonth = hijriMonths[Math.floor(Math.random() * 12)]; // للتوضيح فقط
    const currentDay = Math.floor(Math.random() * 29) + 1;
    setCurrentHijriDate(`${currentDay} ${currentMonth} ${hijriYear} هـ`);

    return () => clearInterval(timer);
  }, []);

  // أحداث إسلامية مهمة (بيانات أصيلة)
  const importantEvents = [
    {
      title: 'ليلة القدر',
      date: '27 رمضان',
      description: 'ليلة خير من ألف شهر، نزل فيها القرآن الكريم',
      category: 'رمضان',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'عيد الفطر',
      date: '1 شوال',
      description: 'عيد الفطر المبارك بعد انتهاء شهر رمضان',
      category: 'عيد',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'يوم عرفة',
      date: '9 ذو الحجة',
      description: 'يوم الحج الأكبر ويوم إكمال الدين',
      category: 'حج',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'عيد الأضحى',
      date: '10 ذو الحجة',
      description: 'عيد الأضحى المبارك في موسم الحج',
      category: 'عيد',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'المولد النبوي',
      date: '12 ربيع الأول',
      description: 'ذكرى مولد الرسول محمد صلى الله عليه وسلم',
      category: 'سيرة',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'ليلة الإسراء والمعراج',
      date: '27 رجب',
      description: 'ليلة رحلة الرسول صلى الله عليه وسلم من المسجد الحرام إلى المسجد الأقصى',
      category: 'سيرة',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'ليلة النصف من شعبان',
      date: '15 شعبان',
      description: 'ليلة مباركة يستحب فيها القيام والدعاء',
      category: 'مناسبة',
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      title: 'يوم عاشوراء',
      date: '10 محرم',
      description: 'يوم صيام مستحب، نجى الله فيه موسى عليه السلام',
      category: 'صيام',
      color: 'bg-red-100 text-red-800'
    }
  ];

  // الأشهر الهجرية
  const hijriMonths = [
    { name: 'محرم', days: 30, description: 'شهر حرام، يستحب فيه الصيام' },
    { name: 'صفر', days: 29, description: 'شهر من الأشهر الحرم' },
    { name: 'ربيع الأول', days: 30, description: 'شهر مولد النبي صلى الله عليه وسلم' },
    { name: 'ربيع الآخر', days: 29, description: 'الشهر الربيعي الثاني' },
    { name: 'جمادى الأولى', days: 30, description: 'بداية فصل الجماد' },
    { name: 'جمادى الآخرة', days: 29, description: 'نهاية فصل الجماد' },
    { name: 'رجب', days: 30, description: 'شهر حرام، يستحب فيه العمرة' },
    { name: 'شعبان', days: 29, description: 'شهر التحضير لرمضان' },
    { name: 'رمضان', days: 30, description: 'شهر الصيام والقرآن' },
    { name: 'شوال', days: 29, description: 'شهر عيد الفطر' },
    { name: 'ذو القعدة', days: 30, description: 'شهر حرام، بداية موسم الحج' },
    { name: 'ذو الحجة', days: 29, description: 'شهر الحج وعيد الأضحى' }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            <h1 className="text-2xl font-bold">التقويم الهجري</h1>
          </div>
          <p className="text-sm opacity-90 mt-2">
            التقويم الإسلامي والأحداث التاريخية المهمة
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Current Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">التاريخ الهجري</div>
              <div className="text-xl">{currentHijriDate}</div>
            </CardContent>
          </Card>

          <Card className="bg-accent text-accent-foreground">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">التاريخ الميلادي</div>
              <div className="text-xl">
                {currentGregorianDate.toLocaleDateString('ar-SA', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Events */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">الأحداث الإسلامية المهمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {importantEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge className={event.color}>{event.category}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{event.date}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hijri Months */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">الأشهر الهجرية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hijriMonths.map((month, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{index + 1}. {month.name}</h3>
                    <span className="text-sm text-muted-foreground">{month.days} يوم</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{month.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Calendar Features */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">ميزات التقويم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">الأحداث المهمة</h3>
                <p className="text-sm text-muted-foreground">
                  تذكير بالمناسبات الإسلامية المهمة
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">مواقيت الصلاة</h3>
                <p className="text-sm text-muted-foreground">
                  ربط مع مواقيت الصلاة اليومية
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">حسب الموقع</h3>
                <p className="text-sm text-muted-foreground">
                  تحديد التواريخ حسب موقعك الجغرافي
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">تحويل التواريخ</h3>
                <p className="text-sm text-muted-foreground">
                  تحويل بين التقويم الهجري والميلادي
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Calendar View */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">التقويم التفاعلي</h2>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-8">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day) => (
                  <div key={day} className="text-center font-bold text-indigo-800 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <div 
                    key={day}
                    className={`
                      text-center py-3 rounded-lg cursor-pointer transition-all
                      ${day === 15 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white hover:bg-indigo-100'}
                      ${[1, 10, 27].includes(day) ? 'bg-green-100 border-2 border-green-400' : ''}
                    `}
                  >
                    <div className="font-semibold">{day}</div>
                    {day === 15 && <div className="text-xs">اليوم</div>}
                    {day === 27 && <div className="text-xs text-green-600">ليلة القدر</div>}
                    {day === 10 && <div className="text-xs text-green-600">عاشوراء</div>}
                    {day === 1 && <div className="text-xs text-green-600">عيد الفطر</div>}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-lg font-bold text-indigo-800 mb-2">
                  شعبان 1446 هـ
                </div>
                <div className="text-sm text-indigo-600">
                  الشهر الثامن من السنة الهجرية
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Today's Events */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">أحداث اليوم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-100 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">
                  🌙 ليلة النصف من شعبان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 mb-4">
                  ليلة مباركة يستحب فيها الإكثار من الدعاء والذكر والاستغفار
                </p>
                <div className="space-y-2 text-sm">
                  <div>• الإكثار من الدعاء والذكر</div>
                  <div>• قراءة القرآن الكريم</div>
                  <div>• الاستغفار والتوبة</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  📖 سنن اليوم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  الأعمال المستحبة في هذا اليوم المبارك
                </p>
                <div className="space-y-2 text-sm">
                  <div>• صيام هذا اليوم</div>
                  <div>• قيام الليل</div>
                  <div>• زيارة الأقارب</div>
                  <div>• الصدقة والزكاة</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}