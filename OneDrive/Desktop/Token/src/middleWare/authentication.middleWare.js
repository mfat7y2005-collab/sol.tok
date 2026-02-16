import { tokenTypeEnum } from "../common/Enum/index.js"
import { BadRequestExceptin, decodedToken, ForBeddenException } from "../common/Utils/index.js"




export const authentication = (tokentype=tokenTypeEnum.access) => {
    return async(req , res, next)=>{
        if (!req?.headers?.authorization) {
            throw BadRequestExceptin({message:`missed authorization`})  
        }
        req.user= await decodedToken({token: req.headers?.authorization,tokentype})
        next()
    }
}
export const authorization = (accessRole=[] , tokentype=tokenTypeEnum.access) => {
    return async(req , res, next)=>{
        if (!req?.headers?.authorization) {
            throw BadRequestExceptin({message:`missed authorization`})  
        }
        req.user= await decodedToken({token: req.headers?.authorization,tokentype})
          console.log(req.user.role)
          if (!accessRole.includes(req.user.role)) {
            throw ForBeddenException({message:`not allwed account`})
            
          }
        next()
    }
}