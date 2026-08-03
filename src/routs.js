import express from 'express';

import { homePage } from "./controllers/index.js";
import {
    organizationsPage,
    organizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { projetspage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm, projectValidation } from "./controllers/projects.js";
import { categoriesPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from "./controllers/categories.js";
import { testErrorPage } from "./controllers/errors.js";

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projetspage);
router.get('/projects/:id', (req, res) => res.redirect(`/project/${req.params.id}`));
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', showEditProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.get('/new-project', showNewProjectForm);
router.get('/categories', categoriesPage);
router.get('/categories/:id', (req, res) => res.redirect(`/category/${req.params.id}`));
router.get('/category/:id', categoryDetailsPage);
router.get('/organizations/:id', (req, res) => res.redirect(`/organization/${req.params.id}`));
router.get('/organization/:id', organizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/test-error', testErrorPage);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);


export default router;

