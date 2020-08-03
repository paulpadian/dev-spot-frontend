import React, {useEffect, useContext, useState} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
const CreateProject = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [redirect, setRedirect] = useState(false)
    
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    console.log(userData)
    async function createProject(e) {
        e.preventDefault();
        // if(!userData.username) history.push('/login');
        try {
            const newProject = {
                title,
                description
            };
            const newProj = await Axios.post(`${process.env.REACT_APP_URL}/projects/new`, newProject, {
                headers:{
                    "x-auth-token":userData.token
                }
            })
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }
    if (redirect === true) {
        return <Redirect to='/' />
    }
    return (
        <div className="create-a-project">
            <div className="row">
                <h4 className="center">The web is your canvas! Make your ideas a reality so that you and others can learn and grow together!</h4>
                <div className="col s12">
                    <div className="loginContainer card card-body create-project-form">
                        <h4 className="py-2">Create A Project</h4>
                        <form onSubmit={createProject}>
                            <div className="input-field col s12">
                                <label htmlFor="name">Title</label>
                                <input type="text" name="name" value={title} onChange={handleTitle} className="validate" />
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="email">Description</label>
                                <input type="text" name="description" value={description} onChange={handleDescription} className="validate" />
                            </div>
                           
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
};
export default CreateProject;