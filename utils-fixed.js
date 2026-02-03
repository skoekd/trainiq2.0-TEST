// ==================== CRITICAL FIXES - UTILITY FUNCTIONS ====================
// This file contains all the fixed logic for TrainIQ 2.0
// Author: Code Review Implementation
// Date: February 2026

// ==================== INPUT VALIDATION (CRITICAL FIX #5) ====================

function validateConfig(config) {
    const errors = [];
    
    // Validate experience
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(config.experience)) {
        errors.push('Invalid experience level. Must be Beginner, Intermediate, or Advanced.');
    }
    
    // Validate days
    const days = parseInt(config.days);
    if (isNaN(days) || days < 3 || days > 6) {
        errors.push('Days must be between 3-6.');
    }
    
    // Validate program type (including alias variants that map to base types)
    const validProgramTypes = [
        'Hypertrophy', 
        'Strength', 
        'Powerbuilding', 
        'Minimalist',
        'Power / Speed-Strength',  // Maps to Strength
        'Specialization (Body-Part Focus)',  // Maps to Hypertrophy
        'German Volume Training (GVT)',  // Maps to Hypertrophy
        'Density (EDT-style)',  // Maps to Hypertrophy
        'GPP / Conditioning-Integrated'  // Maps to Hypertrophy
    ];
    
    if (!validProgramTypes.includes(config.programType)) {
        errors.push('Invalid program type.');
    }
    
    // Validate oneRMs (optional - only validate if user entered values)
    if (config.oneRMs && typeof config.oneRMs === 'object') {
        Object.entries(config.oneRMs).forEach(([muscle, value]) => {
            // Skip empty values - they're optional
            if (!value || value === '' || value === '0') {
                return;
            }
            
            const rm = parseFloat(value);
            if (isNaN(rm) || rm <= 0 || rm > 2000) {
                errors.push(`Invalid 1RM for ${muscle}: ${value}. Must be between 0-2000 lbs.`);
            }
        });
    }
    
    if (errors.length > 0) {
        throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
    
    return {
        experience: config.experience,
        days: parseInt(config.days),
        programType: config.programType,
        oneRMs: config.oneRMs || {},
        supersets: config.supersets !== false,
        sessionTime: parseInt(config.sessionTime) || 60
    };
}

// ==================== VOLUME CALCULATION (CRITICAL FIX #1) ====================

function calculateWeeklyVolume(experience, programType, muscle) {
    // Evidence-based volume landmarks by experience level
    const volumeRanges = {
        Beginner: { min: 6, max: 10 },
        Intermediate: { min: 10, max: 16 },
        Advanced: { min: 12, max: 20 }
    };
    
    // Program type multipliers (adjust total volume based on training goal)
    const typeMultipliers = {
        Hypertrophy: 1.0,      // Full volume for muscle growth
        Strength: 0.7,         // Lower volume, higher intensity
        Powerbuilding: 0.85,   // Balanced approach
        Minimalist: 0.6        // Time-efficient reduced volume
    };
    
    const base = volumeRanges[experience] || volumeRanges.Intermediate;
    const multiplier = typeMultipliers[programType] || 1.0;
    
    return {
        min: Math.round(base.min * multiplier),
        max: Math.round(base.max * multiplier)
    };
}

function calculateWeeklyTargetsWithProgramType(experience, programType) {
    const MUSCLES = ['chest', 'back', 'lats', 'front_delts', 'side_delts', 'rear_delts', 
                     'biceps', 'triceps', 'quads', 'hamstrings', 'glutes', 'calves'];
    
    const targets = {};
    
    // Calculate volume for each muscle using program-type adjusted formula
    MUSCLES.forEach(muscle => {
        const vol = calculateWeeklyVolume(experience, programType, muscle);
        targets[muscle] = vol.min; // Start at minimum effective volume
    });
    
    // Muscle-specific adjustments (some muscles need more volume)
    const adjustments = {
        back: 2,      // Back can handle more volume
        quads: 2,     // Quads need more volume
        side_delts: 1, // Side delts respond well to higher volume
        glutes: 1     // Glutes can handle more
    };
    
    Object.entries(adjustments).forEach(([muscle, bonus]) => {
        if (targets[muscle]) {
            targets[muscle] += bonus;
        }
    });
    
    return targets;
}

// ==================== RIR LOGIC (CRITICAL FIX #3) ====================

