# EVIDENCE-BASED PROGRAM GENERATION LOGIC

## COMPLETE IMPLEMENTATION PLAN

### 1. EXERCISE DATABASE STRUCTURE

Each exercise must have:
- **Primary Muscle**: chest, back, shoulders, quads, hamstrings, glutes, biceps, triceps, abs
- **Secondary Muscles**: array of muscles
- **Movement Pattern**: horizontal push, vertical push, horizontal pull, vertical pull, squat, hinge, lunge, isolation
- **Exercise Type**: compound, isolation
- **Equipment**: barbell, dumbbell, cable, machine, bodyweight
- **Skill Level**: low, medium, high
- **Fatigue Cost**: low (1-2), medium (3-4), high (5-6)
- **Rep Range Suitability**: strength (1-6), hypertrophy (6-15), endurance (15-30)
- **Joint Stress**: low, medium, high

### 2. VOLUME ALLOCATION BY EXPERIENCE

**Beginner** (0-1 years):
- Total weekly sets: 6-10 per muscle
- Compounds: 60-70% of volume
- Isolation: 30-40% of volume
- RIR: 2-4 (conservative)

**Intermediate** (1-3 years):
- Total weekly sets: 10-16 per muscle
- Compounds: 50-60% of volume
- Isolation: 40-50% of volume
- RIR: 1-3

**Advanced** (3+ years):
- Total weekly sets: 12-20+ per muscle
- Compounds: 40-50% of volume
- Isolation: 50-60% of volume
- RIR: 0-2

### 3. PROGRAM TYPE SPECIFICATIONS

**HYPERTROPHY:**
- Reps: 6-15 (main work), 10-20 (accessories)
- RIR: 1-3 compounds, 0-2 isolation
- Rest: 90-180s compounds, 60-90s isolation
- Volume: HIGH (upper end of experience range)
- Intensity: Moderate (%1RM: 65-85%)

**STRENGTH:**
- Reps: 1-6 (main), 6-10 (accessories)
- RIR: 1-2 compounds, 2-3 accessories
- Rest: 180-300s compounds, 120-180s accessories
- Volume: MODERATE
- Intensity: HIGH (%1RM: 80-95%+)

**POWERBUILDING:**
- Reps: 3-6 (main strength), 8-12 (hypertrophy), 10-15 (accessories)
- RIR: 1-2 strength work, 2-3 hypertrophy
- Rest: 180-240s strength, 90-150s hypertrophy
- Volume: MODERATE-HIGH
- Intensity: HIGH for mains, MODERATE for accessories

**MINIMALIST:**
- Reps: 6-12 (multi-joint focus)
- RIR: 2-3
- Rest: 120-180s
- Volume: LOWER end (time efficiency)
- Intensity: Moderate (%1RM: 70-80%)

### 4. SPLIT SELECTION LOGIC

**3 Days/Week → Full Body:**
- Each session hits all major muscle groups
- 2-3 exercises per muscle group per week
- Example: Squat, Bench, Row (Day 1), Deadlift, OHP, Pull-up (Day 2), Leg Press, Incline Press, Cable Row (Day 3)

**4 Days/Week → Upper/Lower:**
- Upper A: Horizontal push focus + vertical pull
- Lower A: Squat pattern + hip hinge
- Upper B: Vertical push focus + horizontal pull  
- Lower B: Squat variation + posterior chain

**5 Days/Week → Push/Pull/Legs + Upper/Lower:**
- Push: Chest, Shoulders, Triceps
- Pull: Back, Biceps
- Legs: Quads, Hamstrings, Glutes, Calves
- Upper: Combined push/pull
- Lower: Full leg day

**6 Days/Week → Push/Pull/Legs × 2:**
- Classic PPL repeated twice
- Higher frequency per muscle (2x/week)

### 5. EXERCISE SELECTION ALGORITHM

**Slot-Based Selection:**

Each session has slots:
1. **Primary Compound** (mandatory): Heavy, skill-intensive
   - Squat variants, Deadlift variants, Bench Press, OHP, Rows
2. **Secondary Compound** (mandatory): Moderate load
   - Leg Press, Incline Press, Pull-ups, RDLs
