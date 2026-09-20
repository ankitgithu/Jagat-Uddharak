export type Language = 'hi' | 'en';

export type PhotoSource = 'official-website' | 'instagram' | 'annapurna-website' | 'attached-asset';

export interface BookItem {
  id: string;
  title: string;
  titleEn?: string;
  coverImage: string;
  description: string;
  descriptionEn?: string;
  readUrl: string;
  pdfUrl: string;
  category: string;
  categoryEn?: string;
  language: string;
  featured?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  titleEn?: string;
  thumbnail: string;
  youtubeUrl: string;
  channel: 'Factful Debates' | 'Annapurna Muhim Official' | 'SA True Story Official';
  videoId: string;
}

export interface PhotoItem {
  id: string;
  image: string;
  title: string;
  titleEn?: string;
  category: 'संत रामपाल जी महाराज' | 'सामाजिक सेवा' | 'अन्नपूर्णा मुहिम' | 'कार्यक्रम' | 'आश्रम';
  source: PhotoSource;
  caption: string;
  captionEn?: string;
  instagramAccount?: '@spiritualleadersaintrampalji' | '@annapurnamuhim';
  postUrl?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface SpiritualTopic {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  details: string;
  detailsEn?: string;
  references: string[];
}

export interface HolyScripture {
  id: string;
  name: string;
  nameEn?: string;
  title: string;
  titleEn?: string;
  reference: string;
  referenceEn?: string;
  quote: string;
  meaning: string;
  meaningEn?: string;
  image: string;
}

export interface SocialReform {
  id: string;
  title: string;
  titleEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  impactPoints: string[];
  impactPointsEn?: string[];
}

export interface AnnapurnaInitiative {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  points: string[];
  pointsEn: string[];
  image: string;
  source: PhotoSource;
  link?: string;
}

export interface AnnapurnaStory {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  dateEn: string;
  image: string;
  source: PhotoSource;
  description: string;
  descriptionEn: string;
  articleUrl: string;
  category: string;
  categoryEn: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  dateEn?: string;
  image: string;
  description: string;
  descriptionEn?: string;
  category: string;
  categoryEn?: string;
  youtubeUrl?: string;
  channel?: string;
  videoId?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
  category: string;
  categoryEn?: string;
}

export interface FeaturedMediaItem {
  id: string;
  type: 'video' | 'playlist' | 'show';
  title: string;
  titleEn?: string;
  thumbnail: string;
  url: string;
  channel: string;
  videoId?: string;
  badge: string;
  badgeEn: string;
}

export interface AshramContact {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  locationEn: string;
  address: string;
  addressEn: string;
  phoneNumbers: string[];
}