function calculateRIR(experience, exerciseType, setNumber, totalSets, programType, role, phase) {
    // Base RIR by experience level and exercise type
    const experienceRIR = {
        Beginner: { compound: 3, isolation: 2 },
        Intermediate: { compound: 2, isolation: 1 },
        Advanced: { compound: 1, isolation: 0 }
    };
    
    const isCompound = exerciseType === 'compound';
    let baseRIR = isCompound 
        ? experienceRIR[experience].compound
        : experienceRIR[experience].isolation;
    
    // Program type adjustments
    if (programType === 'Strength' && role === 'main') {
        baseRIR = Math.max(1, baseRIR); // Never go to absolute failure on heavy compounds
    }
    
    // Phase adjustments (for periodization)
    if (phase === 'Peak') {
        baseRIR = Math.max(0, baseRIR - 1); // Push harder in peak phase
    } else if (phase === 'Base') {
        baseRIR = Math.min(4, baseRIR + 1); // More conservative in base phase
    }
    
    // Set-to-set progression (RIR decreases across sets to accumulate fatigue)
    if (totalSets === 1) {
        return baseRIR; // Single set: use base RIR
    }
    
    if (setNumber === 1) {
        return Math.min(4, baseRIR + 1); // First set: easier (warmup to working weight)
    } else if (setNumber === totalSets) {
        return Math.max(0, baseRIR - 1); // Last set: push harder
    } else {
        return baseRIR; // Middle sets: base RIR
    }
}

// ==================== PERIODIZATION (CRITICAL FIX #2) ====================

function getPhaseParameters(weekNumber) {
    // 12-week block periodization: Base (1-4) → Intensification (5-8) → Peak (9-12)
    let phase, volumeMultiplier, intensityAdjust, deloadWeek;
    
    if (weekNumber <= 4) {
        // BASE PHASE: Higher volume, moderate intensity, build work capacity
        phase = 'Base';
        deloadWeek = (weekNumber === 4);
        volumeMultiplier = deloadWeek ? 0.5 : 1.0;
        intensityAdjust = 0; // No intensity adjustment in base
    } else if (weekNumber <= 8) {
        // INTENSIFICATION PHASE: Moderate volume, higher intensity
        phase = 'Intensification';
        deloadWeek = (weekNumber === 8);
        volumeMultiplier = deloadWeek ? 0.5 : 0.85; // Slightly reduced volume
        intensityAdjust = deloadWeek ? -10 : +5; // 5% weight increase, or 10% reduction on deload
    } else {
        // PEAK PHASE: Lower volume, highest intensity
        phase = 'Peak';
        deloadWeek = (weekNumber === 12);
        volumeMultiplier = deloadWeek ? 0.5 : 0.7; // Lowest volume for peak intensity
        intensityAdjust = deloadWeek ? -15 : +10; // 10% weight increase, or 15% reduction on deload
    }
    
    return {
        phase,
        volumeMultiplier,
        intensityAdjust,
        isDeload: deloadWeek,
        weekNumber
    };
}

function applyDeload(exercises, isDeload) {
    if (!isDeload) return exercises;
    
    // During deload: keep only main compounds, reduce volume, increase RIR, reduce weight
    return exercises
        .filter(ex => {
            // Skip all isolation exercises during deload
            if (ex.type === 'isolation') return false;
            // Keep main and secondary compounds only
            return ex.role === 'main' || ex.role === 'secondary';
        })
        .map(exercise => ({
            ...exercise,
            sets: Math.ceil(exercise.sets * 0.5),  // 50% volume reduction
            rir: `${Math.min(4, parseInt(exercise.rir) + 2)}-${Math.min(5, parseInt(exercise.rir) + 3)} RIR`, // Further from failure
            weight: exercise.weight ? Math.round(exercise.weight * 0.90) : null, // 10% weight reduction
            deload: true // Mark as deload for UI display
        }));
}

// ==================== REP RANGE ADJUSTMENT (LOGIC GAP #2) ====================

function adjustRepRangeForProgram(baseRange, programType, exerciseRole, exerciseType) {
    if (programType === 'Strength') {
        if (exerciseRole === 'main') {
            return [3, 6]; // Heavy strength work
        } else if (exerciseType === 'compound') {
            return [5, 8]; // Moderate compound work
        } else {
            return [8, 12]; // Isolation for volume
        }
    }
    
    if (programType === 'Hypertrophy') {
        if (exerciseType === 'compound') {
            return [6, 12]; // Hypertrophy sweet spot
        } else {
            return [10, 20]; // Higher rep isolation
        }
    }
    
    if (programType === 'Powerbuilding') {
        if (exerciseRole === 'main') {
            return [4, 6]; // Strength-focused mains
        } else if (exerciseType === 'compound') {
            return [8, 12]; // Hypertrophy compounds
        } else {
            return [12, 15]; // Pump work
        }
    }
    
    // Minimalist: moderate across all
    return [6, 12];
}

