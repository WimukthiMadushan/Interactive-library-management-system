import React from 'react'
import { ToastContainer} from 'react-toastify';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ViewBooks from './pages/ViewBooks/ViewBooks'
import AddBooks from './pages/AddBooks/AddBooks'
import ViewPublishers from './pages/ViewPublishers/ViewPublishers'
import ViewAuthors from './pages/ViewAuthors/ViewAuthors'
import ViewBorrows from './pages/ViewBorrows/ViewBorrows'
import ViewReservations from './pages/ViewReservations/ViewReservations'
import ViewBookCopies from './pages/ViewBookCopies/ViewBookCopies'
import AddPublishers from './pages/AddPublishers/AddPublishers'
import AddAuthors from './pages/AddAuthors/AddAuthors'
import AddBorrows from './pages/AddBorrows/AddBorrows'
import AddBookCopy from './pages/AddBookCopy/AddBookCopy'
import UpdateBook from './pages/UpdateBook/UpdateBook';
import UpdatePublisher from './pages/UpdatePublisher/UpdatePublisher';
import UpdateAuthor from './pages/UpdateAuthor/UpdateAuthor';


const App = () => {
  const url = "http://localhost:5000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-content">
      <Router>
        <Sidebar />
        <Routes> 
          <Route path ="/books" element ={<ViewBooks url={url} />}/>
          <Route path ="/addbooks" element ={<AddBooks url={url} />}/>
          <Route path ="/publishers" element ={<ViewPublishers url={url} />}/>
          <Route path ="/addpublishers" element ={<AddPublishers url={url} />}/>
          <Route path ="/authors" element ={<ViewAuthors url={url} />}/>
          <Route path ="/addauthors" element ={<AddAuthors url={url}/>}/>
          <Route path ="/borrows" element ={<ViewBorrows url={url} />}/>
          <Route path ="/addborrows" element ={<AddBorrows url={url}/>}/>
          <Route path ="/reservations" element ={<ViewReservations url={url} />}/>
          <Route path ="/bookcopy" element ={<ViewBookCopies url={url} />}/>
          <Route path ="/addcopy" element ={<AddBookCopy url={url} />}/>
          <Route path ="/updatebook/:id" element ={<UpdateBook url={url} />}/>
          <Route path ="/Updatepublisher/:id" element ={<UpdatePublisher url={url} />}/>
          <Route path ="/Updateauthor/:id" element ={<UpdateAuthor url={url} />}/>
        </Routes>
      </Router>

      </div>
    </div>
  )
}

export default App
