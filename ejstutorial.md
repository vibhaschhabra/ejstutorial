# Complete EJS Tutorial with Practical Project

## What is EJS?

EJS (Embedded JavaScript) is a templating engine for Node.js that allows you to generate HTML dynamically by embedding JavaScript code within your HTML templates. It's simple, fast, and perfect for server-side rendering.

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Node.js installed on your system
- Basic understanding of npm

## Setting Up Your Environment

First, let's create a new project and install the necessary dependencies:

```bash
mkdir ejs-blog-tutorial
cd ejs-blog-tutorial
npm init -y
npm install express ejs
```

## EJS Syntax Basics

EJS uses several tag types for different purposes:

### Core Tags

- `<% %>` - Control flow (if, for, etc.) - no output
- `<%= %>` - Output escaped value (safe for HTML)
- `<%- %>` - Output unescaped value (raw HTML)
- `<%# %>` - Comments (not rendered)
- `<%- include('partial') %>` - Include other EJS files

### Examples

```ejs
<!-- Variables and expressions -->
<h1><%= title %></h1>
<p>Welcome, <%= user.name %>!</p>

<!-- Control flow -->
<% if (user.isLoggedIn) { %>
    <p>Hello, logged in user!</p>
<% } else { %>
    <p>Please log in</p>
<% } %>

<!-- Loops -->
<ul>
<% posts.forEach(function(post) { %>
    <li><%= post.title %></li>
<% }); %>
</ul>

<!-- Comments -->
<%# This is a comment and won't be rendered %>
```

## Project: Simple Blog Application

Let's build a simple blog application to demonstrate EJS features.

### Project Structure

```
ejs-blog-tutorial/
├── app.js
├── package.json
├── views/
│   ├── layouts/
│   │   └── layout.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── navigation.ejs
│   ├── index.ejs
│   ├── about.ejs
│   └── post.ejs
└── public/
    └── style.css
```

### Step 1: Create the Main Server File (app.js)

```javascript
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
```

### Step 2: Create the Layout Template (views/layouts/layout.ejs)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> - <%= siteInfo.title %></title>
    <meta name="description" content="<%= siteInfo.description %>">
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <%- include('../partials/header') %>
    <%- include('../partials/navigation') %>
    
    <main class="container">
        <%- body %>
    </main>
    
    <%- include('../partials/footer') %>
</body>
</html>
```

### Step 3: Create Partials

**views/partials/header.ejs:**
```html
<header class="site-header">
    <div class="container">
        <h1><%= siteInfo.title %></h1>
        <p><%= siteInfo.description %></p>
    </div>
</header>
```

**views/partials/navigation.ejs:**
```html
<nav class="main-nav">
    <div class="container">
        <ul>
            <li>
                <a href="/" class="<%= currentPage === 'home' ? 'active' : '' %>">Home</a>
            </li>
            <li>
                <a href="/about" class="<%= currentPage === 'about' ? 'active' : '' %>">About</a>
            </li>
        </ul>
    </div>
</nav>
```

**views/partials/footer.ejs:**
```html
<footer class="site-footer">
    <div class="container">
        <p>&copy; <%= new Date().getFullYear() %> <%= siteInfo.title %>. Built with EJS and Express.</p>
        <p>Created by <%= siteInfo.author %></p>
    </div>
