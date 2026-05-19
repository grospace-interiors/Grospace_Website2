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
