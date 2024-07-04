import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [openMenu, setOpenMenu] = React.useState(null);

    function handleToggle(menu) {
        setOpenMenu(openMenu === menu ? null : menu);
    }

  return (
    <div className="sidebar">
        <ul>
            <div className='sidebar-options'><Link to={"/"}><p>Dashboard</p></Link></div>
            <div className='sidebar-options' onClick={() => handleToggle("books")} >
                <p>Books  <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span></p>
                {openMenu === 'books' && (
                    <div className='sub-menu'>
                        <Link className='sidebar-option' to={"/books"}><p>View Books</p></Link>
                        <Link className='sidebar-option' to={"/addbooks"}><p>Add Books</p></Link>
                    </div>
                )}
            </div>
            <div className='sidebar-options' onClick={() => handleToggle("publish")} >
                <p>Publishers <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span></p>
                {openMenu === 'publish' && (<div className='sub-menu'>
                    <Link className='sidebar-option' to={"/publishers"}><p>View Publishers</p></Link>
                    <Link className='sidebar-option' to={"/addpublishers"}><p>Add New Publisher</p></Link>
                </div>)}
            </div>
            <div className='sidebar-options' onClick={() => handleToggle("author")} >
                <p>Authors <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span> </p>
                {openMenu === 'author' && (<div className='sub-menu'>
                    <Link className='sidebar-option' to={"/authors"}><p>View Authors</p></Link>
                    <Link className='sidebar-option' to={"/addauthors"}><p>Add New Author</p></Link>
                </div>)}
            </div>
            <div className='sidebar-options' onClick={() => handleToggle("borrow")} >
                <p>Borrows <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span> </p>
                {openMenu === 'borrow' && (<div className='sub-menu'>
                    <Link className='sidebar-option' to={"/borrows"}><p>View Borrows</p></Link>
                    <Link className='sidebar-option' to={"/addborrows"}><p>Add New Borrow</p></Link>
                </div>)}
            </div>
            <div className='sidebar-options' onClick={() => handleToggle("reserve")} >
                <p>Reservations <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span> </p>
                {openMenu === 'reserve' && (<div className='sub-menu'>
                    <Link className='sidebar-option' to={"/reservations"}><p>View Reservations</p></Link>
                </div>)}
            </div>
            <div className='sidebar-options' onClick={() => handleToggle("bookCopy")} >
                <p>Book Copies <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span> </p>
                {openMenu === 'bookCopy' && (<div className='sub-menu'>
                    <Link className='sidebar-option' to={"/bookcopy"}><p>View Book Copies</p></Link>
                    <Link className='sidebar-option' to={"/addcopy"}><p>Add New Book Copy</p></Link>
                </div>)}
            </div>
        </ul>
    </div>
  )
}

export default Sidebar


            