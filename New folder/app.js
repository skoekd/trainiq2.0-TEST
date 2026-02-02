// @ts-nocheck
const { useState, useEffect } = React;
// ==================== EXERCISE DATABASE ====================
const EXERCISE_DB = {
    chest_press: [
        { name: "Barbell Bench Press", primary: "chest", type: "compound", skill: "high", fatigue: "high", repRange: [3, 12] },
        { name: "Incline Barbell Press", primary: "chest", type: "compound", skill: "high", fatigue: "high", repRange: [5, 12] },
        { name: "Dumbbell Bench Press", primary: "chest", type: "compound", skill: "medium", fatigue: "high", repRange: [6, 15] },
        { name: "Incline Dumbbell Press", primary: "chest", type: "compound", skill: "medium", fatigue: "high", repRange: [6, 15] },
        { name: "Weighted Dips", primary: "chest", type: "compound", skill: "high", fatigue: "high", repRange: [5, 12] },
        { name: "Machine Chest Press", primary: "chest", type: "compound", skill: "low", fatigue: "medium", repRange: [8, 20] }
    ],
    chest_fly: [
        { name: "Cable Flyes", primary: "chest", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Dumbbell Flyes", primary: "chest", type: "isolation", skill: "medium", fatigue: "medium", repRange: [10, 20] },
        { name: "Pec Deck", primary: "chest", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 25] }
    ],
    back_vertical: [
        { name: "Pull-ups", primary: "lats", type: "compound", skill: "high", fatigue: "high", repRange: [5, 15] },
        { name: "Weighted Pull-ups", primary: "lats", type: "compound", skill: "high", fatigue: "high", repRange: [3, 10] },
        { name: "Lat Pulldown", primary: "lats", type: "compound", skill: "low", fatigue: "medium", repRange: [8, 15] },
        { name: "Wide-Grip Pulldown", primary: "lats", type: "compound", skill: "low", fatigue: "medium", repRange: [8, 15] }
    ],
    back_horizontal: [
        { name: "Barbell Row", primary: "back", type: "compound", skill: "high", fatigue: "high", repRange: [5, 12] },
        { name: "Pendlay Row", primary: "back", type: "compound", skill: "high", fatigue: "high", repRange: [5, 10] },
        { name: "T-Bar Row", primary: "back", type: "compound", skill: "medium", fatigue: "high", repRange: [6, 12] },
        { name: "Dumbbell Row", primary: "back", type: "compound", skill: "medium", fatigue: "medium", repRange: [8, 15] },
        { name: "Seated Cable Row", primary: "back", type: "compound", skill: "low", fatigue: "medium", repRange: [10, 20] },
        { name: "Chest-Supported Row", primary: "back", type: "compound", skill: "low", fatigue: "medium", repRange: [8, 15] }
    ],
    shoulders_press: [
        { name: "Overhead Press", primary: "shoulders", type: "compound", skill: "high", fatigue: "high", repRange: [4, 10] },
        { name: "Seated Dumbbell Press", primary: "shoulders", type: "compound", skill: "medium", fatigue: "high", repRange: [6, 12] },
        { name: "Arnold Press", primary: "shoulders", type: "compound", skill: "medium", fatigue: "medium", repRange: [8, 15] },
        { name: "Machine Shoulder Press", primary: "shoulders", type: "compound", skill: "low", fatigue: "medium", repRange: [8, 15] }
    ],
    shoulders_lateral: [
        { name: "Lateral Raise", primary: "shoulders", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Cable Lateral Raise", primary: "shoulders", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 25] },
        { name: "Machine Lateral Raise", primary: "shoulders", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 25] }
    ],
    shoulders_rear: [
        { name: "Face Pull", primary: "rear_delts", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 20] },
        { name: "Reverse Pec Deck", primary: "rear_delts", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 20] },
        { name: "Bent-Over Fly", primary: "rear_delts", type: "isolation", skill: "medium", fatigue: "low", repRange: [12, 20] }
    ],
    legs_squat: [
        { name: "Back Squat", primary: "quads", type: "compound", skill: "high", fatigue: "very_high", repRange: [3, 10] },
        { name: "Front Squat", primary: "quads", type: "compound", skill: "high", fatigue: "high", repRange: [5, 10] },
        { name: "Bulgarian Split Squat", primary: "quads", type: "compound", skill: "medium", fatigue: "high", repRange: [8, 15] },
        { name: "Leg Press", primary: "quads", type: "compound", skill: "low", fatigue: "high", repRange: [8, 20] },
        { name: "Hack Squat", primary: "quads", type: "compound", skill: "low", fatigue: "high", repRange: [8, 15] }
    ],
    legs_hinge: [
        { name: "Conventional Deadlift", primary: "hamstrings", type: "compound", skill: "high", fatigue: "very_high", repRange: [3, 8] },
        { name: "Romanian Deadlift", primary: "hamstrings", type: "compound", skill: "high", fatigue: "high", repRange: [6, 12] },
        { name: "Sumo Deadlift", primary: "hamstrings", type: "compound", skill: "high", fatigue: "very_high", repRange: [3, 8] },
        { name: "Trap Bar Deadlift", primary: "hamstrings", type: "compound", skill: "medium", fatigue: "very_high", repRange: [5, 10] },
        { name: "Dumbbell RDL", primary: "hamstrings", type: "compound", skill: "medium", fatigue: "medium", repRange: [8, 15] }
    ],
    legs_isolation: [
        { name: "Leg Extension", primary: "quads", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Leg Curl", primary: "hamstrings", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Seated Leg Curl", primary: "hamstrings", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] }
    ],
    legs_glutes: [
        { name: "Hip Thrust", primary: "glutes", type: "compound", skill: "medium", fatigue: "medium", repRange: [8, 15] },
        { name: "Glute Bridge", primary: "glutes", type: "compound", skill: "low", fatigue: "medium", repRange: [10, 20] }
    ],
    legs_calves: [
        { name: "Standing Calf Raise", primary: "calves", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Seated Calf Raise", primary: "calves", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 25] }
    ],
    arms_biceps: [
        { name: "Barbell Curl", primary: "biceps", type: "isolation", skill: "low", fatigue: "low", repRange: [8, 15] },
        { name: "Dumbbell Curl", primary: "biceps", type: "isolation", skill: "low", fatigue: "low", repRange: [8, 15] },
        { name: "Hammer Curl", primary: "biceps", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 15] },
        { name: "Cable Curl", primary: "biceps", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Preacher Curl", primary: "biceps", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 15] }
    ],
    arms_triceps: [
        { name: "Close-Grip Bench", primary: "triceps", type: "compound", skill: "medium", fatigue: "medium", repRange: [6, 12] },
        { name: "Overhead Extension", primary: "triceps", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 15] },
        { name: "Tricep Pushdown", primary: "triceps", type: "isolation", skill: "low", fatigue: "low", repRange: [10, 20] },
        { name: "Rope Pushdown", primary: "triceps", type: "isolation", skill: "low", fatigue: "low", repRange: [12, 20] },
        { name: "Skull Crusher", primary: "triceps", type: "isolation", skill: "medium", fatigue: "medium", repRange: [8, 12] }
    ]
};
// ==================== EXERCISE TAG SCHEMA (for substitutions) ====================
// We keep the generator database (EXERCISE_DB) lightweight, but use the more
// comprehensive EXERCISE_DATABASE (loaded from exercise-database.js) for swaps.
//
// Canonical tag schema for matching "similar stimulus" alternatives:
// {
//   id: string,
//   name: string,
//   pattern: 'horizontal_push'|'vertical_push'|'horizontal_pull'|'vertical_pull'|'squat'|'hinge'|
//            'knee_extension'|'knee_flexion'|'hip_extension'|'hip_abduction'|
//            'elbow_flexion'|'elbow_extension'|'shoulder_abduction'|'shoulder_external_rotation'|
//            'calf_raise'|'core',
//   primeMover: string,                 // e.g., 'chest', 'quads'
//   secondary: string[],                 // e.g., ['triceps','front_delts']
//   type: 'compound'|'isolation',
//   equipment: 'barbell'|'dumbbell'|'machine'|'cable'|'bodyweight'|'smith'|'bands'|'other',
//   stabilityDemand: 'low'|'medium'|'high',   // how much stabilization the lifter must provide
//   skill: 'low'|'medium'|'high',
//   fatigue: 'low'|'medium'|'high'|'very_high',
//   repRange: [number, number],
//   progression: 'linear'|'weighted'|'reps'|'double_progression'|'other'
// }
const PATTERN_FROM_CATEGORY = (cat) => {
    if (!cat)
        return 'other';
    if (cat.startsWith('chest_'))
        return 'horizontal_push';
    if (cat.startsWith('back_vertical'))
        return 'vertical_pull';
    if (cat.startsWith('back_horizontal'))
        return 'horizontal_pull';
    if (cat.startsWith('shoulders_press'))
        return 'vertical_push';
    if (cat.startsWith('shoulders_lateral'))
        return 'shoulder_abduction';
    if (cat.startsWith('shoulders_rear'))
        return 'shoulder_external_rotation';
    if (cat.startsWith('legs_squat'))
        return 'squat';
    if (cat.startsWith('legs_hinge'))
        return 'hinge';
    if (cat.startsWith('legs_isolation'))
        return 'knee_extension';
    if (cat.startsWith('legs_glutes'))
        return 'hip_extension';
    if (cat.startsWith('legs_calves'))
        return 'calf_raise';
    if (cat.startsWith('arms_biceps'))
        return 'elbow_flexion';
    if (cat.startsWith('arms_triceps'))
        return 'elbow_extension';
    return 'other';
};
const stabilityDemandFromEquipment = (eq) => {
    // "stabilityDemand" reflects how much stabilization the lifter must provide.
    if (eq === 'machine')
        return 'low';
    if (eq === 'cable')
        return 'medium';
    if (eq === 'smith')
        return 'low';
    if (eq === 'dumbbell')
        return 'high';
    if (eq === 'barbell')
        return 'high';
    if (eq === 'bodyweight')
        return 'high';
    return 'medium';
};
const normalize = (s) => String(s || '').trim().toLowerCase();
const buildExerciseIndex = () => {
    const idx = new Map();
    try {
        if (typeof EXERCISE_DATABASE !== 'object')
            return idx;
        Object.entries(EXERCISE_DATABASE).forEach(([category, arr]) => {
            (arr || []).forEach((ex, i) => {
                const name = ex === null || ex === void 0 ? void 0 : ex.name;
                if (!name)
                    return;
                idx.set(normalize(name), {
                    id: `${category}:${i}`,
                    name,
                    category,
                    pattern: PATTERN_FROM_CATEGORY(category),
                    primeMover: ex.primary,
                    secondary: ex.secondary || [],
                    type: ex.type,
                    equipment: ex.equipment || 'other',
                    stabilityDemand: stabilityDemandFromEquipment(ex.equipment),
                    skill: ex.skill || 'medium',
                    fatigue: ex.fatigue || 'medium',
                    repRange: ex.repRange || [8, 12],
                    progression: ex.progression || 'other'
                });
            });
        });
    }
    catch (e) {
        // fail silently; substitutions just won't show.
    }
    return idx;
};
const EXERCISE_INDEX = buildExerciseIndex();
const getExerciseTags = (name) => EXERCISE_INDEX.get(normalize(name)) || null;
const overlapScore = (a, b) => {
    // Measures rep-range overlap (0..1)
    if (!a || !b)
        return 0;
    const [a1, a2] = a;
    const [b1, b2] = b;
    const lo = Math.max(a1, b1);
    const hi = Math.min(a2, b2);
    if (hi < lo)
        return 0;
    const inter = hi - lo;
    const span = Math.max(a2 - a1, b2 - b1, 1);
    return Math.min(1, inter / span);
};
const rankAlternatives = (origTags, candidates) => {
    const fatigueRank = { low: 0, medium: 1, high: 2, very_high: 3 };
    const skillRank = { low: 0, medium: 1, high: 2 };
    const stabRank = { low: 0, medium: 1, high: 2 };
    const score = (c) => {
        var _a, _b, _c, _d, _e, _f;
        let s = 0;
        // Hard matches are filtered already; scoring is for ordering.
        if (c.equipment === origTags.equipment)
            s += 2;
        s += Math.max(0, 1 - Math.abs(((_a = stabRank[c.stabilityDemand]) !== null && _a !== void 0 ? _a : 1) - ((_b = stabRank[origTags.stabilityDemand]) !== null && _b !== void 0 ? _b : 1)) * 0.5);
        s += Math.max(0, 1 - Math.abs(((_c = skillRank[c.skill]) !== null && _c !== void 0 ? _c : 1) - ((_d = skillRank[origTags.skill]) !== null && _d !== void 0 ? _d : 1)) * 0.5);
        s += Math.max(0, 1 - Math.abs(((_e = fatigueRank[c.fatigue]) !== null && _e !== void 0 ? _e : 1) - ((_f = fatigueRank[origTags.fatigue]) !== null && _f !== void 0 ? _f : 1)) * 0.35);
        s += overlapScore(c.repRange, origTags.repRange);
        return s;
    };
    return candidates
        .map(c => ({ ...c, _score: score(c) }))
        .sort((a, b) => b._score - a._score)
        .slice(0, 6);
};
const getAlternativesForExercise = (exerciseName, { role = 'accessory' } = {}) => {
    const orig = getExerciseTags(exerciseName);
    if (!orig)
        return [];
    // Evidence-based constraints: preserve stimulus
    // - same movement pattern
    // - same prime mover
    // - same type (compound vs isolation)
    // - (optional) keep equipment close via ranking
    const pool = Array.from(EXERCISE_INDEX.values());
    const strict = pool.filter(c => c.name !== orig.name &&
        c.pattern === orig.pattern &&
        c.primeMover === orig.primeMover &&
        c.type === orig.type);
    // Main lift substitutions should be conservative; require same equipment if possible.
    const conservative = (role === 'main' || role === 'secondary');
    const preferred = conservative
        ? strict.filter(c => c.equipment === orig.equipment)
        : strict;
    const candidates = preferred.length >= 3 ? preferred : strict;
    return rankAlternatives(orig, candidates);
};
// ==================== EVIDENCE-BASED CALCULATIONS ====================
// ==================== SUPERSET LOGIC ====================
// Supersets are intended ONLY for non-main lifts (accessories).
// This function tags exercises with superset metadata; if the UI
// ignores it, nothing breaks.
function applySupersets(exercises, programType) {
    if (!Array.isArray(exercises) || exercises.length < 3)
        return exercises;
    // Determine how many "main" movements to protect from supersets.
    const mainLiftCount = programType === 'Strength' ? 2 : 1;
    // Eligible = non-main exercises. For Strength, only isolation work.
    const eligibleIdx = [];
    for (let i = mainLiftCount; i < exercises.length; i++) {
        const ex = exercises[i];
        if (!ex)
            continue;
        if (programType === 'Strength') {
            if (ex.type === 'isolation')
                eligibleIdx.push(i);
            continue;
        }
        // For non-strength: prefer higher-rep / lower-skill accessories
        // (keeps heavy compounds from being paired).
        const minRep = Array.isArray(ex.reps) ? ex.reps[0] : 0;
        if (ex.type === 'isolation' || minRep >= 8)
            eligibleIdx.push(i);
    }
    // Pair eligible exercises into A1/A2, B1/B2, etc. — with gym-realistic constraints.
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let group = 0;
    // Logistics rules (commercial gym):
    // - If a barbell lift is involved, the partner MUST be portable (bodyweight/DB/band/kettlebell).
    // - No-rest (0–30s) supersets should avoid “walk-away” machine swaps.
    const PORTABLE_EQUIPMENT = new Set(['bodyweight', 'dumbbell', 'kettlebell', 'band', 'resistance band']);
    const eq = (ex) => ((ex === null || ex === void 0 ? void 0 : ex.equipment) || '').toString().toLowerCase();
    const isPortable = (ex) => PORTABLE_EQUIPMENT.has(eq(ex));
    const isBarbell = (ex) => eq(ex) === 'barbell';
    function canSuperset(a, b) {
        if (!a || !b)
            return false;
        const ea = eq(a);
        const eb = eq(b);
        // Barbell rule: barbell + portable only (prevents Pendlay Row → Reverse Pec Deck).
        if (ea === 'barbell' || eb === 'barbell') {
            if (ea === 'barbell' && eb === 'barbell')
                return false;
            const partner = ea === 'barbell' ? b : a;
            return isPortable(partner);
        }
        // Otherwise allow; these are already filtered to accessories/isolation or higher-rep work.
        return true;
    }
    const used = new Set();
    for (let j = 0; j < eligibleIdx.length; j++) {
        const i1 = eligibleIdx[j];
        if (used.has(i1))
            continue;
        // Find the next compatible partner for i1.
        let i2 = null;
        for (let k = j + 1; k < eligibleIdx.length; k++) {
            const cand = eligibleIdx[k];
            if (used.has(cand))
                continue;
            if (canSuperset(exercises[i1], exercises[cand])) {
                i2 = cand;
                break;
            }
        }
        if (i2 == null)
            continue;
        const g = letters[group] || `G${group + 1}`;
        // Clear, user-facing superset instructions + metadata for the UI.
        const postRest = exercises[i1].rest || '60-120s';
        const betweenRest = '0-30s';
        exercises[i1].superset = { group: g, position: 1, partner: exercises[i2].name, betweenRest, postRest };
        exercises[i2].superset = { group: g, position: 2, partner: exercises[i1].name, betweenRest, postRest };
        // Keep the inline rest label short and readable.
        const restLabel = `Superset: ${betweenRest} between • ${postRest} after pair`;
        exercises[i1].rest = restLabel;
        exercises[i2].rest = restLabel;
        used.add(i1);
        used.add(i2);
        group += 1;
    }
    return exercises;
}
function roundWeight(w) {
    const n = parseFloat(w);
    if (!n)
        return 0;
    if (n < 100) {
        const m = n % 2.5;
        return m < 1.25 ? Math.floor(n / 2.5) * 2.5 : Math.ceil(n / 2.5) * 2.5;
    }
    const m = n % 5;
    return m < 2.5 ? Math.floor(n / 5) * 5 : Math.ceil(n / 5) * 5;
}
function calc1RMWeight(oneRM, minRep, maxRep, rir) {
    // Legacy: reverse-Epley estimate based on reps + RIR (works fine for accessories/isolation).
    if (!oneRM)
        return null;
    const avgRep = (minRep + maxRep) / 2;
    const targetRepsToFailure = avgRep + rir;
    const percentage = 1.0278 - (0.0278 * targetRepsToFailure);
    return roundWeight(oneRM * percentage);
}
// NSCA Training Load Chart (Landers, adapted by NSCA): %1RM by reps-to-failure.
// Source: NSCA Training Load Chart PDF.
const NSCA_REP_PCT = [
    { reps: 1, pct: 1.00 },
    { reps: 2, pct: 0.95 },
    { reps: 3, pct: 0.93 },
    { reps: 4, pct: 0.90 },
    { reps: 5, pct: 0.87 },
    { reps: 6, pct: 0.85 },
    { reps: 7, pct: 0.83 },
    { reps: 8, pct: 0.80 },
    { reps: 9, pct: 0.77 },
    { reps: 10, pct: 0.75 },
    { reps: 12, pct: 0.70 }
];
function percentFromRepsToFailure(repsToFailure) {
    const r = Math.max(1, Math.round(repsToFailure));
    // Use NSCA chart for 1–12 (linear interpolation for 11).
    if (r <= 12) {
        for (let i = 0; i < NSCA_REP_PCT.length; i++) {
            if (NSCA_REP_PCT[i].reps === r)
                return NSCA_REP_PCT[i].pct;
            if (NSCA_REP_PCT[i].reps > r) {
                const hi = NSCA_REP_PCT[i];
                const lo = NSCA_REP_PCT[i - 1];
                const t = (r - lo.reps) / (hi.reps - lo.reps);
                return lo.pct + t * (hi.pct - lo.pct);
            }
        }
        return 0.70;
    }
    // For higher rep ranges, fall back to a smooth curve (Epley-style).
    // This is conservative and avoids extreme low-load prescriptions.
    return Math.max(0.30, 1 / (1 + (r / 30)));
}
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function oneRMKeyForExercise(ex) {
    // Prefer explicit key if present
    if (ex === null || ex === void 0 ? void 0 : ex.oneRMKey)
        return ex.oneRMKey;
    // If primary matches a 1RM key, use it.
    const p = ex === null || ex === void 0 ? void 0 : ex.primary;
    if (p && (p === 'chest' || p === 'shoulders' || p === 'lats' || p === 'quads' || p === 'hamstrings'))
        return p;
    const n = ((ex === null || ex === void 0 ? void 0 : ex.name) || '').toLowerCase();
    // Chest: bench variations
    if (n.includes('bench') && n.includes('press'))
        return 'chest';
    if (n.includes('chest press'))
        return 'chest';
    // Shoulders: overhead/shoulder press
    if (n.includes('overhead') && n.includes('press'))
        return 'shoulders';
    if (n.includes('shoulder') && n.includes('press'))
        return 'shoulders';
    // Common shorthand
    if (n === 'ohp' || n.includes('military press'))
        return 'shoulders';
    // Lats/upper back: pull-ups/chins/rows/pulldowns (for 1RM we treat as "lats" key)
    if (n.includes('pull-up') || n.includes('pull up') || n.includes('chin-up') || n.includes('chin up'))
        return 'lats';
    if (n.includes('lat pulldown') || n.includes('pull-down') || n.includes('pulldown'))
        return 'lats';
    if (n.includes('row'))
        return 'lats';
    // Quads: squat patterns
    if (n.includes('squat'))
        return 'quads';
    if (n.includes('leg press'))
        return 'quads';
    // Hamstrings/posterior: deadlift patterns
    if (n.includes('deadlift') || n.includes('rdl') || n.includes('romanian'))
        return 'hamstrings';
    if (n.includes('hip thrust'))
        return 'hamstrings';
    return null;
}
function getOneRMForExercise(ex, oneRMs) {
    const key = oneRMKeyForExercise(ex);
    return key ? oneRMs === null || oneRMs === void 0 ? void 0 : oneRMs[key] : null;
}
function calcMainLiftWeight(oneRM, repsRange, rir, experience, programType, role, phase) {
    var _a, _b, _c, _d;
    if (!oneRM)
        return null;
    const minRep = (_a = repsRange === null || repsRange === void 0 ? void 0 : repsRange[0]) !== null && _a !== void 0 ? _a : 5;
    const maxRep = (_b = repsRange === null || repsRange === void 0 ? void 0 : repsRange[1]) !== null && _b !== void 0 ? _b : minRep;
    // Main lifts bias to the lower end of the rep range in strength/powerbuilding.
    const baseReps = (role === 'main' && (programType === 'Strength' || programType === 'Powerbuilding'))
        ? minRep
        : Math.round((minRep + maxRep) / 2);
    // Convert prescription (reps + RIR) into reps-to-failure, then %1RM.
    const repsToFailure = baseReps + (rir !== null && rir !== void 0 ? rir : 0);
    let pct = percentFromRepsToFailure(repsToFailure);
    // Program-specific intent (small nudges; the reps+RIR already does most of the work).
    const programAdj = {
        Hypertrophy: -0.01,
        Strength: 0.02,
        Powerbuilding: 0.01,
        Minimalist: 0.00
    };
    pct += ((_c = programAdj[programType]) !== null && _c !== void 0 ? _c : 0);
    // Experience: be slightly more conservative for beginners.
    const expAdj = {
        Beginner: -0.03,
        Intermediate: 0.00,
        Advanced: 0.01
    };
    pct += ((_d = expAdj[experience]) !== null && _d !== void 0 ? _d : 0);
    // Phase intensity adjustment is stored as "percentage points" (e.g., +10 => +0.10).
    // Deloads reduce intensity further.
    if ((phase === null || phase === void 0 ? void 0 : phase.intensityAdj) != null)
        pct += (phase.intensityAdj / 100);
    if (phase === null || phase === void 0 ? void 0 : phase.isDeload)
        pct -= 0.08;
    // Role adjustment
    if (role === 'secondary')
        pct -= 0.03;
    pct = clamp(pct, 0.30, 0.95);
    return roundWeight(oneRM * pct);
}
function getPhaseParams(week) {
    if (week <= 4) {
        return {
            phase: 'Base',
            volumeMult: week === 4 ? 0.5 : 1.0,
            intensityAdj: 0,
            isDeload: week === 4
        };
    }
    else if (week <= 8) {
        return {
            phase: 'Intensification',
            volumeMult: week === 8 ? 0.5 : 0.85,
            intensityAdj: week === 8 ? -10 : 5,
            isDeload: week === 8
        };
    }
    else {
        return {
            phase: 'Peak',
            volumeMult: week === 12 ? 0.5 : 0.7,
            intensityAdj: week === 12 ? -15 : 10,
            isDeload: week === 12
        };
    }
}
// Rep ranges are phase- and role-aware for Powerbuilding.
// This is critical to make the 12-week block behave like real powerbuilding:
//   Base: higher reps (volume + skill)
//   Intensification: moderate reps (strength)
//   Peak: low reps (strength expression), while accessories remain hypertrophy-focused.
// Rep ranges are phase- and role-aware.
// Philosophy:
// - Hypertrophy: moderate reps, close-ish effort
// - Strength: phase-driven (base→intensification→peak), main lifts become more specific + lower rep
// - Powerbuilding: day intent separates strength vs hypertrophy days; phases still matter
// - Minimalist: moderate reps, conservative fatigue
function getRepRange(programType, exType, position, role = 'accessory', phaseName = 'Base', dayIntent = null) {
    const bump = (r) => (position === 0 ? r : [r[0] + 2, r[1] + 3]);
    // ---------------- Strength ----------------
    if (programType === 'Strength') {
        const isMainish = (role === 'main' || role === 'secondary');
        if (exType === 'compound' && isMainish) {
            // Classic block periodization
            if (phaseName === 'Peak')
                return bump(role === 'main' ? [1, 3] : [2, 4]);
            if (phaseName === 'Intensification')
                return bump([3, 5]);
            return bump([4, 6]); // Base
        }
        // Accessories: hypertrophy-supportive, not excessive
        const acc = (exType === 'compound') ? [5, 8] : [8, 15];
        return bump(acc);
    }
    // ---------------- Powerbuilding ----------------
    if (programType === 'Powerbuilding') {
        const isMainish = (role === 'main' || role === 'secondary');
        const intent = dayIntent || 'mixed';
        if (exType === 'compound' && isMainish) {
            if (phaseName === 'Peak') {
                if (intent === 'hypertrophy')
                    return bump(role === 'main' ? [3, 5] : [4, 6]);
                return bump(role === 'main' ? [1, 4] : [2, 5]);
            }
            if (phaseName === 'Intensification') {
                if (intent === 'hypertrophy')
                    return bump([4, 7]);
                return bump([3, 6]);
            }
            // Base
            if (intent === 'hypertrophy')
                return bump([5, 8]);
            return bump([4, 8]);
        }
        const acc = (exType === 'compound') ? [6, 12] : [10, 20];
        return bump(acc);
    }
    // ---------------- Hypertrophy / Minimalist defaults ----------------
    const ranges = {
        Hypertrophy: { compound: [6, 10], isolation: [10, 20] },
        Minimalist: { compound: [6, 10], isolation: [12, 20] }
    };
    const r = (ranges[programType] || ranges.Hypertrophy)[exType];
    return bump(r);
}
function getRIR(experience, exType, setNum, totalSets, programType = 'Hypertrophy', role = 'accessory', phaseName = 'Base', dayIntent = null) {
    // Base effort by training age
    const base = {
        Beginner: { compound: 3, isolation: 2 },
        Intermediate: { compound: 2, isolation: 1 },
        Advanced: { compound: 1, isolation: 0 }
    };
    let rir = (base[experience] && base[experience][exType] != null) ? base[experience][exType] : 2;
    // Set-to-set shaping: first set slightly easier, last set slightly harder
    if (setNum === 1)
        rir += 1;
    else if (setNum === totalSets)
        rir = Math.max(0, rir - 1);
    // Program intent modifiers
    const isMainish = (role === 'main' || role === 'secondary');
    const intent = dayIntent || 'mixed';
    if (programType === 'Strength' && exType === 'compound' && isMainish) {
        // Strength should express intensity in peak (without forced grinders for most users)
        if (phaseName === 'Peak')
            rir = Math.max(0, rir - 1);
        if (phaseName === 'Intensification')
            rir = Math.max(0, rir - 0.5);
    }
    if (programType === 'Powerbuilding' && exType === 'compound' && isMainish) {
        if (phaseName === 'Peak' && intent !== 'hypertrophy')
            rir = Math.max(0, rir - 1);
        if (intent === 'hypertrophy')
            rir = Math.min(3, rir + 0.5); // keep technique clean on volume days
    }
    // Never allow negative RIR
    return Math.max(0, Math.round(rir * 2) / 2); // half-step precision
}
// ==================== ADVANCED TECHNIQUE LOGIC ====================
// Applied only when enabled, and only to "safe" accessory work (mostly isolations).
// These are optional training methods to add variety/density without compromising main lift quality.
const ADV_TECHNIQUES = [
    {
        id: 'drop_set',
        name: 'Drop Set',
        level: 'Advanced',
        description: 'After your final working set, immediately reduce the load (typically 20–30%) and continue for additional controlled reps. This increases metabolic stress and extends the set past initial fatigue.',
        howToApply: 'After last set, drop ~20–30% and do 8–12 controlled reps.'
    },
    {
        id: 'rest_pause',
        name: 'Rest-Pause',
        level: 'Advanced',
        description: 'Perform a near-failure set, rest briefly (10–20s), then do mini-sets with the same load until the rep quality drops. Great for time-efficient hypertrophy.',
        howToApply: 'Do 1 set near failure, rest 10–20s, then 2–4 mini-sets of 3–5 reps.'
    },
    {
        id: 'myo_reps',
        name: 'Myo-Reps',
        level: 'Advanced',
        description: 'Do an activation set close to failure, then short-rest mini-sets. Similar to rest-pause but typically used with higher reps and isolation work.',
        howToApply: 'Activation set 12–20 reps (0–2 RIR), rest 10–15s, then 3–5 mini-sets of 3–5 reps.'
    },
    {
        id: 'tempo',
        name: 'Tempo',
        level: 'Intermediate',
        description: 'Control the eccentric (lowering) phase to increase time under tension and improve technique.',
        howToApply: 'Use a 3-second controlled lowering on all reps.'
    }
];
function pickTechniqueForExercise(ex, programType, dayIntent) {
    // Prefer drop set / myo-reps for higher reps; tempo for moderate reps; rest-pause for density.
    const minRep = Array.isArray(ex.reps) ? ex.reps[0] : 8;
    if (programType === 'Density (EDT-style)' || dayIntent === 'mixed')
        return ADV_TECHNIQUES.find(t => t.id === 'rest_pause') || ADV_TECHNIQUES[0];
    if (minRep >= 12)
        return ADV_TECHNIQUES.find(t => t.id === 'drop_set') || ADV_TECHNIQUES[0];
    if (minRep >= 10)
        return ADV_TECHNIQUES.find(t => t.id === 'myo_reps') || ADV_TECHNIQUES[0];
    return ADV_TECHNIQUES.find(t => t.id === 'tempo') || ADV_TECHNIQUES[0];
}
function applyAdvancedTechniques(exercises, cfg, phaseName, dayIntent) {
    if (!cfg || !cfg.advancedTechniques)
        return exercises;
    const programType = cfg.programType || '';
    const experience = cfg.experience || '';
    // Guardrails: avoid adding techniques during peak strength, and avoid for strict Strength / Power blocks.
    if (programType === 'Strength' || programType === 'Power / Speed-Strength')
        return exercises;
    if (phaseName === 'Peak' && (programType === 'Powerbuilding' || programType === 'Strength'))
        return exercises;
    // Eligibility: mostly accessories/isolations, and only some of them.
    const isAllowed = (ex) => {
        if (!ex || ex.role === 'main' || ex.role === 'secondary')
            return false;
        if (ex.type !== 'isolation')
            return false; // keep conservative
        // If experience isn't advanced, keep frequency lower.
        return true;
    };
    // Determine frequency. Advanced lifters can handle more.
    const baseP = (experience === 'advanced') ? 0.35 : (experience === 'intermediate' ? 0.22 : 0.12);
    return exercises.map((ex, idx) => {
        if (!isAllowed(ex))
            return ex;
        // Avoid techniques on the first accessory if it is low-rep or fatigue heavy.
        const p = baseP * (idx <= 1 ? 0.7 : 1.0);
        if (Math.random() > p)
            return ex;
        const tech = pickTechniqueForExercise(ex, programType, dayIntent);
        return { ...ex, technique: tech };
    });
}
function getRest(minRep, exType, programType) {
    if (minRep <= 6 && exType === 'compound') {
        return programType === 'Strength' ? '3-5min' : '2-4min';
    }
    if (exType === 'compound')
        return '90-180s';
    return '60-120s';
}
function buildWarmupSets(ex, programType, phaseName, dayIntent, experience, warmupPrefs) {
    var _a;
    // Returns an array of warm-up sets with % of working weight when possible.
    // Philosophy:
    // - Main/secondary compounds: 2–4 ramping sets (more when reps are low / peak).
    // - Accessory compounds: 1–3 warm-up sets depending on load/complexity.
    // - Isolations: usually 0–1 warm-up set (optional) to avoid wasting time.
    const prefs = warmupPrefs || { enabled: true, mode: 'full', onlyCompounds: false };
    if (!prefs.enabled)
        return [];
    const exType = (ex === null || ex === void 0 ? void 0 : ex.type) || 'compound';
    const role = (ex === null || ex === void 0 ? void 0 : ex.role) || 'accessory';
    const intent = dayIntent || (programType === 'Powerbuilding' ? 'mixed' : (programType === 'Hypertrophy' ? 'hypertrophy' : (programType === 'Strength' ? 'strength' : 'mixed')));
    const reps = (ex === null || ex === void 0 ? void 0 : ex.reps) || [8, 12];
    const minRep = (_a = reps[0]) !== null && _a !== void 0 ? _a : 8;
    const isMainish = (role === 'main' || role === 'secondary');
    const isCompound = exType === 'compound';
    // If user prefers warm-ups only for compounds, skip isolations.
    if (prefs.onlyCompounds && !isCompound)
        return [];
    // Decide count
    let count = 0;
    if (!isCompound) {
        // Isolation: one light set is enough for most people; skip on minimalist-strength intent.
        if (!(programType === 'Minimalist' && intent === 'strength'))
            count = 1;
    }
    else {
        if (isMainish) {
            // Heavy / low rep work needs more ramp.
            if (minRep <= 3)
                count = 4;
            else if (minRep <= 6)
                count = 3;
            else
                count = 2;
            // In Peak strength intent, keep but don't overdo.
            if (programType === 'Strength' && phaseName === 'Peak')
                count = Math.max(count, 3);
            // Minimalist: keep warm-ups brief
            if (programType === 'Minimalist')
                count = Math.min(count, 2);
        }
        else {
            // Accessory compound
            if (minRep <= 6)
                count = 2;
            else
                count = 1;
            if (programType === 'Hypertrophy' && intent === 'hypertrophy')
                count = Math.max(count, 2);
            if (programType === 'Minimalist')
                count = 1;
        }
    }
    if (count <= 0)
        return [];
    // Minimal mode trims warm-up volume (keep the last ~2 steps of the ramp).
    if (prefs.mode === 'minimal') {
        count = Math.min(2, count);
    }
    // Percent ramp templates (of estimated working weight)
    // Keep final warm-up close but not fatiguing.
    let pctRamp = [];
    if (!isCompound) {
        pctRamp = [50];
    }
    else if (count === 1) {
        pctRamp = [50];
    }
    else if (count === 2) {
        pctRamp = [45, 70];
    }
    else if (count === 3) {
        pctRamp = [40, 60, 75];
    }
    else { // 4+
        pctRamp = [35, 55, 70, 82];
    }
    if (prefs.mode === 'minimal' && pctRamp.length > 2) {
        pctRamp = pctRamp.slice(-2);
    }
    // Warm-up reps: higher early, lower later; never to fatigue.
    const repRamp = pctRamp.map((p, i) => {
        if (!isCompound)
            return Math.min(12, Math.max(8, minRep));
        if (i === 0)
            return Math.min(8, Math.max(5, minRep + 2));
        if (i === 1)
            return Math.min(6, Math.max(3, minRep));
        if (i === pctRamp.length - 1)
            return Math.min(3, Math.max(1, Math.round(minRep / 2)));
        return Math.min(5, Math.max(2, minRep - 1));
    });
    // Use suggested working weight if available; otherwise leave weights null
    const workW = (ex === null || ex === void 0 ? void 0 : ex.weight) ? parseFloat(ex.weight) : null;
    return pctRamp.map((pct, i) => {
        var _a;
        const w = (workW && workW > 0) ? roundWeight(workW * (pct / 100)) : null;
        return {
            reps: (_a = repRamp[i]) !== null && _a !== void 0 ? _a : 5,
            pct,
            weight: w ? String(w) : null,
            note: (workW && w) ? null : 'easy'
        };
    });
}
function getSets(experience, exType, programType) {
    const volumeMap = {
        Beginner: { compound: 3, isolation: 2 },
        Intermediate: { compound: 4, isolation: 3 },
        Advanced: { compound: 5, isolation: 3 }
    };
    const multiplier = programType === 'Strength' ? 0.75 :
        programType === 'Minimalist' ? 0.6 : 1.0;
    return Math.max(2, Math.round(volumeMap[experience][exType] * multiplier));
}
// ==================== PROGRAM GENERATION ====================
/**
 * BULLETPROOF PROGRAM GENERATOR (v3)
 * Hypertrophy-first with Powerbuilding overlay.
 *
 * Key upgrades vs legacy generator:
 * - Muscle-first weekly volume targets with MEV→MAV ramping inside each 4-week block.
 * - Deterministic constraint-solver exercise selection (no carousel rotation).
 * - Block stability: exercises remain fixed within weeks 1–3 of each block.
 * - Fractional set accounting (primary=1.0, secondary=0.5) to avoid hidden arm/delt overload.
 * - Fatigue-aware ordering and time-cap trimming.
 *
 * Note: Full closed-loop (logbook → next prescription) requires workout logging UI; this generator
 * produces a robust 12-week plan given current UI inputs.
 */
