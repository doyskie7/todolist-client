import React, { useEffect, useState } from 'react';
import { PublicRoutes } from './Routes/PublicRoutes';
import { PrivateRoutes } from './Routes/PrivateRoutes'
import PostUser from './Services/User';

function App() {

    const [Load,SetLoad] = useState(true);
    const [isAuthorized,SetisAuthorized] = useState(0);


    useEffect(()=>{
        if(Load){

            const InitiateSubmit = async () =>{
                return await new PostUser().Request({},"check-auth")
            }
            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    SetisAuthorized(1)
                    console.log(response.data.message);
                    SetLoad(false);
                }else{
                    SetisAuthorized(0)
                    console.log(response.data);
                    SetLoad(false);
                }
                
            }).catch((error)=>{
                console.log(error)
                SetLoad(false);
            })

        }
        SetLoad(false);
    },[Load])

    const renderElms = () => {
        if(isAuthorized === 0){
            return (
                <>
                    <PublicRoutes/>
                </>
            )
        }
        if(isAuthorized === 1){
            return (
                <>
                    <PrivateRoutes/>
                </>
            )
        }
    }

    return (
        <>
            {renderElms()}
        </>
    )

    
}

export default App;