import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
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
  const [points, setPoints] = useState(0);
  const [random, setRandom] = useState(0);
  const [choosen, setChoosen] = useState(-1);
  const [shouldShowTip, setShouldShowTip] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [hasChoosen, setHasChoosen] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setFragens(fragenList.sort(() => 0.5 - Math.random()).slice(0, 10));
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
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  if (!hasChoosen) {
                    setHasChoosen(true);
                    setChoosen(0);
                    setCorrect(random <= 0.5);
                    setShouldShowTip(!(random <= 0.5));
                    if (random <= 0.5) setPoints(points + fragens[currentIndex].cost);
                    setTimeout(() => {
                      if (currentIndex === fragens.length - 1) {
                        setShouldShowModal(true);
                      } else {
                        setCurrentIndex(currentIndex + 1);
                      }
                      setShouldShowTip(false);
                      setHasChoosen(false);
                      setCorrect(false);
                      setChoosen(-1);
                    }, 5000);
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
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  if (!hasChoosen) {
                    setHasChoosen(true);
                    setChoosen(1);
                    setCorrect(random > 0.5);
                    setShouldShowTip(!(random > 0.5));
                    if (random > 0.5) setPoints(points + fragens[currentIndex].cost);
                    setTimeout(() => {
                      if (currentIndex === fragens.length - 1) {
                        setShouldShowModal(true);
                      } else {
                        setCurrentIndex(currentIndex + 1);
                      }
                      setShouldShowTip(false);
                      setHasChoosen(false);
                      setCorrect(false);
                      setChoosen(-1);
                    }, 5000);
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
            </Col>
          </Row>
        </Row>
      </Container>
      <Modal isOpen={shouldShowModal} toggle={() => setShouldShowModal(!shouldShowModal)}>
        <ModalHeader>Resultados</ModalHeader>
        <ModalBody>
          <p>{`Sacaste ${points}/${fragens.reduce((a, i) => a + i.cost, 0)}`}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setCurrentIndex(0);
              setPoints(0);
              setRandom(Math.random());
              setChoosen(-1);
              setShouldShowTip(false);
              setShouldShowModal(false);
              setHasChoosen(false);
              setCorrect(false);
              setFragens(fragenList.sort(() => 0.5 - Math.random()).slice(0, 10));
            }}>
            Volver a jugar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default App;
