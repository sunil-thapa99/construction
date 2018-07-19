;(function($, window, document, undefined) {

	"use strict"; 

	/* ================================
	===  VARIABLES                 ====
	=================================== */
	var $win = $(window),
		$doc = $(document),
		$body = $('body'),
		$bodyHtml = $('body,html');

	$doc.on('ready', function(){
		/* ================================
		===  SLIDING NAVIGATION        ====
		=================================== */
	    var navTrigger = $('.nav-trigger'),
	    	langTrigger = $('.lang-trigger'),
	        overlay = $('.consta-overlay'),
	        overlayLang = $('.overlay-lang'),
	        navigationLiNot = $('#navigation li:not(.menu-item-has-children)'),
	        menuItemHasChildren = $('.menu-item-has-children');
	        

	        function toggleNavigation( event ) {
	            event.preventDefault();
	            $body.toggleClass('nav-open');
	        }

	        function overlayFunction() {
	            $body.toggleClass('nav-open');
	        }

	        navTrigger.on('click',toggleNavigation);
	        overlay.on('click',overlayFunction);
	        

	        navigationLiNot.each(function(){  
	            $(this).on('click',function(){
	                $body.toggleClass('nav-open');
	            });
	        });

	    //open (or close) submenu items in the mobile menu. Close all the other open submenu items.
		menuItemHasChildren.children('a').on('click', function(event){
			event.preventDefault();
			$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.menu-item-has-children').siblings('.menu-item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
		});


		function toggleLang() {
			$body.toggleClass('lang-open');
		}

		function overlayLangFunction() {
            $body.toggleClass('lang-open');
        }

		langTrigger.on('click',toggleLang);
		overlayLang.on('click',overlayLangFunction);


		/* ================================
		=== HEADER ANIMATION           ====
		=================================== */
		var iScrollPos = 0,
			scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 0,
			scrollOffset = 500,
			mainHeader = $('header'),
			headerHeight = mainHeader.height();

		function scrollEffect() {

			var iCurScrollPos = $(this).scrollTop();
			
			if (iCurScrollPos > iScrollPos && iCurScrollPos > 120) {

		        mainHeader.addClass('scrolling');
		      
		    } else if ( iCurScrollPos < 120) {

		       mainHeader.removeClass('scrolling');
		    }

		    iScrollPos = iCurScrollPos;	
		}

		function autoHideHeader() {
			var currentTop = $(window).scrollTop();

			checkDirection(currentTop);

		   	previousTop = currentTop;
			scrolling = false;
		}

		function checkDirection(currentTop) {
			
		    if (previousTop - currentTop > scrollDelta) {
		    	//if scrolling up...
		    	mainHeader.removeClass('is-hidden');
		    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		    	//if scrolling down...
		    	mainHeader.addClass('is-hidden');
		    }
		}
		
		$win.on('scroll',scrollEffect);

		$win.on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});

		$win.on('resize', function(){
			headerHeight = mainHeader.height();
		});

		/* ================================
		===  OWL CAROUSELS     ====
		=================================== */
		var owlPopular = $("#owl-popular");
	   	owlPopular.owlCarousel({
		    navigation : false, 
		    smartSpeed : 500,
		    paginationSpeed : 2500,
		    autoplay: true,
		    loop : true,
		    items : 1, 
		    itemsDesktop : false,
		    itemsDesktopSmall : false,
		    itemsTablet: false,
		    itemsMobile : false,
		});

	   	var owlGallery = $('#owl-gallery');
		owlGallery.owlCarousel({
			nav : true,
			navText : [],
			dots : false, 
		    smartSpeed : 500,
		    paginationSpeed : 2500,
		    autoplay: true,
		    loop : true,
		    items : 1, 
		    itemsDesktop : false,
		    itemsDesktopSmall : false,
		    itemsTablet: false,
		    itemsMobile : false,
		});

		/* ================================
		===  BACK TO TOP ANIMATION     ====
		=================================== */
		var offset = 700,
			offsetOpacity = 1200,
			scrollTopDuration = 700,
			backToTop = $('.back-to-top');

		//hide or show the "back to top" link
		$win.scroll(function(){
			( $(this).scrollTop() > offset ) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible fade-out');
			if( $(this).scrollTop() > offsetOpacity ) { 
				backToTop.addClass('fade-out');
			}
		});

		//smooth scroll to top
		backToTop.on('click', function(event){
			event.preventDefault();
			$bodyHtml.animate({
				scrollTop: 0 ,
			 	}, scrollTopDuration
			);
		});

	    /* ================================
		===  RETINA READY              ====
		=================================== */
		retinajs();

		/* ================================
		===  ie9 Placeholder Fix       ====
		=================================== */
		var placeholderSupport = ("placeholder" in document.createElement("input"));

			if(!placeholderSupport){
			  //This browser does not support the placeholder attribute
			  //use javascript instead
			  $('[placeholder]').focus(function() {
			    var input = $(this);
			    if (input.val() === input.attr('placeholder')) {
			      input.val('');
			      input.removeClass('placeholder');
			    }
			  }).blur(function() {
			    var input = $(this);
			    if (input.val() === '' || input.val() === input.attr('placeholder')) {
			      input.addClass('placeholder');
			      input.val(input.attr('placeholder'));
			    }
			  }).blur().parents('form').submit(function() {
			    $(this).find('[placeholder]').each(function() {
			      var input = $(this);
			      if (input.val() === input.attr('placeholder')) {
			        input.val('');
			      }
			    })
			});
		}

	});

	/* ================================
	===  MAILCHIMP                 ====
	=================================== */
	var mailChimp = $('.mailchimp');
	mailChimp.ajaxChimp({
	    callback: mailchimpCallback,
	    url: "http://arifevrenerdem.us11.list-manage.com/subscribe/post?u=406e31254715533ce9d357b56&id=a088eee114" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
	});

	function mailchimpCallback(resp) {
	     if (resp.result === 'success') {
	        $('.subscription-success').html(resp.msg).fadeIn(1000);
	        $('.subscription-error').fadeOut(500);
	        
	    } else if(resp.result === 'error') {
	        $('.subscription-error').html(resp.msg).fadeIn(1000);
	    }  
	}

	/* =================================
	===  SUBSCRIPTION FORM          ====
	==================================== */
	var subscribeForm = $("#subscribe");
	subscribeForm.submit(function (e) {
	    e.preventDefault();
	    var email = $("#subscriber-email").val();
	    var dataString = 'email=' + email;

	    function isValidEmail(emailAddress) {
	        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	        return pattern.test(emailAddress);
	    };

	    if (isValidEmail(email)) {
	        $.ajax({
	            type: "POST",
	            url: "subscribe/subscribe.php",
	            data: dataString,
	            success: function () {
	                $('.subscription-success').fadeIn(1000);
	                $('.subscription-error').fadeOut(500);
	                $('.hide-after').fadeOut(500);
	            }
	        });
	    } else {
	        $('.subscription-error').fadeIn(1000);
	    }

	    return false;
	});

	/* ================================
	===  CONTACT FORM              ====
	=================================== */
	var contactForm = $("#contact");
	contactForm.submit(function (e) {
	    e.preventDefault();
	    var name = $("#name").val();
	    var companyname = $("#companyname").val();
	    var phone = $("phone").val();
	    var email = $("#email").val();
	    var message = $("#message").val();
	    var dataString = 'name=' + name + '&companyname=' + companyname + '&phone=' + phone + '&email=' + email + '&message=' + message;

	    function isValidEmail(emailAddress) {
	        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	        return pattern.test(emailAddress);
	    };

	    if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
	        $.ajax({
	            type: "POST",
	            url: "sendmail.php",
	            data: dataString,
	            success: function () {
	                $('.success').fadeIn(1000);
	                $('.error').fadeOut(500);
	            }
	        });
	    } else {
	        $('.error').fadeIn(1000);
	        $('.success').fadeOut(500);
	    }

	    return false;
	});
})(jQuery, window, document);