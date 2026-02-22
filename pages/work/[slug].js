import { useRouter } from 'next/router';
import { forwardRef, memo } from 'react';
import { SITE_URL, SITE_NAME, PROJECTS } from '@data/constants';
import SceneWrapper from '@components/layout/SceneWrapper';
import SectionHeader from '@components/atoms/SectionHeader';
import Badge from '@components/atoms/Badge';
import Button from '@components/atoms/Button';

function WorkCaseStudy({ ref }) {
  const router = useRouter();
  const { slug } = router.query;

  // Handle loading state
  if (!router.isReady) {
    return (
      <SceneWrapper>
        <div className="workCaseStudy">
          <div className="container">
            <p>Loading...</p>
          </div>
        </div>
      </SceneWrapper>
    );
  }

  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <SceneWrapper>
        <div className="workCaseStudy">
          <div className="container">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <Button variant="primary" href="/">
              ← Back to Portfolio
            </Button>
          </div>
        </div>
      </SceneWrapper>
    );
  }

  const pageMeta = {
    title: `${project.title} — Case Study | ${SITE_NAME}`,
    description: project.brief,
    ogTitle: `${project.title} — Project Case Study`,
    ogDescription: project.brief,
    ogImage: project.image || `${SITE_URL}/og-image.png`,
    canonical: `${SITE_URL}/work/${slug}`,
  };

  // Mock musicProps for work pages (no music on case studies)
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
      <div className="workCaseStudy">
        <section className="caseStudyHero">
          <div className="container">
            <div className="caseStudyHeader">
              <h1>{project.title}</h1>
              <p className="caseStudyDescription">{project.brief}</p>
              <div className="caseStudyMeta">
                <div className="caseStudyTech">
                  {Array.isArray(project.tech) &&
                    project.tech.map((tech, i) => (
                      <Badge key={i} variant="primary" size="sm">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="caseStudyContent">
          <div className="caseStudyGrid">
            <div className="caseStudyMain">
              <div className="caseStudySection">
                <h2>The Problem</h2>
                <p>{project.problem}</p>
              </div>

              <div className="caseStudySection">
                <h2>My Approach</h2>
                <p>{project.approach}</p>
              </div>

              <div className="caseStudySection">
                <h2>The Outcome</h2>
                <p>{project.outcome}</p>
              </div>

              {project.technicalArchitecture && (
                <div className="caseStudySection">
                  <h2>Technical Architecture</h2>
                  <p>{project.technicalArchitecture}</p>
                </div>
              )}

              {project.lessons && (
                <div className="caseStudySection">
                  <h2>Lessons Learned</h2>
                  <p>{project.lessons}</p>
                </div>
              )}
            </div>

            <div className="caseStudySidebar">
              <div className="caseStudyInfo">
                <h3>Project Details</h3>
                <div className="infoRow">
                  <span className="infoLabel">Category</span>
                  <span className="infoValue">{project.category}</span>
                </div>
                <div className="infoRow">
                  <span className="infoLabel">Technologies</span>
                </div>
                <div className="techList">
                  {Array.isArray(project.tech) &&
                    project.tech.map((tech, i) => (
                      <Badge key={i} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                </div>
                <div className="infoRow">
                  <span className="infoLabel">Year</span>
                  <span className="infoValue">{project.year || '2024'}</span>
                </div>
                <div className="infoRow">
                  <span className="infoLabel">Type</span>
                  <span className="infoValue">
                    {project.type || 'Personal Project'}
                  </span>
                </div>
              </div>

              <div className="caseStudyActions">
                <Button variant="primary" size="md" href={project.link} block>
                  View Live Project
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href={project.github}
                  block
                >
                  View Source Code
                </Button>
                <Button variant="ghost" size="md" href="/" block>
                  ← Back to Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SceneWrapper>
  );
}

export default memo(forwardRef(WorkCaseStudy));
