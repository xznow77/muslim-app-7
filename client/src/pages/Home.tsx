import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, BookOpen, Clock, Calendar, Compass, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { AdhkarCard } from '@/components/islamic/AdhkarCard';
import { TasbihCounter } from '@/components/islamic/TasbihCounter';
import { AsmaUlHusnaCard } from '@/components/islamic/AsmaUlHusnaCard';
import type { Adhkar, AsmaUlHusna } from '@shared/schema';

export function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();

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
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/prayer-times">
            <Card className="hover:shadow-xl transition-all cursor-pointer group hover:scale-105">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-primary/80" />
                <h3 className="text-lg font-bold mb-2">مواقيت الصلاة</h3>
                <p className="text-sm text-muted-foreground">الفجر: 05:30</p>
                <p className="text-xs text-muted-foreground mt-1">بحسب موقعك</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/qibla">
            <Card className="hover:shadow-xl transition-all cursor-pointer group hover:scale-105">
              <CardContent className="p-8 text-center">
                <Compass className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-primary/80" />
                <h3 className="text-lg font-bold mb-2">اتجاه القبلة</h3>
                <p className="text-sm text-muted-foreground">شمال شرق</p>
                <p className="text-xs text-muted-foreground mt-1">بوصلة دقيقة</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/quran">
            <Card className="hover:shadow-xl transition-all cursor-pointer group hover:scale-105">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-primary/80" />
                <h3 className="text-lg font-bold mb-2">القرآن الكريم</h3>
                <p className="text-sm text-muted-foreground">114 سورة</p>
                <p className="text-xs text-muted-foreground mt-1">مع التلاوة</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/calendar">
            <Card className="hover:shadow-xl transition-all cursor-pointer group hover:scale-105">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-primary/80" />
                <h3 className="text-lg font-bold mb-2">التقويم الهجري</h3>
                <p className="text-sm text-muted-foreground">1446 هـ</p>
                <p className="text-xs text-muted-foreground mt-1">أحداث إسلامية</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Right Column - Adhkar */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">أذكار الصباح</h2>
                <Link href="/adhkar">
                  <Button variant="outline">عرض الكل</Button>
                </Link>
              </div>
              
              {adhkarLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="h-48 animate-pulse bg-muted" />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {adhkar?.slice(0, 2).map((dhikr) => (
                    <AdhkarCard key={dhikr.id} adhkar={dhikr} />
                  ))}
                </div>
              )}
            </section>

            {/* Asma ul Husna Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">أسماء الله الحسنى</h2>
                <Button variant="outline">عرض الكل</Button>
              </div>
              
              {asmaLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="h-32 animate-pulse bg-muted" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {asmaUlHusna?.slice(0, 4).map((asma) => (
                    <AsmaUlHusnaCard key={asma.id} asma={asma} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Left Column - Tasbih & Quick Actions */}
          <div className="space-y-8">
            {/* Tasbih Section */}
            <section>
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-xl font-bold text-primary">المسبحة الإلكترونية</h2>
              </div>
              <TasbihCounter />
            </section>

            {/* Quick Actions - Compact */}
            <section className="bg-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4 text-center">أدوات سريعة</h3>
              <div className="space-y-3">
                <Link href="/quran" className="w-full">
                  <Button className="w-full justify-start gap-3" variant="outline">
                    <BookOpen className="w-4 h-4" />
                    القرآن الكريم
                  </Button>
                </Link>
                
                <Link href="/adhkar" className="w-full">
                  <Button className="w-full justify-start gap-3" variant="outline">
                    <Clock className="w-4 h-4" />
                    جميع الأذكار
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start gap-3"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
                </Button>
              </div>
            </section>
          </div>
        </div>
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
