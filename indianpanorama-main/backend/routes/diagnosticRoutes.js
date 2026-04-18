import express from 'express';
import { sendReservationWhatsApp } from '../utils/whatsappService.js';

const router = express.Router();

/**
 * GET /api/diagnostics/whatsapp
 * Reports whether AiSensy credentials are configured.
 * Does NOT send any message.
 */
router.get('/whatsapp', (req, res) => {
    const apiKey = process.env.AISENSY_API_KEY || '';
    const campaignName = process.env.AISENSY_CAMPAIGN_NAME || '';
    res.json({
        credentials: {
            AISENSY_API_KEY: apiKey ? `SET (${apiKey.length} chars)` : 'MISSING',
            AISENSY_CAMPAIGN_NAME: campaignName ? `SET ("${campaignName}")` : 'MISSING',
        },
        endpoint: 'https://backend.aisensy.com/campaign/t1/api/v2',
        ready: Boolean(apiKey && campaignName),
    });
});

/**
 * POST /api/diagnostics/whatsapp/test
 * Sends a test WhatsApp reservation confirmation using the AiSensy template.
 * Body: { phone: string, name?: string }
 * phone MUST be international format: "+44 7911 123456" or "+91 9876543210"
 *
 * WARNING: This sends a real WhatsApp message via AiSensy and will count
 * against the account's quota. Admin-protected.
 */
router.post('/whatsapp/test', async (req, res) => {
    const { phone, name } = req.body || {};
    if (!phone) {
        return res.status(400).json({ ok: false, error: 'phone is required (international format, e.g. "+44 7911 123456")' });
    }

    // Build a fake reservation object to reuse the production send path
    const mockReservation = {
        phone,
        name: name || 'Test Guest',
        date: new Date(),
        time: '19:00',
        guests: 2,
    };

    try {
        const sent = await sendReservationWhatsApp(mockReservation);
        return res.json({
            ok: sent,
            sent,
            message: sent
                ? 'AiSensy accepted the message. Check the recipient WhatsApp for delivery.'
                : 'AiSensy rejected the message. Check server logs for the API response body.',
        });
    } catch (err) {
        return res.status(500).json({ ok: false, error: err.message || 'Unknown error' });
    }
});

export default router;
