import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Linkedin, Dribbble, User, Star, Monitor, Smartphone, Layout, ShoppingBag, Map, Car, Zap,ChevronLeft } from 'lucide-react';

// 导入常规 CSS 文件
import './PortfolioStyles.css'; 
// 确保您在 src 文件夹下创建了这个文件，如果放在了 src/styles/ 文件夹，请修改路径

// --- 模拟数据 (更新为8个指定项目) ---

// 注意：原代码中的 color 和 spineColor 属性包含 Tailwind 颜色类 (如 from-lime-600)，
// 为了兼容常规CSS，我们需要将其转换为实际的颜色值或CSS变量名。
// 这里我们将其保持为变量名，并在下面的 Book 组件中使用 style 属性来应用颜色。

const PROJECTS = [
  // --- 第一排 ---
  {
    id: 1,
    title: "油柑网 B2B 电子元器件商城设计",
    category: "Web Platform",
    // 转换为实际颜色值
    color: "#65a30d", // from-lime-600 to-green-800
    spineColor: "#14532d", // bg-green-900
    coverIcon: <Monitor className="icon-base" />,
    description: `电子元器件采购平台设计。

    我的主要工作是：
    1. 优化B端采购流程与搜索体验，将搜索转化率提升X%。
    2. 设计用户仪表盘，提高信息密度与操作效率。
    3. 负责项目的视觉风格统一和组件库建设。`,
    images: [
        "/youganweb1.webp",
        "/youganweb2.webp",
        "/youganweb3.webp"
    ]
    /*images: ["/api/placeholder/1440/900", "/api/placeholder/1440/1400"]*/
  },
  {
    id: 2,
    title: "H5商城",
    category: "Mobile Web",
    color: "#f97316", // from-orange-500 to-red-600
    spineColor: "#7f1d1d", // bg-red-900
    coverIcon: <ShoppingBag className="icon-base" />,
    description: "移动端电商H5商城，专注于快速转化的轻量级购物体验。",
      images: [ "/h51.webp", ]
    // images: ["/api/placeholder/1440/1200", "/api/placeholder/1440/800"]
  },
  {
    id: 3,
    title: "运营活动",
    category: "Campaign",
    color: "#a855f7", // from-purple-500 to-indigo-600
    spineColor: "#3730a3", // bg-indigo-900
    coverIcon: <Star className="icon-base" />,
    description: "年度大促运营活动主视觉与交互页面设计，提升用户参与度。",
     images: [
        "/yyhd1.webp",
        "/yyhd2.webp",
    ]
   /* images: ["/api/placeholder/1440/2000"]*/
  },
  {
    id: 4,
    title: "动哈运动",
    category: "Health App",
    color: "#06b6d4", // from-cyan-600 to-blue-700
    spineColor: "#1e3a8a", // bg-blue-900
    coverIcon: <Smartphone className="icon-base" />,
    description: "智能穿戴配套应用，运动数据可视化与健康监测。",
    images: [ "/dhyd1.webp", ]
    /*images: ["/api/placeholder/1440/1000", "/api/placeholder/1440/1600"]*/
  },
  
  // --- 第二排 ---
  {
    id: 5,
    title: "TPT Health App",
    category: "Medical",
    color: "#0d9488", // from-teal-600 to-emerald-800
    spineColor: "#064e3b", // bg-emerald-900
    coverIcon: <Zap className="icon-base" />,
    description: "专业医疗健康管理平台，连接医生与患者的数字化桥梁。",
    images: ["/api/placeholder/1440/1100", "/api/placeholder/1440/1300"]
  },
  {
    id: 6,
    title: "成都太古里导航屏",
    category: "Wayfinding",
    color: "#44403c", // from-stone-700 to-stone-900
    spineColor: "#0c0a09", // bg-stone-950
    coverIcon: <Map className="icon-base" />,
    description: "大型商业综合体线下导视屏幕系统设计，融合建筑美学。",
    images: [ "/cdtgl1.webp", ]
    /*images: ["/api/placeholder/1440/1080", "/api/placeholder/1440/600"]*/
  },
  {
    id: 7,
    title: "吉利汽车皮肤",
    category: "HMI Design",
    color: "#1e40af", // from-blue-800 to-slate-900
    spineColor: "#020617", // bg-slate-950
    coverIcon: <Car className="icon-base" />,
    description: "吉利汽车中控车机系统主题皮肤设计，打造沉浸式驾驶舱。",
    images: [
        "/jl1.webp",
        "/jl2.webp",
        "/jl3.webp"
    ]
    // images: ["/api/placeholder/1440/800", "/api/placeholder/1440/600"]
  },
  {
    id: 8,
    title: "智能面包机",
    category: "IoT Device",
    color: "#f59e0b", // from-amber-500 to-orange-700
    spineColor: "#9a3412", // bg-orange-900
    coverIcon: <Layout className="icon-base" />,
    description: "智能家电触控屏交互设计，让烘焙更简单有趣。",
    // 关键修正：将图片路径统一到 images 数组
    images: ["/mbj1.webp"], 
    detailImage: "/mbj1.webp", // 这个属性保留但不再用于渲染
  }
];

