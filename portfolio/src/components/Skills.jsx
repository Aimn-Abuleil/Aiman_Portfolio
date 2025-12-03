import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import apiUrl from './config';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Skills({ header }) {
  const [data, setData] = useState(null);

  // Static intro paragraph
  const intro = `I love to learn new things and experiment with new technologies.
These are some of the major languages, technologies, tools and platforms I have worked with:`;

  useEffect(() => {
    fetch(`https://aiman-portfolio-backend.onrender.com/api/skills`) // Directly fetch the skills API
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <p style={styles.introTextContainer}>{intro}</p>

          {data ? (
            <Fade>
              {Object.keys(data).map((category) => (
                <div key={category}>
                  <br />
                  <h3>{category}</h3>
                  {data[category].map((item) => (
                    <div key={item.id} style={{ display: 'inline-block' }}>
                      <img
                        style={styles.iconStyle}
                        src={`https://aiman-portfolio-backend.onrender.com/${item.icon}`} // prepend apiUrl here
                        alt={item.title}
                      />
                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
