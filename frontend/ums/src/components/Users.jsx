import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Users = () => {
   useEffect( ()=>{
     const fetchData = async () => {
        try {
            let response = await axios.get('http://localhost:4000/getusers')
        } catch (error) {
            console.log('error while fetching', error)  //get token from local storage then give authorization in header
        }
    }
   }, [])
   
  return (
    <div>

    </div>
  )
}

export default Users