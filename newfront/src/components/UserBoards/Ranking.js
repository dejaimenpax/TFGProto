import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "../../styles/UserBoards/Ranking.css";

const Ranking = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudentsWithSameTeacher();
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

    return (
        <div className="container text-center">
            <h3 className="text-center mt-4">Ranking de alumnos</h3>
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
                            <td>{student.scores.reduce((acc, score) => acc + score, 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ranking;
