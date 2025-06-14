import { NestedService } from "@/type/service.type";

export const mockNestedServices: NestedService[] = [
  {
    id: 1,
    name: "Plumbing",
    parent_id: null,
    subcategory: [
      {
        id: 2,
        name: "Pipe Repair",
        parent_id: 1,
        subcategory: [
          {
            id: 6,
            name: "Leak Fixing",
            parent_id: 2,
            subcategory: [
              {
                id: 7,
                parent_id: 6,
                name: "Emergency Repair",
                subcategory: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Drain Cleaning",
        parent_id: 1,
        subcategory: [],
      },
    ],
  },
  {
    id: 4,
    name: "Electrical",
    parent_id: null,
    subcategory: [
      {
        id: 5,
        name: "Wiring",
        parent_id: 4,
        subcategory: [],
      },
    ],
  },
];

export const servicePrices: Record<number, number> = {
  7: 150, // Emergency Repair
  3: 80, // Drain Cleaning
  5: 120, // Wiring
};
