import React, { useState } from 'react';
import './addData.css';
import { Input, Button, useToast, Textarea, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';
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
    profileSummary: '',
    education: [],
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    let temp = { ...data };
    temp[e.target.name] = e.target.value;
    setData(temp);
  };
  const toast = useToast();
  const handleSubmit = async () => {
    let validate = submitValidation();
    if (validate === true) {
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
    } else {
      toast({
        title: 'Submit data failed!',
        description: 'You need to complete the blank input',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const submitValidation = () => {
    let isValid = true;
    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        isValid = false;
      }
    });
    return isValid;
  };
  const handleAdd = () => {
    let temp = { ...data };
    let tempObj = {
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      city: '',
      description: '',
    };
    temp.education.push(tempObj);
    setData(temp);
  };
  const handleSubChange = (e, i) => {
    let temp = { ...data };
    temp.education[i][e.target.name] = e.target.value;
    setData(temp);
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
              <Textarea height="200px" name="profileSummary" value={data.profileSummary} onChange={(event) => handleChange(event)} variant="filled" focusBorderColor="lime" />
            </Col>
          </Row>
        </div>
        <div className="add-data__education">
          <div className="section-title">
            <p>Education</p>
          </div>
          <Row>
            <Col lg="12">
              <p className="add-data-section__title">A varied education on your resume sums up the value that your learnings and background will bring to job</p>
              {data.education.length > 0 &&
                data.education.map((value, index) => {
                  return (
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <p>
                              {value.degree} at {value.school}
                            </p>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Row>
                            <Col lg="6">
                              <p className="add-data-section__title">School</p>
                              <Input name="school" value={value.school} onChange={(event) => handleSubChange(event, index)} variant="filled" focusBorderColor="lime" />
                            </Col>
                            <Col lg="6">
                              <p className="add-data-section__title">Degree</p>
                              <Input name="degree" value={value.degree} onChange={(event) => handleSubChange(event, index)} variant="filled" focusBorderColor="lime" />
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <p className="add-data-section__title">Start & End Date</p>
                              <Row>
                                <Col lg="6">
                                  <Input name="startDate" value={value.startDate} onChange={(event) => handleSubChange(event, index)} variant="filled" focusBorderColor="lime" />
                                </Col>
                                <Col lg="6">
                                  <Input name="endDate" value={value.endDate} onChange={(event) => handleSubChange(event, index)} variant="filled" focusBorderColor="lime" />
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="6">
                              <p className="add-data-section__title">City</p>
                              <Input name="city" value={value.city} onChange={(event) => handleSubChange(event, index)} variant="filled" focusBorderColor="lime" />
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <p className="add-data-section__title">Description</p>
                              <Textarea name="description" value={value.description} onChange={(event) => handleSubChange(event, index)} variant="filled" focusBorderColor="lime" />
                            </Col>
                          </Row>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              <Button onClick={handleAdd}>Add one more education</Button>
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
