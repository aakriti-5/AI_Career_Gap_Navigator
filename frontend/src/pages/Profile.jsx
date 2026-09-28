import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState(
    "Python, C++, JavaScript, HTML, CSS, SQL, Machine Learning",
  );
  const [targetRole, setTargetRole] = useState("AI/ML Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeCareer = async () => {
    setLoading(true);
    setError("");

    try {
      const skillList = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const response = await fetch("http://127.0.0.1:5001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_profile: {
            skills: skillList,
          },
          target_role: targetRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      navigate("/results", {
        state: {
          analysis: data,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Build Your Profile</h1>

        <p>
          Enter your current skills and choose the career role you want to
          prepare for.
        </p>

        <label>Target Career Role</label>

        <select
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        >
          <option>AI/ML Engineer</option>
          <option>Machine Learning Engineer</option>
          <option>Software Engineer</option>
          <option>Data Scientist</option>
          <option>Data Analyst</option>
          <option>Full Stack Developer</option>
        </select>

        <label>Your Skills</label>

        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, SQL, Machine Learning..."
          rows="6"
        />

        <button onClick={analyzeCareer} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze My Career Gap →"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;
