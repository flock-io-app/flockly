import os, json, time, sys
import pandas as pd
from moralis import evm_api
from tqdm import tqdm

from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

API_KEYS = [
# load apikey from .env, get it from https://admin.moralis.com/
os.environ.get("MORALIS_API_KEY"),
]

def get_transaction(transaction_hash, id):
    api_key = API_KEYS[id]

    params = {
        "chain": "base sepolia",
        "transaction_hash": transaction_hash
    }
    # print(f"'{transaction_hash}'", params)

    result = evm_api.transaction.get_transaction_verbose(
        api_key=api_key,
        params=params,
    )

    return result

def sync_all_transaction(id):
    transactions = []
    for file in os.listdir('data/history'):
        curfile = os.path.join('data/history', file)
        df = pd.read_csv(curfile)
        folder = file.replace('.csv', '')
        os.makedirs(f'data/transaction/{folder}', exist_ok=True)
        for row in df.itertuples():
            if os.path.exists(f'data/transaction/{folder}/{row.tx[:-1]}.json'):
                # print(f"Transaction {row.tx[:-1]} already exists.")
                continue
            transactions.append((row.tx[:-1], folder))
    transactions.sort(key=lambda x: x[1])

    total = len(transactions) // len(API_KEYS)
    for (tx, folder) in tqdm(transactions[total*id:total*(id+1)]):
        try:
            print(f"Processing {folder} - {tx}")
            if os.path.exists(f'data/transaction/{folder}/{tx}.json'):
                print(f"Transaction {tx} already exists.")
                continue
            data = get_transaction(tx, id)
            with open(f'data/transaction/{folder}/{tx}.json', 'w') as f:
                json.dump(data, f, indent=4)
            time.sleep(0.5)
        except Exception as e:
            print(f"Failed to retrieve transaction {tx}: {e}")
            return


if __name__ == "__main__":
    # main(0)
    id = int(sys.argv[1])
    sync_all_transaction(id)
    print("Running script using api key", API_KEYS[id])