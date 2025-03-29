import { mongoose } from "mongoose"

export const dbConnect=()=>{
    try{
        mongoose.connect("mongodb+srv://zerofivedatabase:Kj1zaf9a5JRjFz40@zerofive.efdzoee.mongodb.net/")
        console.log("DB connect")
    }catch(err){
        console.log(err.message,"er-msg")
    }
}