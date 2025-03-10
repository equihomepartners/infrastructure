import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface PropertyData {
  propertyId: string;
  location: {
    suburb: string;
    state: string;
    postcode: string;
  };
  metrics: {
    price: number;
    rentYield: number;
    vacancyRate: number;
    propertyType: string;
  };
  marketData?: {
    medianPrice?: number;
    priceGrowth?: number;
    daysOnMarket?: number;
    localDemand?: number;
  };
}

interface AnalysisResult {
  zoneClassification: 'green' | 'yellow' | 'red';
  confidence: number;
  reasoning: string;
  risks: string[];
  opportunities: string[];
  recommendations: string[];
  marketInsights?: {
    pricePosition: 'above' | 'below' | 'at' | 'unknown';
    growthPotential: number;
    investmentGrade: 'A' | 'B' | 'C' | 'D';
    suburbTrend: 'rising' | 'stable' | 'declining';
  };
}

export type ModelType = 'gpt4' | 'xgboost' | 'randomforest' | 'hybrid';

interface ModelConfig {
  isProduction: boolean;
  confidenceThreshold: number;
  description: string;
}

const MODEL_CONFIGS: Record<ModelType, ModelConfig> = {
  gpt4: {
    isProduction: false,
    confidenceThreshold: 0.7,
    description: 'Testing - GPT-4 for initial analysis'
  },
  xgboost: {
    isProduction: true,
    confidenceThreshold: 0.85,
    description: 'Production - Gradient Boosting for precise predictions'
  },
  randomforest: {
    isProduction: true,
    confidenceThreshold: 0.8,
    description: 'Production - Random Forest for interpretable results'
  },
  hybrid: {
    isProduction: true,
    confidenceThreshold: 0.8,
    description: 'Production - Combined model approach'
  }
};

// Mock production model predictions
async function getXGBoostPrediction(propertyData: PropertyData): Promise<AnalysisResult> {
  // This would be replaced with actual XGBoost model in production
  return {
    zoneClassification: 'green',
    confidence: 0.92,
    reasoning: "Based on historical data patterns and market indicators",
    risks: ["Market volatility risk", "Interest rate sensitivity"],
    opportunities: ["Strong rental demand", "Infrastructure development"],
    recommendations: ["Consider long-term hold", "Monitor market indicators"],
    marketInsights: {
      pricePosition: 'below',
      growthPotential: 0.85,
      investmentGrade: 'A',
      suburbTrend: 'rising'
    }
  };
}

async function getRandomForestPrediction(propertyData: PropertyData): Promise<AnalysisResult> {
  // This would be replaced with actual Random Forest model in production
  return {
    zoneClassification: 'yellow',
    confidence: 0.88,
    reasoning: "Based on feature importance analysis",
    risks: ["Price volatility", "Vacancy risk"],
    opportunities: ["Value-add potential", "Market cycle timing"],
    recommendations: ["Consider value-add strategies", "Review in 3 months"],
    marketInsights: {
      pricePosition: 'at',
      growthPotential: 0.75,
      investmentGrade: 'B',
      suburbTrend: 'stable'
    }
  };
}

export async function analyzeProperty(
  propertyData: PropertyData, 
  modelType: ModelType = 'gpt4'
): Promise<AnalysisResult> {
  try {
    const config = MODEL_CONFIGS[modelType];
    
    switch(modelType) {
      case 'xgboost':
        return await getXGBoostPrediction(propertyData);
      
      case 'randomforest':
        return await getRandomForestPrediction(propertyData);
      
      case 'hybrid':
        // Combine predictions from multiple models
        const [gptResult, xgboostResult, forestResult] = await Promise.all([
          analyzeProperty(propertyData, 'gpt4'),
          getXGBoostPrediction(propertyData),
          getRandomForestPrediction(propertyData)
        ]);

        // Weight the predictions (can be adjusted)
        const weights = { gpt4: 0.2, xgboost: 0.5, forest: 0.3 };
        
        // Combine confidence scores
        const confidence = (
          gptResult.confidence * weights.gpt4 +
          xgboostResult.confidence * weights.xgboost +
          forestResult.confidence * weights.forest
        );

        // Use highest confidence prediction for classification
        const predictions = [
          { model: 'gpt4', result: gptResult },
          { model: 'xgboost', result: xgboostResult },
          { model: 'forest', result: forestResult }
        ];
        
        const mainPrediction = predictions.reduce((prev, curr) => 
          curr.result.confidence > prev.result.confidence ? curr : prev
        );

        return {
          ...mainPrediction.result,
          confidence,
          reasoning: `Combined analysis:\nGPT-4: ${gptResult.reasoning}\nXGBoost: ${xgboostResult.reasoning}\nRandom Forest: ${forestResult.reasoning}`,
          risks: [...new Set([...gptResult.risks, ...xgboostResult.risks, ...forestResult.risks])],
          opportunities: [...new Set([...gptResult.opportunities, ...xgboostResult.opportunities, ...forestResult.opportunities])],
          recommendations: [...new Set([...gptResult.recommendations, ...xgboostResult.recommendations, ...forestResult.recommendations])]
        };
      
      default:
        // Default GPT-4 analysis
        const australianContext = `
          Consider Australian market specifics:
          - Current RBA cash rate and monetary policy
          - State-specific property cycles
          - Local council zoning regulations
          - Australian property investment tax implications
          - State-specific first home buyer schemes
          - Foreign investment restrictions
        `;

        const prompt = `
          ${australianContext}

          Analyze this Australian property for investment potential:
          Location: ${propertyData.location.suburb}, ${propertyData.location.state} ${propertyData.location.postcode}
          Property Type: ${propertyData.metrics.propertyType}
          Price: $${propertyData.metrics.price}
          Rent Yield: ${propertyData.metrics.rentYield}%
          Vacancy Rate: ${propertyData.metrics.vacancyRate}%
          ${propertyData.marketData ? `
          Market Data:
          - Median Price: $${propertyData.marketData.medianPrice}
          - Price Growth: ${propertyData.marketData.priceGrowth}%
          - Days on Market: ${propertyData.marketData.daysOnMarket}
          - Local Demand Index: ${propertyData.marketData.localDemand}
          ` : ''}

          Provide a detailed analysis including:
          1. Zone Classification (green/yellow/red) with confidence score
          2. Reasoning for the classification (consider Australian market context)
          3. Key risks (including market-specific risks)
          4. Investment opportunities (including local market advantages)
          5. Specific recommendations (aligned with Australian investment strategies)

          Format the response as JSON with these exact keys:
          {
            "zoneClassification": "green|yellow|red",
            "confidence": 0-1,
            "reasoning": "string",
            "risks": ["string"],
            "opportunities": ["string"],
            "recommendations": ["string"],
            "marketInsights": {
              "pricePosition": "above|below|at|unknown",
              "growthPotential": 0-1,
              "investmentGrade": "A|B|C|D",
              "suburbTrend": "rising|stable|declining"
            }
          }
        `;

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an Australian real estate investment analysis AI. You specialize in analyzing property data and providing investment recommendations based on our traffic light zoning system, with deep understanding of Australian property markets, regulations, and investment strategies."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) {
          throw new Error('No response from GPT-4');
        }

        const response = JSON.parse(content);
        return response as AnalysisResult;
    }
  } catch (error) {
    console.error('Error analyzing property:', error);
    throw error;
  }
}

export async function analyzeBulkProperties(
  properties: PropertyData[],
  modelType: ModelType = 'hybrid'
): Promise<AnalysisResult[]> {
  const results = await Promise.all(
    properties.map(property => analyzeProperty(property, modelType))
  );
  return results;
} 