// --- 组件部分 ---

const Book = ({ project, onClick }) => {
  // 使用内联样式来处理渐变和书脊颜色
  const coverStyle = {
    background: `linear-gradient(to bottom right, ${project.color}, ${project.spineColor})`,
  };
  
  return (
    <div 
      onClick={() => onClick(project)}
      className="book-card group" // 使用新的常规 CSS 类
    >
      {/* Book Spine (3D Effect) */}
      <div 
        className="book-spine shadow-lg transform origin-right" 
        style={{ backgroundColor: project.spineColor }} // 应用书脊颜色
      ></div>

      {/* Book Cover */}
      <div 
        className="book-cover shadow-xl flex flex-col p-3 md:p-4 justify-between items-center text-center transform transition-all duration-300 border-l-2 border-white/10"
        style={coverStyle} // 应用渐变颜色
      >
        
        {/* Top Decoration */}
        <div className="cover-top-deco">
          <span className="cover-category">{project.category}</span>
        </div>

        {/* Icon/Visual */}
        <div className="cover-icon-wrapper transition-transform duration-300 scale-75 md:scale-100">
          {project.coverIcon}
        </div>

        {/* Title */}
        <div className="cover-title-wrapper h-12">
          <h3 className="cover-title drop-shadow-md">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Pages Effect (Bottom) */}
      <div className="book-pages-effect shadow-inner"></div>
    </div>
  );
};

