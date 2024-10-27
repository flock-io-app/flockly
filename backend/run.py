import time
from moralis_transaction import sync_all_transaction
from history import crawl_new_pages
from aggregate import sync_aggregation

def main():
    print("Starting to syncinig... (Ctrl+C to stop)")
    SYNC_INTERVAL = 10
    crawl_new_pages()
    sync_all_transaction(0)
    sync_aggregation()
    time.sleep(SYNC_INTERVAL)
    main()

if __name__ == "__main__":
    main()