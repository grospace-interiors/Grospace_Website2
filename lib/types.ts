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
