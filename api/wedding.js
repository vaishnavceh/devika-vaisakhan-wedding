export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'success',
    data: {
      invitationTitle: 'An Heirloom Kerala Wedding Invitation',
      theme: 'Traditional Kerala Heritage with Contemporary Editorial Elegance',
      couple: {
        bride: {
          name: 'Devika',
          title: 'Dr.',
          fullName: 'Dr. Devika Rani P.S.',
          parents: 'Sunil Kumar B & Preetha M',
          father: 'Sunil Kumar B',
          mother: 'Preetha M',
          address: 'Amerivila Veedu',
          postOffice: 'Thattarkonam P.O., Peroor',
          district: 'Kollam',
          state: 'Kerala',
          pinCode: '691005',
        },
        groom: {
          name: 'Vaisakhan',
          fullName: 'Vaisakhan M.L.',
          father: 'Mohanan N',
          mother: 'Lalithakumari K (Late)',
          parentsNote: 'Son of Mohanan N and Late Lalithakumari K',
        },
      },
      hosts: {
        father: 'Sunil Kumar B',
        mother: 'Preetha M',
        invitationNote:
          'With immense joy and gratitude, Sunil Kumar B and Preetha M cordially invite you and your family to celebrate the wedding of their beloved daughter',
      },
      events: {
        reception: {
          id: 'reception',
          title: 'An Evening of Celebration',
          tagline: 'Pre-Ceremony Wedding Reception',
          date: 'Saturday, 05 December 2026',
          time: '4:00 PM onwards',
          isoStartTime: '2026-12-05T16:00:00+05:30',
          isoEndTime: '2026-12-05T21:00:00+05:30',
          venue: "Bride's Residence",
          address: 'Amerivila Veedu, Thattarkonam P.O., Peroor, Kollam',
          locationDetails: 'Thattarkonam, Peroor, Kollam (PIN 691005)',
          mapUrl: 'https://maps.app.goo.gl/tk4SToeGGwNHcAUZ7?g_st=aw',
          orderNote:
            'Kindly note: The celebratory reception takes place on Saturday evening prior to the auspicious wedding ceremony on Sunday.',
        },
        ceremony: {
          id: 'ceremony',
          title: 'The Sacred Union',
          tagline: 'Traditional Kerala Temple Wedding',
          date: 'Sunday, 06 December 2026',
          time: '12:05 PM – 12:25 PM (Muhurtham)',
          isoStartTime: '2026-12-06T12:05:00+05:30',
          isoEndTime: '2026-12-06T12:25:00+05:30',
          venue: 'Peroor Karunalloor Bhagavathy Temple',
          address: 'Peroor, Kollam, Kerala',
          locationDetails: 'Historic Karunalloor Bhagavathy Temple, Peroor',
          mapUrl: 'https://maps.app.goo.gl/63vEAnoGgeJPthKR8',
          orderNote:
            'Auspicious Muhurtham occurs precisely between 12:05 PM and 12:25 PM.',
        },
      },
      countdown: {
        targetIso: '2026-12-06T12:05:00+05:30',
        timezone: 'Asia/Kolkata',
        description: 'Counting down to the sacred Muhurtham',
      },
      familyBlessings: {
        sharingHappiness: 'Nimisha Rani P.S.',
        note: 'Sharing the happiness with warm blessings and love.',
      },
      contacts: {
        label: "Bride's Family",
        numbers: [
          { display: '96059 41066', raw: '9605941066', tel: '+919605941066' },
          { display: '95265 16107', raw: '9526516107', tel: '+919526516107' },
        ],
      },
      closing: {
        quote: 'Your presence will make our celebration even more meaningful.',
        signOff: "With love, The Bride's Family",
        date: '06 December 2026',
      },
    },
  });
}
