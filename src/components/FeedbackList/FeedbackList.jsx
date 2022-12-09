import React from 'react';
import PropTypes from 'prop-types';

import FeedbackItem from './../FeedbackItem/FeedbackItem';

const FeedbackList = ({ feedbacks }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div className='feedback-list'>
      {feedbacks.map((feedback, index) => (
        <FeedbackItem key={index} feedback={feedback} />
      ))}
    </div>
  );
};

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }),
  ),
};

export default FeedbackList;