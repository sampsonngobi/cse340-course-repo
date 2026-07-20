import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const organizationsPage = async (req, res) => {

        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';

        res.render('organizations', { title, organizations });

};

const organizationDetailsPage = async (req, res) => {
        const organizationId = req.params.id;
        const organizationDetails = await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
                return res.status(404).render('errors/404', { title: 'Page Not Found' });
        }

        const projects = await getProjectsByOrganizationId(organizationId);
        const title = organizationDetails.name;

        res.render('organization', { title, organizationDetails, projects });
};





export { organizationsPage, organizationDetailsPage };