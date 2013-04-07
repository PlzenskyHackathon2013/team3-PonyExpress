/*   Free Script provided by HIOXINDIA            */
/*   visit us at http://www.hscripts.com     */
/*   This is a copyright product of hioxindia.com */

var numOfRandom = 9;
var image="/images/fun/pony";  //Image path should be given here
var no = 25; // No of images should fall
var time = 0; // Configure whether image should disappear after x seconds (0=never):
var speed = 70; // Fix how fast the image should fall
var i, dwidth = 900, dheight =500;
var nht = dheight;
var toppos = 0;

if(document.all){
    var ie4up = 1;
}else{
    var ie4up = 0;
}

if(document.getElementById && !document.all){
    var ns6up = 1;
}else{
    var ns6up = 0;
}

function getScrollXY() {
    var scrOfX = 10, scrOfY = 10;
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY =window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if( document.documentElement &&
        ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
}

var timer;

function ranrot()
{

    var a = getScrollXY()
    if(timer)
    {
        clearTimeout(timer);
    }
    toppos = a[1];
    dheight = nht+a[1];
    //alert(dheight);

    timer = setTimeout('ranrot()',2000);
}

ranrot();

function iecompattest()
{
    if(document.compatMode && document.compatMode!="BackCompat")
    {
        return document.documentElement;
    }else{
        return document.body;
    }

}
if (ns6up) {
    dwidth = window.innerWidth;
    dheight = window.innerHeight;
}
else if (ie4up) {
    dwidth = iecompattest().clientWidth;
    dheight = iecompattest().clientHeight;
}

nht = dheight;

var cv = new Array();
var px = new Array();       //position variables
var py = new Array();      //position variables
var am = new Array();     //amplitude variables
var sx = new Array();    //step variables
var sy = new Array();   //step variables

function addPony(no){
    var j =  cv.length;
    for (i = j; i < j+no; ++ i) {
        console.log(i);
        cv[i] = 0;
        px[i] = Math.random()*(dwidth-100);  // set position variables
        py[i] = Math.random()*dheight;     // set position variables
        am[i] = Math.random()*20;         // set amplitude variables
        sx[i] = 0.02 + Math.random()/10;  // set step variables
        sy[i] = -0.7 + Math.random();    // set step variables
        $("body").append("<div id=\"dot"+ i +"\" style=\"POSITION: absolute; Z-INDEX: "+ i +"; VISIBILITY: visible; TOP: -300px;LEFT: -300px;\"><img src='"+image+Math.floor((Math.random()*numOfRandom)+1)+".png' border=\"0\"><\/div>");
    }
}

var mouseX, mouseY;
    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }).mouseover();


function animation() {  // animation function
console.log(mouseX + ' ' + mouseY);
    console.log();
    for (i = 0; i < cv.length; ++ i) {  // iterate for every dot
        py[i] += sy[i];
        if (py[i] > dheight-50) {
            px[i] = Math.random()*(dwidth-am[i]-100);
            py[i] = toppos;
            sx[i] = 0.02 + Math.random()/10;
            sy[i] = 0.7 + Math.random();
        }
        cv[i] += sx[i];
        if(Math.abs(py[i] - mouseY)  < 50){
            
        }
        document.getElementById("dot"+i).style.top=py[i]+"px";
        document.getElementById("dot"+i).style.left=px[i] + am[i]*Math.sin(cv[i])+"px";
    }
    atime=setTimeout("animation()", speed);

}

function hideimage(){
    if (window.atime) clearTimeout(atime)
    for (i=0; i<no; i++)
        document.getElementById("dot"+i).style.visibility="hidden"
}
if (ie4up||ns6up){
    animation();
    if (time>0)
        setTimeout("hideimage()", time*1000)
}
animation();

/*   Free Script provided by HIOXINDIA            */
/*   visit us at http://www.hscripts.com     */
/*   This is a copyright product of hioxindia.com */

