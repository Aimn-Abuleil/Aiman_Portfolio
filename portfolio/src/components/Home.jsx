import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal/Fade';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import apiUrl from './config';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://aiman-portfolio-backend.onrender.com/api/users`)
      .then((res) => res.json())
      .then((res) => {
        // If backend returns an array, take the first user
        const user = Array.isArray(res) ? res[0] : res;

        // Parse roles if they are returned as string
        if (user.roles && typeof user.roles === 'string') {
          user.roles = JSON.parse(user.roles);
        }

        setData(user);
      })
      .catch((err) => console.log('API Error:', err));
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data.name}</h1>
        <div>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data.roles || [],
            }}
          />
        </div>
        <Social />
      </div>
    </Fade>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
