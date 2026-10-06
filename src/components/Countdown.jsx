import React, { useState, useEffect, useMemo } from 'react';
import { CalendarPlus } from 'lucide-react';
import { useClient } from '../context/ClientContext';

const Countdown = () => {
  const client = useClient();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const weddingISO = client.hero?.weddingDateISO || client.weddingDateISO || '2027-12-12T09:00:00';

  useEffect(() => {
    const target = new Date(weddingISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingISO]);

  const calendarUrl = useMemo(() => {
    const groomShort = client.couple?.groom?.shortName || 'Pria';
    const brideShort = client.couple?.bride?.shortName || 'Wanita';
    const groomFull = client.couple?.groom?.name || groomShort;
    const brideFull = client.couple?.bride?.name || brideShort;
    const firstEvent = client.events?.[0];
    const venue = firstEvent ? `${firstEvent.venue || ''}, ${firstEvent.address || ''}` : '';

    // Format ISO string to Google Calendar YYYYMMDDTHHmmssZ
    let datesParam = '20271212T020000Z/20271212T080000Z';
    try {
      const d = new Date(weddingISO);
      if (!isNaN(d.getTime())) {
        const startStr = d.toISOString().replace(/-|:|\.\d\d\d/g, '');
        const endD = new Date(d.getTime() + 6 * 3600 * 1000);
        const endStr = endD.toISOString().replace(/-|:|\.\d\d\d/g, '');
        datesParam = `${startStr}/${endStr}`;
      }
    } catch {}

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+${encodeURIComponent(groomShort)}+%26+${encodeURIComponent(brideShort)}&dates=${datesParam}&details=${encodeURIComponent('Pernikahan ' + groomFull + ' & ' + brideFull)}&location=${encodeURIComponent(venue)}`;
  }, [client, weddingISO]);

  return (
    <div className="countdown-wrapper reveal-on-scroll delay-300">
      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-num font-display">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label font-sans">Hari</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-num font-display">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label font-sans">Jam</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-num font-display">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label font-sans">Menit</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-num font-display">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label font-sans">Detik</span>
        </div>
      </div>

      <div className="calendar-btn-wrapper">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-calendar"
          aria-label="Simpan tanggal pernikahan ke Google Calendar"
        >
          <CalendarPlus size={16} />
          Simpan ke Kalender
        </a>
      </div>
    </div>
  );
};

export default Countdown;
