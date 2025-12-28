const https = require('https');
const http = require('http');

async function main() {
  try {
    console.log("Testing API call to update hero slide...");
    
    // Data to send
    const data = JSON.stringify({
      title: "Test Title",
      description: "Test Description",
      cta_label: "Test CTA",
      cta_href: "/test",
      image_url: "/test/image.jpg",
      category: "Test Category",
      position: 1,
      is_active: true
    });
    
    const options = {
      hostname: 'localhost',
      port: 3006,
      path: '/api/admin/hero-slides/1',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('Response:', responseData);
      });
    });
    
    req.on('error', (error) => {
      console.error('Error:', error);
    });
    
    req.write(data);
    req.end();
    
  } catch (error) {
    console.error("❌ Error testing API call:", error);
  }
}

main();