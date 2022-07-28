import React, { useState, useEffect } from 'react';
import './editData.css';
import { Input, Button } from '@chakra-ui/react';
import { Row, Col } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditData = () => {
  const [data, setData] = useState({
    jobTitle: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    birthPlace: '',
    birthDate: '',
    profileSummary: '',
    id: '',
  });
  const { anak } = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3004/personalDetails/${anak}`);
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [anak]);
  const handleChange = (e) => {
    let temp = { ...data };
    temp[e.target.name] = e.target.value;
    setData(temp);
  };
  const handleUpdate = async () => {
    try {
      let putData = data;
      putData.id = anak;
      await axios.put(`http://localhost:3004/personalDetails/${putData.id}`, putData);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="edit-data__container">
        <div className="edit-data__title">
          <p>Create New CV</p>
        </div>
        <div className="edit-data__personal-details">
          <div className="section-title">
            <p>Personal Details</p>
          </div>
          <Row>
            <Col lg="6">
              <p className="edit-data-section__title">Wanted Job Title</p>
              <Input name="jobTitle" value={data.jobTitle} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="edit-data-section__title">First Name</p>
              <Input name="firstName" value={data.firstName} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="edit-data-section__title">Last Name</p>
              <Input name="lastName" value={data.lastName} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="edit-data-section__title">Email</p>
              <Input name="email" type="email" value={data.email} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="edit-data-section__title">Phone</p>
              <Input name="phone" type="number" value={data.phone} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="edit-data-section__title">Country</p>
              <Input name="country" value={data.country} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="edit-data-section__title">City</p>
              <Input name="city" value={data.city} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="edit-data-section__title">Address</p>
              <Input name="address" value={data.address} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="edit-data-section__title">Postal Code</p>
              <Input name="postalCode" value={data.postalCode} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <p className="edit-data-section__title">Place of Birth</p>
              <Input name="birthPlace" value={data.birthPlace} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
            <Col lg="6">
              <p className="edit-data-section__title">Date of Birth</p>
              <Input name="birthDate" value={data.birthDate} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
        </div>
        <div className="edit-data__profile-summary">
          <div className="section-title">
            <p>Profile Summary</p>
          </div>
          <Row>
            <Col lg="12">
              <p className="edit-data-section__title">Write 2-4 short & energetic sentences to interest the reader!</p>
              <Input height="200px" name="profileSummary" value={data.profileSummary} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
        </div>
        <div className="edit-data__button">
          <Button onClick={handleUpdate} colorScheme="blue" className="submit-button">
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

export default EditData;
