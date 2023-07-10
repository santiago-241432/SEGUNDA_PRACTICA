
import express from "express";

import router from "./routes/routes.js";

import path from "path";

import __dirname from "./utils.js";

import {engine} from "express-handlebars";

//import { Server } from "socket.io";

import productsRoutes from './routes/products.routes.js';

import cartRoutes from './routes/cart.routes.js';

const publics = path.join(__dirname, "./public")

const app = express();

/*const httpServer = app.listen(8080,() =>console.log("LISTENING ON PORT 8080"));

const io = new Server (httpServer);

let messages = [];
io.on('connection',socket=>{
    console.log("Nuevo cliente conectado")
    socket.on('message',data=>{
        messages.push(data)
        io.emit('messageLogs', messages)
    })
})*/

app.use(express.static(publics));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/", router);

app.use('/products', productsRoutes);

app.use('/api/carts', cartRoutes);

app.engine('handlebars', engine());

app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) =>{
    if(err){
        console.log("Connection error:", err);
        return;
    }
    console.log(`Server listening on port ${PORT}`);
});

export default app;