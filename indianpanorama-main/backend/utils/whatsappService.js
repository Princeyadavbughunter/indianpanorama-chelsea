

/**
 * Normalizes a phone number for AiSensy (WhatsApp) API.
 * Ensures the number has a country code. If it starts with '0', it assumes a UK number (+44).
 * Strips all non-digit characters.
 */
function normalizePhoneNumber(phone) {
    if (!phone) return '';
    let cleaned = phone.replace(/\D/g, ''); // Remove non-digits
    
    // If it starts with 0 (e.g., 07123...), assume UK and replace 0 with 44
    if (cleaned.startsWith('0')) {
        cleaned = '44' + cleaned.substring(1);
    }
    
    // If the user entered a local number without 0 and without country code (unlikely but possible), 
    // it's safer to just return the cleaned digits.
    return cleaned;
}

/**
 * Sends a WhatsApp order confirmation using the AiSensy API.
 * @param {Object} reservation - The reservation object from mongoose
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const sendReservationWhatsApp = async (reservation) => {
    try {
        const apiKey = process.env.AISENSY_API_KEY;
        const campaignName = process.env.AISENSY_CAMPAIGN_NAME;

        if (!apiKey || !campaignName) {
            console.warn('AiSensy API Key or Campaign Name is missing in .env. Skipping WhatsApp message.');
            return false;
        }

        const destinationNumber = normalizePhoneNumber(reservation.phone);
        if (!destinationNumber) {
            console.error('Invalid phone number provided for WhatsApp notification. Skipping.');
            return false;
        }

        // Format Date and Time for the message
        const rDate = new Date(reservation.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const rTime = reservation.time; // already a string like "19:00"

        // The URL for the standard AiSensy Campaign API for V2
        const url = 'https://backend.aisensy.com/campaign/t1/api/v2';

        // Prepare exactly what AiSensy expects
        // The parameters must exactly match the {{1}}, {{2}}, {{3}} in the approved WhatsApp template.
        // User's template expects: {{1}} = Date, {{2}} = Time, {{3}} = Guests
        const payload = {
            apiKey: apiKey,
            campaignName: campaignName,
            destination: destinationNumber,
            userName: reservation.name,
            templateParams: [
                rDate,
                rTime,
                String(reservation.guests)
            ]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`AiSensy WhatsApp sent successfully to ${destinationNumber}`);
            return true;
        } else {
            console.error(`AiSensy WhatsApp failed for ${destinationNumber}:`, data);
            return false;
        }
    } catch (err) {
        console.error('Critical Error in sendReservationWhatsApp:', err);
        return false;
    }
};
