var gallery = {
	object : {},
	object_key : '',
	current_index : 0,
	is_scrollable : false,
	constants : {
		WINDOW_WIDTH : 0,
		WINDOW_HEIGHT : 0,
		BACKGROUND_OPACITY : 0.9,
		IMAGE_HOVER_OPACITY : 0.7,
		CONSTRUCT_STRING_SEPARATOR : '|'
	},
	construct : function(string)
	{
		this.setGallery();

		var array = string.split(this.constants.CONSTRUCT_STRING_SEPARATOR),
			key;

		for (key in array)
		{
			array[key] = 'a[rel='+array[key]+']';
		}

		var selector = array.toString();

		$(selector).on('click', function()
		{
			var rel_attr = $(this).attr('rel'),
				selector = 'a[rel='+rel_attr+']',
				href_attr,
				title_attr;

			gallery.object[rel_attr] = [];
			gallery.object_key = rel_attr;
			gallery.current_index = $(this).parent().parent().find(selector).index(this);

			if (!gallery.object[rel_attr].length)
			{
				$(selector).each(function()
				{
					href_attr = $(this).attr('href');
					title_attr = $(this).attr('title');

					gallery.object[rel_attr].push({href : href_attr, title : title_attr});
				});
			}

			gallery.setWindowSize(gallery.is_scrollable);
			gallery.setBackground(gallery.current_index);

			return false;
		});
	},
	setGallery : function()
	{
		$(window).on('load', function()
		{
			gallery.is_scrollable = ($(document).height() > $(window).height()) ? true : false;
		});

		var gallery_width = $('div.gallery').width(),
			selector = 'div.gallery > div',
			i = 0,
			divisor;

		$(selector).removeClass('eol');

		switch (true)
		{
			case gallery_width <= 767:
				divisor = 2;
			break;

			case gallery_width >= 768 && gallery_width <= 1023:
				divisor = 3;
			break;

			case gallery_width >= 1024 && gallery_width <= 1199:
				divisor = 4;
			break;

			case gallery_width >= 1200:
				divisor = 5;
			break;
		}

		$(selector).each(function()
		{
			++i;

			if (i % divisor === 0)
			{
				$(this).addClass('eol');
			}
		});
	},
	setWindowSize : function(is_scrollable)
	{
		if (is_scrollable)
		{
			$('body').css('overflowY', 'hidden');
		}

		this.constants.WINDOW_WIDTH = $(window).width();
		this.constants.WINDOW_HEIGHT = $(window).height();
	},
	getDimension : function(width, height)
	{
		var x = (this.constants.WINDOW_WIDTH > width) ? (this.constants.WINDOW_WIDTH - width) / 2 : 0;
		var y = (this.constants.WINDOW_HEIGHT > height) ? (this.constants.WINDOW_HEIGHT - height) / 2 : 0;

		return [x, y];
	},
	setBackground : function(index)
	{
		var html = '<div id="background">'+
			'<div class="content top"></div>'+
			'<div class="close"></div>'+
			'<div class="loading"></div>'+
			'<div class="content bottom"></div>'+
			'</div>';

		$('body').append(html);
		$('div#background').css('opacity', this.constants.BACKGROUND_OPACITY);

		var coordinates = this.getDimension(50, 50),
			image_number = index + 1;

		$('div.loading', 'div#background').css({'top' : coordinates[1], 'left' : coordinates[0]});

		this.setForeground(image_number);
	},
	setForeground : function(image_number)
	{
		var html = '<div id="foreground">'+
			'<div class="image"></div>'+
			'</div>';

		$('body').append(html);

		var gallery_length = this.object[this.object_key].length;
		this.current_index = image_number - 1;

		$('div.image', 'div#foreground').append('<img src="'+this.object[this.object_key][this.current_index].href+'" onload="gallery.getImage();">');
		$('div.content.top', 'div#background').text(this.object[this.object_key][this.current_index].title);
		$('div.content.bottom', 'div#background').text(image_number+' / '+gallery_length);

		if (image_number !== 1 && gallery_length !== image_number)
		{
			this.setPreviousLink(image_number);
			this.setNextLink(image_number);
		}

		if (image_number === 1 && gallery_length !== 1)
		{
			this.setNextLink(image_number);
		}

		if (image_number === gallery_length && gallery_length !== 1)
		{
			this.setPreviousLink(image_number);
		}

		this.close();
	},
	getImage : function()
	{
		var img = new Image;

		img.src = $('div.image > img', 'div#foreground').attr('src');

		var is_resized = false,
			X = img.width,
			Y = img.height;

		if (Y > (this.constants.WINDOW_HEIGHT - 100))
		{
			is_resized = true;

			Y = this.constants.WINDOW_HEIGHT - 98;
			X = ((img.width / img.height) * Y).toFixed(0);
		}

		if (X > (this.constants.WINDOW_WIDTH - 100))
		{
			is_resized = true;

			X = this.constants.WINDOW_WIDTH - 102;
			Y = ((img.height / img.width) * X).toFixed(0);
		}

		if (is_resized)
		{
			$('div.image > img', 'div#foreground').attr('width', X);
			$('div.image > img', 'div#foreground').attr('height', Y);
		}

		var coordinates = this.getDimension(X, Y);

		$('div.loading', 'div#background').animate({width : X, height : Y, top : coordinates[1], left : coordinates[0]}, 200);
		$('div#foreground').css({'width' : X, 'height' : Y, 'top' : coordinates[1], 'left' : coordinates[0]}).fadeIn(600);
	},
	setPreviousLink : function(image_number)
	{
		$('div#background').prepend('<div class="previous"></div>');

		$('div.previous', 'div#background').on('click', function()
		{
			if ($('div#foreground').is(':animated'))
			{
				return;
			}

			$('div.previous', 'div#background').remove();
			$('div#foreground').remove();

			--image_number;
			gallery.setForeground(image_number);
		});
	},
	setNextLink : function(image_number)
	{
		$('div#background').append('<div class="next"></div>');

		$('div.next', 'div#background').on('click', function()
		{
			if ($('div#foreground').is(':animated'))
			{
				return;
			}

			$('div.next', 'div#background').remove();
			$('div#foreground').remove();

			++image_number;
			gallery.setForeground(image_number);
		});
	},
	close : function()
	{
		$('div.close', 'div#background').on('click', function()
		{
			$('div#background, div#foreground').remove();

			if (gallery.is_scrollable)
			{
				$('body').css('overflowY', 'scroll');
			}
		});
	},
	setOrientationChange : function()
	{
		$(window).on('resize', function()
		{
			gallery.setGallery();

			if ($('div.loading').length)
			{
				$('div#background, div#foreground').remove();

				gallery.setWindowSize(gallery.is_scrollable);
				gallery.setBackground(gallery.current_index);
			}
		});
	}(),
	setGalleryHover : function()
	{
		$('div.gallery > div > a > img').hover(
			function()
			{
				$(this).fadeTo(200, gallery.constants.IMAGE_HOVER_OPACITY);
			},
			function()
			{
				$(this).fadeTo(200, 1);
			}
		);
	}(),
	keydown : function()
	{
		$(document).on('keydown', function(event)
		{
			switch (event.which)
			{
				case 27:
					$('div.close', 'div#background').trigger('click');
				break;

				case 37:
					$('div.previous', 'div#background').trigger('click');
				break;

				case 39:
					$('div.next', 'div#background').trigger('click');
				break;

				case 13:
					return false;
			}
		});
	}()
};