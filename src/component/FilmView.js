import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { FilmLists } from './FilmTable';
import { FilmForm } from './FilmForm';
import {MyNavBar,TopNavbar} from './NavBar'
import { useLocation} from 'react-router-dom';
function DefaultRoute(){
    return (
        <h1>DefaultRoute!</h1>
    )
}

// function FilmRoute(props){
//     return(
//         <Container className="App">
//             <Row>
//                 <Col>    
//                    <TopNavbar />
//                 </Col>
//             </Row>
//             <Row>
//                 <MyNavBar filterFunction ={props.filterFunc} ></MyNavBar>
//                 {/* <FilmLists films={films}></FilmLists> */}
//                 <FilmLists films={props.films} deleteFilm={props.deleteFilm} addFilm={props.addFilm} editFilm={props.editFilm} changeFav ={props.changeFav} filterStatus ={props.filterStatus}></FilmLists>
            
//             </Row>
//             <Outlet />
//         </Container>
//     )
// }
function FilmRoute(props){
    
    // props.filterFunc(props.filterStatus)
    return(
        <FilmLists films={props.films} deleteFilm={props.deleteFilm}  editFilm={props.editFilm} changeFav ={props.changeFav} changeRating={props.changeRating} setFilms={props.setFilms} filterStatus ={props.filterStatus}></FilmLists>
    )
}
function Topbar(props){
    return(
        <Container className="App">
            <Row>
                <Col>    
                   <TopNavbar />
                </Col>
            </Row>
            <Row>
                {/* <MyNavBar filterFunction ={props.filterFunc} ></MyNavBar> */}
                {/* <FilmLists films={films}></FilmLists> */}
                <Outlet />
            </Row>
            
        </Container>
    )
}
function Filterbar(props){
    return(
        <Container className="App">
            <Row>
                {/* <MyNavBar filterFunction ={props.filterFunc} ></MyNavBar> */}
                <MyNavBar  ></MyNavBar>
                {/* <FilmLists films={films}></FilmLists> */}
                <Outlet />
            </Row>
            
        </Container>
    )
}
function FormRoute(props) {
    const location = useLocation();
    // console.log(props.filterStatus);
    return(
      <Container className='App'>
        <Row>
          <Col>
            <h1>Enter film data</h1>
          </Col>
        </Row>
        <Row>
          <Col>
          {/* 传films是为了添加的时候验证有没有title重复的 */}
            <FilmForm films={props.films} addFilm={props.addFilm} filterStatus={location.state.filterStatus} />
          </Col>
        </Row>
      </Container>
    );
}
function EditRoute(props) {
    const location = useLocation();
return(
    <Container className='App'>
    <Row>
        <Col>
        <h1>Update the film data</h1>
        </Col>
    </Row>
    <Row>
        <Col>
            <FilmForm films={props.films} editFilm={props.editFilm} addExam={props.addFilm} filterStatus={location.state.filterStatus}
            /* if reaching the form without a location.state we allow to add a new exam */ /> 
        </Col>
    </Row>
    </Container>
);
}


export{FilmRoute,DefaultRoute,Topbar,Filterbar,FormRoute,EditRoute}