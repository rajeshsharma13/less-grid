$(document).ready(function () {
    $(".dropdown").click(function () {
        if (!$(this).hasClass("open")) {
            var html = $(this).siblings(".menu").html();
            $(this).find(".dropdown-menu").html(html);
            $(this).find(".dropdown-menu").show();
            $(this).addClass("open");
        } else {
            $(this).find(".dropdown-menu").hide();
            $(this).removeClass("open");
        }
    });
    /* Drag and drop */
    window.colDrag = 0;
    window.dragOffset;
    window.dragElem = false;
    $(".col").each(function () {
        $(this).append('<span class="resize-handle"></span>');
    });
    $(document.body).on("mousedown", ".resize-handle", function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.colResize = true;
        window.resizeTarget = $(this).parent();
        window.resizeOffset = $(this).parent().offset();
    });
    $(".col").mouseenter(function () {
    }).mouseout(function () {
        }).mousedown(function (e) {
            if (!jQuery(e.target).hasClass("resize-handle")) {
                if ($("#drag-placeholder").length) {
                    $("#drag-placeholder").remove();
                }
                window.dragOffset = {
                    'offsetX': e.offsetX,
                    'offsetY': e.offsetY
                }
                var w = $(this).outerWidth();
                var h = $(this).outerHeight();
                var m = $(this).css("margin");
                $(this).removeClass("col-init");
                $(this).css("width", w);
                $(this).css({"position": "absolute", "margin": "0px", "left": (e.pageX - e.offsetX) + "px", "top": (e.pageY - e.offsetY) + "px"});
                $(this).after('<div id="drag-placeholder" style="width:' + w + 'px;height:' + h + 'px;margin:' + m + ';"></div>');


                window.colDrag = 1;
                window.dragElem = $(this);
                $(this).addClass("dragging");
            }
        }).mouseup(function () {
            //mouse up stop drag and save current postion
            console.log("drag end", $("#drag-placeholder").position());
            $(this).attr("style", "");
            var pl_pos = $("#drag-placeholder").position();
            $(this).insertBefore("#drag-placeholder");
            $("#drag-placeholder").remove();
            $(this).removeClass("dragging");
            window.colDrag = 0;
        })
    $("body").mousemove(function (e) {
        if (window.colDrag) {
            window.dragElem.css({"left": (e.pageX - window.dragOffset.offsetX) + "px", "top": (e.pageY - window.dragOffset.offsetY) + "px"});
            var contact = window.dragElem.overlaps(".col");
            if (0 in contact) {
                var dir = impactDir(window.dragElem, $(contact[0]));
                if (dir == "left") {
                    $("#drag-placeholder").insertBefore(contact[0]);
                } else {
                    $("#drag-placeholder").insertAfter(contact[0]);
                }
            } else {
                checkIntent();
            }
        }
        if (window.colResize) {
            resizeColumns(e);
        }
    });
    $("body").mouseup(function () {
        window.colResize = false;
    });
});
function resizeColumns(e) {
    var col_pos = window.resizeOffset;
    var i_w = e.pageX - col_pos.left;
    var col_w=0;
    console.log(i_w);
    if (i_w > 860) {
        col_w=12;
    } else {
        if (i_w > 780) {
            col_w=11;
        } else {
            if (i_w > 700) {
                col_w=10;
            } else {
                if (i_w > 620) {
                    col_w=9;
                } else {
                    if (i_w > 540) {
                        col_w=8;
                    } else {
                        if (i_w > 460) {
                            col_w=7;
                        } else {
                            if (i_w > 380) {
                                col_w=6;
                            } else {
                                if (i_w > 300) {
                                    col_w=5;
                                } else {
                                    if (i_w > 220) {
                                        col_w=4;
                                    } else {
                                        if (i_w > 140) {
                                            col_w=3;
                                        } else {
                                            if (i_w > 60) {
                                                col_w=2;
                                            } else {
                                                if (i_w < 60) {
                                                    col_w=1;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var col_cl=window.resizeTarget.attr("class").replace(/\d+/,col_w+" ");
    window.resizeTarget.attr("class",col_cl);
}
function impactDir(obj, target) {
    var obj_e, target_e, obj_c, target_c, o_off = obj.offset(), t_off = target.offset();
    obj_e = o_off.left + obj.outerWidth();
    target_e = t_off.left + target.outerWidth();
    obj_c = o_off.left + (obj.outerWidth() / 2);
    target_c = t_off.left + (target.outerWidth() / 2);
    //object is totally in
    if (o_off.left > t_off.left && obj_e < target_e) {
        if (obj_c < target_c) {
            return "left";
        } else {
            return "right";
        }
    } else {
        //object on mostly left side
        if (o_off.left < t_off.left && obj_e < target_e) {
            return "left";
        }
        //mostly right
        if (o_off.left > t_off.left && obj_e > target_e) {
            return "right"
        }
        if (o_off.left < t_off.left && obj_e > target_e) {
            return "right";
        }

    }
    //calculate mouse position to determine the direction of insert to the obj

}
function checkIntent() {
    var contact = window.dragElem.overlaps(".row");
    if (0 in contact) {
        var dir = impactDir(window.dragElem, $(contact[0]));
        if (dir == "left") {
            $("#drag-placeholder").prependTo(contact[0]);
        } else {
            $("#drag-placeholder").appendTo(contact[0]);
        }
    }
    console.log(contact);
}