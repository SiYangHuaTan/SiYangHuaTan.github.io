document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景效果
    initParticles();
    
    // 初始化自定义光标
    initCustomCursor();
    
    // 初始化文件上传功能
    initFileUpload();
    
    // 初始化标签选择功能
    initTagSelection();
    
    // 初始化技术规格字段
    initSpecsFields();
    
    // 监听表单提交
    document.getElementById('uploadForm').addEventListener('submit', handleFormSubmit);
    
    // 保存草稿按钮
    document.getElementById('saveDraft').addEventListener('click', saveDraft);
    
    // 延迟隐藏加载动画
    setTimeout(function() {
        document.querySelector('.loading-overlay').classList.add('hidden');
    }, 800);
});

// 初始化粒子背景
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: 80, 
                density: { 
                    enable: true, 
                    value_area: 800 
                } 
            },
            color: { value: "#6c63ff" },
            shape: {
                type: "circle",
                stroke: { 
                    width: 0, 
                    color: "#000000" 
                }
            },
            opacity: {
                value: 0.2,
                random: false,
                anim: { 
                    enable: false, 
                    speed: 1, 
                    opacity_min: 0.1, 
                    sync: false 
                }
            },
            size: {
                value: 3,
                random: true,
                anim: { 
                    enable: false, 
                    speed: 40, 
                    size_min: 0.1, 
                    sync: false 
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6c63ff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { 
                    enable: false, 
                    rotateX: 600, 
                    rotateY: 1200 
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { 
                    enable: true, 
                    mode: "grab" 
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                },
                resize: true
            },
            modes: {
                grab: { 
                    distance: 140, 
                    line_linked: { 
                        opacity: 0.6 
                    } 
                },
                push: { 
                    particles_nb: 4 
                }
            }
        },
        retina_detect: true
    });
}

// 初始化自定义光标
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    });
    
    // 为点击和悬停添加动效
    document.addEventListener('mousedown', function() {
        cursor.classList.add('cursor-active');
        cursorRing.classList.add('cursor-ring-active');
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('cursor-active');
        cursorRing.classList.remove('cursor-ring-active');
    });
    
    // 为可点击元素添加光标增强效果
    const clickables = document.querySelectorAll('button, .btn, .tag, .file-drop-area, input, select, textarea, a');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorRing.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorRing.classList.remove('cursor-hover');
        });
    });
}

