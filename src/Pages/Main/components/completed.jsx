import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


export const Completed = ({completedList,handleDelete,handleUpdate}) =>{
    return(
            <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1" style={{overFlow:"auto"}}>
                {completedList.map((data,index)=>{
                   return(
                        <MDBContainer key={data.id}>
                            <ul className="list-group mb-0">
                                <li className="list-group-item border-0 mb-2 rounded" style={{backgroundColor: '#f4f6f7'}}>
                                    <MDBRow>
                                        <MDBCol sm="6">
                                            {data.name}
                                        </MDBCol>
                                        <MDBCol  sm="2" className="float-right">
                                            <button className="btn btn-secondary btn-sm" onClick={()=>{handleUpdate(data,"update")}}>Update</button>
                                        </MDBCol>
                                        <MDBCol  sm="2" className="float-right">
                                            <button className="btn btn-danger btn-sm" onClick={()=>{handleDelete(data)}}>Delete</button>
                                        </MDBCol>
                                        <MDBCol  sm="2" className="float-right">
                                            <button className="btn btn-info btn-sm" onClick={()=>{handleUpdate(data,"view")}}>View</button>
                                        </MDBCol>
                                    </MDBRow>
                                </li>
                            </ul>
                        </MDBContainer>
                   )
                })}
            </div>
        )
    }