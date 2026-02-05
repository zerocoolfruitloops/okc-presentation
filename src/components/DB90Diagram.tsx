'use client';

import styles from './DB90Diagram.module.css';

export function DB90Diagram() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.slide}>
        {/* Title Bar */}
        <div className={styles.titleBar}>
          <h1 className={styles.title}>
            DB90: Build faster, <em>build better</em>
          </h1>
          <svg className={styles.targetIcon} width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="14" y1="1" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="14" y1="21" x2="14" y2="27" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="1" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="21" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Left Sidebar */}
          <div className={styles.sidebar}>
            {/* Description Box */}
            <div className={styles.descBox}>
              <p>DB90 speeds up software development by using AI tools, guided by experts, to handle time-consuming tasks. This boosts productivity, reduces repetitive work, shortens time to market, and improves software quality.</p>
            </div>

            {/* Legend Items - aligned with matrix rows */}
            <div className={styles.legendSection}>
              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><PersonIcon /></div>
                <div className={styles.legendText}>
                  <span className={styles.legendTitle}>Operators</span>
                  <span className={styles.legendDesc}>Human experts operate the AI tools</span>
                </div>
              </div>

              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><WrenchIcon /></div>
                <div className={styles.legendText}>
                  <span className={styles.legendTitle}>AI Tools</span>
                  <span className={styles.legendDesc}>Tools provide custom interfaces to engage the AI agents</span>
                </div>
              </div>

              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><DocIcon /></div>
                <div className={styles.legendText}>
                  <span className={styles.legendTitle}>Artifacts</span>
                  <span className={styles.legendDesc}>Similar to traditional SDLC</span>
                </div>
              </div>

              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><ChartIcon /></div>
                <div className={styles.legendText}>
                  <span className={styles.legendTitle}>Efficiency Gains</span>
                  <span className={styles.legendDesc}>50% efficiency gain</span>
                </div>
              </div>
            </div>

            {/* Efficiency Bar */}
            <div className={styles.efficiencyBar}>
              <span>100%</span>
              <div className={styles.barTrack}><div className={styles.barFill}/></div>
              <span>50%</span>
            </div>

            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.brandLogo}>
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                  <circle cx="10" cy="16" r="4"/><circle cx="22" cy="16" r="4"/>
                </svg>
              </div>
              <span>Dualboot Partners</span>
            </div>
          </div>

          {/* Right Matrix */}
          <div className={styles.matrix}>
            {/* Row 1: Phase Headers */}
            <div className={styles.matrixRow}>
              <div className={styles.rowIcon}/>
              <div className={styles.phaseHeader}>Requirements</div>
              <div className={styles.phaseHeader}>Design</div>
              <div className={styles.phaseHeader}>Development</div>
              <div className={styles.phaseHeader}>Test</div>
              <div className={styles.phaseHeader}>Deployment</div>
            </div>

            {/* Row 2: Operators */}
            <div className={styles.matrixRow}>
              <div className={styles.rowIcon}><PersonIcon size={12}/></div>
              <div className={styles.cell}><span>Business</span><span>Analyst</span></div>
              <div className={styles.cell}><span>Designer</span></div>
              <div className={styles.cell}><span>Software</span><span>Engineer</span></div>
              <div className={styles.cell}><span>Quality</span><span>Engineer</span></div>
              <div className={styles.cell}><span>DevOps</span><span>Engineer</span></div>
            </div>

            {/* Row 3: AI Tools */}
            <div className={styles.matrixRow}>
              <div className={styles.rowIcon}><WrenchIcon size={12}/></div>
              <div className={`${styles.cell} ${styles.cell3po}`}><span className={styles.badge}>3PO</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>UXPilot</span><span>Figma</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>Cursor</span><span>CoPilot</span><span>WindSurf</span><span>CodeWhisperer</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>BrowserStack</span><span>Testim</span><span>Playwright</span><span>Cypress</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>AWS</span><span>Azure</span><span>GCP</span><span>Terraform</span></div>
            </div>

            {/* Row 4: Connectors */}
            <div className={`${styles.matrixRow} ${styles.connectorRow}`}>
              <div className={styles.rowIcon}/>
              <div className={styles.connector}>↕</div>
              <div className={styles.connector}>↕</div>
              <div className={styles.connectorCenter}>
                <div className={styles.connectorLine}/>
                <span className={styles.badge}>3PO</span>
                <div className={styles.connectorLine}/>
              </div>
              <div className={styles.connector}>↕</div>
              <div className={styles.connector}>↕</div>
            </div>

            {/* Row 5: Artifacts */}
            <div className={styles.matrixRow}>
              <div className={styles.rowIcon}><DocIcon size={12}/></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>Requirements</span><span>Diagrams</span><span>Backlog</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>Mockups</span><span>Prototypes</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>Source</span><span>Code</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>Test Plans</span><span>Unit Tests</span><span>System Tests</span></div>
              <div className={`${styles.cell} ${styles.cellSmall}`}><span>Infrastructure</span></div>
            </div>

            {/* Row 6: Efficiency */}
            <div className={`${styles.matrixRow} ${styles.effRow}`}>
              <div className={styles.rowIcon}><ChartIcon size={12}/></div>
              <EffCell before="15%" after="5%"/>
              <EffCell before="20%" after="10%"/>
              <EffCell before="40%" after="15%"/>
              <EffCell before="20%" after="15%"/>
              <EffCell before="5%" after="5%"/>
            </div>
          </div>
        </div>

        {/* Page Number */}
        <div className={styles.pageNum}>22</div>
      </div>
    </div>
  );
}

function EffCell({ before, after }: { before: string; after: string }) {
  return (
    <div className={styles.effCell}>
      <span className={styles.effBefore}>{before}</span>
      <span className={styles.effArrow}>↓</span>
      <span className={styles.effAfter}>{after}</span>
    </div>
  );
}

function PersonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <circle cx="12" cy="7" r="4"/><path d="M12 13c-5 0-8 2.5-8 5v2h16v-2c0-2.5-3-5-8-5z"/>
    </svg>
  );
}

function WrenchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  );
}

function DocIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
    </svg>
  );
}

function ChartIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
    </svg>
  );
}