// 新增：使用图片代替复杂 CSS 的面包机组件
const ToasterObject = ({ project, onClick }) => {
  // 注意：假设您的图片文件名为 'toaster.png' 且放在 public 文件夹
  const imagePath = '/toaster3.webp'; 
    
  return (
    <div 
      onClick={() => onClick(project)}
      // 保持最外层类名，使用内联 style 强制设置尺寸
      className="toaster-object group" 
      style={{ 
          width: '9.4rem', // 10rem = 160px
          height: '12rem', // 10rem = 160px
          display: 'flex', 
          alignItems: 'flex-end',
          justifyContent: 'center',
          perspective: '1000px',
      }}
    >
      <div 
        className="relative w-full h-full flex items-end justify-center hover-translate-y-2"
        // 悬停动画：用内联 style 实现 hover:-translate-y-2 的效果
        style={{
          transition: 'transform 300ms',
          transform: 'translateY(0)',
        }}
      >
        {/* 使用 <img> 标签加载图片 */}
        <img 
          src={imagePath} 
          alt={project.title} 
          // 确保图片宽度自适应，并保持底部对齐
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      
      {/* 底部阴影 (保持原样) */}
      <div className="absolute -bottom-1 w-[90%] h-3 bg-black/20 blur-md rounded-full z-0"></div>
    </div>
  );
};
const RealisticPlant = () => (
  <div className="realistic-plant group z-20 pointer-events-none">
    {/* 植物主体容器... (此处省略，保持原 Tailwind 样式，需要您后续手动调整) */}
    <div className="absolute bottom-12 w-full flex justify-center items-end">
        
       {/* 茎 (Stems) */}
       <div className="absolute bottom-0 w-1 h-24 bg-stone-700 transform -rotate-6 origin-bottom rounded-full"></div>
       <div className="absolute bottom-0 w-1 h-20 bg-stone-600 transform rotate-6 origin-bottom rounded-full"></div>
        
       {/* 叶片 1 (左下) */}
       <div className="absolute bottom-10 -left-6 w-16 h-20 rounded-[50%_50%_50%_5px] bg-gradient-to-br from-emerald-500 to-green-800 transform -rotate-[70deg] origin-bottom-right shadow-sm border-t border-emerald-400/30 group-hover:-rotate-[75deg] transition-transform duration-700 ease-in-out">
          <div className="absolute w-[1px] h-full bg-emerald-900/10 left-1/2 rotate-3"></div>
       </div>

       {/* 叶片 2 (右下) */}
       <div className="absolute bottom-12 -right-4 w-14 h-18 rounded-[50%_5px_50%_50%] bg-gradient-to-bl from-emerald-400 to-green-700 transform rotate-[60deg] origin-bottom-left shadow-sm border-t border-emerald-300/30 group-hover:rotate-[65deg] transition-transform duration-700 delay-75">
          <div className="absolute w-[1px] h-full bg-emerald-900/10 left-1/2 -rotate-3"></div>
       </div>

       {/* 叶片 3 (中上 - 主叶) */}
       <div className="absolute bottom-20 w-16 h-24 rounded-[50%_50%_5px_50%] bg-gradient-to-b from-emerald-400 to-green-800 transform -rotate-6 shadow-md border-t border-emerald-300/40 z-10 group-hover:-rotate-3 transition-transform duration-1000">
          <div className="absolute w-[1px] h-full bg-emerald-900/10 left-1/2"></div>
       </div>

       {/* 叶片 4 (右上) */}
       <div className="absolute bottom-16 left-6 w-12 h-16 rounded-[5px_50%_50%_50%] bg-gradient-to-bl from-lime-500 to-emerald-700 transform rotate-[30deg] origin-bottom-left shadow-sm z-0"></div>

       {/* 叶片 5 (左上 - 嫩叶) */}
       <div className="absolute bottom-24 -left-2 w-10 h-14 rounded-[50%_5px_50%_50%] bg-gradient-to-tr from-lime-400 to-emerald-600 transform -rotate-[20deg] origin-bottom-right shadow-sm z-0"></div>
    </div>
    
    {/* 花盆 (Pot) - 增加纹理和立体感 */}
    <div className="relative w-24 h-20 z-20">
      {/* 盆沿 */}
      <div className="absolute top-0 w-full h-4 bg-[#d4c5b0] rounded-sm shadow-md z-30 flex items-center justify-center border-t border-white/40"></div>
      
      {/* 盆体 */}
      <div className="absolute top-2 left-1 right-1 bottom-0 bg-gradient-to-b from-[#e6dccf] to-[#cbbba4] shadow-inner rounded-b-lg flex flex-col items-center justify-center overflow-hidden">
        {/* 盆体纹理装饰 */}
        <div className="w-full h-px bg-stone-400/20 mb-1"></div>
        <div className="w-full h-px bg-stone-400/20 mb-1"></div>
        <div className="w-12 h-12 rounded-full border-2 border-stone-400/10 mt-2"></div>
      </div>
    </div>
    
    {/* 底部阴影 */}
    <div className="absolute -bottom-1 w-20 h-3 bg-black/20 blur-md rounded-full z-10"></div>
  </div>
);

const Shelf = ({ children }) => {
  // 使用内联样式来处理复杂的背景图案
  const woodGrainStyle = {
    backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
  };
  
  return (
    <div className="shelf-container">
      <div className="shelf-content">
        {children}
      </div>
      {/* Wood Shelf Visual */}
      <div className="shelf-wood">
        <div className="shelf-gradient"></div>
        <div className="shelf-grain" style={woodGrainStyle}></div>
      </div>
      {/* Shadow under shelf */}
      <div className="shelf-shadow"></div>
    </div>
  );
};

