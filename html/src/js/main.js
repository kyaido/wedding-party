var $;
window.jQuery = $ = require('jquery');
var backstretch = require('jquery-backstretch');

$(function() {
  $('.js-backstretch').backstretch([
    'img/pic_header_01.jpg',
    'img/pic_header_02.jpg',
    'img/pic_header_03.jpg',
    'img/pic_header_04.jpg',
    'img/pic_header_05.jpg',
    'img/pic_header_06.jpg',
  ], {duration: 4000, fade: 1000});
});