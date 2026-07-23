import express from 'express';

import { homePage } from "./index.js";
import { organizationsPage, organizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm } from "./organizations.js";
import { projetspage, showProjectDetailsPage } from "./projects.js";
import { categoriesPage, categoryDetailsPage } from "./categories.js";
import { testErrorPage } from "./errors.js";

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projetspage);
router.get('/projects/:id', (req, res) => res.redirect(`/project/${req.params.id}`));
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', categoriesPage);
router.get('/categories/:id', (req, res) => res.redirect(`/category/${req.params.id}`));
router.get('/category/:id', categoryDetailsPage);
router.get('/organizations/:id', (req, res) => res.redirect(`/organization/${req.params.id}`));
router.get('/organization/:id', organizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);
router.get('/test-error', testErrorPage);

export default router;

