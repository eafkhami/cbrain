<%-
#
# CBRAIN Project
#
# Copyright (C) 2008-2012
# The Royal Institution for the Advancement of Learning
# McGill University
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
-%>

$(document).ready(function() {

    "use strict";

    var div_id="";

    $( ".external_highjacker_submit_button" ).click(function() {
      var form = $("#userfile_table_form");
      $("#" + div_id).appendTo(form);
      $(".file-action").dialog('close');
    });


    $(".file-action").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind", close : function(){toggleMenuOff();}
  });


    $(".context-menu__link").click(function(){
      div_id = "dialog-" + this.id;
      $("#" + div_id).dialog("open");

      return false;
    })

  /**
  * Function to check if we clicked inside an element with a particular class
  * name.
  *
  * @param {Object} e The event
  * @param {String} className The class name to check against
  * @return {Boolean}
  */
  function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;

    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }

    return false;
  }

  /**
  * Gets exact position of event.
  *
  * @param {Object} e The event passed in
  * @return {Object} Returns the x and y position
  */
  function getPosition(e) {

    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }


    return {
      x: posx,
      y: posy
    }

  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // C O R E    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
  * Variables.
  */
  //var contextMenuClassName = "context-menu";
  //var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";

  var operationItemClassName = "dt-sel-row";
  var operationItemInContext;

  var clickCoords;

  var menu = document.querySelector("#context-menu");
  //var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;

  /**
  * Initialise our application's code.
  */
  function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
  }

  /**
  * Listens for contextmenu events.
  */
  function contextListener() {
    document.addEventListener( "contextmenu", function(e) {
      operationItemInContext = clickInsideElement( e, operationItemClassName );


      if ( operationItemInContext ) {
        e.preventDefault();
        toggleMenuOn();
        positionMenu(e);
      } else {
        operationItemInContext = null;
        toggleMenuOff();
      }
    });
  }

  /**
  * Listens for click events.
  */
  function clickListener() {
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

      if ( clickeElIsLink ) {
        e.preventDefault();
        toggleMenuOff();
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          toggleMenuOff();
        }
      }
    });
  }

  /**
  * Listens for keyup events.
  */
  function keyupListener() {
    window.onkeyup = function(e) {
      if ( e.keyCode === 27 ) {
        toggleMenuOff();
      }
    }
  }

  /**
  * Window resize event listener
  */
  function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff();
    };
  }

  /**
  * Turns the custom context menu on.
  */
  function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add( contextMenuActive );
    }
  }

  /**
  * Turns the custom context menu off.
  */
  function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
  }

  /**
  * Positions the menu properly.
  *
  * @param {Object} e The event
  */
  function positionMenu(e) {
    clickCoords = getPosition(e);
    menu.style.left = clickCoords.x + "px";
    menu.style.top = clickCoords.y + "px";
  }


  /**
  * Run the app.
  */
  init();

});
