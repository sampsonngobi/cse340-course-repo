import { getAllCategories } from '../models/categories.js';


const categoriesPage = async (req, res) => {
   
    const categories = await getAllCategories();
    const title = 'Here are the categories of our projects';
    res.render('categories', { title, categories });
};

export { categoriesPage };
