'use server'
import { createClient } from "./server";
const supabase = createClient();
 export async function getCurrentUser(){
    const {data, error}=  await supabase.auth.getUser();
    if (error){
        console.log(error);
    }
    else{
        return data;
    }
}
// export async function fetchDoctor(userId:string){
//     const {data, error}= await supabase.from('doctor')
// }