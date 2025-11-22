import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import Fade from 'react-reveal';
import PropTypes from 'prop-types';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import apiUrl from './config'; // ✅ added
import './Contact.css';

function Contact({ header }) {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/api/contact`) // ✅ replaced
      .then((res) => res.json())
      .then((data) => {
        setContactInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    fetch(`${apiUrl}/api/contact`, { // ✅ replaced
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to submit form');
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        });
      })
      .catch(() => {
        setError('Form submission failed. Try again.');
      });
  };

  if (loading) return <FallbackSpinner />;

  return (
    <>
      <Header title={header} />
      <div className="contact-section">
        <Container fluid style={{ maxWidth: '1200px' }}>
          <Fade>
            <Row className="g-4">
              {/* Contact Info - 4 Columns */}
              <Col lg={4} md={12} sm={12}>
                {contactInfo && (
                  <div className="contact-info-box p-3 shadow-sm rounded">
                    <h4>Contact Information</h4>

                    <p>
                      <strong>Phone:</strong>
                      <br />
                      <a href={`tel:${contactInfo.phone}`} className="contact-link">
                        {contactInfo.phone}
                      </a>
                    </p>

                    <p>
                      <strong>Email:</strong>
                      <br />
                      <a href={`mailto:${contactInfo.email}`} className="contact-link">
                        {contactInfo.email}
                      </a>
                    </p>
                  </div>
                )}
              </Col>

              {/* Contact Form - 8 Columns */}
              <Col lg={8} md={12} sm={12}>
                <div className="contact-form-box p-3 shadow-sm rounded">
                  <h4>Send a Message</h4>

                  {success && <Alert variant="success">Message sent successfully!</Alert>}
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="btn-custom mt-3 w-100">
                      Send
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Fade>
        </Container>
      </div>
    </>
  );
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
