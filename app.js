const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Sample data (in a real app, this would come from a database)
const posts = [
    {
        id: 1,
        title: "Getting Started with EJS",
        content: "EJS is a simple templating language that lets you generate HTML markup with plain JavaScript...",
        author: "John Doe",
        date: "2024-01-15",
        excerpt: "Learn the basics of EJS templating engine"
    },
    {
        id: 2,
        title: "Advanced EJS Techniques",
        content: "Once you master the basics, you can explore more advanced features like custom filters and helpers...",
        author: "Jane Smith",
        date: "2024-01-20",
        excerpt: "Explore advanced EJS features and best practices"
    },
    {
        id: 3,
        title: "Building Dynamic Websites",
        content: "Dynamic websites respond to user input and display different content based on various conditions...",
        author: "Mike Johnson",
        date: "2024-01-25",
        excerpt: "Create interactive and dynamic web experiences"
    }
];

const siteInfo = {
    title: "My EJS Blog",
    description: "A simple blog built with Express and EJS",
    author: "Your Name"
};

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        posts: posts,
        siteInfo: siteInfo,
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        siteInfo: siteInfo,
        currentPage: 'about'
    });
});

app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return res.status(404).send('Post not found');
    }
    
    res.render('post', {
        title: post.title,
        post: post,
        siteInfo: siteInfo,
        currentPage: 'post'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});