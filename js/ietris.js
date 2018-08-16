// 10 * 20

var table = document.getElementById("board"); //整个table表格
var previewTable = document.getElementById("previewBoard"); //预览table表格
//初始化 10 * 20 二维数组 0代表无方块 1代表在移动的  2代表底部固定的
var board = new Array(20);   
        for(var i = 0;i < 20;i++){   
            board[i] = new Array(10);   
            for(var j = 0; j < 10; j++){    
                board[i][j] = 0;    
            }  
        }   

var previewboard = new Array(4);   
        for(var i = 0;i < 5;i++){   
            previewboard[i] = new Array(4);   
            for(var j = 0; j < 5; j++){    
                previewboard[i][j] = 0;    
            }  
        }   
var score = 0;         //分数
var scorePrint = document.getElementById("printScore"); //分数显示
var downSpeed = 1000;  //向下移动速度 1000 ms
//移动许可
var left,right,bottom,topFlag;
left = right = bottom = false;
topFlag = true;

var jShape = 0; //方块原点j
var iShape = 0; //方块原点i

//7种方块
var ii = new Array(4);         
var ll = new Array(4);         
var lr = new Array(4);         
var o = new Array(4);         
var zl = new Array(4);         
var zr = new Array(4);         
var t = new Array(4);
var numShape = 1; //单双数控制
var nextShape = new Array(4);  //记住当前方块
var tempShape = new Array(4);  //记住当前方块

tempShape[0] = {x:0, y:0};    
tempShape[1] = {x:0, y:0};    
tempShape[2] = {x:0, y:0};    
tempShape[3] = {x:0, y:0};

nextShape[0] = {x:0, y:0};    
nextShape[1] = {x:0, y:0};    
nextShape[2] = {x:0, y:0};    
nextShape[3] = {x:0, y:0};

ii[0] = {x:-2, y:0};    
ii[1] = {x:-1, y:0};    
ii[2] = {x:0, y:0};    
ii[3] = {x:1, y:0};

ll[0] = {x:0, y:1};    
ll[1] = {x:0, y:0};    
ll[2] = {x:-1, y:-1};    
ll[3] = {x:0, y:-1};

lr[0] = {x:0, y:1};    
lr[1] = {x:0, y:0};    
lr[2] = {x:0, y:-1};    
lr[3] = {x:1, y:-1};

o[0] = {x:-1, y:1};    
o[1] = {x:0, y:1};    
o[2] = {x:-1, y:0};    
o[3] = {x:0, y:0};

zl[0] = {x:-1, y:1};    
zl[1] = {x:0, y:1};    
zl[2] = {x:0, y:0};    
zl[3] = {x:1, y:0};

zr[0] = {x:0, y:1};    
zr[1] = {x:1, y:1};    
zr[2] = {x:-1, y:0};    
zr[3] = {x:0, y:0};

t[0] = {x:0, y:1};    
t[1] = {x:-1, y:0};    
t[2] = {x:0, y:0};    
t[3] = {x:1, y:0};

var doFlag = false; //true 开始 false 停止
var startNum = true;//第一次点击开始初始化一个方块

//开始按钮
function start(){
    doFlag = true;
    //执行一次
    if(startNum){
        undateTable(tempShape = creatShape());
        nextShape = creatShape();
        startNum = false;
    }
}
//暂停按钮
function stop(){
    doFlag = false;
}
//重新开始
function newStart(){
    location.reload();
}

//循环刷新执行函数
setInterval(function(){
    if(doFlag){
      print();
      makePreview()
      check();
      checkGame();  
    }
    },10);

//循环向下函数
setInterval(function(){
    if(doFlag){
        checkDown();
        moveShape("b");
    }
    },downSpeed);

//游戏结束检测
function checkGame(){
    if(board[0][4] == 2){
        doFlag = false;
        alert("游戏结束！您的分数：" + score);
    }
}

//边界检测
function check(){
    //1、左边界
    var lf = true;
    //检测第一列左边界
    for(var i = 0; i < 20 ;i++){
        if(board[i][0] == 1)
            lf = false;
    }
    //检测是否触碰左侧已存在块
    for(var i = 0; i < 20 ;i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1 && board[i][j - 1] == 2){
                lf = false;
            }
        }    
    }
    if(lf)
        left = true;
    else
        left = false;
    //2、右边界
    var rf = true;
    //检测第十列右侧边界
    for(var i = 0; i < 20 ;i++){
        if(board[i][9] == 1)
            rf = false;
    }
    // 检测是否触碰右侧已存在块
    for(var i = 0; i < 20 ;i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1 && board[i][j + 1] == 2){
                rf = false;
            }
        }    
    }
    if(rf)
        right = true;
    else
        right = false;
}

//检查向下移动: 此处需要与向下移动周期同步以实现触底可以左右移动，所以需单独一个方法
function checkDown(){
    //3、下边界
    var bf = true;
    //底20行边界
    for(var i = 0; i < 10 ;i++){
        if(board[19][i] == 1){
            bf = false;
            //1 ——> 2 触底后当前方块置2，表示不可移动
            oneToTwo();
            undateTable(tempShape = nextShape); //触底后产生新方块
            nextShape = creatShape();
        }   
    }
    //本方块底部是否触碰到已存在块
    for(var i = 0; i < 20 ;i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1 && board[i + 1][j] == 2){
                bf = false;
                //1 ——> 2 触底后当前方块置2，表示不可移动
                oneToTwo();
                undateTable(tempShape = nextShape); //触底后产生新方块
                nextShape = creatShape();
            }
        }    
    }
    if(bf)
        bottom = true;
    else
        bottom = false;
}

