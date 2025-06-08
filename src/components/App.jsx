import React,{useState,useEffect} from "react";
import { BrowserRouter as Router,Routes,Route,useNavigate} from "react-router-dom";
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail";
import DeletePage from './DeletePage';
import EditContact from './EditContact'
import { v4 as uuidv4} from 'uuid'
import api from '../api/contacts'
import 'semantic-ui-css/semantic.min.css';

function App() {
   const LOCAL_STORAGE_KEY="contacts";
  const[contacts,setContacts]=useState([]);
  const[deleteId,setDeleteId]=useState();
  const[EditId,setEditId]=useState();
  const [editContact,setEditContact]=useState()
  const [searchTerm,setSearchTerm]=useState("")
  const [searchResults,setSearchResults]=useState([])
  
  const addContactHandler=async (contact)=>{
    const request={
      id:uuidv4(),
      ...contact
    }
    try{
    const response=await api.post('/contacts',request)
    setContacts([...contacts,response.data]);
    }
    catch(err)
    {
      console.log("Failed to add contact")
    }
  }
  
  const EditContactHandler=async (contact)=>{
     const request={
      id:EditId,
      ...contact
    }
    try{
    const response=await api.put(`/contacts/${EditId}`,request)
    setContacts(contacts.map((c) => (c.id === EditId ? response.data : c)));
 }
    catch(err)
    {
      console.log("Failed to add contact")
    }
  }

  const searchHandler= (searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm!==""){
      const newContactList=contacts.filter((contact)=>{
        return Object.values(contact)
               .join(" ")
               .toLowerCase()
               .includes(searchTerm.toLowerCase());
      })
      console.log(newContactList)
      setSearchResults(newContactList)
    }
    else{
      setSearchResults(contacts)
    }
  }

  const retrieveContacts = async ()=>{
    const response =await api.get('/contacts');
    return response;
  }

  const removeContactHandler=async ()=>{
    await api.delete(`/contacts/${deleteId}`)
    const newContactList=contacts.filter((contact)=>{
      return contact.id!==deleteId;
    })
    setContacts(newContactList);
  }

  const setDeleteID=(id)=>{
      setDeleteId(id);
  }
   const setEditID=(id)=>{
      console.log("here")
      setEditId(id);
  }
  useEffect(()=>{
    const editcontact=contacts.find((contact)=>{
      return contact.id===EditId;
  })
    if(editcontact) setEditContact(editcontact)},[EditId])

  useEffect(()=>{
    if(contacts.length>0){
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
    }
  },[contacts])

    useEffect(()=>{
    // const retrienveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrienveContacts) setContacts(retrienveContacts);
    const getContacts=async ()=>{
       const allContacts=await retrieveContacts();
       if(allContacts) setContacts(allContacts.data);
    }
    getContacts();
  },[])

  
const AddContactWrapper = (props) => {
  const navigate = useNavigate();
  return <AddContact {...props} navigate={navigate} />;
};


  return <div className="ui container" style={{ marginTop: "50px" }}>
    <Router>
      <Header/>
      <Routes>
       <Route path="/add" element={<AddContactWrapper addContactHandler={addContactHandler}/>}/>
       <Route path="/" element={<ContactList contacts={searchTerm.length<1?contacts:searchResults} setDeleteID={setDeleteID} setEditID={setEditID} term={searchTerm} searchfunction={searchHandler}/>}/>
       <Route path="/contact/:id" element={<ContactDetail contacts={contacts}/>}/>
       <Route path="/delete" element={<DeletePage removeContactHandler={removeContactHandler}/>}/>
       <Route path="/edit" element={<EditContact EditContactHandler={EditContactHandler} editContact={editContact}/>}/>
      </Routes>
    </Router>
     </div>
}

export default App
