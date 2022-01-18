const { gql } = require('apollo-server-express');

module.exports = gql`
    type Product {
        id: ID
        title: String
        type:String
        price: Int
        description: String
        img: String
    }
    type Query {
        getProducts:[Product]
        getProduct(id:ID):Product!
    }
    type Mutation {
        createProduct(title: String!,description: String,type: String,price:Int, img: String):Product
    }
`
