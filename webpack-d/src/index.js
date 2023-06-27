import $ from 'jquery'

import './index.css'
import './index.less'


import img from './img/ethical declarations.jpg'
$('.newImg').attr('src', img)

$(function () {
  // 加點注釋
  $('li:odd').css('background-color', 'red')

  $('li:even').css('background-color', 'green')

})

function info (target) {
  target.info = 'info'
}

@info
class Person {

}

console.log(Person.info)