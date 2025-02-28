# 🚀 Flight Booking App

A Vue.js project following best practices for modern frontend development.

## 📌 Features

- Vue 3 with Composition API
- Vite for fast development
- Tailwind CSS for styling (optional)
- Vue Router for navigation
- Pinia for state management (optional)
- Axios for API calls
- SignalR for real-time updates

## 🛫 Thematics

This application is designed for booking flights. It includes three user roles:

- **Agent**: Can manage reservations and assist customers.
- **Admin**: Has full control over the system, including user management and system settings.
- **Visitor**: Can browse flights and make reservations.

All routes are protected based on the user's role, ensuring that each user has access only to the features they are authorized to use.

## 📦 Installation

Make sure you have **Node.js** installed (recommended: Node.js 18+). Then, follow these steps:

```sh
# Clone the repository
git clone https://github.com/zarkojovic/FlightBooking_Frontend.git

# Navigate to the project folder
cd FlightBooking_Frontend

# Install dependencies
npm install
```

## 🚀 Running the Project

```sh
# Start the development server
npm run dev
```
The app will be available at: [http://localhost:5173](http://localhost:5173)

## 🏗️ Project Structure

```
📂 src
 ┣ 📂 assets          # Static assets (images, styles, etc.)
 ┣ 📂 components      # Reusable Vue components
 ┣ 📂 pages           # Page components for Vue Router
 ┣ 📂 store           # State management (Pinia)
 ┣ 📂 services        # API calls and external services
 ┣ 📂 router          # Vue Router configuration
 ┣ 📜 App.vue         # Main Vue component
 ┣ 📜 main.js         # Entry point
 ┗ 📜 index.html      # Main HTML template
```

## 📜 Scripts

```sh
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🛠️ Technologies Used

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) (optional)
- [Axios](https://axios-http.com/)
- [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr)
- [Tailwind CSS](https://tailwindcss.com/) (optional)


## 📄 License

This project is licensed under the **MIT License**.

---

💡 **Contributions are welcome!** If you find a bug or have a suggestion, feel free to open an issue or a pull request. 🚀

### **🔹 Why This README?**
✅ **Clear installation steps**  
✅ **Project structure overview**  
✅ **Essential scripts**  
✅ **Tech stack list**  

---