import React from "react";
import Nav from "react-bootstrap/Nav";
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';


function NavbarApp(props) {
  return (

      
      
    <Nav variant="tabs" defaultActiveKey='/invoices' >
   
    <Nav.Item >
      <Nav.Link eventKey="/invoices" href="/invoices">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item >
      <Nav.Link eventKey="/consoles" href="/consoles">Consoles</Nav.Link>
    </Nav.Item>
    <Nav.Item >
      <Nav.Link eventKey="/games" href="/games">Games</Nav.Link>
    </Nav.Item>
    <Nav.Item >
      <Nav.Link eventKey="/tshirts" href="/tshirts">Tshirts</Nav.Link>
    </Nav.Item>
    <div>
<h1 id="invoicesTitle">GameStore</h1>
</div>
  </Nav>


  
  


    
  );
}

export default NavbarApp;
