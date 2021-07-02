import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import ReviewForm from './ReviewForm';
import Review from './Review';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`;

const Main = styled.div`
  padding-left: 50px;
`;

const Airline = (props) => {
  const [airline, setAirline] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ title: '', description: '', score: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;

    axios.get(url)
      .then(res => {
        setAirline(res.data);
        setReviews(res.data.included);
        setLoaded(true);
      })
      .catch(res => console.log(res));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    const airline_id = airline.data.id;

    axios.post('/api/v1/reviews', { review, airline_id })
      .then(res => {
        // const included = [...airline.included, res.data.data];
        setReviews([...reviews, res.data.data]);
        // setAirline({ ...airline, included });
        setReview({ title: '', description: '', score: 0 });
      })
      .catch(res => { });
  };

  const handleDestroy = (id, e) => {
    e.preventDefault();

    axios.delete(`/api/v1/reviews/${id}`)
      .then((data) => {
        const included = [...reviews];
        const index = included.findIndex(data => data.id === id);
        included.splice(index, 1);

        setReviews(included);
      })
      .catch(data => console.log('Error', data));
  };

  const setRating = (score, e) => {
    e.preventDefault();

    setReview({ ...review, score });
  };

  let userReviews;

  if (reviews && reviews.length > 0) {
    userReviews = reviews.map((item, index) => {
      return (
        <Review
          key={index}
          id={item.id}
          attributes={item.attributes}
          handleDestroy={handleDestroy}
        />
      );
    });
  }

  return (
    <Wrapper>
      {loaded &&
        <>
          <Column>
            <Main>
              <Header attributes={airline.data.attributes} reviews={reviews} />
              {userReviews}
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={airline.data.attributes}
              review={review}
            />
          </Column>
        </>
      }
    </Wrapper>
  );
};

export default Airline;