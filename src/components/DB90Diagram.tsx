'use client';

import styles from './DB90Diagram.module.css';

export function DB90Diagram() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          DB90: Build faster, <em>build better</em>
        </h1>
        <svg className={styles.logo} width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="18" y1="2" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="18" y1="26" x2="18" y2="34" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="2" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="26" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          {/* Description Box */}
          <div className={styles.descBox}>
            <p>
              DB90 speeds up software development by using AI tools, guided by experts, to handle time-consuming tasks. This boosts productivity, reduces repetitive work, shortens time to market, and improves software quality.
            </p>
          </div>

          {/* Legend */}
          <nav className={styles.legend}>
            <LegendItem 
              icon={<OperatorIcon />}
              title="Operators"
              desc="Human experts operate the AI tools"
            />
            <LegendItem 
              icon={<ToolIcon />}
              title="AI Tools"
              desc="Tools provide custom interfaces to engage the AI agents"
            />
            <LegendItem 
              icon={<ArtifactIcon />}
              title="Artifacts"
              desc="Similar to traditional SDLC"
            />
            <LegendItem 
              icon={<ChartIcon />}
              title="Efficiency Gains"
              desc="50% efficiency gain"
            />
          </nav>

          {/* Efficiency Bar */}
          <div className={styles.effBar}>
            <span>100%</span>
            <div className={styles.effBarTrack}>
              <div className={styles.effBarFill} />
            </div>
            <span>50%</span>
          </div>

          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                <circle cx="10" cy="16" r="4"/>
                <circle cx="22" cy="16" r="4"/>
              </svg>
            </div>
            <span>Dualboot Partners</span>
          </div>
        </aside>

        {/* Matrix */}
        <div className={styles.matrix}>
          {/* Phase Headers */}
          <div className={styles.row}>
            <div className={styles.rowLabel} />
            {['Requirements', 'Design', 'Development', 'Test', 'Deployment'].map(phase => (
              <div key={phase} className={styles.phasePill}>{phase}</div>
            ))}
          </div>

          {/* Operators */}
          <div className={styles.row}>
            <div className={styles.rowLabel}><OperatorIcon /></div>
            {['Business\nAnalyst', 'Designer', 'Software\nEngineer', 'Quality\nEngineer', 'DevOps\nEngineer'].map((role, i) => (
              <div key={i} className={styles.cell}>
                {role.split('\n').map((line, j) => <span key={j}>{line}</span>)}
              </div>
            ))}
          </div>

          {/* AI Tools */}
          <div className={styles.row}>
            <div className={styles.rowLabel}><ToolIcon /></div>
            <div className={`${styles.cell} ${styles.cell3po}`}>
              <span className={styles.badge}>3PO</span>
            </div>
            <div className={`${styles.cell} ${styles.cellTools}`}>
              <span>UXPilot</span><span>Figma</span>
            </div>
            <div className={`${styles.cell} ${styles.cellTools}`}>
              <span>Cursor</span><span>CoPilot</span><span>WindSurf</span><span>CodeWhisperer</span>
            </div>
            <div className={`${styles.cell} ${styles.cellTools}`}>
              <span>BrowserStack</span><span>Testim</span><span>Playwright</span><span>Cypress</span>
            </div>
            <div className={`${styles.cell} ${styles.cellTools}`}>
              <span>AWS</span><span>Azure</span><span>GCP</span><span>Terraform</span>
            </div>
          </div>

          {/* Connectors */}
          <div className={`${styles.row} ${styles.connectorRow}`}>
            <div className={styles.rowLabel} />
            <div className={styles.connector}>↕</div>
            <div className={styles.connector}>↕</div>
            <div className={styles.connectorCenter}>
              <div className={styles.connectorLine} />
              <span className={styles.badge}>3PO</span>
              <div className={styles.connectorLine} />
            </div>
            <div className={styles.connector}>↕</div>
            <div className={styles.connector}>↕</div>
          </div>

          {/* Artifacts */}
          <div className={styles.row}>
            <div className={styles.rowLabel}><ArtifactIcon /></div>
            <div className={`${styles.cell} ${styles.cellArtifact}`}>
              <span>Requirements</span><span>Diagrams</span><span>Backlog</span>
            </div>
            <div className={`${styles.cell} ${styles.cellArtifact}`}>
              <span>Mockups</span><span>Prototypes</span>
            </div>
            <div className={`${styles.cell} ${styles.cellArtifact}`}>
              <span>Source</span><span>Code</span>
            </div>
            <div className={`${styles.cell} ${styles.cellArtifact}`}>
              <span>Test Plans</span><span>Unit Tests</span><span>System Tests</span>
            </div>
            <div className={`${styles.cell} ${styles.cellArtifact}`}>
              <span>Infrastructure</span>
            </div>
          </div>

          {/* Efficiency */}
          <div className={`${styles.row} ${styles.effRow}`}>
            <div className={styles.rowLabel}><ChartIcon /></div>
            {[
              { before: '15%', after: '5%' },
              { before: '20%', after: '10%' },
              { before: '40%', after: '15%' },
              { before: '20%', after: '15%' },
              { before: '5%', after: '5%' },
            ].map((eff, i) => (
              <div key={i} className={styles.effCell}>
                <span className={styles.effBefore}>{eff.before}</span>
                <span className={styles.effArrow}>↓</span>
                <span className={styles.effAfter}>{eff.after}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

function LegendItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className={styles.legendItem}>
      <div className={styles.legendIcon}>{icon}</div>
      <div className={styles.legendText}>
        <strong>{title}</strong>
        <span>{desc}</span>
      </div>
    </div>
  );
}

function OperatorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <circle cx="12" cy="7" r="4"/>
      <path d="M12 13c-5 0-8 2.5-8 5v2h16v-2c0-2.5-3-5-8-5z"/>
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  );
}

function ArtifactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
    </svg>
  );
}
