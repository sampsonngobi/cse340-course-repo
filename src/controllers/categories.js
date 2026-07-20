import { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId } from '../models/categories.js';


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



export { categoriesPage, categoryDetailsPage, categoriesByProjectPage };

