import { config } from '../config/index.js';

export interface WeddingEvent {
  id: string;
  title: string;
  tagline: string;
  date: string;
  time: string;
  isoStartTime: string;
  isoEndTime?: string;
  venue: string;
  address: string;
  locationDetails?: string;
  mapUrl: string;
  orderNote?: string;
}

export interface WeddingData {
  invitationTitle: string;
  theme: string;
  couple: {
    bride: {
      name: string;
      title: string;
      fullName: string;
      parents: string;
      father: string;
      mother: string;
      address: string;
      postOffice: string;
      district: string;
      state: string;
      pinCode: string;
    };
    groom: {
      name: string;
      fullName: string;
      father: string;
      mother: string;
      parentsNote: string;
    };
  };
  hosts: {
    father: string;
    mother: string;
    invitationNote: string;
  };
  events: {
    reception: WeddingEvent;
    ceremony: WeddingEvent;
  };
  countdown: {
    targetIso: string;
    timezone: string;
    description: string;
  };
  familyBlessings: {
    sharingHappiness: string;
    note: string;
  };
  contacts: {
    label: string;
    numbers: Array<{
      display: string;
      raw: string;
      tel: string;
    }>;
  };
  closing: {
    quote: string;
    signOff: string;
    date: string;
  };
}

export const getWeddingData = (): WeddingData => ({
  invitationTitle: "An Heirloom Kerala Wedding Invitation",
  theme: "Traditional Kerala Heritage with Contemporary Editorial Elegance",
  couple: {
    bride: {
      name: "Devika",
      title: "Dr.",
      fullName: "Dr. Devika Rani P.S.",
      parents: "Sunil Kumar B & Preetha M",
      father: "Sunil Kumar B",
      mother: "Preetha M",
      address: "Amerivila Veedu",
      postOffice: "Thattarkonam P.O., Peroor",
      district: "Kollam",
      state: "Kerala",
      pinCode: "691005",
    },
    groom: {
      name: "Vaisakhan",
      fullName: "Vaisakhan M.L.",
      father: "Mohanan N",
      mother: "Lalithakumari K (Late)",
      parentsNote: "Son of Mohanan N and Late Lalithakumari K",
    },
  },
  hosts: {
    father: "Sunil Kumar B",
    mother: "Preetha M",
    invitationNote:
      "With immense joy and gratitude, Sunil Kumar B and Preetha M cordially invite you and your family to celebrate the wedding of their beloved daughter",
  },
  events: {
    reception: {
      id: "reception",
      title: "An Evening of Celebration",
      tagline: "Pre-Ceremony Wedding Reception",
      date: "Saturday, 05 December 2026",
      time: "4:00 PM onwards",
      isoStartTime: "2026-12-05T16:00:00+05:30",
      isoEndTime: "2026-12-05T21:00:00+05:30",
      venue: "Bride's Residence",
      address: "Amerivila Veedu, Thattarkonam P.O., Peroor, Kollam",
      locationDetails: "Thattarkonam, Peroor, Kollam (PIN 691005)",
      mapUrl: config.residenceMapUrl,
      orderNote: "Kindly note: The celebratory reception takes place on Saturday evening prior to the auspicious wedding ceremony on Sunday.",
    },
    ceremony: {
      id: "ceremony",
      title: "The Sacred Union",
      tagline: "Traditional Kerala Temple Wedding",
      date: "Sunday, 06 December 2026",
      time: "12:05 PM – 12:25 PM (Muhurtham)",
      isoStartTime: "2026-12-06T12:05:00+05:30",
      isoEndTime: "2026-12-06T12:25:00+05:30",
      venue: "Peroor Karunalloor Bhagavathy Temple",
      address: "Peroor, Kollam, Kerala",
      locationDetails: "Historic Karunalloor Bhagavathy Temple, Peroor",
      mapUrl: config.templeMapUrl,
      orderNote: "Auspicious Muhurtham occurs precisely between 12:05 PM and 12:25 PM.",
    },
  },
  countdown: {
    targetIso: "2026-12-06T12:05:00+05:30",
    timezone: "Asia/Kolkata",
    description: "Counting down to the sacred Muhurtham",
  },
  familyBlessings: {
    sharingHappiness: "Nimisha Rani P.S.",
    note: "Sharing the happiness with warm blessings and love.",
  },
  contacts: {
    label: "Bride's Family",
    numbers: [
      {
        display: "96059 41066",
        raw: config.contacts.primary,
        tel: `+91${config.contacts.primary.replace(/\D/g, '')}`,
      },
      {
        display: "95265 16107",
        raw: config.contacts.secondary,
        tel: `+91${config.contacts.secondary.replace(/\D/g, '')}`,
      },
    ],
  },
  closing: {
    quote: "Your presence will make our celebration even more meaningful.",
    signOff: "With love, The Bride's Family",
    date: "06 December 2026",
  },
});
