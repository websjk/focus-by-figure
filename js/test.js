window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 0; //小圆点对方图片的张数,节点是从0开始的
    var len = 4;  //有几个小圆按钮（从0开始）
    var animated = false; //存放运行状态，就是图片是否在滑动中，默认为false
    var interval = 3000;
    var timer;

    function animate(offset) { //创建一个动作函数带一个参数offset(这个参数就是向左或右移动时的位移增加或减少多少px)
        animated = true;
        var time = 300; //切换一张图片所用的位移时间
        var interval = 10; //time里面间隔多久位移一次
        var speed = offset / (time / interval); //  每次移动多少，(time/interval)这里求出的是移动的次数
        var newLeft = parseInt(list.style.left) + offset; //parseInt把字符串转为数字

        //创建位移时的缓慢滑动效果函数
        function go() {
            //if里面||左边判断是向左移时的满足条件，右边反之(向左移是负数，右移是正数)
            if ((speed < 0 && newLeft < parseInt(list.style.left)) || (speed > 0 && newLeft > parseInt(list.style.left))) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval); //每间隔interval毫秒调用执行一次go函数（递归），直到不满足if条件了执行else里面的
            } else { //
                list.style.left = newLeft + 'px'; //放if前面是为了后面轮动到最后一张时直接变成第一张时圆滑些(多出两张图的作用)
                if (newLeft > -600) {
                    list.style.left = -3000 + 'px';
                }
                if (newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
                animated = false;

            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index].className = 'on'; //当前小圆点加上高亮样式
    }

    next.onclick = function() {
        if (!animated) { //当不是滑动状态时运行
            if (index == len) {
                index = 0;
            } else {
                index += 1;
            }
            animate(-600); //当点击右箭头时调用之前创建的动作函数，并传入参数offset（-600），left的位移就多了-600px
            showButton();
        }

    }

    prev.onclick = function() {
        if (animated) { //第二种写法
            return;
        }
        if (index == 0) {
            index = len;
        } else {
            index -= 1;
        }
        animate(600);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (animated) {
                return;
            }
            if (this.className == 'on') { //防止点击当前按钮时继续执行下面的代码
                return;
            }
            var butIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (butIndex - index);
            index = butIndex;
            showButton();
            animate(offset);
        }
    }

    function play() {
        timer = setTimeout(function() {
            next.onclick();
            play();
        }, interval);
    }
    play();

    function stop(){
        clearTimeout(timer);
    }

    container.onmouseover = stop;
    container.onmouseout = play;

}
