import React, { useState } from 'react';

const RegisterStudent: React.FC = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const studentData = {
            name,
            age,
            grade,
        };
        console.log('Student Registered:', studentData);
        // Add your form submission logic here
    };

    return (
        <div>
            <h2>Register Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="grade">Grade:</label>
                    <input
                        type="text"
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterStudent;