const axios = require('axios');

// Define BigCommerce API endpoint
const endpoint = 'https://api.bigcommerce.com/stores/{store_id}/v3/catalog/products';

// Define your BigCommerce API credentials
const apiKey = 'YOUR_API_KEY';
const apiToken = 'YOUR_API_TOKEN';

// Define request headers with authentication credentials
const headers = {
  'X-Auth-Token': apiKey,
  'Accept': 'application/json'
};

// Define a function to fetch product data from BigCommerce
async function fetchProductData() {
  try {
    // Make an HTTP GET request to the BigCommerce API
    const response = await axios.get(endpoint, { headers });

    // Extract product data from the response
    const products = response.data;

    // Process the product data as needed
    console.log('Product data:', products);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching product data:', error.message);
  }
}

// Call the fetchProductData function to initiate the request
fetchProductData();

function mapToStrapiProduct(strapiProduct) {
    return {
        name: strapiProduct.name,
        description: strapiProduct.description,
        price: parseFloat(strapiProduct.price), // Convert price to float
        sku: strapiProduct.sku, // Assuming SKU field is the same
        category: strapiProduct.category, // Assuming category field is the same
        // Add more mappings as needed
    };
}

async function handleOrderCreated(eventData) {
  // Extract order details from event data (replace with your actual field names)
  const orderId = eventData.data.id;
  const customerEmail = eventData.data.customer_email;
  const orderItems = eventData.data.items; // Assuming an "items" array exists

  // 1. Update data in Strapi (create an order entry)
  const newOrder = await strapi.services.order.create({
    data: {
      orderId,
      customerEmail,
      // Add other relevant order details here (e.g., total amount)
    },
  });

  // 2. Trigger actions - Send email notification
  const emailContent = buildOrderConfirmationEmail(customerEmail, orderId, orderItems);
  await sendEmail(customerEmail, "Your Order Confirmation", emailContent);

  console.log("Order created successfully and confirmation email sent:", orderId);
}

// Helper functions for building email content and sending emails (implementation not shown)
function buildOrderConfirmationEmail(customerEmail, orderId, orderItems) {
  // ... Logic to build email content with order details
}

async function sendEmail(recipientEmail, subject, content) {
  // ... Logic to send email using an email service provider
}
