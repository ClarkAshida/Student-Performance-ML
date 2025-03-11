import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { StudentData } from "../types/students";

const Student: React.FC = () => {
  const { fetchStudentDetails } = useApi();
  const { id } = useParams();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchStudentDetails(Number(id));
        setStudent(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!student) return <p>Estudante não encontrado.</p>;

  return (
    <div>
      <h1>Student Information</h1>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Gender: {student.gender}</p>
      <p>Learning Disability: {student.learning_desability ? "Yes" : "No"}</p>
      <p>Parental Involvement: {student.parental_involvement}</p>
      <p>Access to Resources: {student.access_to_resources}</p>
      <p>Motivation Level: {student.motivation_level}</p>
      <p>Family Income: {student.family_income}</p>
      <p>Teacher Quality: {student.teacher_quality}</p>
      <p>Peer Influence: {student.peer_influence}</p>
      <p>Parental Education: {student.parental_education}</p>
      <p>Distance from Home: {student.distance_from_home}</p>
      <p>Hours Studied: {student.hours_studied}</p>
      <p>Attendance: {student.attendance}</p>
      <p>Extracurricular Activities: {student.extracurricular_activities}</p>
      <p>Sleep Hours: {student.sleep_hours}</p>
      <p>Previous Scores: {student.previous_scores}</p>
      <p>Internet Access: {student.internet_access ? "Yes" : "No"}</p>
      <p>Tutoring Sessions: {student.tutoring_sessions}</p>
      <p>School Type: {student.school_type}</p>
      <p>Physical Activity: {student.physical_activity}</p>
      <p>Final Result: {student.final_result}</p>
      <p>Classes: {student.classes}</p>
    </div>
  );
};

export default Student;
