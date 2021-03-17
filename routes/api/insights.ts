import express from 'express';
import { logger } from '../../helpers/logger';
import { chartController } from '../../services/dataInsightServices/dataInsightService';

const router = express.Router();

router.get('/:startDate/:endDate/:chartType', (req, res) => {
    chartController(req.params.startDate, req.params.endDate, req.params.chartType)
        .then((data) => {
            res.send(JSON.stringify(data));
        }).catch((err) => {
            logger.error(`Failed to get data on genres: ${err.data}`);
            res.status(404).send(`Failed to get data on genres`);
        });
});


export default router;