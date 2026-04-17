import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Shield,
  Dumbbell,
  CheckCircle2,
  BookOpen,
  Target,
  CalendarDays,
  Trophy,
  Salad,
  Flame,
  Star,
  Gift,
  BadgeHelp,
  Coffee,
  CookingPot,
  Flower2,
} from "lucide-react";
import PartnerDashboard from "./PartnerDashboard";
import { saveProgress } from "./partnerApi";

const BREAKFASTS = [
  {
    title: "Berry Yogurt Power Bowl",
    why: "Protein + fiber + healthy fats can help keep energy steadier.",
    items: ["Greek yogurt", "berries", "chia seeds", "walnuts"],
  },
  {
    title: "Egg & Avocado Toast",
    why: "A balanced breakfast with protein and healthy fats.",
    items: ["2 eggs", "whole-grain toast", "avocado", "pepper flakes"],
  },
  {
    title: "Oats That Give Main Character Energy",
    why: "Oats and seeds add fiber, which many people with PCOS find helpful.",
    items: ["rolled oats", "cinnamon", "flax seeds", "apple slices"],
  },
  {
    title: "Besan Chilla Breakfast Shield",
    why: "Protein-rich and filling, with less sugar spike drama.",
    items: ["besan chilla", "mint chutney", "cucumber", "tea or water"],
  },
  {
    title: "Smoothie Sidekick",
    why: "Easy option for busy mornings when energy is low.",
    items: ["unsweetened milk", "spinach", "berries", "protein source"],
  },
];

const EXERCISES = [
  {
    title: "Princess Walk",
    subtitle: "20–30 minutes",
    why: "Regular movement supports insulin sensitivity and mood.",
  },
  {
    title: "Resistance Band Quest",
    subtitle: "10–15 minutes",
    why: "Strength work can help support metabolism and overall fitness.",
  },
  {
    title: "Dance Battle vs PCOS",
    subtitle: "1 fun song minimum",
    why: "Movement counts even when it is goofy and joyful.",
  },
  {
    title: "Stretch + Breathe Reset",
    subtitle: "8–10 minutes",
    why: "A calmer nervous system can help daily consistency feel easier.",
  },
];

const FOODS_TO_ENJOY = [
  "Eggs",
  "Greek yogurt or unsweetened yogurt",
  "Fish or chicken",
  "Lentils and beans",
  "Leafy greens",
  "Berries",
  "Avocado",
  "Nuts and seeds",
  "Whole grains in balanced portions",
  "Olive oil",
];

const LIMIT_MORE_OFTEN = [
  "Sugary drinks",
  "Highly processed snacks",
  "Very sugary breakfast foods",
  "Frequent fast food",
  "Large portions of refined carbs on their own",
];

const PRODUCTS = [
  {
    name: "Resistance Bands",
    reason: "Cute, easy home workouts with low friction.",
  },
  {
    name: "Pill Organizer",
    reason: "Helps with supplement consistency if prescribed or recommended.",
  },
  {
    name: "Large Water Bottle",
    reason: "Makes hydration easier without thinking too much.",
  },
  {
    name: "Spearmint Tea",
    reason: "Some people enjoy it as a calming routine, but it is not a cure.",
  },
  {
    name: "High-Protein Snack Box",
    reason: "Useful for busy days when meals go chaotic.",
  },
  {
    name: "Walking Shoes",
    reason: "The everyday hero item for consistency.",
  },
];

const GUIDE_SECTIONS = [
  {
    key: "basics",
    title: "PCOS Basics",
    text: "PCOS cannot be promised away or magically reversed by one food, one workout, or one supplement. But many symptoms can improve a lot with steady habits, medical follow-up, movement, balanced meals, sleep, and stress support.",
  },
  {
    key: "periods",
    title: "Why Regular Cycles Matter",
    text: "Regular periods are a really positive sign. Tracking them helps notice changes early and can be helpful later when planning pregnancy.",
  },
  {
    key: "fertility",
    title: "Future Fertility",
    text: "PCOS does not mean ‘cannot have children.’ Many people with PCOS conceive naturally or with help later. The game plan now is to build strong habits and stay medically supported.",
  },
  {
    key: "care",
    title: "Medical Support",
    text: "A doctor or gynecologist can help with periods, hormone symptoms, screenings, and pregnancy planning. This app is a supportive guide, not a diagnosis tool.",
  },
];

