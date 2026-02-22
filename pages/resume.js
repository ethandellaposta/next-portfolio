import { memo } from 'react';
import { SITE_URL, SITE_NAME, RESUME_CONTENT } from '@data/constants';
import SceneWrapper from '@components/layout/SceneWrapper';
import SectionHeader from '@components/atoms/SectionHeader';
import Badge from '@components/atoms/Badge';
import Button from '@components/atoms/Card';

function Resume() {
  const pageMeta = {
    title: `Resume — ${SITE_NAME}`,
    description:
      'Professional resume and experience of Ethan Della Posta, Senior Software Engineer specializing in radar systems, full-stack development, and real-time simulations.',
    ogTitle: `Resume — ${SITE_NAME}`,
    ogDescription:
      'View my professional experience, skills, and qualifications as a Senior Software Engineer.',
    canonical: `${SITE_URL}/resume`,
  };

  // Mock musicProps for resume page
  const musicProps = {
    isPlaying: false,
    hasPlayed: false,
    trackTitle: '',
    toggle: () => {},
    prev: () => {},
    next: () => {},
  };

  return (
    <SceneWrapper pageMeta={pageMeta} musicProps={musicProps}>
      <div className="resume">
        <section className="resumeHero">
          <div className="container">
            <h1>Resume</h1>
            <p>
              Senior Software Engineer with expertise in radar systems,
              full-stack development, and real-time simulations
            </p>
            <div className="resumeActions">
              <Button variant="primary" size="lg" href="/resume.pdf" download>
                Download PDF Resume
              </Button>
              <Button variant="secondary" size="lg" href="#contact">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>

        <section className="resumeContent">
          <div className="container">
            {/* ATS-Friendly Summary */}
            <div className="atsText">
              <h2>Professional Summary</h2>
              <p>
                Senior Software Engineer with 5+ years of experience developing
                mission-critical radar systems, interactive web applications,
                and real-time simulations. Expertise in React, Next.js, C++,
                Node.js, and cloud technologies. Proven track record of
                delivering high-performance software solutions for defense,
                aerospace, and commercial applications. Strong background in
                signal processing, algorithm development, and system
                architecture.
              </p>
            </div>

            {/* Experience */}
            <div className="resumeSection">
              <h2>Professional Experience</h2>
              {RESUME_CONTENT.experience.map((exp, i) => (
                <div key={i} className="experienceItem">
                  <div className="experienceHeader">
                    <h3>{exp.title}</h3>
                    <div className="experienceMeta">
                      <span>{exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="experienceHighlights">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="resumeSection">
              <h2>Technical Skills</h2>
              <div className="skillsGrid">
                {RESUME_CONTENT.skills.map((category, i) => (
                  <div key={i} className="skillsCategory">
                    <h3>{category.category}</h3>
                    <div className="skillsList">
                      {category.skills.map((skill, j) => (
                        <Badge key={j} variant="default" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="resumeSection">
              <h2>Education</h2>
              {RESUME_CONTENT.education.map((edu, i) => (
                <div key={i} className="educationItem">
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  <p>{edu.period}</p>
                  {edu.details && <p>{edu.details}</p>}
                </div>
              ))}
            </div>

            {/* Certifications */}
            {RESUME_CONTENT.certifications && (
              <div className="resumeSection">
                <h2>Certifications</h2>
                {RESUME_CONTENT.certifications.map((cert, i) => (
                  <div key={i} className="educationItem">
                    <h3>{cert.name}</h3>
                    <p>{cert.issuer}</p>
                    <p>{cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </SceneWrapper>
  );
}

export default memo(Resume);
