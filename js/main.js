$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();

    $('.js-anim').on('mouseenter', function(e){
        startAnimation($('#'+this.dataset.target)[0]);
    });

    $('.js-anim').on('mouseleave', function(e){
        stopAnimation($('#'+this.dataset.target)[0]);
    });

    $('.js-citymap').on('mouseenter', function(){
        $('.city-nav').addClass('active');
        $('.city-nav__link').removeClass('active');
        $('.city-nav__' + this.dataset.link).addClass('active');

        if (!$(this).hasClass('current') && !$(this).parent().hasClass('current')){
            startAnimation($('.city-nav__' + this.dataset.link + ' .city-nav__img')[0]);
        }
    });

    $('.js-citymap').on('mouseleave', function(){
        $('.city-nav').removeClass('active');
        $('.city-nav__' + this.dataset.link).removeClass('active');

        if (!$(this).hasClass('current') && !$(this).parent().hasClass('current')){
            stopAnimation($('.city-nav__' + this.dataset.link + ' .city-nav__img')[0]);
        }
    });    


    $('.menu-bar').on('mouseenter', function(){
        $(this).addClass('hover');
    });

    $('.menu-bar').on('mouseleave', function(){
        $(this).removeClass('hover');
    });




    citynavOffset = $('.city-nav').offset();


    $('.menu-bar').headroom({
        offset : citynavOffset.top + $('.city-nav').height()*(1/3),
        tolerance : 0,
        classes : {
            top : "menu-bar--disabled",
            notTop : "menu-bar--enabled"
        }
    });


    $('a[href=#top]').on('click', function(){
        $("html, body").animate({
         scrollTop:0
        },"slow");

        return false;
    });

    $('#mail-list-signup').submit(function(e){
        e.preventDefault();
        $(this).closest('.result').removeClass('error').removeClass('success').html('<i class="sprite  sprite--loading"></i>');

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            cache       : false,
            dataType    : 'json',
            contentType: "application/json; charset=utf-8",
            error       : function(err) {
                msg = parseMailChimpSignupError(err.msg, $('#mail-list-signup .email').val());
                $('#mail-list-signup .result').addClass('error');
                $('#mail-list-signup .result').html(msg);
            },
            success     : function(data) {

                if (data.result == 'error'){
                    msg = parseMailChimpSignupError(data.msg, $('#mail-list-signup .email').val());
                    $('#mail-list-signup .result').removeClass('success').addClass('error');
                    $('#mail-list-signup .result').html(msg);
                }
                else {
                    $('#mail-list-signup .result').removeClass('error').addClass('success');
                    $('#mail-list-signup .result').html('Almost finished...<br>Please check your inbox for a link to confirm your address.');
                }
            }
        });
    });

    $(document).on('opening', '.js-mail-list-signup', function () {
      $('#mail-list-signup .result').removeClass('success').removeClass('error').html("");
      $('#mail-list-signup .email').val("").focus();
    });


    $('.js-share-this').on('click', function(e){
        e.preventDefault();
        $(this).toggleClass("active");
    });


    $('.js-shows').imagesLoaded( function(){
        $('.js-shows').masonry({
            itemSelector : '.grid__item'
        });
    });

    $("[data-share]").on('click', function(e){
        e.preventDefault();
        url = $(this).attr("href");
        type = $(this).data("share");
        if (type == 'tweet'){
        } else if (type == 'fb-post') {
        }

        window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    });
});

function parseMailChimpSignupError(originalMsg, email)
{
    msg = '';

    if (originalMsg.indexOf('6592') > -1) {
        msg = "Too many attempts to register this address.<br>Please wait 5 minutes before trying again.";
    }
    else if (originalMsg.indexOf('is already subscribed to list') > -1) {
        msg = email + ' is already subscribed.';
    }
    else {
        msg = 'There was an error subscribing this address. Please try again.';
    }

    return msg;
}

function startAnimation(target)
{
    newSrc = target.src.substr(0, target.src.indexOf('.gif')) + '-anim.gif';
    target.src = newSrc;
}

function stopAnimation(target)
{
    newSrc = target.src.substr(0, target.src.indexOf('-anim.gif')) + '.gif';
    target.src = newSrc;
}

