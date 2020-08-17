export interface LayoutItemInterface {
  key?: string;
  title: string;
  items: LayoutItemInterface[];
  [k: string]: any;
}
