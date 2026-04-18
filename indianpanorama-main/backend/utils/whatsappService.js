

/**
 * Normalizes a phone number for AiSensy (WhatsApp) API.
 * Expects the frontend to send an international number (e.g. "+44 7911 123456",
 * "+91 98765 43210"), but also handles legacy UK-only formats for safety.
 *
 * Output: digits only, with country code and NO leading '+' or '00'.
 * Examples:
 *   +44 7911 123456   → 447911123456
 *   +91 98765 43210   → 919876543210
 *   0044 7911 123456  → 447911123456
 *   07911 123456      → 447911123456   (legacy UK-only fallback)
 *   7911123456        → 447911123456   (legacy UK-only fallback)
 */
function normalizePhoneNumber(phone) {
    if (!phone) return '';

    const hadPlus = String(phone).trim().startsWith('+');

    // Strip everything except digits
    let cleaned = String(phone).replace(/\D/g, '');

    // Handle international prefix "00" → drop (equivalent to '+')
    if (cleaned.startsWith('00')) {
        cleaned = cleaned.substring(2);
    }

    // If the number arrived with an explicit '+' prefix, trust the country code
    // as given — just return the digits. This is the normal modern path.
    if (hadPlus) {
        return logNormalized(phone, cleaned);
    }

    // ---- Legacy UK-only fallbacks (for reservations created before the country-code selector) ----

    // "07..." local UK format → replace leading 0 with 44
    if (cleaned.startsWith('0')) {
        cleaned = '44' + cleaned.substring(1);
        return logNormalized(phone, cleaned);
    }

    // "440..." (stripped "+44 07...") → remove the stray 0
    if (cleaned.startsWith('440')) {
        cleaned = '44' + cleaned.substring(3);
        return logNormalized(phone, cleaned);
    }

    // Bare 10-digit UK mobile without any prefix, e.g. "7911123456"
    if (cleaned.length === 10 && cleaned.startsWith('7')) {
        cleaned = '44' + cleaned;
    }

    return logNormalized(phone, cleaned);
}

function logNormalized(input, output) {
    console.log(`[normalizePhoneNumber] "${input}" → "${output}"`);
    return output;
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
        const rDate = new Date(reservation.date).toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', year: 'numeric' });
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

        console.log('--- AISENSY REQUEST PAYLOAD ---');
        console.log(JSON.stringify({...payload, apiKey: 'HIDDEN'}, null, 2));

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('--- AISENSY RESPONSE BODY ---');
        console.log(JSON.stringify(data, null, 2));

        if (response.ok && data.success === "true") {
            console.log(`AiSensy WhatsApp sent successfully to ${destinationNumber}. Message ID: ${data.submitted_message_id}`);
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
