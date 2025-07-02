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
}

window.addEventListener('hexo-blog-decrypt', handleHexoBlogDecryptEvent);