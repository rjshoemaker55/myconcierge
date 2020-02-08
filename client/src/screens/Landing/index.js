import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';
import { loadResults } from '../../loadResults';
import FormQuestion from '../../components/FormQuestion';
import './styles.css';

const Landing = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [destCity, setDestCity] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [depDate, setDepDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const questionList = [
    {
      mainHeader: (
        <span>
          <span className='small-sec'>welcome to</span> My Concierge.
        </span>
      ),
      secHeader: `What's your first name?`,
      name: 'firstName',
      value: firstName
    },
    {
      mainHeader: `Hello ${firstName}!`,
      secHeader: `Where are you headed? (city of airport)`,
      name: 'destCity',
      value: destCity
    },
    {
      mainHeader: (
        <span>
          Ahh {destCity}, <span className='small-sec'>great choice!</span>
        </span>
      ),
      secHeader: `Where are you leaving from? (city of airport)`,
      name: 'originCity',
      value: originCity
    },
    {
      mainHeader: `Got it. ${originCity} to ${destCity}.`,
      secHeader: `When are you leaving (YYYY-MM-DD)?`,
      name: 'depDate',
      value: depDate
    },
    {
      mainHeader: 'Last step!',
      secHeader: `When will you be returning (YYYY-MM-DD)?`,
      name: 'returnDate',
      value: returnDate
    }
  ];

  // Sets current question to the question data with index of question number in state
  let currentQuestion = questionList[questionNumber];

  // Sets data in state based on input changes
  const handleChange = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'destCity':
        setDestCity(e.target.value);
        break;
      case 'originCity':
        setOriginCity(e.target.value);
        break;
      case 'depDate':
        setDepDate(e.target.value);
        break;
      case 'returnDate':
        setReturnDate(e.target.value);
        break;
    }
  };

  // Initiates handleFinish if all questions have been answereed
  // If not, icreases question number by 1, and sets the currentQuestion so the displayed question changes
  const handleSubmit = async e => {
    e.preventDefault();

    if (questionNumber === 4) {
      return handleFinish();
    }

    await setQuestionNumber(questionNumber + 1);
    currentQuestion = questionList[questionNumber];
  };

  // Calls loadResults function with all input data, then redirects to results page and sends the response as props
  const handleFinish = () => {
    setShowModal(true);
    loadResults({ firstName, destCity, originCity, depDate, returnDate }).then(
      res => {
        // console.log(res);
        // history.push({
        //   pathname: '/results',
        //   state: res
        // });
      }
    );
  };

  return (
    <div className='main-div'>
      <FormQuestion
        mainHeader={currentQuestion.mainHeader}
        secHeader={currentQuestion.secHeader}
        name={currentQuestion.name}
        onChange={handleChange}
        onSubmit={handleSubmit}
        value={currentQuestion.value}
      />
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Please wait while we load your results...</Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default Landing;