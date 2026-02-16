import { model } from "mongoose"


export const findOne= async({
    model,
    select= '',
    options={},
    Filter={}
}={})=>{

return await model.findOne(Filter).select(select)
}


export const create=async({model , data,options = {validateBeforeSave:true}}={})=>{
 return await model.create(data ,options)
}

