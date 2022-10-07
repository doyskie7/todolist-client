import axios from 'axios';
import { authHeader } from '../utils/helper';


export default class PostToDoList{
    constructor(){
        this.API_URL = process.env.REACT_APP_API_URL;
    }
    async Request(data,type){
        try {
            switch(type){
                case "create": 
                    return await axios.post(this.API_URL+'api/create-todo',
                        JSON.stringify(data), 
                        {headers: { 
                            'Content-Type': 'application/json',
                            'x-access-token': authHeader()['x-access-token']
                          }
                        })

                case "get-all": 
                    return await axios.post(this.API_URL+'api/fetch-todo',
                        JSON.stringify(data), 
                        {headers: { 
                            'Content-Type': 'application/json',
                            'x-access-token': authHeader()['x-access-token']
                          }
                        })
                case "update": 
                    return await axios.post(this.API_URL+'api/update-todo',
                        JSON.stringify(data), 
                        {headers: { 
                            'Content-Type': 'application/json',
                            'x-access-token': authHeader()['x-access-token']
                          }
                        })

                case "delete": 
                        return await axios.post(this.API_URL+'api/delete-todo',
                            JSON.stringify(data), 
                            {headers: { 
                                'Content-Type': 'application/json',
                                'x-access-token': authHeader()['x-access-token']
                              }
                            })
                case "dummy-todos": 
                        return await axios.get('https://dummyjson.com/todos')

                default : 
                    return {message:"no case found"}
            }
        } catch (error) {
            console.log("error on try catch class(PostCreateToDo) on method(Create) ===>",error)
            return (error)
        }
    }
    
}



