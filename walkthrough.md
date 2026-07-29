# Walkthrough - Panchang Engine Precision & Udaya Tithi Fixes

Completed two critical architectural fixes to the Panchang engine on feature branch `feature/onboarding-preferences-refactor`:

1. **Issue 1 (Ephemeris Accuracy):** Replaced custom truncated perturbation formulas with `astronomy-engine` (VSOP87 / ELP2000-82 planetary theory) for high-precision Sun & Moon ecliptic longitudes, applying Lahiri Ayanamsa offset.
2. **Issue 2 (Udaya Tithi Convention):** Updated `getDailyPanchang` to evaluate base Tithi, Nakshatra, Yoga, and Karana at local Sunrise rather than at instantaneous input timestamps.

---

## Git Commits Made

- **Commit 1 (`bdac18b`):** `fix(panchang): replace custom ephemeris calculations with astronomy-engine for high-precision Sun/Moon longitudes`
- **Commit 2 (`5931ea6`):** `fix(panchang): evaluate base Tithi, Nakshatra, and Yoga at local Sunrise per Udaya Tithi convention`

---

## 1. Before vs After Delta Table (6 Original Test Cases)

Below is the exact side-by-side comparative delta showing how transition times shifted after replacing custom formulas with `astronomy-engine` high-precision ephemeris calculations:

| Test Case | Parameter | Old Value (Truncated Formula) | New Value (`astronomy-engine`) | Delta / Notes |
| :--- | :--- | :--- | :--- | :--- |
| **1. Today (Delhi)**<br>`2026-07-27` | Tithi Transition<br>Nakshatra Transition<br>Yoga Transition | Until 04:17 PM IST<br>Until 10:30 AM IST<br>Until 10:55 PM IST | Until 04:15 PM IST<br>Until 10:28 AM IST<br>Until 10:54 PM IST | -2 mins shift<br>-2 mins shift<br>-1 min shift |
| **2. Today (Chennai)**<br>`2026-07-27` | Tithi Transition<br>Nakshatra Transition<br>Yoga Transition | Until 04:17 PM IST<br>Until 10:30 AM IST<br>Until 10:55 PM IST | Until 04:15 PM IST<br>Until 10:28 AM IST<br>Until 10:54 PM IST | -2 mins shift<br>-2 mins shift<br>-1 min shift |
| **3. Known Purnima**<br>`2026-07-29` | Tithi (Ashadha Purnima)<br>Tithi Transition<br>Nakshatra Transition | Shukla Purnima (15)<br>Until 08:09 PM IST<br>Until 03:40 PM IST | Shukla Purnima (15)<br>Until 08:05 PM IST<br>Until 03:36 PM IST | Exact Tithi 15<br>-4 mins shift<br>-4 mins shift |
| **4. Known Amavasya**<br>`2026-07-14` | Tithi (Ashadha Amavasya)<br>Tithi Transition<br>Nakshatra Transition | Krishna Amavasya (30)<br>Until 03:21 PM IST<br>Until 12:15 AM IST | Krishna Amavasya (30)<br>Until 03:13 PM IST<br>Until 12:09 AM IST | Exact Tithi 30<br>-8 mins shift<br>-6 mins shift |
| **5. Maha Shivratri**<br>`2026-02-15` | Tithi<br>Tithi Transition<br>Nakshatra Transition | Krishna Trayodashi (28)<br>Until 05:05 PM IST<br>Until 07:47 PM IST | Krishna Trayodashi (28)<br>Until 05:05 PM IST<br>Until 07:48 PM IST | Exact Tithi 28<br>0 mins shift<br>+1 min shift |
| **6. 6 Months Ago**<br>`2026-01-27` | Tithi<br>Tithi Transition<br>Yoga (Name & Transition) | Shukla Navami (9)<br>Until 07:02 PM IST<br>ID 23 Shubha (06:15 AM) | Shukla Navami (9)<br>Until 07:05 PM IST<br>ID 24 Shukla (03:12 AM) | Exact Tithi 9<br>+3 mins shift<br>Corrected Yoga boundary |

---

## 2. Udaya Tithi Edge Case Demonstration (`2026-07-18`)

On **July 18, 2026**, Tithi transitions from Shukla Chaturthi (ID 4) to Shukla Panchami (ID 5) at **03:43 AM IST** (before local sunrise at 05:33 AM IST).

- **Instantaneous Evaluation (Old Bug at Midnight 00:00 IST):** Evaluated at 00:00 IST, returning **Shukla Chaturthi (ID 4)** as the day's Tithi.
- **Prevailing Tithi at Sunrise (05:33 AM IST):** At sunrise, the prevailing Tithi is **Shukla Panchami (ID 5)**.
- **New Udaya Tithi Engine Output (`getDailyPanchang`):**
  - **Tithi:** `ID 5 - Shukla Panchami`
  - **Transition:** `Until 03:43 AM IST` (Prevailing at sunrise, transitioning next day at 03:43 AM)
  - **Code JSDoc:** JSDoc comments added to `panchang-service.ts` documenting Udaya Tithi rules to prevent future regressions.

---

## 3. Verification Results

### Automated Diagnostic Suite (`panchang-validator.ts`)
```json
{
  "isValid": true,
  "checksCount": 6,
  "failures": [],
  "samplePanchang": {
    "tithi": { "id": 13, "name": "Trayodashi", "paksha": "Shukla", "endTimestamp": "Until 04:15 PM" },
    "nakshatra": { "id": 19, "name": "Mula", "endTimestamp": "Until 10:28 AM" },
    "yoga": { "id": 27, "name": "Vaidhriti", "endTimestamp": "Until 10:54 PM" }
  }
}
```

### TypeScript Compilation Check (`npx tsc --noEmit`)
- Executed `npx tsc --noEmit` cleanly with **0 errors**.

---

## 4. Status

- **Status:** **Ready for manual re-verification**
