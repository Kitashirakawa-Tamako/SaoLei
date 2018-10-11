    // "use strict"


var mask = document.getElementById("mask")
var rank = "rank1"
var customX
var customY
var customN
var input1 = document.getElementById("input1")
var input2 = document.getElementById("input2")
var input3 = document.getElementById("input3")
input1.onblur = function () {
    if (input1.value%1!=0||input1.value<10||input1.value>20){
        input1.value = ""
    }
}
input2.onblur = function(){
    if (input2.value%1!=0||input2.value<10||input2.value>20){
        input2.value = ""
    }
}
input3.onblur = function(){
    if (input3.value%1!=0||input3.value<10||input3.value>225){
        input3.value = ""
    }
}
document.getElementById("restart").addEventListener("click",function () {
    if(rank == "rank1"){
        restart(9,9,10)
        rank = "rank1"
    }else if(rank == "rank2"){
        restart(16,16,20)
        rank = "rank2"
    }else if(rank == "rank3"){
        restart(20,20,100)
        rank = "rank3"
    }else if(rank == "rank4"){
        restart(customX,customY,customN)
        rank = "rank4"
    }
})
document.getElementById("rank1").addEventListener("click",function () {
    restart(9,9,10)
    rank = "rank1"
})

document.getElementById("rank2").addEventListener("click",function () {
    restart(16,16,20)
    rank = "rank2"
})

document.getElementById("rank3").addEventListener("click",function () {
    restart(20,20,100)
    rank = "rank3"
})

document.getElementById("rank4").addEventListener("click",function () {
    document.getElementById("pop").style.display = "block"
})

document.getElementById("yes").addEventListener("click",function () {
    customX = input1.value
    customY = input2.value
    customN = input3.value
    if(customX<10||customX>20||customY<10||customY>20){
        alert("请正确的输入宽高")
        return
    }
    if(customN>Math.floor((customX*customY)*0.5)){
        alert("雷数量太多了")
        return
    }
    restart(customX,customY,customN)
    rank = "rank4"
    document.getElementById("pop").style.display = "none"
})

