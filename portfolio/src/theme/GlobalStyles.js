import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: all 0.5s linear;
  }
/* Dashboard page inputs */
.dashboard-form-box input,
.dashboard-form-box textarea,
.dashboard-form-box select {
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 15px;
  width: 100%;
  transition: all 0.3s ease;
}

.dashboard-form-box input::placeholder,
.dashboard-form-box textarea::placeholder {
  color: ${({ theme }) => theme.inputPlaceholder};
  opacity: 0.7;
}

.dashboard-form-box input:focus,
.dashboard-form-box textarea:focus,
.dashboard-form-box select:focus {
  border-color: ${({ theme }) => theme.accentColor};
  box-shadow: 0 0 5px ${({ theme }) => theme.accentColor}66;
  outline: none;
}

.dashboard-form-box label {
  color: ${({ theme }) => theme.accentColor};
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
}

.dashboard-form-box button {
  background-color: ${({ theme }) => theme.accentColor};
  color: ${({ theme }) => theme.inputText};
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 5px;
}

.dashboard-form-box button:hover {
  background-color: ${({ theme }) => theme.accentColor}cc;
}

.dashboard-form-box h3 {
  margin-bottom: 15px;
  color: ${({ theme }) => theme.color};
}

.dashboard-form-box + .dashboard-form-box {
  margin-top: 30px;
}

  .contact-form-box input,
  .contact-form-box textarea,
  .contact-form-box select {
    background-color: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.inputText};
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 8px;
    padding: 10px 12px;
    transition: all 0.3s ease;
  }

  .contact-form-box input::placeholder,
  .contact-form-box textarea::placeholder {
    color: ${({ theme }) => theme.inputPlaceholder};
    opacity: 0.7;
  }

  .contact-form-box input:focus,
  .contact-form-box textarea:focus {
    border-color: ${({ theme }) => theme.accentColor};
    box-shadow: 0 0 5px ${({ theme }) => theme.accentColor}66;
    outline: none;
  }

  .contact-form-box label {
    color: ${({ theme }) => theme.accentColor};
    font-weight: 500;
  }

  .contact-link {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
  }

  .contact-link:hover {
    text-decoration: underline;
  }
`;

export default GlobalStyles;
