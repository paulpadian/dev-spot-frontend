import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';


const AllUserProjects = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [activeProjects, setActiveProjects] = useState([])

    async function getAllUserProjects () {
        if(!userData.user) history.push('/login');
        try {
            const eachProject = await Axios.get(`${process.env.REACT_APP_URL}/projects/all`, {
                headers: {
                    "x-auth-token":userData.token
                }
            });
            setActiveProjects(eachProject.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {getAllUserProjects()}, [])
    if(!activeProjects) {
        return null
    }
    console.log(activeProjects)
    
  
    const eachActiveProject = activeProjects.map((project, i) => {
        let applicants = project.applicants.map((applicant, i) => <div key={i}><li index={i}>{applicant.name}</li><li index2={i}>{applicant.message}</li><li index3={i}>{applicant.linkedinURL}</li><br /></div>)
        
        return(    
            <div className="card loginContainer" key={i}>
                <li >
                    {project.title}
                </li>
                <li>
                    {project.description}
                </li>
                <li>
                    {project.releaseDate}
                </li>
                <br></br>
                   <strong>Applicants</strong> : {applicants}
          
            </div>
        )
    })
    return (
        <div>
            <ul>
                
                {eachActiveProject}
            </ul>
        </div>
    );
};
export default AllUserProjects;