function restart(X,Y,N){
    document.getElementById("table").removeChild(document.getElementById("table").childNodes[3])
    createTable(X,Y)
    game(X,Y,N)
}
//创建表格
window.onload = createTable(9,9)
function createTable(X,Y) {
    var table = document.getElementById("table")
    var tableNode = document.createElement("table")
    tableNode.style="background:#ccc;border-spacing:0px;display:inline-table;margin-top:20px"
    var tdNode_style="border: 3px solid #808080;border-left-color:#eee;border-top-color:#eee;width:20px;height:20px"
    for(let y=0;y<Y;y++){
        var trNode = tableNode.insertRow()
        for(let x=0;x<X;x++){
            var tdNode = trNode.insertCell()
            tdNode.classList.add("hover")
            tdNode.style=tdNode_style
        }
    }
    table.appendChild(tableNode)
    mask.style.height = tableNode.offsetHeight + "px"
    mask.style.top = tableNode.getBoundingClientRect().top + "px"
    mask.style.display = "none"
}
window.onload = game(9,9,10)
function game(X,Y,N) {
    var randomX
    var randomY
    var table
    var tr
    var td
    var clicked = false
    function firstClick(it) {
        for(let i=0;i<N;i++){
            select_td()
            function select_td(){
                randomX = Math.floor(Math.random()*X)
                randomY = Math.floor(Math.random()*Y)
                table = document.getElementsByTagName("tr")
                tr = table[randomY].childNodes
                td = tr[randomX]
            }
            test_td()
            function test_td() {
                if(td.classList.contains("lei")||td===it){
                    select_td()
                    test_td()
                }else{
                    td.classList.add("lei")
                }
            }
        }
        for(let i=0;i<Y;i++){
            tr = table[i].childNodes
            for (let j=0;j<X;j++){
                var num = 0
                td = tr[j]
                if (td.classList.contains("lei")==false){
                    if(i-1>=0&&j-1>=0){
                        let trFind = table[(i-1)].childNodes
                        let tdFind = trFind[(j-1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断左上
                    if(i-1>=0){
                        let trFind = table[(i-1)].childNodes
                        let tdFind = trFind[j]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断上
                    if(i-1>=0&&j+1<X){
                        let trFind = table[(i-1)].childNodes
                        let tdFind = trFind[(j+1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断右上
                    if(j-1>=0){
                        let trFind = table[i].childNodes
                        let tdFind = trFind[(j-1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断左
                    if(j+1<X){
                        let trFind = table[i].childNodes
                        let tdFind = trFind[(j+1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断右
                    if(i+1<Y&&j-1>=0){
                        let trFind = table[(i+1)].childNodes
                        let tdFind = trFind[(j-1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断左下
                    if(i+1<Y){
                        let trFind = table[(i+1)].childNodes
                        let tdFind = trFind[j]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断下
                    if(i+1<Y&&j+1<X){
                        let trFind = table[(i+1)].childNodes
                        let tdFind = trFind[(j+1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断右下
                    td.classList.add("num"+num)
                }
            }
        }
    }
    var tdAggregate = document.getElementsByTagName("td")
    for(let i=0;i<tdAggregate.length;i++){
        function click(target) {
            if(target.target != undefined){
                target = target.currentTarget;
            }
            if(clicked==false){
                firstClick(target)
                clicked=true
                target.click()
            }
            if(clicked==true){
                if (target.classList.contains("lei")==false){
                    target.classList.remove("hover")
                    target.style.cssText="background: #bbb;border:1px solid #808080 !important;width:24px;height:24px"
                    if(target.classList.contains("num1")){target.innerText="1"}
                    if(target.classList.contains("num2")){target.innerText="2"}
                    if(target.classList.contains("num3")){target.innerText="3"}
                    if(target.classList.contains("num4")){target.innerText="4"}
                    if(target.classList.contains("num5")){target.innerText="5"}
                    if(target.classList.contains("num6")){target.innerText="6"}
                    if(target.classList.contains("num7")){target.innerText="7"}
                    if(target.classList.contains("num8")){target.innerText="8"}
                    if(target.classList.contains("num0")){
                        let a ; let b;
                        for(let n=0;n<X*Y;n++){
                            if(target===tdAggregate[n]){
                                a = Math.floor(n/X)
                                b = n-(a*X)
                            }
                        }
                        class0Click(a,b)
                        function class0Click(a,b) {
                            var i = 0;
                            var mmap = [-1, -1, -1, 0, -1, 1, 0, -1, 0, 1, 1, -1, 1, 0, 1, 1]
                            for(; i < 8; i++){
                                let x = a + mmap[i * 2];
                                let y = b + mmap[i * 2 + 1]
                                if(x>=0&& y>=0 && x < X && y < Y){
                                    let findTd = table[x].childNodes[y]
                                    if(findTd.classList.contains("hover")){
                                        console.log(findTd)
                                        judgeClass(findTd)
                                    }
                                }
                            }

                            function judgeClass(findTd) {
                                for(let i=0;i<=8;i++){
                                    setClass(i)
                                }
                                function setClass(i) {
                                    findTd.classList.remove("hover")
                                    if(findTd.classList.contains("num"+i)){
                                        findTd.innerText=i

                                        findTd.style.cssText="background: #bbb;border:1px solid #808080 !important;width:24px;height:24px"
                                    }
                                    if(findTd.classList.contains("num0")){
                                        findTd.innerText=""
                                        click(findTd)
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    target.style.cssText+="background:red !important"
                    var lei = document.getElementsByClassName("lei")
                    for (let i=0;i<lei.length;i++){
                        var imgLei = document.createElement("img")
                        imgLei.src = "雷.png"
                        lei[i].innerHTML = ""
                        lei[i].appendChild(imgLei)
                        lei[i].style.cssText+="background:rgb(187,187,187);border:1px solid #808080 !important;width:24px;height:24px"
                    }
                    mask.style.display = "block"
                    alert("游戏结束")
                }
                let success = true
                for(let i =0;i<=8;i++){
                    Success(i)
                    if(success == false){
                        break
                    }
                }
                function Success(i){
                    let successNum = document.getElementsByClassName("num"+i)
                    for(let it of successNum){
                        if(it.classList.contains("hover")==true){
                            success = false
                            break
                        }
                    }
                }
                if(success == true){
                    alert("游戏胜利")
                    mask.style.display = "block"
                }
            }
        }
        tdAggregate[i].addEventListener("click",click)
        tdAggregate[i].oncontextmenu = function (e) {
            e.preventDefault()
        }
        var qiNum = 0
        tdAggregate[i].onmouseup = function (oEvent) {
            if(!oEvent) oEvent=window.event
            if(oEvent.button == 2){
                var imgQi = document.createElement("img")
                imgQi.src = "旗子.png"
                if(this.classList.contains("hover")&&this.classList.contains("qi")==false&&qiNum<=N){
                    qiNum++
                    this.appendChild(imgQi)
                    this.classList.add("qi")
                    this.classList.remove("hover")
                    this.removeEventListener("click",click)
                }else if(this.classList.contains("qi")==true){
                    this.innerHTML = ""
                    this.classList.remove("qi")
                    this.classList.add("hover")
                    this.addEventListener("click",click)
                }
            }
        }
    }
}
