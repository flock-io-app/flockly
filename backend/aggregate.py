import os, json
from collections import defaultdict
import pandas as pd

def sync_aggregation():
    df, transaction_details = load_data()
    task_list = get_task_list(df, transaction_details)
    nodes = defaultdict(list)
    add_stake(nodes, df, transaction_details)
    add_rewards(nodes, df, transaction_details)
    add_unstake(nodes, df, transaction_details)
    for addr in nodes:
        nodes[addr].sort()
        nodes[addr] = get_clean_val(nodes[addr], task_list)
    # store to data/aggregated.json
    data = {
        "nodes": nodes,
    }
    with open("data/aggregated.json", "w") as f:
        json.dump(data, f, indent=4)
    with open("../src/aggregated.json", "w") as f:
        json.dump(data, f, indent=4)

def load_data():
    data_folder = "./data/"
    history_folder = os.path.join(data_folder, "history")

    # concatenate all CSV files while also
    # read all transaction JSON files based on dataframe hash and keep on a variale called transaction_details
    transaction_details = {}
    transactions = []
    for file in os.listdir(history_folder):
        curfile = os.path.join(history_folder, file)
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
            # read the json
            json_file = os.path.join(data_folder, "transaction", file.replace(".csv", ""), f"{row.tx.strip()}.json")
            if os.path.exists(json_file):
                with open(json_file) as f:
                    transaction_details[row.tx.strip()] = json.load(f)
            else:
                print(f"Transaction {row.tx.strip()} JSON file not found")
                
    df = pd.DataFrame(transactions)
    # sort by timestamp and reset index
    df = df.sort_values("timestamp").reset_index(drop=True)
    return df, transaction_details

def toEther(wei):
    return wei / 1000000000000000000

def get_closest_task(d, task_list):
    i = 0
    while i < len(task_list) and task_list[i]['task_date_created'] < d:
        i += 1
    if i > 0: i -= 1
    return task_list[i]

def get_task_list(df, transaction_details):
    task_list = []
    skipped = 0
    for row in df.itertuples():
        if row.method != "Create Task": continue
        if skipped:
            skipped -= 1
            continue
        cur_data = transaction_details[row.hash]
        data = cur_data['decoded_call']['params']
        task_list.append({
            "task_date_created": row.timestamp,
            "task_id": data[0]['value'],
            "duration": data[1]['value'],
            "name": data[2]['value'],
        })
    return task_list

## Stake Tokens For Training Nodes
def add_stake(nodes, df, transaction_details):
    skipped = 0
    for row in df.itertuples():
        if row.method != "Stake Tokens For Training Nodes": continue
        if skipped:
            skipped -= 1
            continue
        cur_data = transaction_details[row.hash]
        # print(row, end="\n\n")
        for log_data in (cur_data['logs']):
            if 'decoded_event' in log_data:
                content = log_data['decoded_event']
            else:
                content = log_data
    
            if content != None and content['label'] == "Transfer":
                # for k in content:
                #     print(k, content[k])
                # print()
                node_address = content['params'][0]['value']
                amount = float(content['params'][2]['value'])
                nodes[node_address].append((row.timestamp, "Train Stake", -toEther(amount)))
    
    ## Stake Tokens For Validators
    skipped = 0
    for row in df.itertuples():
        if row.method != "Stake Tokens For Validators": continue
        if skipped:
            skipped -= 1
            continue
        cur_data = transaction_details[row.hash]
        # print(row, end="\n\n")
        for log_data in (cur_data['logs']):
            if 'decoded_event' in log_data:
                content = log_data['decoded_event']
            else:
                content = log_data
    
            if content != None and content['label'] == "Transfer":
                # for k in content:
                #     print(k, content[k])
                # print()
                node_address = content['params'][0]['value']
                amount = float(content['params'][2]['value'])
                nodes[node_address].append((row.timestamp, "Valid Stake", -toEther(amount)))

## Upload Reward Results
def add_rewards(nodes, df, transaction_details):
    skipped = 0
    for idx, row in df.iterrows():
        if row['method'] != "Claim Rewards": continue
        if skipped:
            skipped -= 1
            continue
        cur_data = transaction_details[row['hash']]
        content = cur_data['logs'][0]['decoded_event']
        node_address = content['params'][1]['value']
        amount = float(content['params'][2]['value'])
        nodes[node_address].append((row['timestamp'], "Claim Reward", toEther(amount)))

def add_unstake(nodes, df, transaction_details):
    ## Unstake Tokens For Training Nodes
    skipped = 0
    for row in df.itertuples():
        if row.method != "Withdraw Stake Tokens For Training Nodes": continue
        if skipped:
            skipped -= 1
            continue
        cur_data = transaction_details[row.hash]
        # print(row, end="\n\n")
        for log_data in (cur_data['logs']):
            if 'decoded_event' in log_data:
                content = log_data['decoded_event']
            else:
                content = log_data
    
            if content != None and content['label'] == "Transfer":
                # for k in content:
                #     print(k, content[k])
                # print()
                node_address = content['params'][1]['value']
                amount = float(content['params'][2]['value'])
                nodes[node_address].append((row.timestamp, "Train Unstake", toEther(amount)))
    
    ## Unstake Tokens For Validators
    skipped = 0
    for row in df.itertuples():
        if row.method != "Withdraw Stake Tokens For Validators": continue
        if skipped:
            skipped -= 1
            continue
        cur_data = transaction_details[row.hash]
        # print(row, end="\n\n")
        for log_data in (cur_data['logs']):
            if 'decoded_event' in log_data:
                content = log_data['decoded_event']
            else:
                content = log_data
    
            if content != None and content['label'] == "Transfer":
                # for k in content:
                #     print(k, content[k])
                # print()
                node_address = content['params'][1]['value']
                amount = float(content['params'][2]['value'])
                nodes[node_address].append((row.timestamp, "Valid Unstake", toEther(amount)))

def get_clean_val(node, task_list):
    clean_val = []
    train_stake = 0
    valid_stake = 0
    for i in range(len(node)):
        d, m, v = node[i]
        task = get_closest_task(d, task_list)
        if m == "Claim Reward":
            j = i - 1
            while j >= 0 and "Stake" not in node[j][1]:
                j -= 1
            if "Train" in node[j][1]:
                clean_val.append((d, "Train", "Reward", v, task))
            else:
                clean_val.append((d, "Valid", "Reward", v, task))
        elif m == "Train Stake":
            train_stake -= v
        elif m == "Valid Stake":
            valid_stake -= v
        elif m == "Train Unstake":
            train_stake -= v
            if train_stake > 0:
                clean_val.append((d, "Train", "Delegate", v, task))
                train_stake = 0
        elif m == "Valid Unstake":
            valid_stake -= v
            if valid_stake > 0:
                clean_val.append((d, "Valid", "Delegate", v, task))
                valid_stake = 0
    return clean_val


if __name__ == "__main__":
    sync_aggregation()