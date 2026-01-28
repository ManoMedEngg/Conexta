from pyscript import document
from pyodide.http import pyfetch
import json

async def fetch_data(url):
    response = await pyfetch(url, method="GET")
    return await response.json()

async def update_dashboard():
    # Fetch data from Next.js backend
    API_URL = "http://localhost:3000/api/status" 
    try:
        data = await fetch_data(API_URL)
    except Exception as e:
        print(f"Error fetching data: {e}")
        # Fallback data
        data = {"active_users": "--", "system_health": "Offline", "status": "Error"}
    
    # Update UI logic...
    
    status_element = document.getElementById("system-status")
    users_element = document.getElementById("active-users")
    health_element = document.getElementById("system-health")
    
    if status_element:
        status_element.innerText = data["status"]
    if users_element:
        users_element.innerText = str(data["active_users"])
    if health_element:
        health_element.innerText = data["system_health"]

def toggle_theme(event):
    body = document.querySelector("body")
    if body.classList.contains("dark"):
        body.classList.remove("dark")
    else:
        body.classList.add("dark")

# Initial Load
import asyncio
asyncio.ensure_future(update_dashboard())
