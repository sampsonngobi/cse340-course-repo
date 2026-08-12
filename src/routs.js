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
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole } from "./controllers/users.js";


const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projetspage);
router.get('/projects/:id', (req, res) => res.redirect(`/project/${req.params.id}`));
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/categories', categoriesPage);
router.get('/categories/:id', (req, res) => res.redirect(`/category/${req.params.id}`));
router.get('/category/:id', categoryDetailsPage);
router.get('/organizations/:id', (req, res) => res.redirect(`/organization/${req.params.id}`));
router.get('/organization/:id', organizationDetailsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/test-error', testErrorPage);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireRole('admin'), showDashboard);


export default router;

