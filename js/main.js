document.addEventListener('DOMContentLoaded', function() {
    // 清理不兼容的旧数据（可选，如果遇到问题可以取消注释）
    // cleanupOldData();
    
    // 初始化项目卡片
    initProjectCards();
    
    // 初始化博客文章
    initBlogPosts();
    
    // 初始化分类筛选
    initCategoryFilter();
    
    // 初始化模态框
    initModal();
    
    // 初始化滚动动画
    initScrollAnimation();
});

// 清理不兼容的旧数据
function cleanupOldData() {
    try {
        let userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        if (userProjects.length > 0) {
            console.log('找到', userProjects.length, '个旧项目，清理中...');
            localStorage.removeItem('userProjects');
            console.log('旧数据已清理');
        }
    } catch (e) {
        console.error('清理旧数据出错:', e);
    }
}

// 初始化项目卡片
function initProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // 获取用户上传的项目
    const userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    
    // 合并预定义项目和用户上传的项目
    const allProjects = [...projects, ...userProjects];
    
    if (!allProjects || allProjects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-projects">暂无项目，请点击"上传作品"添加您的第一个项目。</p>';
        return;
    }
    
    // 清空现有内容
    projectsGrid.innerHTML = '';
    
    // 添加所有项目卡片
    allProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    console.log('显示的项目总数:', allProjects.length, '(预定义:', projects.length, ', 用户上传:', userProjects.length, ')');
}

// 创建项目卡片
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    card.dataset.id = project.id;
    
    // 添加占位图，处理图片可能不存在的情况
    const thumbnailSrc = project.thumbnail || 'img/placeholder.jpg';
    
    // 检查是否为用户上传的项目（非预设项目）
    const isUserProject = !projects.some(p => p.id === project.id);
    
    // 添加删除按钮（仅对用户上传的项目显示）
    const deleteButton = isUserProject ? 
        `<button class="delete-project-btn" data-id="${project.id}">
            <i class="fas fa-trash"></i>
         </button>` : '';
    
    card.innerHTML = `
        <div class="project-img">
            <img src="${thumbnailSrc}" alt="${project.title}" onerror="this.src='img/placeholder.jpg'">
            ${deleteButton}
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.brief}</p>
            <span class="project-category">${getCategoryName(project.category)}</span>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        // 如果点击的是删除按钮，则不打开模态框而是删除项目
        if (e.target.closest('.delete-project-btn')) {
            e.stopPropagation(); // 阻止冒泡，防止触发父元素的点击事件
            deleteProject(project.id);
            return;
        }
        
        // 否则打开项目详情模态框
        openProjectModal(project);
    });
    
    return card;
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        // 预定义项目分类
        'digital-twin': '数字孪生场景',
        'effects': '特效',
        'animation': '动画',
        'model': '模型',
        
        // 兼容旧分类（如果有历史数据）
        'weather-effects': '特效',
        'industrial': '工业设备',
        
        // 用户上传作品分类
        'digital-painting': '数字绘画',
        '3d-art': '3D艺术',
        'photography': '摄影作品',
        'mixed-media': '混合媒体',
        'generative-art': '生成艺术',
        'nft': 'NFT',
        'illustration': '插画',
        'ui-design': 'UI设计',
        '3d': '3D艺术',
        'video': '视频',
        'audio': '音频',
        'other': '其他'
    };
    
    return categories[category] || category;
}

// 初始化博客文章
function initBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    
    if (!blogPosts || blogPosts.length === 0) {
        blogGrid.innerHTML = '<p class="no-blogs">暂无博客文章。</p>';
        return;
    }
    
    blogPosts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });
}

// 创建博客卡片
function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    // 添加占位图，处理图片可能不存在的情况
    const thumbnailSrc = post.thumbnail || 'img/placeholder.jpg';
    
    card.innerHTML = `
        <div class="blog-img">
            <img src="${thumbnailSrc}" alt="${post.title}" onerror="this.src='img/placeholder.jpg'">
        </div>
        <div class="blog-info">
            <h3>${post.title}</h3>
            <p>${post.brief}</p>
            <span class="blog-date">${post.date}</span>
        </div>
    `;
    
    card.addEventListener('click', function() {
        window.open(post.link, '_blank');
    });
    
    return card;
}

// 初始化分类筛选
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选项目
            const filter = this.dataset.filter;
            const projectCards = document.querySelectorAll('.project-card'); // 重新获取所有项目卡片
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 打开项目模态框
function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    // 处理视频和图片可能不存在的情况
    let videoElement = '';
    console.log("处理项目视频:", project.video ? "视频存在" : "无视频");
    
    if (project.video) {
        // 处理base64编码的视频数据
        const videoSrc = project.video;
        videoElement = `
            <div class="video-container">
                <video controls width="100%" height="auto" preload="metadata">
                    <source src="${videoSrc}" type="video/mp4">
                    您的浏览器不支持视频播放
                </video>
            </div>
        `;
        console.log("视频元素已创建");
    }
        
    const imagesElements = project.images && project.images.length > 0
        ? project.images.map(img => `<img src="${img}" alt="${project.title}" onerror="this.style.display='none'">`).join('')
        : '<div class="no-images">暂无图片</div>';
    
    modalContent.innerHTML = `
        <div class="project-detail">
            <div class="project-detail-info">
                <h2>${project.title}</h2>
                <p><strong>项目简介：</strong> ${project.brief}</p>
                <p><strong>项目目标：</strong> ${project.goals}</p>
                <p><strong>技术难点：</strong> ${project.challenges}</p>
                <p><strong>个人贡献：</strong> ${project.contribution}</p>
                
                <div class="project-detail-specs">
                    <h3>技术规格</h3>
                    <ul>
                        ${Object.entries(project.specs || {}).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="project-detail-media">
                ${videoElement}
                ${imagesElements}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // 关闭按钮事件
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 初始化模态框
function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 初始化滚动动画
function initScrollAnimation() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新导航活动状态
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 导航菜单的滚动监听
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 在滚动时添加阴影效果
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        // 更新导航活动状态
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// 上传功能实现
function initUploadFunctionality() {
    const uploadForm = document.getElementById('upload-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // 模拟上传进度
            const progressBar = document.getElementById('upload-progress');
            const progressContainer = document.querySelector('.progress-container');
            
            progressContainer.style.display = 'block';
            
            let progress = 0;
            const interval = setInterval(function() {
                progress += 5;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // 模拟上传完成
                    setTimeout(function() {
                        alert('上传成功！');
                        uploadForm.reset();
                        progressContainer.style.display = 'none';
                    }, 500);
                }
            }, 200);
            
            // 实际项目中，这里应该发送AJAX请求到服务器
            // fetch('/api/upload', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('上传成功:', data);
            //     uploadForm.reset();
            // })
            // .catch(error => {
            //     console.error('上传失败:', error);
            // });
        });
    }
}

// 删除项目函数
function deleteProject(projectId) {
    if (confirm('确定要删除此作品吗？此操作不可恢复。')) {
        let userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        userProjects = userProjects.filter(project => project.id !== projectId);
        localStorage.setItem('userProjects', JSON.stringify(userProjects));
        
        // 刷新项目显示
        initProjectCards();
        
        // 显示删除成功提示
        const message = document.createElement('div');
        message.className = 'delete-message success';
        message.textContent = '作品已成功删除';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 2000);
        }, 10);
    }
} 