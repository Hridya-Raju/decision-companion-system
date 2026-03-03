const logger = require("../utils/logger");

function decisionEngine(options, criteria, weights, scores) {
  let results = [];

  for (let i = 0; i < options.length; i++) {
    let total = 0;
    let explanation = [];

    for (let j = 0; j < criteria.length; j++) {
      const value = scores[i][j] || 0;
      const weight = weights[j] || 0;
      total += value * weight;

      explanation.push({
        criterion: criteria[j],
        value: Number(value.toFixed(4)),
        weight: weight,
        contribution: Number((value * weight).toFixed(4))
      });
    }

    results.push({
      option: options[i],
      totalScore: Number(total.toFixed(4)),
      breakdown: scores[i].map(x => Number(x.toFixed(4))),
      explanation
    });
  }

  results.sort((a, b) => b.totalScore - a.totalScore);

  return results;
}

function normalizeValues(values, criteriaType) {
  const rows = values.length;
  const cols = values[0].length;

  let normalized = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let j = 0; j < cols; j++) {
    let column = values.map(r => Number(r[j]));
    const max = Math.max(...column);
    const min = Math.min(...column);

    for (let i = 0; i < rows; i++) {
      if (max === min) {
        normalized[i][j] = 1;
      } else if (criteriaType[j] === "min") {
        normalized[i][j] = min / column[i];
      } else {
        normalized[i][j] = column[i] / max;
      }
    }
  }

  return normalized;
}

exports.evaluateDecision = (req, res) => {
  try {
    const { options, criteria, weights, values, criteriaType } = req.body;
    logger.info("Decision request received", req.body);

    if ( !options || !criteria || !weights || !values || !criteriaType ) {
      return res.status(400).json({ 
        message: "Empty inputs are not allowed"
      });
    }

    const normalized = normalizeValues(values, criteriaType);
    const result = decisionEngine(options, criteria, weights, normalized);

    logger.info("Decision result:", result);
    console.log("Decision result:", result);

    res.json({
      statusCode: "SC000",
      message: "Decision evaluated",
      data: result
    });

  } catch (err) {
    logger.error("Decision error:", err);
    console.error("Decision error:", err);
    res.status(500).json({ 
      message: err.message
     });
  }
};