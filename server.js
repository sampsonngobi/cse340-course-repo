import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { testConnection } from './src/models/db.js';

import router from './src/controllers/routs.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global error handlers for unhandled rejections and exceptions
process.on('unhandledRejection', (reason, promise) => {
    console.error('[UNHANDLED REJECTION]', reason);
    console.error('[PROMISE]', promise);
});

process.on('uncaughtException', (error) => {
    console.error('[UNCAUGHT EXCEPTION]', error);
    process.exit(1);
});

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

/**
  * Configure Express middleware
  */

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Track all requests at the earliest point
app.use((req, res, next) => {
    console.log('[EARLY] Received:', req.method, req.url, 'Content-Type:', req.get('content-type'));
    res.on('finish', () => {
        console.log('[EARLY] Finished:', req.method, req.url, res.statusCode);
    });
    res.on('close', () => {
        console.log('[EARLY] Closed:', req.method, req.url);
    });
    next();
});

// Allow Express to receive and process common POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Debug middleware - log immediately after parsing
app.use((req, res, next) => {
    console.log(`[PARSER] Method: ${req.method}, URL: ${req.url}, Content-Type: ${req.get('content-type')}`);
    if (req.method === 'POST') {
        console.log('[PARSER] POST body:', req.body);
    }
    next();
});

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`[REQUEST] ${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});


// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

/**
 * Route
 */

// Test route to verify POST requests work
app.post('/test-post', (req, res) => {
    console.log('[TEST ROUTE] POST /test-post received');
    console.log('[TEST ROUTE] Body:', req.body);
    res.json({ message: 'Test POST received', body: req.body });
});

app.use(router);


// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});


// Global error handler
app.use((err, req, res, next) => {
    console.log('[ERROR HANDLER] Caught error');
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    console.log('[ERROR HANDLER] Status:', status, 'Template:', template);

    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    // Render the appropriate error template
    try {
        console.log('[ERROR HANDLER] Rendering template:', `errors/${template}`);
        res.status(status).render(`errors/${template}`, context, (renderErr) => {
            if (renderErr) {
                console.error('[ERROR HANDLER] Render error:', renderErr);
                res.status(status).send(`<h1>${context.title}</h1><p>${context.error}</p>`);
            }
        });
    } catch (renderErr) {
        console.error('[ERROR HANDLER] Exception during render:', renderErr);
        res.status(status).send(`<h1>${context.title}</h1><p>${context.error}</p>`);
    }
});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});