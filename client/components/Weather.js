import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Weather extends Component{

    constructor(props){
        super(props)

        this.state = {
            city: '',
            state: ''
        }
    }

    rideDecider(wind, condition,temp, percent){
        let ride="default"; 

        if(wind < 10 && condition === "Clear" && temp >= 60){
            ride = "Perfect"
          }else if(wind >= 10 && wind <= 20 && condition !== "Clear" && temp >= 60){
              ride = "Windy"
          }else if(wind >= 20 && condition !== "Clear" && temp >= 60){
            ride = " Too Windy"
        }else if(wind <= 15 && condition !== "Clear" && temp >= 60 && percent <= 35){
            ride = " Alright"
        }
          else if(wind >= 10 && wind <= 20 && condition !== "Clear" && temp <= 60){
                ride = "Windy and Cold"
          }else if(wind >= 20 && condition !== "Clear" && temp <= 60 && percent >= 50){
            ride = "Nope!!"
      }else if(percent >= 50){
        ride = "Probably Rain"
  }else{
      ride = "whatever"
  }

          return ride; 
    }

    refetch(cityName,stateName){
        this.props.data.refetch({city:cityName,state:stateName});

    }

    onCityChange(e){
        this.setState({
            city: e.target.value
        });
    }

    onStateChange(e){
        this.setState({
            state: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault(); 
        this.refetch(this.state.city,this.state.state); 


    }

    
     weatherData (){

        if(this.props.data.city.hourly_forecast === null){
            return (
                <th>Error! Possibly spelling. Try again.</th>
            );
        }

      return  this.props.data.city.hourly_forecast.map((item,index)=>{

       let toRide = this.rideDecider(item.wspd.english, item.condition,item.temp.english,item.pop); 

       if(item.FCTTIME.civil === "12:00 AM"){
           return(
               <th className="th-day" colSpan="2">{item.FCTTIME.weekday_name} <span>{item.FCTTIME.pretty.slice(15)}</span></th>
           )
       }
       if(item.FCTTIME.civil === "1:00 AM" || 
       item.FCTTIME.civil === "2:00 AM" ||
        item.FCTTIME.civil === "3:00 AM" ||
        item.FCTTIME.civil === "4:00 AM" ||
        item.FCTTIME.civil === "5:00 AM" ||
        item.FCTTIME.civil === "11:00 PM"  ){
        return;
    }

          return (
              <tr key={index}>
              <td>{item.FCTTIME.civil}</td>
              <td>{item.condition}</td>
              <td>{item.temp.english} f</td> 
              <td>{item.pop} %</td>
              <td>{item.wspd.english} mph</td>     
              <td className={toRide}>{toRide}</td>
              </tr>        
          );

        })
    }


    render(){
        if(this.props.data.loading){

            return <div>loading...</div> 
        }
        return  (

        <div>
            <h1>Motorcycle Weather Checker</h1>
            <h3>Location: {this.props.data.variables.city}, {this.props.data.variables.state}</h3> 
            <form onSubmit={this.onSubmit.bind(this)} className="form-horizontal">
            <input
             placeholder="Enter city" 
            value={this.state.city}
             onChange={this.onCityChange.bind(this)}
             /> 
            <input 
            placeholder="Enter state" 
            value={this.state.state}
            onChange={this.onStateChange.bind(this)}
            />
            <button type="submit" className="btn btn-default btn-lg">Submit</button> 
            </form> 
            <table>
                <tbody>
                <tr className="table-secondary table-header">
                    <th>Time</th>
                    <th>Condition</th>
                    <th>Temp</th>
                    <th>Percent Chance</th> 
                    <th>Wind Speed</th>
                    <th>Ride or No?</th>  
                </tr>
                {this.weatherData()}
                </tbody> 
            </table>
        </div> 
        );
 
    }
}

const query = gql`
query city($city: String!,$state: String!){
    city(city:$city,state:$state){
	hourly_forecast{
        FCTTIME{
          pretty
          civil
          weekday_name
        }
        temp{
            english
        }
        condition
        wspd{
          english
        }
        pop
      }
    }
}    
`

export default graphql(query, {
    options: (props) => {return {variables: {city: "Dallas", state: "TX"}}}
})(Weather);