/**
 * @file
 * Functions and interfaces for cache handling.
 *
 * https://github.com/Level/level-ttl - adds ttl
 * https://github.com/Level/levelup -A wrapper for abstract-leveldown compliant stores, for Node.js and browsers.
 * https://github.com/Level/level - A higher-level wrapper to the wrapper, automatically detects node or browser.
 * https://github.com/Level/level-js - The browser implementation.
 */

// Shit aint working with homeboy ttl here:
// import level from 'level'
// import ttl from 'level-ttl'
// 1) Create our database, supply location and options.
//    This will create or open the underlying store.
// const db = level('my-db')

// Aint working (TTL)
// var db = level('/tmp/foo.db')
// db = ttl(db, { checkFrequency: 1000 })


// Main interface is levelup. leveljs is the front-end implementation.
// const levelup = require('levelup')
// const leveljs = require('level-js')
// const ttl     = require('level-ttl')

// // var db      =
// const db = ttl(levelup(leveljs('/tmp/bakari.db')), { checkFrequency: 1000 })


var levelup = require('levelup')
var leveljs = require('level-js')
var ttl     = require('level-ttl')

var db = levelup(leveljs('/tmp/bakari.db'))
db = ttl(db, { checkFrequency: 1000 })





/**
 * Returns data from the persistent cache.
 *
 * Data may be stored as either plain text or as serialized data. cache_get
 * will automatically return unserialized objects and arrays.
 *
 * @param $cid
 *   The cache ID of the data to retrieve.
 * @param $bin
 *   The cache bin to store the data in. Valid core values are 'cache_block',
 *   'cache_bootstrap', 'cache_field', 'cache_filter', 'cache_form',
 *   'cache_menu', 'cache_page', 'cache_path', 'cache_update' or 'cache' for
 *   the default cache.
 *
 * @return
 *   The cache or FALSE on failure.
 *
 * @see cache_set()
 */
export const cache_get = async (cid: string, $bin = 'cache') => {
  // https://github.com/Level/level-js#type-support
  return await db.get(cid, { asBuffer: false })
}

const CACHE_PERMANENT = 0
const CACHE_TEMPORARY = 'maybe maybe maybe'

/**
 * Stores data in the persistent cache.
 *
 * @param $cid
 *   The cache ID of the data to store.
 * @param $data
 *   The data to store in the cache. Complex data types will be automatically
 *   serialized before insertion. Strings will be stored as plain text and are
 *   not serialized.
 * @param $expire
 */
export const cache_set = (cid:string, data:string, expire:number = CACHE_PERMANENT) => {
  console.log('Setting cache cid "' + cid + '" to expire in ' + expire + ' milliseconds')
  // todo automatically serialize data if required.
  db.put(cid, data, { ttl: expire }, err => {
    if(err) console.log(err)
  })
}
