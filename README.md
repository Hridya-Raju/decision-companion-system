# README - Decision Companion System

A web-based tool that helps users make structured, explainable decisions by comparing multiple options across weighted criteria using real-world values.

---

## Problem Understanding

In real life, people often need to choose between multiple options that differ across several criteria - for example choosing a laptop, job offer, travel destination, or investment plan.

These decisions are difficult because:

- Too many options are present and comparing them becomes confusing and mentally exhausting
- People have the fear of making the wrong choice
- There might be a lack of complete information which creates uncertainty and doubt
- Emotional influence such as feelings like stress, attachment, or pressure from others can cloud judgment and make logical thinking harder

This system helps users:

- Enter multiple options
- Define criteria and their importance
- Provide real-world values for each criterion
- Specify whether higher or lower values are better
- Provides a ranked recommendation with explanation

The goal is not just to give an answer, but to explain why the answer was chosen.

---

## Assumptions

- Users can provide numeric scores for criteria
- Criteria importance can be represented using weights
- Users can specify whether a criterion should be minimized or maximized
- Inputs are comma-separated
- Decision logic should be explainable and not a black box
- No persistent storage is required for this assignment

---

## Design Decisions

1. Web Application

   Chosen for accessibility and simplicity.  
   Users can test decisions instantly without installation.

2. Node.js + Express Backend

   Provides a clean API layer and mirrors real production backend structure (router → controller → logic).

3. In-Memory Decision Logic

   MariaDB was not required since the assignment focuses on reasoning, not storage.

4. Real-Value Input with Normalization

   Instead of asking users to input abstract “scores”, the system accepts real-world values (price, battery hours, etc.).  
   Values are internally normalized so different units can be compared fairly.

5. User-Defined Criterion Direction

   Users specify whether each criterion should be minimized (min) or maximized (max).
   This avoids hardcoding assumptions like “price is always lower is better”.

6. Explainable Recommendation

   The system provides:

   - Ranked options
   - Score breakdown
   - Contribution of each criterion
   - Natural-language summary comparing top options
   - Star-based rating for quick understanding

   ---

## System Architecture

Frontend → HTML/CSS/JS Dashboard  
Backend → Express API  
Controller → Decision Logic + Normalization  
Output → Ranked Results + Explanation  

The system is modular so logic can be reused in CLI or mobile apps later.

---

## Decision Algorithm

1. Accept options, criteria, weights, real values, and criterion type.
2. Normalize values so all criteria are comparable.
3. Multiply normalized values by weights.
4. Sum contributions to compute total score.
5. Rank options by total score.
6. Generate explanation comparing top options.

This approach ensures transparency and consistency.

---

## Edge Cases Considered

- Trailing commas in all input fields
- Empty input fields
- Invalid numeric values
- Invalid criteria type
- Missing weights
- Different number of values
- Only one option
- Large decimal precision (rounded to 4 digits)

---

## Example Use Cases

- Choosing a laptop under budget
- Selecting a job offer
- Picking a travel destination
- Choosing an investment strategy
- Comparing smartphones

The system works for any decision with measurable criteria.

---

## Future Improvements

- AI explanation using web search
- Save past decisions to database
- User account–based system
- More improved UI/UX
- Import data from CSV
- Better explanation engine
- Mobile-friendly UI

---

## Build Transparency

This project was developed with iterative testing, validation, and refactoring.  
All commits and documentation describe how the design evolved.

AI tools were used for learning concepts, debugging, and improving documentation, while all logic and decisions were verified manually.

---

## Author

Hridya Raju George  
College of Engineering Munnar