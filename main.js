/**
 * Arshdeep Padda
 * 5 July 2023
 * Node 18
*/

const fs = require("fs");
const os = require("os");
const urlModule = require('url');

// *** *** *** *** *** *** *** *** *** *** //
// *** *** Find Bookmarks File Path *** ** //
// *** *** *** *** *** *** *** *** *** *** //

let path = undefined;
if (process.argv.length >= 3)
    path = process.argv[2];
else if (process.platform == "win32")
    path = os.homedir() + "\\Local\\Google\\User Data\\Default\\Bookmarks";
else if (process.platform == "darwin")
    path = os.homedir() + "/Library/Application Support/Google/Chrome/Default/Bookmarks";
else
{
    let homedir = os.homedir();
    if (fs.existsSync(homedir + "/.config/google-chrome/Default/Bookmarks"))
        path = homedir + "/.config/google-chrome/Default/Bookmarks";
    else if (fs.existsSync(homedir + ".config/chromium/Default/Bookmarks"))
        path = homedir + ".config/chromium/Default/Bookmarks";
    else
    {
        console.log("Unable to locate Bookmarks file. Please provide path manually.")
        process.exit(99);
    }
}

// *** *** *** *** *** *** *** *** *** *** //
// *** *** Open File *** *** *** *** *** * //
// *** *** *** *** *** *** *** *** *** *** //

let data;
try
{
    let file = fs.readFileSync(path);
    data = JSON.parse(file);
}
catch (error)
{
    switch (error.code)
    {
        case "ENOENT":
            console.log("Error - Could not find Bookmarks file.");
            break;
        case "EISDIR":
            console.log("Error - Path is a directory.");
            break;
        case "EACESS":
            console.log("Error - Invalid access permissions.");
            break;
        case "EPERM":
            console.log("Error - Invalid access permissions.");
            break;
        default:
            console.log("An error occurred attempting to open the 'Bookmarks' file.");
    }
    process.exit(99);
}

// *** *** *** *** *** *** *** *** *** *** //
// *** *** Traverse *** *** *** *** *** ** //
// *** *** *** *** *** *** *** *** *** *** //

let histogram = new Map();
let folderCount = [];

function traverse_root (root)
{
    let count = 0;
    root["children"].forEach(child => {
        if (child.type == "url")
        {
            let url = urlModule.parse(child.url).hostname;
            if (histogram.has(url)) histogram.set(url, histogram.get(url) + 1);
            else histogram.set(url, 1);
            count += 1;
        }

        if (child.type == "folder")
        {
            traverse_root(child);
        }
    });
    folderCount.push([root.name, count]);
}

traverse_root(data["roots"]["bookmark_bar"]);
traverse_root(data["roots"]["other"]);

// *** *** *** *** *** *** *** *** *** *** //
// *** *** Report *** *** *** *** *** ***  //
// *** *** *** *** *** *** *** *** *** *** //

const descending = (a, b) => b[1] - a[1];

histogram = new Map([...histogram.entries()].sort(descending));
folderCount = folderCount.sort(descending);

let total = 0;
console.log("Domain Frequency:")
histogram.forEach((freq, url, map) => {
    console.log(url, freq);
    total += freq;
});
console.log("total:", total);

console.log("\nFolders:");
folderCount.forEach((folder, index, arr) => {
    console.log(folder[0], folder[1]);
});
