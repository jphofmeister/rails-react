import React from 'react';
import Rating from './Rating/Rating';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  position: relative;
`;
const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  padding: 20px 0 0 0;
  font-size: 18px;
`;
const Description = styled.div`
  padding: 0 0 20px 0;
  font-size: 14px;
`;

const Options = styled.div`
  position:absolute;
  right :15px;
  top: 15px;
  display: flex;
  flex-direction: columns;
`;

const Icon = styled.button`
  box-shadow: none;
  border-radius: 4px;
  margin: 0 4px;
  i {
    font-size: 18px;
  }
`;

const Review = (props) => {
  const { score, title, description } = props.attributes;

  return (
    <Card>
      <RatingContainer>
        <Rating score={score} />
      </RatingContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Options>
        <Icon onClick={props.handleDestroy.bind(this, props.id)}>
          <i className="fa fa-trash"></i>
        </Icon>
        <Icon>
          <i className="fa fa-pencil"></i>
        </Icon>
      </Options>
    </Card>
  );
};

export default Review;