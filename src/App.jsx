import React, { useState, useEffect, useRef } from 'react';
// 图标库
import { X, ChevronLeft, Zap, ArrowUpRight, Smile, Phone } from 'lucide-react'; 

// 导入 CSS
import './PortfolioStyles.css'; 

// --- 模拟数据 ---
const PROJECTS = [
  {
    id: 1,
    title: "华为手表test1",
    tags: ["Web Platform", "从0到1"], 
    coverImage: "/homepage1.webp", 
    description: `电子元器件采购平台设计。我的主要工作是：1. 优化B端采购流程与搜索体验。2. 设计用户仪表盘。3. 负责项目的视觉风格统一和组件库建设。`,
    images: ["/youganweb1.webp", "/youganweb2.webp", "/youganweb3.webp"]
  },
  {
    id: 2,
    title: "H5商城",
    tags: ["Mobile Web", "大版本更新"],
    coverImage: "/homepage2.webp",
    description: "移动端电商H5商城，专注于快速转化的轻量级购物体验。",
    images: [ "/h51.webp", ]
  },
  {
    id: 3,
    title: "运营活动",
    tags: ["Campaign", "高转化率"],
    coverImage: "/homepage3.webp",
    description: "年度大促运营活动主视觉与交互页面设计。",
     images: [ "/yyhd1.webp", "/yyhd2.webp", ]
  },
  {
    id: 4,
    title: "动哈运动",
    tags: ["Health App", "数据可视化"],
    coverImage: "/homepage4.webp",
    description: "智能穿戴配套应用，运动数据可视化与健康监测。",
    images: [ "/dhyd1.webp", ]
  },
  {
    id: 5,
    title: "TPT Health App",
    tags: ["Medical", "系统设计"],
    coverImage: "/homepage5.webp",
    description: "专业医疗健康管理平台。",
    images: ["/api/placeholder/1440/1100", "/api/placeholder/1440/1300"]
  },
  {
    id: 6,
    title: "成都太古里导航屏",
    tags: ["Wayfinding", "线下体验"],
    coverImage: "/homepage6.webp",
    description: "大型商业综合体线下导视屏幕系统设计。",
    images: [ "/cdtgl1.webp", ]
  },
  {
    id: 7,
    title: "吉利汽车皮肤",
    tags: ["HMI Design", "智能硬件"],
    coverImage: "/homepage7.webp",
    description: "吉利汽车中控车机系统主题皮肤设计。",
    images: [ "/jl1.webp", "/jl2.webp", "/jl3.webp" ]
  },
  {
    id: 8,
    title: "智能面包机",
    tags: ["IoT Device", "硬件交互"],
    coverImage: "/homepage8.webp", 
    description: "智能家电触控屏交互设计。",
    images: ["/mbj1.webp","/mbj2.webp"], 
  },
    {
    id: 9,
    title: "智能医疗手表",
    tags: ["智能硬件", "独立完成"],
    coverImage: "/homepage9.webp", 
    description: "可以测量健康数据的智能手表",
    images: ["/watch1.webp","/watch2.webp"], 
  }
];

