**Elderly Care & Assistant** project with **Health Track Reminders** and **Safety Track** features:

---

## 🧓🏻 Elderly Care & Assistant System  

A smart **Elderly Care System** designed to monitor health routines and ensure the safety of elderly individuals. This project provides **health reminders** and **location tracking** to notify family members if the elderly person moves outside a designated safe region.

---

### 📋 **Features**  

1. **Health Track Reminders**  
   - Sends **customizable reminders** for medication, doctor appointments, and hydration.  
   - Alerts caregivers if reminders are **missed**.  
2. **Safety Track (Geo-Fencing)**  
   - Tracks the **real-time location** of elderly individuals.  
   - Notifies **family members** via SMS if the elderly person moves **outside a safe zone**.  

---

### 🛠️ **Technologies Used**  

- **Python** (Core functionality)  
- **Flask** (For web interface)  
- **Twilio API** (For SMS notifications)  
- **Geopy** (For location tracking)  
- **SQLite** (For storing user data and reminder logs)  

---

### 📦 **Project Structure**  
```
elderly-care-system/
├── app.py                  # Main Flask application
├── reminders.py            # Health reminder logic
├── safety_tracker.py       # Geo-fencing and location tracking
├── templates/
│    └── dashboard.html     # Web interface for managing reminders
└── requirements.txt        # Project dependencies
```

---

### 🚀 **Getting Started**  

1. **Clone the Repository**  
```bash
git clone https://github.com/yourusername/elderly-care-assistant.git
cd elderly-care-assistant
```

2. **Set Up Environment**  
Ensure Python 3.x is installed. Create a virtual environment:  
```bash
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
```

3. **Install Dependencies**  
```bash
pip install -r requirements.txt
```

4. **Set Environment Variables**  
Create a `.env` file and add your Twilio and Map API keys:  
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
SAFE_ZONE_LAT=40.7128
SAFE_ZONE_LON=-74.0060
SAFE_RADIUS=1000  # in meters
```

5. **Run the Application**  
```bash
python app.py
```
Access the dashboard at: **http://localhost:5000**

---

### 📊 **Usage Guide**  

1. **Set Health Reminders**  
   - Add medication and appointment reminders via the dashboard.  
   - Automated SMS alerts will be sent based on the schedule.  

2. **Track Location & Safety Alerts**  
   - Input a **safe zone (latitude, longitude, radius)** in the `.env` file.  
   - If the elderly person moves outside this region, an **SMS alert** is sent to family members.  

---

### 📌 **Future Enhancements**  

- **Voice-Activated Reminders** using speech recognition.  
- **Daily Health Report** for caregivers.  
- **Integration with Wearable Devices** for advanced tracking.  

---

### 🤝 **Contributing**  

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature/new-feature`.  
3. Commit your changes: `git commit -m 'Add new feature'`.  
4. Push to the branch: `git push origin feature/new-feature`.  
5. Open a **Pull Request**.  

---

### 📄 **License**  
This project is licensed under the **MIT License** – feel free to use and extend it!

---

Would you like **code snippets** or **help setting up** any feature?
