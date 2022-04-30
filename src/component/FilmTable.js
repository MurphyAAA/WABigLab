import 'bootstrap/dist/css/bootstrap.min.css'
import {React,useState} from 'react';
import { FilmForm } from './FilmForm';
import {  Col, Table,Button } from "react-bootstrap";
import { BsStarFill,BsStar,BsPencilSquare,BsTrash } from "react-icons/bs";
import './Film.css';
const name_filter=["All",
    "Favorites",
    "BestRate",
    'SeenLastMonth',
    'Unseen']
function FilmLists(props){
    return(
        <Col sm={8} >
          <h1 className='txt-left'>Filter:{name_filter[props.filterStatus-1]}</h1>
          <FilmTable films={props.films} changeFav={props.changeFav} deleteFilm={props.deleteFilm} editFilm={props.editFilm} addFilm={props.addFilm} ></FilmTable>
        </Col>
    );
}

function FilmTable(props) {
  const [showForm,setShowForm] = useState(false);
  const [editableFilm,setEditableFilm] = useState();
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
              
              props.films.map((f) => <FilmRow film={f} key={f.title} changeFav ={props.changeFav} deleteFilm={props.deleteFilm} setShowForm={setShowForm} setEditableFilm={setEditableFilm} editableFilm={editableFilm}/>)
              //在这里filter！
            }
          </tbody>
        </Table>
        {showForm ? <FilmForm  key={editableFilm?editableFilm.title:'0'} film={editableFilm} addFilm={ (film)=>{props.addFilm(film); setShowForm(false);} } editFilm={(film)=>{props.editFilm(film);setShowForm(false);}} cancel={()=>setShowForm(false)} ></FilmForm>:
          <Button variant='success'onClick={()=>{setShowForm(true)}} >Add</Button>
        }
      </>
    );
  }
  
function FilmRow(props){
    return(
        // <tr><FilmData film={props.film} /><FilmAction /></tr>
        
        <tr>
          <FilmActions film={props.film} deleteFilm={props.deleteFilm} setShowForm={props.setShowForm} setEditableFilm={props.setEditableFilm}  />
          <FilmData key={props.editableFilm?props.editableFilm.title+props.editableFilm.favorite:'0'} film={props.film} changeFav={props.changeFav} />
          {/* key不同则会重新生成这个component，否则state不会更新 */}
        </tr>
    );
}
function FilmData(props){
  // 声明一个叫 "mychecked" 的 state 变量
  
  const [mychecked,setChecked] = useState(props.film.favorite);//只会初始化1次，第二次不会重新初始化了，所以会导致mychecked值和props.film.favorite不同
  // console.log('2',props.film.favorite) //为啥这一行和下一行值不一样？？？？？？？？？？？？？？
  // console.log('3',mychecked);
  
  const stars= [];
  for(let i=0;i<props.film.rating;++i){
    stars.push(<BsStarFill key={i+'f'}/>);
  }
  for(let i=0;i<5-props.film.rating;++i){
    stars.push(<BsStar key={i+'b'}/>);
  }
  if(props.film.rating ===undefined){
    for(let i=0;i<5;++i){
      stars.push(<BsStar key={i}/>);
    }
  }
  const handleChange=(title)=>{
    setChecked(!mychecked);
    props.changeFav(title)
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
        <Checkbox 
          filmtitle={props.film.title}
          label='favorite'
          value={mychecked}
          onChange={handleChange}
        />
      </td>
      
      <td>{props.film.date !==undefined && 
      props.film.date.format('YYYY-MM-DD')}</td>
      
      <td>{stars}</td>
    </>
  );
}
function FilmActions(props){
  // style={{fontSize: 15}}
  return <td>
    <Button variant='primary' onClick={()=>{props.setShowForm(true);props.setEditableFilm(props.film)}}> <BsPencilSquare /></Button> &nbsp;
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


// export写文件最后  只有FilmLists才需要再文件外使用 
 export {FilmLists};