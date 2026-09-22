$(window).on( 'load' , function(){

	// hide the preloader after certain time span
	setTimeout(() => {
		$(".preloader").css("display", 'none');
	}, 500);

	
	$('.navbar-nav .nav-item .nav-link').click(function(){
		$('.navbar-nav .nav-item .nav-link').removeClass('active');
		$(this).addClass('active');
	})


	$('.filter--menu li').click(function(){
		$(".filter--menu li").removeClass('active');
		$(this).addClass('active');

		var data = $(this).attr('data-filter');
		const cards = document.querySelectorAll('.all');
		
		// a filter function to filter elements...
		Array.from(cards).map((card)=>{
			let id = card.getAttribute('id');
			if(data == "all"){
				$(card).show();
			}
			else if(id === data){
				$(card).show();
			}else{
				$(card).hide();
			}
		})
	});


	// loading the dynamic food content on the page....
	async function getFoodAndShow(){
		const food = await fetch('./data.json');
		const res = await food.json();
		const data = res.meals;

	$('.filtered--dishes .food--content').html(
		`
		${data.map((item,index) => {
			return(`
			<div class="col-md-6 col-lg-4 all" id="${item.type}">
					<div class="filter--box">
						<div class="img--box">
							<img src="${item.strMealThumb}" alt="a tasty pizza">
						</div>
				<div class="text--area">
					<h5 class="filter--text--title dancing--script">${item.strMeal}</h5>
					<p class="filter--text--subtitle">
						${item.description}
					</p>
					<h5 class="menu--price">&#8377;${item.discountPrice}<small class="text-white-50"><del>${item.price}</del></small></h5>
					<a href="./checkout.php?foodId=${index}&page=home" class="px-5 py-2">
						Order It Now
						<i class="fa fa-cart-shopping"></i>
					</a>
			</div>
			</div>				
			</div>`
			)
		}).join(" ")}
		`
	)}

	// calling the function....
	getFoodAndShow();



	// owl carousel part...
	$('.client--carousel').owlCarousel({
	  loop:true,
      margin:0,
      nav:true,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      navText : [
      	"<i class='fa fa-chevron-left'></i>",
      	"<i class='fa fa-chevron-right'></i>"

      	],

      responsive:{
        0:{
          items:1
        },
        765:{
          items:2
        },

        1000:{
        	items : 2
        }
      }
	});


	// form handling section...

		$('.tableForm').submit(function(event){
			event.preventDefault();
			let number = $('#customerPhone').val();
			if($.isNumeric(number)){
					if(number.length < 10 || number.length > 10){
						$('#msgForPhone').html('Please provide a correct number!');
						return false;
					}
				
			}else{
				$('#msgForPhone').html('Please provide number!');
				return false;
			}

			$('.tableForm').unbind('submit').submit();
		
			});



		// user Registration handling...

		$('.signUpForm').submit(function(event){
			event.preventDefault();
			let number = $('#userPhone').val();
			let pass = $('#userPass').val();
			const email = $('#email').val();
			let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
			const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

				if(!emailPattern.test(email)){
					$('.msg--for--email').html('Email address not valid!');
					return false;
				}

				if($.isNumeric(number)){
				if(number.length < 10 || number.length > 10){
					$('#signup--msg--phone').html('Please provide a correct number!');
					return false;
				}
				
			}else{
				$('#signup--msg--phone').html('Please provide number!');
				return false;
			}

			if(!pattern.test(pass)){
				$('#msg--for--password').html('Password should contain letters, numbers & special key.');
				return false;
			}

				$('.signUpForm').unbind('submit').submit();
		})


		// setting the year...
	let date = new Date();
	let year = date.getFullYear();
	$("#year").html(` ${year} `);


});


