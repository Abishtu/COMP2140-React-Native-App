/**
 * Simple constant object that provided details required to successfully send
 * a request to the API
 * @returns {Object} has api key, a demo key for initial testing and the base
 *                   url to send requests to.
 */
const API = () => {
    return {
        KEY: '87UmPoxT9v',
        DEMO_KEY: 'aneesha',
        BASE_URL: 'https://comp2140.uqcloud.net/api/'
    };
}

/**
 * Defines a dummy JSON object for how a new post request would look like when
 * creating samples
 * @returns {Object} defines how POST request body will look like as an Object
 */
const NEW_SAMPLE = () => {
    return {
        api_key: API().KEY,
        name: "name",
        recording_data: JSON.stringify([
            {'B':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
            {'A':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
            {'G':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
            {'F':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
            {'E':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
            {'D':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
            {'C':[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        ]),
        type: "piano"
    };
}

export { NEW_SAMPLE };
export default API;