import {get, post} from "@/api";

export const City = {
    cityList(param){
        return get('/city/cityList',param)
    },
    citySearch(param){
        return post('/city/citySearch',param)
    }
}