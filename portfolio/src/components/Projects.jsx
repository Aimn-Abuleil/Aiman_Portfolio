import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import apiUrl from './config'; // ✅ added

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Projects = ({ header }) => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Fetch the Projects API
    fetch(`https://aiman-portfolio-backend.onrender.com/api/projects`, { method: 'GET' }) // ✅ replaced
      .then((res) => res.json())
      .then((res) => {
        const parsedProjects = res.projects.map((proj) => ({
          ...proj,
          links: typeof proj.links === 'string' ? JSON.parse(proj.links) : proj.links,
          tags: typeof proj.tags === 'string' ? JSON.parse(proj.tags) : proj.tags,
          image:
            proj.image && !proj.image.startsWith('http')
              ? `https://aiman-portfolio-backend.onrender.com/${proj.image}` // ✅ replaced
              : proj.image,
        }));

        setData({ projects: parsedProjects });
      })
      .catch((err) => console.error('Projects API error:', err));
  }, []);

  const numberOfItems = showMore && data ? data.projects.length : 6;

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.projects?.slice(0, numberOfItems).map((project) => (
                <Fade key={project.title}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>

            {!showMore && (
              <Button
                style={styles.showMoreStyle}
                variant={theme.bsSecondaryVariant}
                onClick={() => setShowMore(true)}
              >
                show more
              </Button>
            )}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
