export type Tloading = "idle" | "pending" | "succeeded" | "failed";
export type Tcategory = { id: string|number, title: string, prefix: string, img: string }[];
export type TProductItem = {
  id: string | number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  quantity: number;
  max: number,
  isLiked: boolean,
  isAuthenticated?:boolean
};

export type Tproduct = TProductItem[];
