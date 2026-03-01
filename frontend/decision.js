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
  });

  document.getElementById("new-decision").addEventListener("click", function () {
    document.getElementById("result").style.display = "none";
    document.getElementById("calculation").style.display = "block";
    document.getElementById("imput-form").reset();
  });

  async function evaluateDecision() {

    if (
      !document.getElementById("options").value.trim() ||
      !document.getElementById("criteria").value.trim() ||
      !document.getElementById("weights").value.trim() ||
      !document.getElementById("scores").value.trim()
    ) {
      showToast("Please fill all fields before evaluating.");
      return;
    }

    const options = document.getElementById("options").value.split(",");
    const criteria = document.getElementById("criteria").value.split(",");
    const weights = document.getElementById("weights").value.split(",").map(Number);

    const scoreRows = document.getElementById("scores").value.split("|");
    const scores = scoreRows.map(r => r.trim().split(" ").map(Number));

    const body = { options, criteria, weights, scores };

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
        <td>${item.totalScore}</td>
        <td>
          ${item.explanation.map(e =>
            `${e.criterion}: ${e.value} × ${e.weight} = ${e.contribution}`
          ).join("<br>")}
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  function showSummary(result) {
    const best = result.data[0];
    const reasons = best.explanation
      .sort((a,b)=>b.contribution-a.contribution)
      .slice(0,2)
      .map(r => r.criterion)
      .join(" and ");

    document.getElementById("summary-text").innerText =
      `${best.option} ranked first mainly due to ${reasons}.`;
  }

  function showMatrix(result, criteria) {
    const head = document.querySelector("#matrixTable thead");
    const body = document.querySelector("#matrixTable tbody");

    head.innerHTML =
      "<tr><th>Option</th>" +
      criteria.map(c => `<th>${c}</th>`).join("") +
      "<th>Total</th></tr>";

    body.innerHTML = "";

    result.data.forEach(item => {
      body.innerHTML +=
        "<tr>" +
        `<td>${item.option}</td>` +
        item.breakdown.map(s => `<td>${s}</td>`).join("") +
        `<td>${item.totalScore}</td>` +
        "</tr>";
    });
  }

});