import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function ImagePreview({ file }) {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }
    reader.onload = (e) => {
        setPreview(reader.result);
        console.log("hii");
    };
    return (
        <div>
            {preview ? <img src={preview} alt="preview" width="200px" height="200px" /> : "loading"}
        </div>
    )
};

function Register() {
    const initialValues = { file: "", firstName: "", lastName: "", gender: "", email: "", securityQuestion: "", securityAnswer: "", password: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        axios.post("http://localhost:3001/create", {
            file: formValues.file,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            gender: formValues.gender,
            email: formValues.email,
            securityQuestion: formValues.securityQuestion,
            securityAnswer: formValues.securityAnswer,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
        }).then((response) => {
            console.log(response);

            if (response.data.status === "success") {
                swal("Congrats! " + formValues.firstName, "Successfully Registered", "success");
                navigate("/Login");
            }
             else if (response.data === "plz fill the data properly") {
                swal("Hey! Fill all the details properly", "", "error");
            }
            else {
                
                if (response.data.status === "email error") {
                    swal('Already Registered User Go to Login Page', "", "warning");
                }
                else if (response.data.status === "securityAnswer error") {
                    swal('Give unique answer of your security Answer', "", "warning");
                }
            }
        }); 

    };
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordValidator=/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
        if (!values.file) {
            errors.file = "Upload image";
        }
        if (!values.firstName) {
            errors.firstName = "First Name is required";
        }
        if (!values.lastName) {
            errors.lastName = "Last Name is required";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else 
        if (!emailValidator.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.gender) {
            errors.gender = "Gender is required";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }else if(!passwordValidator.test(values.password)) {
            errors.password = "Password must not contain Whitespaces and should contain at least one uppercase,one lowercase,one special,one digit and password should be the length of 10-16 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        }else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password and Confirm Password should be same";
        }
        if (!values.securityQuestion) {
            errors.securityQuestion = "Security Question is required";
        }
        if (!values.securityAnswer) {
            errors.securityAnswer = "Unique Security Answer is required";
        }
        
        return errors;
    };
    return (

        <div className="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">
                <h4 className="p-2 mt-5">WELCOME TO REGISTRATION PAGE</h4>
            </section>

            <div class="container mt-5 ">
                <div className="row aligns-items-center justify-content-center">
                    <div className="col-sm-4">
                        <div className="form-row">
                            <div className='col-sm-4'>
                                <button className="btn btn-success" onClick={() => { fileRef.current.click(); }} >Upload Image</button>
                            </div>
                            <div className=''>
                                {ImagePreview}
                            </div >
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="field mb-3 m-2 text-center form-group">
                                <input
                                    hidden
                                    ref={fileRef}
                                    className='form-control text-center'
                                    type="file"
                                    name="file"
                                    placeholder="Upload Image"
                                    accept=".png, .jpg, .jpeg"
                                    value={formValues.file}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.file}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>First Name</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formValues.firstName}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.firstName}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Last Name</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formValues.lastName}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.lastName}</p>


                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Select Gender</label>
                                <select className='form-control text-center'
                                    name="gender"
                                    type="option"
                                    placeholder="Gender"
                                    onChange={handleChange}
                                    value={formValues.gender}>
                                    <option defaultValue>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="prefer not to say">Prefer Not to Say</option>
                                </select>
                            </div>
                            <p className='text-center alert-danger'>{formErrors.gender}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Email</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.email}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Select Security Question</label>
                                <select className='form-control text-center'
                                    name="securityQuestion"
                                    type="option"
                                    placeholder="Select Security Question"
                                    onChange={handleChange}
                                    value={formValues.securityQuestion}>
                                    <option defaultValue>Select Security Question</option>
                                    <option value="What is your school name?">What is your school name?</option>
                                    <option value="What is your pet name?">What is your pet name?</option>
                                    <option value="Which is your favourite place?">Which is your favourite place?</option>
                                    <option value="Which is your favourite sport?">Which is your favourite sport?</option>
                                    <option value="Who is your best friend?">Who is your best friend?</option>
                                </select>
                            </div>
                            <p className='text-center alert-danger'>{formErrors.securityQuestion}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Answer of Security Question</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="securityAnswer"
                                    placeholder="Security Answer"
                                    value={formValues.securityAnswer}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.securityAnswer}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Password</label>
                                <input
                                    className='form-control text-center'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.password}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Confirm Password</label>
                                <input
                                    className='form-control text-center'
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formValues.confirmPassword}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.confirmPassword}</p>

                            <div className='mb-3 m-2 text-center form-group'>
                                <button className="btn btn-warning text-center">Register</button>
                            </div>
                              {Object.keys(formErrors).length === 0 && isSubmit ? (
                                <div className="text-center alert alert-success">REGISTERED SUCCESSFULLY </div>
                            ) : (<pre className="text-left justify-content">{JSON.stringify(formValues, undefined, 2)}</pre>
                            )} 
 

                        </form>
                    </div>
                </div>
            </div >
        </div >


    )
}
export default Register;













