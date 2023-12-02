import API from './global.js'
const API_KEY = API().KEY;
/**
 * Sends a request to the API to acquire a list of all sound samples added to
 * the API.
 * 
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request.
 */
const getSamples = async () => {
    const url = `${API().BASE_URL}sample/?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

/**
 * Returns a specific sound sample based on ID provided.
 * 
 * @param {string} id id code of the sample to return
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request. 
 */
const getSample = async (id) => {
    const url = `${API().BASE_URL}sample/${id}/?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

const getSampleInLocation = async (location_id) => {
    const url = `${API().BASE_URL}sampletolocation/?api_key=${API_KEY}&location_id=${location_id}`;
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

const locationHasSample = async (location_id) => {
    const url = `${API().BASE_URL}sampletolocation/?api_key=${API_KEY}&location_id=${location_id}`;
    const response = await fetch(url);
    const json = await response.json();

    return json.length > 0;
}

/**
 * Returns the ratings of a sample, all the final rating returned from this
 * function is the simple average of the ratings returned from the API.
 * 
 * @param {string} id id code of the sample to query
 * @returns {Promise<number>} the average rating of for this sample
 */
const getSampleRating = async (id) => {
    const url = `${API().BASE_URL}samplerating/?api_key=${API_KEY}&sample_id=${id}`;
    const response = await fetch(url);
    const json = await response.json();
    if (json && json.length > 0) {
        const ratings = json.map((rating) => {
            return parseFloat(rating.rating);
        });
        return (ratings.reduce((a, b) => a + b, 0))/ratings.length;
    }
    return 0.0;
}

/**
 * Sends a new sound sample to be saved in the API. 
 * 
 * @param {Object} newSample A correctly formated object that will hold sound
 *                           sample data to be added to API.
 * @returns {Promise<Object>} Returns a promise that upon successful execution, 
 *                            will hold the response from this api request. 
 */
const postSample = async (newSample) => {
    const url = `${API().BASE_URL}sample/?api_key=${API_KEY}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSample)
    });
    const json = await response.json();

    return json;
}

/**
 * Updates details of the specified sample if any edits were made to it.
 * 
 * @param {Object} changedSample A correctly formated object that will hold
 *                               information on fields edited by the user
 * @param {Number} id The unique id of the sample to be edited.
 * @returns 
 */
const putSample = async(changedSample, id) => {
    const url = `${API().BASE_URL}sample/${id}/?api_key=${API_KEY}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(changedSample)
    });
    const json = await response.json();

    return json;
}

export { getSamples, getSample, postSample, putSample, getSampleInLocation,
         getSampleRating, locationHasSample }