import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Settings2, Volume2 } from 'lucide-react';

const DHIKR_OPTIONS = [
  { text: 'سُبْحَانَ اللَّهِ', translation: 'سبحان الله', target: 33 },
  { text: 'الْحَمْدُ لِلَّهِ', translation: 'الحمد لله', target: 33 },
  { text: 'اللَّهُ أَكْبَرُ', translation: 'الله أكبر', target: 34 },
  { text: 'لَا إِلَهَ إِلَّا اللَّهُ', translation: 'لا إله إلا الله', target: 100 },
  { text: 'أَسْتَغْفِرُ اللَّهَ', translation: 'أستغفر الله', target: 100 },
  { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', translation: 'سبحان الله وبحمده', target: 100 },
];

export function TasbihCounter() {
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(DHIKR_OPTIONS[0]);
  const [customTarget, setCustomTarget] = useState(selectedDhikr.target);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const progress = (count / customTarget) * 100;
  const isCompleted = count >= customTarget;

  const playTasbihSound = () => {
    if (isSoundEnabled) {
      // إنشاء صوت بسيط للتسبيح
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const handleCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    playTasbihSound();
    
    if (isVibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // إشعار عند إكمال العدد المطلوب
    if (newCount === customTarget) {
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
      // صوت مختلف للإنجاز
      if (isSoundEnabled) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleDhikrChange = (value: string) => {
    const dhikr = DHIKR_OPTIONS.find(d => d.text === value);
    if (dhikr) {
      setSelectedDhikr(dhikr);
      setCustomTarget(dhikr.target);
      setCount(0);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-b from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">المسبحة الإلكترونية</CardTitle>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className={isSoundEnabled ? 'text-primary' : 'text-muted-foreground'}
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* إعدادات الذكر */}
        {showSettings && (
          <div className="space-y-4 p-4 bg-background/50 rounded-lg border">
            <div>
              <label className="text-sm font-medium mb-2 block">اختر الذكر:</label>
              <Select value={selectedDhikr.text} onValueChange={handleDhikrChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DHIKR_OPTIONS.map((dhikr) => (
                    <SelectItem key={dhikr.text} value={dhikr.text}>
                      <div className="text-right" dir="rtl">
                        <div className="font-semibold">{dhikr.text}</div>
                        <div className="text-sm text-muted-foreground">
                          {dhikr.translation} - {dhikr.target} مرة
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">العدد المطلوب:</label>
              <Input
                type="number"
                value={customTarget}
                onChange={(e) => setCustomTarget(Number(e.target.value))}
                min={1}
                max={1000}
              />
            </div>
          </div>
        )}

        {/* النص العربي */}
        <div className="text-center" dir="rtl">
          <p className="text-2xl font-bold text-primary mb-2 leading-relaxed">
            {selectedDhikr.text}
          </p>
          <p className="text-base text-muted-foreground">
            {selectedDhikr.translation}
          </p>
        </div>

        {/* العداد الرئيسي */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="text-6xl font-bold text-primary mb-2">
              {count}
            </div>
            <div className="text-lg text-muted-foreground">
              من {customTarget}
            </div>
          </div>

          {/* شريط التقدم */}
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="h-3"
            />
            <div className="text-sm text-center text-muted-foreground">
              {Math.round(progress)}% مكتمل
            </div>
          </div>
        </div>

        {/* إشعار الإنجاز */}
        {isCompleted && (
          <div className="text-center p-4 bg-primary/10 rounded-lg border-primary/20 border">
            <div className="text-lg font-bold text-primary mb-2">
              🎉 بارك الله فيك!
            </div>
            <p className="text-sm text-muted-foreground">
              لقد أكملت {customTarget} تسبيحة
            </p>
          </div>
        )}

        {/* أزرار التحكم */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleCount}
            className="h-20 text-xl font-bold bg-primary hover:bg-primary/90"
            disabled={isCompleted}
          >
            سَبِّح
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="h-20 text-lg"
          >
            <RotateCcw className="w-6 h-6 mb-1" />
            إعادة تعيين
          </Button>
        </div>

        {/* المفاتيح السريعة */}
        <div className="text-center text-xs text-muted-foreground">
          اضغط على المسطح أو استخدم مفتاح المسافة للتسبيح
        </div>
      </CardContent>
    </Card>
  );
}

// إضافة مستمع للوحة المفاتيح
export function useTasbihKeyboard(onCount: () => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        onCount();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onCount]);
}