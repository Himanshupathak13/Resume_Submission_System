import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
const Profile = () => {
    const navigate=useNavigate();
    const logout=()=>{
        
        navigate('/')
    }

    axios.post("http://localhost:3001/profile", {
    }).then((response) => {

    })
    return (
        <div className="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

                <h4 className="p-2 mt-5">WELCOME TO YOUR PROFILE PAGE</h4>

            </section>
            <div class="container mt-5 ">
                <div className="row aligns-items-center justify-content-center">
                    <div className="col-sm-4">
                        <div className="field mb-3 m-2 text-center form-group">
                            YOUR IMAGE=
                        </div>
                        <div className="field mb-3 m-2 text-center form-group">
                            YOUR FIRST NAME=""
                        </div>

                        <div className="field mb-3 m-2 text-center form-group">
                            YOUR LAST NAME=
                        </div>
                        <div className="field mb-3 m-2 text-center form-group">
                            YOUR GENDER=
                        </div>
                        <div className="field mb-3 m-2 text-center form-group">
                            YOUR EMAIL=
                        </div>

                    </div>
                </div>

                <div className='text-center'>
                <button onClick={logout}className='btn btn-warning text-center'>Log Out</button>
                </div>

            </div>
        </div>
    )
}





export default Profile;
