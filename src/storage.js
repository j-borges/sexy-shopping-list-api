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
/**
 * Add new object into a collection
 * @param {string} collection  the string name of the collection.
 * @param {object} object  The new object to add to the collection.
 * @returns {*}
 */
export const add = (collection, object) => {
    const arr = list(collection)

    arr.push(object)



    save(collection, arr)
    return object
}
/**
 * Save an entire collection. This will overwrite the exixting collection.
 * @param {string} collection  the string name of the collection.
 * @param {Array} arr  The new value of the collection.
 */
const save = (collection, arr) => {
    fs.writeFileSync(`storage/${collection}.json`, JSON.stringify(arr, null, 2))
}
/**
 * Remove a single object from a collection.
 * @param {string} collection The string name of the collection.
 * @param {string|number} id The id of the object to remove.
 * @returns {boolean} True if an item was removed, false if it was not found.
 */
export const remove = (collection, id) => {
    const arr = list(collection)
    const index = arr.findIndex((object) => object.id === id)
    const wasFound = index !== -1

    if (wasFound) {
        arr.splice(index)
        save(collection, arr)
    }

    return wasFound