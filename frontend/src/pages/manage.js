import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { PencilSquare, Trash, CheckCircle, XCircle, Search } from 'react-bootstrap-icons';
import '../css/manage.css';

const Manage = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    route: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    driverName: '',
    busNumber: '',
    
    contact: '',
    fare: '',
    frequency: '30',
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const apiUrl = 'http://localhost:5000/manage';

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    const results = buses.filter(bus =>
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBuses(results);
  }, [searchTerm, buses]);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(apiUrl);
      setBuses(res.data);
      setFilteredBuses(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMessage('Failed to fetch bus data');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({
      route: '',
      from: '',
      to: '',
      departureTime: '',
      arrivalTime: '',
      driverName: '',
      busNumber: '',
     
      contact: '',
      fare: '',
      frequency: '30',
    });
    setEditingId(null);
    setErrorMessage('');
  };

  const validateForm = () => {
    const requiredFields = ['route', 'from', 'to', 'departureTime', 'arrivalTime', 'driverName', 'busNumber'];
    for (let field of requiredFields) {
      if (!form[field]?.trim()) {
        setErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, form);
        setSuccessMessage('Bus route updated successfully!');
      } else {
        await axios.post(apiUrl, form);
        setSuccessMessage('New bus route added successfully!');
      }
      fetchBuses();
      clearForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to submit transport data');
    }
  };

  const handleEdit = (bus) => {
    setForm(bus);
    setEditingId(bus._id);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus route?')) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        setSuccessMessage('Bus route deleted successfully!');
        fetchBuses();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Delete error:', err);
        setErrorMessage('Failed to delete bus route');
      }
    }
  };


  return (
    <><Container className="manage-container">
      <Row className="header-row">
        <Col>
          <h2 className="page-title">Bus Route Management</h2>
          <p className="page-subtitle">Manage all bus routes in the transportation system</p>
        </Col>
      </Row>

      {/* Form Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5>{editingId ? 'Edit Bus Route' : 'Add New Bus Route'}</h5>
        </Card.Header>
        <Card.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="route" className="mb-3">
                  <Form.Label>Route Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="route"
                    value={form.route}
                    onChange={handleChange}
                    placeholder="e.g., Downtown Express"
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="from" className="mb-3">
                  <Form.Label>From*</Form.Label>
                  <div className="form-group-reverse">

                  <Form.Control
                    type="text"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    placeholder="Starting location"
                    required />
                    </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="to" className="mb-3">
                  <Form.Label>To*</Form.Label>
                  <div className="form-group-reverse">

                  <Form.Control
                    type="text"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    placeholder="Destination"
                    required />
                    </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="departureTime" className="mb-3">
                  <Form.Label>Departure Time*</Form.Label>
                  <Form.Control
                    type="time"
                    name="departureTime"
                    value={form.departureTime}
                    onChange={handleChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="arrivalTime" className="mb-3">
                  <Form.Label>Arrival Time*</Form.Label>
                  <Form.Control
                    type="time"
                    name="arrivalTime"
                    value={form.arrivalTime}
                    onChange={handleChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="frequency" className="mb-3">
                  <Form.Label>Frequency (minutes)</Form.Label>
                  <Form.Control
                    type="text"
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    placeholder="e.g.,1hr 30 mins" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="driverName" className="mb-3">
                  <Form.Label>Driver Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="driverName"
                    value={form.driverName}
                    onChange={handleChange}
                    placeholder="Driver's full name"
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="busNumber" className="mb-3">
                  <Form.Label>Bus Number*</Form.Label>
                  <Form.Control
                    type="text"
                    name="busNumber"
                    value={form.busNumber}
                    onChange={handleChange}
                    placeholder="Bus registration number"
                    required />
                </Form.Group>
              </Col>
              
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Group controlId="contact" className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Driver contact number" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="fare" className="mb-3">
                  <Form.Label>Fare (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="fare"
                    value={form.fare}
                    onChange={handleChange}
                    placeholder="Ticket price" />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              {editingId && (
                <Button variant="outline-secondary" onClick={clearForm}>
                  <XCircle className="me-1" /> Cancel
                </Button>
              )}
            <div className="text-center mt-3">
            <div className="text-center mt-3">
  <Button className="ai-btn" type="submit">
    <CheckCircle className="me-1" />
    {editingId ? 'Update Route' : 'Add Route'}
  </Button>
</div>
</div>

            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container><Container >
        {/* Bus Cards Section */}
        <Card className="list-card">
          <Card.Header className="list-header">
            <Row className="align-items-center">
              <Col md={6}>
                <h5>Current Bus Routes</h5>
              </Col>
              <Col md={6} className="search-col">
                <div className="search-container">
                  <Search className="search-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Search routes..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {filteredBuses.length === 0 ? (
              <Alert variant="info" className="no-data-message">
                {searchTerm ? 'No matching routes found' : 'No bus routes found. Add one to get started.'}
              </Alert>
            ) : (
              <div className="bus-cards-container">
                {filteredBuses.map((bus) => (
                  <Card key={bus._id} className="bus-card">
                    <Card.Header className="bus-card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="bus-card-title mb-0">
                          {bus.from} to {bus.to}
                        </h5>
                       
                      </div>
                    </Card.Header>
                    <Card.Body className="bus-card-body">
                      <div className="bus-card-row">
                        <span className="bus-card-label">Route:</span>
                        <span className="bus-card-value">{bus.route}</span>
                      </div>
                      <div className="bus-card-row">
                        <span className="bus-card-label">Driver:</span>
                        <span className="bus-card-value">{bus.driverName}</span>
                      </div>
                      <div className="bus-card-row">
                        <span className="bus-card-label">Bus No:</span>
                        <span className="bus-card-value">{bus.busNumber}</span>
                      </div>
                      <div className="bus-card-row">
                        <span className="bus-card-label">Timings:</span>
                        <span className="bus-card-value timing-value">
                          <span className="departure-value">{bus.departureTime}</span>
                          {' - '}
                          <span className="arrival-value">{bus.arrivalTime}</span>
                        </span>
                      </div>
                      <div className="bus-card-row">
                        <span className="bus-card-label">Contact:</span>
                        <span className="bus-card-value">{bus.contact}</span>
                      </div>
                      <div className="bus-card-row">
                        <span className="bus-card-label">Fare:</span>
                        <span className="bus-card-value">₹{bus.fare}</span>
                      </div>
                      <div className="bus-card-row">
                        <span className="bus-card-label">Frequency:</span>
                        <span className="bus-card-value">Every {bus.frequency} mins</span>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bus-card-footer">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(bus)}
                        className="action-button edit-button"
                      >
                        <PencilSquare /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(bus._id)}
                        className="action-button delete-button"
                      >
                        <Trash /> Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container></>
  );
};

export default Manage; 