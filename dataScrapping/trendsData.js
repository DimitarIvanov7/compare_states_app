import getCompetition from "./searchScraping.js";
import createJSON from "./createJSON.js";
import googleTrends from 'google-trends-api';

const  populations = [
    4903185,  731545,  7278717,  3017804, 39512223,
    5758736, 3565287,   973764,   705749, 21477737,
   10617423, 1415872,  1787065, 12671821,  6732219,
    3155070, 2913314,  4467673,  4648794,  1344212,
    6045680, 6892503,  9986857,  5639632,  2976149,
    6137428, 1068778,  1934408,  3080156,  1359711,
    8882190, 2096829, 19453561, 10488084,   762062,
   11689100, 3956971,  4217737, 12801989,
    1059361, 5148714,   884659,  6829174, 28995881,
    3205958,  623989,  8535519,  7614893,  1792147,
    5822434,  578759
]

// const searchResults = [965000,        1100000,        1060000,        1010000,        2250000,        5110000,        1820000,        1160000,        5730000,        5780000,        12300000,        15500000,        1370000,        12400000,        2350000,        1170000,        5730000,        11800000,        1410000,        4470000,        4260000,        1100000,        1370000,        15800000,        2420000,        6080000,        6040000,        1270000,        4940000,        2030000,        11000000,        1230000,        6430000,        1280000,        5340000,        6000000,        2810000,        1330000,        2080000,        5780000,        4990000,        11000000,        6150000,        1200000,        1110000,        1270000,        5280000,        5600000,        6650000]

const getTrendsData = async (keyword) =>{

    const date1 = new Date('2017, 1, 17');
    const date2 = new Date('2022, 1, 17');

    const trendsReq = await googleTrends.interestByRegion({keyword: keyword, startTime: date1, endTime: date2, geo: "US"})
    
    const TrendsRes = await trendsReq

    // get the states locations
    const geoData =  getResults(TrendsRes).map((element) => (
                (element.geoName.includes(" ")) ? element.geoName.replaceAll(" ", "+") : element.geoName)
            )

    // get the array of google trends points
    const trendsPointsData = getResults(TrendsRes).map(result => {
        return {
            points: result.formattedValue[0],
            state: result.geoName
        }
    
    })

    // get competition
    // await for the array of promises
    async function PromiseAll(arr) {
        return await Promise.all(arr).then(results => {
            return results.map(result => {
                
                try {
                    if(result.data.searchInformation.totalResults !== undefined){
                        return result.data.searchInformation.totalResults
                    }
                    else {
                        return "Quota max"
                    }
                }
                catch(err) {
                    console.log(err);
                }
            })
        })
    }
    
    // call the competition function
    const compResData = await getCompetition(geoData, keyword)
    
    //await for the promise
    const arrayCompData = await PromiseAll(compResData)
    
    // console.log(arrayCompData);

    // create JSON file and add it to MongoDB
    createJSON(trendsPointsData, populations, arrayCompData, keyword)
    // createJSON(getResults(results).map(result =>result.formattedValue[0]), populations, searchResults, keyword)

    //format and sort trends data
    function getResults(results){
        const obj = JSON.parse(results);
        const rightData = obj.default.geoMapData;
        const sortedObj = rightData.sort((a, b) => (a.geoName > b.geoName) ? 1 : -1 )

        const finalData = sortedObj.map(({ formattedValue, geoName }) => ({formattedValue, geoName}));

        // console.log(finalData[0].formattedValue);
        return finalData
    }
}

// getTrendsData("dentist")


export default getTrendsData;