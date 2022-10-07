import axios from 'axios';
import { authHeader } from '../utils/helper';

export default class PostUser{
    constructor(){
        this.API_URL = process.env.REACT_APP_API_URL;
    }
    async Request(data,type){
        try {
            switch(type){
                case "signup": 
                    return await axios.post(this.API_URL+'api/signin-user',
                        JSON.stringify(data), 
                        {headers: { 
                            'Content-Type': 'application/json'
                          }
                        })

                case "login": 
                    return await axios.post(this.API_URL+'api/login-user',
                        JSON.stringify(data), 
                        {headers: { 
                            'Content-Type': 'application/json'
                          }
                        })

                case "check-auth": 
                console.log( authHeader());
                    return await axios.post(this.API_URL+'api/check-auth',{}, {headers: authHeader()})


                default : 
                    return {message:"no case found"}
            }
        } catch (error) {
            console.log("error on try catch class(PostUser) on method(Create) ===>",error)
            return (error)
        }
    }
    
}



