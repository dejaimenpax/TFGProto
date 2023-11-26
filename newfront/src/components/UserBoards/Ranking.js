import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import GestionService from "../../services/gestion.service";
import EventBus from "../../common/EventBus";
import "../../styles/UserBoards/Ranking.css";
import { Link } from "react-router-dom";


const Ranking = () => {
    const [students, setStudents] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [user, setUser] = useState(null);
    const [showRanking, setShowRanking] = useState(false)

    useEffect(() => {
        fetchStudentsWithSameTeacher();

        AuthService.getCurrentUserFromDB()
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        });

        myTeacher();

    }, []);

    const fetchStudentsWithSameTeacher = () => {
        AuthService.getStudentsWithSameTeacher()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const myTeacher = () => {
        AuthService.getMyTeacher()
        .then((response) => {
          setTeacher(response.data);
          setShowRanking(response.data.flag_ranking)
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        });
    }

    const handleShowRanking = (flag) => {
        console.log("Acaba de entrar en el myTeacher con el parametro de entrada a "+ flag +". Actualmente esta a "+showRanking)
        GestionService.updateRankingVisibility(teacher, flag)
          .then((response) => {
                setTeacher(response.data)
                setShowRanking(flag)
                myTeacher();
          })
          .catch((error) =>
            console.error("Error actualizando la visibilidad del ranking:", error)
          );
    };

    return (
        <div className="container text-center">
            <h3 className="text-center mt-4">Ranking de alumnos</h3>
            {user?.username===user?.teacher && (
                <div className="gray-box">
                    <input
                        type="checkbox"
                        checked={showRanking}
                        onChange={(e) =>{
                            handleShowRanking(e.target.checked)
                            }
                        }
                    />
                    <span className="ml-2">Mostrar Ranking a los alumnos</span>
                </div>
            )}

            {showRanking && user?.username!==teacher?.username && (
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Usuario</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr
                            key={index}
                            className={
                                index === 0
                                    ? "gold"
                                    : index === 1
                                    ? "silver"
                                    : index === 2
                                    ? "bronze"
                                    : ""
                            }
                        >
                            <td>{index + 1}</td>
                            <td>
                                {index === 0 && <>🥇 {student.username}</>}
                                {index === 1 && <>🥈 {student.username}</>}
                                {index === 2 && <>🥉 {student.username}</>}
                                {index >= 3 && student.username}
                            </td>
                            <td>{student.scores.reduce((acc, score) => acc + score, 0).toString().replace('.',',')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>)}

            {user?.username===teacher?.username && (
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Usuario</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr
                            key={index}
                            className={
                                index === 0
                                    ? "gold"
                                    : index === 1
                                    ? "silver"
                                    : index === 2
                                    ? "bronze"
                                    : ""
                            }
                        >
                            <td>{index + 1}</td>
                            <td>
                                {index === 0 && <>🥇 {student.username}</>}
                                {index === 1 && <>🥈 {student.username}</>}
                                {index === 2 && <>🥉 {student.username}</>}
                                {index >= 3 && student.username}
                            </td>
                            <td>{student.scores.reduce((acc, score) => acc + score, 0).toString().replace('.',',')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>)}

            {!showRanking && user?.username!==teacher?.username && (
                <div>
                    Tu profesor ha desactivado la visualización del Ranking.
                    <p>
                        <Link to={"/resolver"} className="btn btn-custom btn-lg">Resolver ejercicios</Link>
                    </p>
                </div>
                
            )}
        </div>
    );
};

export default Ranking;
