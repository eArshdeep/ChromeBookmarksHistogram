# Chrome Bookmarks Histogram

## Introduction

Simple utility to check the hostname frequency of bookmarks from Chrome.

## Synopsis

```shell
utility [PATH]
```

Where `PATH` is an optional path to the "Bookmarks" file.
Otherwise, this utility checks the default platform-specific locations for the file.

## Sample Output

```
Domain Frequency:
www.google.com 11
www.youtube.com 7
www.ebay.com 3
total: 21

Folders:
Youtube 7
Bookmarks Bar 11
Other Bookmarks 3
```

## Return Codes

| Code | Description |
| --- | --- |
| 0 | Success |
| 99 | Any error related to opening or finding Bookmarks file. |

## Bookmarks File Format

Gathered as of 13 July 2023, from Chrome version 114.0.5735.198 (Official Build) (arm64).
The format is gathered from my sample of the Bookmarks file and not an officially publicised
format specification.

```json
{
    "checksum": "",
    "sync_metadata": "",
    "version": 1,
    "roots": {
        "bookmark_bar": {
            "children": [
                {
                    "date_added": "",
                    "date_last_used": "",
                    "guid": "",
                    "id": "",
                    "name": "",
                    "type": "url|folder",
                    "url": ""
                    "meta_info": { /* optional */
                      "power_bookmark_meta": ""
                    }
                }
            ],
            "date_added": "",
            "date_last_used": "",
            "date_modified": "",
            "guid": "",
            "id": "",
            "name": "",
            "type": "url|folder"
        }
        /* adjacent siblings "other" and "synced" share same format */
    }
}
```

## Known Bookmarks File Paths

Chrome stores its bookmarks information in a file titled `Bookmarks`, a JSON file with no extension.
This differs from the format of the HTML bookmarks export file.

Below are the likely store locations for this file.

```
WINDOWS:
C:\Users\<username>\Local\Google\User Data\Default\Bookmarks

MAC:
/Users/<username>/Library/Application Support/Google/Chrome/Default/Bookmarks

LINUX:
/home/<username>/.config/google-chrome/Default/Bookmarks
/home/<username>/.config/chromium/Default/Bookmarks
```
