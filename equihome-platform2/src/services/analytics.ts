import type { AnalyticsEvent } from '../types';

const ANALYTICS_ENDPOINT = '/.netlify/functions/track-demo-access';

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    const response = await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    });

    if (!response.ok) {
      throw new Error('Failed to track event');
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
}