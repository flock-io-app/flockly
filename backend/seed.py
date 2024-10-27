import os
from moralis_transaction import sync_all_transaction
from history import crawl_all_pages

def main():
    os.makedirs("data/history", exist_ok=True)
    os.makedirs("data/transaction", exist_ok=True)
    crawl_all_pages()
    sync_all_transaction(0)

if __name__ == "__main__":
    main()