import React, { useState, useEffect } from 'react';
import { Youtube, Radio, ExternalLink, Calendar, Clock, AlertCircle } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

export const DailyLive: React.FC = () => {
  const [istTimeString, setIstTimeString] = useState<string>('');
  const [isCurrentlyLiveTime, setIsCurrentlyLiveTime] = useState<boolean>(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate IST (UTC + 5:30)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);

      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();

      // Check if between 7:30 PM (19:30) and 8:30 PM (20:30) IST
      const totalMinutes = hours * 60 + minutes;
      const liveStartMinutes = 19 * 60 + 30; // 19:30
      const liveEndMinutes = 20 * 60 + 30; // 20:30

      setIsCurrentlyLiveTime(totalMinutes >= liveStartMinutes && totalMinutes <= liveEndMinutes);

      // Format time
      const timeFormatted = istDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIstTimeString(timeFormatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="daily-live" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-red-900 via-stone-900 to-stone-950 p-6 sm:p-10 lg:p-12 text-white overflow-hidden shadow-2xl border border-red-800/40">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Live Information */}
            <div className="lg:col-span-7">
              {/* Pulsing Live Header Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/90 text-white text-xs sm:text-sm font-bold tracking-wide shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse-live" />
                  🔴 {t.nav.liveBadge}
                </span>

                {isCurrentlyLiveTime ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-semibold">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    {language === 'hi' ? 'लाइव समय जारी है' : 'Live Now'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/90 border border-stone-700 text-stone-300 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {language === 'hi' ? 'प्रतिदिन निश्चित समय' : 'Fixed Daily Schedule'}
                  </span>
                )}
              </div>

              {/* Main Schedule Heading */}
              <h2
                id="daily-live-heading"
                className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight"
              >
                {t.dailyLive.title}
              </h2>

              {/* Schedule Highlights */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-amber-200 mb-6 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{language === 'hi' ? 'प्रतिदिन (Daily)' : 'Every Single Day'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>7:30 PM – 8:30 PM IST</span>
                </div>
                {istTimeString && (
                  <div className="text-xs text-stone-300 bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700">
                    {t.dailyLive.currentTime}: <span className="text-amber-300 font-mono">{istTimeString}</span>
                  </div>
                )}
              </div>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed mb-8 max-w-2xl">
                {t.dailyLive.subtitle}. {t.dailyLive.disclaimer}
              </p>

              {/* CTA Button */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="daily-live-cta-btn"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-red-600/40 hover:scale-[1.02] cursor-pointer"
                >
                  <Youtube className="w-5 h-5 fill-white" />
                  <span>{t.dailyLive.watchLiveBtn}</span>
                </a>

                <span className="text-xs text-stone-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'hi' ? 'सीधे आधिकारिक चैनल पर प्रसारित' : 'Streamed on Official YouTube'}
                </span>
              </div>
            </div>

            {/* Right Column: Visual Channel Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-stone-800 text-center shadow-xl group hover:border-red-700/50 transition-all">
                {/* Official Logo */}
                <div className="relative inline-block mb-4">
                  <img
                    src="/jagat-uddharak-logo.png"
                    alt="जगत उद्धारक आधिकारिक चैनल"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto ring-4 ring-red-600/30 group-hover:ring-red-500 transition-all shadow-md"
                    style={{ aspectRatio: '1/1' }}
                  />
                  <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-1.5 text-white shadow">
                    <Youtube className="w-4 h-4 fill-white" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Jagat Uddharak
                </h3>
                <p className="text-sm font-medium text-amber-400 mb-4">
                  @JagatUddharak • Official Channel
                </p>

                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-300 text-xs sm:text-sm mb-5">
                  <div className="font-semibold text-white mb-1">
                    {t.dailyLive.timeLabel}
                  </div>
                  <div className="text-amber-300 font-mono text-base font-bold">
                    7:30 PM – 8:30 PM IST
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    {t.dailyLive.timeValue}
                  </div>
                </div>

                <a
                  href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-all border border-stone-700 hover:border-red-600"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{language === 'hi' ? 'आधिकारिक चैनल खोलें' : 'Open Official Channel'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
