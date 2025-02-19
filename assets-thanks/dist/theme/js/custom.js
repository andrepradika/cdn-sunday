$(document).ready(function () {
  var cursor = $(".cursor");

  $(document).on("mousemove", function (e) {
    var overTarget = $(e.target);
    cursor.stop(true).css({
      transform: `translate(${e.pageX}px, ${e.pageY}px)`,
      opacity: 0,
    });
    if (overTarget.css("cursor") === "pointer") {
      cursor.stop(true).css({
        opacity: 1,
      });
    }
  });

  $(".radioField input").on("click", function () {
    setTimeout(function () {
      $(".result").empty();

      $(".radioField input").each(function () {
        let value = $(this).val();
        let isChecked = $(this).is(":checked");

        // Append to the result div
        if (isChecked) {
          $(".result").append(`
        <div class="option checked">
          <span><i class="fa-solid fa-circle-check"></i>${value}</span>
          <span>50%</span>
        </div>
      `);
        } else {
          $(".result").append(`
        <div class="option">
          <span>${value}</span>
          <span>0%</span>
        </div>
      `);
        }
      });
      $(".options").remove();
    }, 1000);
  });

  // next prev
  var divs = $(".show-section fieldset");
  var now = 0;
  divs.hide().first().show();

  function next() {
    divs.eq(now).hide();
    now = now + 1 < divs.length ? now + 1 : 0;
    divs.eq(now).show(); // show next
    console.log(now);
  }
  $("#step1 .radioField").on("click", function () {
    setTimeout(function () {
      next();
    }, 500);
  });

  // check last step
  $("#sub").on("click", function () {
    var dataString = new FormData(document.getElementById("steps"));

    // console.log(dataString);

    // send form to send.php
    $.ajax({
      type: "POST",
      url: "dist/form handling/send.php",
      data: dataString,
      processData: false,
      contentType: false,
      success: function (data, status) {
        $("#sub").html("Success!");
      },
      error: function (data, status) {
        $("#sub").html("failed!");
      },
    });
  });
});
