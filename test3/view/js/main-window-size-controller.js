/**
 * Created by chuhaoyuan on 2017/11/16.
 */
window.onload = function () {
  $(document).ready(function () {
    let _dragBars = $('.window-body').find('label');
    console.log("bars length = " + _dragBars.length);

    let _touchIndex;
    let _isDarging = false;
    let _rightPosX = 0;
    $(_dragBars).bind('mousedown', function () {
      console.log("mouse touch down");
      _isDarging = true;
      _touchIndex = $(this).index('label');
      _rightPosX = _dragBars.eq(_touchIndex).offset().left;

    });
    $(document).on('mousemove', function (e) {
      if (_isDarging){
        let clickX = e.pageX;
        _dragBars.eq(_touchIndex).prev().css('width', clickX + 'px');
        _dragBars.eq(_touchIndex).css('left', clickX + 'px');
        let barWidth = _dragBars.eq(_touchIndex).width();
        let width = _rightPosX - _dragBars.eq(_touchIndex).offset().left - barWidth;
        console.log("width = " + width);
        _dragBars.eq(_touchIndex).next().css('widht', width + 'px');
      }
    });
    $(document).on('mouseup',function () {
      _isDarging = false;
    })

  });
};