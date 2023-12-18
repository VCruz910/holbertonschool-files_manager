const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

// Class that creates a client for MongoDB
class DBClient {
  constructor() {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        this.db = client.db(database);
      } else {
        this.db = false;
      }
    });
  }

  // Connection to MongoDB
  isAlive() {
    if (this.db) return true;
    return false;
  }

  // Function that returns the number of users
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  // Function that returns the number of files
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
