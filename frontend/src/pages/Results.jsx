import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="results-page">
        <h1>No analysis found</h1>
        <button onClick={() => navigate("/profile")}>
          Go to Profile
        </button>
      </div>
    );
  }

  const roadmap = Array.isArray(analysis.roadmap)
    ? analysis.roadmap
    : [];

  const recommendations = Array.isArray(analysis.recommendations)
    ? analysis.recommendations
    : [];

  return (
    <div className="results-page">
      <div className="results-container">

        <h1>Your Career Gap Analysis</h1>

        <p>
          Target Role:{" "}
          <strong>{analysis.target_role}</strong>
        </p>

        {/* READINESS */}
        <div className="score-card">
          <p>Career Readiness</p>
          <h2>{analysis.readiness_score}%</h2>
        </div>

        {/* MATCHED + MISSING */}
        <div className="results-grid">

          <div className="result-card">
            <h2>✓ Matched Skills</h2>

            {analysis.matched_skills?.length > 0 ? (
              <ul>
                {analysis.matched_skills.map((skill) => (
                  <li key={skill}>
                    ✓ {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No matched skills found.</p>
            )}
          </div>

          <div className="result-card">
            <h2>⚠ Missing Skills</h2>

            {analysis.missing_skills?.length > 0 ? (
              <ul>
                {analysis.missing_skills.map((skill) => (
                  <li key={skill}>
                    ⚠ {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No major skill gaps found.</p>
            )}
          </div>

        </div>

        {/* PERSONALIZED ROADMAP */}
        <div className="result-card roadmap-card">

          <h2>🚀 Your Personalized Learning Roadmap</h2>

          <p className="roadmap-intro">
            Based on your missing skills, follow these phases to
            progressively close your career gap.
          </p>

          {roadmap.length > 0 ? (

            <div className="roadmap">

              {roadmap.map((phase, index) => (

                <div className="roadmap-phase" key={index}>

                  <div className="phase-number">
                    {index + 1}
                  </div>

                  <div className="phase-content">

                    <h3>{phase.phase}</h3>

                    <p>
                      <strong>Focus:</strong> {phase.focus}
                    </p>

                    <div className="roadmap-skills">

                      {phase.skills?.map((skill) => (
                        <span
                          className="skill-tag"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p>
              🎉 You currently have no major skill gaps.
              Focus on projects, interview preparation and
              advanced practice.
            </p>

          )}

        </div>

        {/* LEARNING RECOMMENDATIONS */}
        {recommendations.length > 0 && (

          <div className="result-card">

            <h2>📚 Recommended Learning</h2>

            {recommendations.map((item, index) => (

              <div className="recommendation" key={index}>

                <h3>
                  {item.skill}
                </h3>

                <p>
                  Priority: <strong>{item.priority}</strong>
                </p>

                {item.resources?.map((resource, i) => (

                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.title}
                  </a>

                ))}

              </div>

            ))}

          </div>

        )}

        {/* AI SUMMARY */}
        <div className="result-card">

          <h2>🤖 AI Career Summary</h2>

          <p>
            {analysis.ai_summary ||
              "Your analysis is complete. Follow the roadmap above and keep building projects to improve your readiness."}
          </p>

        </div>

        <button onClick={() => navigate("/profile")}>
          Analyze Again
        </button>

      </div>
    </div>
  );
}

export default Results;




