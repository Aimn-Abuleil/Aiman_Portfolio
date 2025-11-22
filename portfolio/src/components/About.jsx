import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import apiUrl from './config';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown>
      {text}
    </ReactMarkdown>
  );

  useEffect(() => {
    // Fetch About API directly
    fetch(`${apiUrl}/api/about`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        // If imageSource is relative, prepend backend URL
        if (res.imageSource && !res.imageSource.startsWith('http')) {
          res.imageSource = `${apiUrl}/${res.imageSource}`;
        }
        setData(res);
      })
      .catch((err) => console.log('API Fetch Error:', err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
