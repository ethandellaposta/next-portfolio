import { memo } from 'react';
import { SITE_URL, SITE_NAME } from '@data/constants';
import SceneWrapper from '@components/layout/SceneWrapper';
import MonitoringBadge from '@components/atoms/MonitoringBadge';
import Button from '@components/atoms/Card';

function Status() {
  const pageMeta = {
    title: `System Status — ${SITE_NAME}`,
    description:
      'Real-time system status and performance metrics for the portfolio website.',
    canonical: `${SITE_URL}/status`,
  };

  // Mock data - in production, this would come from monitoring APIs
  const metrics = {
    performance: 95,
    accessibility: 98,
    seo: 100,
    bestPractices: 92,
    uptime: 99.9,
    lastDeploy: new Date().toISOString(),
    buildTime: '45s',
    bundleSize: '142KB',
  };

  return (
    <SceneWrapper pageMeta={pageMeta}>
      <div className="status">
        <section className="statusHero">
          <div className="container">
            <h1>System Status</h1>
            <p>Real-time performance and health metrics for the portfolio</p>

            <div className="statusOverview">
              <div className="statusGrid">
                <MonitoringBadge
                  type="performance"
                  score={metrics.performance}
                />
                <MonitoringBadge
                  type="accessibility"
                  score={metrics.accessibility}
                />
                <MonitoringBadge type="seo" score={metrics.seo} />
                <MonitoringBadge
                  type="best-practices"
                  score={metrics.bestPractices}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="statusDetails">
          <div className="container">
            <div className="statusGrid">
              <div className="statusCard">
                <h3>Uptime</h3>
                <div className="statusValue">{metrics.uptime}%</div>
                <p>Last 30 days</p>
              </div>

              <div className="statusCard">
                <h3>Last Deployment</h3>
                <div className="statusValue">
                  {new Date(metrics.lastDeploy).toLocaleDateString()}
                </div>
                <p>{new Date(metrics.lastDeploy).toLocaleTimeString()}</p>
              </div>

              <div className="statusCard">
                <h3>Build Time</h3>
                <div className="statusValue">{metrics.buildTime}</div>
                <p>Average production build</p>
              </div>

              <div className="statusCard">
                <h3>Bundle Size</h3>
                <div className="statusValue">{metrics.bundleSize}</div>
                <p>JavaScript gzipped</p>
              </div>
            </div>

            <div className="statusActions">
              <Button
                variant="primary"
                href="https://ethandellaposta.dev"
                block
              >
                View Live Site
              </Button>
              <Button
                variant="secondary"
                href="https://github.com/ethandellaposta/next-portfolio/actions"
                block
              >
                View Build History
              </Button>
              <Button
                variant="ghost"
                href="https://lighthouse-dot-webdotdevsite.appspot.com/lh/html?url=https://ethandellaposta.dev"
                block
              >
                Run Lighthouse Test
              </Button>
            </div>
          </div>
        </section>
      </div>
    </SceneWrapper>
  );
}

export default memo(Status);
