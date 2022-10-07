import { useState,useEffect } from 'react';
import { All } from './components/all';
import { Active } from './components/active';
import { Completed } from './components/completed';
import PostToDoList from '../../Services/Todo';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import moment from 'moment'
import { emptyFields } from './../../utils/helper';

export const  Main = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [Tabs] = useState(["all","active","completed"]);
    const [CurrentTab,SetCurrentTab] = useState("all");
    const [ToDoTitle,SetToDo]  = useState(null)
    const [SampleTitle,SetSampleTitle]  = useState("")
    const [ToDoDescription,SetToDoDescription]  = useState("")
    const [Status,SetStatus] = useState("active");
    const [ToDoUpdId,SetToDoUpdId]  = useState(0)
    const [dummyToDo,SetdummyToDo] = useState([]);

    const [ActiveList, SetActiveList] = useState([]);
    const [AllList, SetAllList] = useState([]);
    const [CompletedList, SetCompletedList] = useState([]);

    const [Load,SetLoad] = useState(true);
    const [Submit,SetSubmit] = useState(false);
    const [SubmitUpdate,SetSubmitUpdate] = useState(false);
    const [SubmitDelete,SetSubmitDelete] = useState(false);

    const [EmptyField,SetEmptyField] = useState([]);


    const [ShowUpdateBtn,SetShowUpdateBtn] = useState(false);
    const [ShowView,SetShowView] = useState(false);


    const HandleUpdate = (item,type) => {


        console.log(item)

        switch(type){
            case "view":
                setStartDate(item.date_completed === null || item.date_completed === "" ? new Date() : new Date(item.date_completed))
                SetToDo(item.name)
                SetToDoDescription(item.description)
                SetStatus(item.status)
                SetToDoUpdId(item.id)
                SetShowUpdateBtn(false)
                SetShowView(true)

            break;

            case "update":
                setStartDate(item.date_completed === null  || item.date_completed === ""  ? new Date() : new Date(item.date_completed))
                SetToDo(item.name)
                SetToDoDescription(item.description)
                SetStatus(item.status)
                SetToDoUpdId(item.id)
                SetShowUpdateBtn(true)
                SetShowView(false)
            break;

            default:
                setStartDate(item.date_completed === null  || item.date_completed === ""  ? new Date() : new Date(item.date_completed))
                SetToDo(item.name)
                SetToDoDescription(item.description)
                SetStatus(item.status)
                SetToDoUpdId(item.id)
                SetShowUpdateBtn(true)
                SetShowView(false)
        }

    }

    const HandleDelete = (item) => {
        SetToDo("");
        SetStatus("active");
        SetToDoDescription("");
        SetEmptyField([]);
        SetToDoUpdId(item.id)
        SetSubmitDelete(true)
        SetShowUpdateBtn(false)
        SetShowView(false)
    }


    useEffect(()=>{
        if(Load){
            const InitiateSubmit = async () =>{
                return await new PostToDoList().Request({},"get-all")
            }
            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    const ListSeperator = (data) => {
                        let active = []
                        let completed = []
                        for(var item of data){
                            if(item.status==="active"){
                                active.push(item)
                            }
                            if(item.status==="completed"){
                                completed.push(item)
                            }
                        }
                        SetActiveList(active.reverse())
                        SetCompletedList(completed.reverse())
                        SetAllList(active.concat(completed))
                        console.log(active)
                        console.log(active.concat(completed))
                    }
                    ListSeperator(response.data.data)
                    
                    SetLoad(false);
                }else{
                    toast(response.message);
                }
            }).catch((error)=>{
                console.log(error)
                toast("something went wrong before sending to server");

            })
            const InitiateDummy = async () =>{
                return await new PostToDoList().Request({},"dummy-todos")
            }
            InitiateDummy().then((response)=>{
                SetdummyToDo(response.data.todos)
                const randomInteger = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                SetSampleTitle(response.data.todos[randomInteger(0,29)].todo)
            }).catch((error)=>{
                console.log(error)
                toast("something went wrong before sending to server");
            })
            console.log(dummyToDo)
            SetLoad(false);
        }
        if(Submit){
            const InitiateSubmit = async () =>{
                return await new PostToDoList().Request({
                    todo : ToDoTitle,
                    description : ToDoDescription,
                    status : Status
                },"create")
            }

            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    SetToDo("");
                    SetStatus("active");
                    SetToDoDescription("");
                    SetEmptyField([]);
                    SetLoad(true);
                    SetSubmit(false);
                }else{
                    SetEmptyField(emptyFields({
                        todo : ToDoTitle,
                        description : ToDoDescription
                    }))
                    toast(response.data.message);
                    SetSubmit(false);
                }
            }).catch((error)=>{
                console.log(error)
                toast("something went wrong before sending to server");
                SetSubmit(false);

            })
        }
        if(SubmitUpdate){
            const InitiateSubmit = async () =>{
                return await new PostToDoList().Request({
                    id : ToDoUpdId,
                    todo : ToDoTitle,
                    description : ToDoDescription,
                    status : Status,
                    completedDate:startDate
                },"update")
            }

            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    SetToDo("");
                    SetStatus("active");
                    SetToDoDescription("");
                    SetLoad(true);
                    SetEmptyField([]);
                    SetShowUpdateBtn(false)
                    SetSubmitUpdate(false);
                }else{
                    SetEmptyField(emptyFields({
                        todo : ToDoTitle,
                        description : ToDoDescription
                    }))
                    toast(response.data.message);
                    SetSubmitUpdate(false);
                }
            }).catch((error)=>{
                console.log(error)
                toast("something went wrong before sending to server");
                SetSubmitUpdate(false);

            })
        }
        if(SubmitDelete){
            const InitiateSubmit = async () =>{
                return await new PostToDoList().Request({
                    id : ToDoUpdId,
                    todo : ToDoTitle,
                    description : ToDoDescription,
                    status : Status
                },"delete")
            }

            InitiateSubmit().then((response)=>{
                if(response.status === 200){
                    SetToDo("");
                    SetLoad(true);
                    toast("To do list has been deleted");
                }else{
                    toast("Something went wrong status does not return ok");
                }
            }).catch((error)=>{
                console.log(error)
                toast("Something went wrong before sending to server");
            })
            
            SetSubmitDelete(false)
        }
    },[Load,Submit,SubmitUpdate,SubmitDelete,Status,ToDoTitle,ToDoUpdId,dummyToDo,ToDoDescription,startDate])

    const HandleLogout = () => {
        localStorage.removeItem("user")
        window.location.href = "/"
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarButtonsExample">
                    <a className="navbar-brand me-2" href="https://eveguelfreelancer.site">
                        <img src="https://eveguelfreelancer.com/images/arocha.PNG" height={50} alt="To do List Logo" loading="lazy" style={{marginTop: '-1px'}} />
                    </a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-link px-3 me-2" onClick={()=>{HandleLogout()}}> 
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card">
                                <div className='card-header text-center'>
                                    <h3>TO DO LIST APPLICATION</h3>
                                </div>
                                <div className="card-body p-5">
                                        <div className="d-flex justify-content-center align-items-center mb-4">
                                            <div className="form-outline flex-fill">
                                                
                                              
                                                    <label className="form-label" htmlFor="remarks">Title </label>
                                                    <br/>
                                                    <input 
                                                        type="text" 
                                                        id="form2" 
                                                        className={"form-control " + (EmptyField.includes("todo") ? " border border-danger" : "border border-dark")} 
                                                        value={ToDoTitle}
                                                        placeholder={"Suggestion: " + SampleTitle}
                                                        onChange={(e)=>{
                                                            SetToDo(e.target.value)
                                                        }}
                                                    />
                                                    
                                                    
                                                    <br/>
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="remarks">Description </label>
                                                        <br/>
                                                        <textarea 
                                                        className={"form-control " + (EmptyField.includes("description") ? " border border-danger" : "border border-dark")} 
                                                            id="textAreaExample" 
                                                            rows="4" 
                                                            value={ToDoDescription}
                                                            onChange={(e)=>{SetToDoDescription(e.target.value)}}></textarea>
                                                    </div>
                                                    
                                                    <br/>

                                                    <div className='row'>
                                                            <div className='col'>

                                                                <label className="form-label" htmlFor="remarks">Remarks</label>
                                                                <br/>
                                                                <select className="browser-default custom-select" id="remarks" onChange={(e)=>{SetStatus(e.target.value)}} value={Status}>
                                                                    <option value="active">Active</option>
                                                                    {ShowUpdateBtn || ShowView ? <option value="completed">Completed</option> : "" }
                                                                </select>

                                                            </div>
                                                            
                                                            <div className='col'>
                                                                
                                                                {
                                                                    Status === "completed"
                                                                    ?
                                                                        <>
                                                                        <label className="form-label" htmlFor="remarks">Date completed: </label>
                                                                        <br/>
                                                                        <DatePicker 
                                                                            className='form-control  border border-dark'
                                                                            selected={startDate} 
                                                                            onChange={(date) => setStartDate(date)} 
                                                                            minDate={moment().toDate()}/>
                                                                        </>
                                                                    :
                                                                    ""
                                                                }
                                                            </div>

                                                            <div className='col '>
                                                                <div className='float-end'>
                                                                {   
                                                                !ShowUpdateBtn ? 
                                                                        <button type="submit" 
                                                                            className="btn btn-info ms-2" 
                                                                            onClick={()=>{SetSubmit(true)}} 
                                                                            disabled={Submit} >
                                                                                {Submit ? "Loading": "Add"}
                                                                        </button>
                                                                        :
                                                                        <>
                                                                            <button type="submit" 
                                                                                style={{marginTop:"18px"}}
                                                                                className="btn btn-secondary ms-2"
                                                                                disabled={SubmitUpdate}
                                                                                onClick={()=>{SetSubmitUpdate(true)}}>{SubmitUpdate ? "Loading": "Save Update"}</button>
                                                                        </>
                                                                }
                                                                </div>
                                                            </div>
                                                    </div>
                                                    
                                            </div>
                                           
                                        </div>

                                        
                                        
                                                
                                        <div className="d-flex p-2" style={{backgroundColor:"#9FA6B2"}}> </div>
                                        <br/>

                                        <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                                            {Tabs.map((data,index)=>{
                                                return(
                                                    <li className="nav-item" role="presentation" onClick={()=>{
                                                        SetToDo("");
                                                        SetStatus("active");
                                                        SetToDoDescription("");
                                                        SetEmptyField([]);
                                                        SetCurrentTab(data) 
                                                        SetShowUpdateBtn(false)
                                                        SetStatus("active")}} 
                                                        key={index}>
                                                        <a className={"nav-link " + (CurrentTab === data ? "active" : "") } 
                                                            id="ex1-tab-1" data-mdb-toggle="tab" 
                                                            href="#ex1-tabs-1" 
                                                            role="tab" 
                                                            aria-controls="ex1-tabs-1"
                                                            aria-selected="true">
                                                            {data.toUpperCase()}
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                        <div className="tab-content" id="ex1-content" style={{height:"300px",overflow:"scroll"}}>
                                            {
                                                CurrentTab === "all" ? 
                                                <All allList={AllList}/> : 

                                                CurrentTab === "active" ? 
                                                <Active 
                                                    activeList={ActiveList} 
                                                    handleUpdate={HandleUpdate} 
                                                    handleDelete={HandleDelete}/> : 

                                                CurrentTab === "completed" ? 
                                                <Completed 
                                                    completedList={CompletedList} 
                                                    handleDelete={HandleDelete} 
                                                    handleUpdate={HandleUpdate}/> : ""
                                            }
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
  }