interface Filters {
  filter: string;
  options: string[];
}

const optionsList: Filters[] = [
  {
    filter: "mealType",
    options: ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"],
  },
  {
    filter: "dishType",
    options: ["Starter", "Main Course", "Desserts"],
  },
  {
    filter: "health",
    options: [
      "vegetarian",
      "vegan",
      "dairy-free",
      "red-meat-free",
      "shellfish-free",
      "wheat-free",
      "soy-free",
    ],
  },
  {
    filter: "cuisineType",
    options: [
      "French",
      "Italian",
      "Mediterranean",
      "Eastern Europe",
      "Central Europe",
      "Nordic",
    ],
  },
  {
    filter: "diet",
    options: [
      "balanced",
      "high-fiber",
      "high-protein",
      "low-carb",
      "low-fat",
      "low-sodium",
    ],
  },
];

export default optionsList;
