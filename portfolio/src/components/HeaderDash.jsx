import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid ${({ theme }) => theme.cardBorderColor};
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color};
  font-weight: normal;
  transition: all 0.3s ease;

  &.active {
    color: ${({ theme }) => theme.accentColor};
    font-weight: bold;
  }

  &:hover {
    color: ${({ theme }) => theme.accentColor};
  }
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
`;

function HeaderDash() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    history.push('/');
  };

  if (!isLoggedIn) return null;

  return (
    <HeaderWrapper>
      <Nav>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/dashboardProjects">Projects</StyledLink>
        <StyledLink to="/skillDash">Skills</StyledLink>
        <StyledLink to="/formdata">Formdata</StyledLink>
      </Nav>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderWrapper>
  );
}

export default HeaderDash;
