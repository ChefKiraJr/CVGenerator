import React, { useState } from 'react';
import './addData.css';
import { Input, Button } from '@chakra-ui/react';
import { Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddData = () => {
  const [data, setData] = useState({
    jobTitle: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    jobTitle: '',
    address: '',
    postalCode: '',
    birthPlace: '',
    birthDate: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    let temp = { ...data };
    temp[e.target.name] = e.target.value;
    setData(temp);
  };
  const handleSubmit = async () => {
    try {
      let postData = data;
      let unikId = new Date().getTime();
      postData.id = unikId;
      await axios.post('http://localhost:3004/personalDetails', postData);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="add-data__container">
        <div className="add-data__title">
          <p>Create New CV</p>
        </div>
        <div className="add-data__personal-details">
          <div className="section-title">
            <p>Personal Details</p>
          </div>
          <Row>
            <Col lg="6">
              <p className="add-data-section__title">Wanted Job Title</p>
              <Input name="jobTitle" value={data.jobTitle} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="add-data-section__title">First Name</p>
              <Input name="firstName" value={data.firstName} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="add-data-section__title">Last Name</p>
              <Input name="lastName" value={data.lastName} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="add-data-section__title">Email</p>
              <Input name="email" type="email" value={data.email} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="add-data-section__title">Phone</p>
              <Input name="phone" type="number" value={data.phone} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="add-data-section__title">Country</p>
              <Input name="country" value={data.country} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="add-data-section__title">City</p>
              <Input name="city" value={data.city} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="add-data-section__title">Address</p>
              <Input name="address" value={data.address} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="add-data-section__title">Postal Code</p>
              <Input name="postalCode" value={data.postalCode} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="add-data-section__title">Place of Birth</p>
              <Input name="birthPlace" value={data.birthPlace} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="add-data-section__title">Date of Birth</p>
              <Input name="birthDate" value={data.birthDate} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
        </div>
        <div className="add-data__profile-summary">
          <div className="section-title">
            <p>Profile Summary</p>
          </div>
          <Row>
            <Col lg="12">
              <p className="add-data-section__title">Write 2-4 short & energetic sentences to interest the reader!</p>
              <Input height="200px" name="birthPlace" value={data.birthPlace} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
        </div>
        <div className="add-data__button">
          <Button onClick={handleSubmit} colorScheme="blue" className="submit-button">
            Submit
          </Button>
          <Button onClick={() => navigate(`/`)} colorScheme="yellow" className="cancel-button">
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddData;
