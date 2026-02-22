import { forwardRef, memo } from 'react';
import { SELECTED_WORK } from '@data/constants';
import SectionHeader from '@components/atoms/SectionHeader';
import Card from '@components/atoms/Card';
import Badge from '@components/atoms/Badge';

function SelectedWorkSection(ref) {
  return (
    <section ref={ref} className="selectedWork" id="selected-work">
      <div className="container">
        <SectionHeader
          title="Selected Work"
          subtitle="Flagship projects that showcase my expertise in radar systems, simulations, and AI tools"
        />

        <div className="selectedWorkGrid stagger-children">
          {SELECTED_WORK.map(work => (
            <Card
              key={work.id}
              variant="elevated"
              hover
              className="selectedWorkCard fade-in"
            >
              <div className="selectedWorkContent">
                <h3 className="selectedWorkTitle">{work.title}</h3>
                <p className="selectedWorkBrief">{work.brief}</p>

                <div className="selectedWorkImpact">
                  <span className="impactLabel">Impact:</span>
                  <span className="impactValue">{work.impact}</span>
                </div>

                <div className="selectedWorkTech">
                  {work.tech.map((tech, i) => (
                    <Badge key={i} variant="primary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <a href={work.link} className="selectedWorkLink">
                  View Case Study →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(forwardRef(SelectedWorkSection));
