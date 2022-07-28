import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dataPreview.css';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const DataPreview = () => {
  const [data, setData] = useState();
  const { anak } = useParams();
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
  return (
    <>
      {data && (
        <div className="data-preview__container">
          <div className="data-preview__header">
            <p className="data-preview__name">
              {data.firstName} {data.lastName}
            </p>
            <p className="data-preview__job-title">{data.jobTitle}</p>
          </div>
          <div className="data-preview__content">
            <Row>
              <Col lg="3">
                <div className="data-preview__details">
                  <p className="data-preview__section-title">Details</p>
                  <div className="data-preview__section-detail">
                    <p className="data-preview__detail-title">Address</p>
                    <p className="data-preview__detail-desc">{data.address}</p>
                    <p className="data-preview__detail-desc">
                      {data.city}, {data.postalCode}
                    </p>
                  </div>
                  <div className="data-preview__section-detail">
                    <p className="data-preview__detail-title">Phone</p>
                    <p className="data-preview__detail-desc">{data.phone}</p>
                  </div>
                  <div className="data-preview__section-detail">
                    <p className="data-preview__detail-title">Email</p>
                    <p className="data-preview__detail-desc">{data.email}</p>
                  </div>
                  <div className="data-preview__section-detail">
                    <p className="data-preview__detail-title">Data / Place of birth</p>
                    <p className="data-preview__detail-desc">{data.birthDate}</p>
                    <p className="data-preview__detail-desc">{data.birthPlace}</p>
                  </div>
                  <div className="data-preview__section-detail">
                    <p className="data-preview__detail-title">Nationality</p>
                    <p className="data-preview__detail-desc">{data.country}</p>
                  </div>
                </div>
              </Col>
              <Col lg="9">
                <div className="data-preview__profile-summary">
                  <p className="data-preview__section-title">Profile</p>
                  <p className="data-preview__detail-desc">{data.profileSummary}</p>
                </div>
                {data.education && data.education.length > 0 && (
                  <div className="data-preview__education">
                    <p className="data-preview__section-title">Education</p>
                    {data.education.map((value, i) => {
                      return (
                        <>
                          <p className="data-preview__detail-desc">
                            {value.school}, {value.degree}
                          </p>
                          <p className="data-preview__detail-desc">
                            {value.startDate} - {value.endDate}
                          </p>
                          <p className="data-preview__detail-desc">{value.description}</p>
                        </>
                      );
                    })}
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};
export default DataPreview;
