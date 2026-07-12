import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";

const port=config.port;

async function main() {
    try {
        await prisma.$connect()
        console.log("database is connected on Fixitnow")
        app.listen(port,()=>{
            console.log(`the server is running ${port}`)
        })
        
    } catch (error) {
      
        console.log(`error starting the server`,error)
          await prisma.$disconnect();
        process.exit(1)
        
    }
    
}

main()