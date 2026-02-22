import { forwardRef, memo } from 'react';
import { ABOUT_CONTENT } from '@data/constants';
import SectionHeader from '@components/atoms/SectionHeader';

function AboutSection(ref) {
  return (
    <section ref={ref} className="about" id="about">
      <div className="container">
        <SectionHeader
          title={ABOUT_CONTENT.title}
          subtitle="Senior software engineer bridging mission-critical systems and creative technology"
        />

        <div className="aboutContent">
          <div className="aboutBio">
            <p>{ABOUT_CONTENT.bio}</p>
          </div>

          <div className="aboutSections">
            <div className="aboutSection">
              <h3>{ABOUT_CONTENT.current.title}</h3>
              <ul className="aboutList">
                {ABOUT_CONTENT.current.projects.map((project, i) => (
                  <li key={i}>{project}</li>
                ))}
              </ul>
            </div>

            <div className="aboutSection">
              <h3>{ABOUT_CONTENT.next.title}</h3>
              <ul className="aboutList">
                {ABOUT_CONTENT.next.interests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="aboutCtas">
            <a href="/resume" className="ctaPrimary">
              View Resume
            </a>
            <a href="#contact" className="ctaSecondary">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(forwardRef(AboutSection));
