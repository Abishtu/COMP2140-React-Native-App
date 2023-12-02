/**
 * A hacky in-memory cache cause I don't wanna deal with React's billion
 * different and convoluted ways to do the most bare minimum elementary task of
 * file manipulation on a NATIVE filesystem. 
 * 
 * Thesis is causing enough pain as is 
 * 
 * If only JS framework dev's found a way to use node's native `fs` module 
 * instead of reinventing the wheel and creating abstracitons on top of 
 * abstractions -_- 
 * 
 * Rant aside....
 * 
 * Pretty much every variable here is expected to be cleared when entering a new
 * page, they might be re-added, as is the case for samplesCache & 
 * currentLocation.
 */
let locationID = []
let currentLocation = []
let samplesCache = []
let allLocations = []
let currentProfile = []
export {locationID, samplesCache, currentLocation, allLocations, currentProfile}