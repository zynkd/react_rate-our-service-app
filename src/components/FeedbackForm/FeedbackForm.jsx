import { useState, useContext, useEffect } from 'react';
import FeedbackContext from '../../contexts/FeedbackContext';

import Button from '../shared/Button/Button';
import Card from '../shared/Card/Card';
import './FeedbackForm.scss';
import SelectRating from '../SelectRating/SelectRating';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEditState, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEditState.editMode === true) {
      setBtnDisabled(false);
      setText(feedbackEditState.feedback.text);
      setRating(feedbackEditState.feedback.rating);
    }
  }, [feedbackEditState]);

  const handleTextChange = (e) => {
    if (e.target.value === '') {
      console.log('empty string');
      setBtnDisabled(true);
      setMessage(null);
    } else if (e.target.value !== '' && e.target.value.trim().length < 10) {
      setMessage('Text must be at least 10 characters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Additional input sanitation, because there are ways
    // to enable button on the client and submit the form
    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEditState.editMode === true) {
        updateFeedback(feedbackEditState.feedback.id, newFeedback);
      } else {
        // if there's nothing to be edited, just add it as before
        addFeedback(newFeedback);
      }

      // Note: reset the form to default state after submission
      setText('');
      setRating(10);
      setBtnDisabled(true);
      feedbackEditState.editMode = false;
    }
  };

  return (
    <Card>
      <form onSubmit={handleFormSubmit} className='feedback-form'>
        <h1 className='feedback-form__title'>
          How would you rate our service?
        </h1>

        <SelectRating rating={rating} setRating={setRating} />

        <div className='feedback-form__input-group'>
          <input
            className='feedback-form__text'
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />

          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='feedback-form__message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
