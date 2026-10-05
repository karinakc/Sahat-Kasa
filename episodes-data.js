import recentEpisodeImage from './src/assets/recent-video.webp';
import sisanBaniyaImage from './src/assets/sisan-baniya.webp';
import monarchyImage from './src/assets/monarchy.webp';

export const CHANNEL_URL = 'https://www.youtube.com/@SahatKasa/videos';
export const CLIPS_PLAYLIST_URL = 'https://youtube.com/playlist?list=PLCi-ERnXUfiOldRGaiF3LSqeyW17xaqTb&si=GwxNpHzaENWlzAot';

const youtubeThumbnail = id => `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`;

const episodeCollection = [
  {
    id: 'mO_54QFQ5GE',
    title: "Sent Over 1 Million Plus Emails: Here's How to Book 9 Figure Clients",
    guest: 'Prabesh Khanal & Avik Ghimire',
    category: 'Business',
    topics: ['cold email', 'client acquisition', 'sales', 'GetAttn', 'Growth Pal'],
    duration: '1:42:10',
    published: '2026-09-26',
    description: 'Prabesh Khanal and Avik Ghimire break down cold email, client acquisition and the systems behind booking nine-figure clients.',
    url: 'https://youtu.be/mO_54QFQ5GE',
    image: recentEpisodeImage,
    imageAlt: 'Prabesh Khanal and Avik Ghimire discussing cold email and client acquisition',
    latest: true
  },
  {
    id: 'PBc5uuxLQq4',
    title: '“पसलमा चिया खाने समय छ, तर जनताको समस्या सुन्ने समय छैन?” | Nischal Rai Questions PM Balen Shah',
    guest: 'Nischal Rai',
    category: 'Politics',
    topics: ['Nepal', 'politics', 'public service', 'Balen Shah'],
    duration: '1:10:59',
    published: '2026-06-27',
    url: 'https://youtu.be/PBc5uuxLQq4',
    image: youtubeThumbnail('PBc5uuxLQq4'),
    imageAlt: 'Nischal Rai in conversation on The SJK Podcast'
  },
  {
    id: 'CJ1EMoEUCbE',
    title: 'Reason Why YOU Are Single?! | Cheating, Friend Zone Solution (Psychology Explained)',
    guest: 'Prashanna Bista',
    category: 'Creators',
    topics: ['psychology', 'relationships', 'self awareness'],
    duration: '1:42:09',
    published: '2026-04-25',
    url: 'https://youtu.be/CJ1EMoEUCbE',
    image: youtubeThumbnail('CJ1EMoEUCbE'),
    imageAlt: 'Prashanna Bista discussing psychology and relationships on The SJK Podcast'
  },
  {
    id: 'EoVHxNJOS7k',
    title: 'Newa Cinema, Culture & The Dream To Take It Global',
    guest: 'Aashutosh Barahi',
    category: 'Creators',
    topics: ['Newa culture', 'cinema', 'filmmaking', 'Jyasa Production'],
    duration: '1:05:58',
    published: '2026-04-22',
    url: 'https://youtu.be/EoVHxNJOS7k',
    image: youtubeThumbnail('EoVHxNJOS7k'),
    imageAlt: 'Aashutosh Barahi discussing Newa cinema and culture on The SJK Podcast'
  },
  {
    id: 'k7Va2ORc6ZM',
    title: 'डा. बाबुराम भट्टराई: Solution For Corruption & Better Nepal | समृद्ध नेपाल, GenZ Andolan, Rajtantra',
    guest: 'Dr. Baburam Bhattarai',
    category: 'Politics',
    topics: ['corruption', 'Nepal', 'Gen Z', 'monarchy'],
    duration: '1:47:38',
    published: '2026-01-16',
    url: 'https://youtu.be/k7Va2ORc6ZM',
    image: youtubeThumbnail('k7Va2ORc6ZM'),
    imageAlt: 'Dr. Baburam Bhattarai in conversation on The SJK Podcast'
  },
  {
    id: 'EntmRX5UEMQ',
    title: "Nepal's Economy Isn't Failing — Our Politics Is | Prof. Achyut Wagle | Shadow Economy, Politics",
    guest: 'Prof. Achyut Wagle',
    category: 'Politics',
    topics: ['economy', 'shadow economy', 'Nepal', 'politics'],
    duration: '1:57:42',
    published: '2026-01-02',
    url: 'https://youtu.be/EntmRX5UEMQ',
    image: youtubeThumbnail('EntmRX5UEMQ'),
    imageAlt: 'Professor Achyut Wagle discussing Nepal’s economy and politics'
  },
  {
    id: 'AKHgazKzYpE',
    title: 'Banning Parties, Directly Elected PM — The Mistake That Could End Nepal',
    guest: 'Dr. Yubraj Sangroula',
    category: 'Politics',
    topics: ['constitution', 'political parties', 'prime minister', 'Nepal'],
    duration: '1:22:47',
    published: '2025-10-11',
    url: 'https://youtu.be/AKHgazKzYpE',
    image: youtubeThumbnail('AKHgazKzYpE'),
    imageAlt: 'Dr. Yubraj Sangroula discussing Nepal’s political system'
  },
  {
    id: 'P5kwdU1tWhA',
    title: 'विषम परिस्थिति Explained: Constitutional Expert Behind Nepal’s Interim Government',
    guest: 'Dr. Chandra Kanta Gyawali',
    category: 'Politics',
    topics: ['constitution', 'interim government', 'Nepal'],
    duration: '1:43:55',
    published: '2025-12-19',
    url: 'https://youtu.be/P5kwdU1tWhA',
    image: youtubeThumbnail('P5kwdU1tWhA'),
    imageAlt: 'Dr. Chandra Kanta Gyawali discussing Nepal’s constitution'
  },
  {
    id: 'LaEraNesVys',
    title: 'An Unfiltered Conversation with Vek',
    guest: 'Vek',
    category: 'Nepali Artists',
    topics: ['music', 'artist', 'Nepal'],
    duration: '1:27:12',
    published: '2023-06-13',
    url: 'https://youtu.be/LaEraNesVys',
    image: youtubeThumbnail('LaEraNesVys'),
    imageAlt: 'Vek in an unfiltered conversation on The SJK Podcast'
  },
  {
    id: 'ImI8aJJ5jv4',
    title: "The Secret Behind Himalayan Java's Success",
    guest: 'Co-Founder, Himalayan Java',
    category: 'Business',
    topics: ['Himalayan Java', 'entrepreneurship', 'coffee', 'Nepal'],
    duration: '1:55:20',
    published: '2023-06-19',
    url: 'https://youtu.be/ImI8aJJ5jv4',
    image: youtubeThumbnail('ImI8aJJ5jv4'),
    imageAlt: 'The co-founder of Himalayan Java on The SJK Podcast'
  },
  {
    id: 'ZPlplo9ewNA',
    title: 'MIT Graduate Reveals Secrets to Building a Million-Dollar Tech Company in Nepal',
    guest: 'Himal Karmacharya',
    category: 'Tech',
    topics: ['Leapfrog', 'technology', 'MIT', 'entrepreneurship'],
    duration: '2:02:20',
    published: '2024-11-05',
    url: 'https://youtu.be/ZPlplo9ewNA',
    image: youtubeThumbnail('ZPlplo9ewNA'),
    imageAlt: 'Himal Karmacharya discussing building a technology company in Nepal'
  },
  {
    id: 'D5qMYo56PIA',
    title: 'Tootle Is Back — What Had Really Happened?',
    guest: 'Co-Founder, Tootle',
    category: 'Business',
    topics: ['Tootle', 'startup', 'mobility', 'Nepal'],
    duration: '1:43:59',
    published: '2024-04-09',
    url: 'https://youtu.be/D5qMYo56PIA',
    image: youtubeThumbnail('D5qMYo56PIA'),
    imageAlt: 'The co-founder of Tootle on The SJK Podcast'
  },
  {
    id: 'Inhsa7nPA0o',
    title: "The Story Behind Nepal's Most Famous Streetwear Brand",
    guest: 'Co-Founder, HUBA',
    category: 'Business',
    topics: ['HUBA', 'streetwear', 'fashion', 'entrepreneurship'],
    duration: '1:37:32',
    published: '2023-10-01',
    url: 'https://youtu.be/Inhsa7nPA0o',
    image: youtubeThumbnail('Inhsa7nPA0o'),
    imageAlt: 'The co-founder of HUBA discussing the Nepali streetwear brand'
  },
  {
    id: 'EvPb-otzLLM',
    title: 'The Making of Sisan Baniya | A Deep Dive Into His Rise and Influence',
    guest: 'Sisan Baniya',
    category: 'Creators',
    topics: ['content creation', 'filmmaking', 'influence'],
    duration: '2:14:13',
    published: '2025-07-06',
    url: 'https://youtu.be/EvPb-otzLLM',
    image: sisanBaniyaImage,
    imageAlt: 'Sisan Baniya featured on The SJK Podcast',
    popular: true
  },
  {
    id: 'QJd1sYMTMHE',
    title: 'Is Monarchy the Freedom That Nepal Really Needs?',
    guest: 'The Nepali Comment × In-Depth Story',
    category: 'Politics',
    topics: ['monarchy', 'freedom', 'Nepal', 'politics'],
    duration: '2:41:42',
    published: '2023-11-26',
    url: 'https://youtu.be/QJd1sYMTMHE',
    image: monarchyImage,
    imageAlt: 'A discussion about monarchy and freedom in Nepal',
    popular: true
  },
  {
    id: '9Xq_PLU6c_k',
    title: "Yabesh Thapa: I Like to Feel Sad When I'm Not…",
    guest: 'Yabesh Thapa',
    category: 'Nepali Artists',
    topics: ['music', 'songwriting', 'artist', 'Nepal'],
    duration: '1:33:24',
    published: '2024-05-11',
    url: 'https://youtu.be/9Xq_PLU6c_k',
    image: youtubeThumbnail('9Xq_PLU6c_k'),
    imageAlt: 'Yabesh Thapa in conversation on The SJK Podcast',
    popular: true
  },
  {
    id: 'jcy68BTYR1s',
    title: '“I Chased This Girl for 6 Months of My Life” — ShreeGO',
    guest: 'ShreeGO',
    category: 'Nepali Artists',
    topics: ['music', 'relationships', 'artist', 'Nepal'],
    duration: '1:26:43',
    published: '2024-07-19',
    url: 'https://youtu.be/jcy68BTYR1s',
    image: youtubeThumbnail('jcy68BTYR1s'),
    imageAlt: 'ShreeGO in conversation on The SJK Podcast',
    popular: true
  }
];

