# Project Name: Group Study

## Purpose
The **Group Study** is a user-friendly platform designed to simplify group learning and assignment submissions. It provides an intuitive interface for users to manage assignments, track submissions, and collaborate effectively.

## Some Screenshorts
<div align="center">
  <img height="450" src="https://i.ibb.co.com/6775bVxY/group-study.png"  />
</div> 

## Live URL
[Live Application](https://group-study-b6d75.web.app)

## Key Features
- **User Authentication**: Secure login and registration using email/password and Google authentication.
- **Assignments Management**: 
  - Create, update, and delete assignments.
  - Filter assignments by difficulty level (Easy, Medium, Hard).
  - Search assignments by title.
- **Submission Management**: Submit and track assignment submissions with real-time feedback.
- **Responsive Design**: Tailored for seamless use on desktops and mobile devices.
- **Interactive 404 Page**: Engaging page for non-existent routes.
- **Tooltips**: Hover over user profiles to see display names using `react-tooltip`.

## Technologies Used
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Authentication**: Firebase Authentication
- **Notifications**: React Toastify
- **Tooltips**: React Tooltip

## NPM Packages Used
- `react-router-dom` - For navigation and routing.
- `axios` - For making HTTP requests.
- `firebase` - For authentication and backend integration.
- `react-toastify` - For toast notifications.
- `react-tooltip` - For tooltips on hover.
- `motion` - For showing Assingment smothely

## 🛠️ How to Set Up the Project  

Follow these steps to run the **LoveLink** project locally.  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/muhammad-sohel131/groupStudy-frontend.git
cd groupStudy-frontend
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Set Up Environment Variables
- VITE_apiKey=***
- VITE_authDomain=***
- VITE_projectId=***
- VITE_storageBucket=***
- VITE_messagingSenderId=***
- VITE_appId=***

### 4️⃣ Start the Development Server
```sh
npm run dev
```
### 4️⃣ Run the Backend Server
```sh
git clone https://github.com/muhammad-sohel131/groupStudy-backend.git
cd groupStudy-backend
npm install
npm start
```
