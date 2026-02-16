import { findById } from "../../DB/db.service.js"
import{UserModel} from"../../DB/index.js"
import jwt from "jsonwebtoken"
import { TOKEN_SECRET_KEY, TOKEN_SECRET_REFERSH_KEY, TOKEN_SYSTEM_REFERSH_SECRET_KEY, TOKEN_SYSTEM_SECRET_KEY } from "../../../config/config.service.js";




export const profile = async(user)=>{
 
   return user


       let signature = undefined
     let audience ='user'
     switch (decoded.audience) {
        case 'system':
            signature = TOKEN_SYSTEM_SECRET_KEY
            break;
        default:
            signature = TOKEN_SECRET_KEY
            break;
     }

    const verify =jwt.verify(authorization ,signature)
    console.log({verify})

    
      



    
}



