import React from 'react';
import {Link} from 'react-router-dom'
import user from "../assets/userImage.png"
import {useNavigate} from 'react-router-dom'


function ContactCard(props){
    const {contact,deleteContactHandler,editContactHandler}=props;
    const navigate=useNavigate()
    return (
    <div className='item'>
          <img className='ui avatar image' src={user} alt='user'/>
          <div className="content" onClick={() => navigate(`/contact/${contact.id}`)} style={{cursor:"pointer"}}>
            <div className="header">{contact.name}</div>
            <div>{contact.email}</div>
          </div>
          <i className='trash alternate outline icon'
          style={{color:"red",marginTop:"7px",marginLeft:'10px'}}
          onClick={()=>{
              deleteContactHandler(contact.id);
               navigate('/delete')
          }}></i>
          <i className='edit alternate outline icon'
          style={{color:"blue",marginTop:"7px"}}
          onClick={()=>{
              editContactHandler(contact.id);
               navigate('/edit')
          }}></i>
        </div>)
}

export default ContactCard