// --- Cook Book Section ---
// Each category is an object with a name and a recipes array
const COOKBOOK_CATEGORIES = [
  {
    name: "Indian Breakfasts",
    recipes: [
      {
        name: "Besan Chilla (Gram Flour Pancake)",
        ingredients: [
          "1 cup besan (gram flour)",
          "½ chopped onion",
          "½ chopped tomato",
          "½ chopped spinach",
          "1 green chili (optional)",
          "Salt",
          "Turmeric",
          "Water",
          "Olive oil (small amount)"
        ],
        steps: [
          "Mix besan with water to form batter.",
          "Add vegetables and spices.",
          "Heat pan with little oil.",
          "Pour batter like pancake.",
          "Cook both sides till golden."
        ],
        why: [
          "High protein → reduces insulin spikes",
          "Low glycemic index → keeps blood sugar stable",
          "Fiber from veggies → improves gut health",
          "Helps reduce cravings later in the day"
        ]
      },
      {
        name: "Moong Dal Chilla",
        ingredients: [
          "Soaked moong dal",
          "Ginger",
          "Green chili",
          "Salt",
          "Spinach",
          "Oil (minimal)"
        ],
        steps: [
          "Blend soaked dal.",
          "Add vegetables.",
          "Cook like pancake."
        ],
        why: [
          "Very high protein",
          "Helps reduce insulin resistance",
          "Keeps hunger low",
          "Helps manage weight gain"
        ]
      },
      {
        name: "Oats with Cinnamon & Seeds",
        ingredients: [
          "½ cup rolled oats",
          "1 cup milk (unsweetened)",
          "Cinnamon",
          "Chia seeds",
          "Flax seeds",
          "Apple slices"
        ],
        steps: [
          "Cook oats in milk.",
          "Add cinnamon.",
          "Top with seeds and apple."
        ],
        why: [
          "High fiber → improves insulin resistance",
          "Cinnamon → helps regulate blood sugar",
          "Seeds → support hormone balance",
          "Helps reduce belly fat accumulation"
        ]
      },
      {
        name: "Egg & Vegetable Omelette",
        ingredients: [
          "2 eggs",
          "Spinach",
          "Mushrooms",
          "Tomatoes",
          "Onion",
          "Black pepper",
          "Olive oil"
        ],
        steps: [
          "Beat eggs.",
          "Add vegetables.",
          "Cook in pan with minimal oil.",
          "Serve hot."
        ],
        why: [
          "Protein-rich → improves insulin sensitivity",
          "Keeps you full longer",
          "Helps reduce overeating",
          "Supports muscle metabolism"
        ]
      },
      {
        name: "Greek Yogurt Berry Bowl",
        ingredients: [
          "Greek yogurt",
          "Blueberries",
          "Strawberries",
          "Chia seeds",
          "Walnuts"
        ],
        steps: [
          "Mix everything in bowl."
        ],
        why: [
          "High protein → stabilizes blood sugar",
          "Berries → anti-inflammatory",
          "Healthy fats → reduce cravings",
          "Supports gut microbiome"
        ]
      },
      {
        name: "Vegetable Oats Upma",
        ingredients: [
          "1 cup oats",
          "1/2 cup mixed vegetables (carrot, beans, peas)",
          "1 tsp mustard seeds",
          "Curry leaves",
          "Salt",
          "Pepper",
          "1 tsp oil"
        ],
        steps: [
          "Roast oats lightly and set aside.",
          "Heat oil, add mustard seeds and curry leaves.",
          "Add vegetables and sauté.",
          "Add oats, salt, pepper, and a splash of water.",
          "Cook until veggies are soft and oats are fluffy."
        ],
        why: [
          "Balanced carbs + fiber",
          "Reduces midday cravings",
          "Supports steady energy release"
        ]
      },
      {
        name: "Ragi Dosa",
        ingredients: [
          "1 cup ragi flour",
          "1/4 cup rice flour",
          "1/4 cup yogurt",
          "Salt",
          "Water",
          "Oil for cooking"
        ],
        steps: [
          "Mix ragi, rice flour, yogurt, salt, and water to make a thin batter.",
          "Pour on hot pan, spread thin, cook with little oil.",
          "Flip and cook both sides."
        ],
        why: [
          "Low glycemic index",
          "Rich in calcium and fiber",
          "Supports blood sugar control"
        ]
      },
      {
        name: "Multigrain Vegetable Paratha (minimal oil)",
        ingredients: [
          "1 cup multigrain flour",
          "1/2 cup grated vegetables (carrot, spinach, beetroot)",
          "Salt",
          "Spices",
          "Water",
          "Minimal oil"
        ],
        steps: [
          "Mix flour, veggies, salt, spices, and water to make dough.",
          "Roll into parathas.",
          "Cook on pan with minimal oil."
        ],
        why: [
          "High fiber",
          "More nutrients than plain wheat",
          "Keeps you full longer"
        ]
      },
      {
        name: "Paneer Bhurji with veggies",
        ingredients: [
          "Paneer (crumbled)",
          "Onion",
          "Tomato",
          "Bell pepper",
          "Spinach",
          "Spices",
          "Oil"
        ],
        steps: [
          "Sauté onion, tomato, bell pepper in oil.",
          "Add spinach and cook.",
          "Add crumbled paneer and spices, cook for 2-3 min."
        ],
        why: [
          "High protein",
          "Vegetables add fiber",
          "Supports muscle and hormone health"
        ]
      },
      {
        name: "Vegetable Poha (with peanuts)",
        ingredients: [
          "1 cup poha (flattened rice)",
          "1/2 cup mixed vegetables",
          "2 tbsp peanuts",
          "Mustard seeds",
          "Curry leaves",
          "Salt",
          "Turmeric",
          "Oil"
        ],
        steps: [
          "Rinse poha and drain.",
          "Heat oil, add mustard seeds, curry leaves, peanuts.",
          "Add veggies, sauté, add poha, salt, turmeric.",
          "Mix and cook for 2-3 min."
        ],
        why: [
          "Quick, filling, and light",
          "Peanuts add protein and healthy fat",
          "Vegetables add fiber"
        ]
      },
      {
        name: "Idli with sambar",
        ingredients: [
          "Idli batter (fermented rice & urad dal)",
          "Sambar (lentil & vegetable stew)"
        ],
        steps: [
          "Steam idlis from batter.",
          "Serve hot with sambar."
        ],
        why: [
          "Fermented foods support gut health",
          "Sambar adds protein and fiber"
        ]
      },
      {
        name: "Vegetable Uttapam",
        ingredients: [
          "Idli/dosa batter",
          "Chopped vegetables (onion, tomato, capsicum, carrot)",
          "Oil"
        ],
        steps: [
          "Pour batter on pan, top with veggies.",
          "Cook both sides with little oil."
        ],
        why: [
          "Balanced carbs and fiber",
          "Vegetables add vitamins and minerals"
        ]
      },
      {
        name: "Sprouted Moong Salad",
        ingredients: [
          "Sprouted moong beans",
          "Onion",
          "Tomato",
          "Cucumber",
          "Lemon juice",
          "Salt",
          "Pepper"
        ],
        steps: [
          "Mix all ingredients in a bowl.",
          "Serve fresh."
        ],
        why: [
          "High protein",
          "Improves insulin sensitivity",
          "Very filling and light"
        ]
      },
      {
        name: "Oats Idli",
        ingredients: [
          "Oats (powdered)",
          "Semolina",
          "Yogurt",
          "Vegetables",
          "Eno/fruit salt",
          "Salt"
        ],
        steps: [
          "Mix oats, semolina, yogurt, veggies, salt.",
          "Add Eno, steam in idli molds."
        ],
        why: [
          "Higher fiber than regular idli",
          "Supports blood sugar control"
        ]
      },
      {
        name: "Millet Khichdi",
        ingredients: [
          "Millet",
          "Lentils",
          "Vegetables",
          "Spices",
          "Salt"
        ],
        steps: [
          "Cook millet, lentils, veggies, and spices together until soft."
        ],
        why: [
          "Balanced protein + carbs",
          "Improves digestion",
          "Reduces inflammation"
        ]
      },
      {
        name: "Vegetable Dalia (Broken Wheat Porridge)",
        ingredients: [
          "Broken wheat (dalia)",
          "Vegetables",
          "Salt",
          "Spices"
        ],
        steps: [
          "Cook dalia and veggies with water, salt, and spices until soft."
        ],
        why: [
          "High fiber",
          "Keeps you full longer",
          "Supports gut health"
        ]
      },
      {
        name: "Palak (Spinach) Omelette",
        ingredients: [
          "Eggs",
          "Spinach",
          "Onion",
          "Salt",
          "Pepper",
          "Oil"
        ],
        steps: [
          "Beat eggs, add spinach, onion, salt, pepper.",
          "Cook in pan with little oil."
        ],
        why: [
          "High protein",
          "Iron-rich",
          "Supports hormone balance"
        ]
      },
      {
        name: "Egg Bhurji with vegetables",
        ingredients: [
          "Eggs",
          "Onion",
          "Tomato",
          "Bell pepper",
          "Spinach",
          "Spices",
          "Oil"
        ],
        steps: [
          "Sauté onion, tomato, bell pepper in oil.",
          "Add spinach and cook.",
          "Add eggs, scramble, cook through."
        ],
        why: [
          "Protein-rich",
          "Vegetables add fiber",
          "Keeps you full longer"
        ]
      },
      {
        name: "Paneer Stuffed Moong Chilla",
        ingredients: [
          "Moong dal batter",
          "Paneer (grated)",
          "Spices",
          "Oil"
        ],
        steps: [
          "Make chilla with moong dal batter.",
          "Stuff with paneer and spices, fold and cook."
        ],
        why: [
          "High protein",
          "Keeps hunger low",
          "Supports muscle health"
        ]
      },
      {
        name: "Vegetable Besan Toast",
        ingredients: [
          "Bread (whole grain)",
          "Besan batter",
          "Chopped vegetables",
          "Spices",
          "Oil"
        ],
        steps: [
          "Dip bread in besan batter with veggies and spices.",
          "Cook on pan with little oil."
        ],
        why: [
          "More protein than regular toast",
          "Vegetables add fiber"
        ]
      },
      {
        name: "Peanut Chutney + Idli",
        ingredients: [
          "Idli",
          "Peanut chutney (peanuts, spices, lemon)"
        ],
        steps: [
          "Serve idli with peanut chutney."
        ],
        why: [
          "Peanuts add protein and healthy fat",
          "Fermented idli supports gut health"
        ]
      },
      {
        name: "Millet Pongal",
        ingredients: [
          "Millet",
          "Moong dal",
          "Spices",
          "Salt"
        ],
        steps: [
          "Cook millet, dal, spices, and salt together until soft."
        ],
        why: [
          "Balanced protein + carbs",
          "Easy to digest",
          "Supports steady energy"
        ]
      },
      {
        name: "Chia Seed Yogurt Bowl (Indian style)",
        ingredients: [
          "Yogurt",
          "Chia seeds",
          "Fruit (banana, apple, berries)",
          "Nuts"
        ],
        steps: [
          "Mix yogurt, chia seeds, fruit, and nuts in a bowl."
        ],
        why: [
          "High protein",
          "Healthy fats",
          "Supports hormone balance"
        ]
      },
    ],
  },
  {
    name: "Indian Lunch/Dinner",
    recipes: [
      {
        name: "Palak Paneer",
        ingredients: [
          "Spinach",
          "Paneer",
          "Garlic",
          "Onion",
          "Tomato",
          "Spices"
        ],
        steps: [
          "Cook spinach and blend.",
          "Cook paneer with spices.",
          "Combine together."
        ],
        why: [
          "Iron-rich → reduces fatigue",
          "Paneer provides protein",
          "Spinach reduces inflammation",
          "Supports hormonal balance"
        ]
      },
      {
        name: "Paneer Tikka",
        ingredients: [
          "Paneer cubes",
          "Yogurt",
          "Spices",
          "Bell peppers",
          "Onion",
          "Oil"
        ],
        steps: [
          "Marinate paneer and veggies in yogurt and spices.",
          "Skewer and grill or bake until golden."
        ],
        why: [
          "High protein",
          "Grilled, not fried",
          "Yogurt adds probiotics"
        ]
      },
      {
        name: "Rajma (Kidney Beans Curry)",
        ingredients: [
          "Kidney beans",
          "Onion",
          "Tomato",
          "Garlic",
          "Spices"
        ],
        steps: [
          "Soak and cook kidney beans.",
          "Sauté onion, garlic, spices, add tomato.",
          "Add beans, simmer."
        ],
        why: [
          "High fiber",
          "Improves blood sugar control",
          "Helps reduce cholesterol",
          "Supports gut bacteria"
        ]
      },
      {
        name: "Chole (Chickpea Curry)",
        ingredients: [
          "Chickpeas",
          "Onion",
          "Tomato",
          "Ginger",
          "Garlic",
          "Spices"
        ],
        steps: [
          "Soak and cook chickpeas.",
          "Sauté onion, ginger, garlic, spices.",
          "Add tomato, cook down, add chickpeas, simmer."
        ],
        why: [
          "Protein-rich",
          "High fiber",
          "Supports hormone balance"
        ]
      },
      {
        name: "Dal Tadka",
        ingredients: [
          "Lentils",
          "Onion",
          "Tomato",
          "Garlic",
          "Spices",
          "Oil or ghee"
        ],
        steps: [
          "Cook lentils until soft.",
          "Prepare tadka (tempering) with onion, garlic, spices in oil/ghee.",
          "Pour tadka over dal."
        ],
        why: [
          "Plant protein",
          "Easy to digest",
          "Supports gut health"
        ]
      },
      {
        name: "Dal Makhani (moderate butter)",
        ingredients: [
          "Whole urad dal",
          "Kidney beans",
          "Tomato",
          "Onion",
          "Butter (moderate)",
          "Cream (optional)",
          "Spices"
        ],
        steps: [
          "Cook dals until soft.",
          "Sauté onion, tomato, spices, add dals.",
          "Simmer with butter and a little cream."
        ],
        why: [
          "High protein",
          "Rich, but use moderate butter",
          "Good for occasional treat"
        ]
      },
      {
        name: "Vegetable Khichdi",
        ingredients: [
          "Rice or millet",
          "Lentils",
          "Mixed vegetables",
          "Spices",
          "Salt"
        ],
        steps: [
          "Cook rice/millet, lentils, veggies, and spices together until soft."
        ],
        why: [
          "Balanced protein + carbs",
          "Easy to digest",
          "Reduces inflammation"
        ]
      },
      {
        name: "Vegetable Curry",
        ingredients: [
          "Mixed vegetables",
          "Onion",
          "Tomato",
          "Spices",
          "Oil"
        ],
        steps: [
          "Sauté onion, tomato, spices in oil.",
          "Add vegetables, cook until tender."
        ],
        why: [
          "High fiber",
          "Vitamins and minerals",
          "Supports gut health"
        ]
      },
      {
        name: "Baingan Bharta",
        ingredients: [
          "Eggplant",
          "Onion",
          "Tomato",
          "Garlic",
          "Spices",
          "Oil"
        ],
        steps: [
          "Roast eggplant, peel and mash.",
          "Sauté onion, tomato, garlic, spices, add eggplant, cook."
        ],
        why: [
          "Low calorie",
          "High fiber",
          "Supports weight management"
        ]
      },
      {
        name: "Mixed Vegetable Sabzi",
        ingredients: [
          "Carrot",
          "Beans",
          "Cauliflower",
          "Cabbage",
          "Spices",
          "Oil"
        ],
        steps: [
          "Chop and cook all vegetables with spices and oil."
        ],
        why: [
          "High fiber",
          "Reduces inflammation",
          "Supports gut microbiome"
        ]
      },
      {
        name: "Lauki (Bottle Gourd) Curry",
        ingredients: [
          "Bottle gourd",
          "Onion",
          "Tomato",
          "Garlic",
          "Spices",
          "Oil"
        ],
        steps: [
          "Cook all ingredients together."
        ],
        why: [
          "Low calorie → supports weight loss",
          "Helps reduce bloating",
          "Easy to digest"
        ]
      },
      {
        name: "Tinda Sabzi",
        ingredients: [
          "Tinda (apple gourd)",
          "Onion",
          "Tomato",
          "Spices",
          "Oil"
        ],
        steps: [
          "Cook tinda with onion, tomato, spices, and oil."
        ],
        why: [
          "Low calorie",
          "Supports digestion"
        ]
      },
      {
        name: "Bhindi Masala",
        ingredients: [
          "Okra (bhindi)",
          "Onion",
          "Tomato",
          "Spices",
          "Oil"
        ],
        steps: [
          "Sauté okra, onion, tomato, spices in oil until cooked."
        ],
        why: [
          "Low calorie",
          "High fiber",
          "Supports gut health"
        ]
      },
      {
        name: "Cabbage Stir Fry",
        ingredients: [
          "Cabbage",
          "Carrot",
          "Spices",
          "Oil"
        ],
        steps: [
          "Stir fry cabbage, carrot, and spices in oil."
        ],
        why: [
          "High fiber",
          "Low calorie",
          "Supports digestion"
        ]
      },
      {
        name: "Palak Dal",
        ingredients: [
          "Spinach",
          "Lentils",
          "Onion",
          "Tomato",
          "Spices"
        ],
        steps: [
          "Cook lentils, spinach, onion, tomato, and spices together."
        ],
        why: [
          "Iron-rich",
          "Plant protein",
          "Supports hormone health"
        ]
      },
      {
        name: "Tofu Curry",
        ingredients: [
          "Tofu",
          "Onion",
          "Tomato",
          "Spices",
          "Oil"
        ],
        steps: [
          "Cook tofu with onion, tomato, spices, and oil."
        ],
        why: [
          "Plant protein",
          "Supports hormone balance"
        ]
      },
      {
        name: "Mushroom Masala",
        ingredients: [
          "Mushrooms",
          "Onion",
          "Tomato",
          "Spices",
          "Oil"
        ],
        steps: [
          "Cook mushrooms, onion, tomato, and spices in oil."
        ],
        why: [
          "Low calorie",
          "Supports immune health"
        ]
      },
      {
        name: "Vegetable Sambar",
        ingredients: [
          "Lentils",
          "Mixed vegetables",
          "Sambar powder",
          "Tamarind",
          "Spices"
        ],
        steps: [
          "Cook lentils and veggies with sambar powder, tamarind, and spices."
        ],
        why: [
          "High fiber",
          "Plant protein",
          "Supports gut health"
        ]
      },
      {
        name: "Chicken Curry (low oil)",
        ingredients: [
          "Chicken",
          "Onion",
          "Tomato",
          "Spices",
          "Minimal oil"
        ],
        steps: [
          "Cook chicken with onion, tomato, spices, and minimal oil."
        ],
        why: [
          "Lean protein",
          "Supports muscle health"
        ]
      },
      {
        name: "Fish Curry",
        ingredients: [
          "Fish",
          "Garlic",
          "Tomato",
          "Spices"
        ],
        steps: [
          "Cook fish in gravy with garlic, tomato, and spices, and minimal oil."
        ],
        why: [
          "Rich in Omega-3",
          "Reduces inflammation",
          "Improves hormone balance"
        ]
      },
      {
        name: "Grilled Tandoori Chicken",
        ingredients: [
          "Chicken",
          "Yogurt",
          "Tandoori masala",
          "Lemon juice",
          "Spices"
        ],
        steps: [
          "Marinate chicken in yogurt, spices, lemon.",
          "Grill until cooked through."
        ],
        why: [
          "Lean protein",
          "Grilled, not fried",
          "Yogurt adds probiotics"
        ]
      },
      {
        name: "Vegetable Biryani (brown rice version)",
        ingredients: [
          "Brown rice",
          "Mixed vegetables",
          "Spices",
          "Yogurt",
          "Oil"
        ],
        steps: [
          "Cook rice and veggies with spices, yogurt, and oil."
        ],
        why: [
          "More fiber than white rice biryani",
          "Vegetables add vitamins and minerals"
        ]
      },
      {
        name: "Paneer & Vegetable Stir Fry",
        ingredients: [
          "Paneer cubes",
          "Bell peppers",
          "Spinach",
          "Garlic",
          "Olive oil"
        ],
        steps: [
          "Cook paneer and vegetables in pan with olive oil and garlic."
        ],
        why: [
          "High protein",
          "Helps reduce cravings",
          "Supports muscle metabolism"
        ]
      },
      {
        name: "Chicken Saag",
        ingredients: [
          "Chicken",
          "Spinach",
          "Garlic",
          "Spices"
        ],
        steps: [
          "Cook chicken and spinach together with garlic and spices."
        ],
        why: [
          "Iron-rich",
          "Helps reduce fatigue",
          "Supports hormone health"
        ]
      },
      {
        name: "Methi Chicken",
        ingredients: [
          "Chicken",
          "Fenugreek leaves (methi)",
          "Onion",
          "Tomato",
          "Spices",
          "Oil"
        ],
        steps: [
          "Cook chicken with methi, onion, tomato, spices, and oil."
        ],
        why: [
          "Fenugreek supports blood sugar control",
          "Lean protein"
        ]
      },
    ],
  },
  {
    name: "Indian Snacks",
    recipes: [
      {
        name: "Roasted Chana",
        ingredients: ["Roasted chana (whole or split)", "Spices (optional)"],
        steps: ["Eat as is or toss with spices."],
        why: ["High protein", "Low calorie", "Good for snacking"]
      },
      {
        name: "Peanuts",
        ingredients: ["Peanuts (roasted or boiled)", "Salt (optional)", "Spices (optional)"],
        steps: ["Eat as is or toss with salt/spices."],
        why: ["Healthy fats", "Protein-rich", "Keeps you full"]
      },
      {
        name: "Sprouts Chaat",
        ingredients: ["Sprouted moong beans", "Onion", "Tomato", "Coriander", "Lemon juice", "Spices"],
        steps: ["Mix all ingredients in a bowl.", "Toss and serve fresh."],
        why: ["High protein", "Low glycemic index", "Supports weight management"]
      },
      {
        name: "Roasted Makhanas (Fox Nuts)",
        ingredients: ["Makhana (fox nuts)", "Ghee or oil (minimal)", "Spices"],
        steps: ["Roast makhana in ghee/oil with spices until crisp."],
        why: ["Low calorie", "High in minerals", "Good for snacking"]
      },
      {
        name: "Paneer Cubes",
        ingredients: ["Paneer (cubed)", "Spices (optional)", "Lemon juice (optional)"],
        steps: ["Eat as is or toss with spices/lemon."],
        why: ["High protein", "Supports muscle health", "Keeps you full"]
      },
      {
        name: "Vegetable Cutlets (air-fried)",
        ingredients: ["Boiled potatoes", "Mixed vegetables", "Spices", "Bread crumbs (optional)", "Oil (for brushing)"],
        steps: ["Mix all ingredients, shape into cutlets, air-fry or bake until golden."],
        why: ["Air-fried, not deep fried", "Vegetables add fiber", "Lower calorie snack"]
      },
      {
        name: "Masala Corn",
        ingredients: ["Boiled corn", "Lemon juice", "Chaat masala", "Spices"],
        steps: ["Mix all ingredients and serve warm."],
        why: ["Vitamins and minerals", "Low fat", "Filling snack"]
      },
      {
        name: "Peanut Chaat",
        ingredients: ["Boiled peanuts", "Onion", "Tomato", "Coriander", "Lemon juice", "Spices"],
        steps: ["Mix all ingredients in a bowl.", "Toss and serve."] ,
        why: ["Protein-rich", "Healthy fats", "Supports blood sugar control"]
      },
      {
        name: "Yogurt with seeds",
        ingredients: ["Yogurt", "Chia seeds", "Flax seeds", "Pumpkin seeds", "Honey (optional)", "Fruit (optional)"],
        steps: ["Mix yogurt with seeds and fruit/honey if desired."],
        why: ["High protein", "Healthy fats", "Supports hormone balance"]
      },
      {
        name: "Boiled Chickpeas",
        ingredients: ["Boiled chickpeas", "Salt", "Spices", "Lemon juice (optional)"],
        steps: ["Eat as is or toss with salt/spices/lemon."],
        why: ["High fiber", "Protein-rich", "Keeps you full"]
      },
      {
        name: "Vegetable Soup",
        ingredients: ["Mixed vegetables", "Water", "Salt", "Pepper", "Spices"],
        steps: ["Boil vegetables with water and spices until soft.", "Blend if desired.", "Serve hot."],
        why: ["Low calorie", "High fiber", "Supports hydration"]
      },
      {
        name: "Lentil Soup",
        ingredients: ["Lentils", "Onion", "Tomato", "Spices", "Water", "Salt"],
        steps: ["Cook lentils with onion, tomato, spices, and water until soft.", "Blend if desired.", "Serve hot."],
        why: ["Plant protein", "Filling snack", "Supports gut health"]
      },
    ],
  },
  {
    name: "Pakistani Breakfasts",
    recipes: [
      {
        name: "Besan Chilla",
        ingredients: ["1 cup besan (gram flour)", "½ chopped onion", "½ chopped tomato", "½ chopped spinach", "1 green chili (optional)", "Salt", "Turmeric", "Water", "Olive oil (small amount)"],
        steps: ["Mix besan with water to form batter.", "Add vegetables and spices.", "Heat pan with little oil.", "Pour batter like pancake.", "Cook both sides till golden."],
        why: ["High protein → reduces insulin spikes", "Low glycemic index → keeps blood sugar stable", "Fiber from veggies → improves gut health", "Helps reduce cravings later in the day"]
      },
      {
        name: "Anda Paratha (multigrain)",
        ingredients: ["2 eggs", "1 multigrain paratha (homemade or store-bought)", "Salt", "Pepper", "Oil (minimal)", "Chopped coriander (optional)"],
        steps: ["Beat eggs with salt, pepper, and coriander.", "Cook paratha lightly on pan.", "Pour eggs over paratha, cook both sides with minimal oil.", "Serve hot."],
        why: ["Protein + fiber combo", "Keeps you full longer", "Supports muscle and hormone health"]
      },
      {
        name: "Vegetable Omelette",
        ingredients: ["2 eggs", "Chopped onion", "Chopped tomato", "Chopped spinach", "Salt", "Pepper", "Oil (minimal)"],
        steps: ["Beat eggs with salt and pepper.", "Add chopped veggies.", "Cook in pan with minimal oil.", "Serve hot."],
        why: ["Protein-rich", "Vegetables add fiber", "Supports hormone balance"]
      },
      {
        name: "Paneer Paratha",
        ingredients: ["1 cup whole wheat flour", "Paneer (grated)", "Chopped coriander", "Salt", "Spices", "Water", "Oil (minimal)"],
        steps: ["Make dough with flour, water, salt.", "Stuff with paneer, coriander, spices.", "Roll and cook on pan with minimal oil."],
        why: ["High protein", "More filling than plain paratha", "Supports muscle health"]
      },
      {
        name: "Yogurt with chia seeds",
        ingredients: ["Yogurt", "Chia seeds", "Fruit (optional)", "Honey (optional)"],
        steps: ["Mix yogurt with chia seeds and fruit/honey if desired."],
        why: ["High protein", "Healthy fats", "Supports hormone balance"]
      },
      {
        name: "Boiled Eggs with vegetables",
        ingredients: ["2 boiled eggs", "Chopped cucumber", "Chopped tomato", "Chopped spinach", "Salt", "Pepper"],
        steps: ["Boil eggs, peel and slice.", "Serve with chopped veggies, salt, and pepper."],
        why: ["Protein-rich", "Vegetables add fiber", "Keeps you full"]
      },
      {
        name: "Oats Porridge",
        ingredients: ["½ cup rolled oats", "1 cup milk (unsweetened)", "Cinnamon", "Chia seeds", "Flax seeds", "Apple slices"],
        steps: ["Cook oats in milk.", "Add cinnamon.", "Top with seeds and apple."],
        why: ["High fiber → improves insulin resistance", "Cinnamon → helps regulate blood sugar", "Seeds → support hormone balance", "Helps reduce belly fat accumulation"]
      },
      {
        name: "Daliya",
        ingredients: ["Broken wheat (dalia)", "Vegetables", "Salt", "Spices"],
        steps: ["Cook dalia and veggies with water, salt, and spices until soft."],
        why: ["High fiber", "Keeps you full longer", "Supports gut health"]
      },
      {
        name: "Anda Bhurji",
        ingredients: ["2 eggs", "Onion", "Tomato", "Green chili (optional)", "Salt", "Pepper", "Oil (minimal)"],
        steps: ["Beat eggs with salt and pepper.", "Sauté onion, tomato, chili in oil.", "Add eggs, scramble, cook through."],
        why: ["Protein-rich", "Vegetables add fiber", "Keeps you full longer"]
      },
      {
        name: "Sprouted Lentil Salad",
        ingredients: ["Sprouted lentils", "Onion", "Tomato", "Cucumber", "Lemon juice", "Salt", "Pepper"],
        steps: ["Mix all ingredients in a bowl.", "Serve fresh."],
        why: ["High protein", "Improves insulin sensitivity", "Very filling and light"]
      },
      {
        name: "Millet Roti with yogurt",
        ingredients: ["Millet flour", "Water", "Salt", "Yogurt"],
        steps: ["Make dough with millet flour, water, salt.", "Roll into rotis, cook on pan.", "Serve with yogurt."],
        why: ["Low glycemic index", "Supports blood sugar control", "Yogurt adds protein"]
      },
      {
        name: "Chickpea Breakfast Bowl",
        ingredients: ["Boiled chickpeas", "Chopped veggies (onion, tomato, cucumber)", "Coriander", "Lemon juice", "Spices"],
        steps: ["Mix all ingredients in a bowl.", "Serve fresh."],
        why: ["High fiber", "Protein-rich", "Supports gut health"]
      },
    ],
  },
  {
    name: "Pakistani Lunch/Dinner",
    recipes: [
      {
        name: "Chicken Karahi (low oil version)",
        ingredients: ["Chicken pieces", "Tomato", "Ginger", "Garlic", "Green chili", "Spices", "Oil (minimal)", "Coriander"],
        steps: ["Heat minimal oil, sauté ginger, garlic, and green chili.", "Add chicken, cook until white.", "Add tomatoes and spices, cook until chicken is done and oil separates.", "Garnish with coriander."],
        why: ["Lean protein", "Low oil", "Spices support metabolism"]
      },
      {
        name: "Chicken Handi (light cream version)",
        ingredients: ["Chicken pieces", "Onion", "Tomato", "Ginger", "Garlic", "Spices", "Light cream or yogurt", "Oil (minimal)"],
        steps: ["Heat minimal oil, sauté onion, ginger, garlic.", "Add chicken, cook until white.", "Add tomato and spices, cook until chicken is done.", "Stir in light cream or yogurt at the end."],
        why: ["Lean protein", "Lighter than traditional handi", "Yogurt/cream adds calcium"]
      },
      {
        name: "Chicken Curry",
        ingredients: ["Chicken pieces", "Onion", "Tomato", "Ginger", "Garlic", "Spices", "Oil (minimal)"],
        steps: ["Heat minimal oil, sauté onion, ginger, garlic.", "Add chicken, cook until white.", "Add tomato and spices, cook until chicken is done."],
        why: ["Lean protein", "Low oil", "Supports muscle health"]
      },
      {
        name: "Daal Chawal (brown rice)",
        ingredients: ["Lentils (daal)", "Onion", "Tomato", "Spices", "Brown rice", "Oil (minimal)"],
        steps: ["Cook lentils with onion, tomato, spices.", "Cook brown rice separately.", "Serve lentils over rice."],
        why: ["Plant protein", "High fiber", "Brown rice supports blood sugar control"]
      },
      {
        name: "Chana Masala",
        ingredients: ["Chickpeas", "Onion", "Tomato", "Ginger", "Garlic", "Spices", "Oil (minimal)"],
        steps: ["Soak and cook chickpeas.", "Sauté onion, ginger, garlic, spices in minimal oil.", "Add tomato, cook down, add chickpeas, simmer."],
        why: ["Protein-rich", "High fiber", "Supports hormone balance"]
      },
      {
        name: "Rajma Curry",
        ingredients: ["Kidney beans", "Onion", "Tomato", "Garlic", "Spices", "Oil (minimal)"],
        steps: ["Soak and cook kidney beans.", "Sauté onion, garlic, spices in minimal oil, add tomato.", "Add beans, simmer."],
        why: ["High fiber", "Improves blood sugar control", "Supports gut bacteria"]
      },
      {
        name: "Aloo Methi (minimal potato)",
        ingredients: ["Potato (small amount)", "Fenugreek leaves (methi)", "Onion", "Spices", "Oil (minimal)"],
        steps: ["Heat minimal oil, sauté onion and spices.", "Add potato and methi, cook until done."],
        why: ["Fenugreek supports blood sugar control", "Minimal potato for lower glycemic load"]
      },
      {
        name: "Palak Chicken",
        ingredients: ["Chicken pieces", "Spinach", "Garlic", "Onion", "Spices", "Oil (minimal)"],
        steps: ["Cook spinach and blend.", "Heat minimal oil, sauté onion, garlic, and spices.", "Add chicken, cook until done.", "Add spinach puree, simmer.", "Serve hot."],
        why: ["Iron-rich", "Lean protein", "Spinach reduces inflammation"]
      },
      {
        name: "Bhindi Masala",
        ingredients: ["Okra (bhindi)", "Onion", "Tomato", "Spices", "Oil (minimal)"],
        steps: ["Sauté okra, onion, tomato, spices in minimal oil until cooked."],
        why: ["Low calorie", "High fiber", "Supports gut health"]
      },
      {
        name: "Lauki Curry",
        ingredients: ["Bottle gourd (lauki)", "Onion", "Tomato", "Spices", "Oil (minimal)"],
        steps: ["Cook all ingredients together with minimal oil until soft."],
        why: ["Low calorie", "Helps reduce bloating", "Easy to digest"]
      },
      {
        name: "Mixed Sabzi",
        ingredients: ["Mixed vegetables", "Onion", "Tomato", "Spices", "Oil (minimal)"],
        steps: ["Chop and cook all vegetables with onion, tomato, spices, and minimal oil."],
        why: ["High fiber", "Reduces inflammation", "Supports gut microbiome"]
      },
      {
        name: "Tinda Masala",
        ingredients: ["Tinda (apple gourd)", "Onion", "Tomato", "Spices", "Oil (minimal)"],
        steps: ["Cook tinda with onion, tomato, spices, and minimal oil."],
        why: ["Low calorie", "Supports digestion"]
      },
      {
        name: "Fish Curry",
        ingredients: ["Fish", "Garlic", "Tomato", "Spices", "Oil (minimal)"],
        steps: ["Cook fish in gravy with garlic, tomato, and spices, and minimal oil."],
        why: ["Rich in Omega-3", "Reduces inflammation", "Improves hormone balance"]
      },
      {
        name: "Grilled Chicken",
        ingredients: ["Chicken pieces", "Yogurt", "Spices", "Lemon juice"],
        steps: ["Marinate chicken in yogurt, spices, lemon.", "Grill until cooked through."],
        why: ["Lean protein", "Grilled, not fried", "Yogurt adds probiotics"]
      },
      {
        name: "Seekh Kebabs (grilled)",
        ingredients: ["Minced chicken or beef", "Onion", "Green chili", "Spices", "Coriander", "Lemon juice"],
        steps: ["Mix all ingredients, shape onto skewers.", "Grill until cooked through."],
        why: ["High protein", "Grilled, not fried", "Spices support metabolism"]
      },
      {
        name: "Shami Kebabs (air-fried)",
        ingredients: ["Minced chicken or beef", "Chana dal", "Onion", "Spices", "Egg (for binding)", "Oil (for brushing)"],
        steps: ["Cook meat, dal, onion, and spices together.", "Grind to paste, shape into patties.", "Air-fry or bake with minimal oil."],
        why: ["High protein", "Air-fried, not deep fried", "Good for snacking"]
      },
      {
        name: "Chicken Pulao (brown rice)",
        ingredients: ["Chicken pieces", "Brown rice", "Onion", "Spices", "Yogurt", "Oil (minimal)"],
        steps: ["Cook chicken with onion, spices, and yogurt.", "Add brown rice, cook until done."],
        why: ["More fiber than white rice", "Lean protein", "Keeps you full longer"]
      },
      {
        name: "Vegetable Pulao",
        ingredients: ["Brown rice", "Mixed vegetables", "Spices", "Onion", "Oil (minimal)"],
        steps: ["Cook rice and veggies with onion, spices, and minimal oil."],
        why: ["High fiber", "Vegetables add vitamins and minerals"]
      },
      {
        name: "Chicken & Vegetable Soup",
        ingredients: ["Chicken pieces", "Mixed vegetables", "Water", "Salt", "Pepper", "Spices"],
        steps: ["Boil chicken and vegetables with water, salt, pepper, and spices until cooked.", "Shred chicken if desired, serve hot."],
        why: ["Lean protein", "Hydrating", "Supports immune health"]
      },
      {
        name: "Chicken Yakhni",
        ingredients: ["Chicken pieces (with bone)", "Water", "Ginger", "Garlic", "Salt", "Pepper", "Spices"],
        steps: ["Boil chicken with all ingredients until broth is flavorful.", "Strain and serve hot."],
        why: ["Hydrating", "Rich in minerals", "Supports recovery"]
      },
      {
        name: "Haleem (small portion, protein-rich)",
        ingredients: ["Chicken or beef", "Lentils", "Broken wheat", "Spices", "Onion", "Ginger", "Garlic", "Oil (minimal)"],
        steps: ["Cook meat, lentils, wheat, onion, ginger, garlic, and spices together until soft.", "Blend to paste, cook with minimal oil."],
        why: ["High protein", "Filling meal", "Good for occasional treat"]
      },
      {
        name: "Nihari (occasional)",
        ingredients: ["Beef or mutton", "Onion", "Ginger", "Garlic", "Spices", "Oil (minimal)"],
        steps: ["Cook meat with onion, ginger, garlic, spices, and minimal oil until tender."],
        why: ["Rich in protein", "Occasional treat", "Spices support metabolism"]
      },
    ],
  },
  {
    name: "Pakistani Snacks",
    recipes: [
      {
        name: "Roasted Chickpeas",
        ingredients: ["Chickpeas (boiled)", "Spices", "Oil (minimal)", "Salt"],
        steps: ["Toss boiled chickpeas with spices, salt, and minimal oil.", "Roast in oven or air-fryer until crisp."],
        why: ["High protein", "High fiber", "Good for snacking"]
      },
      {
        name: "Boiled Eggs",
        ingredients: ["Eggs", "Salt", "Pepper"],
        steps: ["Boil eggs, peel and slice.", "Sprinkle with salt and pepper."],
        why: ["Protein-rich", "Keeps you full", "Supports muscle health"]
      },
      {
        name: "Yogurt",
        ingredients: ["Yogurt (plain or Greek)", "Chia seeds (optional)", "Fruit (optional)", "Honey (optional)"],
        steps: ["Eat yogurt as is or mix with seeds, fruit, or honey."] ,
        why: ["High protein", "Probiotics support gut health", "Good for hormone balance"]
      },
      {
        name: "Fruit Chaat (low sugar fruits)",
        ingredients: ["Seasonal low-sugar fruits (apple, berries, guava, etc.)", "Chaat masala", "Lemon juice"],
        steps: ["Chop fruits, toss with masala and lemon juice."] ,
        why: ["Vitamins and antioxidants", "No added sugar", "Supports immune health"]
      },
      {
        name: "Paneer Cubes",
        ingredients: ["Paneer (cubed)", "Spices (optional)", "Lemon juice (optional)"],
        steps: ["Eat as is or toss with spices/lemon."] ,
        why: ["High protein", "Supports muscle health", "Keeps you full"]
      },
      {
        name: "Nuts Mix",
        ingredients: ["Almonds", "Walnuts", "Pistachios", "Cashews (small amount)", "Raisins (optional)", "Salt (optional)"],
        steps: ["Mix all nuts and eat as a snack."] ,
        why: ["Healthy fats", "Keeps you full", "Supports hormone health"]
      },
      {
        name: "Vegetable Soup",
        ingredients: ["Mixed vegetables", "Water", "Salt", "Pepper", "Spices"],
        steps: ["Boil vegetables with water and spices until soft.", "Blend if desired.", "Serve hot."] ,
        why: ["Low calorie", "High fiber", "Supports hydration"]
      },
      {
        name: "Chicken Soup",
        ingredients: ["Chicken pieces", "Water", "Salt", "Pepper", "Spices", "Vegetables (optional)"],
        steps: ["Boil chicken (and vegetables if using) with water, salt, pepper, and spices until cooked.", "Shred chicken if desired, serve hot."] ,
        why: ["Lean protein", "Hydrating", "Supports immune health"]
      },
      {
        name: "Roasted Peanuts",
        ingredients: ["Peanuts (raw)", "Salt", "Spices (optional)"],
        steps: ["Roast peanuts in oven or pan until golden.", "Toss with salt and spices if desired."] ,
        why: ["Healthy fats", "Protein-rich", "Good for snacking"]
      },
    ],
  },
  {
    name: "American Breakfasts",
    recipes: [
      {
        name: "Greek Yogurt Bowl",
        ingredients: ["Greek yogurt", "Berries", "Chia seeds", "Walnuts", "Honey (optional)", "Granola (optional)"] ,
        steps: ["Mix yogurt with berries, chia seeds, walnuts, and honey/granola if desired."] ,
        why: ["High protein", "Berries are anti-inflammatory", "Healthy fats reduce cravings"]
      },
      {
        name: "Scrambled Eggs with Vegetables",
        ingredients: ["Eggs", "Spinach", "Tomato", "Onion", "Bell pepper", "Salt", "Pepper", "Oil (minimal)"] ,
        steps: ["Beat eggs with salt and pepper.", "Sauté vegetables in minimal oil.", "Add eggs, scramble, cook through."] ,
        why: ["Protein-rich", "Vegetables add fiber", "Keeps you full"]
      },
      {
        name: "Avocado Toast",
        ingredients: ["Whole grain bread", "Avocado", "Lemon juice", "Salt", "Pepper", "Egg (optional)"] ,
        steps: ["Toast bread.", "Mash avocado with lemon, salt, pepper.", "Spread on toast, top with egg if desired."] ,
        why: ["Healthy fats", "Fiber-rich", "Keeps blood sugar stable"]
      },
      {
        name: "Protein Smoothie",
        ingredients: ["Unsweetened milk or plant milk", "Protein powder", "Spinach", "Berries", "Chia seeds"] ,
        steps: ["Blend all ingredients until smooth."] ,
        why: ["High protein", "Antioxidants from berries", "Easy for busy mornings"]
      },
      {
        name: "Chia Seed Pudding",
        ingredients: ["Chia seeds", "Unsweetened milk or plant milk", "Honey (optional)", "Berries"] ,
        steps: ["Mix chia seeds with milk and honey.", "Let sit overnight.", "Top with berries."] ,
        why: ["High fiber", "Healthy fats", "Supports hormone balance"]
      },
      {
        name: "Overnight Oats",
        ingredients: ["Rolled oats", "Unsweetened milk or plant milk", "Chia seeds", "Berries", "Nuts", "Honey (optional)"] ,
        steps: ["Mix oats, milk, chia seeds, and honey.", "Let sit overnight.", "Top with berries and nuts."] ,
        why: ["High fiber", "Slow energy release", "Keeps you full"]
      },
      {
        name: "Cottage Cheese Bowl",
        ingredients: ["Cottage cheese", "Berries", "Nuts", "Seeds", "Honey (optional)"] ,
        steps: ["Mix cottage cheese with berries, nuts, seeds, and honey if desired."] ,
        why: ["High protein", "Calcium-rich", "Supports muscle health"]
      },
      {
        name: "Egg Muffins",
        ingredients: ["Eggs", "Spinach", "Tomato", "Bell pepper", "Salt", "Pepper", "Cheese (optional)"] ,
        steps: ["Beat eggs with salt and pepper.", "Mix in chopped veggies and cheese.", "Pour into muffin tins, bake until set."] ,
        why: ["Protein-rich", "Vegetables add fiber", "Good for meal prep"]
      },
      {
        name: "Spinach Omelette",
        ingredients: ["Eggs", "Spinach", "Onion", "Salt", "Pepper", "Oil (minimal)"] ,
        steps: ["Beat eggs with salt and pepper.", "Add spinach and onion.", "Cook in pan with minimal oil."] ,
        why: ["High protein", "Iron-rich", "Supports hormone balance"]
      },
      {
        name: "Peanut Butter Oatmeal",
        ingredients: ["Rolled oats", "Unsweetened milk", "Peanut butter", "Banana (optional)", "Cinnamon"] ,
        steps: ["Cook oats in milk.", "Stir in peanut butter and cinnamon.", "Top with banana if desired."] ,
        why: ["High fiber", "Healthy fats", "Keeps you full"]
      },
      {
        name: "Protein Pancakes",
        ingredients: ["Oats (blended)", "Eggs", "Banana", "Protein powder", "Baking powder", "Milk"] ,
        steps: ["Blend all ingredients to make batter.", "Cook on nonstick pan until golden."] ,
        why: ["High protein", "Lower glycemic than regular pancakes", "Good for muscle health"]
      },
      {
        name: "Almond Flour Pancakes",
        ingredients: ["Almond flour", "Eggs", "Baking powder", "Milk", "Honey (optional)"] ,
        steps: ["Mix all ingredients to make batter.", "Cook on nonstick pan until golden."] ,
        why: ["Low carb", "Healthy fats", "Supports blood sugar control"]
      },
      {
        name: "Turkey Bacon & Eggs",
        ingredients: ["Turkey bacon", "Eggs", "Salt", "Pepper", "Oil (minimal)"] ,
        steps: ["Cook turkey bacon in pan.", "Scramble or fry eggs with salt and pepper."] ,
        why: ["Lean protein", "Lower fat than pork bacon", "Keeps you full"]
      },
      {
        name: "Breakfast Burrito (whole wheat)",
        ingredients: ["Whole wheat tortilla", "Eggs", "Spinach", "Tomato", "Beans", "Cheese (optional)", "Salsa"] ,
        steps: ["Scramble eggs with spinach and tomato.", "Fill tortilla with eggs, beans, cheese, salsa.", "Wrap and serve."] ,
        why: ["High protein", "Fiber-rich", "Keeps you full"]
      },
      {
        name: "Egg & Veggie Wrap",
        ingredients: ["Whole wheat wrap", "Eggs", "Spinach", "Tomato", "Bell pepper", "Cheese (optional)"] ,
        steps: ["Scramble eggs with veggies.", "Fill wrap with eggs and cheese.", "Roll and serve."] ,
        why: ["Protein-rich", "Vegetables add fiber", "Good for on-the-go"]
      },
    ],
  },
  {
    name: "American Lunch/Dinner",
    recipes: [
      {
        name: "Grilled Chicken Breast",
        ingredients: ["Chicken breast", "Olive oil", "Lemon juice", "Garlic", "Salt", "Pepper", "Herbs (rosemary, thyme)"] ,
        steps: ["Marinate chicken with oil, lemon, garlic, salt, pepper, and herbs.", "Grill until cooked through."] ,
        why: ["Lean protein", "Low fat", "Supports muscle health"]
      },
      {
        name: "Baked Salmon",
        ingredients: ["Salmon fillet", "Olive oil", "Lemon", "Salt", "Pepper", "Dill or parsley"] ,
        steps: ["Place salmon on baking tray.", "Drizzle with oil, lemon, salt, pepper, and herbs.", "Bake until flaky."] ,
        why: ["Rich in Omega-3", "Reduces inflammation", "Supports hormone balance"]
      },
      {
        name: "Turkey Meatballs",
        ingredients: ["Ground turkey", "Egg", "Breadcrumbs (whole wheat)", "Onion", "Garlic", "Spices", "Parsley"] ,
        steps: ["Mix all ingredients, shape into balls.", "Bake or air-fry until cooked through."] ,
        why: ["Lean protein", "Lower fat than beef", "Good for meal prep"]
      },
      {
        name: "Chicken Salad",
        ingredients: ["Cooked chicken breast", "Lettuce", "Tomato", "Cucumber", "Avocado", "Olive oil", "Lemon juice", "Salt", "Pepper"] ,
        steps: ["Chop all ingredients.", "Toss with oil, lemon, salt, and pepper."] ,
        why: ["High protein", "Healthy fats", "Low carb"]
      },
      {
        name: "Tuna Salad",
        ingredients: ["Canned tuna (in water)", "Lettuce", "Tomato", "Cucumber", "Olive oil", "Lemon juice", "Salt", "Pepper"] ,
        steps: ["Drain tuna.", "Mix with chopped veggies, oil, lemon, salt, and pepper."] ,
        why: ["High protein", "Omega-3 from tuna", "Low calorie"]
      },
      {
        name: "Grilled Shrimp",
        ingredients: ["Shrimp (peeled)", "Olive oil", "Garlic", "Lemon juice", "Salt", "Pepper"] ,
        steps: ["Marinate shrimp with oil, garlic, lemon, salt, and pepper.", "Grill until pink."] ,
        why: ["Lean protein", "Low calorie", "Quick to prepare"]
      },
      {
        name: "Beef Stir Fry",
        ingredients: ["Lean beef strips", "Bell peppers", "Broccoli", "Carrot", "Soy sauce (low sodium)", "Garlic", "Ginger", "Oil (minimal)"] ,
        steps: ["Sauté beef in minimal oil.", "Add veggies, garlic, ginger, and soy sauce.", "Cook until veggies are tender."] ,
        why: ["High protein", "Vegetables add fiber", "Iron-rich"]
      },
      {
        name: "Zucchini Noodles",
        ingredients: ["Zucchini (spiralized)", "Olive oil", "Garlic", "Cherry tomatoes", "Basil", "Salt", "Pepper"] ,
        steps: ["Sauté garlic in oil.", "Add zucchini noodles and tomatoes.", "Cook until just tender.", "Top with basil, salt, and pepper."] ,
        why: ["Low carb", "High fiber", "Supports weight management"]
      },
      {
        name: "Stuffed Bell Peppers",
        ingredients: ["Bell peppers", "Ground turkey or chicken", "Brown rice", "Onion", "Tomato", "Spices", "Cheese (optional)"] ,
        steps: ["Cut tops off peppers, remove seeds.", "Stuff with cooked meat, rice, veggies, and spices.", "Top with cheese if desired, bake until peppers are soft."] ,
        why: ["High protein", "Fiber-rich", "Balanced meal"]
      },
      {
        name: "Chicken & Broccoli",
        ingredients: ["Chicken breast", "Broccoli", "Garlic", "Olive oil", "Salt", "Pepper"] ,
        steps: ["Sauté chicken in oil with garlic.", "Add broccoli, cook until tender.", "Season with salt and pepper."] ,
        why: ["Lean protein", "High fiber", "Supports muscle health"]
      },
      {
        name: "Roasted Vegetables",
        ingredients: ["Carrot", "Broccoli", "Cauliflower", "Bell pepper", "Olive oil", "Salt", "Pepper", "Herbs"] ,
        steps: ["Chop veggies, toss with oil, salt, pepper, and herbs.", "Roast until golden."] ,
        why: ["High fiber", "Vitamins and minerals", "Low calorie"]
      },
      {
        name: "Chicken & Quinoa Bowl",
        ingredients: ["Cooked chicken breast", "Quinoa", "Spinach", "Tomato", "Cucumber", "Olive oil", "Lemon juice"] ,
        steps: ["Cook quinoa.", "Top with chicken and veggies.", "Drizzle with oil and lemon."] ,
        why: ["High protein", "Quinoa is a complete protein", "Balanced meal"]
      },
      {
        name: "Turkey Chili",
        ingredients: ["Ground turkey", "Kidney beans", "Tomato", "Onion", "Bell pepper", "Spices", "Oil (minimal)"] ,
       
        why: ["High protein", "High fiber", "Filling meal"]
      },
      {
        name: "Lentil Soup",
        ingredients: ["Lentils", "Carrot", "Celery", "Onion", "Garlic", "Spices", "Water", "Salt", "Pepper"] ,
        steps: ["Cook lentils and veggies with water and spices until soft.", "Blend if desired, serve hot."] ,
        why: ["Plant protein", "High fiber", "Supports gut health"]
      },
      {
        name: "Chicken Fajita Bowl",
        ingredients: ["Chicken breast", "Bell peppers", "Onion", "Brown rice", "Spices", "Olive oil"] ,
        steps: ["Sauté chicken, peppers, and onion with spices in oil.", "Serve over brown rice."] ,
        why: ["High protein", "Fiber-rich", "Balanced meal"]
      },
      {
        name: "Steak with vegetables",
        ingredients: ["Lean steak", "Broccoli", "Carrot", "Olive oil", "Salt", "Pepper"] ,
        steps: ["Grill or pan-cook steak to desired doneness.", "Sauté or steam veggies, serve with steak."] ,
        why: ["High protein", "Iron-rich", "Supports muscle health"]
      },
      {
        name: "Grilled Tilapia",
        ingredients: ["Tilapia fillet", "Olive oil", "Lemon", "Salt", "Pepper", "Herbs"] ,
        steps: ["Drizzle tilapia with oil, lemon, salt, pepper, and herbs.", "Grill until cooked through."] ,
        why: ["Lean protein", "Low calorie", "Quick to prepare"]
      },
      {
        name: "Baked Cod",
        ingredients: ["Cod fillet", "Olive oil", "Lemon", "Salt", "Pepper", "Herbs"] ,
        steps: ["Place cod on baking tray.", "Drizzle with oil, lemon, salt, pepper, and herbs.", "Bake until flaky."] ,
        why: ["Lean protein", "Low calorie", "Supports muscle health"]
      },
      {
        name: "Chicken Lettuce Wraps",
        ingredients: ["Ground chicken", "Lettuce leaves", "Carrot", "Cucumber", "Soy sauce (low sodium)", "Ginger", "Garlic"] ,
        steps: ["Cook chicken with ginger, garlic, and soy sauce.", "Spoon into lettuce leaves, top with carrot and cucumber."] ,
        why: ["Low carb", "High protein", "Crunchy and filling"]
      },
    ],
  },
  {
    name: "American Snacks",
    recipes: [
      {
        name: "Apple + Peanut Butter",
        ingredients: ["Apple slices", "Peanut butter (unsweetened)"] ,
        steps: ["Slice apple.", "Spread peanut butter on slices."] ,
        why: ["Fiber + healthy fat", "Keeps you full", "No added sugar"]
      },
      {
        name: "Greek Yogurt",
        ingredients: ["Greek yogurt", "Berries (optional)", "Honey (optional)"] ,
        steps: ["Eat yogurt as is or top with berries/honey."] ,
        why: ["High protein", "Probiotics support gut health", "Good for hormone balance"]
      },
      {
        name: "Cottage Cheese",
        ingredients: ["Cottage cheese", "Pineapple or berries (optional)"] ,
        steps: ["Eat cottage cheese as is or top with fruit."] ,
        why: ["High protein", "Calcium-rich", "Keeps you full"]
      },
      {
        name: "Protein Bars",
        ingredients: ["Protein bar (low sugar, high protein)"] ,
        steps: ["Eat as a snack on the go."] ,
        why: ["High protein", "Convenient", "Supports muscle health"]
      },
      {
        name: "Almonds",
        ingredients: ["Almonds (raw or roasted)"] ,
        steps: ["Eat a small handful as a snack."] ,
        why: ["Healthy fats", "Keeps you full", "Supports hormone health"]
      },
      {
        name: "Walnuts",
        ingredients: ["Walnuts (raw or roasted)"] ,
        steps: ["Eat a small handful as a snack."] ,
        why: ["Omega-3 fats", "Supports brain health", "Reduces inflammation"]
      },
      {
        name: "Pumpkin Seeds",
        ingredients: ["Pumpkin seeds (raw or roasted)"] ,
        steps: ["Eat a small handful as a snack."] ,
        why: ["High in magnesium", "Supports hormone balance", "Keeps you full"]
      },
      {
        name: "Trail Mix",
        ingredients: ["Almonds", "Walnuts", "Pumpkin seeds", "Raisins (small amount)", "Dark chocolate chips (optional)"] ,
        steps: ["Mix all ingredients and eat as a snack."] ,
        why: ["Healthy fats", "Antioxidants", "Keeps you full"]
      },
      {
        name: "Hard-Boiled Eggs",
        ingredients: ["Eggs", "Salt", "Pepper"] ,
        steps: ["Boil eggs, peel and slice.", "Sprinkle with salt and pepper."] ,
        why: ["Protein-rich", "Keeps you full", "Supports muscle health"]
      },
      {
        name: "Protein Shake",
        ingredients: ["Protein powder", "Unsweetened milk or plant milk", "Berries (optional)"] ,
        steps: ["Blend all ingredients until smooth."] ,
        why: ["High protein", "Quick and convenient", "Good for post-workout"]
      },
      {
        name: "Celery + Hummus",
        ingredients: ["Celery sticks", "Hummus (chickpeas, tahini, lemon, garlic)"] ,
        steps: ["Dip celery sticks in hummus and enjoy."] ,
        why: ["Low calorie", "High fiber", "Keeps you full"]
      },
      {
        name: "Carrots + Hummus",
        ingredients: ["Carrot sticks", "Hummus (chickpeas, tahini, lemon, garlic)"] ,
        steps: ["Dip carrot sticks in hummus and enjoy."] ,
        why: ["Low calorie", "High fiber", "Supports gut health"]
      },
    ],
  },
  {
    name: "Soups",
    recipes: [
      {
        name: "Lentil Vegetable Soup",
        ingredients: ["Lentils", "Carrot", "Celery", "Onion", "Tomato", "Garlic", "Spices", "Water", "Salt", "Pepper"],
        steps: ["Cook lentils and veggies with water and spices until soft.", "Blend if desired, serve hot."],
        why: ["Plant protein", "High fiber", "Supports gut health"]
      },
      {
        name: "Chicken & Spinach Soup",
        ingredients: ["Chicken breast", "Spinach", "Carrot", "Onion", "Garlic", "Water", "Salt", "Pepper"],
        steps: ["Boil chicken with veggies, garlic, salt, and pepper until cooked.", "Shred chicken, add spinach, simmer, serve hot."],
        why: ["Lean protein", "Iron-rich", "Hydrating"]
      },
      {
        name: "Tomato Basil Soup",
        ingredients: ["Tomatoes", "Onion", "Garlic", "Basil", "Olive oil", "Salt", "Pepper"],
        steps: ["Sauté onion and garlic in oil.", "Add tomatoes, cook until soft.", "Blend with basil, season, serve hot."],
        why: ["Antioxidants", "Low calorie", "Supports immune health"]
      },
    ],
  },
  {
    name: "Salads",
    recipes: [
      {
        name: "Chickpea Salad",
        ingredients: ["Boiled chickpeas", "Cucumber", "Tomato", "Onion", "Coriander", "Lemon juice", "Salt", "Pepper"],
        steps: ["Mix all ingredients in a bowl, toss and serve."] ,
        why: ["High fiber", "Protein-rich", "Supports gut health"]
      },
      {
        name: "Quinoa Veggie Salad",
        ingredients: ["Cooked quinoa", "Bell peppers", "Cucumber", "Tomato", "Spinach", "Olive oil", "Lemon juice", "Salt", "Pepper"],
        steps: ["Mix all ingredients in a bowl, toss and serve."] ,
        why: ["Complete protein", "High fiber", "Keeps you full"]
      },
      {
        name: "Greek Salad",
        ingredients: ["Cucumber", "Tomato", "Red onion", "Feta cheese", "Olives", "Olive oil", "Lemon juice", "Oregano", "Salt", "Pepper"],
        steps: ["Chop veggies, mix with cheese and olives.", "Toss with oil, lemon, and seasonings."] ,
        why: ["Healthy fats", "Vitamins and minerals", "Low carb"]
      },
    ],
  },
  {
    name: "Desserts",
    recipes: [
      {
        name: "Chia Seed Pudding",
        ingredients: ["Chia seeds", "Unsweetened milk or plant milk", "Honey (optional)", "Berries"],
        steps: ["Mix chia seeds with milk and honey.", "Let sit overnight.", "Top with berries."] ,
        why: ["High fiber", "Healthy fats", "Supports hormone balance"]
      },
      {
        name: "Fruit & Nut Yogurt Parfait",
        ingredients: ["Greek yogurt", "Berries", "Nuts", "Honey (optional)"] ,
        steps: ["Layer yogurt, berries, and nuts in a glass.", "Drizzle with honey if desired."] ,
        why: ["High protein", "Antioxidants", "No added sugar"]
      },
      {
        name: "Baked Apple with Cinnamon",
        ingredients: ["Apple", "Cinnamon", "Walnuts", "Honey (optional)"] ,
        steps: ["Core apple, fill with walnuts and cinnamon.", "Bake until soft, drizzle with honey if desired."] ,
        why: ["Natural sweetness", "Fiber-rich", "No refined sugar"]
      },
    ],
  },
  {
    name: "Drinks",
    recipes: [
      {
        name: "Spearmint Tea",
        ingredients: ["Spearmint leaves", "Water", "Honey (optional)"] ,
        steps: ["Boil water, add spearmint leaves, steep, strain, and serve.", "Add honey if desired."] ,
        why: ["May help reduce androgen levels", "Calming", "No caffeine"]
      },
      {
        name: "Golden Milk (Turmeric Latte)",
        ingredients: ["Unsweetened milk or plant milk", "Turmeric", "Black pepper", "Ginger", "Honey (optional)"] ,
        steps: ["Heat milk with turmeric, pepper, and ginger.", "Sweeten with honey if desired."] ,
        why: ["Anti-inflammatory", "Supports hormone balance", "Comforting"]
      },
      {
        name: "Berry Smoothie",
        ingredients: ["Berries", "Unsweetened milk or plant milk", "Chia seeds", "Honey (optional)"] ,
        steps: ["Blend all ingredients until smooth."] ,
        why: ["Antioxidants", "High fiber", "No added sugar"]
      },
    ],
  },
];

