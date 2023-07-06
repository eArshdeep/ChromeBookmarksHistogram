/**
 * Hostname Frequency in Chrome Bookmarks
 * 
 * Checks the frequency of hostnames of bookmarks from a Chrome bookmarks data file.
 * This is the file that is in JSON format, not the HTML export you attain from within
 * the browser.
 * 
 * NOTES
 * 
 * - Currently only checks the "Other" bookmarks.
 * 
 * Arshdeep Padda
 * 5 July 2023
 * Node 18
 */


var fs = require("fs");
var URL = require('url');

let data = JSON.parse(fs.readFileSync("./Bookmarks"));
let bookmarks = data["roots"]["other"];
let histogram = new Map();

// Populate Histogram
bookmarks["children"].forEach(bookmark => {
    if (bookmark.url == undefined) return;

    let url = URL.parse(bookmark.url).hostname;
    
    if (histogram.has(url)) histogram.set(url, histogram.get(url) + 1);
    else histogram.set(url, 1);
});

// Report Frequency
let total = 0;
histogram.forEach((freq, url, map) => {
    console.log(url, freq);
    total += freq;
});
console.log("total:", total);
