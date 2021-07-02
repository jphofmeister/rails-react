import React from 'react';
import styled from 'styled-components';
import Gray from './Stars/Gray';
import Hover from './Stars/Hover';
import Selected from './Stars/Selected';

const RatingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 20px 0 30px 0;
  border: 1px solid #e6e6e6;
  background: #fff;
  margin: 12px 0;
`;

const RatingBox = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  input:checked ~ label,
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
  }

  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
  }
`;

const Field = styled.div`
  border-radius: 4px;
  width: 100%;

  input {
    min-height: 50px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 12px 0;
    padding: 12px;
    width: calc(100% - 26px);
  }

  textarea {
    width: 100%;
    min-height: 80px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 12px 0;
    padding: 12px;
  }
`;


const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
  background: #000;
  height: 100vh;
  padding-top: 100px;
`;

const SubmitBtn = styled.button`
  color: #fff;
  background: #71b406;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  border: 1px solid #71b406;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #71b406;
    /* color: #000; */
    border: 1px solid #71b406;
  }
`;

const Headline = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`;

const RatingTitle = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const ReviewForm = (props) => {
  const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
    return (
      <React.Fragment key={index}>
        <input
          type="radio"
          value={score}
          checked={props.review.score == score}
          name="rating"
          onChange={() => console.log('selected:', score)}
          id={`rating-${score}`} />
        <label onClick={props.setRating.bind(this, score)}></label>
      </React.Fragment>
    );
  });

  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <Headline>Have an experience with {props.attributes.name}? Share your review!</Headline>
        <Field>
          <input
            type="text"
            name="title"
            onChange={props.handleChange}
            value={props.review.title || ""}
            placeholder="Review title" />
        </Field>

        <Field>
          <input
            type="text"
            name="description"
            onChange={props.handleChange}
            value={props.review.description || ""}
            placeholder="Review description" />
        </Field>

        <Field>
          <RatingContainer>
            <RatingTitle>Rate This Airline:</RatingTitle>
            <RatingBox>
              {ratingOptions}
            </RatingBox>
          </RatingContainer>
        </Field>

        <SubmitBtn type="submit">Submit Your Review</SubmitBtn>

      </form>
    </Wrapper>
  );
};

export default ReviewForm;