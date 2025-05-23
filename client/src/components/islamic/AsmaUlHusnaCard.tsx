import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Share2, Book, Star } from 'lucide-react';
import type { AsmaUlHusna } from '@shared/schema';

interface AsmaUlHusnaCardProps {
  asma: AsmaUlHusna;
  showFullExplanation?: boolean;
}

export function AsmaUlHusnaCard({ asma, showFullExplanation = false }: AsmaUlHusnaCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(showFullExplanation);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // في التطبيق الحقيقي، نحتاج لتشغيل التلاوة الصوتية للاسم
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `اسم الله الحسنى: ${asma.arabicName}`,
        text: `${asma.arabicName} - ${asma.transliteration}\n${asma.meaning}\n\n${asma.explanation}`,
      });
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-primary border-primary/30">
            {asma.order}
          </Badge>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Book className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardTitle className="space-y-2">
          <div className="text-4xl font-bold text-primary arabic-font" dir="rtl">
            {asma.arabicName}
          </div>
          <div className="text-lg text-muted-foreground italic">
            {asma.transliteration}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* المعنى */}
        <div className="text-center">
          <div className="text-xl font-semibold text-foreground" dir="rtl">
            {asma.meaning}
          </div>
        </div>

        {/* الشرح المفصل */}
        {showDetails && (
          <div className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg text-right" dir="rtl">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                الشرح والتفسير:
              </h4>
              <p className="text-sm leading-relaxed text-foreground">
                {asma.explanation}
              </p>
            </div>

            {/* الفوائد */}
            {asma.benefits && (
              <div className="bg-accent/10 p-4 rounded-lg text-right" dir="rtl">
                <h4 className="font-semibold text-accent mb-2">فوائد الدعاء بهذا الاسم:</h4>
                <p className="text-sm leading-relaxed text-foreground">
                  {asma.benefits}
                </p>
              </div>
            )}

            {/* المراجع القرآنية */}
            {asma.quranicReferences && asma.quranicReferences.length > 0 && (
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-semibold text-secondary mb-2 text-right" dir="rtl">
                  المراجع القرآنية:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {asma.quranicReferences.map((ref, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ref}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* أدوات التحكم */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePlayPause}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">استمع</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Book className="w-4 h-4 mr-2" />
            {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// مكون لعرض جميع أسماء الله الحسنى في شبكة
export function AsmaUlHusnaGrid({ asmaList }: { asmaList: AsmaUlHusna[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {asmaList.map((asma) => (
        <AsmaUlHusnaCard key={asma.id} asma={asma} />
      ))}
    </div>
  );
}