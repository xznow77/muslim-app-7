import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Share2, Heart, RotateCcw } from 'lucide-react';
import type { Adhkar } from '@shared/schema';

interface AdhkarCardProps {
  adhkar: Adhkar;
  onFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export function AdhkarCard({ adhkar, onFavorite, isFavorite = false }: AdhkarCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // في التطبيق الحقيقي، هنا نشغل الصوت
  };

  const handleCount = () => {
    setCurrentCount(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentCount(0);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ذكر من التطبيق الإسلامي',
        text: `${adhkar.arabicText}\n\n${adhkar.translation}`,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'morning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'evening':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'after_prayer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'before_sleep':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      morning: 'أذكار الصباح',
      evening: 'أذكار المساء',
      after_prayer: 'أذكار بعد الصلاة',
      before_sleep: 'أذكار قبل النوم',
      general: 'أذكار عامة',
      travel: 'أذكار السفر',
      food: 'أذكار الطعام'
    };
    return categories[category] || category;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <Badge className={`${getCategoryColor(adhkar.category)} border`}>
            {getCategoryName(adhkar.category)}
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFavorite?.(adhkar.id)}
              className={isFavorite ? 'text-red-500' : 'text-gray-400'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* النص العربي */}
        <div className="text-right" dir="rtl">
          <p className="text-lg leading-relaxed font-semibold text-primary">
            {adhkar.arabicText}
          </p>
        </div>

        {/* النطق */}
        {adhkar.transliteration && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground italic">
              {adhkar.transliteration}
            </p>
          </div>
        )}

        {/* الترجمة */}
        <div className="text-right" dir="rtl">
          <p className="text-base leading-relaxed text-foreground">
            {adhkar.translation}
          </p>
        </div>

        {/* المصدر */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>المصدر:</span>
          <Badge variant="outline" className="text-xs">
            {adhkar.source}
          </Badge>
        </div>

        {/* الفوائد */}
        {adhkar.benefits && (
          <div className="bg-accent/10 p-3 rounded-lg text-right" dir="rtl">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold text-accent">الفوائد: </span>
              {adhkar.benefits}
            </p>
          </div>
        )}

        {/* أدوات التحكم */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>

          {adhkar.repetitions && adhkar.repetitions > 1 && (
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {currentCount} / {adhkar.repetitions}
                </div>
                <div className="text-xs text-muted-foreground">العدد</div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCount} className="w-12 h-12 rounded-full">
                  <span className="text-lg">+</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-10 h-10 rounded-full"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}