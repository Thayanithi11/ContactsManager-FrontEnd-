import React from 'react'
import { Link } from 'react-router-dom'

const DeletePage=({removeContactHandler})=>{
    return(
      <div className="main">
            <div className='ui card centered'>
                <div className="content">
                    <div className="header">
                        <h2>Are you sure that you want to delete the contact?</h2>
                    </div>
                </div>
            </div>
            <div className="center-div" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Link to='/'><button onClick={()=>{removeContactHandler()}} className='ui button red center'>Yes</button></Link>
                <Link to='/'><button className='ui button green center'>No</button></Link>
            </div>
        </div>
    )
}

export default DeletePage