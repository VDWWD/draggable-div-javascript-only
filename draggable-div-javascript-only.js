var dragDivZindex = 100;

function draggableDiv(div) {
    //some variables
    var pos1 = 0
    var pos2 = 0
    var pos3 = 0
    var pos4 = 0;
    var margin = 10;
    var extra_margin_right = 3;
    var extra_margin_bottom = 3;

    //set the inital z-index
    div.style.zIndex = dragDivZindex;

    //extra margin right when there is a vertical scrollbar
    if (document.body.scrollHeight > window.innerHeight) {
        extra_margin_right = 20;
    }

    //extra margin bottom when there is a horizontal scrollbar
    if (document.body.scrollWidth > window.innerWidth) {
        extra_margin_bottom = 20;
    }

    //use the Header for drag if there is one, if not drag on the whole div
    var header = div.id + '_Header';
    if (document.getElementById(header)) {
        document.getElementById(header).onmousedown = dragDivMouseDown;
    } else {
        div.onmousedown = dragDivMouseDown;
    }

    //add a mouse enter event for the z-index
    div.onmouseenter = dragDivMouseEnter;

    //start dragging
    function dragDivMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        //track coordinates
        pos3 = e.clientX;
        pos4 = e.clientY;

        //attach functions
        document.onmouseup = dragDivMouseUp;
        document.onmousemove = dragDivMouseMove;
    }

    //drag the div
    function dragDivMouseMove(e) {
        e = e || window.event;
        e.preventDefault();

        //track coordinates
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        var top = div.offsetTop - pos2;
        var left = div.offsetLeft - pos1;

        //check if the element does not exceed the viewport at the top of bottom
        if (top < margin) {
            top = margin;
        } else if (top + div.clientHeight + margin + extra_margin_bottom > window.innerHeight) {
            top = window.innerHeight - margin - div.clientHeight - extra_margin_bottom;
        }

        //check if the element does not exceed the viewport at the left of right
        if (left < margin) {
            left = margin;
        } else if (left + div.clientWidth + margin + extra_margin_right > window.innerWidth) {
            left = window.innerWidth - margin - div.clientWidth - extra_margin_right;
        }

        //set the css of the div
        div.style.top = top + 'px';
        div.style.left = left + 'px';
    }

    //stop dragging
    function dragDivMouseUp() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    //if there are more than one, set the element being dragged on top
    function dragDivMouseEnter() {
        dragDivZindex++;
        div.style.zIndex = dragDivZindex;
    }
}