$(function(){

  // 時間表示
  function time() {
    var now = new Date();
    var now_y = now.getFullYear();
    var now_m = now.getMonth() + 1;
    var now_d = now.getDate();
    var now_w = now.getDay();
    var now_wd = ["日", "月", "火", "水", "木", "金", "土"];
    var now_h = now.getHours();
    var now_mi = now.getMinutes();
    var now_s = now.getSeconds();
    $(".date").text(now_y + "年" + now_m + "月" + now_d + "日" + "(" + now_wd[now_w] + ")");
    $(".time").text(now_h + "時" + now_mi + "分" + now_s + "秒");
    $(".convey-time").text(now_y*10000000000 + now_m*100000000 + now_d*1000000 + now_h*10000 + now_mi*100 + now_s)

    // 今日の日付
    var date = now.setHours(now_h - 5);
    var date = new Date(date);
    var date_y = now.getFullYear();
    var date_m = now.getMonth() + 1;
    var date_d = now.getDate();
    $(".convey-date").text(date_y*10000 + date_m*100 + date_d);
   };

  time();

  setInterval(function(){
    time();
  }, 1000);



  // todo 期限計算
  function todoTime(i) {
    var unit = $(".todo-unit").eq(i);
    var bydate_on = unit.find(".convey-bydate-on").text()*1;
    if (bydate_on == 1) {
      var bydate_y = unit.find(".convey-bydate-1").text()*1;
      var bydate_m = unit.find(".convey-bydate-2").text()*1 - 1;
      var bydate_d = unit.find(".convey-bydate-3").text()*1;
      var bydate_h = unit.find(".convey-bydate-4").text()*1;
      var bydate_mi = unit.find(".convey-bydate-5").text()*1;
      var bydate = new Date(bydate_y, bydate_m, bydate_d, bydate_h, bydate_mi);

      var rest = bydate.getTime() - new Date().getTime();
      var rest_mi = Math.floor(rest / 1000 / 60);
      var rest_h = Math.floor(rest_mi / 60);
      var rest_d = Math.floor(rest_h / 24);
      if (rest_mi >= 0) {
        if (rest_d == 0) {
          if (rest_h == 0) {
            unit.find(".todo-rest").text("あと" + rest_mi  + "分");
            unit.find(".todo-rest").addClass("todo-status-2");
          }
          else {
            unit.find(".todo-rest").text("あと" + rest_h  + "時間");
            unit.find(".todo-rest").addClass("todo-status-1");
          }
        }
        else {
          unit.find(".todo-rest").text("あと" + rest_d  + "日");
        }
      } else {
        unit.find(".todo-rest").text("期限切れ");
        unit.find(".todo-rest").addClass("todo-status-3");
      }

    }


  };

  var todoCount = $(".convey-todo-count").text()*1;
  for (var i=0; i<todoCount; i++) {
    todoTime(i);
  }

  // 自動ログアウト
  function logoutTimer() {
    var loginTime = $(".convey-login-time").text().replace(/\r?\n/g, '').trim();
    var nowTime = $(".convey-date").text().replace(/\r?\n/g, '').trim();
    if (loginTime != nowTime && loginTime != "") {
      $.ajax({
        type: 'DELETE',
        url: '/logout'
      })
    }
  };



  setInterval(function(){
    for (var i=0; i<todoCount; i++) {
      todoTime(i);
      logoutTimer();
    }
  }, 60000);

  // todo shopping wanna 編集ボタン
  $(".todo-btn, .shopping-btn, .wanna-btn").click(function(){
    var box = $(this).parents(".box");
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      box.find(".add").hide();
      box.find(".icon").text("・");
    }
    else {
      $(this).addClass("active");
      box.find(".add").show();
      box.find(".icon").html('<i class="fas fa-minus-circle"></i>');
      if ($(this).hasClass("todo-btn")) {
        $("#todo-add-value").focus();
      } else if ($(this).hasClass("shopping-btn")) {
        $("#shopping-add-value").focus();
      } else if ($(this).hasClass("wanna-btn")) {
        $("#wanna-add-value").focus();
      }
    }

  });

  // icon (todo, wanna, shopping)  hover
  $(".todo-icon, .wanna-icon, .shopping-icon").hover(function(){
    var btn = $(this).parents(".box").find(".btn");
    if (btn.hasClass("active")) {
      $(this).parent().css("border-bottom", "solid 1px #cccccc");
    }
  }, function(){
    $(this).parent().css("border-bottom", "solid 1px transparent");
  });

  //icon (goal) hover
  $(".goal-icon").hover(function(){
    var btns = $(".goal-achieve-btn, .goal-destroy-btn");
    if (btns.hasClass("active")) {
      $(this).parent().css("border-bottom", "solid 1px #cccccc");
    }

  }, function(){
    $(this).parent().css("border-bottom", "solid 1px transparent");
  });


  // achieve
  $(".todo-icon, .wanna-icon, .shopping-icon").click(function(){
    var btn = $(this).parents(".box").find(".btn");
    if (btn.hasClass("active")) {
      var Id = $(this).prev().text()*1;
      var input = $(this).parents(".box-main").find(".achieve-num");
      var form = input.parent();

      input.val(Id);
      form.submit();
    }
  });

  // todo add
  $("#todo-add-submit").click(function(){
    $("#todo-add-form").submit();
  });

  // 自動入力カット
  $(".add-form").attr('autocomplete', 'off');
  $("input").attr('autocomplete', 'off');

  // todo 今日中
  $(".bydate-today").click(function(){
    var time = $(".convey-time").text()*1;
    time = (Math.floor(time/1000000) + 1)*10000;
    $("#todo-add-bydate").val(time);
    var val = $("#todo-add-bydate").val();
    $("#todo-add-bydate").val("");
    $("#todo-add-bydate").focus().val(val);
  });

  // todo 明日中
  $(".bydate-tomorrow").click(function(){
    var time = $(".convey-time").text()*1;
    time = (Math.floor(time/1000000) + 2)*10000;
    $("#todo-add-bydate").val(time);
    var val = $("#todo-add-bydate").val();
    $("#todo-add-bydate").val("");
    $("#todo-add-bydate").focus().val(val);
  });

  // shopping add
  $("#shopping-add-submit").click(function(){
    $("#shopping-add-form").submit();
  });

  // wanna add
  $("#wanna-add-submit").click(function(){
    $("#wanna-add-form").submit();
  });

  // goal コメント表示
  $(".goal-comment-btn").click(function(){
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).next().fadeOut();
    } else {
      $(this).addClass("active");
      $(this).next().fadeIn();
      $(this).next().css("display", "inline-block");
    }
  });

  //goal 追加 ボタン
  $(".goal-add-btn").click(function(){
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".goal-add").hide();
    } else {
      $(this).addClass("active");
      $(".goal-add").show();
    }
  });

  // goal category ドロップダウン表示
  $(".goal-add-category").click(function(){
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(".goal-category-display-icon").html('<i class="fas fa-caret-down"></i>');
      $(".goal-category-display").css("border-bottom", "solid 1px #555555");
      $(".goal-category-dropdown").slideUp();
    } else {
      $(this).addClass("open");
      $(".goal-category-display-icon").html('<i class="fas fa-caret-up"></i>');
      $(".goal-category-display").css("border-bottom", "solid 1px #4160e1");
      $(".goal-category-dropdown").slideDown();
    }
  });

  // goal category ドロップダウン選択
  $(".goal-category-item").click(function(){
    var num = $(".goal-category-item").index(this);
    $("#goal-add-category").val(num);
    var text = $(this).text();
    $(".goal-category-display-main").text(text);
  });

  //goal add
  $("#goal-add-submit").click(function(){
    $("#goal-add-form").submit();
  });

  //goal 達成ボタン
  $(".goal-achieve-btn").click(function(){
    $(".goal-destroy-btn").removeClass("active");
    if ($(this).hasClass("active")) {
      $(this).removeClass("active")
      $(".goal-icon-nomal").show();
      $(".goal-icon-achieve").hide();
    } else {
      $(this).addClass("active");
      $(".goal-icon-achieve").show();
      $(".goal-icon-nomal").hide();
      $(".goal-icon-destroy").hide();
    }
  });

  //goal 削除ボタン
  $(".goal-destroy-btn").click(function(){
    $(".goal-achieve-btn").removeClass("active");
    if ($(this).hasClass("active")) {
      $(this).removeClass("active")
      $(".goal-icon-nomal").show();
      $(".goal-icon-destroy").hide();
    } else {
      $(this).addClass("active");
      $(".goal-icon-destroy").show();
      $(".goal-icon-nomal").hide();
      $(".goal-icon-achieve").hide();
    }
  });

  // goal 表示のオンオフ
  function goalSwich(i) {
    var btn = $(".goal-swich-btn");
    var unit = $(".goal").find(".unit").eq(i)
    var  num = unit.find(".goal-date-swich").text()*1;

    if (btn.hasClass("active")) {
      unit.show();
    } else {
      if (num == 1) {
        unit.hide();
      }
    }
  };

    // 最初の表示
  var goalCount = $(".convey-goal-count").text()*1;
  for (var i=0; i<goalCount; i++) {
    goalSwich(i);
  }

  // goal 表示ボタン
  $(".goal-swich-btn").click(function(){
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
    }
    for (var i=0; i<goalCount; i++) {
      goalSwich(i);
    }
  });

  // goal 達成モーダル
  $(".goal-icon-achieve").click(function(){
    var text = $(this).parent().next().text().replace(/\r?\n/g, '').trim();
    var num = $(this).parent().prev().text()*1;
    var date = $(".convey-date").text()*1;
    $(".goal-achieve-value").text(text);
    $("#goal-achieve-num").val(num);
    $("#goal-achieve-date").val(date);
    $(".modal, .modal-close").fadeIn();
    $("#goal-achieve-comment").focus();
  });

  // モーダルとじる
  $(".modal-close").click(function(){
    $(".modal, .modal-close").fadeOut();
  });

  // goal achieve
  $(".goal-achieve-submit").click(function(){
    $("#goal-achieve-form").submit();
  });

  // dairy 年クリック 月の表示 月クリック　日の表示
  $(".dairy-year-title, .dairy-month-title").click(function(){
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).next().children().fadeOut();
    } else {
      $(this).addClass("open");
      $(this).next().children().fadeIn();
    }
  });

  // dairy new 日付自動入力
  function dairyDate() {
    var date = $(".convey-date").text()*1;
    var year = Math.floor(date/10000);
    var month = Math.floor((date - year * 10000)/100);
    var day = Math.floor(date -year * 10000 - month * 100);
    $("#dairy-new-year").val(year);
    $("#dairy-new-month").val(month);
    $("#dairy-new-day").val(day);
  }

  dairyDate()

  // dairy create
  $("#dairy-new-submit").click(function(){
    $("#dairy-new-form").submit();
  });

  // daiery edit
  $("#dairy-edit-submit").click(function(){
    $("#dairy-edit-form").submit();
  });

  // login モーダル削除
  $(".login-modal").click(function(){
    $(this).hide();
  });

  // login スタート
  var loginArray = [];
  $(".login-sentence").find("span").click(function(){
    var text = $(this).attr("class");
    if (loginArray.length <= 8) {
      loginArray.push(text);
    }
    var sentencePass = "";
    for (var i=0; i<loginArray.length; i++) {
      sentencePass = sentencePass + loginArray[i];
    }
    if (sentencePass == "login") {
      $(".login-hover").fadeIn();
      $("#login-password").fadeIn();
    }
  });

  // login hover
  var loginHoverArray = [];
  $(".login-hover-box").hover(function(){
    $(this).css("background-color", "#555555");
    var key = $(this).attr("data-hover");
    loginHoverArray.push(key);
  },function(){
    $(this).css("background-color", "#aaaaaa")
  })

  // login hover リセット
  $(".login-sentence").find(".a").click(function(){
    $(".login-hover-box").css("background-color", "#ffffff");
    loginHoverArray = [];
    $("#login-hover").val("");
  });

  // login hover val
  $(".login-sentence").find(".k").click(function(){
    var loginHover = "";
    for (var i=0; i<loginHoverArray.length; i++) {
      loginHover = loginHover + loginHoverArray[i];
    }
    $("#login-hover").val(loginHover);
  });

  // login fucus
  $(".login-hover-box").click(function(){
    if ($(this).attr("data-hover") == "z") {
      $("#login-password").focus();
    } else if ($(this).attr("data-hover") == "6") {
      var time = $(".convey-date").text().replace(/\r?\n/g, '').trim();
      $("#login-time").val(time);
      $("#login-form").submit();
    } else {
      $(".login-hover").val("d");
    }
  });










});
