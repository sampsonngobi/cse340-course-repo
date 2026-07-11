import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date, sp.project_id;
    `;

    const result = await db.query(query);
    return result.rows;
};



// const getAllProjects = async () => {
//     const query = `
//         SELECT
//         project_id, title, description, location, project_date
//       FROM service_project;
//     `;

//     const result = await db.query(query);

//     return result.rows;
// }

export { getAllProjects }