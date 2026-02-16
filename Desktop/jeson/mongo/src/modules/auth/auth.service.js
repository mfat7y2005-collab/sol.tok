
import UserModel from "./auth.model.js";
export const signup = async (inputs) => {
    const{fullName, email, password} = inputs;
    const checkUserExisit = await UserModel.findOne({email})
    if(checkUserExisit){
        throw new Error("User already exist",{cause:{status:409}})
    }
    const result=await UserModel.insertOne(inputs)
    return result
}