// ------------------------------------------------------------
// PROGRAM PROFILES (programType-driven split + slots + scoring)
// ------------------------------------------------------------
const PROGRAM_PROFILES = (() => {
    const DEFAULT_SPLITS = {
        3: ['Full', 'Full', 'Full'],
        4: ['Upper', 'Lower', 'Upper', 'Lower'],
        5: ['Upper', 'Lower', 'Upper', 'Lower', 'Upper'],
        6: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs']
    };
    const HYPERTROPHY_SLOTS = {
        Upper: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'main', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'secondary', type: 'compound' },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' }
        ],
        Lower: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_quad_isolation', fallback: 'legs_quad_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_hamstring_isolation', fallback: 'legs_hamstring_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_calves', fallback: 'legs_calves', role: 'accessory', type: 'isolation' },
            { pool: 'core_antiextension', fallback: 'core_antirotation', role: 'accessory', type: 'isolation', optional: true }
        ],
        Push: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound' },
            { pool: 'chest_isolation', fallback: 'isolation', role: 'accessory', type: 'isolation' },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' }
        ],
        Pull: [
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'main', type: 'compound' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'secondary', type: 'compound' },
            { pool: 'shoulders_rear', fallback: 'shoulders_rear', role: 'accessory', type: 'isolation' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation' }
        ],
        Legs: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_quad_isolation', fallback: 'legs_quad_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_hamstring_isolation', fallback: 'legs_hamstring_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_calves', fallback: 'legs_calves', role: 'accessory', type: 'isolation' },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation', optional: true }
        ],
        Full: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound' },
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'secondary', type: 'compound' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'secondary', type: 'compound' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'accessory', type: 'compound', optional: true },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation' }
        ]
    };
    const STRENGTH_SLOTS = {
        Upper: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound', requireMainLiftKey: 'bench' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'main', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound', preferMainLiftKey: 'ohp' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'secondary', type: 'compound' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' },
            { pool: 'shoulders_rear', fallback: 'shoulders_rear', role: 'accessory', type: 'isolation' },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation', optional: true }
        ],
        Lower: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound', requireMainLiftKey: 'squat' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'main', type: 'compound', preferMainLiftKey: 'deadlift' },
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'secondary', type: 'compound', secondarySlot: true },
            { pool: 'legs_hamstring_isolation', fallback: 'legs_hamstring_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'core_antiextension', fallback: 'core_antirotation', role: 'accessory', type: 'isolation' }
        ],
        Full: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound', requireMainLiftKey: 'squat' },
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound', requireMainLiftKey: 'bench' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'secondary', type: 'compound', preferMainLiftKey: 'deadlift' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'secondary', type: 'compound' },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation' }
        ],
        Push: HYPERTROPHY_SLOTS.Push,
        Pull: HYPERTROPHY_SLOTS.Pull,
        Legs: HYPERTROPHY_SLOTS.Legs
    };
    // POWERBUILDING = Strength identity + hypertrophy volume.
    // Critical app-specific rule: repeated "Upper" or "Lower" day types must NOT be identical.
    // So we define A/B variants with different slot ordering and intent:
    // - UpperA = Bench priority + horizontal pulling
    // - UpperB = Bench volume/variation priority + more vertical pulling/shoulders
    // - LowerA = Squat priority + lighter hinge work
    // - LowerB = Hinge (deadlift) priority + squat variation
    const POWERBUILDING_SLOTS = {
        UpperA: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound', requireMainLiftKey: 'bench' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'main', type: 'compound' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'secondary', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound', preferMainLiftKey: 'ohp' },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation' }
        ],
        UpperB: [
            // Still guarantees a bench pattern, but aims to avoid exact duplication with UpperA.
            // The selector will often choose a different bench variant (incline/DB/CG) due to differing downstream needs.
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound', requireMainLiftKey: 'bench' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'main', type: 'compound' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'secondary', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound', preferMainLiftKey: 'ohp' },
            { pool: 'chest_isolation', fallback: 'isolation', role: 'accessory', type: 'isolation', optional: true },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' }
        ],
        LowerA: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound', requireMainLiftKey: 'squat' },
            // Prefer hinge variations that are less systemically fatiguing in Squat-priority day
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'secondary', type: 'compound', preferMainLiftKey: 'deadlift' },
            { pool: 'legs_quad_isolation', fallback: 'legs_quad_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_hamstring_isolation', fallback: 'legs_hamstring_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_calves', fallback: 'legs_calves', role: 'accessory', type: 'isolation', optional: true },
            { pool: 'core_antiextension', fallback: 'core_antirotation', role: 'accessory', type: 'isolation', optional: true }
        ],
        LowerB: [
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'main', type: 'compound', preferMainLiftKey: 'deadlift' },
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'secondary', type: 'compound', requireMainLiftKey: 'squat', secondarySlot: true },
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'secondary', type: 'compound', secondarySlot: true, optional: true },
            { pool: 'legs_hamstring_isolation', fallback: 'legs_hamstring_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_quad_isolation', fallback: 'legs_quad_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation', optional: true }
        ],
        // Full body day remains a stable template.
        Full: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound', requireMainLiftKey: 'squat' },
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound', requireMainLiftKey: 'bench' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'secondary', type: 'compound', preferMainLiftKey: 'deadlift' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'secondary', type: 'compound' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'accessory', type: 'compound', optional: true },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation', optional: true }
        ],
        Push: HYPERTROPHY_SLOTS.Push,
        Pull: HYPERTROPHY_SLOTS.Pull,
        Legs: HYPERTROPHY_SLOTS.Legs,
        // Backwards-compat: if any legacy split still uses "Upper"/"Lower", map them to A variants.
        Upper: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound', requireMainLiftKey: 'bench' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'main', type: 'compound' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'secondary', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound', preferMainLiftKey: 'ohp' },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation' }
        ],
        Lower: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound', requireMainLiftKey: 'squat' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'secondary', type: 'compound', preferMainLiftKey: 'deadlift' },
            { pool: 'legs_quad_isolation', fallback: 'legs_quad_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'legs_hamstring_isolation', fallback: 'legs_hamstring_isolation', role: 'accessory', type: 'isolation' },
            { pool: 'core_antiextension', fallback: 'core_antirotation', role: 'accessory', type: 'isolation', optional: true }
        ]
    };
    const MINIMALIST_SLOTS = {
        Upper: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'main', type: 'compound' },
            { pool: 'shoulders_lateral', fallback: 'shoulders_lateral', role: 'accessory', type: 'isolation' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation', supersetGroup: 'A' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation', supersetGroup: 'A' }
        ],
        Lower: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_calves', fallback: 'legs_calves', role: 'accessory', type: 'isolation' },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation' }
        ],
        Full: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound' },
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound' },
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'secondary', type: 'compound' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'secondary', type: 'compound' },
            { pool: 'core_antiextension', fallback: 'core_antirotation', role: 'accessory', type: 'isolation' }
        ],
        Push: [
            { pool: 'chest_horizontal', fallback: 'horizontal_push', role: 'main', type: 'compound' },
            { pool: 'shoulders_press', fallback: 'vertical_push', role: 'secondary', type: 'compound' },
            { pool: 'arms_triceps', fallback: 'arms_triceps', role: 'accessory', type: 'isolation' }
        ],
        Pull: [
            { pool: 'back_vertical', fallback: 'vertical_pull', role: 'main', type: 'compound' },
            { pool: 'back_horizontal', fallback: 'horizontal_pull', role: 'secondary', type: 'compound' },
            { pool: 'arms_biceps', fallback: 'arms_biceps', role: 'accessory', type: 'isolation' }
        ],
        Legs: [
            { pool: 'legs_squat', fallback: 'squat_pattern', role: 'main', type: 'compound' },
            { pool: 'legs_hinge', fallback: 'hinge_pattern', role: 'main', type: 'compound' },
            { pool: 'core_antirotation', fallback: 'core_antiextension', role: 'accessory', type: 'isolation' }
        ]
    };
    function scoringFor(type) {
        switch (type) {
            case 'Strength':
                return { needW: 0.55, stimW: 0.20, romW: 0.05, fatigueW: 0.55, setupW: 0.20, skillW: 0.35, mainLiftBonus: 0.55, preferMachine: -0.08, preferFreeWeight: 0.12, stimulusToFatigueW: 0.10 };
            case 'Powerbuilding':
                // Blend: keep strong need+stimulus, but raise main-lift bonus and fatigue sensitivity.
                return { needW: 0.70, stimW: 0.28, romW: 0.15, fatigueW: 0.42, setupW: 0.20, skillW: 0.25, mainLiftBonus: 0.35, preferMachine: 0.05, preferFreeWeight: 0.08, stimulusToFatigueW: 0.18 };
            case 'Minimalist':
                return { needW: 0.60, stimW: 0.35, romW: 0.10, fatigueW: 0.30, setupW: 0.40, skillW: 0.15, mainLiftBonus: 0.10, preferMachine: 0.12, preferFreeWeight: 0.00, stimulusToFatigueW: 0.30 };
            case 'Hypertrophy':
            default:
                return { needW: 0.75, stimW: 0.35, romW: 0.25, fatigueW: 0.30, setupW: 0.20, skillW: 0.20, mainLiftBonus: 0.15, preferMachine: 0.10, preferFreeWeight: 0.03, stimulusToFatigueW: 0.22 };
        }
    }
    const SPLIT_OVERRIDES = {
        Strength: {
            3: ['Full', 'Full', 'Full'],
            4: ['Upper', 'Lower', 'Upper', 'Lower'],
            5: ['Upper', 'Lower', 'Full', 'Upper', 'Lower'],
            6: ['Upper', 'Lower', 'Upper', 'Lower', 'Full', 'Full']
        },
        Powerbuilding: {
            3: ['Full', 'Full', 'Full'],
            4: ['UpperA', 'LowerA', 'UpperB', 'LowerB'],
            // 5 days: bench frequency + balanced lower exposure
            5: ['UpperA', 'LowerA', 'Full', 'UpperB', 'LowerB'],
            6: ['Upper', 'Lower', 'Upper', 'Lower', 'Full', 'Full']
        },
        Minimalist: {
            3: ['Full', 'Full', 'Full'],
            4: ['Upper', 'Lower', 'Upper', 'Lower'],
            5: ['Upper', 'Lower', 'Full', 'Upper', 'Lower'],
            6: ['Push', 'Pull', 'Legs', 'Full', 'Upper', 'Lower']
        }
    };
    return {
        Hypertrophy: { name: 'Hypertrophy', splitTemplates: DEFAULT_SPLITS, daySlots: HYPERTROPHY_SLOTS, scoring: scoringFor('Hypertrophy') },
        Strength: { name: 'Strength', splitTemplates: { ...DEFAULT_SPLITS, ...(SPLIT_OVERRIDES.Strength || {}) }, daySlots: STRENGTH_SLOTS, scoring: scoringFor('Strength') },
        Powerbuilding: { name: 'Powerbuilding', splitTemplates: { ...DEFAULT_SPLITS, ...(SPLIT_OVERRIDES.Powerbuilding || {}) }, daySlots: POWERBUILDING_SLOTS, scoring: scoringFor('Powerbuilding') },
        Minimalist: { name: 'Minimalist', splitTemplates: { ...DEFAULT_SPLITS, ...(SPLIT_OVERRIDES.Minimalist || {}) }, daySlots: MINIMALIST_SLOTS, scoring: scoringFor('Minimalist') }
    };
})();
function generateProgram(config) {
    var _a, _b, _c;
    const { experience, days, programType, oneRMs } = config;
    const daysNum = parseInt(days);
    // Program profile (drives split + slots + exercise scoring)
    const profile = PROGRAM_PROFILES[programType] || PROGRAM_PROFILES.Hypertrophy;
    const split = ((_a = profile.splitTemplates) === null || _a === void 0 ? void 0 : _a[daysNum]) || ((_b = PROGRAM_PROFILES.Hypertrophy.splitTemplates) === null || _b === void 0 ? void 0 : _b[daysNum]) || ((_c = PROGRAM_PROFILES.Hypertrophy.splitTemplates) === null || _c === void 0 ? void 0 : _c[4]);
    const scoreW = profile.scoring || PROGRAM_PROFILES.Hypertrophy.scoring;
    // -------------------- Deterministic helpers --------------------
    const FATIGUE_NUM = { low: 1, medium: 2, high: 3, very_high: 4 };
    const SKILL_NUM = { low: 1, medium: 2, high: 3, very_high: 4 };
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const stableId = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    function inferSetupCost(eq) {
        // Setup/time friction heuristics
        if (!eq)
            return 2;
        const e = String(eq).toLowerCase();
        if (e.includes('barbell'))
            return 3;
        if (e.includes('dumbbell'))
            return 2;
        if (e.includes('machine') || e.includes('cable'))
            return 1;
        return 2;
    }
    function inferRomBias(exName, patternKey) {
        // Conservative heuristic defaults. This is extensible.
        const n = String(exName || '').toLowerCase();
        const k = String(patternKey || '').toLowerCase();
        if (n.includes('romanian') || n.includes('rdl'))
            return 'lengthened';
        if (n.includes('incline') && (k.includes('chest') || k.includes('curl') || n.includes('fly')))
            return 'lengthened';
        if (n.includes('overhead') && (k.includes('triceps') || n.includes('extension')))
            return 'lengthened';
        if (n.includes('fly'))
            return 'lengthened';
        if (n.includes('leg curl') || n.includes('hamstring'))
            return 'lengthened';
        return 'mid';
    }
    // NEW: main-lift identity + stimulus-to-fatigue heuristic (used by program profiles)
    function inferMainLiftKey(rawName, poolKey, equipment) {
        const n = String(rawName || '').toLowerCase();
        const p = String(poolKey || '').toLowerCase();
        const e = String(equipment || '').toLowerCase();
        const isBenchish = n.includes('bench') || (p.includes('chest_horizontal') && e.includes('barbell'));
        const isSquatish = n.includes('squat') || (p.includes('legs_squat') && e.includes('barbell'));
        const isDeadliftish = n.includes('deadlift') || (p.includes('legs_hinge') && e.includes('barbell'));
        const isOHPish = n.includes('overhead') || n.includes('ohp') || (p.includes('shoulders_press') && e.includes('barbell'));
        if (isBenchish)
            return 'bench';
        if (isSquatish)
            return 'squat';
        if (isDeadliftish)
            return 'deadlift';
        if (isOHPish)
            return 'ohp';
        return null;
    }
    function inferStimulusToFatigue(ex, fatigueNum, skillNum, setupNum) {
        // Higher is better (rough heuristic for stimulus-to-fatigue / stimulus-to-time efficiency)
        const eq = String(ex.equipment || '').toLowerCase();
        const isMachine = eq.includes('machine') || eq.includes('cable');
        const isBarbell = eq.includes('barbell');
        let sf = 0.5;
        if (isMachine)
            sf += 0.15;
        if (isBarbell)
            sf -= 0.05;
        sf += (3 - fatigueNum) * 0.08;
        sf += (3 - skillNum) * 0.06;
        sf += (3 - setupNum) * 0.05;
        return clamp01(sf);
    }
    function normalizeExercise(raw, poolKey) {
        var _a, _b;
        const fatigueKey = String(raw.fatigue || '').toLowerCase().trim() || 'medium';
        const skillKey = String(raw.skill || '').toLowerCase().trim() || 'medium';
        const equipment = raw.equipment || 'unknown';
        const fatigueNum = (_a = FATIGUE_NUM[fatigueKey]) !== null && _a !== void 0 ? _a : 2;
        const skillNum = (_b = SKILL_NUM[skillKey]) !== null && _b !== void 0 ? _b : 2;
        const setupNum = inferSetupCost(equipment);
        const mainLiftKey = inferMainLiftKey(raw.name, poolKey, equipment);
        return {
            id: stableId(raw.name),
            name: raw.name,
            poolKey,
            type: raw.type || 'compound',
            primary: raw.primary || raw.primeMover || raw.primaryMuscle || 'unknown',
            secondary: raw.secondary || [],
            fatigueNum,
            skillNum,
            setupNum,
            equipment,
            repRange: raw.repRange || [8, 12],
            romBias: inferRomBias(raw.name, poolKey),
            // Profile-aware metadata (used for programType-driven selection)
            mainLiftKey,
            isMainLift: !!mainLiftKey,
            isMachine: String(equipment).toLowerCase().includes('machine') || String(equipment).toLowerCase().includes('cable'),
            stimulusToFatigue: inferStimulusToFatigue({ equipment }, fatigueNum, skillNum, setupNum),
            substitutionGroup: poolKey // stimulus-equivalent family
        };
    }
    // Build a unified candidate index from the comprehensive EXERCISE_DATABASE if present.
    // Fallback: use the lightweight EXERCISE_DB.
    const SOURCE_DB = (typeof EXERCISE_DATABASE !== 'undefined' && EXERCISE_DATABASE) ? EXERCISE_DATABASE : EXERCISE_DB;
    function getCandidates(poolKey) {
        const arr = SOURCE_DB[poolKey] || [];
        return arr.map(x => normalizeExercise(x, poolKey)).sort((a, b) => a.id.localeCompare(b.id));
    }
    // -------------------- Split templates --------------------
    // Day pattern “slots” (roles). Slots are satisfied via scoring solver.
    // -------------------- Volume landmarks (MEV→MAV) --------------------
    // Muscles tracked in this generator (kept simple; extended tracking requires richer tagging)
    const MUSCLES = ['chest', 'back', 'lats', 'front_delts', 'side_delts', 'rear_delts', 'biceps', 'triceps', 'quads', 'hamstrings', 'glutes', 'calves'];
    const LANDMARKS = {
        Beginner: { MEV: 6, MAV: 11, MRV: 16 },
        Intermediate: { MEV: 8, MAV: 15, MRV: 22 },
        Advanced: { MEV: 8, MAV: 16, MRV: 24 }
    };
    // Per-week ramp inside a 4-week block (1–3 accumulate, 4 deload)
    function weekRampInBlock(weekInBlock) {
        if (weekInBlock === 4)
            return { volMult: 0.5, deload: true };
        if (weekInBlock === 3)
            return { volMult: 1.25, deload: false };
        if (weekInBlock === 2)
            return { volMult: 1.12, deload: false };
        return { volMult: 1.0, deload: false };
    }
    function baselineWeeklyTargets() {
        const lm = LANDMARKS[experience] || LANDMARKS.Intermediate;
        // Hypertrophy-first defaults: emphasize back/quads/delts slightly.
        const base = {};
        MUSCLES.forEach(m => { base[m] = lm.MEV; });
        base.back = lm.MEV + 2;
        base.quads = lm.MEV + 2;
        base.side_delts = lm.MEV + 1;
        base.glutes = lm.MEV + 1;
        // Arms often get lots of secondary volume; keep at MEV initially.
        return { base, lm };
    }
    function applyRails(targets, lm) {
        const out = { ...targets };
        Object.keys(out).forEach(m => {
            const mr = (m === 'hamstrings') ? (lm.MRV - 2) : lm.MRV;
            out[m] = Math.max(0, Math.min(mr, out[m]));
        });
        return out;
    }
    // -------------------- Quota allocation --------------------
    function initQuotaMap() {
        const q = {};
        MUSCLES.forEach(m => q[m] = 0);
        return q;
    }
    function addQuota(q, muscle, val) {
        if (!muscle)
            return;
        if (q[muscle] == null)
            q[muscle] = 0;
        q[muscle] += val;
    }
    function creditExercise(q, ex, sets) {
        // Primary credit
        addQuota(q, ex.primary, -sets * 1.0);
        // Secondary credit (0.5 each)
        (ex.secondary || []).forEach(s => addQuota(q, s, -sets * 0.5));
    }
    function estimateExerciseTimeSeconds(ex, sets, reps, restStr) {
        var _a, _b, _c;
        // Very rough but consistent model.
        // Set time: ~30–45s depending on reps (scale modestly).
        const avgReps = (reps[0] + reps[1]) / 2;
        const setTime = 25 + (avgReps * 2.0); // seconds
        // Rest
        const rest = String(restStr || '').includes('min') ? restStr : restStr;
        const parseRest = (s) => {
            const m = String(s).match(/(\d+(?:\.\d+)?)\s*\-\s*(\d+(?:\.\d+)?)\s*min/i);
            if (m)
                return ((parseFloat(m[1]) + parseFloat(m[2])) / 2) * 60;
            const m2 = String(s).match(/(\d+)\s*\-\s*(\d+)\s*s/i);
            if (m2)
                return (parseFloat(m2[1]) + parseFloat(m2[2])) / 2;
            const m3 = String(s).match(/(\d+)\s*\-\s*(\d+)\s*min/i);
            if (m3)
                return ((parseFloat(m3[1]) + parseFloat(m3[2])) / 2) * 60;
            return 90;
        };
        const restSec = parseRest(rest);
        // Setup cost
        const setupNum = (_c = (_a = ex === null || ex === void 0 ? void 0 : ex.setupNum) !== null && _a !== void 0 ? _a : (_b = ex === null || ex === void 0 ? void 0 : ex.tags) === null || _b === void 0 ? void 0 : _b.setup) !== null && _c !== void 0 ? _c : 2;
        const setup = setupNum === 3 ? 120 : setupNum === 2 ? 75 : 45;
        // Warm-up sets (if provided)
        const warmups = Array.isArray(ex === null || ex === void 0 ? void 0 : ex.warmups) ? ex.warmups : [];
        const warmSetTime = (ws) => {
            var _a;
            const r = (_a = ws === null || ws === void 0 ? void 0 : ws.reps) !== null && _a !== void 0 ? _a : Math.round(avgReps * 0.6);
            return 18 + (r * 1.6);
        };
        const warmRest = 45; // seconds between warm-ups
        const warmTotal = warmups.reduce((sum, ws) => sum + warmSetTime(ws), 0) + Math.max(0, warmups.length - 1) * warmRest + (warmups.length ? 60 : 0); // ~60s to transition to work sets
        // Total: setup once + sets*(setTime + rest except last rest)
        return setup + warmTotal + Math.max(0, sets) * setTime + Math.max(0, sets - 1) * restSec;
    }
    // -------------------- Exercise selection (solver) --------------------
    function chooseExercise(slot, remainingTargets, dayFatigue, usedIds, weekUsedIds, wantLengthened, profileObj, ctx = {}) {
        var _a;
        // ctx supports hard constraints:
        // - axialUsedCount / maxAxialMonstersPerDay
        // - allowHeavyBarbellHinge (Powerbuilding survival rule)
        // - dayIntent (strength vs hypertrophy)
        const w = (profileObj === null || profileObj === void 0 ? void 0 : profileObj.scoring) || scoreW;
        const pool = getCandidates(slot.pool).filter(ex => ex.type === slot.type).filter(ex => !usedIds.has(ex.id));
        // ---- Hard constraint helpers ----
        const isBarbell = (ex) => String(ex.equipment || '').toLowerCase().includes('barbell');
        const isLegPool = (ex) => String(ex.poolKey || '').includes('legs_squat') || String(ex.poolKey || '').includes('legs_hinge');
        const isAxialMonster = (ex) => (ex.type === 'compound' &&
            isLegPool(ex) &&
            isBarbell(ex) &&
            (ex.fatigueNum >= 3) // high/very_high
        );
        const isBarbellHinge = (ex) => String(ex.poolKey || '').includes('legs_hinge') && isBarbell(ex);
        const isHeavyBarbellHinge = (ex) => isBarbellHinge(ex) && (ex.fatigueNum >= 4 || String(ex.name || '').toLowerCase().includes('deadlift'));
        // Filter by constraints (exclude rather than just penalize — prevents "looks fine in scoring" failures)
        let candidates = pool.filter(ex => {
            if (ctx.maxAxialMonstersPerDay != null && ctx.axialUsedCount >= ctx.maxAxialMonstersPerDay && isAxialMonster(ex))
                return false;
            if (ctx.allowHeavyBarbellHinge === false && isHeavyBarbellHinge(ex))
                return false;
            if (ctx.allowBarbellHinge === false && isBarbellHinge(ex))
                return false;
            return true;
        });
        // Fallback to any in pool if constraints leave none
        if (!candidates.length)
            candidates = pool;
        // Prefer lengthened if requested and available
        if (wantLengthened) {
            const len = candidates.filter(ex => ex.romBias === 'lengthened');
            if (len.length)
                candidates = len;
        }
        // Avoid repeating same substitution group (within the week) for better intent separation (UpperA vs UpperB, etc.)
        if (weekUsedIds && weekUsedIds.size) {
            // Soft penalty applied in scoring below
        }
        const scored = candidates
            .map(ex => {
            var _a, _b;
            const primary = ex.primary;
            const remaining = (_a = remainingTargets[primary]) !== null && _a !== void 0 ? _a : 0;
            const needFit = clamp01(remaining / 10); // normalize against typical 10-set band
            // Stimulus approximations: compounds and lengthened bias are nudged up for hypertrophy-intent days
            const stimBase = (ex.type === 'compound') ? 0.85 : 0.70;
            const romBonus = (ex.romBias === 'lengthened') ? (w.romW || 0) : (ex.romBias === 'mid' ? (w.romW || 0) * 0.5 : 0);
            const fatiguePenalty = (ex.fatigueNum / 4) * w.fatigueW;
            const setupPenalty = (ex.setupNum / 3) * w.setupW;
            const skillPenalty = (ex.skillNum / 4) * w.skillW;
            let mainLiftBonus = 0;
            if (ex.isMainLift && (slot.role === 'main' || slot.role === 'secondary')) {
                mainLiftBonus += w.mainLiftBonus;
            }
            else if (ex.isMainLift && slot.role === 'accessory') {
                mainLiftBonus += w.mainLiftBonus * 0.5;
            }
            let equipNudge = 0;
            if (ex.isMachine)
                equipNudge += w.preferMachine;
            if (String(ex.equipment || '').toLowerCase().includes('barbell'))
                equipNudge += w.preferFreeWeight;
            const sfBonus = ((_b = ex.stimulusToFatigue) !== null && _b !== void 0 ? _b : 0.5) * w.stimulusToFatigueW;
            // Soft penalty for reusing the exact same movement family in the same week
            let varietyPenalty = 0;
            if (weekUsedIds && weekUsedIds.has(ex.id))
                varietyPenalty += 0.35;
            // Powerbuilding: enforce day intent separation
            let intentBonus = 0;
            const intent = ctx.dayIntent || 'mixed';
            if (programType === 'Powerbuilding') {
                if (intent === 'hypertrophy') {
                    // Prefer machine/cable for accessories and reduce fatigue
                    if (slot.role === 'accessory' && ex.isMachine)
                        intentBonus += 0.10;
                    if (ex.fatigueNum >= 3 && slot.role !== 'main')
                        varietyPenalty += 0.10;
                }
                else if (intent === 'strength') {
                    // Prefer free weights for main lifts; avoid junk accessories
                    if ((slot.role === 'main' || slot.role === 'secondary') && String(ex.equipment || '').toLowerCase().includes('barbell'))
                        intentBonus += 0.08;
                }
            }
            // Optional-slot suppression: if primary muscle already filled, score collapses
            const optionalSuppression = (slot.optional && remaining <= 0) ? 0.35 : 0;
            const score = (needFit * w.needW) + (stimBase * w.stimW) + romBonus + mainLiftBonus + equipNudge + sfBonus + intentBonus
                - fatiguePenalty - setupPenalty - skillPenalty - varietyPenalty - optionalSuppression;
            return { ex, score };
        })
            .sort((a, b) => {
            if (b.score !== a.score)
                return b.score - a.score;
            if (a.ex.fatigueNum !== b.ex.fatigueNum)
                return a.ex.fatigueNum - b.ex.fatigueNum;
            if (a.ex.setupNum !== b.ex.setupNum)
                return a.ex.setupNum - b.ex.setupNum;
            return a.ex.id.localeCompare(b.ex.id);
        });
        return ((_a = scored[0]) === null || _a === void 0 ? void 0 : _a.ex) || null;
    }
    function defaultSetsForRole(exRole, exType, wRamp, dayIntent = null) {
        var _a, _b;
        // Baseline sets by experience and role.
        const base = {
            Beginner: { compound: 3, isolation: 2 },
            Intermediate: { compound: 4, isolation: 3 },
            Advanced: { compound: 5, isolation: 3 }
        };
        let sets = (_b = (_a = base[experience]) === null || _a === void 0 ? void 0 : _a[exType]) !== null && _b !== void 0 ? _b : 3;
        // Program baselines
        if (programType === 'Strength')
            sets = Math.max(2, Math.round(sets * 0.75));
        if (programType === 'Powerbuilding')
            sets = Math.max(2, Math.round(sets * 0.90));
        if (programType === 'Minimalist')
            sets = Math.max(2, Math.round(sets * 0.65));
        // Day intent suppression (prevents "filling space" on strength days)
        const intent = dayIntent || 'mixed';
        if (intent === 'strength' && exRole === 'accessory') {
            sets = Math.max(1, Math.round(sets * 0.6));
        }
        if (intent === 'strength' && exRole === 'secondary' && exType === 'isolation') {
            sets = Math.max(1, Math.round(sets * 0.7));
        }
        // Role: main lifts get stable volume; accessories carry most ramp.
        if (exRole === 'main' && exType === 'compound') {
            sets = Math.max(2, Math.round(sets * (wRamp.deload ? 0.6 : (wRamp.volMult >= 1.2 ? 1.05 : 1.0))));
        }
        else {
            sets = Math.max(1, Math.round(sets * wRamp.volMult));
        }
        if (wRamp.deload)
            sets = Math.max(1, Math.round(sets * 0.7));
        return sets;
    }
    function buildDayExerciseList(dayType, weekTargets, wRamp, timeCapMin, phaseName = 'Base', weekUsedIds = new Set()) {
        var _a, _b, _c;
        const slots = (((_a = profile.daySlots) === null || _a === void 0 ? void 0 : _a[dayType]) || ((_b = PROGRAM_PROFILES.Hypertrophy.daySlots) === null || _b === void 0 ? void 0 : _b[dayType]) || ((_c = PROGRAM_PROFILES.Hypertrophy.daySlots) === null || _c === void 0 ? void 0 : _c['Full']) || []);
        const used = new Set();
        // Copy remaining targets for within-day accounting
        const remaining = { ...weekTargets };
        // Day intent (used to separate strength vs hypertrophy behavior)
        const getDayIntent = () => {
            if (programType === 'Powerbuilding') {
                if (String(dayType).includes('A'))
                    return 'strength';
                if (String(dayType).includes('B'))
                    return 'hypertrophy';
            }
            if (programType === 'Strength')
                return 'strength';
            if (programType === 'Hypertrophy')
                return 'hypertrophy';
            if (programType === 'Minimalist')
                return 'minimal';
            return 'mixed';
        };
        const dayIntent = getDayIntent();
        // Hard survival constraints
        const ctx = {
            dayIntent,
            axialUsedCount: 0,
            maxAxialMonstersPerDay: 1,
            // Powerbuilding advanced hinge governor:
            // - allow heavy barbell hinge only on LowerA (strength lower)
            allowHeavyBarbellHinge: !(programType === 'Powerbuilding' && experience === 'Advanced' && String(dayType) !== 'LowerA'),
            // - allow any barbell hinge at all on hypertrophy lower? usually no (prefer DB/machine)
            allowBarbellHinge: !(programType === 'Powerbuilding' && experience === 'Advanced' && String(dayType) === 'LowerB')
        };
        const dayFatigue = { highCount: 0 };
        const lengthenedUsedByMuscle = {};
        const chosen = [];
        const estimateTotalSec = () => chosen.reduce((sum, ex) => sum + estimateExerciseTimeSeconds(ex, ex.sets, ex.reps, ex.rest), 0);
        const capSec = timeCapMin ? (Math.max(10, parseInt(timeCapMin)) * 60) : null;
        const shouldFillOptional = (slot) => {
            var _a, _b, _c;
            if (!slot.optional)
                return true;
            // Optional slots are only filled if:
            // 1) we still "need" the preferred muscle (or the slot's pool primary),
            // 2) time budget allows,
            // 3) day intent permits (strength days are minimalist by design)
            if (dayIntent === 'strength')
                return false; // protect main lifts on strength days
            const prefer = slot.prefer || null;
            if (prefer && ((_a = remaining[prefer]) !== null && _a !== void 0 ? _a : 0) <= 0)
                return false;
            // If no explicit prefer, approximate by checking the pool's first candidate primary
            if (!prefer) {
                const c = (_b = getCandidates(slot.pool)) === null || _b === void 0 ? void 0 : _b[0];
                const prim = c === null || c === void 0 ? void 0 : c.primary;
                if (prim && ((_c = remaining[prim]) !== null && _c !== void 0 ? _c : 0) <= 0)
                    return false;
            }
            if (capSec != null) {
                // crude time forecast: if we're already near cap, skip optional
                const usedSec = estimateTotalSec();
                if (usedSec > capSec * 0.85)
                    return false;
            }
            return true;
        };
        const isAxialMonsterTag = (exObj) => {
            var _a, _b, _c, _d;
            const pk = String(((_a = exObj === null || exObj === void 0 ? void 0 : exObj.tags) === null || _a === void 0 ? void 0 : _a.poolKey) || '');
            const nm = String((exObj === null || exObj === void 0 ? void 0 : exObj.name) || '').toLowerCase();
            const eq = String(((_b = exObj === null || exObj === void 0 ? void 0 : exObj.tags) === null || _b === void 0 ? void 0 : _b.equipment) || (exObj === null || exObj === void 0 ? void 0 : exObj.equipment) || '').toLowerCase();
            const fat = (_d = (_c = exObj === null || exObj === void 0 ? void 0 : exObj.tags) === null || _c === void 0 ? void 0 : _c.fatigue) !== null && _d !== void 0 ? _d : 2;
            const legPool = pk.includes('legs_squat') || pk.includes('legs_hinge');
            const barbell = eq.includes('barbell');
            return legPool && barbell && fat >= 3 && (nm.includes('squat') || nm.includes('deadlift') || pk.includes('legs_'));
        };
        for (const slot of slots) {
            if (!shouldFillOptional(slot))
                continue;
            const preferMuscle = slot.prefer;
            const wantLengthened = preferMuscle ? (!lengthenedUsedByMuscle[preferMuscle]) : false;
            const ex = chooseExercise(slot, remaining, dayFatigue, used, weekUsedIds, wantLengthened, profile, ctx);
            if (!ex)
                continue;
            used.add(ex.id);
            if (weekUsedIds)
                weekUsedIds.add(ex.id);
            if (ex.fatigueNum >= 3)
                dayFatigue.highCount += 1;
            // Determine reps/sets/rir/rest
            const exType = (ex.type === 'compound') ? 'compound' : 'isolation';
            const reps = getRepRange(programType, exType, 0, slot.role, phaseName, dayIntent);
            const sets = defaultSetsForRole(slot.role, exType, wRamp, dayIntent);
            const rir = getRIR(experience, exType, 1, sets, programType, slot.role, phaseName, dayIntent);
            const rest = getRest(reps[0], exType, programType);
            if (preferMuscle && ex.romBias === 'lengthened')
                lengthenedUsedByMuscle[preferMuscle] = true;
            // Credit muscle quotas (fractional)
            creditExercise(remaining, ex, sets);
            const entry = {
                id: ex.id,
                name: ex.name,
                primary: ex.primary,
                type: (ex.type === 'compound') ? 'compound' : 'isolation',
                role: slot.role,
                sets,
                reps,
                rir,
                rest,
                weight: null,
                tags: {
                    poolKey: ex.poolKey,
                    romBias: ex.romBias,
                    fatigue: ex.fatigueNum,
                    setup: ex.setupNum,
                    equipment: ex.equipment,
                    substitutionGroup: ex.substitutionGroup
                }
            };
            chosen.push(entry);
            // Update hard fatigue constraints
            if (isAxialMonsterTag(entry))
                ctx.axialUsedCount += 1;
        }
        // Top-off pass (hypertrophy intent days only): if key muscles are still meaningfully under target,
        // add 1 targeted isolation if time allows and the day isn't already long.
        if (dayIntent === 'hypertrophy' && capSec != null) {
            const under = Object.entries(remaining)
                .filter(([m, v]) => v >= 3) // meaningful deficit
                .sort((a, b) => b[1] - a[1]);
            const usedSec = estimateTotalSec();
            if (under.length && usedSec < capSec * 0.9) {
                const [muscle] = under[0];
                const topOffPoolsByMuscle = {
                    chest: 'chest_isolation',
                    lats: 'back_vertical',
                    back: 'back_horizontal',
                    quads: 'legs_quad_isolation',
                    hamstrings: 'legs_hamstring_isolation',
                    glutes: 'legs_glutes',
                    side_delts: 'shoulders_lateral',
                    rear_delts: 'shoulders_rear',
                    biceps: 'arms_biceps',
                    triceps: 'arms_triceps',
                    core: 'core_antiextension'
                };
                const pool = topOffPoolsByMuscle[muscle];
                if (pool && SOURCE_DB[pool]) {
                    const slot = { pool, fallback: pool, role: 'accessory', type: 'isolation', optional: true, prefer: muscle };
                    const ex = chooseExercise(slot, remaining, dayFatigue, used, weekUsedIds, false, profile, ctx);
                    if (ex) {
                        const exType = (ex.type === 'compound') ? 'compound' : 'isolation';
                        const reps = getRepRange(programType, exType, 0, 'accessory', phaseName, dayIntent);
                        const sets = Math.max(2, Math.round(defaultSetsForRole('accessory', exType, wRamp, dayIntent) * 0.7));
                        const rir = getRIR(experience, exType, 1, sets, programType, 'accessory', phaseName, dayIntent);
                        const rest = getRest(reps[0], exType, programType);
                        creditExercise(remaining, ex, sets);
                        chosen.push({
                            id: ex.id,
                            name: ex.name,
                            primary: ex.primary,
                            type: (ex.type === 'compound') ? 'compound' : 'isolation',
                            role: 'accessory',
                            sets,
                            reps,
                            rir,
                            rest,
                            weight: null,
                            tags: { poolKey: ex.poolKey, romBias: ex.romBias, fatigue: ex.fatigueNum, setup: ex.setupNum, equipment: ex.equipment, substitutionGroup: ex.substitutionGroup }
                        });
                    }
                }
            }
        }
        // Time cap trimming: cut lowest-priority exercises first (never cut main lifts).
        if (capSec && chosen.length) {
            const duration = () => chosen.reduce((sum, ex) => sum + estimateExerciseTimeSeconds(ex, ex.sets, ex.reps, ex.rest), 0);
            let t = duration();
            if (t > capSec) {
                const removalOrder = [...chosen]
                    .map((ex, idx) => ({ ex, idx }))
                    .sort((a, b) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const prio = (e) => (e.role === 'main' ? 0 : e.role === 'secondary' ? 1 : 2);
                    const ta = prio(a.ex), tb = prio(b.ex);
                    if (tb !== ta)
                        return tb - ta;
                    const fa = (_b = (_a = a.ex.tags) === null || _a === void 0 ? void 0 : _a.fatigue) !== null && _b !== void 0 ? _b : 2, fb = (_d = (_c = b.ex.tags) === null || _c === void 0 ? void 0 : _c.fatigue) !== null && _d !== void 0 ? _d : 2;
                    if (fb !== fa)
                        return fb - fa;
                    const sa = (_f = (_e = a.ex.tags) === null || _e === void 0 ? void 0 : _e.setup) !== null && _f !== void 0 ? _f : 2, sb = (_h = (_g = b.ex.tags) === null || _g === void 0 ? void 0 : _g.setup) !== null && _h !== void 0 ? _h : 2;
                    if (sb !== sa)
                        return sb - sa;
                    return b.idx - a.idx;
                });
                // Remove from end to avoid index shift issues
                for (const r of removalOrder) {
                    if (t <= capSec)
                        break;
                    if (r.ex.role === 'main')
                        continue;
                    const idx = chosen.findIndex(x => x.id === r.ex.id && x.name === r.ex.name && x.role === r.ex.role);
                    if (idx >= 0)
                        chosen.splice(idx, 1);
                    t = duration();
                }
            }
        }
        return chosen;
    }
    // -------------------- Weekly targets & block stability --------------------
    const { base: baseTargets, lm } = baselineWeeklyTargets();
    function targetsForWeek(week) {
        const weekInBlock = ((week - 1) % 4) + 1;
        const ramp = weekRampInBlock(weekInBlock);
        // Start around MEV, drift toward MAV via multiplier.
        // Accessories carry most of the ramp via sets; we also scale baseline targets modestly.
        const t = {};
        Object.keys(baseTargets).forEach(m => {
            const target = baseTargets[m] * (ramp.deload ? 0.6 : (weekInBlock === 3 ? 1.20 : weekInBlock === 2 ? 1.10 : 1.0));
            t[m] = Math.round(target);
        });
        return applyRails(t, lm);
    }
    // Pre-select exercises for each block (weeks 1–3 stable).
    const blockPlans = {}; // blockIndex -> dayIndex -> exercise list (without per-week sets)
    function getBlockIndex(week) { return Math.floor((week - 1) / 4); }
    // -------------------- Build program --------------------
    const weeks = [];
    for (let w = 1; w <= 12; w++) {
        const phase = getPhaseParams(w);
        const blockIndex = getBlockIndex(w);
        const weekInBlock = ((w - 1) % 4) + 1;
        const ramp = weekRampInBlock(weekInBlock);
        const weekTargets = targetsForWeek(w);
        if (!blockPlans[blockIndex]) {
            blockPlans[blockIndex] = {};
            // Choose stable exercise menus for this block using Week 1 targets.
            const wk1Targets = targetsForWeek(blockIndex * 4 + 1);
            const timeCapMin = parseInt(config.time || '') || null;
            // Keep a shared week-level used set while building the block menu.
            // This prevents duplicated days (e.g., UpperA and UpperB) from becoming identical.
            const weekUsedIds = new Set();
            for (let d = 0; d < daysNum; d++) {
                const dayType = split[d];
                blockPlans[blockIndex][d] = buildDayExerciseList(dayType, wk1Targets, weekRampInBlock(1), timeCapMin, 'Base', weekUsedIds);
            }
        }
        const workouts = [];
        for (let d = 0; d < daysNum; d++) {
            const dayType = split[d];
            const dayIntent = (programType === 'Powerbuilding') ? (String(dayType).includes('A') ? 'strength' : (String(dayType).includes('B') ? 'hypertrophy' : 'mixed'))
                : (programType === 'Strength' ? 'strength' : (programType === 'Hypertrophy' ? 'hypertrophy' : (programType === 'Minimalist' ? 'minimal' : 'mixed')));
            // Copy block menu and re-apply week ramp to set counts
            const baseList = blockPlans[blockIndex][d] || [];
            const exercises = baseList.map((ex, idx) => {
                const exType = ex.type;
                const role = ex.role;
                const reps = getRepRange(programType, exType, idx === 0 ? 0 : 1, role, phase.phase, dayIntent);
                const sets = defaultSetsForRole(role, exType, ramp, dayIntent);
                const rir = getRIR(experience, exType, 1, sets, programType, role, phase.phase, dayIntent);
                const rest = getRest(reps[0], exType, programType);
                return {
                    ...ex,
                    reps,
                    sets,
                    rir,
                    rest,
                    weight: null,
                    _warmupContext: { programType, phaseName: phase.phase, dayIntent, experience }
                };
            });
            // Apply supersets if enabled (only non-main lifts)
            let finalExercises = config.supersets ? applySupersets(exercises, programType) : exercises;
            // Apply advanced techniques if enabled (safe accessory work only)
            finalExercises = applyAdvancedTechniques(finalExercises, config, phase.phase, dayIntent);
            // Suggest loads for main/secondary compound lifts with 1RM if provided
            finalExercises.forEach((ex) => {
                if (!ex)
                    return;
                const oneRM = getOneRMForExercise(ex, oneRMs);
                const isMainish = (ex.role === 'main' || ex.role === 'secondary');
                const isCompound = ex.type === 'compound';
                if (oneRM && isMainish && isCompound) {
                    ex.weight = calcMainLiftWeight(parseFloat(oneRM), ex.reps, ex.rir, experience, programType, ex.role, phase);
                }
            });
            // Build warm-up sets for each exercise (display + time estimation)
            finalExercises.forEach((ex) => {
                if (!ex)
                    return;
                ex.warmups = buildWarmupSets(ex, programType, phase.phase, dayIntent, experience, config.warmups);
            });
            workouts.push({ dayNumber: d + 1, dayType, exercises: finalExercises });
        }
        weeks.push({
            number: w,
            phase: phase.phase,
            deload: ramp.deload || phase.isDeload,
            workouts
        });
    }
    return { weeks, config, createdAt: new Date().toISOString(), generator: 'bulletproof_v3' };
}
// ==================== PROFILE-LINK (MULTI-USER) STORAGE ====================
// 100% client-side, 100% free: we namespace localStorage by a profileId in the URL hash.
// Link format:  #/u/<profileId>  (users can share/bookmark this to keep a distinct profile)
const PROFILE_HASH_RE = /#\/u\/([^/]+)/;
function getProfileIdFromHash() {
    const hash = window.location.hash || "";
    const m = hash.match(PROFILE_HASH_RE);
    return m && m[1] ? decodeURIComponent(m[1]) : "";
}
function setHashToProfile(profileId) {
    // Preserve any existing trailing path after the profile segment if present.
    // Even though this app doesn't route by hash, this keeps links future-proof.
    const hash = window.location.hash || "";
    const rest = hash.replace(PROFILE_HASH_RE, "").replace(/^#/, "");
    const suffix = rest && rest.startsWith("/") ? rest : (rest ? "/" + rest : "");
    window.location.hash = `#/u/${encodeURIComponent(profileId)}${suffix}`;
}
function ensureProfileId() {
    let pid = getProfileIdFromHash();
    if (!pid) {
        pid = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2);
        setHashToProfile(pid);
    }
    return pid;
}
function storageKey(k) {
    const pid = ensureProfileId();
    return `trainiq:${pid}:${k}`;
}
const storage = {
    get(k, fallback) {
        try {
            const raw = localStorage.getItem(storageKey(k));
            if (!raw)
                return fallback;
            return JSON.parse(raw);
        }
        catch (e) {
            return fallback;
        }
    },
    set(k, value) {
        try {
            localStorage.setItem(storageKey(k), JSON.stringify(value));
        }
        catch (e) { }
    },
    remove(k) {
        try {
            localStorage.removeItem(storageKey(k));
        }
        catch (e) { }
    },
    clearProfile() {
        const pid = ensureProfileId();
        const prefix = `trainiq:${pid}:`;
        const toRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix))
                toRemove.push(key);
        }
        toRemove.forEach(k => localStorage.removeItem(k));
    }
};
// One-time migration: if a user has legacy single-profile data, move it into the current profile.
(function migrateLegacyStorage() {
    const legacyKey = "trainiq-pro";
    const newKey = storageKey("state");
    try {
        const hasNew = localStorage.getItem(newKey);
        const legacy = localStorage.getItem(legacyKey);
        if (!hasNew && legacy) {
            localStorage.setItem(newKey, legacy);
        }
    }
    catch (e) { }
})();
// ==================== MAIN APP ====================
function TrainIQ() {
    const [tab, setTab] = useState('home');
    const DEFAULT_CONFIG = {
        experience: '',
        days: '',
        time: '',
        programType: '',
        supersets: false,
        advancedTechniques: false,
        oneRMs: { chest: '', lats: '', shoulders: '', quads: '', hamstrings: '' },
        // Warm-up preferences
        warmups: {
            enabled: true,
            mode: 'full', // 'minimal' | 'full'
            onlyCompounds: false
        }
    };
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [program, setProgram] = useState(null);
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const saved = storage.get('state', null);
        if (saved) {
            const data = saved;
            if (data.config) {
                // Merge defaults to support older saved profiles
                const merged = {
                    ...DEFAULT_CONFIG,
                    ...data.config,
                    oneRMs: { ...DEFAULT_CONFIG.oneRMs, ...(data.config.oneRMs || {}) },
                    warmups: { ...DEFAULT_CONFIG.warmups, ...(data.config.warmups || {}) }
                };
                setConfig(merged);
            }
            if (data.program)
                setProgram(data.program);
            if (data.history)
                setHistory(data.history);
        }
    }, []);
    useEffect(() => {
        storage.set('state', { config, program, history });
    }, [config, program, history]);
    const handleGenerate = () => {
        if (program) {
            setHistory(prev => [program, ...prev].slice(0, 10));
        }
        const newProgram = generateProgram(config);
        setProgram(newProgram);
        setTab('workouts');
    };
    return (React.createElement("div", { className: "min-h-screen app-bg" },
        tab === 'home' && (React.createElement(HomeScreen, { config: config, setConfig: setConfig, onGenerate: handleGenerate })),
        tab === 'workouts' && program && (React.createElement(WorkoutsScreen, { program: program, config: config, setProgram: setProgram, onSave: () => {
                if (program && !history.find(p => p.createdAt === program.createdAt)) {
                    setHistory(prev => [program, ...prev].slice(0, 10));
                }
            } })),
        tab === 'history' && (React.createElement(HistoryScreen, { history: history, onDelete: (idx) => setHistory(prev => prev.filter((_, i) => i !== idx)) })),
        tab === 'settings' && (React.createElement(SettingsScreen, { config: config, setConfig: setConfig })),
        React.createElement(TabBar, { tab: tab, setTab: setTab, hasProgram: !!program })));
}
// ==================== HOME SCREEN ====================
function HomeScreen({ config, setConfig, onGenerate }) {
    const isValid = config.experience && config.days && config.time && config.programType;
    return (React.createElement("div", { className: "content-with-tabs px-4 pt-8 pb-32 max-w-2xl mx-auto" },
        React.createElement("div", { className: "text-center mb-10" },
            React.createElement("div", { className: "w-20 h-20 mx-auto mb-4 rounded-2xl ring-premium overflow-hidden" },
                React.createElement("img", { src: "logo.jpg", alt: "TrainIQ", className: "w-full h-full object-cover" })),
            React.createElement("h1", { className: "font-display text-5xl font-bold mb-1 premium-gradient bg-clip-text text-transparent" }, "TRAINIQ"),
            React.createElement("p", { className: "text-gray-500 text-xs font-semibold tracking-wider" }, "EVIDENCE-BASED TRAINING")),
        React.createElement("div", { className: "mb-6 rounded-2xl overflow-hidden ring-premium" },
            React.createElement("div", { className: "relative" },
                React.createElement("img", { src: "hero.jpg", alt: "TrainIQ Hero", className: "w-full h-44 object-cover" }),
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" }),
                React.createElement("div", { className: "absolute bottom-3 left-4 right-4" },
                    React.createElement("div", { className: "flex items-end justify-between gap-3" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-xs font-bold tracking-wider text-gray-300" }, "PREMIUM PROGRAMMING"),
                            React.createElement("div", { className: "text-lg font-semibold" }, "Built for progression, not randomness.")),
                        React.createElement("div", { className: "hidden sm:flex items-center gap-2" },
                            React.createElement("div", { className: "px-3 py-1 rounded-full glass text-[11px] font-bold tracking-wider text-gray-200" }, "RIR"),
                            React.createElement("div", { className: "px-3 py-1 rounded-full glass text-[11px] font-bold tracking-wider text-gray-200" }, "DELoads"),
                            React.createElement("div", { className: "px-3 py-1 rounded-full glass text-[11px] font-bold tracking-wider text-gray-200" }, "PERIODIZATION")))))),
        React.createElement("div", { className: "space-y-5" },
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-bold text-gray-400 mb-2 tracking-wide flex items-center gap-2" },
                    "EXPERIENCE LEVEL",
                    React.createElement("button", { type: "button", className: "text-gray-400 hover:text-white text-sm", onClick: () => alert("Beginner: New to structured training, focus on technique and consistency.\n\n" +
                            "Intermediate: 6–24 months of training with solid form and progressive overload.\n\n" +
                            "Advanced: 2+ years of consistent training, high intensity and volume tolerance.") }, "\u2139\uFE0F")),
                React.createElement("div", { className: "grid grid-cols-3 gap-2" }, ['Beginner', 'Intermediate', 'Advanced'].map(lvl => (React.createElement("button", { key: lvl, onClick: () => setConfig({ ...config, experience: lvl }), className: "p-3 rounded-xl font-semibold text-sm transition btn-touch " +
                        (config.experience === lvl ? "premium-gradient text-white shadow-lg" : "glass text-gray-300") }, lvl))))),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-bold text-gray-400 mb-2 tracking-wide" }, "TRAINING DAYS"),
                React.createElement("div", { className: "grid grid-cols-4 gap-2" }, ['3', '4', '5', '6'].map(d => (React.createElement("button", { key: d, onClick: () => setConfig({ ...config, days: d }), className: "p-4 rounded-xl font-bold text-2xl transition btn-touch " +
                        (config.days === d ? "premium-gradient text-white shadow-lg" : "glass text-gray-300") }, d))))),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-bold text-gray-400 mb-2 tracking-wide" }, "SESSION LENGTH"),
                React.createElement("div", { className: "grid grid-cols-3 gap-2" }, ['45min', '60min', '75min'].map(t => (React.createElement("button", { key: t, onClick: () => setConfig({ ...config, time: t }), className: "p-3 rounded-xl font-semibold transition btn-touch " +
                        (config.time === t ? "premium-gradient text-white shadow-lg" : "glass text-gray-300") }, t))))),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-bold text-gray-400 mb-2 tracking-wide" }, "PROGRAM TYPE"),
                React.createElement("div", { className: "relative" },
                    React.createElement("select", { value: config.programType, onChange: (e) => setConfig({ ...config, programType: e.target.value }), className: "w-full p-4 pr-12 rounded-xl glass bg-black/40 text-white font-semibold border border-white/10 outline-none focus:ring-2 focus:ring-orange-500 appearance-none" },
                        React.createElement("option", { value: "", style: { backgroundColor: '#0b0b0b', color: '#ffffff' } }, "Select Program Type"),
                        React.createElement("option", { value: "Hypertrophy", style: { backgroundColor: '#0b0b0b', color: '#ffffff' } }, "Hypertrophy"),
                        React.createElement("option", { value: "Strength", style: { backgroundColor: '#0b0b0b', color: '#ffffff' } }, "Strength"),
                        React.createElement("option", { value: "Powerbuilding", style: { backgroundColor: '#0b0b0b', color: '#ffffff' } }, "Powerbuilding"),
                        React.createElement("option", { value: "Minimalist", style: { backgroundColor: '#0b0b0b', color: '#ffffff' } }, "Minimalist")),
                    React.createElement("div", { className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" },
                        React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
                            React.createElement("path", { d: "m6 9 6 6 6-6" }))))),
            React.createElement("div", { className: "flex items-center justify-between p-4 rounded-xl glass" },
                React.createElement("span", { className: "font-semibold text-sm" }, "SUPERSETS"),
                React.createElement("button", { onClick: () => setConfig({ ...config, supersets: !config.supersets }), className: "w-14 h-8 rounded-full transition " + (config.supersets ? "bg-orange-500" : "bg-gray-700") },
                    React.createElement("div", { className: "w-6 h-6 rounded-full bg-white transition-transform " + (config.supersets ? "translate-x-7" : "translate-x-1") }))),
            React.createElement("div", { className: "flex items-center justify-between p-4 rounded-xl glass mt-3" },
                React.createElement("div", null,
                    React.createElement("div", { className: "font-semibold text-sm" }, "ADVANCED TECHNIQUES"),
                    React.createElement("div", { className: "text-xs text-gray-400 mt-0.5" }, "Enable drop sets, rest-pause, myo-reps and more (applied to safe accessory work).")),
                React.createElement("button", { onClick: onGenerate, disabled: !isValid, className: "w-full p-5 rounded-xl font-display font-bold text-lg transition btn-touch " +
                        (isValid ? "premium-gradient text-white shadow-xl" : "glass text-gray-600 cursor-not-allowed") }, "GENERATE PROGRAM"))),
        React.createElement("button", { onClick: () => setConfig({ ...config, advancedTechniques: !config.advancedTechniques }), className: "w-14 h-8 rounded-full transition " + (config.advancedTechniques ? "bg-orange-500" : "bg-gray-700"), "aria-label": "Toggle advanced training techniques" },
            React.createElement("div", { className: "w-6 h-6 rounded-full bg-white transition-transform " + (config.advancedTechniques ? "translate-x-7" : "translate-x-1"), style: { marginTop: '4px' } }))));
}
// ==================== WORKOUTS SCREEN ====================
function WorkoutsScreen({ program, config, setProgram, onSave }) {
    const [week, setWeek] = useState(1);
    const currentWeek = program.weeks[week - 1];
    // Persist per-workout edits (swap / delete / set +/-) back into the program
    // so SAVE/History reflect the customized version.
    const updateWorkoutExercises = (workoutIndex, nextExercises) => {
        if (typeof setProgram !== 'function')
            return;
        setProgram(prev => {
            if (!prev || !Array.isArray(prev.weeks) || !prev.weeks[week - 1])
                return prev;
            const weeks = prev.weeks.slice();
            const weekObj = { ...weeks[week - 1] };
            const workouts = (weekObj.workouts || []).slice();
            const current = workouts[workoutIndex];
            if (!current)
                return prev;
            // Deep-ish clone exercises to avoid shared references
            const safeExercises = Array.isArray(nextExercises)
                ? nextExercises.map(e => (e ? { ...e } : e))
                : [];
            workouts[workoutIndex] = { ...current, exercises: safeExercises };
            weekObj.workouts = workouts;
            weeks[week - 1] = weekObj;
            return { ...prev, weeks };
        });
    };
    return (React.createElement("div", { className: "content-with-tabs" },
        React.createElement("div", { className: "sticky top-0 bg-black/95 backdrop-blur-lg border-b border-white/10 pb-3 z-10" },
            React.createElement("div", { className: "px-4 pt-4" },
                React.createElement("div", { className: "flex items-center justify-between mb-3" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "font-display font-bold text-lg" },
                            "WEEK ",
                            week,
                            " OF 12"),
                        React.createElement("p", { className: "text-xs text-gray-400 mt-0.5" },
                            currentWeek.phase,
                            " Phase")),
                    React.createElement("button", { onClick: onSave, className: "px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-bold" }, "SAVE")),
                React.createElement("div", { className: "flex gap-2 overflow-x-auto pb-2" }, program.weeks.map(w => (React.createElement("button", { key: w.number, onClick: () => setWeek(w.number), className: "px-3 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition " +
                        (week === w.number ? "premium-gradient text-white" :
                            w.deload ? "bg-yellow-500/20 text-yellow-400" : "glass text-gray-400") }, w.deload ? `W${w.number} ↓` : `W${w.number}`)))))),
        React.createElement("div", { className: "px-4 py-4 space-y-3" }, currentWeek.workouts.map((workout, i) => (
        // IMPORTANT: use a stable key so WorkoutCard state doesn't bleed across week/day changes.
        React.createElement(WorkoutCard, { key: `${week}-${workout.dayNumber}`, workout: workout, warmupPrefs: config === null || config === void 0 ? void 0 : config.warmups, onUpdateExercises: (next) => updateWorkoutExercises(i, next) }))))));
}
// ==================== WORKOUT CARD ====================
function WorkoutCard({ workout, warmupPrefs, onUpdateExercises }) {
    const [open, setOpen] = useState(false);
    // Keep a local copy so swaps don't mutate the generated program state.
    // IMPORTANT: this must resync whenever "workout" changes (week switch, regen, etc.)
    // or else the "Change" button will only work for the first rendered card due to stale state.
    const [exercises, setExercises] = useState(() => (workout.exercises || []).map(ex => ({ ...ex })));
    const [swapState, setSwapState] = useState({ open: false, index: null, options: [], title: '', anchor: null });
    const [techModal, setTechModal] = useState({ open: false, technique: null });
    const openTechnique = (technique) => setTechModal({ open: true, technique });
    const closeTechnique = () => setTechModal({ open: false, technique: null });
    useEffect(() => {
        setExercises((workout.exercises || []).map(ex => ({ ...ex })));
        // Close any open chooser when switching workouts to avoid index mismatch.
        setSwapState({ open: false, index: null, options: [], title: '', anchor: null });
    }, [workout]);
    const openSwap = (ex, index, evt) => {
        var _a, _b;
        const opts = getAlternativesForExercise(ex.originalName || ex.name, { role: ex.role || 'accessory' });
        // Anchor the chooser close to the clicked button so users don't have to scroll.
        let anchor = null;
        try {
            const rect = (_b = (_a = evt === null || evt === void 0 ? void 0 : evt.currentTarget) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect) === null || _b === void 0 ? void 0 : _b.call(_a);
            if (rect) {
                anchor = { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
            }
        }
        catch (e) {
            anchor = null;
        }
        setSwapState({
            open: true,
            index,
            options: opts,
            title: ex.originalName ? `${ex.name} (alt)` : ex.name,
            anchor
        });
    };
    const recomputeWarmups = (ex) => {
        try {
            const ctx = ex === null || ex === void 0 ? void 0 : ex._warmupContext;
            if (ctx) {
                return buildWarmupSets(ex, ctx.programType, ctx.phaseName, ctx.dayIntent, ctx.experience, warmupPrefs);
            }
        }
        catch (e) { }
        // Fallback: keep existing warmups if context missing
        return Array.isArray(ex === null || ex === void 0 ? void 0 : ex.warmups) ? ex.warmups : [];
    };
    const commit = (out) => {
        if (typeof onUpdateExercises === 'function')
            onUpdateExercises(out);
        return out;
    };
    const applySwap = (chosen) => {
        setExercises(prev => {
            if (!Array.isArray(prev))
                return prev;
            const idx = swapState.index;
            if (idx === null || idx === undefined || !prev[idx])
                return prev;
            const current = prev[idx];
            const originalName = current.originalName || current.name;
            const updated = {
                ...current,
                name: chosen.name,
                originalName,
                // Keep stimulus tags available for future features
                tags: getExerciseTags(chosen.name) || current.tags || null
            };
            updated.warmups = recomputeWarmups(updated);
            const out = prev.slice();
            out[idx] = updated;
            return commit(out);
        });
        setSwapState({ open: false, index: null, options: [], title: '', anchor: null });
    };
    const closeSwap = () => setSwapState({ open: false, index: null, options: [], title: '', anchor: null });
    const deleteExercise = (index) => {
        setExercises(prev => {
            if (!Array.isArray(prev) || !prev[index])
                return prev;
            const target = prev[index];
            // If part of a superset, handle partner cleanup.
            if (target.superset && target.superset.group) {
                const group = target.superset.group;
                const pos = target.superset.position;
                const out = prev.slice();
                if (pos === 1) {
                    // Delete partner too if it exists as the next exercise or anywhere in list.
                    // (Keeps UI clean; avoids orphaned A2.)
                    const partnerIdx = out.findIndex((e, i) => { var _a; return i !== index && ((_a = e === null || e === void 0 ? void 0 : e.superset) === null || _a === void 0 ? void 0 : _a.group) === group; });
                    // Remove higher index first to avoid shifting
                    const toRemove = [index];
                    if (partnerIdx >= 0)
                        toRemove.push(partnerIdx);
                    toRemove.sort((a, b) => b - a).forEach(i => out.splice(i, 1));
                    return commit(out);
                }
                // If deleting the A2, keep A1 but strip its superset metadata.
                out.splice(index, 1);
                const leaderIdx = out.findIndex(e => { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.superset) === null || _a === void 0 ? void 0 : _a.group) === group; });
                if (leaderIdx >= 0) {
                    out[leaderIdx] = { ...out[leaderIdx], superset: null };
                }
                return commit(out);
            }
            // Normal deletion
            const out = prev.slice();
            out.splice(index, 1);
            return commit(out);
        });
    };
    const adjustSets = (index, delta) => {
        setExercises(prev => {
            if (!Array.isArray(prev) || !prev[index])
                return prev;
            const ex = prev[index];
            // Main/secondary: keep at least 1 set; accessories: at least 1 set.
            const next = Math.max(1, Math.min(10, (parseInt(ex.sets, 10) || 1) + delta));
            const out = prev.slice();
            const updated = { ...ex, sets: next };
            updated.warmups = recomputeWarmups(updated);
            out[index] = updated;
            return commit(out);
        });
    };
    return (React.createElement("div", { className: "glass rounded-xl overflow-hidden" },
        React.createElement("button", { onClick: () => setOpen(!open), className: "w-full p-4 flex items-center justify-between hover:bg-white/5 transition btn-touch" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "w-12 h-12 rounded-lg premium-gradient flex items-center justify-center font-display font-bold text-sm" },
                    "D",
                    workout.dayNumber),
                React.createElement("div", { className: "text-left" },
                    React.createElement("h3", { className: "font-bold text-sm" },
                        workout.dayType,
                        " Day"),
                    React.createElement("p", { className: "text-xs text-gray-400" },
                        exercises.length,
                        " exercises"))),
            React.createElement("span", { className: "transition text-orange-400 " + (open ? "rotate-180" : "") }, "\u25BC")),
        open && (React.createElement("div", { className: "px-4 pb-4 space-y-2" }, (() => {
            const roleLabel = (role) => {
                if (role === 'main')
                    return { text: 'MAIN LIFT', cls: 'bg-orange-500/20 text-orange-300' };
                if (role === 'secondary')
                    return { text: 'SECONDARY LIFT', cls: 'bg-blue-500/20 text-blue-300' };
                return { text: 'ACCESSORY', cls: 'bg-gray-500/20 text-gray-300' };
            };
            const ExerciseCard = ({ ex, index, showRest = true, ssOrder = null, canSwap = true }) => {
                const role = roleLabel(ex.role);
                return (React.createElement("div", { className: "p-3 rounded-lg bg-black/50 border border-white/5" },
                    React.createElement("div", { className: "flex items-start justify-between gap-2 mb-2" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                                React.createElement("h4", { className: "font-semibold text-sm" }, ex.name),
                                canSwap && (React.createElement("button", { onClick: (e) => openSwap(ex, index, e), className: (ex.role === 'main' || ex.role === 'secondary'
                                        ? 'text-orange-200 border-orange-500/35 hover:bg-orange-500/10 '
                                        : 'text-gray-200 border-white/15 hover:bg-white/10 ') +
                                        'px-2 py-1 rounded-md border bg-white/5 text-[11px] font-bold btn-touch', title: "Choose a similar alternate exercise" }, "Change")),
                                React.createElement("div", { className: "flex items-center gap-1" },
                                    React.createElement("button", { type: "button", onClick: (e) => { e.preventDefault(); e.stopPropagation(); adjustSets(index, -1); }, className: "px-2 py-1 rounded-md border border-white/15 bg-white/5 text-[11px] font-bold text-gray-200 hover:bg-white/10 btn-touch", title: "Remove 1 set" }, "\u2212 Set"),
                                    React.createElement("button", { type: "button", onClick: (e) => { e.preventDefault(); e.stopPropagation(); adjustSets(index, +1); }, className: "px-2 py-1 rounded-md border border-white/15 bg-white/5 text-[11px] font-bold text-gray-200 hover:bg-white/10 btn-touch", title: "Add 1 set" }, "+ Set"),
                                    React.createElement("button", { type: "button", onClick: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (confirm(`Delete “${ex.name}” from this workout?`))
                                                deleteExercise(index);
                                        }, className: "px-2 py-1 rounded-md border border-red-500/25 bg-red-500/10 text-[11px] font-bold text-red-300 hover:bg-red-500/20 btn-touch", title: "Delete exercise" }, "Delete"))),
                            ex.originalName && (React.createElement("div", { className: "text-[11px] text-gray-500 mt-0.5" },
                                "Original: ",
                                React.createElement("span", { className: "text-gray-300 font-semibold" }, ex.originalName)))),
                        React.createElement("div", { className: "flex items-center gap-1.5" },
                            ssOrder && (React.createElement("span", { className: "px-2 py-1 bg-purple-500/25 text-purple-200 rounded font-bold text-[11px]" }, ssOrder)),
                            React.createElement("span", { className: `px-2 py-1 rounded font-bold text-[11px] ${role.cls}` }, role.text))),
                    React.createElement("div", { className: "flex flex-wrap gap-1.5 text-xs mb-3" },
                        React.createElement("span", { className: "px-2 py-1 bg-orange-500/20 text-orange-400 rounded font-bold" },
                            React.createElement("span", { className: "opacity-75 font-extrabold tracking-wider mr-1" }, "SETS"),
                            ex.sets,
                            " \u00D7 ",
                            ex.reps[0],
                            "-",
                            ex.reps[1]),
                        showRest && (React.createElement("span", { className: "px-2 py-1 bg-purple-500/20 text-purple-400 rounded font-bold" },
                            React.createElement("span", { className: "opacity-75 font-extrabold tracking-wider mr-1" }, "REST"),
                            ex.rest)),
                        React.createElement("span", { className: "px-2 py-1 bg-red-500/20 text-red-400 rounded font-bold" },
                            React.createElement("span", { className: "opacity-75 font-extrabold tracking-wider mr-1" }, "EFFORT"),
                            ex.rir,
                            " RIR"),
                        ex.technique && (React.createElement("button", { type: "button", onClick: (e) => { e.preventDefault(); e.stopPropagation(); openTechnique(ex.technique); }, className: "px-2 py-1 bg-emerald-500/15 text-emerald-300 rounded font-bold border border-emerald-500/20 hover:bg-emerald-500/20", title: "View technique instructions" },
                            React.createElement("span", { className: "opacity-75 font-extrabold tracking-wider mr-1" }, "TECH"),
                            ex.technique.name))),
                    React.createElement("div", { className: "text-[11px] text-gray-500 mb-3 -mt-1" },
                        "Target effort: finish each set with about ",
                        React.createElement("span", { className: "font-bold text-gray-300" }, ex.rir),
                        " reps in reserve (RIR)."),
                    Array.isArray(ex.warmups) && ex.warmups.length > 0 && (React.createElement("div", { className: "mb-3" },
                        React.createElement("div", { className: "text-xs font-extrabold tracking-wider text-gray-400 mb-1" }, "WARM-UP SETS"),
                        React.createElement("div", { className: "space-y-1" }, ex.warmups.map((ws, i) => (React.createElement("div", { key: i, className: "flex items-center gap-2 p-2 rounded bg-black/20" },
                            React.createElement("span", { className: "text-xs font-bold text-gray-500 w-12" },
                                "WU ",
                                i + 1),
                            React.createElement("span", { className: "text-xs font-bold text-gray-200 w-16" },
                                ws.reps,
                                " reps"),
                            ws.pct != null ? (React.createElement("span", { className: "text-xs text-gray-400" },
                                "~",
                                ws.pct,
                                "%")) : (React.createElement("span", { className: "text-xs text-gray-400" }, ws.note || 'easy')),
                            ws.weight && React.createElement("span", { className: "text-xs font-extrabold text-green-400 ml-auto" },
                                "~",
                                ws.weight))))))),
                    React.createElement("div", { className: "space-y-2" }, Array.from({ length: ex.sets }).map((_, setIdx) => (React.createElement("div", { key: setIdx, className: "flex items-center gap-2 p-2 rounded bg-black/30" },
                        React.createElement("span", { className: "text-xs font-bold text-gray-500 w-12" },
                            "Set ",
                            setIdx + 1),
                        React.createElement("div", { className: "flex flex-col items-center w-20 sm:w-24" },
                            ex.weight && React.createElement("div", { className: "text-[10px] font-bold text-green-400 -mb-1" },
                                "~",
                                ex.weight),
                            React.createElement("input", { type: "number", placeholder: "lbs", className: "w-full p-2 rounded bg-black/50 border border-white/10 text-white text-sm text-center outline-none focus:border-orange-500" })),
                        React.createElement("span", { className: "text-xs text-gray-600" }, "\u00D7"),
                        React.createElement("input", { type: "number", placeholder: "reps", className: "w-20 sm:w-24 p-2 rounded bg-black/50 border border-white/10 text-white text-sm text-center outline-none focus:border-orange-500" }),
                        React.createElement("input", { type: "number", placeholder: "RIR", min: "0", max: "6", className: "w-16 p-2 rounded bg-black/50 border border-white/10 text-white text-sm text-center outline-none focus:border-orange-500" })))))));
            };
            const items = [];
            const exs = exercises || [];
            for (let i = 0; i < exs.length; i++) {
                const ex = exs[i];
                if (!ex)
                    continue;
                // Skip A2 entries; they render inside the Superset group.
                if (ex.superset && ex.superset.position === 2)
                    continue;
                if (ex.superset && ex.superset.position === 1) {
                    const group = ex.superset.group;
                    const partner = exs[i + 1];
                    const hasPartner = partner && partner.superset && partner.superset.group === group;
                    const between = ex.superset.betweenRest || '0-30s';
                    const post = ex.superset.postRest || '60-120s';
                    items.push(React.createElement("div", { key: `ss-${group}-${i}`, className: "p-3 rounded-xl bg-black/40 border border-white/10" },
                        React.createElement("div", { className: "flex flex-col gap-1 mb-2" },
                            React.createElement("div", { className: "flex items-center justify-between gap-2" },
                                React.createElement("div", { className: "text-xs font-bold tracking-widest text-purple-200" },
                                    "SUPERSET ",
                                    group),
                                React.createElement("span", { className: "px-2 py-1 bg-purple-500/20 text-purple-300 rounded font-bold text-[11px]" },
                                    "No rest (or ",
                                    between,
                                    ") between")),
                            hasPartner ? (React.createElement("div", { className: "text-xs text-gray-300" },
                                "Do ",
                                React.createElement("span", { className: "font-bold text-white" }, ex.name),
                                " \u2192 ",
                                React.createElement("span", { className: "font-bold text-white" }, partner.name),
                                ", then rest ",
                                React.createElement("span", { className: "font-bold text-white" }, post),
                                ".")) : (React.createElement("div", { className: "text-xs text-gray-400" }, "Superset enabled, but partner exercise not found for this group."))),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement(ExerciseCard, { key: `ex-${i}`, ex: ex, index: i, showRest: false, ssOrder: `${group}1` }),
                            hasPartner && React.createElement(ExerciseCard, { key: `ex-${i + 1}`, ex: partner, index: i + 1, showRest: false, ssOrder: `${group}2` })),
                        React.createElement("div", { className: "mt-2 text-xs text-gray-400" },
                            "Rest ",
                            React.createElement("span", { className: "font-bold text-gray-200" }, post),
                            " after completing both exercises.")));
                    continue;
                }
                // Normal (non-superset) exercise card.
                items.push(React.createElement(ExerciseCard, { key: `ex-${i}`, ex: ex, index: i, showRest: true }));
            }
            return items;
        })())),
        swapState.open && (() => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const isMobile = (typeof window !== 'undefined') ? window.innerWidth < 640 : true;
            const vh = (typeof window !== 'undefined') ? window.innerHeight : 800;
            const vw = (typeof window !== 'undefined') ? window.innerWidth : 1200;
            const anchorTop = (_b = (_a = swapState.anchor) === null || _a === void 0 ? void 0 : _a.top) !== null && _b !== void 0 ? _b : 80;
            const anchorBottom = (_d = (_c = swapState.anchor) === null || _c === void 0 ? void 0 : _c.bottom) !== null && _d !== void 0 ? _d : 100;
            const anchorLeft = (_f = (_e = swapState.anchor) === null || _e === void 0 ? void 0 : _e.left) !== null && _f !== void 0 ? _f : Math.round(vw / 2);
            const anchorRight = (_h = (_g = swapState.anchor) === null || _g === void 0 ? void 0 : _g.right) !== null && _h !== void 0 ? _h : Math.round(vw / 2);
            // Position the chooser beside the clicked "Change" button (within the viewport),
            // even for exercises further down the page.
            // Heuristic panel height: our max content height is ~55vh plus header/padding.
            const panelH = Math.min(Math.round(vh * 0.72), 560);
            const panelW = isMobile ? Math.min(vw - 24, 420) : 420;
            const margin = 12;
            const belowTop = anchorBottom + 10;
            const aboveTop = anchorTop - 10 - panelH;
            const hasRoomBelow = (belowTop + panelH) <= (vh - margin);
            const hasRoomAbove = aboveTop >= margin;
            const top = hasRoomBelow ? belowTop : (hasRoomAbove ? aboveTop : margin);
            // Horizontal positioning:
            // - Mobile: keep centered.
            // - Desktop: try to place next to the clicked button; fall back to centered.
            let leftPx = Math.round((vw - panelW) / 2);
            if (!isMobile) {
                const rightCandidate = anchorRight + 10;
                const leftCandidate = anchorLeft - 10 - panelW;
                const canPlaceRight = (rightCandidate + panelW) <= (vw - margin);
                const canPlaceLeft = leftCandidate >= margin;
                if (canPlaceRight)
                    leftPx = rightCandidate;
                else if (canPlaceLeft)
                    leftPx = leftCandidate;
            }
            return (React.createElement("div", { className: "fixed inset-0 z-[60]" },
                React.createElement("button", { className: "absolute inset-0 bg-black/70", onClick: closeSwap, "aria-label": "Close" }),
                React.createElement("div", { className: 
                    // Always fixed so the computed top is relative to the viewport.
                    (isMobile
                        ? 'fixed w-full max-w-md rounded-t-2xl border-t '
                        : 'fixed w-full max-w-md rounded-2xl border ') +
                        'glass border-white/10 p-4 pb-6', style: isMobile
                        ? { top: top + 'px', left: '50%', transform: 'translateX(-50%)' }
                        : { top: top + 'px', left: leftPx + 'px', transform: 'none' } },
                    React.createElement("div", { className: "flex items-start justify-between gap-3 mb-3" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "font-display text-sm tracking-widest text-gray-300" }, "ALTERNATE EXERCISES"),
                            React.createElement("div", { className: "text-sm font-semibold mt-1" }, swapState.title),
                            React.createElement("div", { className: "text-xs text-gray-400 mt-1" }, "Similar stimulus \u2022 Same muscle focus")),
                        React.createElement("button", { onClick: closeSwap, className: "px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold btn-touch" }, "Close")),
                    swapState.options.length === 0 ? (React.createElement("div", { className: "p-3 rounded-lg bg-black/40 border border-white/10 text-sm text-gray-300" }, "No close matches found in the database for this exercise.")) : (React.createElement("div", { className: "space-y-2 max-h-[55vh] overflow-y-auto pr-1" }, swapState.options.map((opt) => (React.createElement("button", { key: opt.id, onClick: () => applySwap(opt), className: "w-full text-left p-3 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 btn-touch" },
                        React.createElement("div", { className: "flex items-center justify-between gap-2" },
                            React.createElement("div", { className: "font-semibold text-sm" }, opt.name),
                            React.createElement("span", { className: "px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-bold text-gray-200" }, String(opt.equipment || '').toUpperCase())),
                        React.createElement("div", { className: "text-xs text-gray-400 mt-1" },
                            opt.pattern.replace('_', ' '),
                            " \u2022 ",
                            opt.primeMover,
                            " \u2022 ",
                            opt.type)))))),
                    React.createElement("div", { className: "mt-4 text-[11px] text-gray-500" }, "Substitutions preserve movement pattern, prime mover, and exercise type to keep programming evidence-based."))));
        })(),
        techModal.open && techModal.technique && (React.createElement("div", { className: "fixed inset-0 z-[70]" },
            React.createElement("button", { className: "absolute inset-0 bg-black/70", onClick: closeTechnique, "aria-label": "Close technique" }),
            React.createElement("div", { className: "fixed left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl glass border border-white/15 p-4" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-[11px] tracking-widest text-emerald-300 font-extrabold" }, "TECHNIQUE"),
                        React.createElement("div", { className: "text-xl font-bold mt-0.5" }, techModal.technique.name)),
                    React.createElement("button", { onClick: closeTechnique, className: "w-10 h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/80" }, "\u2715")),
                React.createElement("div", { className: "text-sm text-gray-200/90 mt-3 leading-relaxed" }, techModal.technique.description),
                React.createElement("div", { className: "mt-3 p-3 rounded-xl bg-black/40 border border-white/10" },
                    React.createElement("div", { className: "text-[11px] text-gray-400 font-bold tracking-widest" }, "HOW TO APPLY"),
                    React.createElement("div", { className: "text-sm text-gray-200 mt-1" }, techModal.technique.howToApply)),
                React.createElement("div", { className: "mt-3 flex items-center justify-between" },
                    React.createElement("span", { className: "px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300" }, String(techModal.technique.level || 'Advanced').toUpperCase()),
                    React.createElement("button", { onClick: closeTechnique, className: "px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 text-sm font-bold" }, "Got it")))))));
}
// ==================== HISTORY SCREEN ====================
function HistoryScreen({ history, onDelete }) {
    if (history.length === 0) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center content-with-tabs px-4" },
            React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "w-20 h-20 mx-auto mb-4 rounded-2xl glass flex items-center justify-center" },
                    React.createElement("span", { className: "text-4xl" }, "\uD83D\uDCDC")),
                React.createElement("h3", { className: "text-xl font-display font-bold text-gray-400 mb-2" }, "NO HISTORY"),
                React.createElement("p", { className: "text-gray-500 text-sm" }, "Saved programs appear here"))));
    }
    return (React.createElement("div", { className: "content-with-tabs px-4 py-6" },
        React.createElement("h2", { className: "text-2xl font-display font-bold mb-4" }, "HISTORY"),
        React.createElement("div", { className: "space-y-3" }, history.map((prog, idx) => (React.createElement("div", { key: idx, className: "p-4 rounded-xl glass" },
            React.createElement("div", { className: "flex justify-between items-start mb-2" },
                React.createElement("div", null,
                    React.createElement("h3", { className: "font-bold text-sm" }, prog.config.programType),
                    React.createElement("p", { className: "text-xs text-gray-400" }, new Date(prog.createdAt).toLocaleDateString())),
                React.createElement("button", { onClick: () => onDelete(idx), className: "text-red-400 text-xl" }, "\u00D7"))))))));
}
// ==================== PROFILE (SETTINGS) SCREEN ====================
function SettingsScreen({ config, setConfig }) {
    var _a, _b, _c, _d, _e;
    const [showProfileLinkInfo, setShowProfileLinkInfo] = React.useState(false);
    return (React.createElement("div", { className: "content-with-tabs px-4 py-6" },
        React.createElement("h2", { className: "text-2xl font-display font-bold mb-1" }, "PROFILE"),
        React.createElement("p", { className: "text-xs text-gray-500 mb-6" }, "Preferences & lifting numbers"),
        React.createElement("div", { className: "space-y-5" },
            React.createElement("div", { className: "p-5 rounded-2xl glass" },
                React.createElement("h3", { className: "font-bold mb-4 text-sm text-gray-400" }, "ONE-REP MAXES"),
                React.createElement("div", { className: "space-y-3" }, [
                    { key: 'chest', label: 'Bench Press' },
                    { key: 'shoulders', label: 'Shoulder Press' },
                    { key: 'lats', label: 'Pull-up' },
                    { key: 'quads', label: 'Squat' },
                    { key: 'hamstrings', label: 'Deadlift' }
                ].map(({ key, label }) => (React.createElement("div", { key: key, className: "flex justify-between items-center" },
                    React.createElement("span", { className: "text-sm" },
                        label,
                        ":"),
                    React.createElement("input", { type: "number", value: config.oneRMs[key], placeholder: "0", onChange: (e) => setConfig({ ...config, oneRMs: { ...config.oneRMs, [key]: e.target.value } }), className: "w-20 p-2 rounded bg-black/50 border border-white/10 text-white text-center outline-none focus:border-orange-500" })))))),
            React.createElement("div", { className: "p-5 rounded-2xl glass" },
                React.createElement("h3", { className: "font-bold mb-4 text-sm text-gray-400" }, "WARM-UP SETS"),
                React.createElement("div", { className: "space-y-4" },
                    React.createElement("div", { className: "flex items-center justify-between gap-3" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-sm font-semibold" }, "Enable warm-up sets"),
                            React.createElement("div", { className: "text-xs text-gray-500" }, "Show warm-up ramps before work sets.")),
                        React.createElement("input", { type: "checkbox", checked: !!((_a = config.warmups) === null || _a === void 0 ? void 0 : _a.enabled), onChange: (e) => setConfig({
                                ...config,
                                warmups: { ...(config.warmups || {}), enabled: e.target.checked }
                            }), className: "w-5 h-5 accent-orange-500" })),
                    React.createElement("div", { className: "flex items-center justify-between gap-3" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-sm font-semibold" }, "Warm-up style"),
                            React.createElement("div", { className: "text-xs text-gray-500" }, "Minimal = fewer sets. Full = complete ramp.")),
                        React.createElement("select", { value: ((_b = config.warmups) === null || _b === void 0 ? void 0 : _b.mode) || 'full', onChange: (e) => setConfig({
                                ...config,
                                warmups: { ...(config.warmups || {}), mode: e.target.value }
                            }), disabled: !((_c = config.warmups) === null || _c === void 0 ? void 0 : _c.enabled), className: "w-36 p-2 rounded bg-black/50 border border-white/10 text-white text-sm outline-none focus:border-orange-500 disabled:opacity-50" },
                            React.createElement("option", { value: "minimal" }, "Minimal"),
                            React.createElement("option", { value: "full" }, "Full"))),
                    React.createElement("div", { className: "flex items-center justify-between gap-3" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-sm font-semibold" }, "Compounds only"),
                            React.createElement("div", { className: "text-xs text-gray-500" }, "If on, isolation exercises won\u2019t show warm-ups.")),
                        React.createElement("input", { type: "checkbox", checked: !!((_d = config.warmups) === null || _d === void 0 ? void 0 : _d.onlyCompounds), onChange: (e) => setConfig({
                                ...config,
                                warmups: { ...(config.warmups || {}), onlyCompounds: e.target.checked }
                            }), disabled: !((_e = config.warmups) === null || _e === void 0 ? void 0 : _e.enabled), className: "w-5 h-5 accent-orange-500 disabled:opacity-50" })))),
            React.createElement("div", { className: "p-5 rounded-2xl glass" },
                React.createElement("div", { className: "flex items-center justify-between mb-2" },
                    React.createElement("h3", { className: "font-bold text-sm text-gray-400" }, "PROFILE LINK"),
                    React.createElement("button", { type: "button", "aria-label": "How to use your profile link", onClick: () => setShowProfileLinkInfo(true), className: "p-2 -m-2 rounded-lg text-gray-400 hover:text-white transition btn-touch" },
                        React.createElement("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                            React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
                            React.createElement("path", { d: "M12 16v-4" }),
                            React.createElement("path", { d: "M12 8h.01" })))),
                React.createElement("p", { className: "text-xs text-gray-500 mb-3" }, "Share this link to keep this profile separate on this device."),
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("input", { readOnly: true, value: (() => {
                            const pid = ensureProfileId();
                            const base = window.location.origin + window.location.pathname;
                            return `${base}#/u/${pid}`;
                        })(), className: "flex-1 p-2 rounded bg-black/50 border border-white/10 text-white text-xs outline-none" }),
                    React.createElement("button", { onClick: () => {
                            var _a;
                            const pid = ensureProfileId();
                            const base = window.location.origin + window.location.pathname;
                            const link = `${base}#/u/${pid}`;
                            (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText(link);
                            alert('Profile link copied');
                        }, className: "px-3 py-2 rounded-lg premium-gradient text-white text-xs font-bold btn-touch" }, "COPY"))),
            showProfileLinkInfo && (React.createElement("div", { className: "fixed inset-0 z-[999] flex items-center justify-center p-4" },
                React.createElement("button", { type: "button", "aria-label": "Close", onClick: () => setShowProfileLinkInfo(false), className: "absolute inset-0 bg-black/70" }),
                React.createElement("div", { className: "relative w-full max-w-lg rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden" },
                    React.createElement("div", { className: "p-5" },
                        React.createElement("div", { className: "flex items-start justify-between gap-4" },
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-lg font-display font-bold" }, "How to use your Profile Link"),
                                React.createElement("p", { className: "text-xs text-gray-400 mt-1" }, "Keep your workouts separate on this device.")),
                            React.createElement("button", { type: "button", onClick: () => setShowProfileLinkInfo(false), className: "p-2 -m-2 rounded-lg text-gray-400 hover:text-white transition btn-touch", "aria-label": "Close" },
                                React.createElement("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                    React.createElement("path", { d: "M18 6 6 18" }),
                                    React.createElement("path", { d: "M6 6l12 12" })))),
                        React.createElement("div", { className: "mt-4 text-sm text-gray-200 space-y-3" },
                            React.createElement("p", { className: "text-gray-300" }, "Your Profile Link keeps your workouts and programs separate from other users on this device."),
                            React.createElement("div", null,
                                React.createElement("div", { className: "text-xs font-bold text-gray-400 mb-1" }, "How it works"),
                                React.createElement("ul", { className: "list-disc pl-5 space-y-1 text-gray-300" },
                                    React.createElement("li", null, "Always open the app using this exact link to access your data."),
                                    React.createElement("li", null, "Save or bookmark this link so you don\u2019t lose it."),
                                    React.createElement("li", null, "Each person should use their own Profile Link."))),
                            React.createElement("div", null,
                                React.createElement("div", { className: "text-xs font-bold text-gray-400 mb-1" }, "Sharing a device?"),
                                React.createElement("ul", { className: "list-disc pl-5 space-y-1 text-gray-300" },
                                    React.createElement("li", null, "Paste a different Profile Link into the browser to switch users."))),
                            React.createElement("div", null,
                                React.createElement("div", { className: "text-xs font-bold text-gray-400 mb-1" }, "Important"),
                                React.createElement("ul", { className: "list-disc pl-5 space-y-1 text-gray-300" },
                                    React.createElement("li", null, "Opening the app without a Profile Link creates a new profile."),
                                    React.createElement("li", null, "Data is stored on this device only (no cloud sync).")))),
                        React.createElement("div", { className: "mt-5 flex justify-end" },
                            React.createElement("button", { type: "button", onClick: () => setShowProfileLinkInfo(false), className: "px-4 py-2 rounded-lg premium-gradient text-white text-sm font-bold btn-touch" }, "Got it")))))),
            React.createElement("button", { onClick: () => { if (confirm('Clear data for this profile only?')) {
                    storage.clearProfile();
                    window.location.reload();
                } }, className: "w-full p-4 rounded-xl bg-red-500/20 text-red-400 font-bold transition btn-touch" }, "CLEAR ALL DATA"))));
}
// ==================== TAB BAR ====================
function TabBar({ tab, setTab, hasProgram }) {
    const Icon = ({ name, active }) => {
        const common = "w-5 h-5";
        const stroke = active ? "currentColor" : "currentColor";
        if (name === 'home') {
            return (React.createElement("svg", { className: common, viewBox: "0 0 24 24", fill: "none", stroke: stroke, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                React.createElement("path", { d: "M3 10.5 12 3l9 7.5" }),
                React.createElement("path", { d: "M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" })));
        }
        if (name === 'workouts') {
            // Minimal barbell
            return (React.createElement("svg", { className: common, viewBox: "0 0 24 24", fill: "none", stroke: stroke, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                React.createElement("path", { d: "M6 9v6" }),
                React.createElement("path", { d: "M8.5 8v8" }),
                React.createElement("path", { d: "M15.5 8v8" }),
                React.createElement("path", { d: "M18 9v6" }),
                React.createElement("path", { d: "M9.5 12h5" }),
                React.createElement("path", { d: "M3.5 10.5v3" }),
                React.createElement("path", { d: "M20.5 10.5v3" })));
        }
        if (name === 'history') {
            // Floppy disk
            return (React.createElement("svg", { className: common, viewBox: "0 0 24 24", fill: "none", stroke: stroke, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                React.createElement("path", { d: "M6 3h12l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" }),
                React.createElement("path", { d: "M8 3v6h8V3" }),
                React.createElement("path", { d: "M9 17h6" })));
        }
        if (name === 'profile') {
            // Person / profile
            return (React.createElement("svg", { className: common, viewBox: "0 0 24 24", fill: "none", stroke: stroke, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                React.createElement("path", { d: "M20 21a8 8 0 0 0-16 0" }),
                React.createElement("circle", { cx: "12", cy: "8", r: "4" })));
        }
        // settings
        return (React.createElement("svg", { className: common, viewBox: "0 0 24 24", fill: "none", stroke: stroke, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("path", { d: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" }),
            React.createElement("path", { d: "M19.4 15a7.9 7.9 0 0 0 .1-1l2-1.2-2-3.4-2.3.7a7.7 7.7 0 0 0-1.7-1l-.4-2.4h-4l-.4 2.4a7.7 7.7 0 0 0-1.7 1l-2.3-.7-2 3.4 2 1.2a7.9 7.9 0 0 0 .1 1 7.9 7.9 0 0 0-.1 1l-2 1.2 2 3.4 2.3-.7a7.7 7.7 0 0 0 1.7 1l.4 2.4h4l.4-2.4a7.7 7.7 0 0 0 1.7-1l2.3.7 2-3.4-2-1.2a7.9 7.9 0 0 0-.1-1z" })));
    };
    const tabs = [
        { id: 'home', label: 'Home', icon: 'home' },
        { id: 'workouts', label: 'Workouts', icon: 'workouts', disabled: !hasProgram },
        { id: 'history', label: 'History', icon: 'history' },
        // Keep the underlying screen as "settings" but present it as a premium "Profile" tab.
        { id: 'settings', label: 'Profile', icon: 'profile' }
    ];
    return (React.createElement("div", { className: "tab-bar px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-3" },
        React.createElement("div", { className: "max-w-2xl mx-auto rounded-2xl glass border border-white/10" },
            React.createElement("div", { className: "px-2 py-2 flex justify-around" }, tabs.map(t => {
                const active = tab === t.id;
                return (React.createElement("button", { key: t.id, onClick: () => !t.disabled && setTab(t.id), disabled: t.disabled, className: "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition btn-touch " +
                        (active
                            ? "text-orange-400"
                            : t.disabled
                                ? "text-gray-800"
                                : "text-gray-500 hover:text-gray-300") },
                    React.createElement("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center " + (active ? "bg-white/5 ring-premium" : ""), "aria-hidden": "true" },
                        React.createElement(Icon, { name: t.icon, active: active })),
                    React.createElement("span", { className: "text-[10px] font-bold tracking-wider" }, t.label.toUpperCase())));
            })))));
}
ensureProfileId();
ReactDOM.render(React.createElement(TrainIQ, null), document.getElementById('root'));
