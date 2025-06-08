import React,{useRef} from 'react';
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList=(props)=>{
    const {contacts,setDeleteID,setEditID,term,searchfunction}=props;
    const inputElement=useRef("");
    const deleteContactHandler=(id)=>{
        setDeleteID(id);
    };
    const editContactHandler=(id)=>{
        setEditID(id);
    };
    const renderContactList=contacts.map((contact)=>{
        return(<ContactCard contact={contact} deleteContactHandler={deleteContactHandler} editContactHandler={editContactHandler}/>)
    })
    const getSearchTerm=()=>{
       searchfunction(inputElement.current.value)
    }
    return (
        <div className='ui celled list' style={{display:"flex",flexDirection:"column"}}>
            <h2>Contact List</h2>
            <div className="ui search">
                <div className="ui icon input" style={{marginBottom:"15px"}}>
                    <input type='text' ref={inputElement}
                    placeholder='search Contact'
                    className='prompt' value={term} 
                    onChange={getSearchTerm} />
                    <i className='search icon'></i>
                </div>
            </div>
            {renderContactList.length>0?renderContactList:"No Contacts available"}
            <Link to="/add">
            <button className='ui button blue right' style={{marginTop:'10px'}}>Add Contact</button>
            </Link>
        </div>
    )
}

export default ContactList