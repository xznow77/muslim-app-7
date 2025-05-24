import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, Calendar, Bell } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

export function PrayerTimes() {
  const [city, setCity] = useState('الرياض');
  const [country, setCountry] = useState('السعودية');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب مواقيت الصلاة من API
  const fetchPrayerTimes = async () => {
    setLoading(true);
    try {
      // استخدام Aladhan API المجاني الموثوق
      const response = await fetch(
        `http://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=4`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        const timings = data.data.timings;
        setPrayerTimes([
          { name: 'Fajr', time: timings.Fajr, arabicName: 'الفجر' },
          { name: 'Sunrise', time: timings.Sunrise, arabicName: 'الشروق' },
          { name: 'Dhuhr', time: timings.Dhuhr, arabicName: 'الظهر' },
          { name: 'Asr', time: timings.Asr, arabicName: 'العصر' },
          { name: 'Maghrib', time: timings.Maghrib, arabicName: 'المغرب' },
          { name: 'Isha', time: timings.Isha, arabicName: 'العشاء' }
        ]);
      }
    } catch (error) {
      console.error('خطأ في جلب مواقيت الصلاة:', error);
    }
    setLoading(false);
  };

  // جلب المواقيت عند تحميل الصفحة
  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  // تحديد الصلاة التالية
  const getNextPrayer = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      
      if (prayerMinutes > now) {
        return prayer;
      }
    }
    // إذا لم نجد صلاة اليوم، فالصلاة التالية هي فجر الغد
    return prayerTimes[0];
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8" />
            <h1 className="text-2xl font-bold">مواقيت الصلاة</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Location Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              اختر موقعك
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="المدينة"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                placeholder="الدولة"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button onClick={fetchPrayerTimes} disabled={loading}>
                {loading ? 'جاري التحديث...' : 'تحديث المواقيت'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Time & Next Prayer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">
                {currentTime.toLocaleTimeString('ar-SA', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm opacity-90">
                {currentTime.toLocaleDateString('ar-SA', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>

          {nextPrayer && (
            <Card className="bg-accent text-accent-foreground">
              <CardContent className="p-6 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4" />
                <div className="text-xl font-bold mb-2">الصلاة التالية</div>
                <div className="text-2xl font-bold mb-1">{nextPrayer.arabicName}</div>
                <div className="text-lg">{nextPrayer.time}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayerTimes.map((prayer, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {prayer.arabicName}
                </div>
                <div className="text-3xl font-bold mb-2">
                  {prayer.time}
                </div>
                <div className="text-sm text-muted-foreground">
                  {prayer.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              معلومات إضافية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">المدينة: </span>
                {city}
              </div>
              <div>
                <span className="font-semibold">الدولة: </span>
                {country}
              </div>
              <div>
                <span className="font-semibold">طريقة الحساب: </span>
                أم القرى - مكة المكرمة
              </div>
              <div>
                <span className="font-semibold">المذهب: </span>
                الحنفي
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}