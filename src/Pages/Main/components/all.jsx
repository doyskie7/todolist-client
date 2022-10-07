import { MDBBadge } from "mdbreact";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


export const All = ({allList}) =>{
    return(
            <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1" style={{overFlow:"auto"}}>
                {allList.map((data,index)=>{
                   return(
                        <MDBContainer key={data.id}>
                            <ul className="list-group mb-0">
                                <li className="list-group-item border-0 mb-2 rounded" style={{backgroundColor: '#f4f6f7'}}>
                                    <MDBRow>
                                        <MDBCol sm="10">
                                            {data.name}
                                        </MDBCol>
                                        <MDBCol sm="2" className="float-right">
                                                <MDBBadge pill color="success">{data.status}</MDBBadge>
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