
import { useState,useEffect } from "react"
import PostUser from '../../../Services/User'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate();
    const [Email,SetEmail] = useState(""); 
    const [Password,SetPassword] = useState(""); 
    const [Submit,SetSubmit]= useState(false); 

    useEffect(()=>{
        if(Submit){
            const InitiateSubmit = async () =>{
                return await new PostUser().Request({
                    email:Email,
                    password:Password,
                },"login")
            }
            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    localStorage.setItem("user",JSON.stringify(response.data.user))
                    window.location.href = "/todo"
                }else{
                    toast(response.data.message);
                    SetSubmit(false);
                }
            }).catch((error)=>{
                console.log(error)
                toast("something went wrong before sending to server");
                SetSubmit(false);
            })
        }
    },[Submit])


    let HandleRegisterRoute = () => {
        document.getElementById("mdb-tab-register").click();
    }


    return (
        <div className="tab-pane fade active show" id="pills-login" role="tabpanel" aria-labelledby="mdb-tab-login">
            <div className="form-outline mb-4">
                <input type="email" id="loginName" className="form-control" onChange={(e) => {SetEmail(e.target.value)}}/>
                <label className="form-label" htmlFor="loginName" style={{marginLeft: '0px'}}>Email</label>
                <div className="form-notch">
                    <div className="form-notch-leading" style={{width: '9px'}} />
                    <div className="form-notch-middle" style={{width: '114.4px'}} />
                    <div className="form-notch-trailing" />
                </div>
            </div>
            
            <div className="form-outline mb-4">
                <input type="password" id="loginPassword" className="form-control" onChange={(e) => {SetPassword(e.target.value)}}/>
                <label className="form-label" htmlFor="loginPassword" style={{marginLeft: '0px'}}>Password</label>
                <div className="form-notch">
                    <div className="form-notch-leading" style={{width: '9px'}} />
                    <div className="form-notch-middle" style={{width: '64.8px'}} />
                    <div className="form-notch-trailing" />
                </div>
            </div>
        

            <button type="submit" 
                className="btn btn-primary btn-block mb-1" 
                onClick={()=>{SetSubmit(true)}} 
                disabled={Submit}>
                {Submit ? "Loading...." : "Login"}
            </button>

            <div className="text-center">
                <p className="mb-1">Not a member? <b onClick={()=>{HandleRegisterRoute()}} >Register</b></p>
            </div>
            <ToastContainer/>
        </div>
    )
}