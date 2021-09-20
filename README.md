# quickbar-updater

Script to update content of quickbar

Run `npm install` and then `update.sh` to create the file `quickbar.json` which can be served to the client for autocompletion. The output file needs to be made available to clients, e.g. allow cross orign header necessary.

You can run this script every day, it should complete in max 30 minutes (with low ram and cpu usage - mostly waiting to not overrun the API)

## Overview of scripts

### 1. v2-fetch-from-sa.js

Load page views from simple analytics - last 3 weeks, **please insert valid token for authentication**.

### 2. extractTop.js

Counts page views. Using the file `resolver.json`, which contains some mappings for old aliases (no need to update anymore). Writes the file `quicklinks.json`

### 3. getMeta.js

Queries the API and fetches taxonomy data into `meta_data.json`.

### 4. process.js

Process all data and creates the final output `quickbar.json`
