function handleHexoBlogDecryptEvent() {
    console.log("handleHexoBlogDecryptEvent()");
    $(document).ready(function () {
        init();
    });
}

function init() {
    if (typeof initGallery === 'function') {
        initGallery();
    }
    if (typeof initToc === 'function') {
        initToc();
    }
    if (typeof initPhotoFigcaption === 'function') {
        initPhotoFigcaption();
    }
    if (typeof initFancybox === 'function') {
        initFancybox();
    }
    if (typeof replaceSpacesWithNbsp === 'function') {
        replaceSpacesWithNbsp();
    }
    if (typeof initHighlightTools === 'function') {
        initHighlightTools();
    }
    if (typeof initTabs === 'function') {
        initTabs();
    }
    if (typeof initTagHide === 'function') {
        initTagHide();
    }
    if (typeof initMathjax === 'function') {
        initMathjax();
    }
    if (typeof initKatex === 'function') {
        initKatex();
    }
    if (typeof initWordCount === 'function') {
        initWordCount();
    }
    if (typeof initRef === 'function') {
        initRef();
    }
    if (typeof initMermaid === 'function') {
        initMermaid();
    }

    // 自动美化所有代码块为 Mac 风格容器（适配 highlight 结构）
    $('figure.highlight').each(function () {
      if ($(this).parent().hasClass('mac-code-content')) return;
      var $figure = $(this);
      var $container = $('<div class="mac-code-container"></div>');
      var $header = $('<div class="mac-code-header">\
        <span class="mac-code-dot red"></span>\
        <span class="mac-code-dot yellow"></span>\
        <span class="mac-code-dot green"></span>\
      </div>');
      var $content = $('<div class="mac-code-content"></div>');
      $figure.before($container);
      $container.append($header);
      $container.append($content);
      $content.append($figure);
    });

    // 为每个 Mac 风格代码容器添加一键复制按钮
    $('.mac-code-container').each(function () {
      var $container = $(this);
      // 避免重复添加
      if ($container.find('.mac-code-copy-btn').length) return;
      var $btn = $('<button class="mac-code-copy-btn">复制</button>');
      $container.append($btn);

      $btn.on('click', function () {
        // 获取代码内容
        var code = $container.find('pre').text();
        // 复制到剪贴板
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(function () {
            $btn.text('已复制!');
            setTimeout(function () { $btn.text('复制'); }, 1200);
          });
        } else {
          // 兼容旧浏览器
          var textarea = document.createElement('textarea');
          textarea.value = code;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          $btn.text('已复制!');
          setTimeout(function () { $btn.text('复制'); }, 1200);
        }
      });
    });

    // 为每个 Mac 风格代码容器添加语言标签（支持 figure.highlight 的 class）
    $('.mac-code-container').each(function () {
      var $container = $(this);
      if ($container.find('.mac-code-lang').length) return;
      var lang = '';
      // 优先取 code class
      var $code = $container.find('code[class*="language-"], code[class*="lang-"]');
      if ($code.length) {
        var cls = $code.attr('class');
        var match = cls && cls.match(/language-([a-zA-Z0-9]+)/);
        if (match) lang = match[1];
      }
      // fallback: 取 figure 的 class
      if (!lang) {
        var $fig = $container.find('figure[class*="highlight"]');
        if ($fig.length) {
          var figCls = $fig.attr('class');
          var figMatch = figCls && figCls.match(/highlight\s+([a-zA-Z0-9]+)/);
          if (figMatch) lang = figMatch[1];
        }
      }
      if (!lang) lang = $code.data('lang') || '';
      if (lang) {
        var $langTag = $('<span class="mac-code-lang"></span>').text(lang);
        $container.find('.mac-code-header').append($langTag);
      }
    });

    // 保证代码区和行号区的行数一致（自动补齐空行）
    document.querySelectorAll('.highlight').forEach(function(block) {
      const gutterLines = block.querySelectorAll('.gutter .line');
      const codeLines = block.querySelectorAll('.code .line');
      const gutterCount = gutterLines.length;
      const codeCount = codeLines.length;
      if (gutterCount > codeCount) {
        // 代码内容行数少于行号，补空行
        const codePre = block.querySelector('.code pre');
        for (let i = 0; i < gutterCount - codeCount; i++) {
          const span = document.createElement('span');
          span.className = 'line';
          span.innerHTML = '&nbsp;';
          codePre.appendChild(span);
        }
      } else if (codeCount > gutterCount) {
        // 行号少于代码内容，补行号
        const gutterPre = block.querySelector('.gutter pre');
        for (let i = 0; i < codeCount - gutterCount; i++) {
          const span = document.createElement('span');
          span.className = 'line';
          span.innerText = gutterCount + i + 1;
          gutterPre.appendChild(span);
        }
      }
    });

    // 代码块放大灯箱效果（支持 Esc 键关闭）
    if (typeof window !== 'undefined') {
      document.querySelectorAll('.mac-code-dot').forEach(dot => {
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', function(e) {
          e.stopPropagation();
          const container = dot.closest('.mac-code-container');
          if (!container) return;

          // 创建遮罩
          const mask = document.createElement('div');
          mask.className = 'mac-code-modal-mask';

          // 克隆代码块
          const modal = document.createElement('div');
          modal.className = 'mac-code-modal';
          modal.innerHTML = container.innerHTML;

          mask.appendChild(modal);
          document.body.appendChild(mask);

          // 禁止页面滚动
          document.body.style.overflow = 'hidden';

          // 关闭弹窗函数
          function closeModal() {
            if (document.body.contains(mask)) {
              document.body.removeChild(mask);
              document.body.style.overflow = '';
            }
            document.removeEventListener('keydown', escListener);
          }

          // 点击遮罩关闭
          mask.addEventListener('click', closeModal);
          // 阻止点击代码块本身冒泡
          modal.addEventListener('click', function(e) {
            e.stopPropagation();
          });
          // Esc 键关闭
          function escListener(e) {
            if (e.key === 'Escape') closeModal();
          }
          document.addEventListener('keydown', escListener);
          // 自动聚焦弹窗，便于键盘操作
          setTimeout(() => { modal.focus && modal.focus(); }, 10);
        });
      });
    }
}

window.addEventListener('hexo-blog-decrypt', handleHexoBlogDecryptEvent);