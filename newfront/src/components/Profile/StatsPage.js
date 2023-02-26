import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../../styles/StatsPage.css'

const data = {
  exercises: {
    BloqueI: {
      done: 15,
      totalScore: 150,
      meanScore: 10,
    },
    BloqueII: {
      done: 20,
      totalScore: 200,
      meanScore: 10,
    },
    BloqueIII: {
      done: 10,
      totalScore: 100,
      meanScore: 10,
    },
    BloqueIV: {
      done: 25,
      totalScore: 250,
      meanScore: 10,
    },
  },
  total: {
    done: 70,
    totalScore: 700,
    meanScore: 10,
  },
};

const ExerciseStats = ({ data }) => {
  const { done, totalScore, meanScore } = data;

  const chartData = {
    labels: ['Done', 'Not Done'],
    datasets: [
      {
        data: [done, 40 - done],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="exercise-stats">
      <h3 className="text-center">Done exercises: {done}</h3>
      <h3 className="text-center">Total score: {totalScore}</h3>
      <h3 className="text-center">Mean score: {meanScore}</h3>
      <Pie data={chartData} width={500} heigh={500}/>
    </div>
  );
};

const BlockStatsRow = ({ data1, data2, title1, title2 }) => {
  return (
    <div className="block-stats-row">
      <BlockStats data={data1} title={title1} />
      <BlockStats data={data2} title={title2} />
    </div>
  );
};

const BlockStats = ({ data, title }) => {
  const { done, totalScore, meanScore } = data;

  const chartData = {
    labels: ['Done', 'Not Done'],
    datasets: [
      {
        data: [done, 40 - done],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="block-stats">
      <h3>{title}</h3>
      <h4>Done exercises: {done}</h4>
      <h4>Total score: {totalScore}</h4>
      <h4>Mean score: {meanScore}</h4>
      <Pie data={chartData} />
    </div>
  );
}

const StatsPage = () => {
  return (
    <div className="stats-page">
      <div className="total-stats-container">
        <h2 className="text-center">Total Stats</h2>
        <ExerciseStats data={data.total} />
      </div>

      <div className="block-stats-container d-flex justify-content-center">
        <div className="block-stats-container-gray-container">
          <h2 className="text-center">Block Stats</h2>
          <BlockStatsRow
            data1={data.exercises.BloqueI}
            data2={data.exercises.BloqueII}
            title1="Bloque I"
            title2="Bloque II"
          />
        </div>
        <div className="block-stats-container-gray-container">
          <BlockStatsRow
            data1={data.exercises.BloqueII}
            data2={data.exercises.BloqueIII}
            title1="Bloque III"
            title2="Bloque IV"
          />
        </div>
      </div>
    </div>
  )
}

export default StatsPage;





/*import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../styles/StatsPage.css'

const data = {
  exercises: {
    BloqueI: {
      done: 15,
      totalScore: 150,
      meanScore: 10,
    },
    BloqueII: {
      done: 20,
      totalScore: 200,
      meanScore: 10,
    },
    BloqueIII: {
      done: 10,
      totalScore: 100,
      meanScore: 10,
    },
    BloqueIV: {
      done: 25,
      totalScore: 250,
      meanScore: 10,
    },
  },
  total: {
    done: 70,
    totalScore: 700,
    meanScore: 10,
  },
};

const ExerciseStats = ({ data }) => {
  const { done, totalScore, meanScore } = data;

  const chartData = {
    labels: ['Done', 'Not Done'],
    datasets: [
      {
        data: [done, 40 - done],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="exercise-stats">
      <h3 className="text-center">Done exercises: {done}</h3>
      <h3 className="text-center">Total score: {totalScore}</h3>
      <h3 className="text-center">Mean score: {meanScore}</h3>
      <Pie data={chartData} width={500} heigh={500}/>
    </div>
  );
};

const BlockStatsRow = ({ data1, data2, title1, title2 }) => {
  return (
    <div className="block-stats-row">
      <BlockStats data={data1} title={title1} />
      <BlockStats data={data2} title={title2} />
    </div>
  );
};

const BlockStats = ({ data, title }) => {
  const { done, totalScore, meanScore } = data;

  const chartData = {
    labels: ['Done', 'Not Done'],
    datasets: [
      {
        data: [done, 40 - done],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="block-stats">
      <h3>{title}</h3>
      <h4>Done exercises: {done}</h4>
      <h4>Total score: {totalScore}</h4>
      <h4>Mean score: {meanScore}</h4>
      <Pie data={chartData} />
    </div>
  );
};

const StatsPage = () => {
  return (
    <div className="stats-page">
      <h2 className="text-center">Total Stats</h2>
      <ExerciseStats data={data.total} />

      <h2 className="text-center">Block Stats</h2>
      <div className="block-stats-container">
        <div className="container">
        <BlockStatsRow
            data1={data.exercises.BloqueI}
            data2={data.exercises.BloqueII}
            title1="Bloque I"
            title2="Bloque II"
          />
        </div>
        <div className="container">
          <BlockStatsRow
            data1={data.exercises.BloqueII}
            data2={data.exercises.BloqueIII}
            title1="Bloque III"
            title2="Bloque IV"
          />
        </div>
      </div>
    </div>
  )
}

export default StatsPage */

