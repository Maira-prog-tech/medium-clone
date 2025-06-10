
function generateArticleId(title) {
    return title
        .toLowerCase()
        .replace(/[^а-яё\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
}


const posts = [
    {
        title: "Искусственный интеллект в 2025 году: прорывы и вызовы",
        author: "Алексей Иванов",
        date: "19 мая 2025",
        readTime: "7 мин чтения",
        preview: "Последние достижения в области ИИ изменили способ нашего взаимодействия с технологиями. От персональных ассистентов до автономных автомобилей - как ИИ трансформирует нашу повседневную жизнь...",
        category: "Технологии",
        likes: 1240
    },
    {
        title: "Как начать свой бизнес в эпоху цифровой экономики",
        author: "Мария Петрова",
        date: "18 мая 2025",
        readTime: "10 мин чтения",
        preview: "Пошаговое руководство для начинающих предпринимателей: от идеи до первой прибыли. Реальные истории успеха и практические советы от экспертов...",
        category: "Бизнес",
        likes: 892
    },
    {
        title: "Современное искусство: за пределами традиционных галерей",
        author: "Софья Волкова",
        date: "17 мая 2025",
        readTime: "5 мин чтения",
        preview: "Как цифровые технологии и NFT меняют мир искусства. Интервью с художниками и коллекционерами о будущем творческой индустрии...",
        category: "Искусство",
        likes: 567
    },
    {
        title: "Психология успеха: как преодолеть синдром самозванца",
        author: "Дмитрий Соколов",
        date: "16 мая 2025",
        readTime: "8 мин чтения",
        preview: "Практические методы борьбы с внутренними сомнениями и страхами. Советы от ведущих психологов и истории людей, успешно преодолевших синдром самозванца...",
        category: "Психология",
        likes: 1893
    },
    {
        title: "Путешествия будущего: как изменится туризм к 2030 году",
        author: "Анна Морозова",
        date: "15 мая 2025",
        readTime: "6 мин чтения",
        preview: "Виртуальные туры, космический туризм и экологичные путешествия - что ждёт индустрию в ближайшие годы? Эксклюзивные прогнозы экспертов...",
        category: "Путешествия",
        likes: 721
    }
];

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post';
    const articleId = generateArticleId(post.title);
    article.innerHTML = `
        <div class="post-category">${post.category}</div>
        <h3><a href="article.html?id=${articleId}" class="post-title-link">${post.title}</a></h3>
        <div class="post-meta">
            <div class="author-info">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random" class="author-avatar" alt="${post.author}">
                <span class="author">${post.author}</span>
            </div>
            <div class="post-details">
                <span class="date">${post.date}</span>
                <span class="read-time">${post.readTime}</span>
            </div>
        </div>
        <p class="preview">${post.preview}</p>
        <div class="post-actions">
            <button class="like-button" data-likes="${post.likes}">
                <span class="like-icon">♥</span>
                <span class="like-count">${post.likes}</span>
            </button>
            <button class="save-button">Сохранить</button>
            <button class="share-button">Поделиться</button>
        </div>
    `;


    const likeButton = article.querySelector('.like-button');
    likeButton.addEventListener('click', () => {
        const currentLikes = parseInt(likeButton.dataset.likes);
        likeButton.dataset.likes = currentLikes + 1;
        likeButton.querySelector('.like-count').textContent = currentLikes + 1;
        likeButton.classList.add('liked');
    });

    article.querySelector('.save-button').addEventListener('click', () => {
        alert('Статья сохранена!');
    });

    article.querySelector('.share-button').addEventListener('click', () => {
        alert('Поделитесь этой статьей: ' + window.location.href);
    });

    return article;
}


function displayPosts(filteredPosts = posts) {
    const featuredPosts = document.querySelector('.featured-posts');
    featuredPosts.innerHTML = '';
    
    if (filteredPosts.length === 0) {
        featuredPosts.innerHTML = '<div class="no-posts">Статьи не найдены</div>';
        return;
    }

    filteredPosts.forEach(post => {
        featuredPosts.appendChild(createPostElement(post));
    });
}


function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.preview.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm)
        );
        displayPosts(filteredPosts);
    });
}


function setupCategories() {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filter posts
            const category = link.textContent;
            const filteredPosts = category === 'Все статьи' 
                ? posts
                : posts.filter(post => post.category === category);
            
            displayPosts(filteredPosts);
        });
    });
}


const style = document.createElement('style');
style.textContent = `
    .post-title-link {
        color: #292929;
        text-decoration: none;
    }

    .post-title-link:hover {
        color: #1a8917;
    }

    .post {
        padding: 2rem 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .post h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }
    
    .post-meta {
        color: #757575;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .post-category {
        color: #1a8917;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .author-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .author-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .post-details {
        color: #757575;
        font-size: 0.9rem;
    }

    .post-details span:not(:last-child)::after {
        content: "·";
        margin: 0 0.5rem;
    }

    .preview {
        color: #292929;
        margin: 1rem 0;
    }

    .post-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .like-button, .save-button, .share-button {
        background: none;
        border: 1px solid #e0e0e0;
        padding: 0.5rem 1rem;
        border-radius: 99px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s;
    }

    .like-button:hover, .save-button:hover, .share-button:hover {
        background: #f9f9f9;
    }

    .like-button.liked {
        color: #e91e63;
        border-color: #e91e63;
    }

    .like-icon {
        font-size: 1.2rem;
    }

`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    displayPosts();
    setupSearch();
    setupCategories();
});


const noPostsStyle = document.createElement('style');
noPostsStyle.textContent = `
    .no-posts {
        text-align: center;
        padding: 2rem;
        color: #757575;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(noPostsStyle);
