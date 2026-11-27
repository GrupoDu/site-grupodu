import { PostgrestError } from "@supabase/supabase-js";

export interface IProductResponse {
  products: IProduct[];
  error?: PostgrestError | null;
}