// ==================== WEIGHT CALCULATION FIX (MAJOR #2) ====================
// NOTE: NSCA_REP_PCT, percentFromRepsToFailure, and roundWeight already exist in index.html
// We're using those existing functions

function calculateWeight(oneRM, minRep, maxRep, rir) {
    if (!oneRM || oneRM <= 0) return null;
    
    const avgRep = (minRep + maxRep) / 2;
    const repsToFailure = avgRep + rir;
    
    // Use existing percentFromRepsToFailure function from index.html
    const percentage = percentFromRepsToFailure(repsToFailure);
    const weight = oneRM * percentage;
    
    // Use existing roundWeight function from index.html
    return roundWeight(weight);
}

// ==================== WARMUP GENERATION (SAFETY #2) ====================

function generateWarmups(exercise, workingWeight, workingReps) {
    // Only generate warmups for heavy compound movements
    if (exercise.type !== 'compound' || !workingWeight || workingWeight < 95) {
        return [];
    }
    
    const warmups = [];
    
    // Warmup 1: Bar only or 50% working weight (whichever is higher)
    warmups.push({
        weight: Math.max(45, Math.round(workingWeight * 0.5 / 5) * 5),
        reps: Math.min(8, workingReps + 2),
        rpe: 5,
        type: 'warmup'
    });
    
    // Warmup 2: 70% working weight (only if working weight > 135)
    if (workingWeight > 135) {
        warmups.push({
            weight: Math.round(workingWeight * 0.7 / 5) * 5,
            reps: Math.min(5, workingReps),
            rpe: 6,
            type: 'warmup'
        });
    }
    
    // Warmup 3: 85% working weight (only if working weight > 185)
    if (workingWeight > 185) {
        warmups.push({
            weight: Math.round(workingWeight * 0.85 / 5) * 5,
            reps: Math.min(3, workingReps - 1),
            rpe: 7,
            type: 'warmup'
        });
    }
    
    return warmups;
}

// ==================== PROGRESSION GUARDRAILS (SAFETY #1) ====================

const MAX_WEEKLY_PROGRESSION = {
    Beginner: {
        compound: 0.025,  // 2.5% max per week
        isolation: 0.05   // 5% max per week
    },
    Intermediate: {
        compound: 0.05,   // 5% max per week
        isolation: 0.075  // 7.5% max per week
    },
    Advanced: {
        compound: 0.075,  // 7.5% max per week
        isolation: 0.10   // 10% max per week
    }
};

function validateWeightProgression(exercise, currentWeight, newWeight, experience) {
    if (!currentWeight || currentWeight <= 0) {
        return { valid: true }; // No baseline to compare
    }
    
    const exerciseType = exercise.type === 'compound' ? 'compound' : 'isolation';
    const maxIncrease = MAX_WEEKLY_PROGRESSION[experience][exerciseType];
    const percentIncrease = (newWeight - currentWeight) / currentWeight;
    
    if (percentIncrease > maxIncrease) {
        const suggestedWeight = roundWeight(currentWeight * (1 + maxIncrease));
        return {
            valid: false,
            suggested: suggestedWeight,
            message: `Max safe increase for ${experience} ${exerciseType} is ${(maxIncrease * 100).toFixed(1)}% per week. Suggested: ${suggestedWeight} lbs`
        };
    }
    
    return { valid: true };
}

// ==================== SAFE LOCALSTORAGE (MAJOR #5) ====================

function safeLocalStorageSet(key, value) {
    try {
        const serialized = JSON.stringify(value);
        
        // Check size before attempting to store
        const sizeKB = new Blob([serialized]).size / 1024;
        
        if (sizeKB > 4000) { // 4MB warning threshold
            console.warn(`Large localStorage item (${sizeKB.toFixed(0)}KB). Consider reducing data.`);
        }
        
        localStorage.setItem(key, serialized);
        return { success: true, size: sizeKB };
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            console.error('Storage quota exceeded');
            return { 
                success: false, 
                error: 'Storage full. Clear old data or reduce program size.',
                quotaExceeded: true
            };
        }
        console.error('LocalStorage error:', e);
        return { success: false, error: e.message };
    }
}

