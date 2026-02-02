// COMPREHENSIVE EVIDENCE-BASED PROGRAM GENERATION LOGIC

// ============================================================
// EXERCISE DATABASE - Comprehensive with all metadata
// ============================================================

const EXERCISE_DATABASE = {
  // CHEST - Pressing movements
  chest_primary: [
    { name: "Barbell Bench Press", pattern: "horizontal_press", muscles: ["chest", "front_delts", "triceps"], 
      equipment: "barbell", skill: "high", fatigue: "high", repRange: [3, 12], compound: true, main: true },
    { name: "Incline Barbell Bench", pattern: "incline_press", muscles: ["upper_chest", "front_delts", "triceps"],
      equipment: "barbell", skill: "high", fatigue: "high", repRange: [4, 12], compound: true, main: true },
    { name: "Dumbbell Bench Press", pattern: "horizontal_press", muscles: ["chest", "front_delts", "triceps"],
      equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [6, 15], compound: true, main: false },
    { name: "Incline Dumbbell Press", pattern: "incline_press", muscles: ["upper_chest", "front_delts", "triceps"],
      equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [6, 15], compound: true, main: false },
    { name: "Dips (Chest Focused)", pattern: "dip", muscles: ["chest", "front_delts", "triceps"],
      equipment: "bodyweight", skill: "medium", fatigue: "medium", repRange: [6, 15], compound: true, main: false }
  ],
  chest_accessory: [
    { name: "Cable Flyes", pattern: "fly", muscles: ["chest"], equipment: "cable",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Pec Deck", pattern: "fly", muscles: ["chest"], equipment: "machine",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Push-ups", pattern: "horizontal_press", muscles: ["chest", "front_delts", "triceps"],
      equipment: "bodyweight", skill: "low", fatigue: "low", repRange: [10, 30], compound: true, main: false }
  ],
  
  // BACK - Pulling movements
  back_primary: [
    { name: "Barbell Row", pattern: "horizontal_pull", muscles: ["lats", "mid_back", "biceps"],
      equipment: "barbell", skill: "high", fatigue: "high", repRange: [5, 12], compound: true, main: true },
    { name: "Pull-ups", pattern: "vertical_pull", muscles: ["lats", "biceps"],
      equipment: "bodyweight", skill: "high", fatigue: "high", repRange: [5, 15], compound: true, main: true },
    { name: "Lat Pulldown", pattern: "vertical_pull", muscles: ["lats", "biceps"],
      equipment: "machine", skill: "low", fatigue: "medium", repRange: [6, 15], compound: true, main: false },
    { name: "Dumbbell Row", pattern: "horizontal_pull", muscles: ["lats", "mid_back", "biceps"],
      equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [6, 15], compound: true, main: false },
    { name: "Seated Cable Row", pattern: "horizontal_pull", muscles: ["mid_back", "lats", "biceps"],
      equipment: "cable", skill: "low", fatigue: "medium", repRange: [8, 15], compound: true, main: false }
  ],
  back_accessory: [
    { name: "Face Pulls", pattern: "pull", muscles: ["rear_delts", "mid_back"], equipment: "cable",
      skill: "low", fatigue: "low", repRange: [12, 20], compound: false, main: false },
    { name: "Straight Arm Pulldown", pattern: "pulldown", muscles: ["lats"], equipment: "cable",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false }
  ],
  
  // SHOULDERS
  shoulder_primary: [
    { name: "Overhead Press", pattern: "vertical_press", muscles: ["front_delts", "side_delts", "triceps"],
      equipment: "barbell", skill: "high", fatigue: "high", repRange: [4, 10], compound: true, main: true },
    { name: "Dumbbell Overhead Press", pattern: "vertical_press", muscles: ["front_delts", "side_delts", "triceps"],
      equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [6, 12], compound: true, main: false },
    { name: "Arnold Press", pattern: "vertical_press", muscles: ["front_delts", "side_delts", "triceps"],
      equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [8, 15], compound: true, main: false }
  ],
  shoulder_accessory: [
    { name: "Lateral Raise", pattern: "raise", muscles: ["side_delts"], equipment: "dumbbell",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Front Raise", pattern: "raise", muscles: ["front_delts"], equipment: "dumbbell",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Reverse Fly", pattern: "fly", muscles: ["rear_delts"], equipment: "dumbbell",
      skill: "low", fatigue: "low", repRange: [12, 20], compound: false, main: false }
  ],
  
  // LEGS - Quads dominant
  legs_quad: [
    { name: "Back Squat", pattern: "squat", muscles: ["quads", "glutes", "hamstrings"],
      equipment: "barbell", skill: "high", fatigue: "very_high", repRange: [3, 10], compound: true, main: true },
    { name: "Front Squat", pattern: "squat", muscles: ["quads", "core"],
      equipment: "barbell", skill: "high", fatigue: "high", repRange: [4, 10], compound: true, main: true },
    { name: "Leg Press", pattern: "press", muscles: ["quads", "glutes"],
      equipment: "machine", skill: "low", fatigue: "medium", repRange: [6, 20], compound: true, main: false },
    { name: "Bulgarian Split Squat", pattern: "lunge", muscles: ["quads", "glutes"],
      equipment: "dumbbell", skill: "medium", fatigue: "medium", repRange: [8, 15], compound: true, main: false }
  ],
  
  // LEGS - Hip/Hamstring dominant
  legs_posterior: [
    { name: "Deadlift", pattern: "hinge", muscles: ["hamstrings", "glutes", "back"],
      equipment: "barbell", skill: "very_high", fatigue: "very_high", repRange: [3, 8], compound: true, main: true },
    { name: "Romanian Deadlift", pattern: "hinge", muscles: ["hamstrings", "glutes"],
      equipment: "barbell", skill: "high", fatigue: "high", repRange: [6, 12], compound: true, main: true },
    { name: "Leg Curl", pattern: "curl", muscles: ["hamstrings"], equipment: "machine",
      skill: "low", fatigue: "low", repRange: [8, 20], compound: false, main: false },
    { name: "Hip Thrust", pattern: "bridge", muscles: ["glutes"], equipment: "barbell",
      skill: "medium", fatigue: "medium", repRange: [6, 15], compound: true, main: false }
  ],
  legs_accessory: [
    { name: "Leg Extension", pattern: "extension", muscles: ["quads"], equipment: "machine",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Calf Raise", pattern: "raise", muscles: ["calves"], equipment: "machine",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false }
  ],
  
  // ARMS
  biceps: [
    { name: "Barbell Curl", pattern: "curl", muscles: ["biceps"], equipment: "barbell",
      skill: "low", fatigue: "low", repRange: [8, 15], compound: false, main: false },
    { name: "Dumbbell Curl", pattern: "curl", muscles: ["biceps"], equipment: "dumbbell",
      skill: "low", fatigue: "low", repRange: [8, 15], compound: false, main: false },
    { name: "Hammer Curl", pattern: "curl", muscles: ["biceps", "brachialis"], equipment: "dumbbell",
      skill: "low", fatigue: "low", repRange: [8, 15], compound: false, main: false }
  ],
  triceps: [
    { name: "Tricep Pushdown", pattern: "extension", muscles: ["triceps"], equipment: "cable",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Overhead Extension", pattern: "extension", muscles: ["triceps"], equipment: "dumbbell",
      skill: "low", fatigue: "low", repRange: [10, 20], compound: false, main: false },
    { name: "Close-Grip Bench", pattern: "press", muscles: ["triceps", "chest"], equipment: "barbell",
      skill: "medium", fatigue: "medium", repRange: [6, 12], compound: true, main: false }
  ]
};

// ============================================================
// PROGRAMMING RULES - Evidence-based parameters
// ============================================================

const PROGRAM_RULES = {
  // Volume guidelines (sets per muscle per week)
  volume: {
    Beginner: { min: 6, max: 10, optimal: 8 },
    Intermediate: { min: 10, max: 16, optimal: 13 },
    Advanced: { min: 12, max: 20, optimal: 16 }
  },
  
  // Program-specific parameters
  programs: {
    Hypertrophy: {
      mainLiftReps: [6, 12],
      accessoryReps: [8, 20],
      compoundRIR: 2,
      isolationRIR: 1,
      compoundRest: "120-180s",
      isolationRest: "60-90s",
      deloadWeeks: [4, 8, 12],
      volumeProgression: "moderate", // 10-15% per block
      superset_allowed: "accessories_only"
    },
    Strength: {
      mainLiftReps: [3, 6],
      accessoryReps: [6, 12],
      compoundRIR: 1,
      isolationRIR: 2,
      compoundRest: "180-300s",
      isolationRest: "120-180s",
      deloadWeeks: [4, 8, 12],
      volumeProgression: "conservative", // 5-10% per block
      superset_allowed: "none_for_main"
    },
    Powerbuilding: {
      mainLiftReps: [4, 8],
      accessoryReps: [8, 15],
      compoundRIR: 1.5,
      isolationRIR: 1.5,
      compoundRest: "180-240s",
      isolationRest: "90-120s",
      deloadWeeks: [4, 8, 12],
      volumeProgression: "moderate",
      superset_allowed: "accessories_only"
    },
    Minimalist: {
      mainLiftReps: [5, 10],
      accessoryReps: [8, 15],
      compoundRIR: 2,
      isolationRIR: 1,
      compoundRest: "120-180s",
      isolationRest: "60-90s",
      deloadWeeks: [4, 8, 12],
      volumeProgression: "moderate",
      superset_allowed: "encouraged"
    }
  },
  
  // Split configurations
  splits: {
    3: { type: "Full Body", frequency: 3, sessions: ["Full", "Full", "Full"] },
    4: { type: "Upper/Lower", frequency: 2, sessions: ["Upper", "Lower", "Upper", "Lower"] },
    5: { type: "Push/Pull/Legs+", frequency: 1.67, sessions: ["Push", "Pull", "Legs", "Upper", "Lower"] },
    6: { type: "Push/Pull/Legs", frequency: 2, sessions: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"] }
  },
  
  // Periodization (Block model)
  blocks: {
    base: { weeks: [1, 2, 3, 4], intensity: "moderate", volume: "high" },
    intensification: { weeks: [5, 6, 7, 8], intensity: "high", volume: "moderate" },
    peak: { weeks: [9, 10, 11, 12], intensity: "very_high", volume: "moderate-low" }
  }
};

console.log("✅ Evidence-based programming logic created");
console.log("📊 Exercise database: Comprehensive with metadata");
console.log("📐 Volume ranges: Science-backed by experience level");
console.log("🎯 Program rules: Evidence-based parameters");

