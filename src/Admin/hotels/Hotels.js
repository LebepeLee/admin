import React,{useState} from 'react'
import './Hotels.css'
import {useNavigate} from 'react-router-dom'
import { db } from '../../../src/firebaseConfig/firebase';
import { useEffect } from 'react';
import { getDocs,collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';


export default function Hotels() {

const navigate = useNavigate();

const [hotels, setHotels] = useState([])
const [newHotel, setNewHotel] = useState('')
const [newCity, setNewCity] = useState('')
const [newPrice,setNewPrice] = useState(0)
const [newRating, setNewRating] = useState('')
// var user = auth.currentUser;
// console.log(user.uid);
const hotelsCollectionRef = collection(db,'hotel')
useEffect(()=>{
      const getHotels = async ()=>{

            const data = await getDocs(hotelsCollectionRef)
            setHotels(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
            console.log(data)
          }
          getHotels()
            },[])
            
            const updateHotels = (id)=>{
                 
                  navigate(`/admin/${id}`)
                  console.log(id);
                }
                
                function deleteHotel(id){
                  const getDoc = doc(db,'hotel',id)
                  deleteDoc(getDoc).then(()=>{
                    alert('hotel deleted')
                  }).catch(error=>{
                    console.log(error)
                  })
                  
             }
// useEffect(()=>{
//       if(user != null){
//             setIsLoggedIn(true)
//       }else{
//             setIsLoggedIn(false)
//       }
// },[user])
   
      
  return (
    <div className='container'>
        <h2>Hotels guests love</h2>
        <div className='parent'>
            

            {
                  hotels.map((hotel, index)=>(
                      
                        <div className='hotels' key={index}>
                     
                      
                        <img className='picture' src={hotel.image} alt="imag" />
                        <span className='hotelName'>{hotel.name}</span><br></br>
                        <span className='city'>{hotel.city}</span><br></br>
                        <span className='price'>R{hotel.price}</span><br></br>
                        <span className='price'>Rating {hotel.rating}</span><br></br>
                      
                        <button className="UpdateButton" onClick={()=>updateHotels(hotel.id)} >Update</button><br></br>
                        <button className="DeleteButton" onClick={()=>deleteHotel(hotel.id)} >Delete</button><br></br>
                  
                        
                  </div>
                

                  ))
            }

                   

            
                </div>
        </div>
  )
}
