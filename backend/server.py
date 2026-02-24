from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import Optional, List
from datetime import datetime, timedelta
import uuid

from models import (
    User, UserCreate, Transaction, TransactionCreate,
    Store, APIPaymentCreate, APIPaymentResponse, Stats
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="CryptoPIX API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Cryptocurrency rates and config
CRYPTO_RATES = {
    'bitcoin': 350000,
    'ethereum': 15000,
    'usdt': 5.80,
    'usdc': 5.80,
    'bnb': 2800,
    'drex': 1,
    'solana': 800,
    'cardano': 3.50,
    'polkadot': 45,
    'litecoin': 600,
    'chainlink': 85,
    'polygon': 5.20,
    'ripple': 3.20,
    'avalanche': 220
}

PLATFORM_FEE_PERCENT = 1.5
INVOICE_EXPIRY_MINUTES = 15

# Helper functions
def generate_crypto_address(crypto: str) -> str:
    addresses = {
        'bitcoin': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'ethereum': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'usdt': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'usdc': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'bnb': 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
        'drex': 'drex1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0',
        'solana': 'SoLaR1234567890abcdefghijklmnopqrstuvwxyz',
        'cardano': 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae',
        'polkadot': '1zugcavYA9yCuYwiEYeMHNJm9gXznYjNfXQjZsZukF1Mpow',
        'litecoin': 'LTC1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'chainlink': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'polygon': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'ripple': 'rN7n7otQDd6FczFgLdlqtyMVrn3NnkhaWV',
        'avalanche': 'X-avax1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhs'
    }
    return addresses.get(crypto, addresses['bitcoin'])

def generate_pix_key() -> str:
    return f"00020126580014br.gov.bcb.pix0136{str(uuid.uuid4()).replace('-', '')}5204000053039865802BR5925CRYPTOPIX PAGAMENTOS LT6009SAO PAULO62070503***63041D3A"

async def verify_api_key(authorization: Optional[str] = Header(None)) -> Optional[Store]:
    if not authorization or not authorization.startswith('Bearer '):
        return None
    
    api_key = authorization.replace('Bearer ', '')
    store = await db.stores.find_one({"api_key": api_key})
    
    if not store:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    return Store(**store)

# Basic routes
@api_router.get("/")
async def root():
    return {"message": "CryptoPIX API v1.0", "status": "online"}

@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# User routes
@api_router.post("/users/register", response_model=User)
async def register_user(user: UserCreate):
    # Check if user exists
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_dict = user.dict()
    new_user = User(**user_dict)
    
    # If affiliate, create store and API key
    if user.role == "affiliate":
        store = Store(
            name=user.store_name or f"{user.name}'s Store",
            owner=user.name,
            email=user.email
        )
        await db.stores.insert_one(store.dict())
        new_user.api_key = store.api_key
    
    await db.users.insert_one(new_user.dict())
    return new_user

@api_router.post("/users/login")
async def login_user(email: str, password: str):
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return User(**user)

@api_router.get("/users/me", response_model=User)
async def get_current_user(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

# Transaction routes
@api_router.post("/transactions/create", response_model=Transaction)
async def create_transaction(transaction: TransactionCreate, user_id: Optional[str] = None):
    crypto_rate = CRYPTO_RATES.get(transaction.crypto, CRYPTO_RATES['bitcoin'])
    
    # Calculate amounts
    crypto_amount = transaction.amount / crypto_rate
    platform_fee = (transaction.amount * PLATFORM_FEE_PERCENT) / 100
    
    # Create transaction
    tx_dict = transaction.dict()
    tx = Transaction(**tx_dict)
    tx.crypto_amount = crypto_amount
    tx.fee = platform_fee
    tx.crypto_address = generate_crypto_address(transaction.crypto)
    tx.user_id = user_id
    tx.expires_at = datetime.utcnow() + timedelta(minutes=INVOICE_EXPIRY_MINUTES)
    
    if transaction.type == "crypto_to_pix":
        tx.total_crypto = crypto_amount + (0.0001 if transaction.crypto == 'bitcoin' else 0.002)
    elif transaction.type == "buy_crypto":
        tx.total_brl = transaction.amount + platform_fee
    elif transaction.type == "sell_crypto":
        tx.net_brl = transaction.amount - platform_fee
    
    await db.transactions.insert_one(tx.dict())
    return tx

@api_router.get("/transactions/{transaction_id}", response_model=Transaction)
async def get_transaction(transaction_id: str):
    tx = await db.transactions.find_one({"id": transaction_id})
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return Transaction(**tx)

@api_router.get("/transactions", response_model=List[Transaction])
async def list_transactions(user_id: Optional[str] = None, store_id: Optional[str] = None, limit: int = 100):
    query = {}
    if user_id:
        query["user_id"] = user_id
    if store_id:
        query["store_id"] = store_id
    
    transactions = await db.transactions.find(query).sort("created_at", -1).limit(limit).to_list(limit)
    return [Transaction(**tx) for tx in transactions]

@api_router.patch("/transactions/{transaction_id}/status")
async def update_transaction_status(transaction_id: str, status: str):
    tx = await db.transactions.find_one({"id": transaction_id})
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    update_data = {"status": status}
    
    if status == "processing":
        update_data["paid_at"] = datetime.utcnow()
    elif status == "completed":
        update_data["completed_at"] = datetime.utcnow()
    
    await db.transactions.update_one(
        {"id": transaction_id},
        {"$set": update_data}
    )
    
    # Update store stats if applicable
    if tx.get("store_id") and status == "completed":
        await db.stores.update_one(
            {"id": tx["store_id"]},
            {
                "$inc": {
                    "total_transactions": 1,
                    "total_volume": tx.get("amount", 0)
                }
            }
        )
    
    updated_tx = await db.transactions.find_one({"id": transaction_id})
    return Transaction(**updated_tx)

# API Payment routes (for affiliates)
@api_router.post("/v1/payments/create", response_model=APIPaymentResponse)
async def api_create_payment(
    payment: APIPaymentCreate,
    store: Store = Depends(verify_api_key)
):
    """Create a payment invoice via API"""
    crypto_rate = CRYPTO_RATES.get(payment.crypto, CRYPTO_RATES['bitcoin'])
    crypto_amount = payment.amount / crypto_rate
    platform_fee = (payment.amount * PLATFORM_FEE_PERCENT) / 100
    
    tx = Transaction(
        type="crypto_to_pix",
        crypto=payment.crypto,
        amount=payment.amount,
        crypto_amount=crypto_amount,
        pix_key=payment.pix_key,
        message=payment.message,
        fee=platform_fee,
        crypto_address=generate_crypto_address(payment.crypto),
        store_id=store.id,
        expires_at=datetime.utcnow() + timedelta(minutes=INVOICE_EXPIRY_MINUTES)
    )
    
    await db.transactions.insert_one(tx.dict())
    
    return APIPaymentResponse(
        id=tx.id,
        status=tx.status,
        amount=tx.amount,
        crypto=tx.crypto,
        crypto_amount=tx.crypto_amount,
        pix_key=tx.pix_key,
        crypto_address=tx.crypto_address,
        qr_code_data=tx.crypto_address,
        expires_at=tx.expires_at,
        invoice_url=f"https://cryptopix.com.br/invoice/{tx.id}"
    )

@api_router.get("/v1/transactions/{transaction_id}")
async def api_get_transaction(
    transaction_id: str,
    store: Store = Depends(verify_api_key)
):
    """Get transaction status via API"""
    tx = await db.transactions.find_one({"id": transaction_id, "store_id": store.id})
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return Transaction(**tx)

@api_router.post("/v1/crypto/buy")
async def api_buy_crypto(
    crypto: str,
    amount: float,
    store: Store = Depends(verify_api_key)
):
    """Create a buy crypto invoice via API"""
    crypto_rate = CRYPTO_RATES.get(crypto, CRYPTO_RATES['bitcoin'])
    brl_amount = amount * crypto_rate
    platform_fee = (brl_amount * PLATFORM_FEE_PERCENT) / 100
    
    tx = Transaction(
        type="buy_crypto",
        crypto=crypto,
        amount=brl_amount,
        crypto_amount=amount,
        fee=platform_fee,
        total_brl=brl_amount + platform_fee,
        store_id=store.id
    )
    
    tx.pix_key = generate_pix_key()
    
    await db.transactions.insert_one(tx.dict())
    return tx

@api_router.post("/v1/crypto/sell")
async def api_sell_crypto(
    crypto: str,
    amount: float,
    pix_key: str,
    store: Store = Depends(verify_api_key)
):
    """Create a sell crypto invoice via API"""
    crypto_rate = CRYPTO_RATES.get(crypto, CRYPTO_RATES['bitcoin'])
    brl_amount = amount * crypto_rate
    platform_fee = (brl_amount * PLATFORM_FEE_PERCENT) / 100
    
    tx = Transaction(
        type="sell_crypto",
        crypto=crypto,
        amount=brl_amount,
        crypto_amount=amount,
        pix_key=pix_key,
        fee=platform_fee,
        net_brl=brl_amount - platform_fee,
        crypto_address=generate_crypto_address(crypto),
        store_id=store.id
    )
    
    await db.transactions.insert_one(tx.dict())
    return tx

# Store/Affiliate routes
@api_router.get("/stores", response_model=List[Store])
async def list_stores():
    stores = await db.stores.find().to_list(100)
    return [Store(**store) for store in stores]

@api_router.get("/stores/{store_id}", response_model=Store)
async def get_store(store_id: str):
    store = await db.stores.find_one({"id": store_id})
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    return Store(**store)

@api_router.get("/stores/by-email/{email}", response_model=Store)
async def get_store_by_email(email: str):
    store = await db.stores.find_one({"email": email})
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    return Store(**store)

# Admin routes
@api_router.get("/admin/stats", response_model=Stats)
async def get_admin_stats():
    total_users = await db.users.count_documents({})
    total_stores = await db.stores.count_documents({})
    total_transactions = await db.transactions.count_documents({})
    
    # Calculate total volume
    pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ]
    result = await db.transactions.aggregate(pipeline).to_list(1)
    total_volume = result[0]["total"] if result else 0
    
    return Stats(
        total_users=total_users,
        total_stores=total_stores,
        total_transactions=total_transactions,
        total_volume=total_volume,
        monthly_growth=23.5
    )

@api_router.get("/admin/users", response_model=List[User])
async def get_all_users(limit: int = 100):
    users = await db.users.find().limit(limit).to_list(limit)
    return [User(**user) for user in users]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