</footer>
```

### Step 4: Create Page Templates

**views/index.ejs:**
```html
<%- include('layouts/layout', { body: ` %>
    <div class="hero">
        <h2>Welcome to Our Blog</h2>
        <p>Discover amazing articles and tutorials</p>
    </div>

    <section class="posts-grid">
        <h2>Latest Posts</h2>
        
        <% if (posts && posts.length > 0) { %>
            <div class="posts-container">
                <% posts.forEach(function(post) { %>
                    <article class="post-card">
                        <h3><a href="/post/<%= post.id %>"><%= post.title %></a></h3>
                        <div class="post-meta">
                            <span class="author">By <%= post.author %></span>
                            <span class="date"><%= new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            }) %></span>
                        </div>
                        <p class="excerpt"><%= post.excerpt %></p>
                        <a href="/post/<%= post.id %>" class="read-more">Read More →</a>
                    </article>
                <% }); %>
            </div>
        <% } else { %>
            <p>No posts available yet.</p>
        <% } %>
    </section>
` }) %>
```

**views/about.ejs:**
```html
<%- include('layouts/layout', { body: ` %>
    <div class="page-header">
        <h2>About Us</h2>
    </div>

    <div class="content">
        <div class="about-section">
            <h3>Our Mission</h3>
            <p>We're passionate about sharing knowledge and helping developers learn new technologies. This blog demonstrates how to use EJS templating engine with Express.js to create dynamic web applications.</p>
        </div>

        <div class="about-section">
            <h3>What You'll Learn</h3>
            <ul>
                <li>EJS templating syntax and best practices</li>
                <li>Creating reusable layouts and partials</li>
                <li>Passing data from Express routes to templates</li>
                <li>Building dynamic, data-driven web pages</li>
            </ul>
        </div>

        <div class="about-section">
            <h3>Technologies Used</h3>
            <div class="tech-stack">
                <span class="tech-item">Node.js</span>
                <span class="tech-item">Express.js</span>
                <span class="tech-item">EJS</span>
                <span class="tech-item">HTML5</span>
                <span class="tech-item">CSS3</span>
            </div>
        </div>

        <div class="contact-info">
            <h3>Get In Touch</h3>
            <p>Questions about EJS or web development? Feel free to reach out!</p>
            <p><strong>Email:</strong> contact@example.com</p>
        </div>
    </div>
` }) %>
```

**views/post.ejs:**
```html
<%- include('layouts/layout', { body: ` %>
    <article class="single-post">
        <header class="post-header">
            <h2><%= post.title %></h2>
            <div class="post-meta">
                <span class="author">By <%= post.author %></span>
                <span class="date"><%= new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }) %></span>
            </div>
        </header>

        <div class="post-content">
            <p><%= post.content %></p>
            
            <%# You can add more complex content processing here %>
            <% if (post.content.length > 200) { %>
                <p><em>This is a longer article with more detailed content...</em></p>
            <% } %>
        </div>

        <footer class="post-footer">
            <p>
                <a href="/">&larr; Back to all posts</a>
            </p>
            
            <div class="post-navigation">
                <% const currentIndex = posts.findIndex(p => p.id === post.id); %>
                <% if (currentIndex > 0) { %>
                    <a href="/post/<%= posts[currentIndex - 1].id %>" class="prev-post">
                        &larr; Previous: <%= posts[currentIndex - 1].title %>
                    </a>
                <% } %>
                
                <% if (currentIndex < posts.length - 1) { %>
                    <a href="/post/<%= posts[currentIndex + 1].id %>" class="next-post">
                        Next: <%= posts[currentIndex + 1].title %> &rarr;
                    </a>
                <% } %>
            </div>
        </footer>
    </article>
` }) %>
```

### Step 5: Add Styling (public/style.css)

```css
/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.site-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

.site-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

/* Navigation */
.main-nav {
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.main-nav ul {
    list-style: none;
    display: flex;
    padding: 1rem 0;
}

.main-nav li {
    margin-right: 2rem;
}

.main-nav a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.main-nav a:hover,
.main-nav a.active {
    background: #667eea;
    color: white;
}

/* Main content */
main {
    min-height: calc(100vh - 200px);
    padding: 2rem 0;
}

/* Hero section */
.hero {
    text-align: center;
    padding: 3rem 0;
    background: white;
    border-radius: 10px;
    margin-bottom: 3rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.hero h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    color: #666;
}

/* Posts grid */
.posts-grid h2 {
    margin-bottom: 2rem;
    color: #333;
}

.posts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.post-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.post-card h3 {
    margin-bottom: 1rem;
}

.post-card h3 a {
    color: #333;
    text-decoration: none;
}

.post-card h3 a:hover {
    color: #667eea;
}

.post-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
}

.excerpt {
    margin-bottom: 1.5rem;
    color: #555;
    line-height: 1.7;
}

.read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
}

.read-more:hover {
    text-decoration: underline;
}

