import axios from 'axios';

const getCompetition = async (states, keyword) =>{

    return states.map(state => {
        let url = `https://www.googleapis.com/customsearch/v1?key=API_KEY&cx=API_KEY&q=${keyword}+near+me+${state}`

        // console.log(url);
        return axios(url).catch(err =>err)
    });
}

// async function PromiseAll(arr) {
//     return await Promise.all(arr)
//         .then(results => {
//             return results.map(result => {

//                 if(result.data.searchInformation.totalResults !== undefined){
//                     return result.data.searchInformation.totalResults
//                 }
//                 else {
//                     return "Quota max"
//                 }
                
//             })
//     })
// }

// const dataComp = await getCompetition(["Arizona","Alaska"], "locksmith")

// const realData = await PromiseAll(dataComp)

// console.log(realData);


export default getCompetition