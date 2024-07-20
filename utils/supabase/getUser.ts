'use server'
import { revalidatePath } from "next/cache";
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
export const pathRevalidation=(path:string)=>{
    revalidatePath(`/${path}`);
    
}
// export async function fetchDoctor(userId:string){
//     const {data, error}= await supabase.from('doctor')
// }