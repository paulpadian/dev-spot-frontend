import React, {useEffect, useContext, useState} from 'react'
import {useHistory} from 'react-router-dom';
import Axios from 'axios'
import UserContext from '../../context/UserContext'
import Comment from '../misc/Comment'
import M from 'materialize-css'



const ProjectDashboard = (props) => {
    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    let content, setContent = useState('')
    const [projectInfo, setProjectInfo] = useState({})
    const {userData} = useContext(UserContext)
    const history = useHistory();
    
    
    useEffect(() => {
        if(!userData.user) history.push('/login')
      });
   
    
    useEffect(() => {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
      }, []);

    
    useEffect(() => {
        console.log("🥇 this is the axios call" )
        console.log(userData.user, "🎸")
        console.log(userData.token)
        Axios.get(`http://localhost:5000/projects/5f22dfe1c86d6a6b22f82751`, {
            
            headers:{
            "x-auth-token": userData.token
            }
        }).then(response => {
            console.log(response)
            setProjectInfo(response.data);
            console.log(projectInfo)
        }).catch(err => {
            console.log(err)
        }, )
    }, [])
    
    
    return (
        <div className="container">
            <h2>Project Dashboard:</h2>
            <div className="projectDescription">
                <h5>Project.Name :</h5>
                    <div className=" row">
                        <div className="col s3">
                        <img src="http://placekitten.com/200/100" alt="project img" />
                        </div>
                    </div>
                    <div className=" row">
                        <div className="col s9">
                        <p>I'm baby pork belly bitters hoodie drinking vinegar, poutine vice literally small batch art party asymmetrical seitan before they sold out tacos.I'm baby pork belly bitters hoodie drinking vinegar, poutine vice literally small batch art party asymmetrical seitan before they sold out tacos. Raclette selvage yuccie, scenester bicycle rights roof party PBR&B four loko. Fam authentic knausgaard flannel hot chicken chillwave. VHS irony taxidermy, tofu franzen typewriter ennui. Iceland ramps hot chicken forage street art, keytar banh mi mustache prism distillery pinterest microdosing meggings.:</p>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                        <form className="" action="POST" route="">
                            <input type="submit" className="waves-effect waves-light btn-large" value="Apply" />
                        </form>
                        </div>
                    </div>
            </div>
            <div className>
                <h4>Post a comment</h4>
                <ul className="collapsible">
    <li>
      <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
  </ul>
                <div className="form-group">
                <label htmlFor="title">Title:</label>
                    <input type="text" name="title" value={ title }  className="form-control" />
                </div>
                    <Comment />
                </div>
        </div>
    )
    
}

export default ProjectDashboard