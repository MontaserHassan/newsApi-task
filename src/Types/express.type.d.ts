import { UserInterface, TokenInterface } from '../Interfaces/index.interface';



declare global {
    namespace Express {
        interface Request {
            user?: UserInterface,
            token?: TokenInterface,
        }
    }
}