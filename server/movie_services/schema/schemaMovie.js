db.createCollection("Movies", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "title", "overview", "poster_path", "popularity", "tags" ],
         properties: {
            title: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            overview: {
               bsonType: "string",
               description: "must be an string and is required"
            },
            poster_path: {
               bsonType: "string",
               description: "must be an string and is required"
            },
            popularity: {
               bsonType: "double",
               description: "must be a double and is required"
            },
            tags: {
               bsonType: "array",
               description: "must be a array and is required"
            }
         }
      }
   }
})