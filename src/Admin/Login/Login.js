import React ,{useState}from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebaseConfig/firebase'
import {db} from '../../firebaseConfig/firebase'
import {collection, getDocs} from 'firebase/firestore'
import '../Login/Login.css'

function Login() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState ('')
    const [error,setError] = useState(false)
 
    let history = useNavigate()

        const Login = (()=>{
    
          signInWithEmailAndPassword(auth, email, password).then(()=>{
            const collectionRef = collection(db, 'Admin');
            getDocs(collectionRef).then((snapshot)=>{
          alert('Logged in successfully')
          console.log(snapshot.docs);
        })
        .catch((error)=>{
          alert('failed to Login, sorry'+error.message)
        })
          }).catch((error)=>{
            
          })
    
        })
    
        const handleSubmit = (e) =>{
          e.preventDefault ()

          if (email.length ===' '){
           
            setError(true)
          
          }
          if(password===' '){
         
            setError(true)
          
          }
          if (email&&password){
            console.log(email,password)
            Login()
            history('/hotels')
          }

         }

  return (
    <div className='containerMain'>
    <div className='LoginContainer'>
    <form className='userInputs' onSubmit={handleSubmit}> 
      <h1>Login</h1>
      <input type = 'email' placeholder='Enter your E-mail'onChange={(e)=>setEmail(e.target.value)}/><br></br>
      {error&&email === ' '?
      <p>please fill in E-mail</p> : ''}<br></br>
        <input type = 'password' placeholder='Enter your password'onChange={(e)=>setPassword(e.target.value)}/><br></br>
        {error&&password === ' '?
      <p>please fill in E-mail</p> : ''}<br></br>
       
         <button className='btn-Login' onClick={handleSubmit}>Login</button><br></br>
   
         <span>Forgot Password?</span><br></br>
         <span className='link'><Link to ='/ForgotPassword'>Reset password</Link></span><br></br>
         <span>Do not have an account?</span><br></br>
         <span className='link'><Link to ='/SignUp'>Create an account</Link></span>
         </form>
    </div>
    </div>
  )
}

export default Login