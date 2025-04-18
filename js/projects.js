// 项目数据
const projects = [
    {
        id: 1,
        title: "智慧城市数字孪生平台",
        category: "digital-twin",
        thumbnail: "img/projects/digital-twin-1.jpg",
        images: [
            "img/projects/digital-twin-1-detail1.jpg",
            "img/projects/digital-twin-1-detail2.jpg",
            "img/projects/digital-twin-1-comparison.jpg"
        ],
        video: "video/digital-twin-demo.mp4",
        brief: "为城市规划部门打造的数字孪生系统，实现对城市基础设施的可视化监控。",
        goals: "构建高精度数字孪生场景，实现实时数据展示与交互，支持Web端与PC端跨平台运行。",
        challenges: "处理大规模3D模型的实时渲染，优化加载性能，实现移动设备上的流畅体验。",
        contribution: "负责核心场景优化与LOD系统实现，开发自定义Shader以提升渲染效率，优化数据加载流程。",
        specs: {
            model: "原始模型100万面数，优化后2万面",
            texture: "4K贴图压缩至1K，使用法线贴图保留细节",
            performance: "60+ FPS on RTX 2060",
            optimization: "使用GPU Instancing处理重复物体，节省70%内存"
        }
    },
    {
        id: 2,
        title: "沙尘暴天气实时模拟",
        category: "weather-effects",
        thumbnail: "img/projects/weather-1.jpg",
        images: [
            "img/projects/weather-1-detail1.jpg",
            "img/projects/weather-1-detail2.jpg",
            "img/projects/weather-1-comparison.jpg"
        ],
        video: "video/sandstorm-demo.mp4",
        brief: "基于物理的沙尘暴天气实时模拟系统，可实现动态天气变化效果。",
        goals: "开发高性能的沙尘暴视觉效果，支持实时参数调整，保持帧率稳定。",
        challenges: "在不影响性能的前提下实现逼真的粒子效果，解决透明度排序问题。",
        contribution: "设计并实现GPU加速的粒子系统，开发自定义Shader处理光照散射，优化渲染管线。",
        specs: {
            particles: "10万粒子实时渲染",
            shader: "自定义Compute Shader计算粒子运动",
            performance: "在GTX 1060上维持50+ FPS",
            optimization: "使用LOD系统动态调整粒子数量"
        }
    },
    {
        id: 3,
        title: "工业设备数字孪生可视化",
        category: "industrial",
        thumbnail: "img/projects/industrial-1.jpg",
        images: [
            "img/projects/industrial-1-detail1.jpg",
            "img/projects/industrial-1-detail2.jpg",
            "img/projects/industrial-1-comparison.jpg"
        ],
        video: "video/industrial-demo.mp4",
        brief: "工厂设备数字孪生系统，实时展示设备运行状态与内部结构。",
        goals: "构建高精度工业设备3D模型，实现内部结构可视化，支持状态监控与交互式拆解。",
        challenges: "处理复杂机械装置的动画展示，优化高面数模型性能，实现零部件相互作用。",
        contribution: "负责高精度建模与纹理贴图制作，开发交互式动画系统，优化渲染性能。",
        specs: {
            model: "精细模型50万面，优化后5万面",
            animation: "100+动画序列，支持实时切换",
            performance: "Web端稳定30+ FPS",
            optimization: "使用网格合并与硬件实例化提升渲染性能"
        }
    },
    {
        id: 4,
        title: "水流动态模拟Shader",
        category: "weather-effects",
        thumbnail: "img/projects/shader-1.jpg",
        images: [
            "img/projects/shader-1-detail1.jpg",
            "img/projects/shader-1-detail2.jpg",
            "img/projects/shader-1-node.jpg"
        ],
        video: "video/water-shader-demo.mp4",
        brief: "基于物理的水流动态模拟Shader，适用于实时渲染环境。",
        goals: "开发高性能的水面模拟Shader，支持动态波浪、反射和折射效果。",
        challenges: "在保持性能的同时实现逼真的水面物理效果，解决移动端兼容性问题。",
        contribution: "研发自定义水面Shader，实现动态波纹算法，优化移动端性能。",
        specs: {
            algorithm: "基于Gerstner波方程的水面模拟",
            performance: "移动端消耗0.5ms渲染时间",
            features: "支持动态反射、折射、深度与泡沫效果",
            optimization: "使用LOD系统在不同距离动态调整细节"
        }
    },
    {
        id: 5,
        title: "金属腐蚀材质系统",
        category: "industrial",
        thumbnail: "img/projects/material-1.jpg",
        images: [
            "img/projects/material-1-detail1.jpg",
            "img/projects/material-1-detail2.jpg",
            "img/projects/material-1-node.jpg"
        ],
        video: "video/rust-material-demo.mp4",
        brief: "可参数化调整的金属腐蚀材质系统，适用于各类工业场景。",
        goals: "开发逼真的金属腐蚀材质，支持程序化生成与实时参数调整。",
        challenges: "实现细节丰富的腐蚀纹理，保持性能稳定，支持不同金属材质的视觉差异。",
        contribution: "设计Substance Designer材质制作流程，开发Unity Shader实现实时参数化调整。",
        specs: {
            maps: "包含漫反射、金属度、粗糙度、高度、环境光遮蔽等6张贴图",
            resolution: "支持4K~512分辨率动态切换",
            parameters: "提供10+可调参数，包括腐蚀程度、湿度等",
            optimization: "使用纹理压缩与混合技术优化内存占用"
        }
    },
    {
        id: 6,
        title: "跨平台交互展示系统",
        category: "digital-twin",
        thumbnail: "img/projects/cross-platform-1.jpg",
        images: [
            "img/projects/cross-platform-1-detail1.jpg",
            "img/projects/cross-platform-1-detail2.jpg",
            "img/projects/cross-platform-1-comparison.jpg"
        ],
        video: "video/cross-platform-demo.mp4",
        brief: "支持PC、Web、移动端的3D交互展示系统，适用于展览与远程协作。",
        goals: "开发一套适配多端的3D交互展示系统，保证各平台视觉一致性与性能表现。",
        challenges: "处理不同平台渲染能力差异，优化资源加载，实现统一的交互体验。",
        contribution: "设计跨平台资源管理系统，开发动态LOD系统，优化移动端渲染管线。",
        specs: {
            platforms: "支持Windows、WebGL、iOS、Android",
            asset: "开发自动化资源处理流程，为不同平台生成优化资源",
            performance: "移动端30+ FPS，PC端60+ FPS",
            optimization: "使用异步加载、网格简化与贴图压缩技术"
        }
    }
];

// 博客文章数据
const blogPosts = [
    {
        id: 1,
        title: "Unity数字孪生性能优化实战",
        thumbnail: "img/blog/blog-1.jpg",
        brief: "分享在大规模数字孪生项目中的性能优化经验，包括LOD、合批与内存管理等方面的实用技巧。",
        date: "2024-03-15",
        link: "https://example.com/blog/unity-performance-optimization"
    },
    {
        id: 2,
        title: "高效Shader开发工作流",
        thumbnail: "img/blog/blog-2.jpg",
        brief: "介绍Shader Graph与传统Shader编程的结合使用方法，提升特效开发效率的实用技巧。",
        date: "2024-02-20",
        link: "https://example.com/blog/shader-development-workflow"
    },
    {
        id: 3,
        title: "WebGL渲染管线优化指南",
        thumbnail: "img/blog/blog-3.jpg",
        brief: "深入探讨WebGL应用的性能瓶颈分析与优化方法，提升Web 3D应用的用户体验。",
        date: "2024-01-10",
        link: "https://example.com/blog/webgl-optimization-guide"
    }
]; 