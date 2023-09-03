import React, { useEffect, useState } from 'react'
import './manageStudentPage.css'

export default function StudentPage() {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [level, setLevel] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const saveStudent = () => {
        const student = {
            name: name,
            email: email,
            city: city,
            level: level
        };

        const http = new XMLHttpRequest();
        http.open('POST', 'http://localhost:8080//StudentDataMiniProject/student');
        http.setRequestHeader('content-type', 'application/json');
        http.send(JSON.stringify(student));
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 201) {
                    resetAll();
                } else if (http.status === 500) {
                    alert("Fail to save student..!");
                }
            }
        }
    };

    const deleteStudent = () => {
        if (studentId) {
            const student = {
                studentId: studentId,
                name: name,
                email: email,
                city: city,
                level: level
            };
            const http = new XMLHttpRequest();
            http.open('DELETE', 'http://localhost:8080//StudentDataMiniProject/student');
            http.setRequestHeader('content-type', 'application/json');
            http.send(JSON.stringify(student));
            http.onreadystatechange = () => {
                if (http.readyState === 4 && (http.status === 200 || http.status === 201)) {
                    // alert("Student Added successfully..!\nStudent Id : " + JSON.parse(http.responseText).studentId);
                    resetAll();
                } else if (http.readyState === 4 && http.status === 500) {
                    alert("Fail to delete student..!");
                }
            }
        } else {
            alert('Customer not selected..!');
        }
    };

    const updateStudent = () => {
        if (studentId) {
            const student = {
                studentId: studentId,
                name: name,
                email: email,
                city: city,
                level: level
            };
            const http = new XMLHttpRequest();
            http.open('PUT', 'http://localhost:8080//StudentDataMiniProject/student');
            http.setRequestHeader('content-type', 'application/json');
            http.send(JSON.stringify(student));
            http.onreadystatechange = () => {
                if (http.readyState === 4 && (http.status === 200 || http.status === 201)) {
                    // alert("Student Added successfully..!\nStudent Id : " + JSON.parse(http.responseText).studentId);
                    resetAll();
                } else if (http.readyState === 4 && http.status === 500) {
                    alert("Fail to update student..!");
                }
            }
        } else {
            alert('Customer not selected..!');
        }
    };

    const getStudents = () => {
        const http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:8080//StudentDataMiniProject/student', true);
        http.send();
        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                let res = http.responseText;
                if (res) {
                    setStudents(JSON.parse(res));
                }
            }
        }
    };

    const tableClick = (student) => {
        setStudentId(student.studentId);
        setName(student.name);
        setEmail(student.email);
        setCity(student.city);
        setLevel(student.level);
    }

    const reset = () => {
        resetAll();
    };

    const resetAll = () => {
        setStudentId('')
        setName('');
        setEmail('');
        setCity('');
        setLevel('');
        getStudents();
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h1>Manage Student</h1>
                    </div>
                    <div className='col-lg-4'>
                        <div>
                            <div className="form-cont">
                                <label className="form-label">Name</label>
                                <input value={name} onChange={(event) => { setName(event.target.value) }} type="text" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="form-cont">
                                <label className="form-label">Email</label>
                                <input value={email} onChange={(event) => { setEmail(event.target.value) }} type="email" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="form-cont">
                                <label className="form-label">City</label>
                                <input value={city} onChange={(event) => { setCity(event.target.value) }} type="text" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="form-cont">
                                <label className="form-label">Level</label>
                                <input value={level} onChange={(event) => { setLevel(event.target.value) }} type="number" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                            </div>
                            <div className='form-cont-btn'>
                                <button onClick={saveStudent} className='btn btn-primary'>Save</button>
                                <button onClick={reset} className='btn btn-warning'>Reset</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Student ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                onClick={(e) => { tableClick(student) }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                            >
                                                <td className='text-center'>{student.studentId}</td>
                                                <td className='text-center'>{student.name}</td>
                                                <td className='text-center'>{student.email}</td>
                                                <td className='text-center'>{student.city}</td>
                                                <td className='text-center'>{student.level}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                        <button onClick={resetAll} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-cont">
                                            <label className="form-label">Name</label>
                                            <input value={name} onChange={(event) => { setName(event.target.value) }} type="text" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                                        </div>
                                        <div className="form-cont">
                                            <label className="form-label">Email</label>
                                            <input value={email} onChange={(event) => { setEmail(event.target.value) }} type="email" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                                        </div>
                                        <div className="form-cont">
                                            <label className="form-label">City</label>
                                            <input value={city} onChange={(event) => { setCity(event.target.value) }} type="text" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                                        </div>
                                        <div className="form-cont">
                                            <label className="form-label">Level</label>
                                            <input value={level} onChange={(event) => { setLevel(event.target.value) }} type="number" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={resetAll} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button onClick={updateStudent} className='btn btn-success' data-bs-dismiss="modal">Update</button>
                                        <button onClick={deleteStudent} className='btn btn-danger' data-bs-dismiss="modal">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
