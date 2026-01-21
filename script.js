// Configuration
const CSV_FILE_PATH = 'listings.csv'; // Update this to your CSV file path
const MAX_LISTINGS = 50;

// Parse CSV data manually
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = [];
        let currentValue = '';
        let insideQuotes = false;

        for (let char of lines[i]) {
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.trim().replace(/^"|"$/g, ''));
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim().replace(/^"|"$/g, ''));

        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        data.push(row);
    }

    return data;
}

function parseAmenities(amenitiesString) {
    if (!amenitiesString) return [];
    
    // Remove brackets and quotes, split by comma
    const cleaned = amenitiesString
        .replace(/[\[\]"]/g, '')
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    
    return cleaned.slice(0, 5); 
}

function formatPrice(price) {
    if (!price) return 'N/A';
    const numPrice = parseFloat(price.replace(/[$,]/g, ''));
    return isNaN(numPrice) ? 'N/A' : `$${numPrice.toFixed(0)}`;
}

// Truncate text
function truncateText(text, maxLength = 200) {
    if (!text) return 'No description available';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Create listing card HTML
function createListingCard(listing) {
    const card = document.createElement('article');
    card.className = 'listing-card';

    const isVerified = listing.host_identity_verified === 't';
    const verifiedBadge = isVerified ? '<span class="verified-badge">VERIFIED</span>' : '';
    
    const amenities = parseAmenities(listing.amenities);
    const amenitiesHTML = amenities.length > 0 
        ? amenities.map(amenity => `<li>${amenity}</li>`).join('')
        : '<li>No amenities listed</li>';

    card.innerHTML = `
        <div class="listing-image-wrapper">
            <img src="${listing.picture_url || 'https://via.placeholder.com/400x300?text=No+Image'}" 
                 alt="${listing.name || 'Listing'}" 
                 class="listing-image"
                 onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        </div>
        
        <div class="listing-content">
            <div class="listing-header">
                <h2 class="listing-name">${listing.name || 'Unnamed Listing'}</h2>
                <div class="listing-location">
                    <span class="neighborhood">📍 ${listing.neighborhood_cleansed || 'Boston'}</span>
                </div>
            </div>

            <div class="listing-details">
                <div class="listing-info">
                    <span class="bedrooms">🛏️ ${listing.bedrooms || '0'} bed${listing.bedrooms !== '1' ? 's' : ''}</span>
                    <span class="bathrooms">🚿 ${listing.bathrooms || '0'} bath${listing.bathrooms !== '1' ? 's' : ''}</span>
                </div>
                <div class="listing-price">${formatPrice(listing.price)}/night</div>
            </div>

            <div class="listing-description">
                <p>${truncateText(listing.description)}</p>
            </div>

            <div class="listing-amenities">
                <h3>Amenities</h3>
                <ul class="amenities-list">
                    ${amenitiesHTML}
                </ul>
            </div>

            <div class="listing-host">
                <div class="host-image-wrapper">
                    <img src="${listing.host_picture_url || 'https://via.placeholder.com/60?text=Host'}" 
                         alt="${listing.host_name || 'Host'}" 
                         class="host-image"
                         onerror="this.src='https://via.placeholder.com/60?text=Host'">
                    ${verifiedBadge}
                </div>
                <div class="host-info">
                    <h3>Host</h3>
                    <p class="host-name">${listing.host_name || 'Unknown Host'}</p>
                </div>
            </div>
        </div>
    `;

    return card;
}

// Load and display listings
async function loadListings() {
    const loadingElement = document.getElementById('loading');
    const listingsContainer = document.getElementById('listings-container');

    try {
        // Show loading indicator
        loadingElement.style.display = 'block';
        listingsContainer.style.display = 'none';

        // Fetch CSV file
        const response = await fetch(CSV_FILE_PATH);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        
        // Parse CSV
        const allListings = parseCSV(csvText);
        
        // Get first 50 listings
        const listings = allListings.slice(0, MAX_LISTINGS);
        
        console.log(`Loaded ${listings.length} listings`);

        // Clear container
        listingsContainer.innerHTML = '';

        // Create and append listing cards
        listings.forEach((listing, index) => {
            const card = createListingCard(listing);
            listingsContainer.appendChild(card);
        });

        // Hide loading, show listings
        loadingElement.style.display = 'none';
        listingsContainer.style.display = 'grid';

    } catch (error) {
        console.error('Error loading listings:', error);
        loadingElement.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Listings</h2>
                <p>${error.message}</p>
                <p>Make sure the CSV file is in the correct location: ${CSV_FILE_PATH}</p>
            </div>
        `;
        loadingElement.style.display = 'block';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadListings);