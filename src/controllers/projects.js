import { body, validationResult } from 'express-validator';

import {
    createProject,
    getUpcomingProjects,
    getProjectDetails,
    updateProject,
    addVolunteerToProject,
    removeVolunteerFromProject,
    isUserVolunteeringForProject
} from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const numberOfUpcomingProjects = 5;

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 999 })
        .withMessage('Project description cannot exceed 999 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 199 })
        .withMessage('Project location cannot exceed 199 characters'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isDate()
        .withMessage('Please provide a valid project date'),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Please select a valid organization')
];

const projetspage = async (req, res) => {

    const projects = await getUpcomingProjects(numberOfUpcomingProjects);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);

    if (!projectDetails) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const categories = await getCategoriesByProjectId(projectId);
    let isVolunteering = false;

    if (req.session?.user) {
        isVolunteering = await isUserVolunteeringForProject(req.session.user.user_id, projectId);
    }

    const title = projectDetails.title;
    res.render('project', { title, project: projectDetails, categories, isVolunteering });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    const { title, description, location, date, organizationId } = req.body;
    await createProject(title, description, location, date, organizationId);

    req.flash('success', 'New service project created successfully!');
    res.redirect('/projects');
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const organizations = await getAllOrganizations();
    const title = 'Edit Service Project';

    res.render('edit-project', { title, project, organizations });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-project/${projectId}`);
    }

    const { title, description, location, date, organizationId } = req.body;
    await updateProject(projectId, title, description, location, date, organizationId);

    req.flash('success', 'Service project updated successfully!');
    res.redirect(`/project/${projectId}`);
};

const volunteerForProject = async (req, res) => {
    const projectId = req.params.id;

    await addVolunteerToProject(req.session.user.user_id, projectId);
    req.flash('success', 'You are now volunteering for this project.');
    res.redirect(`/project/${projectId}`);
};

const removeVolunteerFromProjectSignup = async (req, res) => {
    const projectId = req.params.id;

    await removeVolunteerFromProject(req.session.user.user_id, projectId);
    req.flash('success', 'You are no longer volunteering for this project.');

    if (req.query.redirect === 'dashboard') {
        return res.redirect('/dashboard');
    }

    res.redirect(`/project/${projectId}`);
};

export {
    projetspage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    volunteerForProject,
    removeVolunteerFromProjectSignup,
    projectValidation
};