function safeLocalStorageGet(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return defaultValue;
    }
}

// ==================== IMPROVED SUPERSET LOGIC (MAJOR #1) ====================

function canSupersetImproved(exercise1, exercise2, programType) {
    if (!exercise1 || !exercise2) return false;
    
    // NEVER superset main compounds in strength programs
    if (programType === 'Strength') {
        if (exercise1.type === 'compound' || exercise2.type === 'compound') {
            return false;
        }
    }
    
    // Get equipment types
    const eq1 = String(exercise1.equipment || '').toLowerCase();
    const eq2 = String(exercise2.equipment || '').toLowerCase();
    
    // Rule 1: No two barbell exercises
    if (eq1 === 'barbell' && eq2 === 'barbell') {
        return false;
    }
    
    // Rule 2: If one is barbell, other must be portable (bodyweight/dumbbell)
    const portableEquipment = ['bodyweight', 'dumbbell', 'kettlebell', 'band'];
    if (eq1 === 'barbell' || eq2 === 'barbell') {
        const partner = eq1 === 'barbell' ? eq2 : eq1;
        if (!portableEquipment.includes(partner)) {
            return false;
        }
    }
    
    // Rule 3: No two cable/machine exercises (likely same station)
    if ((eq1 === 'cable' && eq2 === 'cable') || (eq1 === 'machine' && eq2 === 'machine')) {
        // Exception: if clearly different movements
        const ex1Vertical = String(exercise1.name || '').toLowerCase().includes('pulldown') ||
                           String(exercise1.name || '').toLowerCase().includes('pull-up');
        const ex2Vertical = String(exercise2.name || '').toLowerCase().includes('pulldown') ||
                           String(exercise2.name || '').toLowerCase().includes('pull-up');
        
        // If both vertical or both horizontal, likely same station
        if (ex1Vertical === ex2Vertical) {
            return false;
        }
    }
    
    // Rule 4: Check if antagonist pair (recommended for supersets)
    const antagonistPairs = [
        ['chest', 'back'],
        ['chest', 'lats'],
        ['quads', 'hamstrings'],
        ['biceps', 'triceps'],
        ['front_delts', 'rear_delts']
    ];
    
    const isAntagonist = antagonistPairs.some(pair => 
        (pair.includes(exercise1.primary) && pair.includes(exercise2.primary))
    );
    
    // Rule 5: Check combined fatigue (don't pair two very high fatigue exercises)
    const fatigue1 = exercise1.fatigueNum || 2;
    const fatigue2 = exercise2.fatigueNum || 2;
    
    if (fatigue1 >= 4 && fatigue2 >= 4) {
        return false; // Two very high fatigue exercises
    }
    
    // Prefer antagonist pairs, but allow other combinations if equipment compatible
    return isAntagonist || (fatigue1 + fatigue2 <= 5);
}

// Make functions available globally for browser use
if (typeof window !== 'undefined') {
    // Browser environment - attach to window
    window.validateConfig = validateConfig;
    window.calculateWeeklyVolume = calculateWeeklyVolume;
    window.calculateWeeklyTargetsWithProgramType = calculateWeeklyTargetsWithProgramType;
    window.calculateRIR = calculateRIR;
    window.getPhaseParameters = getPhaseParameters;
    window.applyDeload = applyDeload;
    window.adjustRepRangeForProgram = adjustRepRangeForProgram;
    window.calculateWeight = calculateWeight;
    // Note: roundWeight and percentFromRepsToFailure already exist in index.html
    window.generateWarmups = generateWarmups;
    window.validateWeightProgression = validateWeightProgression;
    window.safeLocalStorageSet = safeLocalStorageSet;
    window.safeLocalStorageGet = safeLocalStorageGet;
    window.canSupersetImproved = canSupersetImproved;
}

// Export for Node.js modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateConfig,
        calculateWeeklyVolume,
        calculateWeeklyTargetsWithProgramType,
        calculateRIR,
        getPhaseParameters,
        applyDeload,
        adjustRepRangeForProgram,
        calculateWeight,
        generateWarmups,
        validateWeightProgression,
        safeLocalStorageSet,
        safeLocalStorageGet,
        canSupersetImproved
    };
}
