const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/test';

let dbConnection;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(url).then((client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch(err => {
            console.log(err);
            return callback(err);
        });
    },
    
    getDb: () => dbConnection
}
