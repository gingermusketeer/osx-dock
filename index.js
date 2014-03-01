'use strict';

var osxDefaults = require('osx-defaults');
var killall = require('killall');

var DOMAIN = 'com.apple.dock';

function setDockConfigValue(key, value, callback){
  osxDefaults.set(DOMAIN, key, value, callback);
}

module.exports = {
  clear: function clear(callback){
    // Prevent launchpad from reappearing
    
    setDockConfigValue('checked-for-launchpad', 1, function(err){
      if(err){
        callback(err);
      } else {
        // Remove all the pinned icons
        setDockConfigValue('persistent-apps', '()', callback);
      }
    });
  },
  // Useful to force the dock to pickup any changes that have been made
  restart: function restartDock(callback){
    killall('Dock', callback);
  },

  autohide: function autohide(callback){
    setDockConfigValue('autohide', 1, callback);
  },
  // Remove the 3d effect to make the dock look simpler (2d)
  removeGlass: function removeGlass(callback){
    setDockConfigValue('no-glass', 1, callback);
  },

  dimHiddenApps: function dimHiddenApps(callback){
    setDockConfigValue('showhidden', 1, callback);
  },

  hideIndicatorLights: function hideIndicatorLights(callback){
    setDockConfigValue('show-process-indicators', 0, callback);
  },
  setIconSize: function setIconSize(value, callback){
    setDockConfigValue('tilesize', value, callback);
  },
  // Where on the configured edge the dock should sit
  // PinPosition can be one of 'start', 'middle', or 'end'
  setPinPosition: function setPinPosition(pinPosition, callback){
    setDockConfigValue('pinning', pinPosition, callback);
  },
  // The edge where the dock should appear
  // edgePosition can be one of 'bottom', 'top', 'right', or 'left'
  setPosition: function setPosition(edgePosition, callback){
    setDockConfigValue('orientation', edgePosition, callback);
  }
};