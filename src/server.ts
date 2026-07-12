import app from "./app"
import { prisma } from "./lib/prisma";

const port=3000;

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