// 初始化文件上传功能
function initFileUpload() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressSize = document.getElementById('progressSize');
    
    // 隐藏进度条
    progressContainer.style.display = 'none';
    
    // 点击上传区域触发文件选择
    dropArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // 监听文件选择变化
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    // 拖拽文件到区域
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // 拖拽效果
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, function() {
            dropArea.classList.add('highlight');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, function() {
            dropArea.classList.remove('highlight');
        }, false);
    });
    
    // 处理拖放文件
    dropArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }, false);
    
    // 处理选中的文件
    function handleFiles(files) {
        // 清空预览区域
        if (files.length > 0) {
            previewContainer.innerHTML = '';
        }
        
        // 检查文件大小限制
        let totalSize = 0;
        const maxFileSize = 50 * 1024 * 1024; // 50MB
        let validFiles = [];
        
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > maxFileSize) {
                showMessage('文件 ' + files[i].name + ' 超过50MB限制', 'error');
                continue;
            }
            
            totalSize += files[i].size;
            validFiles.push(files[i]);
            
            // 创建预览
            const fileType = files[i].type.split('/')[0];
            const preview = document.createElement('div');
            preview.className = 'preview-item';
            
            if (fileType === 'image') {
                // 图片预览
                const img = document.createElement('img');
                img.classList.add('preview-image');
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    img.src = e.target.result;
                }
                reader.readAsDataURL(files[i]);
                
                preview.appendChild(img);
            } else if (fileType === 'video') {
                // 视频预览
                const video = document.createElement('video');
                video.classList.add('preview-video');
                video.controls = true;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    video.src = e.target.result;
                }
                reader.readAsDataURL(files[i]);
                
                preview.appendChild(video);
            } else if (fileType === 'audio') {
                // 音频预览
                preview.innerHTML = `
                    <div class="audio-preview">
                        <i class="fas fa-music preview-icon"></i>
                        <audio controls>
                            <source src="${URL.createObjectURL(files[i])}" type="${files[i].type}">
                        </audio>
                    </div>
                `;
            } else {
                // 其他文件
                preview.innerHTML = `
                    <div class="file-preview">
                        <i class="fas fa-file preview-icon"></i>
                    </div>
                `;
            }
            
            // 文件信息
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-info';
            fileInfo.innerHTML = `
                <div class="file-name">${files[i].name}</div>
                <div class="file-size">${formatSize(files[i].size)}</div>
                <button type="button" class="remove-file" data-index="${i}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            preview.appendChild(fileInfo);
            previewContainer.appendChild(preview);
        }
        
        // 添加删除按钮事件
        const removeButtons = document.querySelectorAll('.remove-file');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.target.closest('.preview-item').remove();
                
                // 如果没有预览项，清除文件输入
                if (previewContainer.children.length === 0) {
                    fileInput.value = '';
                }
            });
        });
        
        // 如果有有效文件，模拟上传进度
        if (validFiles.length > 0) {
            simulateFileUpload(totalSize);
        }
    }
    
    // 模拟文件上传进度
    function simulateFileUpload(totalSize) {
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        progressText.textContent = '正在上传... 0%';
        progressSize.textContent = '0MB / ' + formatSize(totalSize);
        
        let progress = 0;
        const interval = setInterval(function() {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            progressText.textContent = '正在上传... ' + Math.round(progress) + '%';
            progressSize.textContent = formatSize((progress / 100) * totalSize) + ' / ' + formatSize(totalSize);
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(function() {
                    progressText.textContent = '上传完成!';
                    setTimeout(function() {
                        progressContainer.style.display = 'none';
                    }, 2000);
                }, 500);
            }
        }, 500);
    }
    
    // 格式化文件大小
    function formatSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// 初始化标签选择功能
function initTagSelection() {
    const tagList = document.getElementById('tagList');
    const customTagInput = document.getElementById('customTag');
    
    // 选择/取消选择预设标签
    tagList.addEventListener('click', function(e) {
        if (e.target.classList.contains('tag')) {
            e.target.classList.toggle('selected');
        }
    });
    
    // 添加自定义标签
    customTagInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const tagText = this.value.trim();
            if (tagText && tagText.length <= 20) {
                const tagExists = Array.from(tagList.querySelectorAll('.tag')).some(tag => 
                    tag.textContent.toLowerCase() === tagText.toLowerCase()
                );
                
                if (!tagExists) {
                    const newTag = document.createElement('div');
                    newTag.className = 'tag selected';
                    newTag.setAttribute('data-tag', tagText);
                    newTag.textContent = tagText;
                    tagList.appendChild(newTag);
                    this.value = '';
                } else {
                    // 如果标签已存在，找到它并高亮
                    const existingTag = Array.from(tagList.querySelectorAll('.tag')).find(tag => 
                        tag.textContent.toLowerCase() === tagText.toLowerCase()
                    );
                    existingTag.classList.add('selected');
                    existingTag.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    this.value = '';
                }
            } else if (tagText.length > 20) {
                showMessage('标签最多20个字符', 'warning');
            }
        }
    });
}

// 初始化技术规格字段
function initSpecsFields() {
    const specsContainer = document.getElementById('specsContainer');
    const addSpecButton = document.getElementById('addSpec');
    
    // 添加技术规格字段
    addSpecButton.addEventListener('click', function() {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <input type="text" class="form-control spec-name" placeholder="名称 (如：尺寸、格式)">
            <input type="text" class="form-control spec-value" placeholder="数值 (如：1920x1080、RGB)">
            <button type="button" class="remove-spec"><i class="fas fa-times"></i></button>
        `;
        
        specsContainer.appendChild(specItem);
        
        // 为新添加的删除按钮绑定事件
        specItem.querySelector('.remove-spec').addEventListener('click', function() {
            specItem.remove();
        });
    });
    
    // 为初始的删除按钮绑定事件
    document.querySelectorAll('.remove-spec').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.spec-item').remove();
        });
    });
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    // 检查必填字段
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const terms = document.getElementById('terms').checked;
    
    if (!title) {
        showMessage('请填写作品标题', 'error');
        document.getElementById('title').focus();
        return;
    }
    
    if (!category) {
        showMessage('请选择作品分类', 'error');
        document.getElementById('category').focus();
        return;
    }
    
    if (!terms) {
        showMessage('请阅读并同意使用条款', 'error');
        document.getElementById('terms').focus();
        return;
    }
    
    // 检查是否有上传文件
    if (document.querySelectorAll('.preview-item').length === 0) {
        showMessage('请上传至少一个文件', 'error');
        return;
    }
    
    // 收集表单数据
    const formData = {
        title: title,
        description: document.getElementById('description').value.trim(),
        category: category,
        tags: Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.getAttribute('data-tag')),
        specs: Array.from(document.querySelectorAll('.spec-item')).map(item => {
            return {
                name: item.querySelector('.spec-name').value.trim(),
                value: item.querySelector('.spec-value').value.trim()
            };
        }).filter(spec => spec.name && spec.value)
    };
    
    // 这里应该是实际的表单提交逻辑
    console.log('提交的表单数据:', formData);
    
    // 模拟成功提交
    showMessage('作品提交成功！正在跳转到作品页面...', 'success');
    
    // 模拟跳转
    setTimeout(function() {
        // 实际项目中应该跳转到作品页面
        window.location.href = '../index.html';
    }, 3000);
}

// 保存草稿
function saveDraft() {
    // 收集表单数据
    const formData = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        category: document.getElementById('category').value,
        tags: Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.getAttribute('data-tag')),
        specs: Array.from(document.querySelectorAll('.spec-item')).map(item => {
            return {
                name: item.querySelector('.spec-name').value.trim(),
                value: item.querySelector('.spec-value').value.trim()
            };
        }).filter(spec => spec.name && spec.value),
        timestamp: new Date().toISOString()
    };
    
    // 保存到本地存储
    localStorage.setItem('uploadDraft', JSON.stringify(formData));
    
    showMessage('草稿已保存', 'success');
}

// 显示消息提示
function showMessage(text, type = 'info') {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = 'message ' + type + ' show';
    
    setTimeout(function() {
        message.classList.remove('show');
    }, 3000);
} 