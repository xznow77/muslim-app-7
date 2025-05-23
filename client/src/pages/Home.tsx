import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, BookOpen, Clock, Calendar, Compass, Play } from 'lucide-react';
import { AdhkarCard } from '@/components/islamic/AdhkarCard';
import { TasbihCounter } from '@/components/islamic/TasbihCounter';
import { AsmaUlHusnaCard } from '@/components/islamic/AsmaUlHusnaCard';
import type { Adhkar, AsmaUlHusna } from '@shared/schema';

export function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // جلب الأذكار
  const { data: adhkar, isLoading: adhkarLoading } = useQuery<Adhkar[]>({
    queryKey: ['/api/adhkar', { category: 'morning' }],
    enabled: true,
  });

  // جلب أسماء الله الحسنى
  const { data: asmaUlHusna, isLoading: asmaLoading } = useQuery<AsmaUlHusna[]>({
    queryKey: ['/api/asma-ul-husna'],
    enabled: true,
  });

  // تحديث الوقت كل ثانية
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HomeIcon className="w-8 h-8" />
              <h1 className="text-2xl font-bold">التطبيق الإسلامي الشامل</h1>
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold">{formatTime(currentTime)}</div>
              <div className="text-sm opacity-90">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">مواقيت الصلاة</h3>
              <p className="text-sm text-muted-foreground">الفجر: 05:30</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Compass className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">اتجاه القبلة</h3>
              <p className="text-sm text-muted-foreground">شمال شرق</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">القرآن الكريم</h3>
              <p className="text-sm text-muted-foreground">114 سورة</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">التقويم الهجري</h3>
              <p className="text-sm text-muted-foreground">1446 هـ</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Adhkar Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">أذكار الصباح</h2>
            <Button variant="outline">عرض الكل</Button>
          </div>
          
          {adhkarLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="h-64 animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {adhkar?.slice(0, 2).map((dhikr) => (
                <AdhkarCard key={dhikr.id} adhkar={dhikr} />
              ))}
            </div>
          )}
        </section>

        {/* Tasbih Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">المسبحة الإلكترونية</h2>
          </div>
          <div className="max-w-md mx-auto">
            <TasbihCounter />
          </div>
        </section>

        {/* Asma ul Husna Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">أسماء الله الحسنى</h2>
            <Button variant="outline">عرض الكل</Button>
          </div>
          
          {asmaLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="h-64 animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {asmaUlHusna?.slice(0, 3).map((asma) => (
                <AsmaUlHusnaCard key={asma.id} asma={asma} />
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">أدوات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Play className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">تلاوة القرآن</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  استمع لتلاوة عذبة للقرآن الكريم
                </p>
                <Button className="w-full">ابدأ الاستماع</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Compass className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">المساجد القريبة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  اعثر على أقرب المساجد إليك
                </p>
                <Button className="w-full">البحث</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">دعاء اليوم</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  دعاء مختار لكل يوم من أيام الأسبوع
                </p>
                <Button className="w-full">اقرأ الدعاء</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HomeIcon className="w-6 h-6" />
            <span className="font-semibold">التطبيق الإسلامي الشامل</span>
          </div>
          <p className="text-sm opacity-90">
            تطبيق شامل للمسلمين يحتوي على الأذكار والقرآن الكريم ومواقيت الصلاة
          </p>
          <p className="text-xs mt-4 opacity-75">
            {new Date().getFullYear()} © جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
