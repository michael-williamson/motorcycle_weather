const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const WeatherData = new GraphQLObjectType({
    name: 'WeatherData',
    fields: ()=>({
        pretty: {type: GraphQLString},
        civil: {type: GraphQLString},
        weekday_name: {type: GraphQLString},

    })
});

const Temp = new GraphQLObjectType({
    name: 'temp',
    fields: ()=>({
        english: {type: GraphQLString}
    })
});

const HourlyForecast = new GraphQLObjectType({
    name: 'HourlyForecast',
    fields: ()=>({
        FCTTIME: {type:WeatherData},
        temp: {type: Temp},
        condition: {type:  GraphQLString},
        wspd: {type: new GraphQLObjectType({
            name: 'wind_speed',
            fields: ()=>({
                english: {type: GraphQLString}
            })
        })},
        pop: {type:  GraphQLString},

    })
});

const CityType = new GraphQLObjectType({
    name: 'CityType',
    fields: ()=>({
        hourly_forecast: {type: new GraphQLList(HourlyForecast)}
       
    })
});      

module.exports = CityType; 