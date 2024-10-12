//fetching from a certain url
const fetchDataUtils = async (url:string):Promise<string> => {
    const response:Response = await fetch(url)
    const data = await response.json()
    return data
}
export {fetchDataUtils}
