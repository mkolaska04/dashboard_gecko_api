import { preinitModule } from 'react-dom';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5e2bff",
        secondary: "#66c7f4",
        bg_dark: "#171123",
        box: "#231A35",
        btn: "#3a4048",
        error: "#FF1053",
        success: "#51CB20",
        
      }
    },
    
  },
  plugins: [],
}
