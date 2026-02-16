import { model, Model } from "mongoose";
import { ProviderEnum } from "../../common/Enum/index.js";
import { compareHash, conflictExceptin ,  encrypt,  NotFoundException, } from "../../common/Utils/index.js";
import { UserModel ,findOne ,create} from "../../DB/index.js";
import { generateHash } from "../../common/Utils/index.js";





export const signup = async (inputs) => {
    const {userName , email , password , phone} = inputs;
    const CheckEmailExist = await findOne({
        model:UserModel,
        Filter:{email}
    })
     if (CheckEmailExist) {
        return conflictExceptin({message:"email exist"})  
     }

    
     const [user] = await create({
        model:UserModel,
        data:[{userName
             , email ,
             phone: encrypt(phone) , 
             password: await generateHash(password) ,
              Provider:ProviderEnum.system}]
     })
    
    return user
}


export const login = async (inputs) => {
    const { email , password} = inputs;
    const user = await findOne({
        model:UserModel,
        Filter:{email,Provider:ProviderEnum.system}
    })
     if (!user) {
        return NotFoundException({message:`not login user`}) 
     }

     const match = await compareHash(password , user.password)
     if (!match) {
        return NotFoundException({message:`invalid password`})
        
     }
     
    return user
}