import express from 'express';

import { homePage } from "./index.js";
import { organizationsPage, organizationDetailsPage } from "./organizations.js";
import { projetspage } from "./projects.js";
import { categoriesPage } from "./categories.js";  
import { testErrorPage } from "./errors.js";


const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projetspage);
router.get('/categories', categoriesPage);
router.get('/organizations/:id', organizationDetailsPage);

// error handling middlewares
router.get('/test-error', testErrorPage);

export default router;


