/**
 * Created by Ibokan on 2016/7/2.
 */
//校园APP手机端自适应公共部分js
function resetFont(){
    var HTML=document.getElementsByTagName('html')[0];
    var WD=document.documentElement.clientWidth;
    var Size=WD/640;
    HTML.style.fontSize=Size*100+'px';
}
resetFont();
window.onresize= function () {
    resetFont();
};

 var wx_icon = document.getElementById('wx_icon'),
        close_wx = document.getElementById('close_wx');
    wx_icon.onclick = function() {
        this.style.display = 'none';
        wx_copy.style.display = 'block';
    };
    close_wx.onclick = function() {
        wx_copy.style.display = 'none';
        wx_icon.style.display = 'block';
    };