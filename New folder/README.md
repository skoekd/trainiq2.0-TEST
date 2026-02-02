# TrainIQ2

TrainIQ2 is a training program generator designed to balance
scientific training principles with real-world gym constraints.

The goal of this project is to produce workouts that are:
- Effective
- Time-efficient
- Logistically realistic in commercial gyms
- Easy to follow without excessive setup

This repository contains the logic, data, and documentation
used to generate structured training programs with intelligent
exercise selection and superset pairing.

---

## Core Design Principles

- Training density should never compromise execution quality
- Supersets must be gym-friendly, not just physiologically sound
- Equipment transitions matter as much as muscle pairing
- Programs should scale from commercial gyms to home gyms

---

## Superset Logic (High-Level)

TrainIQ2 uses a Superset Taxonomy System that categorizes
supersets by intent, equipment friction, and station compatibility.

This prevents unrealistic pairings such as:
- Barbell Bench Press → Barbell Row (commercial gym)

And instead favors:
- Dumbbell Bench Press → One-Arm Dumbbell Row
- Cable Chest Press → Seated Cable Row
- Barbell Bench Press → Face Pulls

For full details, see:
- SUPERSET_TAXONOMY.md
- SUPERSET_IMPLEMENTATION.md
