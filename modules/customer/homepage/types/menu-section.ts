import type { MenuItem } from "./menu-item";

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};
