/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],  // Set your default sans-serif font to Roboto
        serif: ['Poppins', 'Georgia', 'serif'],   // Set your default serif font to Poppins
      },
      boxShadow:{
'custom': '0 4px 8px rgba(0, 0, 0, 0.1)',
      }
    },
    
  },

  plugins: [],
}

