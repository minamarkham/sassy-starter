# SMACSS Your Sass Up

*Disclaimer: This is an evolving project*

A starter toolkit based on [Scalable and Modular Architecture for CSS](http://smacss.com/) (SMACSS) for [Sass](http://sass-lang.com/) (SCSS) projects. Do what you'd like with it :)

Styles are broken down into the following groups: **Base, Layout, Module, State, Theme**

## Quick start

1. Clone the git repo – `git clone https://github.com/minamarkham/sassy-starter` or download zip file directly.
2. Install Sass 3.3 – `gem install sass`.

## Directory structure

```
  + scss/  
  |  
  | + base/                # reset, typography, site-wide  
  |   |-- _index.scss      # imports for all base styles  
  |   |-- _base.scss       # base styles  
  |   |-- _normalize.scss  # normalize reset  
  |  
  | + layout/              # major components, e.g., header, footer etc.  
  |   |-- _index.scss      # imports for all layout styles  
  |
  | + modules/             # minor components, e.g., buttons, widgets etc.
  |   |-- _index.scss      # imports for all modules
  |
  | + states/              # js-based classes, alternative states e.g., success or error state
  |   |-- _index.scss      # imports for all state styles
  |   |-- _states.scss     # state rules
  |   |-- _print.scss      # print styles
  |   |-- _touch.scss      # touch styles
  |
  | + themes/              # alternative themes (optional)
  |   |-- _index.scss      # imports for all themes
  |
  | + utilities/           # non-CSS outputs (i.e. mixins, variables) & non-modules
  |   |-- _index.scss      # imports for all mixins + global project variables
  |   |-- _fonts.scss      # @font-face mixins
  |   |-- _functions.scss  # ems to rems conversion, etc.
  |   |-- _global.scss     # global variables
  |   |-- _helpers.scss    # placeholder helper classes
  |   |-- _mixins.scss     # media queries, CSS3, etc.
  |
  |   |-- _lib.scss        # imports for third party styles
  |   |-- + lib/           # third party styles
  |
  |   + ie.scss            # IE specific Sass file
  |   + style.scss         # primary Sass file
  |   + _shame.scss        # because hacks happen
  |
  + .htaccess              # Apache server configs
  + config.rb              # Compass configuration file
  + crossdomain.xml        # cross-domain requests
  + deploy.rb              # Capistrano configuration file
  + Gruntfile.js           # Grunt configuration & tasks
  + package.json           # Grunt metadata & dependencies
```

## Thanks & Resources

This toolkit is based on the work of the following fine people & projects.

- [Scalable and Modular Architecture for CSS](http://smacss.com/book/type-state) (<abbr title="Scalable and Modular Architecture for CSS">SMACSS</abbr>)
- [Lemanz](https://github.com/grayghostvisuals/lemanz)
- [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
- [Normalise.css](http://necolas.github.com/normalize.css/)
- [Jake Archibald](http://jakearchibald.github.com/sass-ie/) for the Sass IE implementation
- [Jen Simmons' Design Starterkit](https://github.com/jensimmons/designstarterkit)
