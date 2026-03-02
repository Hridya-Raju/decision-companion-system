document.addEventListener('DOMContentLoaded', function() {

  const showToast = (message) =>{
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.remove("hide");
    setTimeout(function() {
      toast.classList.add("hide");
    }, 3000);
  }

  document.getElementById("evaluateBtn").addEventListener("click", evaluateDecision);

  document.getElementById("reevaluate").addEventListener("click", function () {
    document.getElementById("result").style.display = "none";
    document.getElementById("calculation").style.display = "block";
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("toggleResult").style.display = "none";
  });

  document.getElementById("new-decision").addEventListener("click", function () {
    document.getElementById("result").style.display = "none";
    document.getElementById("calculation").style.display = "block";
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("toggleResult").style.display = "none";
    document.getElementById("imput-form").reset();
  });

  document.getElementById("toggleResult").addEventListener("click", function () {
    if (document.getElementById("resultSection").style.display === "none") {
      document.getElementById("resultSection").style.display = "block";
      document.getElementById("toggleResult").innerText = "Hide Decision Result ▲";
    } else {
      document.getElementById("resultSection").style.display = "none";
      document.getElementById("toggleResult").innerText = "Show Decision Result ▼";
    }
  });

  async function evaluateDecision() {

    if (
      !document.getElementById("options").value.trim() ||
      !document.getElementById("criteria").value.trim() ||
      !document.getElementById("weights").value.trim() ||
      !document.getElementById("scores").value.trim()
    ) {
      showToast("Please fill all fields before evaluating.");
      console.log("Options less than two.");
      return;
    }

    const criteria = document.getElementById("criteria").value.split(",");
    const criteriaType = document.getElementById("criteriaType").value.split(",").map(x => x.trim().toLowerCase());

    const optionsName = document.getElementById("options").value.split(",").map(o => o.trim());

    if (optionsName.some(o => o === "")) {
      showToast("Enter valid options");
      console.log("Empty fields or invalid options are present.");
      return;
    }
    const options = optionsName;
    
    const weightsNum = document.getElementById("weights").value.split(",").map(w => w.trim()).filter(w => w !== "");

    if (weightsNum.length !== criteria.length || weightsNum.some(w => isNaN(w))) {
      showToast("Enter valid weights for all criteria.");
      console.log("Empty fields are present.");
      return;
    }
    const weights = weightsNum.map(Number);

    const valueRows = document.getElementById("scores").value.split("|");
    const values = valueRows.map(r => r.trim().split(" ").map(Number));

    const body = { options, criteria, weights, values, criteriaType };

    if (options.length < 2) {
      showToast("Please enter two or more options to compare.");
      console.log("Options less than two.");
      return;
    }

    if (options.length !== values.length) {
      showToast("Number of values must match number of options.");
      console.log("Number of values do not match number of options.");
      return;
    }

    if (criteriaType.length !== criteria.length) {
      showToast("Criteria type must match number of criteria.");
      return;
    }

    for (let row of values) {
      if (row.length !== criteria.length) {
        showToast("Each score row must match number of criteria.");
        console.log("Number of score rows must match number of criterias.");
        return;
      }
    }

    const res = await fetch("http://localhost:3000/decision/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await res.json();

    showSummary(result);
    showResults(result);
    showMatrix(result, criteria);

    document.getElementById("calculation").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("toggleResult").style.display = "block";
    document.getElementById("toggleResult").innerText = "Show Decision Result ▼";

    console.log("Result is: ", result);
  }

  function showResults(result) {
    const tableBody = document.querySelector("#resultTable tbody");
    tableBody.innerHTML = "";

    result.data.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.option}</td>
        <td>${Number(item.totalScore).toFixed(4)}</td>
        <td>
          ${item.explanation.map(e =>
            `${e.criterion}: ${Number(e.value).toFixed(4)} × ${e.weight} = ${e.contribution}`
          ).join("<br>")}
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // function showSummary(result) {
  //   const best = result.data[0];
  //   const reasons = best.explanation
  //     .sort((a,b)=>b.contribution-a.contribution)
  //     .slice(0,2)
  //     .map(r => r.criterion)
  //     .join(" and ");

  //   document.getElementById("summary-text").innerText =
  //     `${best.option} ranked first mainly due to ${reasons}.`;
  // }

  function showSummary(result) {
    const best = result.data[0];
    const second = result.data[1];
    let biggestDiff = "";
    let max = 0;

    if (!second) {
      document.getElementById("summary-text").innerText =
        `${best.option} is the only option provided.`;
      return;
    }

    const topCriteria = best.explanation
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 2)
      .map(r => r.criterion)
      .join(" and ");

    best.breakdown.forEach((v, i) => {
      const diff = Math.abs(v - second.breakdown[i]);
      if (diff > max) {
        max = diff;
        biggestDiff = best.explanation[i].criterion;
      }
    });

    document.getElementById("summary-text").innerText =
      `${best.option} is ranked higher than ${second.option} mainly due to better ${topCriteria}. 
      The biggest difference was in ${biggestDiff}, which outweighed other factors.`;
  }

  function getStars(score, maxScore) {
    const stars = Math.round((score / maxScore) * 5);
    return "⭐".repeat(stars);
  }

  function showMatrix(result, criteria) {
    const head = document.querySelector("#matrixTable thead");
    const body = document.querySelector("#matrixTable tbody");
    const maxScore = Math.max(...result.data.map(x => x.totalScore));

    head.innerHTML = "<tr><th>Option</th>" + criteria.map(c => `<th>${c}</th>`).join("") + "<th>Total</th><th>Rating</th></tr>";

    body.innerHTML = "";

    result.data.forEach(item => {
      body.innerHTML +=
        "<tr>" +
        `<td>${item.option}</td>` +
        item.breakdown.map(s => `<td>${s}</td>`).join("") +
        `<td>${Number(item.totalScore).toFixed(4)}</td>` +
        `<td>${getStars(item.totalScore, maxScore)}</td>` +
        "</tr>";
    });
  }

});