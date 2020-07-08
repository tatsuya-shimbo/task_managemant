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


  setInterval(function(){
    for (var i=0; i<todoCount; i++) {
      todoTime(i);
    }
  }, 60000);

  // todo 編集ボタン
  $(".todo-btn").click(function(){
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".todo-add").hide();
      $(".todo-btn").css("color", "#aaaaaa");
      $(".todo-btn").css("background-color", "transparent");
      $(".todo-icon").text("・");
      $(".todo-icon").removeClass("todo-icon-active");
    }
    else {
      $(this).addClass("active");
      $(".todo-add").show();
      $(".todo-btn").css("color", "#ffffff");
      $(".todo-btn").css("background-color", "#000000");
      $(".todo-icon").html('<i class="fas fa-minus-circle"></i>');
      $(".todo-icon").addClass("todo-icon-active");
      $("#add-value").focus();
    }

  });

  // todo hover
  $(".todo-icon").hover(function(){
    if ($(".todo-btn").hasClass("active")) {
      $(this).parent().css("border-bottom", "solid 1px #cccccc");
    }
  }, function(){
    $(this).parent().css("border-bottom", "solid 1px transparent");
  });

  // todo achieve
  $(".todo-icon").click(function(){
    if ($(".todo-btn").hasClass("active")) {
      var todoId = $(this).prev().text()*1;
      $("#achieve-num").val(todoId);
      $("#achieve-form").submit();
    }
  });

  // todo add
  $("#todo-achieve-submit").click(function(){
    $("#add-form").submit();
  });

  // 自動入力カット
  $(".add-form").attr('autocomplete', 'off');

  // todo 今日中
  $(".bydate-today").click(function(){
    var time = $(".convey-time").text()*1;
    time = (Math.floor(time/1000000) + 1)*10000;
    $("#add-bydate").val(time);
    var val = $("#add-bydate").val();
    $("#add-bydate").val("");
    $("#add-bydate").focus().val(val);
  });

  $(".bydate-tomorrow").click(function(){
    var time = $(".convey-time").text()*1;
    time = (Math.floor(time/1000000) + 2)*10000;
    $("#add-bydate").val(time);
    var val = $("#add-bydate").val();
    $("#add-bydate").val("");
    $("#add-bydate").focus().val(val);
  });






});