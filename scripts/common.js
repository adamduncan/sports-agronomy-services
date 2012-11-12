
/*
Sports Agronomy Services
Build: Adam Duncan
Date: October 2012
*/

$('html').removeClass('no-js');
$('html').addClass('js');

var AppSettings = {
	DEBUGMODE: true,
	ieClass: "ie"
};

var Main = {

	run: function () {
		$('.main_content').animate({ opacity: 0 }, 1);

		Columns.init();
		Columns.landingCols();
		Columns.verticalCols();
		Scroll.init();
		Plugins.carousel();
		Interaction.overlays();
		Interaction.verticalCentre();
		Utils.smoothScroll();
		Utils.externalLink();
	}

};

var Columns = {

	selector: '.columns',
	colSelector: '.column',
	colWidth: 374,
	colHeight: 300,
	colPadding: 21,
	container: '.main_content',
	landingSelector: '.landing',
	blockSelector: '.col_layout',

	init: function () {
		if ($(Columns.selector).length) {

			// Set parent content container width for columns
			$(window).load(function () {
				$(Columns.selector).css('width', '9999px').columnize({ width: Columns.colWidth, height: Columns.colHeight, lastNeverTallest: true, buildOnce: true });

				$(Columns.colSelector).each(function () {
					var $this = $(this);
					if ($this.is(':empty')) {
						$this.remove();
					};
				});

				var contentWidth = $(Columns.colSelector).length * (Columns.colWidth + Columns.colPadding);
				// Add any additional grid widths
				$(Columns.container).children("div[class^='grid_']").each(function () {
					contentWidth += $(this).outerWidth(true);
				});
				$(Columns.selector + ', ' + Columns.container).css('width', contentWidth + 'px');
				// Show content once container sized
				$(Columns.container).delay(300).animate({ opacity: 1 }, 300);

			});
		} else {
			// If no columns, fade content in instantly
			$(Columns.container).animate({ opacity: 1 }, 300);
		};
	},

	landingCols: function () {

		// Set width for unknown listing block modules container
		if ($(Columns.landingSelector).length) {
			var contentCols = $(Columns.container).children('div'),
				contentWidth = 0;

			$(contentCols).each(function () {
				contentWidth += $(this).outerWidth(true);
			});
			$(Columns.container).css('width', contentWidth + 'px').animate({ opacity: 1 }, 300);
		};

	},

	verticalCols: function () {

		// Arrange block list vertically
		if ($(Columns.blockSelector).length) {

			$(Columns.blockSelector).each(function () {
				var rows = 2,
				offsetWidth = 0,
				offsetHeight = 0;

				$(this).children().each(function (i) {
					var $this = $(this),
					blockWidth = $this.outerWidth(true),
					blockHeight = $this.outerHeight(true);

					// Every second column after first, increment height twice
					if (i % 2 == 0 && i > 1) {
						offsetHeight += blockHeight;
						offsetHeight += blockHeight;
					}
					// Every second column after first, increment width
					if (i % 2 == 0 && i > 1) {
						offsetWidth += blockWidth;
					};
					// Apply positioning to every item after first row
					if (i >= rows) {
						$this.css({ marginLeft: offsetWidth + 'px', top: '-' + offsetHeight + 'px' });
					};
				});
			});
			// Call landingCols function again to resize parent container
			Columns.landingCols();
		};

	}


};

var Scroll = {

	init: function () {

		$('html, body').bind('mousewheel', function (e, delta) {
			if ($(document).width() > $(window).width()) {
				this.scrollLeft -= (delta * 35);
				e.preventDefault();
			}
		});

	}

};

var Plugins = {

	carouselSelector: '.carousel',
	controlsSelector: '.controls',

	carousel: function () {
		if ($(Plugins.carouselSelector).length) {

			$(Plugins.controlsSelector).find('a').animate({ opacity: 0 }, 1);

			$(Plugins.carouselSelector).cycle({
				fx: 'scrollHorz',
				timeout: 0,
				speed: 600,
				easing: 'easeInOutQuad',
				slideExpr: '.slide',
				prev: '.prev',
				next: '.next'//,
				//after: onAfter
			});

			// hide prev/next on first/last slides
			/*function onAfter(curr, next, opts) {
				var index = opts.currSlide;
				$('.prev')[index == 0 ? 'hide' : 'show']();
				$('.next')[index == opts.slideCount - 1 ? 'hide' : 'show']();
			};*/

			// show/hide controls on hover of carousel
			$(Plugins.carouselSelector).parent().hover(function () {
				$(Plugins.controlsSelector).find('a').stop().animate({ opacity: 1 }, 300);
			}, function () {
				$(Plugins.controlsSelector).find('a').stop().animate({ opacity: 0 }, 200);
			});
		};
	}

};

var Interaction = {

	overlay: '.overlay',
	vertical: '.vc',

	overlays: function () {

		if ($(Interaction.overlay).length) {
			$(Interaction.overlay).animate({ opacity: 0 }, 1).css('visibility', 'visible');

			$(Interaction.overlay).parents('a').on('mouseover focusin', function () {
				$(Interaction.overlay, this).stop().animate({ opacity: 1 }, 200);
			});
			$(Interaction.overlay).parents('a').on('mouseout focusout', function () {
				$(Interaction.overlay, this).stop().animate({ opacity: 0 }, 100);
			});

		};

	},

	verticalCentre: function () {

		if ($(Interaction.vertical).length) {
			$(Interaction.vertical).each(function () {
				var $this = $(this),
					thisHeight = $this.height();
				$this.css({ 'position': 'absolute', 'top': '50%', 'marginTop': '-' + thisHeight / 2 + 'px' })
			});
		};
	}

};

var Utils = {

	smoothScroll: function () {
		$('.jump').click(function () {
			var $anchor = $(this);
			$('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top - 12 }, 400, AppSettings.easing);
			return false;
		});
	},

	externalLink: function () {
		$('.ext').click(function () {
			var link = $(this).attr('href');
			window.open(link);
			return false
		});
	}

};

var Debug = {

	log: function (str) {
		if (AppSettings.DEBUGMODE) {
			try { console.log(str); }
			catch (e) { }
		}
	}

};

$(document).ready(Main.run());