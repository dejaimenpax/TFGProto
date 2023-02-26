

        



/*import React, { useState } from 'react';
import '../styles/Dashboard.css';

const ExerciseCountWidget = ({ topic, count }) => {
  return (
    <div className="widget">
      <div className="widget-header">{topic} Exercises Done</div>
      <div className="number normal">{count}</div>
    </div>
  );
};

const TotalScoreWidget = ({ topic, score }) => {
  return (
    <div className="widget">
      <div className="widget-header">{topic} Total Scoring</div>
      <div className="number normal">{score}</div>
    </div>
  );
};

const MeanScoreWidget = ({ topic, score }) => {
  const className = score > 7 ? 'high' : score > 4 ? 'normal' : 'low';

  return (
    <div className="widget">
      <div className="widget-header">{topic} Mean Scores</div>
      <div className={`number ${className}`}>{score.toFixed(1)}</div>
    </div>
  );
};

const Dashboard = () => {
    const [exerciseCounts, setExerciseCounts] = useState({
      listening: 10,
      reading: 7,
      writing: 5,
      speaking: 8,
    });
  
    const [totalScores, setTotalScores] = useState({
      listening: 70,
      reading: 56,
      writing: 42,
      speaking: 64,
    });
  
    const [meanScores, setMeanScores] = useState({
      listening: 7.0,
      reading: 8.0,
      writing: 8.4,
      speaking: 6.2,
    });
  
    return (
      <div className="dashboard">
        <div className="dashboard-group">
          <h2>Exercises Done</h2>
          <div className="dashboard-subgroup">
            <ExerciseCountWidget topic="Listening" count={exerciseCounts.listening} />
            <ExerciseCountWidget topic="Reading" count={exerciseCounts.reading} />
            <ExerciseCountWidget topic="Writing" count={exerciseCounts.writing} />
            <ExerciseCountWidget topic="Speaking" count={exerciseCounts.speaking} />
          </div>
        </div>
  
        <div className="dashboard-group">
          <h2>Total Scoring</h2>
          <div className="dashboard-subgroup">
            <TotalScoreWidget topic="Listening" score={totalScores.listening} />
            <TotalScoreWidget topic="Reading" score={totalScores.reading} />
            <TotalScoreWidget topic="Writing" score={totalScores.writing} />
            <TotalScoreWidget topic="Speaking" score={totalScores.speaking} />
          </div>
        </div>
  
        <div className="dashboard-group">
          <h2>Mean Scores</h2>
          <div className="dashboard-subgroup">
            <MeanScoreWidget topic="Listening" score={meanScores.listening} />
            <MeanScoreWidget topic="Reading" score={meanScores.reading} />
            <MeanScoreWidget topic="Writing" score={meanScores.writing} />
            <MeanScoreWidget topic="Speaking" score={meanScores.speaking} />
          </div>
        </div>
      </div>
    );
}

export default Dashboard;*/





/*import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [cpuUsage, setCpuUsage] = useState(75);
    const [memoryUsage, setMemoryUsage] = useState(50);
    const [networkTraffic, setNetworkTraffic] = useState(1000);
  
    return (
      <div className="dashboard">
        <div className="widget">
          <div className="widget-header">CPU Usage</div>
          <div className="widget-body">
            <div className={`number ${cpuUsage > 80 ? 'danger' : 'normal'}`}>
              {cpuUsage}%
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="widget-header">Memory Usage</div>
          <div className="widget-body">
            <div className={`number ${memoryUsage > 80 ? 'danger' : 'normal'}`}>
              {memoryUsage}%
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="widget-header">Network Traffic</div>
          <div className="widget-body">
            <div className={`number ${networkTraffic > 10000 ? 'danger' : 'normal'}`}>
              {networkTraffic} KB/s
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;*/