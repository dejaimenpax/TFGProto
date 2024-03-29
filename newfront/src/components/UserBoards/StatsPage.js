import { Pie } from 'react-chartjs-2';
import '../../styles/UserBoards/StatsPage.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage = ({user}) => {

  const calculateTotalAverage = (us) => {
    // Sumar todos los números en el vector "scores"
    const scoresSum = us.scores.reduce((total, score) => total + score, 0);
  
    // Calcular la suma de todos los números en el vector "submitted"
    const submittedSum = us.submitted.reduce((total, num) => total + num, 0);
  
    // Calcular el promedio total dividiendo la suma de scores entre la suma de submitted
    const totalAverage = submittedSum !== 0 ?  
      (scoresSum / submittedSum).toFixed(2)
      :
      0;
  
    return totalAverage;
  }

  const data = user ? {
    exercises: {
      BloqueI: {
        submitted: user.submitted[0],
        scores: user.scores[0],
        averages: user.averages[0],
        correct: user.correct[0],
        incorrect: user.incorrect[0],
      },
      BloqueII: {
        submitted: user.submitted[1],
        scores: user.scores[1],
        averages: user.averages[1],
        correct: user.correct[1],
        incorrect: user.incorrect[1],
      },
      BloqueIII: {
        submitted: user.submitted[2],
        scores: user.scores[2],
        averages: user.averages[2],
        correct: user.correct[2],
        incorrect: user.incorrect[2],
      },
      BloqueIV: {
        submitted: user.submitted[3],
        scores: user.scores[3],
        averages: user.averages[3],
        correct: user.correct[3],
        incorrect: user.incorrect[3],
      },
    },
    total: {
      submitted: user.submitted[0] + user.submitted[1] + user.submitted[2] + user.submitted[3],
      scores: user.scores[0] + user.scores[1] + user.scores[2] + user.scores[3],
      averages: calculateTotalAverage(user),
      correct: user.correct[0] + user.correct[1] + user.correct[2] + user.correct[3],
      incorrect: user.incorrect[0] + user.incorrect[1] + user.incorrect[2] + user.incorrect[3],
    },
  } : null;

  const ExerciseStats = ({ data }) => {
    const { submitted, scores, averages, correct, incorrect } = data;

    const chartData = {
      labels: ['Correctos', 'Incorrectos'],
      datasets: [
        {
          data: [correct, incorrect],
          backgroundColor: ['#4CAF50', '#FF6384'],
          hoverBackgroundColor: ['#4CAF50', '#FF6384'],
        },
      ],
    };

    return (
      <div className="exercise-stats">
        <h3 className="text-center"  style={{ whiteSpace: "nowrap" }}>Ejercicios entregados: {submitted.toString().replace('.',',')}</h3>
        <h3 className="text-center"  style={{ whiteSpace: "nowrap" }}>Puntuación total: {scores.toString().replace('.',',')}</h3>
        <h3 className="text-center" style={{ whiteSpace: "nowrap" }}>Media: {averages.toString().replace('.',',')}</h3>
        <Pie data={chartData} width={200} heigh={200}/>
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
    const { submitted, scores, averages, correct, incorrect } = data;

    const chartData = {
      labels: ['Correctos', 'Incorrectos'],
      datasets: [
        {
          data: [correct, incorrect],
          backgroundColor: ['#4CAF50', '#FF6384'],
          hoverBackgroundColor: ['#4CAF50', '#FF6384'],
        },
      ],
    };

    return (
      <div className="block-stats">
        <h3>{title}</h3>
        <h4>Ejercicios entregados: {submitted.toString().replace('.',',')}</h4>
        <h4>Puntuación total: {scores.toString().replace('.',',')}</h4>
        <h4>Media: {averages.toString().replace('.',',')}</h4>
        <div className="subpie">
          <Pie data={chartData} />
        </div>
      </div>
    );
  }

  return (
    <div className="stats-page">
      <div>
        <h2 className="text-center" >Estadísticas globales de {user.username}</h2>
        {user && <ExerciseStats data={data.total} />}
      </div>

      <div className="block-stats-container d-flex justify-content-center">
        <div className="block-stats-container-gray-container">
          <h2 className="text-center">Estadísticas por bloque</h2>
          {user && (
            <BlockStatsRow
              data1={data.exercises.BloqueI}
              data2={data.exercises.BloqueII}
              title1="Bloque 1: Números y Operaciones"
              title2="Bloque 2: Unidades de Medida"
            />
          )}
        </div>
        <div className="block-stats-container-gray-container">
          {user && (
            <BlockStatsRow
              data1={data.exercises.BloqueIII}
              data2={data.exercises.BloqueIV}
              title1="Bloque 3: Formas Geométricas"
              title2="Bloque 4: Gráficas y Estadística"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
