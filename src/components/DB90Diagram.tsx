'use client';

export function DB90Diagram() {
  const phases = [
    { name: 'Requirements', color: '#2563eb' },
    { name: 'Design', color: '#2563eb' },
    { name: 'Development', color: '#2563eb' },
    { name: 'Test', color: '#2563eb' },
    { name: 'Deployment', color: '#2563eb' },
  ];

  const operators = [
    'Business\nAnalyst',
    'Designer',
    'Software\nEngineer',
    'Quality\nEngineer',
    'DevOps\nEngineer',
  ];

  const aiTools = [
    '',
    'UXPilot\nFigma',
    'Cursor\nCoPilot\nWindSurf\nCodeWhisperer',
    'BrowserStack\nTestim\nPlaywright\nCypress',
    'AWS\nAzure\nGCP\nTerraform',
  ];

  const artifacts = [
    'Requirements\nDiagrams\nBacklog',
    'Mockups\nPrototypes',
    'Source\nCode',
    'Test Plans\nUnit Tests\nSystem Tests',
    'Infrastructure',
  ];

  const efficiency = [
    { before: '15%', after: '5%' },
    { before: '20%', after: '10%' },
    { before: '40%', after: '15%' },
    { before: '20%', after: '15%' },
    { before: '5%', after: '5%' },
  ];

  return (
    <div className="db90-diagram">
      <div className="db90-header">
        <h2 className="db90-title">
          DB90: Build faster, <em>build better</em>
        </h2>
      </div>
      
      <div className="db90-content">
        <div className="db90-left">
          <div className="db90-description">
            <p>
              DB90 speeds up software development by using AI tools, guided by 
              experts, to handle time-consuming tasks. This boosts productivity, 
              reduces repetitive work, shortens time to market, and improves 
              software quality.
            </p>
          </div>
          
          <div className="db90-legend">
            <div className="legend-item">
              <span className="legend-icon">👤</span>
              <div>
                <strong>Operators</strong>
                <span>Human experts operate the AI tools</span>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🤖</span>
              <div>
                <strong>AI Tools</strong>
                <span>Tools provide custom interfaces to engage the AI agents</span>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-icon">📄</span>
              <div>
                <strong>Artifacts</strong>
                <span>Similar to traditional SDLC</span>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-icon">📊</span>
              <div>
                <strong>Efficiency Gains</strong>
                <span>50% efficiency gain</span>
              </div>
            </div>
          </div>
        </div>

        <div className="db90-right">
          {/* Phase Headers */}
          <div className="db90-row db90-phases">
            {phases.map((phase, i) => (
              <div key={i} className="phase-pill">{phase.name}</div>
            ))}
          </div>

          {/* Operators Row */}
          <div className="db90-row db90-operators">
            {operators.map((op, i) => (
              <div key={i} className="db90-cell operator-cell">
                {op.split('\n').map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </div>
            ))}
          </div>

          {/* AI Tools Row */}
          <div className="db90-row db90-tools">
            <div className="db90-cell tool-cell tool-3po">
              <span className="tool-badge">3PO</span>
            </div>
            {aiTools.slice(1).map((tool, i) => (
              <div key={i} className="db90-cell tool-cell">
                {tool.split('\n').map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </div>
            ))}
          </div>

          {/* 3PO Connection Row */}
          <div className="db90-row db90-connectors">
            <div className="connector-line">
              <span className="connector-arrow">↕</span>
            </div>
            <div className="connector-line">
              <span className="connector-arrow">↕</span>
            </div>
            <div className="connector-center">
              <span className="tool-badge">3PO</span>
            </div>
            <div className="connector-line">
              <span className="connector-arrow">↕</span>
            </div>
            <div className="connector-line">
              <span className="connector-arrow">↕</span>
            </div>
          </div>

          {/* Artifacts Row */}
          <div className="db90-row db90-artifacts">
            {artifacts.map((artifact, i) => (
              <div key={i} className="db90-cell artifact-cell">
                {artifact.split('\n').map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </div>
            ))}
          </div>

          {/* Efficiency Row */}
          <div className="db90-row db90-efficiency">
            {efficiency.map((eff, i) => (
              <div key={i} className="efficiency-cell">
                <div className="eff-before">{eff.before}</div>
                <div className="eff-arrow">↓</div>
                <div className="eff-after">{eff.after}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
