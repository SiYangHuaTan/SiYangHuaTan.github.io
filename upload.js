const formData = {
    title: document.getElementById('title').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value,
    projectLink: document.getElementById('projectLink').value,
    tags: Array.from(document.querySelectorAll('.tag-item')).map(tag => tag.textContent),
    files: {
        images: [],
        videos: [],
        documents: []
    }
}; 