// --- ProjectCard 组件 ---
const ProjectCard = ({ project, onClick }) => {
  const coverSrc = project.coverImage || "/api/placeholder/600/600";
  
  return (
    <div 
      className={`project-card`} 
      onClick={() => onClick(project)}
      onMouseEnter={(e) => document.body.classList.add('hover-active')}
      onMouseLeave={(e) => document.body.classList.remove('hover-active')}
    >
      <div className="card-image-wrapper">
        <img 
          src={coverSrc} 
          alt={project.title} 
          className="card-image" 
          loading="lazy"
        />
        <div className="card-overlay">
            {/* <span className="view-project-btn">查看项目 <ArrowUpRight size={24}/></span> */}
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{project.title}</h3>
        <div className="card-tags-area">
          {project.tags && project.tags.slice(0, 2).map((tag, i) => ( 
            <span key={i} className="project-tag-item">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ContactModalLarge 组件 (名片：酷炫进出场) ---
const ContactModalLarge = ({ onClose }) => {
    // 挂载时的动画状态管理
    const [isClosing, setIsClosing] = useState(false);
    
    // 修复 1：进入名片组件时，强制清除 hover-active 类
    useEffect(() => { 
        document.body.classList.remove('hover-active');
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        // 等待动画结束后再卸载组件
        setTimeout(onClose, 500); 
    };

    return (
        <div className={`modal-backdrop ${isClosing ? 'closing' : ''}`}>
            <div className={`contact-modal-card-large ${isClosing ? 'closing' : ''}`}>
                <div 
                    className="modal-close-trigger" 
                    onClick={handleClose}
                    onMouseEnter={() => document.body.classList.add('hover-active')}
                    onMouseLeave={() => document.body.classList.remove('hover-active')}
                >
                    <X size={32} />
                </div>
                
                <div className="modal-inner-layout">
                    {/* 左侧 */}
                    <div className="modal-left">
                         <div className="modal-avatar-box">
                            <img src="/avatar-placeholder.webp" alt="Avatar" className="modal-avatar-img"/>
                        </div>
                        <h1 className="modal-hero-text">
                            DESIGNER<br/>
                            <span className="modal-hero-name">NAME / 名字</span>
                        </h1>
                        <p className="modal-bio-text">
                            跨领域 UI/UX 设计师 <strong>[B2B / 医疗 / 智能硬件]</strong>。<br/>
                            以极简美学和数据驱动，构建未来的数字体验。
                        </p>
                    </div>

                    {/* 右侧 */}
                    <div className="modal-right">
                        <div className="modal-contact-group">
                            <label>PHONE</label>
                            <div className="contact-value">+86 13670028871</div>
                        </div>
                        <div className="modal-contact-group">
                            <label>WECHAT</label>
                            <div className="contact-value">ccolor0702</div>
                        </div>
                        <div className="modal-contact-group">
                            <label>EMAIL</label>
                            <div className="contact-value">939790480@qq.com</div>
                        </div>
                        {/* <div className="modal-contact-group">
                            <label>LINKEDIN</label>
                            <div className="contact-value">linkedin.com/in/me</div>
                        </div> */}
                    </div>
                </div>

                <div className="modal-footer-deco">
                    PORTFOLIO 2025 © CONNECT ME
                </div>
            </div>
        </div>
    );
};

// --- StarryBackground ---
const StarryBackground = () => {
    return (
        <div className="starry-background">
            <div id="stars1"></div> 
            <div id="stars2"></div> 
            <div id="stars3"></div> 
        </div>
    );
};

// --- CustomCursor (优化：0延迟 DOM操作) ---
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        // 直接操作 DOM style，跳过 React 渲染周期，实现 0 延迟
        // translate3d 开启硬件加速
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    
    // 监听鼠标点击态
    const mouseDown = () => cursorRef.current?.classList.add('clicked');
    const mouseUp = () => cursorRef.current?.classList.remove('clicked');

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

// --- ProjectDetail 组件 (优化：头部对齐与转场) ---
const ProjectDetail = ({ project, onClose }) => {
  // 挂载时滚动到顶部 & 修复 2：进入详情页时，强制重置光标为小圆点
  useEffect(() => { 
    window.scrollTo(0, 0); 
    document.body.classList.remove('hover-active');
  }, []);

  return (
    <div className="detail-container">
      {/* 顶部固定导航 */}
      <div className="detail-nav-fixed">
        <div className="detail-nav-inner">
          <button 
            onClick={onClose} 
            className="detail-back-btn"
            // 修复 3：返回按钮添加光标放大交互
            onMouseEnter={() => document.body.classList.add('hover-active')}
            onMouseLeave={() => document.body.classList.remove('hover-active')}
          >
            <ChevronLeft size={40
            } /> <span className="back-text">BACK</span>
          </button>
          <span className="detail-title-center">{project.title}</span>
          <div style={{width: '60px'}}></div> 
        </div>
      </div>

      {/* 详情页头部信息 - 增加 enter 动画类 */}
      <div className="detail-hero-section animate-enter">
        <div className="detail-hero-content">
            {/* 标题动画衔接感 */}
            <h1 className="detail-big-title">{project.title}</h1>
            <div className="detail-tags-row">
                {/* <span className="detail-uid">NO. {project.id < 10 ? `0${project.id}` : project.id}</span> */}
                {project.tags.map((t, i) => <span key={i} className="detail-tag">{t}</span>)}
            </div>
            <p className="detail-desc">{project.description}</p>
        </div>
      </div>

      {/* 详情页图片列表 */}
      <div className="detail-images-container animate-enter-delay">
          {project.images && project.images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt="Detail" className="detail-img-item" loading="lazy" />
          ))}
      </div>
    </div>
  );
};

// --- App 组件 ---
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModal] = useState(false); 

  return (
    <div className="app-container">
      <StarryBackground /> 
      <CustomCursor />

      {/* 名片弹窗 */}
      {isContactModalOpen && <ContactModalLarge onClose={() => setIsContactModal(false)} />}

      {selectedProject ? (
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      ) : (
        // 首页内容
        <div className="homepage-content">
          <header className="header-section">
            <div className="header-inner">
                <h1 className="main-logo">DESIGN WORKS <span className="dot">.</span></h1>
                <p className="main-subtitle">UI/UX & PRODUCT DESIGNER</p>
                
                <div className="header-bottom-row">
                    <p className="header-bio">
                        致力于 B2B、健康医疗与智能硬件的交互设计。<br/>
                        用极简主义和先锋艺术构建数字体验。
                    </p>
                    <button 
                        onClick={() => setIsContactModal(true)} 
                        className="connect-btn"
                        onMouseEnter={(e) => document.body.classList.add('hover-active')}
                        onMouseLeave={(e) => document.body.classList.remove('hover-active')}
                    >
                        <Smile size={40} color="currentColor" />
                        <span>联系一下</span>
                    </button>
                </div>
            </div>
          </header>

          <main className="projects-grid-section">
            {PROJECTS.map((proj) => (
              <ProjectCard 
                key={proj.id} 
                project={proj} 
                onClick={setSelectedProject} 
              />
            ))}
          </main>

          <footer className="simple-footer">
            <p>© 2025 DESIGN PORTFOLIO. ALL RIGHTS RESERVED.</p>
          </footer>
        </div>
      )}
    </div>
  );
}