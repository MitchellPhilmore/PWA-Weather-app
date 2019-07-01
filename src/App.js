import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import cloudyGif from './cloudy.gif'
import clearGif from './tb.gif'
import rainGif from './rainday2.gif'

let backgrounds = {
  Clouds:cloudyGif,
  Clear:clearGif,
  Rain: rainGif

}



class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      weatherData:[],
      backgroundType:''

    }
  }
  componentWillMount(){
    let apiKey = '73ec45f3936fe17133d8c9f13c187b62'

    let key = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=philadelphia&units=imperial&count=1`

    axios.get(key)
    .then(response=>response)
    .then(response=>{
      console.log(response)
      let filteredList = response.data.list.filter((data)=>data.dt_txt.includes('18:00:00'))
      console.log(filteredList)
      this.setState({weatherData:filteredList,backgroundType:filteredList[2].weather[0].main})
    })
  }
    generateDayOfTheWeek =(date)=>{
    let generatedDay = new Date(date).getDay()
    let days = 'Sunday,Monday,Tuesday,Wedsday,Thursday,Friday, Saturday'.split(",")
     console.log(days[generatedDay])
    return days[generatedDay]
  }

 
  render(){
    
    console.log(this.state.backgroundType)
    
    return(
      this.state.weatherData.length > 0 &&
      <>
      <div className="container">
      <div style={{ background: `url(${backgrounds[this.state.backgroundType]}) no-repeat center center fixed`, 
      backgroundSize: 'cover',height:'100%',width:'100vw'}} class="card row">
        <div style={{color:'white'}} className="card-content">
           {this.state.weatherData.map(day=>{
             let imgIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
             return(
               <>
              
              {/* <h2>{Math.ceil(day.main.temp)}<sup>&#xb0;</sup></h2> */}
              <div className="weekly-forcast col s12">
                <div className="days">
              {/* <h4 className="col s6 l12 m12 day">{this.generateDayOfTheWeek(day.dt_txt) }</h4> */}
                  <div>
                  <h4 className="col s6 l12 m12 day white-text">{this.generateDayOfTheWeek(day.dt_txt) }</h4>
                  <img  className="col s3" id="weatherIcon" src={imgIcon}/>
                <h2 className="description">{day.weather[0].description}</h2>

                  </div>
                

                 <div className="col l3"></div>
                 <h5  className="degree"><span style={{fontSize:'110%',fontWeight:700}}>{Math.ceil(day.main.temp)}</span><sup>&#xb0;</sup> <span style={{marginLeft:'5px',fontWeight:200}}>{Math.floor(day.main.temp_min)}<sup>&#xb0;</sup></span></h5>
              </div>
              </div>
              <br/>
             
              </>
           )})}
           
           
      </div>
      </div>
       
        
      </div>
     </>
  
      
    )
  
}

}

export default App;
