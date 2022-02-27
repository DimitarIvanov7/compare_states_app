import census from 'citysdk'
import getTrendsData from './trendsData.js'

const censusData = await census(
    {
        vintage: "2019",
        sourcePath : ["acs","acs1"],
        values : ["NAME", "B01001_001E"],
        geoHierarchy: {
            state : "*",
        }
    },
    
    async function(error, response) {

        const sortedStates = await response.sort((a, b) => (a.NAME > b.NAME) ? 1 : -1 )

        const populationData = sortedStates
            .filter(state => state.B01001_001E === 3193694 ? null : state.B01001_001E)
            .map(statPop => statPop.B01001_001E)

        return populationData
    }
)

console.log(censusData);


export default censusData;