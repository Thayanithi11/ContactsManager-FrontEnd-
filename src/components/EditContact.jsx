import React,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";


const EditContact=({EditContactHandler,editContact})=>{
    const editnavigate=useNavigate();

    if (!editContact) return <div>Loading contact...</div>;

    const [name, setName] = useState(`${editContact.name}`);
    const [email, setEmail] = useState(`${editContact.email}`);
     const update=(e)=>{
        e.preventDefault();
        if(name===""||email==="")
        {
            alert("All the fields are mandatory!!");
            return;
        }
        EditContactHandler({name:name,email:email});
        editnavigate('/')
    }
    return(
         <div className="ui main" style={{marginTop:"50px"}}>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={update}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name='name' 
                        placeholder={name}
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}/>
                    </div>
                    <div className="field">
                        <label>EMail</label>
                        <input type="text" name='email' 
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <button className="ui button blue">Edit</button>
                </form>
                <Link to="/">
                <button className="ui button orange" style={{marginTop:'15px'}}>Contactlist</button>
                </Link>
            </div>
    )
}

export default EditContact