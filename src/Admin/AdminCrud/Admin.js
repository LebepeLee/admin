import React,{useState, useEffect} from 'react'
// import Hotels from '../pages/hotels/Hotels';
import { collection,getDocs,addDoc,doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { storage, db } from '../../firebaseConfig/firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import '../AdminCrud/admin.css'
import { useParams } from 'react-router-dom';

function Admin() {

    const [newHotel,setNewHotel] = useState('')
    const [newCity,setNewCity] = useState('')
    const [newPrice,setNewPrice] = useState(0)
    const [newRating, setNewRating] = useState('')
    const [hotel, setHotel] = useState([])
    const [picture,setPicture] = useState('')
    const [error,setError] = useState(false)
    const [percentage,setPercentage] = useState(0)
  
  
    const hotelCollectionRef = collection(db,'hotel')
      // const createHotel = async()=>{
      //   await addDoc(hotelCollectionRef,{hotel: newHotel, city: newCity, price: newPrice})
      //   .then(()=>{
      //     alert('Hotel added successfully')
      //   })
      //   .catch((error)=>{
      //     alert('The hotel was not added,sorry'+error)
      //   })
      // }

      const {id} = useParams();
      console.log('kkkkkk');
  
      const updateHotels = ()=>{
        const getDoc = doc(db,'hotel',id)
          updateDoc((getDoc),{
            name: newHotel,    
            city: newCity,
            price: newPrice,
            rating: newRating,
      
            }).then(()=>{
              alert('Updated successfully')
            }).catch((error)=>{
              alert('Failed to update'+error)
            })
        
      }
      
      function deleteHotel(id){
        const getDoc = doc(db,'hotel',id)
        deleteDoc(getDoc).then(()=>{
          alert('hotel deleted')
        }).catch(error=>{
          console.log(error)
        })
        
   }
  
    useEffect (()=>{
      const getHotels = async ()=>{
  
        const data = await getDocs(hotelCollectionRef)
        setHotel(data.docs.map((doc)=>({...doc.data()})))
      }
      getHotels()
    },[])
  
  
    function handleChange(event) {
      setPicture(event.target.files[0]);
  }    
  
  const handleSubmit = () =>{
    // e.preventDefault ()
  
    if (newHotel ===''){
     
      setError(true)
    
    }
    else if(newCity===''){
   
      setError(true)
    
    }
  
    else if(newPrice===''){
   
      setError(true)
    
    }
    else if(newRating===''){
   
      setError(true)
    
    }
    else addHotel()
  
  }
  
  const addHotel = () =>{
    
      if (!picture) {
        alert("Please upload an image first!");
    }
  
    const storageRef = ref(storage, `/files/${picture.name}`);
           
          const uploadTask = uploadBytesResumable(storageRef, picture);
   
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const percent = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                      
                      setPercentage(percent);
                    },
                    (err) => console.log(err),
                    () => {
                      
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                const collectionRef = collection(db, "hotel");
                const hotel={                    
                                      name: newHotel,
                                      city: newCity,
                                      price: newPrice,
                                      image: url,
                                      rating: newRating,
                                       
                                  };
                addDoc(collectionRef, hotel).then(() => {
                  console.log('added')
                  alert('added successfully')
                  
                }).catch((errr) => {
                  console.log(errr)
                
  
  
              });
                        });
    }
                );
  }

  return (
    <div className='admin'><h1>Administration</h1>
    <div className='wrapper'>
                         <h1>New hotel</h1>
                         <input type='file' accept='image/*' onChange={(e)=>handleChange(e)}/><br></br>
                        {/* <label><img src={imageUpload.image} alt='Hotel'/></label><br></br> */}
                        <input type='text' placeholder='hotel name' name='NameOfHotel' id='hotelName' onChange={(e)=>setNewHotel(e.target.value)}/><br></br>   
                        {error&newHotel === ' '?<p>please fill in the name of hotel</p>  : ''}
                         <input type='text' placeholder='name of the city' id='city' name='CityName' onChange={(e)=>setNewCity(e.target.value)}/><br></br>
                         {error&newCity === ' '?<p>please fill in the name of the City</p>  : ''}
                         <input type='number' placeholder='price' id='price' name='price' onChange={(e)=>setNewPrice(e.target.value)}/><br></br>
                         {error&newHotel === ' '?<p>please fill in Price</p>  : ''}
                         <input type='text' placeholder='Rating' id='rating' name='rating' onChange={(e)=>setNewRating(e.target.value)}/><br></br>
                         {error&newHotel === ' '?<p>please fill in Rating</p>  : ''}
                         <button onClick={()=>handleSubmit()}>Add new hotel</button><br></br>
                         <button onClick={(e)=>{deleteHotel(hotel.id)}}>Delete</button><br></br>
                         <button onClick={()=>updateHotels(hotel.id)}>Update</button><br></br>
                         </div>
</div>
    
    
  
  )
}

export default Admin