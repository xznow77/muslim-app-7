import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, MapPin, Navigation } from 'lucide-react';

export function QiblaDirection() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [compassDirection, setCompassDirection] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // إحداثيات الكعبة المشرفة
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  // حساب اتجاه القبلة
  const calculateQiblaDirection = (lat: number, lng: number) => {
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLng = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  // الحصول على الموقع الحالي
  const getCurrentLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('المتصفح لا يدعم تحديد الموقع');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const direction = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
        setLoading(false);
      },
      (error) => {
        setError('فشل في تحديد الموقع. تأكد من السماح للموقع بالوصول للموقع');
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // مراقبة البوصلة
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setCompassDirection(360 - event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
      return () => window.removeEventListener('deviceorientation', handleDeviceOrientation);
    }
  }, []);

  // طلب الإذن للبوصلة (iOS)
  const requestCompassPermission = () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            getCurrentLocation();
          }
        })
        .catch(console.error);
    } else {
      getCurrentLocation();
    }
  };

  // الاتجاه النسبي للقبلة
  const relativeQiblaDirection = qiblaDirection - compassDirection;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8" />
            <h1 className="text-2xl font-bold">اتجاه القبلة</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Location Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              موقعك الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-4">
                <div className="text-primary">جاري تحديد موقعك...</div>
              </div>
            )}
            
            {error && (
              <div className="text-center py-4">
                <div className="text-red-500 mb-4">{error}</div>
                <Button onClick={requestCompassPermission}>
                  إعادة المحاولة
                </Button>
              </div>
            )}
            
            {location && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">خط العرض: </span>
                  {location.lat.toFixed(6)}°
                </div>
                <div>
                  <span className="font-semibold">خط الطول: </span>
                  {location.lng.toFixed(6)}°
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compass */}
        {location && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary mb-2">بوصلة القبلة</h2>
                <p className="text-muted-foreground">وجه هاتفك نحو الاتجاه المحدد</p>
              </div>

              {/* Enhanced Compass Visual */}
              <div className="relative w-96 h-96 mx-auto mb-8 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full shadow-2xl">
                {/* Outer Ring */}
                <div className="absolute inset-2 border-4 border-emerald-600 rounded-full bg-gradient-to-br from-white to-green-50">
                  
                  {/* Direction Markers */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-lg font-bold text-emerald-800 bg-white px-2 py-1 rounded">شمال</div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg font-bold text-emerald-800 bg-white px-2 py-1 rounded">جنوب</div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-bold text-emerald-800 bg-white px-2 py-1 rounded">شرق</div>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-bold text-emerald-800 bg-white px-2 py-1 rounded">غرب</div>

                  {/* Degree Markers */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-6 bg-emerald-600"
                      style={{
                        top: '10px',
                        left: '50%',
                        transformOrigin: '50% 182px',
                        transform: `translateX(-50%) rotate(${i * 30}deg)`
                      }}
                    />
                  ))}
                </div>

                {/* Device Direction Needle (Red) */}
                <div 
                  className="absolute inset-0 transition-transform duration-300"
                  style={{ transform: `rotate(${compassDirection}deg)` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Device Arrow */}
                    <div className="relative">
                      <div className="w-2 h-32 bg-red-600 rounded-full transform -translate-y-16 shadow-lg"></div>
                      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-600"></div>
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-red-600 px-1 rounded">جهازك</div>
                    </div>
                  </div>
                </div>

                {/* Qibla Direction Arrow (Green) */}
                <div 
                  className="absolute inset-0 transition-transform duration-500"
                  style={{ transform: `rotate(${qiblaDirection}deg)` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Qibla Arrow */}
                    <div className="relative">
                      <div className="w-3 h-40 bg-green-600 rounded-full transform -translate-y-20 shadow-xl"></div>
                      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-12 border-transparent border-b-green-600"></div>
                      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-2xl">🕋</div>
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-green-600 px-2 py-1 rounded whitespace-nowrap">اتجاه القبلة</div>
                    </div>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-white"></div>
                
                {/* Direction Difference Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                    <div className="text-sm text-emerald-800 font-semibold">
                      انحراف: {Math.abs(relativeQiblaDirection).toFixed(1)}°
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">
                  {qiblaDirection.toFixed(1)}°
                </div>
                <div className="text-lg text-muted-foreground">
                  اتجاه القبلة من موقعك
                </div>
                
                {Math.abs(relativeQiblaDirection) < 10 && (
                  <div className="text-green-600 font-bold text-xl">
                    ✅ أنت تتجه نحو القبلة!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              كيفية الاستخدام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>تأكد من تفعيل خدمات الموقع في متصفحك</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>امسك هاتفك بشكل مسطح أمامك</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>وجه جسدك نحو اتجاه الرمز 🕋 الأخضر</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>عندما تظهر ✅ فأنت تتجه نحو القبلة بشكل صحيح</div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}