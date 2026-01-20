// 粒子效果配置

// 获取当前主题（全局函数，在theme.js中定义）
function getCurrentTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme || 'light';
}

// 浅色主题粒子配置 - 多彩高对比度生动风格
// 使用蓝紫绿渐变配色：#4a90e2(亮蓝) #5dade2(天蓝) #48c9b0(青绿) #85c1e9(淡蓝) #ffffff(纯白)
const particlesLightConfig = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#4a90e2", "#5dade2", "#48c9b0", "#85c1e9", "#ffffff"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.7,
      random: {
        enable: true,
        minimumValue: 0.4
      },
      anim: {
        enable: true,
        speed: 3,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 5,
      random: {
        enable: true,
        minimumValue: 3
      },
      anim: {
        enable: true,
        speed: 4.5,
        size_min: 2,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 180,
      color: "#4a90e2",
      opacity: 0.3,
      width: 1.5,
      shadow: {
        enable: true,
        color: "#4a90e2",
        blur: 8,
        opacity: 0.25
      }
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 500,
        rotateY: 900
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 200,
        size: 12,
        duration: 1.8,
        opacity: 1,
        speed: 4
      },
      repulse: {
        distance: 350,
        duration: 1.2,
        easing: "ease-out"
      }
    }
  },
  retina_detect: true
};

// 深色主题粒子配置 - 高对比度科技风格
const particlesDarkConfig = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#667eea", "#8ba0f5", "#a5b4fc", "#ffffff"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.7,
      random: {
        enable: true,
        minimumValue: 0.4
      },
      anim: {
        enable: true,
        speed: 2.8,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 4.5,
      random: {
        enable: true,
        minimumValue: 2.5
      },
      anim: {
        enable: true,
        speed: 4,
        size_min: 2,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 220,
      color: "#667eea",
      opacity: 0.3,
      width: 1.5,
      shadow: {
        enable: true,
        color: "#667eea",
        blur: 8,
        opacity: 0.2
      }
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 500,
        rotateY: 900
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 200,
        size: 10,
        duration: 2,
        opacity: 1,
        speed: 4
      },
      repulse: {
        distance: 400,
        duration: 1.5,
        easing: "ease-out"
      }
    }
  },
  retina_detect: true
};

// 根据主题获取粒子配置
// 根据主题获取粒子配置
function getParticlesConfig() {
  const theme = getCurrentTheme();
  const config = theme === 'dark' ? particlesDarkConfig : particlesLightConfig;

  // 检测移动设备 (屏幕宽度小于768px 或 UserAgent匹配)
  const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // 深拷贝配置以避免修改原始对象
    const mobileConfig = JSON.parse(JSON.stringify(config));
    // 减少移动端粒子数量以优化性能 (50%)
    if (mobileConfig.particles && mobileConfig.particles.number) {
      mobileConfig.particles.number.value = Math.floor(mobileConfig.particles.number.value * 0.5);
    }
    return mobileConfig;
  }

  return config;
}

// 初始化粒子效果
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", getParticlesConfig());
  }
}

// 重新加载粒子效果（用于主题切换时刷新,带内存优化）
function reloadParticles() {
  const container = document.getElementById('particles-js');
  if (container && typeof particlesJS !== 'undefined') {
    // 销毁现有粒子实例,防止内存泄漏
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom.forEach(instance => {
        if (instance.pJS && instance.pJS.fn && instance.pJS.fn.vendors) {
          try {
            instance.pJS.fn.vendors.destroypJS();
          } catch (e) {
            console.warn('销毁粒子实例失败:', e);
          }
        }
      });
      window.pJSDom = [];
    }

    // 清除现有画布
    container.innerHTML = '';
    // 重新初始化
    setTimeout(() => {
      particlesJS("particles-js", getParticlesConfig());
    }, 100);
  }
}

