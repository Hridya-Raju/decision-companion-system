const decisionEngine = require("../service/decisionEngine");

exports.evaluateDecision = (req, res) => {
  try {
    const { options, criteria, weights, scores } = req.body;

    if (!options || !criteria || !weights || !scores) {
      return res.status(400).json({ message: "Missing inputs" });
    }

    const result = decisionEngine(options, criteria, weights, scores);

    res.json({
      statusCode: "SC000",
      message: "Decision evaluated",
      data: result
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};