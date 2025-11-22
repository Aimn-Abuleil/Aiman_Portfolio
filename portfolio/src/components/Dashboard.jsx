import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderDash from './HeaderDash';
import styled from 'styled-components';

// 🔹 Dashboard Main Container (Fixes Layout + Input Styling)
const DashboardContainer = styled.div`
  padding: 25px;
  max-width: 100%;
  margin: 0 auto;

  input,
  textarea,
  select {
    width: 100%;
    background: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.inputText};
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 10px;
    transition: 0.3s ease;

    &::placeholder {
      color: ${({ theme }) => theme.inputPlaceholder};
    }

    &:focus {
      border-color: ${({ theme }) => theme.accentColor};
      box-shadow: 0 0 5px ${({ theme }) => theme.accentColor}55;
    }
  }

  button {
    background: ${({ theme }) => theme.accentColor};
    color: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.85;
    }
  }
`;

// 🔹 Section Styling
const Section = styled.div`
  margin-bottom: 35px;

  h3 {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.color};
  }

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: ${({ theme }) => theme.accentColor};
  }
`;

function Dashboard() {
  const [userData, setUserData] = useState({ name: '', roles: [] });
  const [aboutData, setAboutData] = useState({ about: '', imageSource: '' });
  const [contactData, setContactData] = useState({ phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 🔹 Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('http://localhost:3001/api/users');
        const userJson = await userRes.json();
        const user = userJson[0];

        const rolesArray =
          typeof user.roles === 'string'
            ? JSON.parse(user.roles)
            : user.roles;

        setUserData({ name: user.name, roles: rolesArray });

        const aboutRes = await fetch('http://localhost:3001/api/about');
        const aboutJson = await aboutRes.json();
        setAboutData(aboutJson);

        const contactRes = await fetch('http://localhost:3001/api/contact');
        const contactJson = await contactRes.json();
        setContactData({
          phone: contactJson.phone,
          email: contactJson.email
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Handlers
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      setUserData({ ...userData, roles: value.split(',').map(r => r.trim()) });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleAboutChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageSource') {
      setAboutData({ ...aboutData, imageSource: files[0] });
    } else {
      setAboutData({ ...aboutData, [name]: value });
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  // 🔹 Update User
  const updateUser = async () => {
    setMessage('');
    try {
      await fetch('http://localhost:3001/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      setMessage('User updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update user.');
    }
  };

  // 🔹 Update About
  const updateAbout = async () => {
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('about', aboutData.about);
      if (aboutData.imageSource instanceof File)
        formData.append('image', aboutData.imageSource);

      await fetch('http://localhost:3001/api/about', {
        method: 'PUT',
        body: formData
      });
      setMessage('About updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update about.');
    }
  };

  // 🔹 Update Contact
  const updateContact = async () => {
    setMessage('');
    try {
      await fetch('http://localhost:3001/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      setMessage('Contact info updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update contact info.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header title="Dashboard" />
      <HeaderDash />

      <DashboardContainer>
        {/* USER SECTION */}
        <Section>
          <h3>Edit User Info</h3>

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleUserChange}
            placeholder="Enter name"
          />

          <label htmlFor="roles">Roles (comma separated):</label>
          <input
            id="roles"
            type="text"
            name="roles"
            value={userData.roles.join(',')}
            onChange={handleUserChange}
            placeholder="Enter roles"
          />

          <button onClick={updateUser}>Update User</button>
        </Section>

        {/* ABOUT SECTION */}
        <Section>
          <h3>Edit About Info</h3>

          <label htmlFor="about">Description:</label>
          <textarea
            id="about"
            name="about"
            rows={5}
            value={aboutData.about}
            onChange={handleAboutChange}
            placeholder="Enter about info"
          />

          <button onClick={updateAbout}>Update About</button>
        </Section>

        {/* CONTACT SECTION */}
        <Section>
          <h3>Edit Contact Info</h3>

          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={contactData.phone}
            onChange={handleContactChange}
            placeholder="Enter phone"
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleContactChange}
            placeholder="Enter email"
          />

          <button onClick={updateContact}>Update Contact Info</button>
        </Section>

        {message && <p className="message">{message}</p>}
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
