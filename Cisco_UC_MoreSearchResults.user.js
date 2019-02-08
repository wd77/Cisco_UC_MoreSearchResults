// ==UserScript==
// @name         Cisco_UC_MoreSearchResults
// @namespace    http://wd77.de/
// @version      2019.02.1
// @description  Changes your Cisco CUCM Admin Search to display more results
// @author       Werner Drasch <werner.drasch@wd77.de>
// @supportURL   https://github.com/wd77/userscripts/issues
// @match        http*://IP_OR_FQDN_OF_CALLMANAGER/ccmadmin/*
// @grant        none
// ==/UserScript==
var iWantXRows = '150';
(function() {
    'use strict';
    var weChangedIt=false;
    var curUrl=window.location.href
    //console.log(curUrl);
    var isFindList=curUrl.toString().search('FindList.do');
    //console.log('isFindList, further analysis needed');
    if ( isFindList > 0 ) {
        var hasOtherUriParts=curUrl.search('\\?');
        //console.log('hasOtherUriParts');
        if (hasOtherUriParts > 0) {
          var URIParts = curUrl.toString().split('?');
          var baseUri=URIParts[0];
          var otherParts=URIParts[1].split('&');
          var rowsFound=false;
            for ( var i=0;i<otherParts.length;i++) {
              if (otherParts[i].search('rowsPerPage')>0) {
                  otherParts[i]='rowsPerPage='+iWantXRows;
                  rowsFound=true;
              }
            }
          if (rowsFound=false) {
              otherParts.append('rowsPerPage='+iWantXRows);
          }
          var modParts=otherParts.join('&');
          var modUri=baseUri+'?'+modParts;
          //console.log(URIParts);
        } else {
          window.location.href=curUrl+'?rowsPerPage='+iWantXRows;
          weChangedIt=true;
        }
    }

})();
