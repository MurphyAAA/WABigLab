import 'bootstrap/dist/css/bootstrap.min.css'
import {React,useState} from 'react';
import dayjs from 'dayjs';
import {  Col, Table,Button } from "react-bootstrap";
import { BsStarFill,BsStar,BsPencilSquare,BsTrash } from "react-icons/bs";
import './Film.css';
import { Link } from 'react-router-dom';
const name_filter=["All",
    "Favorites",
    "BestRated",
    'SeenLastMonth',
    'Unseen']
function FilmLists(props){
    return(
        <Col sm={8} >
          <h1 className='txt-left'>Filter:{name_filter[props.filterStatus-1]}</h1>
          <FilmTable films={props.films} changeFav={props.changeFav} changeRating={props.changeRating} setFilms={props.setFilms} deleteFilm={props.deleteFilm} editFilm={props.editFilm} filterStatus={props.filterStatus} ></FilmTable>
        </Col>
    );
}

function FilmTable(props) {
    return(
      <>
        <Table striped>
          <thead>
            <tr>
              <th>Action</th>
              <th>Title</th>
              <th>Favorite</th>
              <th>Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
              {/* films = {xxxx} 前面的films是属性下一个调用的props科通过 '.films'获得，props.films返回的是{xxx}的值 */}            
            {              
              props.films.map((f) => 
              <FilmRow film={f} key={f.title} changeFav ={props.changeFav} changeRating={props.changeRating} setFilms={props.setFilms} deleteFilm={props.deleteFilm} filterStatus={props.filterStatus} />)
              // <FilmRow film={f} key={f.title} changeFav ={props.changeFav} deleteFilm={props.deleteFilm} setShowForm={setShowForm} setEditableFilm={setEditableFilm} editableFilm={editableFilm}/>)
              //在这里filter！
            }
          </tbody>
        </Table>
        <Link to='/add' state={ {filterStatus:props.filterStatus} }>
          <Button variant='success'>Add Film</Button>
        </Link>
      </>
    );
  }
  
function FilmRow(props){
  
    return(
        <tr>
          <FilmActions film={props.film} deleteFilm={props.deleteFilm} filterStatus={props.filterStatus} />
          <FilmData key={props.film.title} film={props.film} changeFav={props.changeFav} changeRating={props.changeRating} setFilms={props.setFilms} />
          {/* key不同则会重新生成这个component，否则state不会更新 */}
        </tr>
    );
}
function FilmData(props){
  // 声明一个叫 "mychecked" 的 state 变量
  const [rating,setRating] = useState(props.film.rating?props.film.rating:0)
  const [mychecked,setChecked] = useState(props.film.favorite);//只会初始化1次，第二次不会重新初始化了，所以会导致mychecked值和props.film.favorite不同


  // const stars= [];
  // for(let i=0;i<props.film.rating;++i){
  //   stars.push(<BsStarFill key={i+'f'}/>);
  // }
  // for(let i=0;i<5-props.film.rating;++i){
  //   stars.push(<BsStar key={i+'b'}/>);
  // }
  // if(props.film.rating ===undefined){
  //   for(let i=0;i<5;++i){
  //     stars.push(<BsStar key={i}/>);
  //   }
  // }
  const handleChange=(title)=>{
    setChecked(!mychecked);
    props.changeFav(title)
  }
  const mychangeRating = (title,rating)=>{
    setRating(rating)
    props.changeRating(title,rating)
  }
  return(
    <>
    {/* 必须有个single root  */}
      {
        mychecked?
        <td className='column-left' style={{color: "red"}} >{props.film.title}</td> :
        <td className='column-left' > {props.film.title}</td>
      }
      
      <td>
        <Checkbox filmtitle={props.film.title}  label='favorite' value={mychecked} onChange={handleChange}  />
      </td>
      
      <td>{props.film.date !==undefined && 
      props.film.date.format('YYYY-MM-DD')}</td>
      
      {/* <td>{stars}</td> */}
      <td><ShowStars film={props.film} rating = {rating} changeRating={mychangeRating} setFilms={props.setFilms}></ShowStars></td>
    </>
  );
}
function FilmActions(props){
  // style={{fontSize: 15}}
  return <td>
    {/* edit  使用state传参必须在传之前用.format设定好日期的格式，否则传过去无法设定格式*/}
    <Link to='/edit' state={{film:props.film, filmDate:props.film.date?dayjs(props.film.date).format('YYYY-MM-DD'):undefined, filterStatus:props.filterStatus}} >
      <Button variant='primary'> <BsPencilSquare /></Button>
    </Link>
    &nbsp;
    <Button variant='danger' onClick={()=>{props.deleteFilm(props.film.title)}}> <BsTrash/> </Button>
  </td>
        
}
function Checkbox({filmtitle,label,value,onChange}){
  return (
    <label>
      <input type={"checkbox"} checked={value} onChange={()=>{onChange(filmtitle)}} />
      {label}
    </label>
  );
}
function ShowStars(props){
  // console.log(1)
  
  let stararr= [];
  if(props.film.rating ===undefined){
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
  // const [stars,setStars] = useState(stararr);
  const clickHandler=(id)=>{
    
    //改原表平分-->props.film.rating被修改了，这个ShowStars会重新渲染所以正确显示星星
    props.changeRating(props.film.title,id+1);
    
    
    
  }
  
  return stararr;
  

}


// export写文件最后  只有FilmLists才需要再文件外使用 
 export {FilmLists,name_filter};