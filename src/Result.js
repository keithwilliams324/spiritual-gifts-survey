import React from "react";

function Result({ answers }) {
  const categorySums = Object.keys(answers).reduce((sums, category) => {
    const total = Object.values(answers[category]).reduce(
      (sum, value) => sum + value,
      0
    );
    sums[category] = total;
    return sums;
  }, {});

  // Convert the categorySums object into an array of [category, sum] pairs and sort them
  const sortedCategories = Object.entries(categorySums).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div>
      <h2>Your Responses</h2>
      {sortedCategories.map(([category, sum], index) => (
        <div key={index} style={{ fontWeight: index < 3 ? "bold" : "normal" }}>
          <h3>{category}</h3>
          <p>Total: {sum}</p>
        </div>
      ))}
    </div>
  );
}

export default Result;
