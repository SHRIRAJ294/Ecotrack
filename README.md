# EcoTrack: Carbon Footprint Tracker 🌍🍃

EcoTrack is a gamified web application designed to help individuals track their daily travel impact and make smarter, eco-friendly transport decisions.

## 🎯 Chosen Vertical
**Sustainability & Environmental Impact**
We chose the sustainability vertical, specifically focusing on individual carbon footprints. Transport accounts for a massive portion of daily emissions. This tool gamifies the experience of choosing public transit or active transport (walking/cycling) over driving.

## 🧠 Approach and Logic
Our approach is centered around instant feedback and positive reinforcement:
1. **Emissions Engine:** Uses standard environmental constants (kg of CO₂ emitted per passenger-kilometer) for different vehicle types.
2. **Contextual Decision Making:** When a user logs a high-emission trip, the application dynamically calculates the difference in emissions if they had taken a greener alternative (e.g., "Take the Metro to save 1.5kg of CO₂").
3. **Gamification:** A leaderboard ranks the user against their peers based on total CO₂ saved (compared to driving a car), incentivizing continued eco-friendly choices.

## ⚙️ How the Solution Works
1. **Dashboard:** Gives a high-level overview of total CO₂ emitted, total saved, and total distance logged.
2. **Trip Logger:** Users input their origin, destination, distance in km, and select their transport mode. The app instantly logs the trip.
3. **Smart Alternatives:** Immediately upon input, the app suggests better routing methods ranked by highest environmental savings.
4. **Data Persistence:** The application leverages the browser's `localStorage` to save all trips safely and persistently without needing a complex backend database.

## 📝 Assumptions Made
- **Emission Constants:** We assume average baseline emission factors (e.g., an average car emits ~0.192 kg CO₂/km). Real-world emissions vary by specific vehicle model, traffic conditions, and fuel type.
- **Mocked Leaderboard:** To demonstrate the gamification logic purely on the frontend, peer data (friends/coworkers) is mocked.
- **Distance Input:** We assume users know the approximate distance of their route. Future iterations could integrate Google Maps APIs to calculate this automatically.

## 🧪 Testing and Quality
This project includes automated unit tests using **Vitest** to rigorously validate the accuracy of the mathematical Emission Engine, ensuring safe and reliable calculations.
To run the tests: `npm run test`

## 🚀 Installation & Deployment
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run unit tests
npm run test

# Build for production
npm run build
```
This project is fully ready to be deployed to static hosting platforms like AWS Amplify, Vercel, or Firebase Hosting.
