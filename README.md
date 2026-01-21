# JavaScript plus DOM Self Assessment

**Student Name:** Kunj Joshi  
**NUID:** 002476973

---

## 📋 Project Overview

This project displays Boston Airbnb listings in an interactive, responsive web application. It loads data from a CSV file using AJAX (JavaScript fetch API) and dynamically creates listing cards with detailed information about each property.

**Live Demo:** [https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/](https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/)

---

## ✨ Features

### Required Features
- ✅ Loads first 50 listings from CSV file using AJAX (fetch/await)
- ✅ Displays listing name
- ✅ Shows full description
- ✅ Lists amenities in styled rectangular blocks
- ✅ Shows host information (name and photo)
- ✅ Displays price per night
- ✅ Shows listing thumbnail image
- ✅ Additional property details (bedrooms, bathrooms, neighborhood)

### Unique Creative Feature 🌟
- **Verified Host Badge:** Small green "VERIFIED" badge overlays the host's profile picture for hosts with verified identity (`host_identity_verified === 't'`). This provides users with quick visual confirmation of host verification status.

### Additional Enhancements
- Responsive grid layout
- Fixed card dimensions for uniform appearance
- Circular host profile images
- Hover animations and transitions
- Loading indicator
- Error handling with user-friendly messages
- Placeholder images for missing data
- Modern gradient design
- Truncated text to prevent overflow

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Async/await, DOM manipulation
- **CSV Parsing** - Custom parser for CSV data
- **Fetch API** - AJAX data loading

---

## 📁 Project Structure

```
airbnb-listings/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # Data loading and DOM manipulation
├── listings.csv        # Boston Airbnb data from InsideAirbnb.com
└── README.md           # Project documentation
```

---

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local HTTP server (required for AJAX to work)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
   ```

2. **Add your CSV data**
   - Download Boston listings CSV from [InsideAirbnb.com](http://insideairbnb.com/get-the-data/)
   - Save as `listings.csv` in the project root

3. **Start a local server**

   **Option A: VS Code Live Server (Recommended)**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

   **Option B: Python**
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

   **Option C: Node.js**
   ```bash
   npx live-server
   ```

4. **View the application**
   - Open your browser to the server address
   - The page will load and display the first 50 listings

---

## 📊 Data Source

Data obtained from [Inside Airbnb](http://insideairbnb.com/get-the-data/)  
Dataset: Boston, Massachusetts, United States

### CSV Columns Used
- `name` - Listing name
- `description` - Property description
- `amenities` - Available amenities (parsed from string array)
- `host_name` - Host's name
- `host_picture_url` - Host profile photo
- `host_identity_verified` - Verification status (t/f)
- `price` - Price per night
- `picture_url` - Property image
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `neighborhood_cleansed` - Neighborhood location

---

## 🎨 Design Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Fixed Card Dimensions:** 700px height for consistent layout
- **Circular Host Images:** 60px circular profile pictures
- **Rectangular Amenity Tags:** Gradient-styled pills for each amenity
- **Modern Color Scheme:** Purple gradient theme with Airbnb red accents
- **Smooth Animations:** Hover effects and transitions
- **Verified Badge:** Green badge for verified hosts

---

## 🔧 Key JavaScript Functions

- `parseCSV()` - Custom CSV parser handling quoted fields
- `parseAmenities()` - Converts amenity strings to arrays
- `formatPrice()` - Formats prices as currency
- `truncateText()` - Limits text length with ellipsis
- `createListingCard()` - Generates HTML for each listing
- `loadListings()` - Main async function for data loading

---

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

---

## 🙏 Credits

- **Data Source:** [Inside Airbnb](http://insideairbnb.com/)
- **Base Repository:** [john-guerra/Airbnb_Listings_demo_page](https://github.com/john-guerra/Airbnb_Listings_demo_page)
- **Student:** Kunj Joshi (NUID: 002476973)

---

## 📝 License

This project is created for educational purposes as part of a web development course assignment.

---

*This assignment was created with assistance from Claude (Anthropic AI) for code structure, styling, and documentation.*