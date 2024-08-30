import React from "react";
import { Card, CardContent, CardHeader, Typography, Grid } from "@mui/material";

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
      <Typography variant="h4" gutterBottom>
        Your Responses
      </Typography>
      <Grid container spacing={2}>
        {sortedCategories.map(([category, sum], index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardHeader
                title={category}
                titleTypographyProps={{ variant: 'h5', style: { fontWeight: index < 3 ? "bold" : "normal" } }}
              />
              <CardContent>
                <Typography variant="body">
                  {sum}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Result;
