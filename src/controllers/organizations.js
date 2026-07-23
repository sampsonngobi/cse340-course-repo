import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
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

const showNewOrganizationForm = (req, res) => {
        const title = 'Add New Organization';
        res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
        console.log('[HANDLER] processNewOrganizationForm called');
        console.log('[HANDLER] req.body:', req.body);
        
        const { name, description, contactEmail } = req.body;
        const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

        const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
        res.redirect(`/organization/${organizationId}`);
};

export { organizationsPage, organizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };