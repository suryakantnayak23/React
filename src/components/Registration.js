import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Modal({ fetchEmployees }) {
  const [student, setStudent] = useState({

    name: '',
    age: '',
    mobile: '',
    course:'',
    email: '',
    password: '',
    mark:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    axios.post('http://localhost:8080/student/save', student)
      .then(response => {
        alert("Registration successfuly");
        
       
      })
      .catch(error => {
        alert("Registration Failed");
      });
  };

  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-header">Student Registration</div>
      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age:</label>
            <input
                type="number"
                id="age"
                name="age"
                value={student.age}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>


          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Contact Number:</label>
            <input
                type="tel"
                id="mobile"
                name="mobile"
                value={student.mobile}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="course" className="form-label">Course:</label>
            <input
                type="text"
                id="course"
                name="course"
                value={student.course}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={student.password}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mark" className="form-label">mark:</label>
            <input
                type="text"
                id="mark"
                name="mark"
                value={student.mark}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>

        </form>
      </div>
    </div>
    </div>

  );
}

export default Modal;
