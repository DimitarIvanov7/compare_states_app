import fs from 'fs'

import JobsInfo from '../models/data-mod.js'

const Job = JobsInfo.JobData


const searchResults = [965000,        1100000,        1060000,        1010000,        2250000,        5110000,        1820000,        1160000,        5730000,        5780000,        12300000,        15500000,        1370000,        12400000,        2350000,        1170000,        5730000,        11800000,        1410000,        4470000,        4260000,        1100000,        1370000,        15800000,        2420000,        6080000,        6040000,        1270000,        4940000,        2030000,        11000000,        1230000,        6430000,        1280000,        5340000,        6000000,        2810000,        1330000,        2080000,        5780000,        4990000,        11000000,        6150000,        1200000,        1110000,        1270000,        5280000,        5600000,        6650000]


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
    5822434,  578759]

const googleTrendsData = [73,        81,        61,        69,        55,        58,        37,        46,        71,        67,        66,        48,        51,        47,        50,        41,        100,        59,        54,        39,        44,        38,        44,        41,        71,        55,        47,        55,        58,        34,        44,        75,        56,        64,        36,        43,        69,        56,        45,        34,        69,        34,        68,        62,        59,        33,        48,        56,        39,        41,        46]


const createJSON = async (googleTrendsData, populations, searchResults, keyword) => {

    //get todays date
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getFullYear();
    
    const objectsModel = await googleTrendsData.map((TrendsData, index) => {

        const trendsPoints = TrendsData.points
        const state = TrendsData.state
        const competition = 1 + Math.round((searchResults[index] / populations[index] ));

        return {
          id: index+1,
          state: state,
          trendsData: trendsPoints,
          competition: competition,
          overall: Math.round((trendsPoints/competition)*10)

        }
    });

    // stringify to save jsonfile
    // const objectsStr = JSON.stringify(objectsModel);

    const job = await new Job({
        Name: keyword,
        Data: objectsModel,
        Created: `${mm}/${dd}/${yyyy}`
    })

    await job.save()

    //save json
    // fs.writeFile(`dataScrapping/filedata/${keyword}.json`, objectsStr, function(err, result) {
    //     if(err) console.log('error', err);
    // })

    return 

}



export default createJSON
