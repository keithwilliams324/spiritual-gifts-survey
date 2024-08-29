import React, { useState } from "react";
import { questions } from "./Questions";
import {
  Button,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const randomizedQuestions = shuffleArray(
  questions.flatMap((categoryObj) =>
    categoryObj.questions.map((question) => ({
      ...question,
      category: categoryObj.category,
    }))
  )
);

function Questionnaire({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleChange = (category, questionIndex, value) => {
    setAnswers({
      ...answers,
      [category]: {
        ...answers[category],
        [questionIndex]: value,
      },
    });
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onComplete(answers);
  };

  const totalQuestions = randomizedQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const currentCategory = randomizedQuestions[currentQuestion].category;
  const currentAnswer = answers[currentCategory]?.[currentQuestion] || "";

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2} p={2}>
        <Card style={{ display: "inline-block" }}>
          <CardHeader
            title={randomizedQuestions[currentQuestion].text}
          ></CardHeader>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h7" mr={2}>
              Least characteristic of me
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={currentAnswer}
                  onChange={(e) =>
                    handleChange(
                      currentCategory,
                      currentQuestion,
                      parseInt(e.target.value)
                    )
                  }
                >
                  {randomizedQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option.toString()}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
              <Typography variant="h7" ml={1}>
              Most characteristic of me
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box mb={2} p={2} display="flex" justifyContent="center">
        <Box mr={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={currentQuestion === totalQuestions - 1}
        >
          Next
        </Button>
      </Box>
      <Box mb={2} p={2} textAlign="center">
        <Typography variant="body1">
          Progress: {Math.round(progress)}%
        </Typography>
        <progress value={progress} max="100"></progress>
      </Box>
      {currentQuestion === totalQuestions - 1 && (
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      )}
    </form>
  );
}

export default Questionnaire;
