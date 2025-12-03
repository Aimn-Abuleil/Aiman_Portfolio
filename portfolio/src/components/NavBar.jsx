  import React, { useEffect, useState, useContext } from 'react';
  import { Navbar, Nav, Container } from 'react-bootstrap';
  import { withRouter } from 'react-router';
  import { NavLink } from 'react-router-dom';
  import styled, { ThemeContext } from 'styled-components';
  import endpoints from '../constants/endpoints';
  import ThemeToggler from './ThemeToggler';

  const styles = { logoStyle: { width: 50, height: 40 } };

  const ExternalNavLink = styled.a`
    color: ${(props) => props.theme.navbarTheme.linkColor};
    &:hover {
      color: ${(props) => props.theme.navbarTheme.linkHoverColor};
    }
    &::after {
      background-color: ${(props) => props.theme.accentColor};
    }
  `;

  const InternalNavLink = styled(NavLink)`
    color: ${(props) => props.theme.navbarTheme.linkColor};
    &:hover {
      color: ${(props) => props.theme.navbarTheme.linkHoverColor};
    }
    &::after {
      background-color: ${(props) => props.theme.accentColor};
    }
    &.navbar__link--active {
      color: ${(props) => props.theme.navbarTheme.linkActiveColor};
    }
  `;

  const NavBar = () => {
    const theme = useContext(ThemeContext);
    const [data, setData] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      fetch(endpoints.navbar)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }, []);

    return (
      <Navbar
        fixed="top"
        expand="md"
        bg="dark"
        variant="dark"
        className="navbar-custom"
        expanded={expanded}
      >
        <Container>
          {data?.logo && (
            <Navbar.Brand href="/">
              <img
                src={data.logo.source}
                alt="logo"
                style={
                  data.logo.height && data.logo.width
                    ? { height: data.logo.height, width: data.logo.width }
                    : styles.logoStyle
                }
              />
            </Navbar.Brand>
          )}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {data?.sections?.map((section, index) => (
                section.type === 'link' ? (
                  <ExternalNavLink
                    key={section.title}
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    theme={theme}
                  >
                    {section.title}
                  </ExternalNavLink>
                ) : (
                  <InternalNavLink
                    key={section.title}
                    exact={index === 0}
                    activeClassName="navbar__link--active"
                    to={section.href}
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    theme={theme}
                  >
                    {section.title}
                  </InternalNavLink>
                )
              ))}
              <ThemeToggler onClick={() => setExpanded(false)} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  export default withRouter(NavBar);
