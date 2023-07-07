import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import StatsPage from "./StatsPage";
import '../../styles/UserBoards/SearchStudents.css'

const SearchStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    AuthService.getMyStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterStudents = () => {
    return students.filter((student) =>
      student.username.includes(searchTerm.toLowerCase())
    );
  };

  const handleStudentSelect = (e, student) => {
    e.preventDefault();
    setSelectedStudent(student);
    console.log(selectedStudent);
  };

  return (
    <div className="search-students">
      <h3 className="text-center mt-4">Estadísticas de alumnos</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar alumnos..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <ul className="list-group">
        {filterStudents().map((student) => (
          <li key={student._id} className="list-group-item">
            <button
              type="button"
              className="btn btn-link"
              onClick={(e) => handleStudentSelect(e, student)}
            >
              {student.username}
            </button>
          </li>
        ))}
      </ul>
      {selectedStudent && <StatsPage user={selectedStudent} />}
    </div>
  );
};

export default SearchStudents;