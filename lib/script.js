$(document).ready(function(){
    $(document).on('click','#ponyFun',function(){
        $(this).fadeTo(1,0.01,function(){
            $(this).css('background','url(/images/fun/picca.jpg)');
            $(this).html('<div>&nbsp;</div>');
        }).fadeTo(1000,1.0,function(){

            $(this).find('div').fadeTo(1000,0.99,function(){
                $(this).fadeTo(1000,0.01);
            });
        });

    });

});
