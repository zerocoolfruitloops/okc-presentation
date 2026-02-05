'use client';

export function DB90Diagram() {
  return (
    <div className="db90-slide">
      {/* Header */}
      <div className="db90-header">
        <h2 className="db90-title">
          DB90: Build faster, <em>build better</em>
        </h2>
        <div className="db90-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="16" y1="24" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="2" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="24" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      <div className="db90-body">
        {/* Left Column */}
        <div className="db90-left">
          <div className="db90-desc-box">
            <p>
              DB90 speeds up software development by using AI tools, guided by 
              experts, to handle time-consuming tasks. This boosts productivity, 
              reduces repetitive work, shortens time to market, and improves 
              software quality.
            </p>
          </div>

          <div className="db90-legend">
            <div className="legend-row">
              <div className="legend-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M12 14c-6 0-8 3-8 6v1h16v-1c0-3-2-6-8-6z"/>
                </svg>
              </div>
              <div className="legend-text">
                <strong>Operators</strong>
                <span>Human experts operate the AI tools</span>
              </div>
            </div>

            <div className="legend-row">
              <div className="legend-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                </svg>
              </div>
              <div className="legend-text">
                <strong>AI Tools</strong>
                <span>Tools provide custom interfaces to engage the AI agents</span>
              </div>
            </div>

            <div className="legend-row">
              <div className="legend-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
                </svg>
              </div>
              <div className="legend-text">
                <strong>Artifacts</strong>
                <span>Similar to traditional SDLC</span>
              </div>
            </div>

            <div className="legend-row">
              <div className="legend-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </div>
              <div className="legend-text">
                <strong>Efficiency Gains</strong>
                <span>50% efficiency gain</span>
              </div>
            </div>
          </div>

          {/* Efficiency Summary */}
          <div className="eff-summary">
            <div className="eff-bar">
              <span>100%</span>
              <div className="eff-bar-fill"></div>
              <span>50%</span>
            </div>
          </div>

          {/* Dualboot Logo */}
          <div className="db90-brand">
            <div className="brand-circle">
              <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="14" cy="20" r="3" fill="currentColor"/>
                <circle cx="26" cy="20" r="3" fill="currentColor"/>
              </svg>
            </div>
            <span>Dualboot Partners</span>
          </div>
        </div>

        {/* Right Column - The Matrix */}
        <div className="db90-matrix">
          {/* Phase Headers */}
          <div className="matrix-row phase-row">
            <div className="spacer"></div>
            <div className="phase-pill">Requirements</div>
            <div className="phase-pill">Design</div>
            <div className="phase-pill">Development</div>
            <div className="phase-pill">Test</div>
            <div className="phase-pill">Deployment</div>
          </div>

          {/* Operators Row */}
          <div className="matrix-row">
            <div className="row-label">
              <div className="label-icon">👤</div>
            </div>
            <div className="matrix-cell">Business<br/>Analyst</div>
            <div className="matrix-cell">Designer</div>
            <div className="matrix-cell">Software<br/>Engineer</div>
            <div className="matrix-cell">Quality<br/>Engineer</div>
            <div className="matrix-cell">DevOps<br/>Engineer</div>
          </div>

          {/* AI Tools Row */}
          <div className="matrix-row tools-row">
            <div className="row-label">
              <div className="label-icon">🔧</div>
            </div>
            <div className="matrix-cell tool-3po">
              <span className="pill-badge">3PO</span>
            </div>
            <div className="matrix-cell tools-cell">UXPilot<br/>Figma</div>
            <div className="matrix-cell tools-cell">Cursor<br/>CoPilot<br/>WindSurf<br/>CodeWhisperer</div>
            <div className="matrix-cell tools-cell">BrowserStack<br/>Testim<br/>Playwright<br/>Cypress</div>
            <div className="matrix-cell tools-cell">AWS<br/>Azure<br/>GCP<br/>Terraform</div>
          </div>

          {/* Connector Row */}
          <div className="matrix-row connector-row">
            <div className="spacer"></div>
            <div className="connector">↕</div>
            <div className="connector">↕</div>
            <div className="connector-center">
              <span className="pill-badge">3PO</span>
            </div>
            <div className="connector">↕</div>
            <div className="connector">↕</div>
          </div>

          {/* Artifacts Row */}
          <div className="matrix-row">
            <div className="row-label">
              <div className="label-icon">📄</div>
            </div>
            <div className="matrix-cell artifact-cell">Requirements<br/>Diagrams<br/>Backlog</div>
            <div className="matrix-cell artifact-cell">Mockups<br/>Prototypes</div>
            <div className="matrix-cell artifact-cell">Source<br/>Code</div>
            <div className="matrix-cell artifact-cell">Test Plans<br/>Unit Tests<br/>System Tests</div>
            <div className="matrix-cell artifact-cell">Infrastructure</div>
          </div>

          {/* Efficiency Row */}
          <div className="matrix-row eff-row">
            <div className="row-label">
              <div className="label-icon">📊</div>
            </div>
            <div className="eff-cell">
              <div className="eff-before">15%</div>
              <div className="eff-arrow">↓</div>
              <div className="eff-after">5%</div>
            </div>
            <div className="eff-cell">
              <div className="eff-before">20%</div>
              <div className="eff-arrow">↓</div>
              <div className="eff-after">10%</div>
            </div>
            <div className="eff-cell">
              <div className="eff-before">40%</div>
              <div className="eff-arrow">↓</div>
              <div className="eff-after">15%</div>
            </div>
            <div className="eff-cell">
              <div className="eff-before">20%</div>
              <div className="eff-arrow">↓</div>
              <div className="eff-after">15%</div>
            </div>
            <div className="eff-cell">
              <div className="eff-before">5%</div>
              <div className="eff-arrow">↓</div>
              <div className="eff-after">5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
