import {Button, Form,Row,Col, FloatingLabel} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import { BsStarFill,BsStar } from "react-icons/bs";
import { useLocation, useNavigate ,Link} from 'react-router-dom';
import {name_filter} from './FilmTable'

function FilmForm(props){
    const navigate = useNavigate();
    const location = useLocation();
    const [titleExist,setTitleExist] = useState(false);

    const [title,setTitle] = useState(location.state.film? location.state.film.title:'');
    const [fav,setFav] = useState(location.state.film? location.state.film.favorite:false);
   
    // const [date,setDate] = useState(dayjs());
    const [date,setDate] = useState(()=>{
        if(location.state.film !==undefined){
            if(location.state.filmDate!==undefined){
                return dayjs(location.state.filmDate).format('YYYY-MM-DD')
            }
        }
        // props.film.date!==undefined? props.film.date.format('YYYY-MM-DD'):undefined
    });
    const [rating,setRating] = useState(()=>{
        if(location.state.film !==undefined){
            if(location.state.film.rating!==undefined){
                return location.state.film.rating
            }
        }
        else return 0;
        // props.film.rating!==undefined? props.film.rating:0
    });
    const [stars,setStars] = useState(()=>{
        let stararr= [];
        // if(location.state !==null){
            if( location.state.film===undefined || location.state.film.rating ===undefined){
                for(let i=0;i<5;++i){
                    stararr.push(<Button key={i} id={i} variant="light" onClick={()=>{clickHandler(i)}}><BsStar /></Button>);
                }
            }else{
                for(let i=0;i<location.state.film.rating;++i){
                    stararr.push(<Button key={i+'f'} id={i} variant="light" onClick={()=>{clickHandler(i)}}><BsStarFill/></Button>);
                }
                for(let i=location.state.film.rating;i<5;++i){
                    stararr.push(<Button key={i+'b'} id={i} variant="light" onClick={()=>{clickHandler(i)}}><BsStar/></Button>);
                }
            }
        // }
        return stararr;
    });
    const isEditing = location.state.film ? true:false;
    const clickHandler=(id)=>{
        setRating(id+1);
        setStars((stars)=>{
            // let stararr= [];
            return stars.map((s,idx)=>{
                if(idx<=id)
                    return <Button key={idx+'f'} id={idx} variant="light" onClick={()=>{clickHandler(idx)}}><BsStarFill/></Button>
                else
                    return <Button key={idx+'b'} id={idx} variant="light" onClick={()=>{clickHandler(idx)}}><BsStar/></Button> 
            })
            // return stararr;
        })
      
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        let film={}
        if(date===undefined || date===""){
            film = {title:title,favorite:fav,rating:rating}; 
        }else{
            film = {title:title,favorite:fav,date:dayjs(date),rating:rating};
        }
        
        if(isEditing)
            props.editFilm(film);
        else   
            props.addFilm(film);

        navigate('/'+name_filter[props.filterStatus-1]);
    }

    
    return(
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3 align-items-center" >
                <Form.Group as={Col} >
                    {/* 要加个验证！不能添加重复的title，并且edit的时候不能修改这个位置！ */}
                    <FloatingLabel  label="Film Title">
                    <Form.Control type="text" required={true} value={title} placeholder="Film Title" disabled={isEditing}//编辑状态不能修改title
                    onChange={event => {
                        setTitle(event.target.value); 
                        // if(!isEditing) //如果是编辑状态则不检查title是否重复
                            props.films.some(f=>f.title === event.target.value)?setTitleExist(true):setTitleExist(false);
                        } }/>
                        {titleExist?'title exist!':''}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <FloatingLabel  label="Date">
                    {/* <Form.Control type="date"   value={()=>{if(date==="") return date; else return date.format('YYYY-MM-DD');}} onChange={event => setDate(event.target.value)}/> */}
                        <Form.Control type="date"   value={date} onChange={event => setDate(event.target.value)}/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label >Rating</Form.Label>
                    {stars}
                </Form.Group>
                <Form.Group className='mb-3' as={Col}>
                    <Col sm={3}>
                        <Form.Check  type="checkbox" label="Favorite" checked={fav} onChange={event => setFav(!fav)}/>     
                    </Col>
                </Form.Group>
            </Row>
            <Form.Group className='mb-3'>
                <Button variant='primary' type='submit' disabled={titleExist}>Save</Button> &nbsp;
                <Link to={'/'+name_filter[props.filterStatus-1]}>
                <Button variant='danger' >cancel</Button>
                </Link>
            </Form.Group>
        </Form>
    )
}

export{FilmForm}