//1置2 可移动方块变为不可以动方块
function oneToTwo(){
    for(var i = 19; i >= 0; i--){
        for(var j = 19; j >= 0; j--){
            if(board[i][j] == 1){
                    board[i][j] = 2;
            } 
        }
    }
}

//检测键盘
document.onkeydown = function(ev){
    var oEvent = ev || event;
    var keyCode = oEvent.keyCode;
    switch(keyCode){
        case 37:{
            if(left){
                moveShape("l");
                // jShape--; //左移方块原点坐标自减
            }break;
        }
        case 38:{
            checkTop();
            if(topFlag){
                rotateShape(tempShape);
                makeShape(tempShape,iShape,jShape); 
            }
            break;
        }
        case 39:{
            if(right){
                moveShape("r");
                // jShape++; //右移方块原点坐标自加
            }break;
        }
        case 40:{
            checkDown();
            if(bottom){
                moveShape("b");
            } break;
        }
    }
}

//top变形检查
function checkTop(){
    topFlag = true;
    switch(tempShape){
        case ii:{
            if(jShape <= 1 || jShape >= 9)
                topFlag = false;
            break;
        }
        case o:{
            topFlag = false;
            break;
        }
        default:{
            if(jShape <= 0 || jShape >= 9)
                topFlag = false;
            break;
        }
    }
}

//top变形 函数功能：根据传入的方块种类和方块中心坐标，在坐标位置刷新出相应方块,并将此前的为1的可移动方块置0消除
function makeShape(cShape,is,js){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j]  == 1)
                board[i][j] = 0;
        }
    }
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            for(var k = 0;k < 4; k++){
                if(cShape[k].x + js == j && -cShape[k].y + is  == i){
                    board[i][j] = 1;
                }
            }
        }
    }
}

//根据方块原点逆时针90度旋转当前方块标准坐标,(x,y) => (-y,x)
function rotateShape(thisShape){
    var temp;
    for(var i = 0; i < 4; i++){
        temp = thisShape[i].x;
        thisShape[i].x = -thisShape[i].y;
        thisShape[i].y = temp;
    }
}

//左、右、下移动方块
function moveShape(target){
    switch(target){
        case 'l':{
            jShape--;
            makeShape(tempShape,iShape,jShape);
            break;
        }
        case 'r':{
            jShape++;
            makeShape(tempShape,iShape,jShape);
            break;
        }
        case 'b':{
            iShape++;
            makeShape(tempShape,iShape,jShape); 
            break;
        }
    }
}

//绘制界面
function print(){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1){
                table.rows[i].cells[j].style.backgroundColor = "red"; 
            }
            if(board[i][j] == 0){
                table.rows[i].cells[j].style.backgroundColor = "#FFF"; 
            }
                
        }
    }
}

//根据生成方块种类更新出生方块
function undateTable(cShape){
    checkScore();
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            for(var k = 0;k < 4; k++){
                if(cShape[k].x + 4 == j && -cShape[k].y + 1  == i){
                    board[i][j] = 1;
                    if(cShape[k].x == 0 && cShape[k].y == 0){
                        iShape = i;
                        jShape = j;
                    }//记住原点坐标，正常为（1,4）
                }
            }
        }
    }
}

//得分检测、消除得分行
function checkScore(){
    var scoreFlag = true;
    for(var i = 19; i >= 0; i--){
        scoreFlag = 1;
        for(var j = 0; j < 10; j++){
            if(board[i][j] != 2){
                scoreFlag = false;
            }
        }
        if (scoreFlag){
            //的分行消除
            for(var j = 0; j < 10; j++){
                board[i][j] = 0;
            }
            //i - 1 行下移一行
            for(var i1 = i; i1 > 0; i1--){
                for(var j1 = 0; j1 < 10; j1++){
                    board[i1][j1] = board[i1 - 1][j1];
                }
            }
            score+=10;
            scorePrint.innerText = "分数：" + score;
            i++;//下移后i行变化需重新检查一次
        }
    }
    scoreFlag = false;
}

//随机生成方块 返回种类
function creatShape(){
    var num = (Math.floor(Math.random()*20)+1)%7;    
            switch(num){  
                case 0:{    
                    return ii;      
                }    
                case 1:{    
                    return  ll;       
                }    
                case 2:{    
                    return  lr;      
                }    
                case 3:{    
                    return o;      
                }    
                case 4:{    
                    return zl;      
                }    
                case 5:{    
                    return zr;      
                }    
                case 6:{    
                    return t;     
                }   
            }
}

//预览界面生成
function makePreview(){
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            previewboard[i][j] = 0;
            for(var k = 0;k < 4; k++){
                if(nextShape[k].x + 2 == j && -nextShape[k].y + 2  == i){
                    previewboard[i][j] = 1;
                }
            }
        }
    }
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(previewboard[i][j] == 1){
                previewTable.rows[i].cells[j].style.backgroundColor = "red"; 
            }
            else{
                previewTable.rows[i].cells[j].style.backgroundColor = "#FFF"; 
            }
                
        }
    }
}