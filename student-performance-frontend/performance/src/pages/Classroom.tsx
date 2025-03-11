import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { ClassRoomDetails, ClassRoomStudents } from "../types/classRooms";

const Classroom: React.FC = () => {
  const { fetchClassRoomDetails, fetchClassRoomStudents, deleteStudent } =
    useApi();
  const { id } = useParams();
  const [classRoom, setClassRoom] = useState<ClassRoomDetails | null>(null);
  const [students, setStudents] = useState<ClassRoomStudents[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchClassRoomDetails(Number(id));
        const studentsData = await fetchClassRoomStudents(Number(id));
        setStudents(studentsData);
        setClassRoom(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!classRoom) return <p>Turma não encontrada.</p>;

  return (
    <div>
      <h1>Classroom</h1>
      <p>Welcome to the classroom page!</p>
      <div>
        <p>ID: {classRoom.id}</p>
        <p>Code: {classRoom.code}</p>
        <p>Student Count: {classRoom.student_count}</p>
        <p>Pass Rate: {classRoom.pass_rate}%</p>
        <p>Students Passed: {classRoom.students_passed}</p>
        <p>Students Failed: {classRoom.students_failed}</p>
        <p>Average Attendance: {classRoom.average_attendance}%</p>
        <p>Average Hours Studied: {classRoom.average_hours_studied}</p>
        <p>Average Sleep Hours: {classRoom.average_sleep_hours}</p>
        <p>
          Most Common Motivation Level: {classRoom.most_common_motivation_level}
        </p>
        <p>
          Most Common Peer Influence: {classRoom.most_common_peer_influence}
        </p>
        <p>
          Most Common Teacher Quality: {classRoom.most_common_teacher_quality}
        </p>
      </div>
      <div>
        <h1>Students:</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Classes</th>
              <th>Attendance</th>
              <th>Previous Scores</th>
              <th>Hours Studied</th>
              <th>Motivation Level</th>
              <th>Peer Influence</th>
              <th>Final Result</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    <Link to={`/aluno/${student.id}`}>{student.name}</Link>
                  </td>
                  <td>{student.gender}</td>
                  <td>{student.age}</td>
                  <td>{student.classes}</td>
                  <td>{student.attendance}</td>
                  <td>{student.previous_scores}</td>
                  <td>{student.hours_studied}</td>
                  <td>{student.motivation_level}</td>
                  <td>{student.peer_influence}</td>
                  <td>{student.final_result}</td>
                  <td>
                    <button onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/editar-aluno/${student.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classroom;
