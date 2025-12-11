from fastapi import APIRouter

router = APIRouter

@router.get("/prices")
def get_current_price():
    return {"ticker": "ORCL", "price":"70000"}