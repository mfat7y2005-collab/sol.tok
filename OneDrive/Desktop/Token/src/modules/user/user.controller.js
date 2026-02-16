import { Router } from "express";
import { profile } from "./user.service.js";
import { successResponse } from "../../common/Utils/response/responseJson.js";
import { authentication, authorization } from "../../middleWare/authentication.middleWare.js";
import { RoleEnum } from "../../common/Enum/userEnum.js";
const router=Router()

router.get("/" , authentication(),authorization([RoleEnum.user,RoleEnum.admin]),async (req,res,next)=>{
    const account  =await profile(req.user)
    return successResponse({res , data:{account}})
})
export default router