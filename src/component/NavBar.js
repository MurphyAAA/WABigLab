import {Col, Navbar,Container, ListGroup ,Form,Nav} from 'react-bootstrap';
import './NavBar.css';
import React from 'react';
import { BsCollectionPlay,BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
const id_filter={
  "All":1,
  "Favorites":2,
  "BestRate":3,
  "SeenLastMonth":4,  
  "Unseen":5,
}

function MyNavBar(props){
  
    return(
    <Col sm={4}>  {/*offset 指定列向右的偏移量，span指定列宽 */}
          <ListGroup className='bar txt-left ' varient="flush" >
            <Link to='/all'>
              {/* <ListGroup.Item id={id_filter.All} className='lg-item greybg' action onClick={()=>{clickHandler(id_filter.All)}} > */}
              <ListGroup.Item id={id_filter.All} className='lg-item greybg' action  >
                All
              </ListGroup.Item>
            </Link>
            <Link to='./Favorites'>
              {/* <ListGroup.Item id ={id_filter.Favorites} className='lg-item greybg' action onClick={()=>{clickHandler(id_filter.Favorites)}} > */}
              <ListGroup.Item id ={id_filter.Favorites} className='lg-item greybg' action >
                Favorites
              </ListGroup.Item>
            </Link>
            {/* <ListGroup.Item action onClick={alertClicked}> */}
            <Link to='./BestRated'>
              {/* <ListGroup.Item id ={id_filter.BestRate} className='lg-item greybg' action onClick={()=>{clickHandler(id_filter.BestRate)}} > */}
              <ListGroup.Item id ={id_filter.BestRate} className='lg-item greybg' action >
                Best Rated
              </ListGroup.Item>
            </Link>
            <Link to='SeenLastMonth'>
              {/* <ListGroup.Item id ={id_filter.SeenLastMonth} className='lg-item greybg' action onClick={()=>{clickHandler(id_filter.SeenLastMonth)}} > */}
              <ListGroup.Item id ={id_filter.SeenLastMonth} className='lg-item greybg' action  >
                Seen Last Month
              </ListGroup.Item>
            </Link>
            <Link to='Unseen'>
            {/* <ListGroup.Item id ={id_filter.Unseen} className='lg-item greybg' action  onClick={()=>{clickHandler(id_filter.Unseen)}} > */}
            <ListGroup.Item id ={id_filter.Unseen} className='lg-item greybg' action >
              Unseen
            </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      

    );
}

function TopNavbar(props){
    return(
        // <Navbar bg="primary" variant="dark">
        //   <Container>
        //       <Col sm={3} className='txt-left'>
        //         <Navbar.Brand href="#home">
        //         <BsCollectionPlay  />
        //             Film Library
        //         </Navbar.Brand>          
        //       </Col>
        //       <Col sm={3}>
        //         <input className='searchbox' type={"search"} value="search" />
        //       </Col>
        //       <Col sm={6} className='user'>
        //           <BsPersonCircle  fontSize="large"/>
        //       </Col>
        //   </Container>
        // </Navbar>
        <Navbar bg="primary" variant='dark'>
          <Container>
            <Link to='/all'>
              <Navbar.Brand>
                <BsCollectionPlay  /> &nbsp;
                Film Library
              </Navbar.Brand>
            </Link>
            <Nav className='mx-auto'>
            <Form>
              <Form.Control type="text" placeholder="Search" className="mr-sm-12" />
            </Form>
            </Nav>

            <Nav className='user'>
              <BsPersonCircle  fontSize="large"/>
            </Nav>

          </Container>
        </Navbar>

    );
}

export {MyNavBar,TopNavbar,id_filter};
