
import { Server } from 'http';



const PORT = process.env.PORT;


const startingApp = (server: Server) => {
    server.listen(PORT, () => console.log("Server Running on http://localhost:" + PORT));
};



export default startingApp;
