import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Share2 } from 'lucide-react';
import { AdhkarCard } from '@/components/islamic/AdhkarCard';
import type { Adhkar } from '@shared/schema';

export function AdhkarCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  // جلب جميع الأذكار
  const { data: adhkarData, isLoading } = useQuery<Adhkar[]>({
    queryKey: ['/api/adhkar'],
    enabled: true,
  });

  // فئات الأذكار
  const categories = [
    { value: 'all', label: 'جميع الأذكار' },
    { value: 'morning', label: 'أذكار الصباح' },
    { value: 'evening', label: 'أذكار المساء' },
    { value: 'after_prayer', label: 'أذكار بعد الصلاة' },
    { value: 'before_sleep', label: 'أذكار قبل النوم' },
    { value: 'general', label: 'أذكار عامة' },
    { value: 'travel', label: 'أذكار السفر' },
    { value: 'food', label: 'أذكار الطعام' },
    { value: 'wudu', label: 'أذكار الوضوء' },
    { value: 'entering_home', label: 'أذكار دخول المنزل' },
    { value: 'leaving_home', label: 'أذكار الخروج من المنزل' },
    { value: 'rain', label: 'أذكار المطر' },
    { value: 'illness', label: 'أذكار المرض' },
    { value: 'distress', label: 'أذكار الكرب' }
  ];

  // تصفية الأذكار
  const filteredAdhkar = adhkarData?.filter(adhkar => {
    const matchesSearch = searchQuery === '' || 
      adhkar.arabicText.includes(searchQuery) ||
      adhkar.translation.includes(searchQuery) ||
      adhkar.benefits?.includes(searchQuery);
    
    const matchesCategory = selectedCategory === 'all' || adhkar.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  // إدارة المفضلة
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // حفظ المفضلة في localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('adhkar_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adhkar_favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8" />
            <h1 className="text-2xl font-bold">مجموعة الأذكار الشاملة</h1>
          </div>
          <p className="text-sm opacity-90 mt-2">
            أكثر من 500 ذكر أصيل من القرآن والسنة النبوية الشريفة
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث في الأذكار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <Card>
            <CardContent className="p-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredAdhkar.length}
              </div>
              <div className="text-sm text-muted-foreground">
                ذكر متاح
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {favorites.length} في المفضلة
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.slice(1, 8).map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-64 animate-pulse bg-muted" />
            ))}
          </div>
        )}

        {/* Adhkar Grid */}
        {!isLoading && (
          <>
            {filteredAdhkar.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    لم يتم العثور على أذكار مطابقة للبحث
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    إعادة تعيين البحث
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAdhkar.map((adhkar) => (
                  <AdhkarCard
                    key={adhkar.id}
                    adhkar={adhkar}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(adhkar.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* API Integration Notice */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 text-center">
              🔗 للحصول على مجموعة كاملة من الأذكار الأصيلة
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-blue-700">
            <p className="mb-4">
              يمكن ربط التطبيق بمصادر موثوقة مثل:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">حصن المسلم API</h4>
                <p className="text-sm">للأذكار الأصيلة المعتمدة</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">موقع الإسلام سؤال وجواب</h4>
                <p className="text-sm">للأذكار المحققة</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">تطبيق أذكاري</h4>
                <p className="text-sm">مجموعة شاملة ومصنفة</p>
              </div>
            </div>
            <p className="mt-4 text-sm">
              💡 هل لديك مفاتيح API لهذه الخدمات؟ يمكنني دمجها لتوفير مجموعة أكبر من الأذكار الأصيلة
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}