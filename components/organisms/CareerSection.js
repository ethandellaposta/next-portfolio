import { forwardRef, memo } from 'react';
import SectionHeader from '@components/atoms/SectionHeader';
import { RESUME_CONTENT } from '@data/constants';

function CareerSection({}, ref) {
  return (
    <section ref={ref} className="region career" data-reveal id="career">
      <SectionHeader
        number="02"
        title="Career"
        description="Scroll to explore my roles and the projects I shipped at each"
      />
      
      <div className="careerContent">
        {RESUME_CONTENT.experience.map((exp, index) => (
          <div key={index} className="careerItem">
            <div className="careerTimeline">
              <div className="careerPeriod">{exp.period}</div>
            </div>
            <div className="careerDetails">
              <h3 className="careerTitle">{exp.title}</h3>
              <div className="careerCompany">{exp.company}</div>
              <p className="careerDescription">{exp.highlights[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(forwardRef(CareerSection));
