import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import './dataPreview.css';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import RightSectionDua from './components/RightSectionDua';
// import LeftSection from './components/LeftSection';
// import Details from './components/Details';
import ProfileSummary from './components/ProfileSummary';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@chakra-ui/react';

const Details = lazy(() => import('./components/Details'));
const LeftSection = lazy(() => import('./components/LeftSection'));

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
  const printDocument = async () => {
    const input = document.getElementById('dataPrint');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 0, 0, pdfWidth, pdfHeight);
    pdf.save('cv.pdf');
  };
  return (
    <>
      {data && (
        <>
          <div className="data-preview__container" id="dataPrint">
            <div className="data-preview__header">
              <p className="data-preview__name">
                {data.firstName} {data.lastName}
              </p>
              <p className="data-preview__job-title">{data.jobTitle}</p>
            </div>
            <div className="data-preview__content">
              <Row>
                <Col lg="3">
                  <Suspense fallback={<div>Loading...</div>}>
                    {data.address && <Details data={data} />}
                    {data.skills && data.skills.length > 0 && <LeftSection data={data} title={'Skills'} />}
                    {data.languages && data.languages.length > 0 && <LeftSection data={data} title={'Languages'} />}
                  </Suspense>
                </Col>
                <Col lg="9">
                  {data.profileSummary && <ProfileSummary data={data} />}
                  {data.education && data.education.length > 0 && <RightSectionDua data={data} title={'Education'} />}
                  {data.workExperience && data.workExperience.length > 0 && <RightSectionDua data={data} title={'Working Experience'} />}
                  {data.organizationExperience && data.organizationExperience.length > 0 && <RightSectionDua data={data} title={'Organization Experience'} />}
                </Col>
              </Row>
            </div>
          </div>
          <div className="download-button">
            <Button onClick={printDocument}>Download as PDF</Button>
          </div>
        </>
      )}
    </>
  );
};
export default DataPreview;
