import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Home } from "@/pages/Home";
import { PrayerTimes } from "@/pages/PrayerTimes";
import { QiblaDirection } from "@/pages/QiblaDirection";
import { QuranReader } from "@/pages/QuranReader";
import { AdhkarCollection } from "@/pages/AdhkarCollection";
import { IslamicCalendar } from "@/pages/IslamicCalendar";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prayer-times" component={PrayerTimes} />
      <Route path="/qibla" component={QiblaDirection} />
      <Route path="/quran" component={QuranReader} />
      <Route path="/adhkar" component={AdhkarCollection} />
      <Route path="/calendar" component={IslamicCalendar} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
