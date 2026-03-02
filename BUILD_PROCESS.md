# BUILD PROCESS - Decision Companion System

---

## 1. Initial Understanding of the Problem

- I understood the problem as building a system that helps users compare multiple options using weighted criteria.
- My goal was that the system needed to be dynamic, explainable, and not rely entirely on AI.
- I decided to build a web-based solution because it is easy to use and demonstrate.

---

## 2. Planning the Approach

- First, I listed the core requirements:
  - Accept multiple options from the user
  - Accept the criteria based on which the user wants to decide
  - Accept the importance of each criteria
  - I had forgotten that values are needed 
  - Rank options
  - Explain results
- I chose a weighted scoring model with normalization so that different criteria scales could be compared fairly.
- I planned to separate the system into:
  - Frontend UI
  - Backend API
  - Decision Engine

---

## 3. First Prototype

- I created a simple HTML form to accept inputs.
- Implemented basic ranking logic using weighted sums.
- Displayed results in a table.

Problems found:
- Could not compare criteria with different units.
- No explanation for results.
- No input validation.

---

## 4. Improving the Decision Logic

- Added normalization of values so criteria like price and battery could be compared.
- Added support for **min/max criteria types**.
- Added explanation output showing contribution of each criterion.

Reason:
- This makes the decision transparent and understandable.

---

## 5. UI Improvements

- Added a score matrix table.
- Added a decision result table.
- Added popup “How it Works” guide.
- Added input validation with toast messages.

Reason:
- Users need guidance and clear results.
- Preventing invalid input improves usability.

---

## 6. Edge Case Handling

Handled cases such as:

- Trailing commas in options
- Invalid criteria type (not min/max)
- Mismatched number of values
- Missing weights
- Only one option provided

Reason:
- Real users make input mistakes.

---

## 7. Mistakes and Fixes

Examples:

- Initially filtered empty values incorrectly, allowing inputs like `a,b,`.
- Popup scroll and padding issues required restructuring CSS.
- Criteria type validation needed additional checks.
- Some UI elements overlapped until layout adjustments were made.

What I learned:
- Small UI details matter for usability.
- Validation logic needs careful testing.

---

## 8. Refactoring Decisions

- Separated evaluation logic into backend functions.
- Created reusable validation logic.
- Improved naming of variables and functions.
- Simplified UI structure for readability.

Reason:
- Makes code easier to maintain and extend.

---

## 9. Alternative Approaches Considered

- Using AI model to recommend options.
  - Rejected because logic must be explainable.
- Using complex multi-criteria decision algorithms.
  - Rejected due to time and simplicity.
- CLI tool instead of web app.
  - Rejected for better usability.

---

## 10. Use of AI and External Resources

- Used AI tools to understand validation logic and UI improvements.
- Used Google to research decision matrix methods.
- Adapted suggestions instead of copying directly.

Reason:
- AI helped speed up development while keeping logic understandable.

---

## 11. What I Would Improve With More Time

- Better UI/UX design
- Graph visualization of scores
- Save past decisions
- Sensitivity analysis for weights
- Mobile responsive design
- More advanced decision algorithms

---

## 12. Final Reflection

- This project improved my understanding of system design, input validation, and decision-making algorithms.
- I learned how to structure a solution, iterate on it, and document my thinking clearly.