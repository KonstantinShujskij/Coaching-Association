import React from "react";
import { useSelector } from "react-redux";

import { FORM_PAGE, LIST_PAGE } from "./const";

import Header from "./components/Header";
import CreateForm from "./components/CreateForm";
import UserList from "./components/UserList";


function App() {
  const currentPage = useSelector((state) => state.app.currentPage);
  const treners = useSelector((state) => state.list.treners);

  return (
    <>
    <Header />
    <div className="app-body container">
      
      <div className="row">
        <div className="col">
          {(currentPage === FORM_PAGE && <CreateForm />)}  
          {(currentPage === LIST_PAGE && <>
              <h2 className="text-center mt-3 mb-3">Coach-List</h2>
              <UserList users={treners} /> 
          </>)}            
        </div>
      </div>      
    </div>    
    </>
  );
}

export default App;
