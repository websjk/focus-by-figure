window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    function animate(offset) { //创建一个动作函数带一个参数offset(这个参数就是向左或右移动时的位移增加或减少多少px)
    	var newLeft = parseInt(list.style.left) + offset;
    	list.style.left = newLeft + 'px';
    	//if(newLeft > -600){
    	//	newLeft = -3000 + 'px';
    	}
    
    next.onclick = function() {
        animate(-600);  //当点击右箭头时调用之前创建的动作函数，并传入参数offset（600），left的位移就多了600px
    }
    prev.onclick = function(){
    	animate(600);  //同上原理，但是位移是减少了600px
    }

}