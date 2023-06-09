const { MongoClient } = require("mongodb");
 
//Config ENV
require('dotenv').config()

// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.URL_MONGO;
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "test-test";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("people");

         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { 
				"first": "Cong", 
				"last": "Nguyen" 
			},
             "birth": new Date(2001, 30, 3),                                                                                                                                                                                                                                                      
             "contribs": [ 
				"Mathematics",
				"Physics"
			],
            "views": 20000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
