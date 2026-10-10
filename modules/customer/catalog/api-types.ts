/** Bentuk response API Laravel (lihat ammar-be-laravel: MenuController & BranchController). */

export type ApiAddon = {
  id: number;
  group_id: number;
  name: string;
  price: number;
  is_available: boolean;
};

export type ApiAddonGroup = {
  id: number;
  product_id: number;
  name: string;
  type: "variant" | "addon";
  is_required: boolean;
  min_qty: number;
  max_qty: number;
  addons: ApiAddon[];
};

export type ApiProduct = {
  id: number;
  category_id: number;
  image_url: string | null;
  name: string;
  price: number;
  is_available: boolean;
  addon_groups: ApiAddonGroup[];
};

export type ApiMenuCategory = {
  id: number;
  name: string;
  products: ApiProduct[];
};

export type ApiOpeningHour = {
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

export type ApiBranch = {
  id: number;
  name: string;
  address: string;
  description: string | null;
  phone: string | null;
  image_url: string | null;
  order_types: string[];
  is_open_now: boolean;
  opening_hours: ApiOpeningHour[];
};
