//Module imports
import * as Koa from "koa";
import * as combineRouters from "koa-combine-routers";
import * as serve from "koa-static";
import { IndexRouter, UserRouter } from "./routers";

let path: any = require("path");

//The Server class
export default class Server
{
    public app : Koa

    //Constuctor for the server
    public constructor()
    {
        //Create an ExpressJS application instance
        this.app = new Koa();

        //Configure the application
        this.Configure();

        //Add the routes
        this.Routes();
    }

    //Configure the Application
    public Configure()
    {
        //Add static paths -- needs to be updated for the different frontend methods
        //this.app.use(express.static(path.join(__dirname, "./views/Vue")));
        this.app.use(serve(path.join(__dirname, "../../../dist")));
    }

    private Routes()
    {
        // Attach all the routers
        const combinedRouter = combineRouters(
            new IndexRouter("This is the homepage router for client testing.").router,
            new UserRouter("This is the router to handle mocked user registration and login").router
        );
        
        //Use the router middleware -- combine all the routers
        this.app.use(combinedRouter());
    }
}