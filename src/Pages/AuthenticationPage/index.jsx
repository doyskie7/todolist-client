import { Login } from "./components/Login"
import { SignUp } from "./components/SignUp"


export const AuthenticationPage = () => {
    return(
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card">
                        <div className="card-body p-5">


                        <div className="modal-body p-4">

                          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="mdb-tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="mdb-tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
                            </li>
                          </ul>

                          <div className="tab-content">

                            <Login/>
                            <SignUp/>

                           

                          </div>

                        </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    )
}