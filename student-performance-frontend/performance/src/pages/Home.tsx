import React from "react";
import { useApi } from "@/context/ApiContext";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { classRooms } = useApi();

  return (
    <div>
      <h1>Welcome to the Student Performance Dashboard</h1>
      <p>
        This is the home page where you can view and manage student performance
        data.
      </p>
      <ul>
        {classRooms.map((classRoom) => (
          <li
            key={classRoom.id}
            className="border-b py-2 flex justify-between cursor-pointer hover:bg-gray-100 p-2"
          >
            <Link
              to={`/turma/${classRoom.id}`}
              className="flex justify-between w-full"
            >
              <h2>{classRoom.code}</h2>
              <p>Students: {classRoom.student_count}</p>
              <p>Pass rate: {classRoom.pass_rate}%</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
