import API from './global.js'
const API_KEY = API().KEY;
// const API_KEY = "a3"
/**
 * Sends a request to the API to acquire a list of all available locations added
 * to the API.
 * 
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request.
 */
const getLocations = async () => {
    const url = `${API().BASE_URL}location/?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.filter((location) => {
        return location.sharing;
    });
}

/**
 * Returns list of all samples shared to a location.
 * 
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request. 
 */
const getSampleToLocation = async () => {
    const url = `${API().BASE_URL}sampletolocation/?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

/**
 * Associates a sample with the specifed location 
 * 
 * @param {Object} location A correctly formated object that will hold 
 *                          information on association b/w a sample id with its
 *                          shared location id.
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request. 
 */
const postLocation = async (location) => {
    const url = `${API().BASE_URL}sampletolocation/?api_key=${API_KEY}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    });
    const json = await response.json();

    return json;
}

/**
 * Simple method to un-share a sample with from a specific location based on the
 * associations unique ID. (not sample's id or locations id)
 * 
 * @param {Number} id unique of ID of the sample-location association to delete
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request. 
 */
const deleteSampleToLocation = async (id) => {
    const url = `${API().BASE_URL}sampletolocation/${id}/?api_key=${API_KEY}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = {};

    return json;
}

export { getLocations, getSampleToLocation, postLocation, 
         deleteSampleToLocation }