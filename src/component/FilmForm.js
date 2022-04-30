import {Button, Form,Row,Col, FloatingLabel} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import { BsStarFill,BsStar } from "react-icons/bs";

function FilmForm(props){
    
    const [title,setTitle] = useState(props.film? props.film.title:'');
    const [fav,setFav] = useState(props.film? props.film.favorite:false);
   
    // const [date,setDate] = useState(dayjs());
    const [date,setDate] = useState(()=>{
        if(props.film !==undefined){
            if(props.film.date!==undefined){
                return props.film.date.format('YYYY-MM-DD')
            }
        }
        // props.film.date!==undefined? props.film.date.format('YYYY-MM-DD'):undefined
    });
    const [rating,setRating] = useState(()=>{
        if(props.film !==undefined){
            if(props.film.rating!==undefined){
                return props.film.rating
            }
        }
        else return 0;
        // props.film.rating!==undefined? props.film.rating:0
    });
    const [stars,setStars] = useState(()=>{
        let stararr= [];
        if(props.film===undefined || props.film.rating ===undefined){
            for(let i=0;i<5;++i){
                stararr.push(<Button key={i} id={i} variant="light" onClick={()=>{clickHandler(i)}}><BsStar /></Button>);
            }
        }else{
            for(let i=0;i<props.film.rating;++i){
                stararr.push(<Button key={i+'f'} id={i} variant="light" onClick={()=>{clickHandler(i)}}><BsStarFill/></Button>);
            }
            for(let i=props.film.rating;i<5;++i){
                stararr.push(<Button key={i+'b'} id={i} variant="light" onClick={()=>{clickHandler(i)}}><BsStar/></Button>);
            }
        }
    
        return stararr;
    });
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
        // stararr = stararr.map((s,idx)=>  (idx<=id)?
        //     <Button key={idx+'f'} id={idx} onClick={()=>{clickHandler(idx)}}><BsStarFill/></Button>:
        //     <Button key={idx+'b'} id={idx} onClick={()=>{clickHandler(idx)}}><BsStar/></Button> 
        
        // );

        // for(let i of stararr){
        //     console.log(i.props.children.type);
        // }
        
        
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        let film={}
        if(date===undefined || date===""){
            film = {title:title,favorite:fav,rating:rating}; 
        }else{
            film = {title:title,favorite:fav,date:dayjs(date),rating:rating};
        }
        
        if(props.film === undefined)
            props.addFilm(film);
        else{
            props.editFilm(film);
        }
    }

    
    return(
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3 align-items-center" >
                <Form.Group as={Col} >
                    {/* 要加个验证！不能添加重复的title，并且edit的时候不能修改这个位置！ */}
                    <FloatingLabel  label="Film Title">
                    <Form.Control type="text" required={true} value={title} placeholder="Film Title" onChange={event => setTitle(event.target.value)}/>
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
                    {/* <Form.Control type="number" min={0} max={5} value={rating} onChange={event => setRating(event.target.value)}/> */}
                    {/* <Form.Control  min={0} max={5} value={createStars()} onChange={event => setRating(event.target.value)}/> */}
                    {/* <BsStar></BsStar>????????????????????????????????????????????????????? */}
                    {/* <ShowStars film={props.film} setRating={setRating}/> */}
                    {stars}
                </Form.Group>
                <Form.Group className='mb-3' as={Col}>
                    <Col sm={3}>
                        <Form.Check  type="checkbox" label="Favorite" checked={fav} onChange={event => setFav(!fav)}/>     
                    </Col>
                </Form.Group>
            </Row>
            <Form.Group className='mb-3'>
                <Button variant='primary' type='submit' >Save</Button> &nbsp;
                <Button variant='danger' onClick={props.cancel}>cancel</Button>
            </Form.Group>
        </Form>
    )
}

export{FilmForm}