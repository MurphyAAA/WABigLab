import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import dayjs from 'dayjs' ; // 后面的字符串dayjs是library 
import { useState } from 'react';
import { id_filter } from './component/NavBar';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { FilmRoute ,DefaultRoute,Layout,FormRoute,EditRoute} from './component/FilmView';
const fakeFilms=[
  // {title:'Pulp Fiction',favorite:true,date:dayjs('2022-03-10'),rating:5},
  {title:'Pulp Fiction',favorite:true,date:dayjs('2022-03-10'),rating:5},
  {title:'21 Grams',favorite:true,date:dayjs('2022-04-17'),rating:4},
  {title:'Star Wars',favorite:false},
  {title:'Matrix',favorite:false},
  {title:'Shrek',favorite:false,date:dayjs('2022-03-21'),rating:3},
  
];
// function alertClicked() {
//   //alert('You clicked the third ListGroupItem');
// }

function App() {
  const [films,setFilms] = useState(fakeFilms);
  // const [filterStatus,setFilterStatus] = useState(id_filter.All);

  const deleteFilm = (filmTitle)=>{
    setFilms((fms)=>fms.filter(fm=>fm.title !== filmTitle));
  }
  const addFilm = (film)=>{
    setFilms(oldFilms=>[...oldFilms,film]);
  }
  const updateFilm=(film)=>{//修改
    
    setFilms(oldFilms=>{
      return oldFilms.map(fm=>{
        if(fm.title === film.title){
          fm.favorite = film.favorite;
          fm.date = film.date;
          fm.rating = film.rating;
        }        
        return fm;
      })
    });
    // console.log(films);
  }
  const changeFav=(filmTitle)=>{
    //fms是原来的state
    let tempFilm = [...films];
    tempFilm.forEach((x)=>{
      if(x.title === filmTitle){
        x.favorite = !x.favorite;
      }
    });
    setFilms(tempFilm);
    // alert(filmTitle,"changeFav");

  }
  const changeRating=(filmTitle,newRating)=>{
    //fms是原来的state
    console.log(filmTitle,newRating)
    let tempFilm = [...films];
    tempFilm.forEach((x)=>{
      if(x.title === filmTitle){
        x.rating = newRating;
      }
    });
    setFilms(tempFilm);
    // alert(filmTitle,"changeFav");

  }
  
  // const filterFunc =(myfilter)=>{
  //   //console.log(myfilter);
  //   if(filterStatus !== myfilter)
  //       setFilterStatus(myfilter);
  // };

//为什么被调用了两次？？？？  react的问题
  const filterFilms=(filter)=>{ 
    // setFilterStatus(filter);
    let myfilms = [];
    // alert(1);
    switch (filter) {
      case id_filter.All:
        //执行filter的动作
        myfilms = films.filter(x=>{
          return x;
        });
        // console.log("all");
        break;
      case id_filter.Favorites:
        myfilms = films.filter(x=>{
          return x.favorite === true;
        })
        // console.log("Favorites");
        break;
      case id_filter.BestRate:
        myfilms = films.filter(x=>{
          return x.rating ===5;
        })
        // console.log("BestRate");
        break;
      case id_filter.SeenLastMonth:
        let today = dayjs().format('YYYY-MM-DD');
        myfilms = films.filter(x=>{
          // console.log(dayjs(today).diff(x.date,'day'));//返回相差的天数
          if(x.date !== undefined)
            return (dayjs(today).diff(x.date,'day') <= 30);
          else return false;
        })
        // console.log("SeenLastMonth");
        break;
      case id_filter.Unseen:
        myfilms = films.filter(x=>{
          return x.date === undefined;
        })
        // console.log("Unseen");
        break;
      default:
        break;
    }
    return myfilms;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout ></Layout>}>
          <Route index element={<FilmRoute films={filterFilms(id_filter.All)} deleteFilm={deleteFilm} changeFav ={changeFav} changeRating={changeRating} filterStatus ={id_filter.All}></FilmRoute>} ></Route>
          <Route path='all' element={<FilmRoute films={filterFilms(id_filter.All)} deleteFilm={deleteFilm} changeFav ={changeFav} changeRating={changeRating} filterStatus ={id_filter.All} ></FilmRoute>} ></Route>
          <Route path='Favorites' element={<FilmRoute films={filterFilms(id_filter.Favorites)} deleteFilm={deleteFilm} changeFav ={changeFav} changeRating={changeRating} filterStatus ={id_filter.Favorites} ></FilmRoute>}></Route>
          <Route path='BestRated' element={<FilmRoute films={filterFilms(id_filter.BestRate)} deleteFilm={deleteFilm} changeFav ={changeFav} changeRating={changeRating} filterStatus ={id_filter.BestRate} ></FilmRoute>}></Route>
          <Route path='SeenLastMonth' element={<FilmRoute films={filterFilms(id_filter.SeenLastMonth)} deleteFilm={deleteFilm} changeFav ={changeFav} changeRating={changeRating} filterStatus ={id_filter.SeenLastMonth} ></FilmRoute>}></Route>
          <Route path='Unseen' element={<FilmRoute films={filterFilms(id_filter.Unseen)} deleteFilm={deleteFilm} changeFav ={changeFav} changeRating={changeRating} filterStatus ={id_filter.Unseen} ></FilmRoute>}></Route>
        </Route>
        <Route path='/add' element={ <FormRoute films={films} addFilm={addFilm} /> }></Route>
        <Route path='/edit' element={<EditRoute films={films} editFilm={updateFilm} addFilm={addFilm}/>} ></Route>
        
        <Route path='*' element={<DefaultRoute></DefaultRoute>} />
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
