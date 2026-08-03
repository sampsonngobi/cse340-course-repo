import { getAllCategories, getCategoryById, getCategoriesByProjectId, getCategoriesByServiceProjectId, getProjectsByCategoryId, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';


const categoriesPage = async (req, res) => {

    const categories = await getAllCategories();
    const title = 'Here are the categories of our projects';
    res.render('categories', { title, categories });
};

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.name;

    res.render('category', { title, category, projects });
};

const categoriesByProjectPage = async (req, res) => {
    const projectId = req.params.projectId;
    const categories = await getCategoriesByProjectId(projectId);
    res.render('categoriesByProject', { categories });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    if (!projectDetails) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};



export { categoriesPage, categoryDetailsPage, categoriesByProjectPage, showAssignCategoriesForm, processAssignCategoriesForm };

