'use client';

import styles from './DB90Diagram.module.css';

export function DB90Diagram() {
  return (
    <div className={styles.container}>
      <div className={styles.diagram}>
        <div className={styles.main}>
          {/* Left Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.descBox}>
              <p>DB90 speeds up software development by using AI tools, guided by experts, to handle time-consuming tasks. This boosts productivity, reduces repetitive work, shortens time to market, and improves software quality.</p>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><PersonIcon/></div>
                <div>
                  <div className={styles.legendLabel}>Operators</div>
                  <div className={styles.legendDesc}>Human experts operate the AI tools</div>
                </div>
              </div>

              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><WrenchIcon/></div>
                <div>
                  <div className={styles.legendLabel}>AI Tools</div>
                  <div className={styles.legendDesc}>Tools provide custom interfaces to engage the AI agents</div>
                </div>
              </div>

              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><DocIcon/></div>
                <div>
                  <div className={styles.legendLabel}>Artifacts</div>
                  <div className={styles.legendDesc}>Similar to traditional SDLC</div>
                </div>
              </div>

              <div className={styles.legendItem}>
                <div className={styles.legendIcon}><ChartIcon/></div>
                <div>
                  <div className={styles.legendLabel}>Efficiency Gains</div>
                  <div className={styles.legendDesc}>50% efficiency gain</div>
                </div>
              </div>

              <div className={styles.effBar}>
                <span>100%</span>
                <div className={styles.effBarTrack}><div className={styles.effBarFill}/></div>
                <span>50%</span>
              </div>
            </div>

          </div>

          {/* Matrix */}
          <div className={styles.matrix}>
            {/* Phase Headers */}
            <div className={styles.row}>
              <div className={styles.rowIcon}/>
              <div className={styles.phase}>Requirements</div>
              <div className={styles.phase}>Design</div>
              <div className={styles.phase}>Development</div>
              <div className={styles.phase}>Test</div>
              <div className={styles.phase}>Deployment</div>
            </div>

            {/* Operators */}
            <div className={styles.row}>
              <div className={styles.rowIcon}><PersonIcon/></div>
              <div className={styles.cell}><span>Business</span><span>Analyst</span></div>
              <div className={styles.cell}><span>Designer</span></div>
              <div className={styles.cell}><span>Software</span><span>Engineer</span></div>
              <div className={styles.cell}><span>Quality</span><span>Engineer</span></div>
              <div className={styles.cell}><span>DevOps</span><span>Engineer</span></div>
            </div>

            {/* AI Tools + Connectors with L-shape */}
            <div className={styles.toolsConnectorSection}>
              <div className={styles.rowIcon}><WrenchIcon/></div>
              
              {/* L-shaped 3PO wrapper */}
              <div className={styles.lWrapper}>
                <div className={styles.lTop}><span className={styles.badge}>3PO</span></div>
                <div className={styles.lBottom}>
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
              </div>
              
              {/* Other tool cells - positioned in top row only */}
              <div className={styles.toolCells}>
                <div className={`${styles.cell} ${styles.cellTools}`}><span>UXPilot</span><span>Figma</span></div>
                <div className={`${styles.cell} ${styles.cellTools}`}><span>Cursor</span><span>CoPilot</span><span>WindSurf</span><span>CodeWhisperer</span></div>
                <div className={`${styles.cell} ${styles.cellTools}`}><span>BrowserStack</span><span>Testim</span><span>Playwright</span><span>Cypress</span></div>
                <div className={`${styles.cell} ${styles.cellTools}`}><span>AWS</span><span>Azure</span><span>GCP</span><span>Terraform</span></div>
              </div>
            </div>

            {/* Artifacts */}
            <div className={styles.row}>
              <div className={styles.rowIcon}><DocIcon/></div>
              <div className={`${styles.cell} ${styles.cellArtifact}`}><span>Requirements</span><span>Diagrams</span><span>Backlog</span></div>
              <div className={`${styles.cell} ${styles.cellArtifact}`}><span>Mockups</span><span>Prototypes</span></div>
              <div className={`${styles.cell} ${styles.cellArtifact}`}><span>Source</span><span>Code</span></div>
              <div className={`${styles.cell} ${styles.cellArtifact}`}><span>Test Plans</span><span>Unit Tests</span><span>System Tests</span></div>
              <div className={`${styles.cell} ${styles.cellArtifact}`}><span>Infrastructure</span></div>
            </div>

            {/* Efficiency */}
            <div className={`${styles.row} ${styles.effRow}`}>
              <div className={styles.rowIcon}><ChartIcon/></div>
              <EffCell before={15} after={5} />
              <EffCell before={20} after={10} />
              <EffCell before={40} after={15} />
              <EffCell before={20} after={15} />
              <EffCell before={5} after={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scale circle size based on percentage (5% = 36px, 40% = 80px)
function getCircleSize(percent: number): number {
  const minSize = 36;
  const maxSize = 80;
  const minPercent = 5;
  const maxPercent = 40;
  return minSize + ((percent - minPercent) / (maxPercent - minPercent)) * (maxSize - minSize);
}

function EffCell({ before, after }: { before: number; after: number }) {
  const beforeSize = getCircleSize(before);
  const afterSize = getCircleSize(after);
  // Scale font size proportionally
  const beforeFont = Math.max(0.85, beforeSize / 65);
  const afterFont = Math.max(0.85, afterSize / 65);
  
  return (
    <div className={styles.effCell}>
      <div 
        className={styles.effBefore} 
        style={{ 
          width: beforeSize, 
          height: beforeSize,
          fontSize: `${beforeFont}rem`
        }}
      >
        {before}%
      </div>
      <div className={styles.effArrow}>↓</div>
      <div 
        className={styles.effAfter}
        style={{ 
          width: afterSize, 
          height: afterSize,
          fontSize: `${afterFont}rem`
        }}
      >
        {after}%
      </div>
    </div>
  );
}

function PersonIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M12 13c-5 0-8 2.5-8 5v2h16v-2c0-2.5-3-5-8-5z"/></svg>;
}

function WrenchIcon() {
  return <svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>;
}

function DocIcon() {
  return <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>;
}

function ChartIcon() {
  return <svg viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>;
}
