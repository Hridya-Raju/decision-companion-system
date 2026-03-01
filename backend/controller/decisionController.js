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
        value: value,
        weight: weight,
        contribution: value * weight
      });
    }

    results.push({
      option: options[i],
      totalScore: total,
      breakdown: scores[i],
      explanation
    });
  }

  results.sort((a, b) => b.totalScore - a.totalScore);

  return results;
}

exports.evaluateDecision = (req, res) => {
  try {
    const { options, criteria, weights, scores } = req.body;
    logger.info("Decision request received", req.body);

    if ( !options || !criteria || !weights || !scores ) {
      return res.status(400).json({ 
        message: "Empty inputs are not allowed"
      });
    }

    const result = decisionEngine(options, criteria, weights, scores);

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