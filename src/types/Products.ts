interface Category {
  _id: string;
  name: string;
  key: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category: Category;
  key: string;
}

interface Collection {
  _id: string;
  name: string;
  key: string;
}

interface SubCollection {
  _id: string;
  name: string;
  collection: Collection;
  key: string;
}

export interface Product {
  _id: string;
  product_name: string;
  price: number;
  discount: number;
  product_description_1: string;
  product_description_2: string;
  product_description_3: string;
  product_category: Category[];
  product_sub_categories: SubCategory[];
  product_collection: Collection[];
  product_sub_collections: SubCollection[];
}

export interface ProductsResponse {
  resPerPage: number;
  currentPage: number;
  totalPages: number;
  filteredProductCount: number;
  message: string;
  products: Product[];
}
