from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

# User Models
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str = "user"  # user, affiliate, admin

class UserCreate(UserBase):
    password: str
    store_name: Optional[str] = None

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    store_name: Optional[str] = None
    api_key: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Transaction Models
class TransactionBase(BaseModel):
    type: str  # crypto_to_pix, buy_crypto, sell_crypto
    crypto: str
    amount: float
    
class TransactionCreate(TransactionBase):
    crypto_amount: Optional[float] = None
    pix_key: Optional[str] = None
    message: Optional[str] = None

class Transaction(TransactionBase):
    id: str = Field(default_factory=lambda: f"CPX-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:6].upper()}")
    crypto_amount: float
    pix_key: Optional[str] = None
    message: Optional[str] = None
    fee: float
    network_fee: Optional[float] = 0
    total_crypto: Optional[float] = None
    total_brl: Optional[float] = None
    net_brl: Optional[float] = None
    status: str = "pending"  # pending, processing, completed, failed, expired
    crypto_address: Optional[str] = None
    user_id: Optional[str] = None
    store_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    paid_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None

# API Payment Models
class APIPaymentCreate(BaseModel):
    crypto: str
    amount: float
    pix_key: str
    message: Optional[str] = None
    product_name: Optional[str] = None
    
class APIPaymentResponse(BaseModel):
    id: str
    status: str
    amount: float
    crypto: str
    crypto_amount: float
    pix_key: str
    crypto_address: str
    qr_code_data: str
    expires_at: datetime
    invoice_url: str

# Store Models
class Store(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    owner: str
    email: EmailStr
    api_key: str = Field(default_factory=lambda: f"cpx_live_{str(uuid.uuid4()).replace('-', '')}")
    total_transactions: int = 0
    total_volume: float = 0.0
    status: str = "active"
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Stats Models
class Stats(BaseModel):
    total_users: int
    total_stores: int
    total_transactions: int
    total_volume: float
    monthly_growth: float
