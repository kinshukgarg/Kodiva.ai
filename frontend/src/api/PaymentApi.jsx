const API_BASE_URL = 'http://localhost:3000/api'; 

// Fetch spending data (used by Dashboard)

export const getSpendingData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/spending`);
      if (!response.ok) {
        throw new Error('Error fetching spending data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching spending data:', error);
      throw error;  // Propagate error to be handled by the component
    }
  };
  

  export const processPayment = async (paymentId, amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId, amount }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Payment failed');
      }
  
      return await response.json();  // Return success message
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;  // Propagate error
    }
  };
  