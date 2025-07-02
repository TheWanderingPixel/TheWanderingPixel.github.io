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
}

window.addEventListener('hexo-blog-decrypt', handleHexoBlogDecryptEvent);