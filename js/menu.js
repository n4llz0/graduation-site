// ハンバーガーメニュー
$(function(){
  const $hamburger = $('.hamburger_menu');
  const $nav = $('.nav-overlay');

  function closeOverlay() {
    $hamburger.removeClass('active').attr('aria-expanded', false);
    $nav.removeClass('active').attr('aria-hidden', true);
    $('body').css('overflow', '');
  }

  $hamburger.on('click', function () {
    $(this).toggleClass('active');
    $nav.toggleClass('active');

    const isOpen = $(this).hasClass('active');
    $(this).attr('aria-expanded', isOpen);
    $nav.attr('aria-hidden', !isOpen);
    $('body').css('overflow', isOpen ? 'hidden' : '');
  });

  // オーバーレイ内リンクを押したら閉じる（同ページ内）
  $nav.on('click', 'a', function () {
    const href = $(this).attr('href');
    if (href && href.startsWith('#')) {
      closeOverlay();
    }
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $nav.hasClass('active')) {
      closeOverlay();
    }
  });

  // 背景クリックで閉じる
  $nav.on('click', function (e) {
    if (!$(e.target).closest('.nav-overlay__content').length) {
      $hamburger.removeClass('active').attr('aria-expanded', false);
      $nav.removeClass('active').attr('aria-hidden', true);
      $('body').css('overflow', '');
    }
  });
});

// タブ
$(function() {
  // タブのクリック処理
  $('.tab-container ul li').on('click', function () {
    // ①全部のタブから selected を外す
    $('.tab-container ul li').removeClass('selected');
    // ②クリックされたタブだけ selected を付ける
    $(this).addClass('selected');
    // ③全部のコンテンツから selected を外す
    $('.tab-container .tab-content').removeClass('selected');
    // ④クリックされたタブの data-id を取得
    const targetId = $(this).data('id');
    // ⑤同じIDのコンテンツに selected を付ける
    $('#' + targetId).addClass('selected');
  });
});


// モーダル

$(function () { 
  // トリガー（アーティスト画像）
  var trigger = $('.artist-card');
  // レイヤー（黒背景）
  var layer = $('.modal-layer');
  // 閉じるボタン
  var close = $('.modal-close');

  // モーダルを開く
  trigger.on('click', function () {
    var modalId = $(this).data('modal');
    var targetModal = $('#' + modalId);

    targetModal.addClass('active');
    targetModal.find('.modal-inner').scrollTop(0);
    $('html, body').css('overflow', 'hidden');
  });

  // モーダルを閉じる（×ボタン・背景）
  layer.add(close).on('click', function () {
    $(this).closest('.modal-wrapper').removeClass('active');
    $('html, body').removeAttr('style');
  });

  // モーダル中身クリックで閉じない
  $('.modal-container').on('click', function (e) {
    e.stopPropagation();
  });
});


// ロード画面
$(function() {
    // ロード画面をフェードアウトさせる(0.5秒)
    $('#loading-screen').delay(500) 
                        .fadeOut('slow'); 
});


// カウントダウン
$(function () {
    // 目標日時：2026年2月11日 13:00
    var targetDate = new Date("2026-04-01T00:00:00+09:00");
    function updateCountdown() {
        var now = new Date();
        var diff = targetDate - now; // ミリ秒差
        if (diff <= 0) {
            $(".days").text("0 DAY");
            $(".time").text("00:00:00");
            return;
        }
        // 計算
        var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var mins  = Math.floor((diff / (1000 * 60)) % 60);
        var secs  = Math.floor((diff / 1000) % 60);
        // 桁揃え
        var hh = ("0" + hours).slice(-2);
        var mm = ("0" + mins).slice(-2);
        var ss = ("0" + secs).slice(-2);
        // HTMLに反映
        $(".days").text(days + " DAY");
        $(".time").text(hh + ":" + mm + ":" + ss);
    }
    // 1秒ごとに更新
    setInterval(updateCountdown, 1000);
    // 初期表示
    updateCountdown();
});

// h2アニメーション
$(window).on('scroll load', function () {
  $('.h2-scroll').each(function () {
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    const elemTop = $(this).offset().top;
    if (scroll > elemTop - windowHeight + 100) {
      $(this).addClass('is-show');
    }
  });
});


// ロゴフェードイン
$(function() {
  $(window).scroll(function (){
    $('.fadein').each(function(){
      var elemPos = $(this).offset().top,
      scroll = $(window).scrollTop(),
      windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 150){
        $(this).addClass('scrollin');
      }
    });
  });
});

// ページトップ
$(function(){
  const $pageTop = $('.page-top');
  // クリックでトップへ
  $pageTop.on('click', function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
  // スクロールで表示切替
  $(window).on('scroll', function(){
    if($(this).scrollTop() > 100){
      $pageTop.addClass('is-active');
    } else {
      $pageTop.removeClass('is-active');
    }
  });
});
