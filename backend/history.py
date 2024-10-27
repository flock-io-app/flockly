# crawl table data from https://sepolia.basescan.org/txs?a=0x7b6bde1d173eb288f390ff36e21801f42c4d8d91&p=1
# going trough all pages and save data to csv file in 'data/history/<end_date>_<block>.csv'
# run: python history.py
import requests, os, json, time
import pandas as pd
from bs4 import BeautifulSoup

from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def main():
    crawl_all_pages()
    merge_tsx()

def merge_tsx():
    transactions = []
    for file in os.listdir('data/history'):
        curfile = os.path.join('data/history', file)
        for row in pd.read_csv(curfile).itertuples():
            transactions.append({
                "hash": row.tx.strip(),
                "method": row.method,
                "block": row.block,
                "timestamp": row.timestamp,
                "from_address": row.from_address,
                "to_address": row.to_address,
                "amount": row.amount,
                "txnFee": row.txnFee,
            })
    
    pathfile = '../starter-files/src/axios-pull/transactions/python_transactions.json'
    json.dump({"transactions": transactions}, open(pathfile, 'w'), indent=4)
    print(f'merged all files to "{pathfile}", total row {len(transactions)}')

# loop through all pages
def crawl_all_pages():
    i = 0
    while True:
        try:
            url = f'https://sepolia.basescan.org/txs?a=0x7b6bde1d173eb288f390ff36e21801f42c4d8d91&ps=100&p={i}'
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            table = soup.find('table', class_='table')
            rows = table.find_all('tr')
            data = []
            dates = []
            for row in rows[1:]:
                cols = row.find_all('td')
                if len(cols) == 0: break
                links = row.find_all('a', class_='js-clipboard')
                spans = row.find_all('span')
                # for idx, span in enumerate(spans):
                #     print(idx, span.text)

                dates.append(cols[4].text)
                try:
                    data.append({
                        "tx": cols[1].text,
                        "method": spans[1].attrs['data-title'],
                        "block": cols[3].text,
                        "timestamp": cols[4].text,
                        "from_address": links[1]['data-clipboard-text'],
                        "to_address": links[2]['data-clipboard-text'],
                        "amount": cols[10].text,
                        "txnFee": cols[11].text,
                    })
                except:
                    print('skipped', cols[1].text)
                    break
            i += 1
            df = pd.DataFrame(data)
            dates.sort()
            datetime = dates[-1].replace(' ', '_').replace(':', '-')
            filename = f'data/history/{datetime}_{i}.csv'
            if (len(data) == 0):
                print("no data found at page", i)
                continue
            df.to_csv(filename, index=False)
            print(f'saved {filename}, with {len(data)} rows from page {i}')
            time.sleep(1)
        except:
            break


def crawl_new_pages():
    # get the latest timestamp transaction
    latest = "2021-01-01 00:00:00"
    for file in os.listdir('data/history'):
        curfile = os.path.join('data/history', file)
        df = pd.read_csv(curfile)
        dates = df['timestamp'].tolist()
        dates.sort()
        latest = max(latest, dates[-1])
    print("syncing from latest date:", latest)
    i = 0
    match = False
    while not match:
        try:
            url = f'https://sepolia.basescan.org/txs?a=0x7b6bde1d173eb288f390ff36e21801f42c4d8d91&ps=100&p={i}'
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            table = soup.find('table', class_='table')
            rows = table.find_all('tr')
            data = []
            dates = []
            for row in rows[1:]:
                cols = row.find_all('td')
                if len(cols) == 0: break
                links = row.find_all('a', class_='js-clipboard')
                spans = row.find_all('span')
                # for idx, span in enumerate(spans):
                #     print(idx, span.text)
                if cols[4].text == latest:
                    match = True
                    break
                dates.append(cols[4].text)
                try:
                    data.append({
                        "tx": cols[1].text,
                        "method": spans[1].attrs['data-title'],
                        "block": cols[3].text,
                        "timestamp": cols[4].text,
                        "from_address": links[1]['data-clipboard-text'],
                        "to_address": links[2]['data-clipboard-text'],
                        "amount": cols[10].text,
                        "txnFee": cols[11].text,
                    })
                except:
                    print('skipped', cols[1].text)
                    break
            i += 1
            df = pd.DataFrame(data)
            dates.sort()
            datetime = dates[-1].replace(' ', '_').replace(':', '-')
            filename = f'data/history/{datetime}_{i}.csv'
            if (len(data) == 0):
                print("no new data found at page", i)
                continue
            df.to_csv(filename, index=False)
            print(f'saved {filename}, with {len(data)} rows from page {i}')
            time.sleep(1)
        except:
            break

if __name__ == "__main__":
    main()