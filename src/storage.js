/**
 * Interact with our storage.
 */
import fs from 'fs'

/**
 * Read the contents of a collection.
 * @param {string} collection The string name of the collection.
 */
export const list = (collection) => {
    const string = fs.readFileSync(`storage/${collection}.json`, 'utf8')

    return JSON.parse(string)
}
export const save = (collection, object) => {
    // read json file
    //parse string into object (array)
    const arr = list(collection) // [{},....{}]

    //push string into object (array)
    arr.push(object)

    //stringify array
    //write file

    fs.writeFileSync(`storage/${collection}.json`, JSON.stringify(arr, null, 2))

    return object
}