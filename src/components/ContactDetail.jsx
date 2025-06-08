import React from 'react';
import {useParams} from 'react-router-dom'
import user from "../assets/userImage.png"
import { Link } from 'react-router-dom';

function ContactDetail(props){
    const {contacts}=props
    const {id}=useParams()
    const contact=contacts.find(c=>c.id===id)
    if (!contact) return <p>Contact not found</p>;

    return (
        <div className="main">
            <div className='ui card centered'>
                <div className="image">
                    <img src={user} alt='user'/>
                </div>
                <div className="content">
                    <div className="header">{contact.name}</div>
                    <div className="description">{contact.email}</div>
                </div>
            </div>
            <div className="center-div" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Link to='/'><button className='ui button blue center'>Back to Contact-List</button></Link>
            </div>
        </div>
   )
}

export default ContactDetail