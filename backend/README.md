# Steps to Run the Backend Server

This code is responsible to crawl and sync the history of flock.io transaction, cleanup the data and provide it to FE for display.

## 1. Install

We use python 3.12.2

```
pip install -r requirements.txt
```

Setup .env file, refer to .env.example

## 2. Seeding

Run this once before running the backend script

```
cd backend
python seed.py
```

## 3. Running

Now we just syncing the data in a json file and FE will read the file to display.
..for quick POC..

```
# still on backend folder
python run.py
```