/* Single post */
.single-post {
    background: white;
    padding: 3rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.post-header {
    border-bottom: 3px solid #f0f0f0;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
}

.post-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.post-content {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 3rem;
}

.post-content p {
    margin-bottom: 1.5rem;
}

.post-footer {
    border-top: 3px solid #f0f0f0;
    padding-top: 2rem;
}

.post-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.post-navigation a {
    color: #667eea;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 2px solid #667eea;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.post-navigation a:hover {
    background: #667eea;
    color: white;
}

/* About page */
.page-header {
    text-align: center;
    margin-bottom: 3rem;
}

.page-header h2 {
    font-size: 2.5rem;
    color: #333;
}

.content {
    background: white;
    padding: 3rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.about-section {
    margin-bottom: 3rem;
}

.about-section h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.about-section p,
.about-section li {
    line-height: 1.7;
    color: #555;
}

.about-section ul {
    padding-left: 2rem;
}

.about-section li {
    margin-bottom: 0.5rem;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.tech-item {
    background: #667eea;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.contact-info {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    border-left: 4px solid #667eea;
}

/* Footer */
.site-footer {
    background: #333;
    color: white;
    padding: 2rem 0;
    text-align: center;
    margin-top: 3rem;
}

.site-footer p {
    margin-bottom: 0.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
    
    .site-header h1 {
        font-size: 2rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .posts-container {
        grid-template-columns: 1fr;
    }
    
    .main-nav ul {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .main-nav li {
        margin-right: 0;
    }
    
    .post-navigation {
        flex-direction: column;
    }
    
    .single-post,
    .content {
        padding: 2rem;
    }
}
```

## Running the Application

1. Make sure all files are created in the correct structure
2. Run the application:
   ```bash
   node app.js
   ```
3. Open your browser and navigate to `http://localhost:3000`

## Key EJS Concepts Demonstrated

### 1. **Layouts and Partials**
- `layout.ejs` provides a consistent structure
- Partials like `header.ejs`, `navigation.ejs`, and `footer.ejs` promote reusability
- The `<%- body %>` syntax includes dynamic content

### 2. **Data Passing**
- Routes pass data objects to templates
- Templates access data using `<%= variable %>`
- Complex objects are navigated with dot notation (`post.title`)

### 3. **Control Flow**
- Conditional rendering with `<% if %>`
- Loops with `<% forEach %>`
- Dynamic class assignment for active navigation

### 4. **Built-in Functions**
- Date formatting with JavaScript's `Date` object
- Array methods like `findIndex()` for navigation
- String manipulation and conditional logic

## Best Practices

### 1. **Organization**
```
views/
├── layouts/          # Main page layouts
├── partials/         # Reusable components
├── pages/           # Individual page templates
└── components/      # Specific UI components
```

### 2. **Data Security**
- Use `<%= %>` for user data (escaped)
- Use `<%- %>` only for trusted HTML content
- Always validate data before passing to templates

### 3. **Performance**
- Keep templates simple and logic minimal
- Use partials to avoid repetition
- Consider caching for production applications

### 4. **Error Handling**
```javascript
// Check if data exists before using
<% if (posts && posts.length > 0) { %>
    <!-- Render posts -->
<% } else { %>
    <p>No posts available</p>
<% } %>
```

## Next Steps

1. **Add a Database**: Replace the in-memory data with MongoDB or PostgreSQL
2. **User Authentication**: Add login/logout functionality
3. **Form Handling**: Create forms for adding new posts
4. **File Uploads**: Add image upload capability
5. **API Integration**: Connect to external APIs for dynamic content
6. **Caching**: Implement template caching for better performance
7. **Testing**: Add unit and integration tests
8. **Deployment**: Deploy to platforms like Heroku, Vercel, or DigitalOcean

## Troubleshooting

### Common Issues:

1. **"Cannot GET /" error**: Make sure Express is properly configured and routes are defined
2. **Template not found**: Check file paths and ensure the `views` directory structure is correct
3. **Variable undefined**: Always check if variables exist before using them in templates
4. **Syntax errors**: Make sure EJS tags are properly closed and nested

This tutorial provides a solid foundation for working with EJS. The blog application demonstrates real-world usage patterns and can be extended with additional features as you become more comfortable with the templating engine.