// --- Healthy Tips Section ---
const HEALTHY_TIPS_CATEGORIES = [
  {
    name: "Hydration",
    tips: [
      {
        title: "Drink water before every meal",
        details: "Helps reduce overeating and supports metabolism.",
        why: "Staying hydrated can help reduce cravings and support hormone balance."
      },
      {
        title: "Keep water nearby and sip through the day",
        details: "Carry a water bottle and set reminders if needed.",
        why: "Consistent hydration supports energy and skin health."
      },
    ]
  },
  {
    name: "Sleep",
    tips: [
      {
        title: "Aim for 7-9 hours of sleep nightly",
        details: "Try to keep a consistent bedtime and wind-down routine.",
        why: "Good sleep helps regulate hormones and reduce stress."
      },
      {
        title: "Limit screen time before bed",
        details: "Avoid phones and laptops at least 30 minutes before sleep.",
        why: "Blue light can disrupt melatonin and sleep quality."
      },
    ]
  },
  {
    name: "Nutrition",
    tips: [
      {
        title: "Add a veggie to every plate",
        details: "Try to include vegetables at every meal for fiber and nutrients.",
        why: "Fiber helps with blood sugar control and gut health."
      },
      {
        title: "Eat slowly and mindfully",
        details: "Put down your fork between bites and savor your food.",
        why: "Mindful eating can help with digestion and portion control."
      },
      {
        title: "Try a new fruit or veggie each week",
        details: "Explore seasonal produce for variety and nutrients.",
        why: "Diversity in diet supports gut microbiome and overall health."
      },
      {
        title: "Keep healthy snacks visible",
        details: "Place fruits, nuts, or yogurt at eye level in the fridge.",
        why: "Visual cues make healthy choices easier."
      },
    ]
  },
  {
    name: "Movement",
    tips: [
      {
        title: "Take a 5-minute walk after meals",
        details: "A short walk can help with digestion and blood sugar.",
        why: "Movement after eating helps lower blood sugar spikes."
      },
      {
        title: "Batch-cook healthy meals on weekends",
        details: "Prepare meals in advance to make healthy eating easier.",
        why: "Meal prep reduces stress and helps you stick to your goals."
      },
    ]
  },
  {
    name: "Stress & Mindset",
    tips: [
      {
        title: "Practice deep breathing for stress",
        details: "Try 4-7-8 breathing or box breathing for a quick reset.",
        why: "Deep breathing calms the nervous system and reduces cortisol."
      },
      {
        title: "Celebrate small wins!",
        details: "Acknowledge your progress, no matter how tiny.",
        why: "Positive reinforcement builds motivation and consistency."
      },
    ]
  },
  {
    name: "Swaps",
    tips: [
      {
        title: "Swap sugary drinks for herbal tea",
        details: "Try mint, chamomile, or spearmint tea instead of soda or juice.",
        why: "Herbal teas hydrate and may help with hormone balance."
      },
    ]
  },
];

