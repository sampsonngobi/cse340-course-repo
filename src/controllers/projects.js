import { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId } from '../models/projects.js';

const numberOfUpcomingProjects = 5;
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

    const title = projectDetails.title;
    res.render('project', { title, project: projectDetails });
};

export { projetspage, showProjectDetailsPage };