# SMACSS Your Sass Up

A starting point for all my personal/work-related projects using Sass. Feel free to pull from anything you like in this repo or not. Additionally includes special JavaScript starting points/libraries like the jQuery plugin SVGMagic, HammerJS, RespondJS and MatchMedia Polyfill.

A starter toolkit based on [Scalable and Modular Architecture for CSS](http://smacss.com/) (SMACSS) for [Sass](http://sass-lang.com/) (SCSS) projects, with optional support for Bourbon, [Susy](http://susy.oddbird.net) and [Compass](http://compass-style.org).

Styles are broken down into the following groups: **Base, Layout, Module, State, Theme**

#### Browser Support
![ie](https://raw2.github.com/alrra/browser-logos/master/internet-explorer-tile/internet-explorer-tile_32x32.png) 8+ ![opera](https://raw2.github.com/alrra/browser-logos/master/opera/opera_32x32.png) 17+ ![safari](https://raw2.github.com/alrra/browser-logos/master/safari/safari_32x32.png) 6+ ![chrome](https://raw2.github.com/alrra/browser-logos/master/chrome/chrome_32x32.png) 32+ ![https://raw2.github.com/alrra/browser-logos/master/firefox/firefox_32x32.png](https://raw2.github.com/alrra/browser-logos/master/firefox/firefox_32x32.png) 26+ ![ios](https://raw2.github.com/alrra/browser-logos/master/safari-ios/safari-ios_32x32.png) 6+ ![chrome for android](https://addons.cdn.mozilla.net/media/img/app-icons/small/android.png) Android 4+


### Project Stack

- Ruby 2.0.0p247 <img src="https://www.ruby-lang.org/images/header-ruby-logo.png" width="15" height="auto" alt="">
- Sass 3.3.7 (Maptastic Maple) <img src="http://sass-lang.com/assets/img/logo-235e394c.png" width="20" height="auto" alt="syntactically awesome stylesheets">
- Grunt-CLI v0.1.9 <img src="http://gruntjs.com/img/grunt-logo.png" width="15" height="auto" alt="">
- Grunt v0.4.2 <img src="http://gruntjs.com/img/grunt-logo.png" width="15" height="auto" alt="">
- jQuery 1.10.2 <img src="http://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JQuery_logo.svg/220px-JQuery_logo.svg.png" width="40" height="auto" alt="javascript query">
- Modernizr 2.6.2 <img src="http://modernizr.com/i/img/logo-x12.png" width="20" height="auto" alt="">

## Quick start

1. Clone the git repo – `git clone https://github.com/minamarkham/sassy-starter` or download zip file directly.
2. Install Sass 3.3 – `gem install sass`.

## Directory structure

	+ scss/
	|
	|	+ base/     			     # reset, typography, site-wide
	|   |-- _index.scss        		 # imports for all base styles
	|   |-- _base.scss        		 # base styles
	|   |-- _normalize.scss   		 # normalize reset
	|
	|	+ layout/                    # major components, e.g., header, footer etc.
	|   |-- _index.scss        		 # imports for all layout styles
	|   |-- _footer.scss             # footer module
	|   |-- _header.scss        	 # header module
	|   |-- _home.scss        		 # home module
	|   |-- _main.scss        		 # main module
	|   |-- _nav.scss        		 # navigation module
	|
	|	+ modules/                   # minor components, e.g., buttons, widgets etc.
	|   |-- _index.scss        		 # imports for all modules
	|   |-- _btn.scss  				 # buttons
	|   |-- _cta.scss        	     # call to action
	|   |-- _flag.scss        		 # flag object
	|   |-- _form.scss  			 # forms
	|   |-- _hero.scss        		 # hero object
	|   |-- _media.scss        		 # media object
	|   |-- _messages.scss           # validations & alerts
	|   |-- _table.scss  			 # tables
	|
	|	+ states/                    # js-based classes, alternative states e.g., success or error state
	|   |-- _index.scss        		 # imports for all state styles
	|   |-- _states.scss  			 # state rules
	|   |-- _print.scss  			 # print styles
	|   |-- _touch.scss  			 # touch styles
	|
	|	+ themes/                    # alternative themes (optional)
	|   |-- _index.scss        		 # imports for all themes
	|
	|	+ utilities/     		     # non-CSS outputs (i.e. mixins, variables) & non-modules
	|   |-- _index.scss        		 # imports for all mixins + global project variables
	|   |-- _fonts.scss  			 # @font-face mixins
	|   |-- _functions.scss  	     # ems to rems conversion, etc.
	|   |-- _global.scss  		     # global variables
	|   |-- _helpers.scss  			 # placeholder helper classes
	|   |-- _mixins.scss  			 # media queries, CSS3, etc.
	|
	|   |-- _lib.scss  			     # imports for third party styles
	|  	|-- + lib/   				 # third party styles
	|       |-- _pesticide.scss      # http://pesticide.io/
	|       |-- _prism.scss          # customized version of http://prismjs.com/
	|       |-- _rrssb.scss          # http://www.kurtnoble.com/labs/rrssb
	|       |-- _tipsy.scss          # http://dangthanh.org/labs/tipsy/
	|
	|       |-- + bourbon/           # http://bourbon.io/
	|           |-- _bourbon.scss
	|           ...
	|       |-- _susy.scss           # http://susy.oddbird.net/
	|       |-- + susy/              # susy files
	|           ...
	|       |-- + font-awesome/           # http://fontawesome.io/
	|           |-- _font-awesome.scss
	|           ...
	|
	|   + ie.scss     	             # IE specific Sass file
	|   + style.scss       	         # primary Sass file
	|   + _shame.scss  			     # because hacks happen
	|
	+ .editorconfig                  # 
	+ .htaccess                      # Apache server configs
	+ config.rb	                     # Compass configuration file
	+ crossdomain.xml                # cross-domain requests
	+ deploy.rb                      # Capistrano configuration file
	+ Gemfile                        # Gem dependencies for Ruby
	+ Gruntfile.js                   # Grunt configuration & tasks
	+ package.json                   # Grunt metadata & dependencies

## Thanks & Resources

This toolkit is based on the work of the following fine people & projects.

- [Scalable and Modular Architecture for CSS](http://smacss.com/book/type-state) (<abbr title="Scalable and Modular Architecture for CSS">SMACSS</abbr>)
- [Lemanz](https://github.com/grayghostvisuals/lemanz)
- [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
- [Normalise.css](http://necolas.github.com/normalize.css/)
- [Jake Archibald](http://jakearchibald.github.com/sass-ie/) for the Sass IE implementation
- [Jen Simmons' Design Starterkit](https://github.com/jensimmons/designstarterkit)