import React from "react";
import { useApi } from "@/context/ApiContext";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { classRooms, registerClassRoom, deleteClassRoom } = useApi();
  const [classRoomCode, setClassRoomCode] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassRoomCode(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerClassRoom({ code: classRoomCode });
      setClassRoomCode("");
      alert("Turma criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar turma:", error);
    }
  };

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
            <button
              onClick={() => deleteClassRoom(classRoom.id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Remover
            </button>
          </li>
        ))}
        <div>
          <h1>Criar nova turma</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Código da turma"
              value={classRoomCode}
              onChange={handleChange}
            />
            <button type="submit">Criar turma</button>
          </form>
        </div>
      </ul>
    </div>
  );
};

export default Home;
