import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  templeMapUrl: process.env.TEMPLE_MAP_URL || 'https://share.google/JoWJRWtprleSe488s',
  residenceMapUrl: process.env.RESIDENCE_MAP_URL || 'https://maps.app.goo.gl/tk4SToeGGwNHcAUZ7?g_st=aw',
  contacts: {
    primary: process.env.BRIDE_CONTACT_1 || '9605941066',
    secondary: process.env.BRIDE_CONTACT_2 || '9526516107',
  },
};
