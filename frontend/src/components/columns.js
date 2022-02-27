export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },

    {
        Header: 'State',
        Footer: 'State',
        accessor: 'state'

    },

    {
        Header: 'Trends Data',
        Footer: 'Trends Data',
        accessor: 'trendsData',
        tipText: 'Search data from Google Trends 0 - 100'
    },

    {
        Header: 'Competition',
        Footer: 'Competition',
        accessor: 'competition',
        tipText: 'The returned Google search results divided by the state population'
    },

    {
        Header: 'Overall',
        Footer: 'Overall',
        accessor: 'overall',
        tipText: 'Trends Data divided by competition. More points means better opportunity'
    },


]