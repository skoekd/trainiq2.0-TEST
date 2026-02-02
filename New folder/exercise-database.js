// COMPREHENSIVE EVIDENCE-BASED EXERCISE DATABASE
// Based on movement patterns, muscle groups, and equipment

const EXERCISE_DATABASE = {
  // CHEST - Horizontal Push
  chest_horizontal: [
    { name: "Barbell Bench Press", primary: "chest", secondary: ["triceps", "front_delts"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [3, 12], progression: "linear" },
    { name: "Incline Barbell Bench Press", primary: "chest", secondary: ["triceps", "front_delts"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [5, 12], progression: "linear" },
    { name: "Decline Barbell Bench Press", primary: "chest", secondary: ["triceps"], type: "compound", equipment: "barbell", skill: "medium", fatigue: "high", repRange: [6, 12], progression: "linear" },
    { name: "Dumbbell Bench Press", primary: "chest", secondary: ["triceps", "front_delts"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "high", repRange: [6, 15], progression: "linear" },
    { name: "Incline Dumbbell Press", primary: "chest", secondary: ["triceps", "front_delts"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "high", repRange: [6, 15], progression: "linear" },
    { name: "Decline Dumbbell Press", primary: "chest", secondary: ["triceps"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Weighted Dips", primary: "chest", secondary: ["triceps", "front_delts"], type: "compound", equipment: "bodyweight", skill: "high", fatigue: "high", repRange: [5, 12], progression: "weighted" },
    { name: "Bodyweight Dips", primary: "chest", secondary: ["triceps"], type: "compound", equipment: "bodyweight", skill: "medium", fatigue: "medium", repRange: [6, 15], progression: "reps" },
    { name: "Machine Chest Press", primary: "chest", secondary: ["triceps"], type: "compound", equipment: "machine", skill: "low", fatigue: "medium", repRange: [8, 20], progression: "linear" },
    { name: "Cable Chest Press", primary: "chest", secondary: ["triceps"], type: "compound", equipment: "cable", skill: "medium", fatigue: "medium", repRange: [10, 20], progression: "linear" }
  ],
  
  // CHEST - Flies/Isolation
  chest_isolation: [
    { name: "Cable Flyes", primary: "chest", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Dumbbell Flyes", primary: "chest", secondary: [], type: "isolation", equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [10, 20], progression: "linear" },
    { name: "Pec Deck Machine", primary: "chest", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [12, 25], progression: "linear" },
    { name: "Incline Cable Flyes", primary: "chest", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Incline Dumbbell Flyes", primary: "chest", secondary: [], type: "isolation", equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [10, 20], progression: "linear" }
  ],
  
  // BACK - Vertical Pull
  back_vertical: [
    { name: "Pull-ups", primary: "lats", secondary: ["biceps", "rear_delts"], type: "compound", equipment: "bodyweight", skill: "high", fatigue: "high", repRange: [5, 15], progression: "weighted" },
    { name: "Weighted Pull-ups", primary: "lats", secondary: ["biceps"], type: "compound", equipment: "bodyweight", skill: "high", fatigue: "high", repRange: [3, 10], progression: "weighted" },
    { name: "Chin-ups", primary: "lats", secondary: ["biceps"], type: "compound", equipment: "bodyweight", skill: "high", fatigue: "high", repRange: [5, 15], progression: "weighted" },
    { name: "Lat Pulldown", primary: "lats", secondary: ["biceps"], type: "compound", equipment: "cable", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Wide-Grip Lat Pulldown", primary: "lats", secondary: ["biceps"], type: "compound", equipment: "cable", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Close-Grip Lat Pulldown", primary: "lats", secondary: ["biceps"], type: "compound", equipment: "cable", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" }
  ],
  
  // BACK - Horizontal Pull
  back_horizontal: [
    { name: "Barbell Row", primary: "back", secondary: ["biceps", "rear_delts"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [5, 12], progression: "linear" },
    { name: "Pendlay Row", primary: "back", secondary: ["biceps"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [5, 10], progression: "linear" },
    { name: "T-Bar Row", primary: "back", secondary: ["biceps", "rear_delts"], type: "compound", equipment: "barbell", skill: "medium", fatigue: "high", repRange: [6, 12], progression: "linear" },
    { name: "Dumbbell Row", primary: "back", secondary: ["biceps"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Chest-Supported Row", primary: "back", secondary: ["biceps"], type: "compound", equipment: "machine", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Seated Cable Row", primary: "back", secondary: ["biceps"], type: "compound", equipment: "cable", skill: "low", fatigue: "medium", repRange: [10, 20], progression: "linear" },
    { name: "Machine Row", primary: "back", secondary: ["biceps"], type: "compound", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" }
  ],
  
  // SHOULDERS - Overhead Press
  shoulders_press: [
    { name: "Overhead Press", primary: "front_delts", secondary: ["triceps", "upper_chest"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [4, 10], progression: "linear" },
    { name: "Seated Dumbbell Press", primary: "front_delts", secondary: ["triceps"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "high", repRange: [6, 12], progression: "linear" },
    { name: "Standing Dumbbell Press", primary: "front_delts", secondary: ["triceps", "core"], type: "compound", equipment: "dumbbell", skill: "high", fatigue: "high", repRange: [6, 12], progression: "linear" },
    { name: "Arnold Press", primary: "front_delts", secondary: ["side_delts", "triceps"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Machine Shoulder Press", primary: "front_delts", secondary: ["triceps"], type: "compound", equipment: "machine", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" }
  ],
  
  // SHOULDERS - Lateral Raises
  shoulders_lateral: [
    { name: "Dumbbell Lateral Raise", primary: "side_delts", secondary: [], type: "isolation", equipment: "dumbbell", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Cable Lateral Raise", primary: "side_delts", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [12, 25], progression: "linear" },
    { name: "Machine Lateral Raise", primary: "side_delts", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [12, 25], progression: "linear" },
    { name: "Leaning Cable Lateral Raise", primary: "side_delts", secondary: [], type: "isolation", equipment: "cable", skill: "medium", fatigue: "low", repRange: [10, 20], progression: "linear" }
  ],
  
  // SHOULDERS - Rear Delts
  shoulders_rear: [
    { name: "Face Pull", primary: "rear_delts", secondary: ["upper_back"], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" },
    { name: "Reverse Pec Deck", primary: "rear_delts", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" },
    { name: "Bent-Over Dumbbell Fly", primary: "rear_delts", secondary: [], type: "isolation", equipment: "dumbbell", skill: "medium", fatigue: "low", repRange: [12, 20], progression: "linear" },
    { name: "Cable Rear Delt Fly", primary: "rear_delts", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" }
  ],
  
  // LEGS - Squat Pattern
  legs_squat: [
    { name: "Back Squat", primary: "quads", secondary: ["glutes", "hamstrings"], type: "compound", equipment: "barbell", skill: "high", fatigue: "very_high", repRange: [3, 10], progression: "linear" },
    { name: "Front Squat", primary: "quads", secondary: ["glutes"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [5, 10], progression: "linear" },
    { name: "Bulgarian Split Squat", primary: "quads", secondary: ["glutes"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "high", repRange: [8, 15], progression: "linear" },
    { name: "Goblet Squat", primary: "quads", secondary: ["glutes"], type: "compound", equipment: "dumbbell", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Hack Squat Machine", primary: "quads", secondary: ["glutes"], type: "compound", equipment: "machine", skill: "low", fatigue: "high", repRange: [8, 15], progression: "linear" },
    { name: "Leg Press", primary: "quads", secondary: ["glutes", "hamstrings"], type: "compound", equipment: "machine", skill: "low", fatigue: "high", repRange: [8, 20], progression: "linear" },
    { name: "Smith Machine Squat", primary: "quads", secondary: ["glutes"], type: "compound", equipment: "machine", skill: "low", fatigue: "medium", repRange: [8, 15], progression: "linear" }
  ],
  
  // LEGS - Hip Hinge
  legs_hinge: [
    { name: "Conventional Deadlift", primary: "hamstrings", secondary: ["glutes", "back", "traps"], type: "compound", equipment: "barbell", skill: "high", fatigue: "very_high", repRange: [3, 8], progression: "linear" },
    { name: "Romanian Deadlift", primary: "hamstrings", secondary: ["glutes", "back"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [6, 12], progression: "linear" },
    { name: "Sumo Deadlift", primary: "hamstrings", secondary: ["glutes", "adductors"], type: "compound", equipment: "barbell", skill: "high", fatigue: "very_high", repRange: [3, 8], progression: "linear" },
    { name: "Trap Bar Deadlift", primary: "quads", secondary: ["hamstrings", "glutes"], type: "compound", equipment: "barbell", skill: "medium", fatigue: "very_high", repRange: [5, 10], progression: "linear" },
    { name: "Dumbbell Romanian Deadlift", primary: "hamstrings", secondary: ["glutes"], type: "compound", equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Single-Leg Romanian Deadlift", primary: "hamstrings", secondary: ["glutes"], type: "compound", equipment: "dumbbell", skill: "high", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Good Morning", primary: "hamstrings", secondary: ["glutes", "back"], type: "compound", equipment: "barbell", skill: "high", fatigue: "high", repRange: [6, 12], progression: "linear" }
  ],
  
  // LEGS - Quad Isolation
  legs_quad_isolation: [
    { name: "Leg Extension", primary: "quads", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Single-Leg Extension", primary: "quads", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" }
  ],
  
  // LEGS - Hamstring Isolation  
  legs_hamstring_isolation: [
    { name: "Leg Curl", primary: "hamstrings", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Seated Leg Curl", primary: "hamstrings", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Lying Leg Curl", primary: "hamstrings", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Nordic Curl", primary: "hamstrings", secondary: [], type: "isolation", equipment: "bodyweight", skill: "high", fatigue: "high", repRange: [3, 10], progression: "reps" }
  ],
  
  // LEGS - Glute Focus
  legs_glutes: [
    { name: "Hip Thrust", primary: "glutes", secondary: ["hamstrings"], type: "compound", equipment: "barbell", skill: "medium", fatigue: "medium", repRange: [8, 15], progression: "linear" },
    { name: "Barbell Glute Bridge", primary: "glutes", secondary: ["hamstrings"], type: "compound", equipment: "barbell", skill: "low", fatigue: "medium", repRange: [10, 20], progression: "linear" },
    { name: "Cable Pull-Through", primary: "glutes", secondary: ["hamstrings"], type: "compound", equipment: "cable", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" },
    { name: "Dumbbell Hip Thrust", primary: "glutes", secondary: ["hamstrings"], type: "compound", equipment: "dumbbell", skill: "low", fatigue: "medium", repRange: [10, 20], progression: "linear" }
  ],
  
  // LEGS - Calves
  legs_calves: [
    { name: "Standing Calf Raise", primary: "calves", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Seated Calf Raise", primary: "calves", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [12, 25], progression: "linear" },
    { name: "Leg Press Calf Raise", primary: "calves", secondary: [], type: "isolation", equipment: "machine", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" }
  ],
  
  // ARMS - Biceps
  arms_biceps: [
    { name: "Barbell Curl", primary: "biceps", secondary: [], type: "isolation", equipment: "barbell", skill: "low", fatigue: "low", repRange: [8, 15], progression: "linear" },
    { name: "EZ-Bar Curl", primary: "biceps", secondary: [], type: "isolation", equipment: "barbell", skill: "low", fatigue: "low", repRange: [8, 15], progression: "linear" },
    { name: "Dumbbell Curl", primary: "biceps", secondary: [], type: "isolation", equipment: "dumbbell", skill: "low", fatigue: "low", repRange: [8, 15], progression: "linear" },
    { name: "Hammer Curl", primary: "biceps", secondary: ["brachialis"], type: "isolation", equipment: "dumbbell", skill: "low", fatigue: "low", repRange: [10, 15], progression: "linear" },
    { name: "Incline Dumbbell Curl", primary: "biceps", secondary: [], type: "isolation", equipment: "dumbbell", skill: "low", fatigue: "low", repRange: [10, 15], progression: "linear" },
    { name: "Cable Curl", primary: "biceps", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Preacher Curl", primary: "biceps", secondary: [], type: "isolation", equipment: "barbell", skill: "low", fatigue: "low", repRange: [10, 15], progression: "linear" }
  ],
  
  // ARMS - Triceps
  arms_triceps: [
    { name: "Close-Grip Bench Press", primary: "triceps", secondary: ["chest"], type: "compound", equipment: "barbell", skill: "medium", fatigue: "medium", repRange: [6, 12], progression: "linear" },
    { name: "Dumbbell Overhead Extension", primary: "triceps", secondary: [], type: "isolation", equipment: "dumbbell", skill: "low", fatigue: "low", repRange: [10, 15], progression: "linear" },
    { name: "Cable Tricep Pushdown", primary: "triceps", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [10, 20], progression: "linear" },
    { name: "Rope Tricep Pushdown", primary: "triceps", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" },
    { name: "Overhead Cable Extension", primary: "triceps", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [10, 15], progression: "linear" },
    { name: "Skull Crusher", primary: "triceps", secondary: [], type: "isolation", equipment: "barbell", skill: "medium", fatigue: "medium", repRange: [8, 12], progression: "linear" },
    { name: "Dumbbell Kickback", primary: "triceps", secondary: [], type: "isolation", equipment: "dumbbell", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" }
  ],
  
  // CORE - Anti-Extension
  core_antiextension: [
    { name: "Plank", primary: "core", secondary: [], type: "isometric", equipment: "bodyweight", skill: "low", fatigue: "low", repRange: [30, 120], progression: "time" },
    { name: "Ab Wheel Rollout", primary: "core", secondary: [], type: "compound", equipment: "equipment", skill: "high", fatigue: "medium", repRange: [5, 15], progression: "reps" },
    { name: "Cable Crunch", primary: "core", secondary: [], type: "isolation", equipment: "cable", skill: "low", fatigue: "low", repRange: [12, 20], progression: "linear" }
  ],
  
  // CORE - Anti-Rotation
  core_antirotation: [
    { name: "Pallof Press", primary: "core", secondary: [], type: "isometric", equipment: "cable", skill: "low", fatigue: "low", repRange: [10, 15], progression: "linear" },
    { name: "Side Plank", primary: "core", secondary: ["obliques"], type: "isometric", equipment: "bodyweight", skill: "low", fatigue: "low", repRange: [30, 90], progression: "time" }
  ]
};

// Movement pattern categories for building balanced programs
const MOVEMENT_PATTERNS = {
  horizontal_push: ["chest_horizontal", "shoulders_press"],
  horizontal_pull: ["back_horizontal"],
  vertical_push: ["shoulders_press"],
  vertical_pull: ["back_vertical"],
  squat_pattern: ["legs_squat"],
  hinge_pattern: ["legs_hinge"],
  isolation: ["chest_isolation", "shoulders_lateral", "shoulders_rear", "legs_quad_isolation", "legs_hamstring_isolation", "arms_biceps", "arms_triceps"]
};