3. **Isolation A** (conditional): Target primary muscle
4. **Isolation B** (conditional): Target secondary muscle  
5. **Isolation C** (optional): Lagging muscle or time permitting

**Selection Rules:**
- No duplicate movement patterns in same session
- Manage cumulative fatigue (max fatigue score per session)
- Balance push/pull ratios
- Rotate exercises between weeks for variation

### 6. SET/REP ASSIGNMENT

Based on program type + experience + exercise type:

```
IF programType === "Hypertrophy":
  IF exerciseType === "compound":
    sets = 3-5
    reps = "6-10" or "8-12"
    rir = experience === "Beginner" ? "2-3" : "1-2"
  ELSE IF exerciseType === "isolation":
    sets = 2-4
    reps = "10-15" or "12-20"
    rir = "0-2"

IF programType === "Strength":
  IF exerciseType === "compound" AND isPrimary:
    sets = 4-6
    reps = "3-5" or "4-6"
    rir = "1-2"
  ELSE:
    sets = 3-4
    reps = "6-10"
    rir = "2-3"
```

### 7. PERIODIZATION (12-WEEK BLOCK)

**Phase 1: Base/Accumulation (Weeks 1-4)**
- Focus: Volume accumulation
- Volume: 100% of target
- Intensity: 70-80% 1RM
- Deload: Week 4

**Phase 2: Intensification (Weeks 5-8)**
- Focus: Increase intensity
- Volume: 90-95% of target  
- Intensity: 75-85% 1RM
- Deload: Week 8

**Phase 3: Peak/Realization (Weeks 9-12)**
- Focus: Peak performance
- Volume: 80-90% of target
- Intensity: 80-90% 1RM
- Deload: Week 12

**Deload Implementation:**
- Volume: 40-60% of normal
- Intensity: Maintain or slightly reduce
- Skip isolation exercises
- Reduce sets by 50%

### 8. PROGRESSION SCHEME

**Double Progression:**
```
Week 1: 3 × 8 @ RPE 7
Week 2: 3 × 9 @ RPE 7
Week 3: 3 × 10 @ RPE 7
Week 4: Deload
Week 5: 3 × 8 @ +5% weight, RPE 7
```

**Top Set + Back-offs:**
```
Set 1: 1 × 6 @ RPE 8 (top set)
Sets 2-4: 3 × 6 @ -10% (back-offs)
```

### 9. SUPERSET IMPLEMENTATION

**Rules:**
- Hypertrophy: Allow for isolations
- Strength: NO supersets for main lifts
- Minimalist: Encouraged for time efficiency

**Pairing Logic:**
```
IF supersetsEnabled AND programType !== "Strength":
  IF exercise1.muscleGroup !== exercise2.muscleGroup:
    IF exercise1.fatigueLevel + exercise2.fatigueLevel <= 6:
      pair as antagonist superset
```

### 10. 1RM-BASED WEIGHT CALCULATION

```javascript
function calculateWeight(oneRM, targetReps, rir) {
  // Epley formula adjusted for RIR
  const totalReps = targetReps + rir;
  const percentage = 1.0278 - (0.0278 * totalReps);
  return roundWeight(oneRM * percentage);
}
```

### 11. VOLUME TRACKING

Track sets per muscle per week:
```javascript
const volumeTracker = {
  chest: 0,
  back: 0,
  shoulders: 0,
  // ... etc
};

// For each exercise:
volumeTracker[primaryMuscle] += sets;
volumeTracker[secondaryMuscle] += sets * 0.5; // Half credit for secondary
```

Ensure weekly volume stays within evidence-based ranges.

---

## IMPLEMENTATION CHECKLIST

- [ ] Complete exercise database (50+ exercises)
- [ ] Movement pattern categorization
- [ ] Fatigue scoring system
- [ ] Volume allocation algorithm
- [ ] Progressive overload tracking
- [ ] Deload logic
- [ ] Exercise rotation system
- [ ] Superset pairing logic
- [ ] 1RM calculations
- [ ] Session duration estimation
- [ ] Weekly volume validation
