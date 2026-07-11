-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);


-- ========================================
-- Insert sample data: Service Projects (5 per organization)
-- ========================================
INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Park Bench Restoration', 'Repairing and repainting aging park benches in public recreation spaces.', 'Provo City Park', '2026-08-03'),
(1, 'Community Ramp Build', 'Installing ADA-accessible ramps for homes of residents with mobility challenges.', 'South Provo Neighborhood', '2026-08-17'),
(1, 'Playground Shade Installation', 'Building shade structures over playground equipment to improve summer safety.', 'Riverside Elementary', '2026-09-05'),
(1, 'Bus Stop Shelter Upgrade', 'Replacing worn materials and reinforcing bus stop shelters for durability.', 'University Avenue Corridor', '2026-09-19'),
(1, 'Senior Center Repair Day', 'Completing minor structural and safety repairs for the local senior center.', 'Provo Senior Center', '2026-10-10'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'School Garden Startup', 'Preparing raised beds and planting starter crops for student-led harvests.', 'Lakeview Middle School', '2026-08-07'),
(2, 'Neighborhood Compost Workshop', 'Teaching composting basics and setting up shared compost stations.', 'Franklin Community Lot', '2026-08-22'),
(2, 'Urban Orchard Planting', 'Planting fruit trees and training residents on long-term orchard care.', 'Pioneer Block', '2026-09-12'),
(2, 'Water-Wise Irrigation Build', 'Installing drip irrigation systems to reduce water use in community gardens.', 'Riverwoods Garden Plots', '2026-09-26'),
(2, 'Harvest and Donate Day', 'Collecting produce for donation to local food banks and shelters.', 'Downtown Grow Hub', '2026-10-14'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Sorting Drive', 'Sorting and packaging donated food items for weekly distribution.', 'Utah County Food Bank', '2026-08-10'),
(3, 'Youth Tutoring Marathon', 'Providing one-on-one tutoring sessions in math, reading, and science.', 'Provo Library Annex', '2026-08-24'),
(3, 'Neighborhood Cleanup Day', 'Removing litter, graffiti, and debris from high-traffic residential streets.', 'Joaquin District', '2026-09-09'),
(3, 'Blanket Assembly Event', 'Assembling and distributing care blankets for homeless outreach programs.', 'Hope Resource Center', '2026-09-30'),
(3, 'Holiday Meal Prep Team', 'Preparing and packing complete meal kits for families in need.', 'Maple Community Church Hall', '2026-10-21');

