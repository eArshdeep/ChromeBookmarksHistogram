# Chrome Bookmarks Histogram

## Introduction

Simple utility to check the hostname frequency of bookmarks from Chrome.

## Synopsis

```shell
utility [PATH]
```

Where [PATH] is an optional path to the "Bookmarks" file.
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
