export interface ProvinceContent {
  id: string;
  name: string;
  slug: string; // e.g., 'vinh-long'
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  stats: {
    label: string;
    value: string;
    icon: string;
  }[];
  // Add more fields as we scale
}

export interface Destination {
  id: string;
  province_id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  highlights: string[];
  order: number;
}

export interface Specialty {
  id: string;
  province_id: string;
  name: string;
  category: 'fruit' | 'dish';
  description: string;
  image_url: string;
  origin: string;
  taste: string;
}
