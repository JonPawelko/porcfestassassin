var CONFIRM_GO_LIVE = 1;
var CONFIRM_REBUY = 2;
var CONFIRM_TAKE_BREAK = 3;
var CONFIRM_RETURN_BREAK = 4;
var CONFIRM_QUIT = 5;
var CONFIRM_REMOVE_PHONE = 6;
var CONFIRM_FORCE_SHIFT = 7;
var CONFIRM_BOMB = 8;

//
// document.addEventListener("keypress", function(event) {
// 	console.log("Key pressed");
// });

// Shift-L on any page logs out User
addEventListener('keydown', function (event) {
    if (event.shiftKey && event.code === 'KeyL') {
        window.location.href = '/logout';
    }
});

// -------------------------------------------

  function waitCursor()
  {
    document.body.style.cursor = 'wait';
    return true;
  }


  // -------------------------------------------

    function defaultCursor()
    {
      document.body.style.cursor = 'default';
      return true;
    }

// -------------------------------------------

  function confirmChoice(confirmCode)
  {
      var message;

      console.log("Got into confirmChoice");

      switch (confirmCode) {
        case CONFIRM_GO_LIVE:
              message = "Are you sure you want to try to go Live?";
          break;

        case CONFIRM_REBUY:
              message = "Are you sure you want to Rebuy?";
          break;

        case CONFIRM_TAKE_BREAK:
              message = "Are you sure you want to take a Break?";
          break;

        case CONFIRM_RETURN_BREAK:
              message = "Are you sure you want to return from Break?";
          break;

        case CONFIRM_QUIT:
              message = "Are you sure you want to Quit the game?";
          break;

        case CONFIRM_REMOVE_PHONE:
              message = "Are you sure you want to remove your phone number?";
          break;

        case CONFIRM_FORCE_SHIFT:
              message = "Are you sure you want to force shift changes?";
          break;

        case CONFIRM_BOMB:
              message = "Are you sure you want to drop a Bomb?";
          break;

        default:

      }
      // console.log(confirmCode);
      return confirm(message);
  }

  // -------------------------------------------

  function confirmAdminMessageSize()
  {
      console.log("Got into confirmAdminMessageSize");

      var message = document.forms["contactAdminForm"]["message"].value;

      if (message.length > 100)   // max message len is 100
      {
          alert("Your message is too long.");
          return false;
      }
      else
      {
        return true;
      }

  }

  // -------------------------------------------

    function confirmInt(num)
    {
        return Number.isInteger(num);
    }
