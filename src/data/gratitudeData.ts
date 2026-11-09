import { GratitudeReason, MemoryMoment, PersonalizationData } from '../types.ts';
import heroCafeLatte from '../assets/images/hero_cafe_latte_warmth_1794219996412.jpg';

export const DEFAULT_PERSONALIZATION: PersonalizationData = {
  recipientName: 'Papa Ciao',
  senderName: 'Faith',
  relationshipTitle: 'To An Awesome Uncle',
  heroHeadline: '“A generous heart changes everything.”',
  heroSubhead: 'A personal dedication in heartfelt gratitude for your generous gift and constant belief in me.',
  letterGreeting: 'Papa Ciao,',
  letterBody: [
    'I wanted to take a moment away from the rush of everyday life to tell you something that often goes unsaid : Thank You. Even at that , words can’t fully express how surprised and grateful I was to receive your gift. Thank you so much for the new laptop!',
    "This isn't just an incredible gift ... it’s something that is going to help me immensely with my work, learning, and projects. Knowing that you thought of me and sent something so practical and generous means the a lot to me. Through every season, every challenge, and every milestone, your quiet consistency has been the anchor that kept me grounded.",
    'Thank you for always being such an awesome uncle and for believing in me. Whenever you have a quiet moment, come back here and remember how deeply loved, respected, and cherished you are.'
  ],
  letterSignoff: 'With lots of love and gratitude,',
  secretNote: 'P.S. Thank you again for the new laptop, Papa Ciao — it means the world to me!'
};

export const SINGLE_MOMENT: MemoryMoment = {
  id: 'moment-1',
  image: heroCafeLatte,
  title: 'Thank You',
  caption: 'With endless warmth and gratitude for your generosity.',
  location: 'Café Latte Warmth',
  timeframe: 'Always',
  aspect: '16:9'
};

export const MEMORY_MOMENTS: MemoryMoment[] = [SINGLE_MOMENT];

