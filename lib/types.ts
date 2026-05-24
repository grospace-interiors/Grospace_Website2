export type VisualizationCategory = {
  id: string;
  name: string;
}

export type Visualization = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string;
}

export type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  items: string[];
  is_active: boolean;
  created_at: string;
}

export type LandingBudgetCollection = {
  id: string;
  title: string;
  subtitle: string;
  price_text: string;
  description: string;
  features: string[];
  footer_text: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export type Project = {
  id: string;
  title: string;
  client_name?: string;
  location?: string;
  description?: string;
  image: string;
  images?: string[];
  category?: string;
  style_type?: string;
  bhk_type?: string;
  area_size?: string;
  budget_range?: string;
  timeline?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
}
