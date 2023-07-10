import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://spdalessa:coder5925@ecommerce.fssj1il.mongodb.net/?retryWrites=true&w=majority`,{
    dbName: 'ECOMMERCE', 
  });



const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Error to connect MongoDB:'));
db.once('open', () => {
  console.log('Connection succesfully to  MongoDB');
});

export default  db;