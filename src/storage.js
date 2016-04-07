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