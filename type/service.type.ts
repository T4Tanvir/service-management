interface NestedService {
  id: number;
  name: string;
  parent_id: number | null;
  subcategory: NestedService[];
}

export type { NestedService };