export const episodes = episodeCollection.sort((a, b) => b.published.localeCompare(a.published));

export const clips = [
  {
    id: 'iVGkgaefmdU',
    title: 'Representing Newa Culture Globally',
    guest: 'Aashutosh Barahi',
    published: '2026-04-25',
    url: 'https://youtu.be/iVGkgaefmdU',
    image: youtubeThumbnail('iVGkgaefmdU'),
    imageAlt: 'Aashutosh Barahi speaking about representing Newa culture globally'
  },
  {
    id: 'dRDt1-hhJqs',
    title: 'How Do You Detach Yourself From Someone or Something?',
    guest: 'Prashanna Bista',
    published: '2026-04-25',
    url: 'https://youtu.be/dRDt1-hhJqs',
    image: youtubeThumbnail('dRDt1-hhJqs'),
    imageAlt: 'Prashanna Bista discussing emotional detachment'
  },
  {
    id: 'g7LvTbOtc7s',
    title: "Taiwan's Defence: China & Russia's Strategic Game Unveiled",
    guest: 'Jonny Dymond',
    published: '2026-04-23',
    url: 'https://youtu.be/g7LvTbOtc7s',
    image: youtubeThumbnail('g7LvTbOtc7s'),
    imageAlt: 'Jonny Dymond discussing Taiwan, China and Russia'
  },
  {
    id: 'A4lc1_7RgCs',
    title: 'Newa Content Seen as Cringe',
    guest: 'Aashutosh Barahi',
    published: '2026-04-22',
    url: 'https://youtu.be/A4lc1_7RgCs',
    image: youtubeThumbnail('A4lc1_7RgCs'),
    imageAlt: 'Aashutosh Barahi discussing how Newa content is perceived'
  }
];

export const formatEpisodeDate = value => {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${value}T00:00:00Z`));
};