const affirmations = [
  "Laiba is not fighting alone. Afshaan is in the party.",
  "Tiny wins count. Today still matters.",
  "Consistency beats perfection every single time.",
  "A gentle routine is stronger than panic.",
  "PCOS picked the wrong team.",
];

function classNames(...parts) {
  return parts.filter(Boolean).join(" ");
}

function getDailyIndex(seedOffset = 0) {
  const today = new Date();
  const seed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate() + seedOffset;
  return Math.abs(seed);
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write failures
    }
  }, [key, value]);

  return [value, setValue];
}

function StatCard({ icon: Icon, title, value, sub }) {
  return (
    <div className="rounded-3xl bg-white/75 backdrop-blur p-4 shadow-sm border border-rose-100">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-rose-100 p-2 text-rose-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="text-xl font-semibold text-slate-800">{value}</div>
          {sub ? <div className="text-xs text-slate-500 mt-0.5">{sub}</div> : null}
        </div>
      </div>
    </div>
  );
}

function ChecklistItem({ checked, onChange, text, cute }) {
  return (
    <button
      onClick={onChange}
      className={classNames(
        "w-full text-left rounded-2xl border p-4 transition shadow-sm",
        checked
          ? "bg-emerald-50 border-emerald-200"
          : "bg-white/85 border-rose-100 hover:border-rose-200"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={classNames("mt-0.5", checked ? "text-emerald-600" : "text-slate-300")}> 
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="font-medium text-slate-800">{text}</div>
          {cute ? <div className="text-sm text-slate-500 mt-1">{cute}</div> : null}
        </div>
      </div>
    </button>
  );
}


export default function LaibaPCOSLoveGuideApp() {
  const [started, setStarted] = useLocalStorage("pcos-love-started", false);
  const [name, setName] = useLocalStorage("pcos-love-name", "Laiba");
  const [lastPeriodDate, setLastPeriodDate] = useLocalStorage("pcos-love-last-period", "");
  const [waterGoal, setWaterGoal] = useLocalStorage("pcos-love-water-goal", 8);
  const [completed, setCompleted] = useLocalStorage("pcos-love-completed", {});
  const [activeGuide, setActiveGuide] = useState("basics");
  const [activeSection, setActiveSection] = useState("main"); // main | cookbook | tips | partner
  // Move categoryIdx to top level to avoid hook order error
  const [categoryIdx, setCategoryIdx] = useState(0);
  // Modal state for recipe details
  const [openRecipe, setOpenRecipe] = useState(null); // {categoryIdx, recipeIdx} or null
  // --- Healthy Tips Browsing State ---
  const [tipCategoryIdx, setTipCategoryIdx] = useState(0);
  const [openTip, setOpenTip] = useState(null); // {categoryIdx, tipIdx} or null

  const daySeed = getDailyIndex();
  const breakfast = BREAKFASTS[daySeed % BREAKFASTS.length];
  const exercise = EXERCISES[daySeed % EXERCISES.length];
  const affirmation = affirmations[daySeed % affirmations.length];
  const bonusExercise = EXERCISES[(daySeed + 2) % EXERCISES.length];

  const dateKey = new Date().toISOString().slice(0, 10);
  const todayCompleted = completed[dateKey] || {
    breakfast: false,
    movement: false,
    water: false,
    supplement: false,
    sleep: false,
    stress: false,
  };

  const completionCount = Object.values(todayCompleted).filter(Boolean).length;
  const progress = Math.round((completionCount / 6) * 100);

  const daysSincePeriod = useMemo(() => {
    if (!lastPeriodDate) return null;
    const last = new Date(lastPeriodDate + "T00:00:00");
    const now = new Date();
    const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : null;
  }, [lastPeriodDate]);

  const guide = GUIDE_SECTIONS.find((s) => s.key === activeGuide) || GUIDE_SECTIONS[0];

  const toggleTask = (key) => {
    setCompleted((prev) => {
      const updated = {
        ...prev,
        [dateKey]: {
          ...todayCompleted,
          [key]: !todayCompleted[key],
        },
      };
      // Sync to Supabase
      saveProgress(name, dateKey, updated[dateKey]);
      return updated;
    });
  };

  const confettiHearts = Array.from({ length: 12 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 10, scale: 0.5 }}
      animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
      transition={{ delay: i * 0.06, duration: 2.2, repeat: Infinity, repeatType: "mirror" }}
      className="absolute text-rose-300"
      style={{ left: `${8 + i * 7}%`, top: `${10 + (i % 3) * 14}%` }}
    >
      <Heart className="h-4 w-4 fill-current" />
    </motion.div>
  ));

  // --- Section Navigation ---
  // Always render navigation bar for landing page
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="absolute top-6 left-6">
              <button onClick={() => setActiveSection("main")}
                className="rounded-full bg-white/90 px-4 py-2 text-rose-600 font-semibold border border-rose-200 shadow hover:bg-rose-50 transition">
                ← Home
              </button>
            </div>
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white/85 backdrop-blur-xl shadow-2xl border border-rose-100">
              {confettiHearts}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-10 bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    Cute Quest Mode Activated
                  </div>
                  <h1 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-slate-800">
                    Laiba, are you ready to fight PCOS with Afshaan? 💖
                  </h1>
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                      <Shield className="h-5 w-5 text-rose-500" />
                      <span>Daily PCOS support plan with minimal effort</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                      <BookOpen className="h-5 w-5 text-rose-500" />
                      <span>Friendly guidebook</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                      <Heart className="h-5 w-5 text-rose-500" />
                      <span>Built with love by Afshaan for Laiba</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="rounded-3xl border border-rose-100 bg-gradient-to-b from-white to-rose-50 p-6 shadow-sm">
                    <div className="text-sm uppercase tracking-[0.2em] text-rose-500 font-semibold">
                      Player Setup
                    </div>
                    <label className="block mt-5 text-sm text-slate-600">Hero name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200"
                      placeholder="Laiba"
                    />
                    <p className="mt-3 text-sm text-slate-500 leading-6">
                      The big goal: support better routines, steadier energy, healthier habits, and future fertility planning with kindness.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStarted(true)}
                      className="mt-6 w-full rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-5 py-4 text-white font-semibold shadow-lg"
                    >
                      Yes, let’s fight PCOS together ✨
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // --- Cook Book Section ---
  if (activeSection === "cookbook") {
    const category = COOKBOOK_CATEGORIES[categoryIdx];
    const showModal = openRecipe !== null;
    let modalRecipe = null;
    if (showModal) {
      const { categoryIdx: catIdx, recipeIdx } = openRecipe;
      const cat = COOKBOOK_CATEGORIES[catIdx];
      modalRecipe = cat && cat.recipes[recipeIdx];
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-slate-800">
        <div className="max-w-5xl mx-auto py-10 px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
            <button onClick={() => setActiveSection("main")}
              className="text-rose-600 hover:underline font-semibold">← Home</button>
            <h2 className="text-3xl font-black flex items-center gap-2"><CookingPot className="h-7 w-7 text-orange-500" />Cook Book</h2>
            <div className="flex gap-2 flex-wrap">
              {COOKBOOK_CATEGORIES.map((cat, idx) => (
                <button key={cat.name} onClick={() => setCategoryIdx(idx)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${categoryIdx === idx ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-700 border-rose-100 hover:border-rose-200'}`}>{cat.name}</button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.recipes.map((r, idx) => (
              <button key={r.name} onClick={() => setOpenRecipe({ categoryIdx, recipeIdx: idx })}
                className="rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-xl flex flex-col hover:shadow-2xl hover:border-orange-300 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400">
                <div className="font-bold text-lg mb-1">{r.name}</div>
                <div className="text-xs text-slate-400 mt-1">Click for details</div>
              </button>
            ))}
          </div>
        </div>
        {/* Modal for recipe details */}
        {showModal && modalRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
              <button onClick={() => setOpenRecipe(null)} className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 text-xl font-bold">×</button>
              <h3 className="text-2xl font-black mb-2">{modalRecipe.name}</h3>
              {modalRecipe.ingredients || modalRecipe.steps || modalRecipe.why ? (
                <>
                  {modalRecipe.ingredients && (
                    <div className="mt-4">
                      <div className="font-semibold text-orange-700 mb-1">Ingredients:</div>
                      <ul className="list-disc ml-6 text-slate-700">
                        {modalRecipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {modalRecipe.steps && (
                    <div className="mt-4">
                      <div className="font-semibold text-orange-700 mb-1">How to Make:</div>
                      <ol className="list-decimal ml-6 text-slate-700">
                        {modalRecipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                      </ol>
                    </div>
                  )}
                  {modalRecipe.why && (
                    <div className="mt-4">
                      <div className="font-semibold text-emerald-700 mb-1">Why It’s Good for PCOS:</div>
                      <ul className="list-disc ml-6 text-slate-700">
                        {modalRecipe.why.map((reason, i) => <li key={i}>{reason}</li>)}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-slate-500 mt-4">More details coming soon!</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Healthy Tips Section ---
  if (activeSection === "tips") {
    // --- Browsable, categorized, modal Healthy Tips ---
    const tipCategory = HEALTHY_TIPS_CATEGORIES[tipCategoryIdx];
    const showTipModal = openTip !== null;
    let modalTip = null;
    if (showTipModal) {
      const { categoryIdx, tipIdx } = openTip;
      const cat = HEALTHY_TIPS_CATEGORIES[categoryIdx];
      modalTip = cat && cat.tips[tipIdx];
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-slate-800">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
            <button onClick={() => setActiveSection("main")}
              className="text-rose-600 hover:underline font-semibold">← Home</button>
            <h2 className="text-3xl font-black flex items-center gap-2"><Star className="h-7 w-7 text-emerald-500" />Healthy Tips</h2>
            <div className="flex gap-2 flex-wrap">
              {HEALTHY_TIPS_CATEGORIES.map((cat, idx) => (
                <button key={cat.name} onClick={() => setTipCategoryIdx(idx)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${tipCategoryIdx === idx ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-700 border-emerald-100 hover:border-emerald-200'}`}>{cat.name}</button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tipCategory.tips.map((t, idx) => (
              <button key={t.title} onClick={() => setOpenTip({ categoryIdx: tipCategoryIdx, tipIdx: idx })}
                className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl flex flex-col hover:shadow-2xl hover:border-emerald-300 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <div className="font-bold text-lg mb-1">{t.title}</div>
                <div className="text-xs text-slate-400 mt-1">Click for details</div>
              </button>
            ))}
          </div>
        </div>
        {/* Modal for tip details */}
        {showTipModal && modalTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
              <button onClick={() => setOpenTip(null)} className="absolute top-3 right-3 text-emerald-500 hover:text-emerald-700 text-xl font-bold">×</button>
              <h3 className="text-2xl font-black mb-2">{modalTip.title}</h3>
              <div className="mt-4">
                <div className="font-semibold text-emerald-700 mb-1">Details:</div>
                <div className="text-slate-700 mb-2">{modalTip.details}</div>
                <div className="font-semibold text-orange-700 mb-1">Why It’s Good for PCOS:</div>
                <div className="text-slate-700">{modalTip.why}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Main Section ---
  if (activeSection === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-slate-800">
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => setStarted(false)}
            className="rounded-full bg-white/90 px-4 py-2 text-rose-600 font-semibold border border-rose-200 shadow hover:bg-rose-50 transition"
          >
            ← Back to Intro
          </button>
        </div>
        <div className="flex gap-4 justify-center pt-6 pb-2">
          <button onClick={() => setActiveSection("cookbook")}
            className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700 shadow-sm border border-orange-200 hover:bg-orange-200 transition">🍲 Cook Book</button>
          <button onClick={() => setActiveSection("tips")}
            className="rounded-full bg-emerald-100 px-5 py-2 font-semibold text-emerald-700 shadow-sm border border-emerald-200 hover:bg-emerald-200 transition">🌱 Healthy Tips</button>
          <button onClick={() => setActiveSection("partner")}
            className="rounded-full bg-indigo-100 px-5 py-2 font-semibold text-indigo-700 shadow-sm border border-indigo-200 hover:bg-indigo-200 transition">🤝 Partner Mode</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto p-4 md:p-6"
          >
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-rose-100 bg-white/85 backdrop-blur-xl p-6 md:p-8 shadow-xl overflow-hidden relative">
                  <div className="absolute right-4 top-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                      <Heart className="h-3.5 w-3.5" /> Love Mode
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      <Sparkles className="h-3.5 w-3.5" /> Quest Day
                    </span>
                  </div>

                  <div className="max-w-3xl">
                    <div className="text-sm uppercase tracking-[0.24em] text-rose-500 font-semibold">Daily Boss Battle</div>
                    <h2 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
                      {name || "Laiba"}, today we annoy PCOS by being ridiculously consistent.
                    </h2>
                    <p className="mt-4 text-slate-600 text-lg leading-8">{affirmation}</p>
                  </div>

                  <div className="mt-8 grid sm:grid-cols-3 gap-4">
                    <StatCard icon={Trophy} title="Daily Progress" value={`${progress}%`} sub={`${completionCount}/6 quests done`} />
                    <StatCard icon={CalendarDays} title="Days Since Last Period" value={daysSincePeriod ?? "—"} sub={daysSincePeriod === null ? "Add a date below" : "Tracking helps notice changes"} />
                    <StatCard icon={Shield} title="Main Goal" value="Steady habits" sub="Not perfection. Just progress." />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-[2rem] border border-rose-100 bg-white/85 p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-rose-100 p-3 text-rose-600"><Coffee className="h-5 w-5" /></div>
                      <div>
                        <h3 className="font-bold text-xl">Breakfast of the Day</h3>
                        <p className="text-sm text-slate-500">Low-friction, PCOS-friendly-ish idea</p>
                      </div>
                    </div>
                    <div className="mt-5 rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50 p-5 border border-rose-100">
                      <div className="text-lg font-semibold">{breakfast.title}</div>
                      <p className="mt-2 text-slate-600 leading-7">{breakfast.why}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {breakfast.items.map((item) => (
                          <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm border border-rose-100">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-rose-100 bg-white/85 p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-orange-100 p-3 text-orange-600"><Dumbbell className="h-5 w-5" /></div>
                      <div>
                        <h3 className="font-bold text-xl">Movement Quest</h3>
                        <p className="text-sm text-slate-500">Cute cardio. Strong heroine energy.</p>
                      </div>
                    </div>
                    <div className="mt-5 rounded-3xl bg-gradient-to-br from-orange-50 to-rose-50 p-5 border border-rose-100">
                      <div className="text-lg font-semibold">{exercise.title}</div>
                      <div className="mt-1 text-sm text-orange-700 font-medium">{exercise.subtitle}</div>
                      <p className="mt-3 text-slate-600 leading-7">{exercise.why}</p>
                      <div className="mt-4 text-sm text-slate-500">Bonus side quest: {bonusExercise.title}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-rose-100 bg-white/90 p-6 shadow-xl">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="text-2xl font-black">Today’s To-Do Love List</h3>
                      <p className="text-slate-500 mt-1">Minimal manual effort. Maximum cute accountability.</p>
                    </div>
                    <div className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
                      {completionCount === 6 ? "Boss defeated ✨" : `${6 - completionCount} little quests left`}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <ChecklistItem
                      checked={todayCompleted.breakfast}
                      onChange={() => toggleTask("breakfast")}
                      text={`Eat or prep the breakfast suggestion: ${breakfast.title}`}
                      cute="No perfection needed. Even partial counts."
                    />
                    <ChecklistItem
                      checked={todayCompleted.movement}
                      onChange={() => toggleTask("movement")}
                      text={`Do the movement quest: ${exercise.title}`}
                      cute="Walking counts. Dancing counts. Existing counts."
                    />
                    <ChecklistItem
                      checked={todayCompleted.water}
                      onChange={() => toggleTask("water")}
                      text={`Hydration quest: aim for ${waterGoal} cups today`}
                      cute="Water bottle = emotional support item."
                    />
                    <ChecklistItem
                      checked={todayCompleted.supplement}
                      onChange={() => toggleTask("supplement")}
                      text="Take supplements/meds if prescribed or already part of the routine"
                      cute="Only as recommended by a clinician."
                    />
                    <ChecklistItem
                      checked={todayCompleted.stress}
                      onChange={() => toggleTask("stress")}
                      text="Do one calm thing for stress: prayer, journaling, breathing, tea, or a walk"
                      cute="Mini peace break for the nervous system."
                    />
                    <ChecklistItem
                      checked={todayCompleted.sleep}
                      onChange={() => toggleTask("sleep")}
                      text="Protect tonight’s sleep with a calmer bedtime"
                      cute="Sleep is skincare, moodcare, and hormonecare."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-[2rem] border border-rose-100 bg-white/85 p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600"><Salad className="h-5 w-5" /></div>
                      <div>
                        <h3 className="text-xl font-bold">Foods to Enjoy More Often</h3>
                        <p className="text-sm text-slate-500">Balanced, filling, supportive choices</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {FOODS_TO_ENJOY.map((food) => (
                        <span key={food} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-rose-100 bg-white/85 p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-amber-100 p-3 text-amber-600"><Flame className="h-5 w-5" /></div>
                      <div>
                        <h3 className="text-xl font-bold">Try to Limit More Often</h3>
                        <p className="text-sm text-slate-500">Not forbidden. Just less frequent.</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {LIMIT_MORE_OFTEN.map((food) => (
                        <span key={food} className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-sm text-amber-800">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-rose-100 bg-white/90 p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600"><BookOpen className="h-5 w-5" /></div>
                    <div>
                      <h3 className="text-2xl font-black">The PCOS Guidebook</h3>
                      <p className="text-slate-500">Cute, calm, and actually useful</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {GUIDE_SECTIONS.map((section) => (
                      <button
                        key={section.key}
                        onClick={() => setActiveGuide(section.key)}
                        className={classNames(
                          "rounded-full px-4 py-2 text-sm font-medium border transition",
                          activeGuide === section.key
                            ? "bg-rose-500 text-white border-rose-500"
                            : "bg-white text-slate-700 border-rose-100 hover:border-rose-200"
                        )}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-rose-50 border border-rose-100 p-5">
                    <div className="text-lg font-semibold">{guide.title}</div>
                    <p className="mt-3 leading-7 text-slate-600">{guide.text}</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-rose-100 bg-white/90 p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-600"><Target className="h-5 w-5" /></div>
                    <div>
                      <h3 className="text-xl font-bold">Minimal Tracking</h3>
                      <p className="text-sm text-slate-500">Only the basics. No exhausting forms.</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-sm text-slate-600">Last period start date</label>
                      <input
                        type="date"
                        value={lastPeriodDate}
                        onChange={(e) => setLastPeriodDate(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Water goal (cups)</label>
                      <input
                        type="range"
                        min="5"
                        max="12"
                        value={waterGoal}
                        onChange={(e) => setWaterGoal(Number(e.target.value))}
                        className="mt-3 w-full"
                      />
                      <div className="text-sm text-slate-500 mt-1">Current goal: {waterGoal} cups</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-rose-100 bg-white/90 p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-violet-100 p-3 text-violet-600"><Gift className="h-5 w-5" /></div>
                    <div>
                      <h3 className="text-xl font-bold">Helpful Product Suggestions</h3>
                      <p className="text-sm text-slate-500">Support items, not miracle cures</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {PRODUCTS.map((product) => (
                      <div key={product.name} className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                        <div className="font-medium text-slate-800">{product.name}</div>
                        <div className="text-sm text-slate-500 mt-1">{product.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-rose-100 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 p-6 shadow-xl text-white">
                  <div className="flex items-center gap-3">
                    <Flower2 className="h-6 w-6" />
                    <h3 className="text-xl font-black">Love Note Corner</h3>
                  </div>
                  <p className="mt-4 leading-8 text-white/95">
                    Dear {name || "Laiba"}, this app is here to remind you that caring for PCOS does not mean being perfect. It means being loved, supported, and gently consistent. Afshaan is on your team. Every walk, every balanced meal, every early bedtime, every little choice counts.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-rose-100 bg-white/90 p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <BadgeHelp className="h-5 w-5 text-rose-500" />
                </div>
              </div>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}

  if (activeSection === "partner") {
    return <PartnerDashboard userId={name} />;
  }

  return null;
}
