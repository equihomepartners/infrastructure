import express from 'express';
import { ZoningController } from './controller';

const router = express.Router();
const controller = new ZoningController();

// Zone Classification
router.get('/classify/:suburb', controller.classifyZone);

// Market Analysis
router.get('/market-analysis/:suburb', controller.getMarketAnalysis);

// Zone Metrics
router.get('/metrics/:zone', controller.getZoneMetrics);

// Property Data
router.post('/property', controller.updatePropertyData);

// Real-time Metrics
router.get('/real-time/metrics', controller.getRealTimeMetrics);

// Batch Operations
router.post('/batch/classify', controller.batchClassifyZones);
router.post('/batch/update', controller.batchUpdateProperties);

export default router; 