# RESEARCH LOG – Decision Companion System

This document records how external resources, AI tools, and research influenced the development of this project.

The goal is transparency in the development process.

---

## 1. AI Prompts Used

The following prompts were used during development:

- "How to split comma separated input in JS"
- "If 4 inputs - options, criteria, weights, scores, are given, how to push the calculations into results?"
- "How to toggle table visibility in JavaScript"
- "Is Render or Vercel better for my case?"
- "How to deploy my project on Render"
- "How to handle trailing commas in user input"
- "How to normalize the values based on its criteria type, ie, min or max. Explain the logic"

AI tools used:
- ChatGPT

AI was mainly used for:
- Understanding concepts
- Documentation format guidance
- Deployment guidance

---

## 2. Google Searches

The following searches were used to understand concepts and implementation details:

- Decision making formula
- Normalization techniques in multi-criteria decision making
- Node.js fetch POST example
- Render deployment Node.js tutorial
- How to create architecture diagram for webapp
- BUILD_PROCESS.md format
- RESEARCH_LOG.md format

These searches helped understand both the mathematical logic and implementation details.

---

## 3. References and Sources

Conceptual references:

- Weighted Decision Matrix method
- Multi-criteria decision making (MCDM) concepts
- .md format guide
- Render deployment guide
- README.md templates

Technical references:

- MDN Web Docs for JavaScript validation and fetch API
- Render documentation for deployment

No code was copied directly without modification.

---

## 4. What I Accepted from AI Outputs

I accepted ideas such as:

- Using normalization to compare different criteria scales
- Using weighted scoring for ranking options


These ideas were adapted to fit the project requirements.

---

## 5. What I Modified

AI suggestions were modified in the following ways:

- Took the decision engine logic I was provided and changed it according to what I needed
- Adjusted deployment instructions to match project folder structure
- Documentation format guidance according to my prokect

Reason:
AI suggestions often needed adjustment to fit real project constraints.

---

## 6. What I Rejected

Some suggestions were rejected because they did not match requirements:

- Using an AI model to generate recommendations
  (The system must remain explainable.)
- Using complex decision algorithms
  (Not necessary for this assignment.)
- Adding unnecessary frameworks
  (Kept project simple and readable.)

---

## 7. Lessons Learned

Through research and experimentation, I learned:

- Normalization makes it easier for the users to understand what to input
- Removing scores from frontend and using it in backend for normalization.
- Deployment requires understanding project structure.
- AI tools are helpful for guidance but require careful verification.

---

## 8. Transparency Statement

All external resources were used only to understand concepts and solve specific problems.  

The final system design, logic, and most of the implementation decisions were made independently after understanding the concepts.