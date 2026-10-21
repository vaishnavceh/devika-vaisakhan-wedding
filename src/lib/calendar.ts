import { WeddingEvent } from '../data/weddingData';

function formatToIcsDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Creates and triggers the download of an RFC-compliant .ics file
 */
export function downloadIcsFile(event: WeddingEvent): void {
  const start = formatToIcsDate(event.isoStartTime);
  const end = event.isoEndTime ? formatToIcsDate(event.isoEndTime) : start;
  const now = formatToIcsDate(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kerala Wedding Invitations//Devika and Vaisakhan//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:devika-vaisakhan-${event.id}-2026@wedding.invite`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title} — Dr. Devika Rani & Vaisakhan`,
    `DESCRIPTION:${event.tagline}\\nVenue: ${event.venue}\\nAddress: ${event.address}\\nMap: ${event.mapUrl}`,
    `LOCATION:${event.venue}, ${event.address}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding celebration of Dr. Devika Rani & Vaisakhan',
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-devika-vaisakhan-wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates direct Google Calendar web URL
 */
export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const start = formatToIcsDate(event.isoStartTime);
  const end = event.isoEndTime ? formatToIcsDate(event.isoEndTime) : start;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} — Dr. Devika Rani & Vaisakhan`,
    dates: `${start}/${end}`,
    details: `${event.tagline}\nVenue: ${event.venue}\nAddress: ${event.address}\n\nGoogle Maps: ${event.mapUrl}`,
    location: `${event.venue}, ${event.address}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
