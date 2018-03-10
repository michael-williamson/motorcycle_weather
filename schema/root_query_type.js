const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const CityType = require('./city_type');
const axios = require('axios');
const wundergroundKey = require('./../config/keys');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ()=>({
        city: {   
            type: CityType,
            args: {city: {type: new GraphQLNonNull(GraphQLString)},
                    state: {type: new GraphQLNonNull(GraphQLString)}                
        },
 
            resolve(parentValue, {city,state}){
                //key is in another folder for security

                const ROOT_URL = `${wundergroundKey.ROOT_URL}${state}/${city}.json`;

                const url = `${ROOT_URL}`;
                return axios.get(url)
                .then(res=>res.data).catch(function (error) {
                    console.log(error);
                  });;    
            }
        }
    })
});

module.exports = RootQuery; 