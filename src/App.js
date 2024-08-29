import React, { useState } from "react";
import Questionnaire from "./Questionnaire.js";
import Result from "./Result";
import { Box, Typography } from "@mui/material";
import logo from './FBFW_Logos-Full-Stacked.png';

function App() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswers = (newAnswers) => {
    setAnswers(newAnswers);
    setShowResult(true);
  };

  return (
    <div className="App">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
        <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Spiritual Gifts Assessment
        </Typography>
        <Typography style={{ maxWidth: '600px', textAlign: 'center'}}>This is not a test, so there are no wrong answers. Please rate yourself on a scale from 1 to 5, where 1 means ‘Not at all characteristic of me’ and 5 means ‘Highly characteristic of me.'</Typography>
        {!showResult ? (
          <Questionnaire onComplete={handleAnswers} />
        ) : (
          <Result answers={answers} />
        )}
      </Box>
    </div>
  );
}

export default App;
