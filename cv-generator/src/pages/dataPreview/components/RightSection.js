import React, { useEffect, useState } from 'react';

const RightSection = ({ data, title }) => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    if (title === 'Working Experience') {
      setValue(data.workExperience);
    } else if (title === 'Education') {
      setValue(data.education);
    }
  }, [title]);
  return (
    <div className="data-preview__section">
      <p className="data-preview__section-title">{title}</p>
      {value.length > 0 &&
        value.map((each, index) => {
          return (
            <>
              <p className="data-preview__detail-desc">
                {title === 'Education' && `${each.school}, ${each.degree}`}
                {title === 'Working Experience' && `${each.jobTitle}, ${each.employer}`}
              </p>
              <p className="data-preview__detail-desc">
                {each.startDate} - {each.endDate}
              </p>
              <p className="data-preview__detail-desc">{each.description}</p>
            </>
          );
        })}
    </div>
  );
};

export default RightSection;
