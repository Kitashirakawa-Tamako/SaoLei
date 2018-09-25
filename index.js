//创建表格
creatTable(8,8)
function creatTable(X,Y) {
    var table = document.getElementById("table")
    var tableNode = document.createElement("table")
    tableNode.style="background:#ccc;border-spacing:0px;display:inline-table;margin-top:20px"
    var tdNode_style="border: 3px solid #808080;border-left-color:#eee;border-top-color:#eee;width:20px;height:20px"
    for(let x=0;x<X;x++){
        var trNode = tableNode.insertRow()
        for(let y=0;y<Y;y++){
            var tdNode = trNode.insertCell()
            tdNode.style=tdNode_style
        }
    }
    table.appendChild(tableNode)

    var a = Math.floor(Math.random()*8)
    var b = Math.floor(Math.random()*8)
    var tr = document.getElementsByTagName("tr")
    console.log(tr[a])
    tr[a][b].background="red"
}



