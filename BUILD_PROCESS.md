# BUILD PROCESS - Decision Companion System

---

## 1. Initial Understanding of the Problem

- I understood the problem as building a system that helps users compare multiple options using different criteria.
- My goal was that the system needed to be dynamic, explainable, and not rely entirely on AI.
- I decided to build a web-based solution because it is easy to use and demonstrate.

---

## 2. Planning the Approach

- First, I listed the core requirements:
  - Accept multiple options from the user
  - Accept the criteria based on which the user wants to decide
  - Accept the importance of each criteria
- I had forgotten that values are needed. I had created a basic model but was confused as to how the calculation will be done. I ssearched for 'Decision making formula' and came across scores assigned to different values. Score represents how well an option satisfies a criterion. Weight represents how important that criterion is to the decision. These scores were calculated using the formula:
    Expected Value (EV) Method Formula: (Probability A x Payoff A) + (Probability B x Payoff B)
  - Rank the options
  - Give a summary of the results
- Decided to make an api and dashboard using node.js and html, since I already know somewhat of both. Revised some basics of node.js.

---

## 3. First Prototype

- I created a simple HTML form to accept inputs.
- Implemented the score calculation logic using backend.
- Displayed results in a table.

Problems found:
- Could not compare criteria with different units.
- No explanation for results.
- No input validation.

---

## 4. Improving the Decision Logic

- Added normalization of values so any criteria could be compared.
- Added validation for **min/max criteria types**.
- Added explanation output showing contribution of each criterion.
- Made a Score matrix table to display the options on the basis of higest score in descending order
-	Remembered that I haven't taken values. Included values in the input fields and changed the decision making logic to take input the actual values and internally convert them to scorees

Reason:
- This makes the decision transparent and understandable.
- It makes the system more easily usable and comprehensive

---

## 5. UI Improvements

- Added a score matrix table.
- Added a decision result table.
- Added popup “How it Works” guide.
- Added input validation with toast messages.
-	Added a ‘Re-evaluate’ button so that the user is redirected back to the form in case they want to make any changes to the inputs.
-	Also added a ‘New decision’ button, which just clears the inputs by resetting the form, in case the user wants to do a completely new evaluation
-	Changed the form and results to different subpages 


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
- Large decimal precision (rounded to 4 digits)

Reason:
- Real users make input mistakes.

---

## 7. Mistakes and Fixes

Examples:

- Initially filtered empty values incorrectly, allowing inputs like `a,b,`.
- Popup scroll and padding issues required restructuring the CSS.
- Criteria type validation needed additional checks.
- Some UI elements overlapped until layout adjustments were made.

What I learned:
- Small UI details matter for usability.
- Validation logic needs careful testing.

---

## 8. Refactoring Decisions

- Separated evaluation logic into backend functions.
- Added a ranking system and brought perrcentage into the program
- Created reusable validation logic.
- Improved naming of variables and functions.
- Simplified UI structure for readability.

Reason:
- Makes code easier to maintain and extend.

---

## 9. Alternative Approaches Considered

- Using AI-based model to recommend options.
  - Rejected because logic must be explainable.
- Using complex multi-criteria decision algorithms.
  - Rejected due to time and simplicity.

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
- Save past decisions in database
- Mobile responsive design
- More advanced decision algorithms
- Integration of AI

---

## 12. Final Reflection

- This project improved my understanding of system design, input validation, and decision-making algorithms.
- I learned how to structure aproblem and a solution, iterate on it, and document my thinking clearly.