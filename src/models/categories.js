import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM project_category
        ORDER BY category_id;
    `;
    const result = await db.query(query);
    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM project_category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
}

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT pc.category_id, pc.name
        FROM project_category pc
        JOIN service_project_category spc ON pc.category_id = spc.category_id
        WHERE spc.project_id = $1
        ORDER BY pc.category_id;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date AS date,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o ON sp.organization_id = o.organization_id
        JOIN service_project_category spc ON sp.project_id = spc.project_id
        WHERE spc.category_id = $1
        ORDER BY sp.project_date, sp.project_id;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
}



export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
}