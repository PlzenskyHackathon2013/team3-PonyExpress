var ponyNo = 1;
$(document).ready(function(){
    function animationPonyHead(){
        $('#ponyFun div').fadeTo(1000,0.99,function(){
            $('#ponyFun div').fadeTo(1000,0.01);
        });
        setInterval(function(){
            animationPonyHead()
            }, 2000);


    }
    $(document).click(function(){
        ponyNo += ponyNo;
        addPony(ponyNo);
    });
    $(document).on('click','#ponyFun',function(){
        $(this).fadeTo(1,0.01,function(){
            $(this).css('background','url(/images/fun/picca.jpg)');
            $(this).html('<div>&nbsp;</div>');
        }).fadeTo(1000,1.0,function(){
            animationPonyHead();
        /*$(this).find('div').fadeTo(1000,0.99,function(){
                $(this).fadeTo(1000,0.01);

            });*/
        });

    });

});