const ContactCard = () => {
  return (
    <div className="contact-card group">
      {/* The Card Holder */}
      <div className="absolute bottom-0 w-16 h-4 bg-gray-800 rounded-sm shadow-md z-20"></div>
      
      {/* The Card Itself */}
      <div className="relative bg-white w-full h-[90%] p-4 shadow-md rounded-sm border border-gray-200 flex flex-col items-center justify-center text-center transform transition-transform duration-300 group-hover:-translate-y-2 z-10">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <User className="text-gray-600" size={24} />
        </div>
        <h4 className="font-bold text-gray-800 text-sm">联系我</h4>
    
      </div>
    </div>
  );
};

const ProjectDetail = ({ project, onClose }) => {
  // 1. 新增状态：跟踪用户是否滚动了页面 (🚨 移除注释)
  const [isScrolled, setIsScrolled] = useState(false); // ⬅️ 新增状态

  // 确保首次打开时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. 监听滚动事件 // ⬅️ 新增逻辑
  useEffect(() => {
    const handleScroll = () => {
      // 设定滚动阈值，例如超过 50 像素就视为已滚动
      const scrolled = window.scrollY > 50; 
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // 清除副作用：组件卸载时移除监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail-container">
      
      {/* Navigation Bar */}
      <div className={`detail-nav ${isScrolled ? 'scrolled-nav' : ''} shadow-sm`}>
        <div className="detail-nav-content">
          <button 
            onClick={onClose}
            className="detail-back-button"
          >
            <ChevronLeft size={24} />
            <span className="detail-back-text">返回</span>
          </button>
          <h2 className="detail-nav-title">{project.title}</h2>
          <div className="detail-spacer"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Hero / Header Area (包含标题、描述和标签) */}
      
      {/* <div className="detail-hero">
        <h1 className="detail-hero-title mb-6">{project.title}</h1>
        <p className="detail-hero-desc">
          {project.description}
        </p>
        <div className="detail-hero-tags">
          <span className="tag-item">{project.category}</span>
          <span className="tag-item">2024 Portfolio</span>
        </div>
      </div> */}

      {/* === 修正后的通用图片渲染逻辑 (放置在 detail-hero 之后) === */}
      <div className="detail-image-strip" style={{
          maxWidth: '1200px', 
          margin: '0 auto',    
          padding: '0 20px',   
          width: '100%',       
      }}>

          {/* 使用通用的 project.images 数组来渲染所有图片 */}
          {project.images && project.images.map((imgSrc, index) => (
              <img 
                  key={index} 
                  src={imgSrc}
                  // 修正 alt 属性的语法
                  alt={`${project.title} 详情图 ${index + 1}`} 
                  className="detail-grid-image"
                  style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block',
                      // 为图片之间增加间距
                      marginBottom: '3rem' 
                  }} 
                  loading="lazy" 
              />
          ))}
      </div>
      {/* === END 通用图片渲染逻辑 === */}

      {/* Footer in Detail View */}
      <div className="detail-footer">
       
      </div>
    </div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="app-container">
      
      {selectedProject ? (
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="header-area">
            <h1 className="header-title">
              测试
            </h1>
            <p className="header-paragraph">
              这里陈列着我的设计思考与实践。
              <br className="header-text-hidden-md" />
              点击书籍查看完整项目长图。
            </p>
          </header>

          {/* Bookshelves Area */}
          <main className="main-content">
            
            {/* Shelf 1: Projects 1-4 + Plant */}
            <Shelf>
              {PROJECTS.slice(0, 4).map(proj => (
                <Book key={proj.id} project={proj} onClick={setSelectedProject} />
              ))}
              <RealisticPlant /> 
            </Shelf>

            {/* Shelf 2: Projects 5-8 + Contact */}
            <Shelf>
              {PROJECTS.slice(4, 7).map(proj => (
                <Book key={proj.id} project={proj} onClick={setSelectedProject} />
              ))}
              {/* 第8个项目现在是面包机 */}
              <ToasterObject project={PROJECTS[7]} onClick={setSelectedProject} />
              <ContactCard />
            </Shelf>

          </main>

          {/* Simple Footer */}
          <footer className="simple-footer">
            <p>&copy; {new Date().getFullYear()} UI Designer Portfolio. Made with React & Vanilla CSS.</p>
          </footer>
        </div>
      )}
    </div>
  );
}