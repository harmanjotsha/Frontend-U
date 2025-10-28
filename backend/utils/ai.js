/**
 * AI Adapter for emotion/sentiment detection.
 * Behavior:
 * - If HUGGINGFACE_API_KEY is present in env, will attempt to call Hugging Face Inference API.
 * - Otherwise, falls back to the simple `sentiment` npm package for basic sentiment analysis.
 *
 * Returns: { emotionType: string, confidence: number, aiResponse: object }
 */
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const mapScoreToEmotion = (score) => {
  if (score > 3) return 'happy';
  if (score > 0) return 'motivated';
  if (score === 0) return 'neutral';
  if (score > -3) return 'sad';
  return 'anxious';
};

async function analyzeText(text) {
  if (!text) return { emotionType: 'neutral', confidence: 0.5, aiResponse: {} };

  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (hfKey) {
    try {
      // Use global fetch (Node 18+) instead of node-fetch
      const res = await fetch('https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base', {
        method: 'POST',
        headers: { Authorization: `Bearer ${hfKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: text })
      });
      const json = await res.json();
      if (Array.isArray(json) && json[0]?.label) {
        const label = json[0].label.toLowerCase();
        const score = json[0].score || 0.6;
        // normalize label to our set
        let mapped = 'neutral';
        if (label.includes('joy') || label.includes('happy')) mapped = 'happy';
        else if (label.includes('sadness') || label.includes('sad')) mapped = 'sad';
        else if (label.includes('anger') || label.includes('angry')) mapped = 'anxious';
        else if (label.includes('fear')) mapped = 'anxious';
        else if (label.includes('surprise') || label.includes('neutral')) mapped = 'neutral';
        else if (label.includes('love') || label.includes('trust')) mapped = 'motivated';

        return { emotionType: mapped, confidence: score, aiResponse: json };
      }
    } catch (err) {
      console.error('HuggingFace call failed, falling back to local analyzer', err.message);
    }
  }

  // Fallback local sentiment
  const result = sentiment.analyze(text);
  const emotion = mapScoreToEmotion(result.score);
  const confidence = Math.min(0.95, Math.abs(result.score) / 10 + 0.5);
  return { emotionType: emotion, confidence, aiResponse: result };
}

module.exports = { analyzeText };
