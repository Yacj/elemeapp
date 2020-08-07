import {post} from "@/api";
export const User ={
    login(param){
        return post('/user/login',param)
    }
}