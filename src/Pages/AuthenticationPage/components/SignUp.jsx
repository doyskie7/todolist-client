import { useState,useEffect } from "react"
import PostUser from '../../../Services/User'
import { ToastContainer, toast } from 'react-toastify';




export const SignUp = () => {

    const [Name,SetName] = useState("");
    const [Email,SetEmail] = useState("");
    const [Password,SetPassword] = useState("");
    const [ConPassword,SetConPassword] = useState("");


    const [Submit,SetSubmit] = useState(false);

    useEffect(()=>{
        if(Submit){
            const InitiateSubmit = async () =>{
                return await new PostUser().Request({
                    name:Name,
                    email:Email,
                    password:Password,
                    conpassword:ConPassword,
                },"signup")
            }
            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    toast(response.data.message);
                    SetSubmit(false);
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
    },[Submit,Name,Email,Password,ConPassword])


    return (
        <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="mdb-tab-register">

            <div className="form-outline mb-4">
            <input type="text" id="registerName" className="form-control" onChange={(e) => {SetName(e.target.value)}}/>

            <label className="form-label" htmlFor="registerName" style={{marginLeft: '0px'}}>Name</label>
                <div className="form-notch">
                    <div className="form-notch-leading" style={{width: '9px'}} />
                    <div className="form-notch-middle" style={{width: '42.4px'}} />
                    <div className="form-notch-trailing" />
                </div>
            </div>
 
            <div className="form-outline mb-4">
            <input type="email" id="registerEmail" className="form-control" onChange={(e) => {SetEmail(e.target.value)}}/>
            <label className="form-label" htmlFor="registerEmail" style={{marginLeft: '0px'}}>Email or Username</label>
                <div className="form-notch">
                    <div className="form-notch-leading" style={{width: '9px'}} />
                    <div className="form-notch-middle" style={{width: '40px'}} />
                    <div className="form-notch-trailing" />
                </div>
            </div>
          
          
            <div className="form-outline mb-4">
                <input type="password" id="registerPassword" className="form-control"  onChange={(e) => {SetPassword(e.target.value)}}/>
                <label className="form-label" htmlFor="registerPassword" style={{marginLeft: '0px'}}>Password</label>
                <div className="form-notch">
                    <div className="form-notch-leading" style={{width: '9px'}} />
                    <div className="form-notch-middle" style={{width: '64.8px'}} />
                    <div className="form-notch-trailing" />
                </div>
            </div>
        
        
            <div className="form-outline mb-4">
                <input type="password" id="registerRepeatPassword" className="form-control" onChange={(e) => {SetConPassword(e.target.value)}}/>
                <label className="form-label" htmlFor="registerRepeatPassword" style={{marginLeft: '0px'}}>Repeat password</label>
                <div className="form-notch">
                    <div className="form-notch-leading" style={{width: '9px'}} />
                    <div className="form-notch-middle" style={{width: '106.4px'}} />
                    <div className="form-notch-trailing" />
                </div>
            </div>
    

            <button type="submit" 
                className="btn btn-primary btn-block mb-1" 
                onClick={()=>{SetSubmit(true)}} 
                disabled={Submit}>
                {Submit ? "Loading...." : "Sign in"}
            </button>
          
          <ToastContainer />
      </div>
    )
}