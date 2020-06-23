import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { fragenList } from "./data";

const App = () => {
  const [fragens, setFragens] = useState([
    {
      pregunta: "",
      correct: "",
      wrong: "",
      why: "",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [random, setRandom] = useState(0);
  const [shouldShowTip, setShouldShowTip] = useState(false);
  const [hasChoosen, setHasChoosen] = useState(false);
  const [choosen, setChoosen] = useState(-1);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setFragens(fragenList.sort(() => 0.5 - Math.random()).slice(0, 5));
  }, [setCurrentIndex]);

  useEffect(() => {
    setRandom(Math.random());
  }, []);

  return (
    <Container fluid id="app-container">
      <Container id="question-container">
        <Row id="row-complete">
          <Row id="fragen">
            <h1>
              {hasChoosen
                ? correct
                  ? "✔ Sehr Gut!"
                  : "❌Das ist falsch"
                : fragens[currentIndex].pregunta}
            </h1>
          </Row>
          <Row id="fragen-options">
            <Col xs="12" md="6" lg="6" className="option-container">
              <div
                onClick={() => {
                  if (!hasChoosen) {
                    setHasChoosen(true);
                    setChoosen(0);
                    setCorrect(random <= 0.5);
                    setShouldShowTip(!(random <= 0.5));
                    setInterval(() => {
                      setShouldShowTip(false);
                      setCurrentIndex(currentIndex + 1);
                      setHasChoosen(false);
                      setCorrect(false);
                      setChoosen(-1);
                    }, 2500);
                  }
                }}
                className={`option clickable ${
                  hasChoosen ? (random <= 0.5 ? "correct" : "wrong") : null
                } ${choosen === 0 ? "selected" : ""}`}>
                <p>{random <= 0.5 ? fragens[currentIndex].correct : fragens[currentIndex].wrong}</p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="6" className="option-container">
              <div
                onClick={() => {
                  if (!hasChoosen) {
                    setHasChoosen(true);
                    setChoosen(1);
                    setCorrect(random > 0.5);
                    setShouldShowTip(!(random > 0.5));
                    setInterval(() => {
                      setShouldShowTip(false);
                      setCurrentIndex(currentIndex + 1);
                      setHasChoosen(false);
                      setCorrect(false);
                      setChoosen(-1);
                    }, 2500);
                  }
                }}
                className={`option clickable ${
                  hasChoosen ? (random > 0.5 ? "correct" : "wrong") : null
                } ${choosen === 1 ? "selected" : ""}`}>
                <p>{random > 0.5 ? fragens[currentIndex].correct : fragens[currentIndex].wrong}</p>
              </div>
            </Col>
          </Row>
          <Row id="tip-container">
            <Col xs="12">
              <p hidden={!shouldShowTip}>
                <span role="img" aria-labelledby="bulb">
                  💡
                </span>
                {` ${fragens[currentIndex].why}`}
              </p>
              <Button
                onClick={() => {
                  Alert("terminaste con esto gei <3");
                }}
                color="success">
                Terminar y ver mi puntuacion
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
};

export default App;
