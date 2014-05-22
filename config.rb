# COMPASS CONFIG
# http://compass-style.org/help/tutorials/configuration-reference/

# Plugins
# =======
# Require any compass plugins you need

# Plugin:   example name
# URL:      http://example.com/
# Github:   https://github.com/example
# require 'example'

# Config
# ======

# Set this to the root of your project when deployed:
#
# http_path = "http://url.com/"

# Set the images directory relative to your http_path or change
# the location of the images themselves using http_images_path:
#
# http_images_dir = "img"

# http://compass-style.org/reference/compass/helpers/urls/#stylesheet-url
# http://chriseppstein.github.com/blog/2010/05/17/where-are-your-images
#
# http_images_path = ""

# Compass will automatically add cache busters to your images based on image timestamps.
# This will keep browser caches from displaying the wrong image if you change the image but not the url.
# If you don’t want this behavior, it's easy to configure or disable:
#
# asset_cache_buster do |http_path, real_path|
#   nil
# end

# Import Path
#
# add_import_path = ""

# Project Assets Location
css_dir = "css"
sass_dir = "css/src"
images_dir = "img"
javascripts_dir = "js"

# Projects Font Directory
fonts_dir = "fonts"

# Development
output_style = :expanded
environment = :development

# Production
# output_style = :compressed
# environment = :production

# Enables relative paths to assets via compass helper functions
relative_assets = true

# Enable or disable line comments
line_comments = false

# Color output
color_output = false

# Repeating Linear Gradients Support
# https://github.com/chriseppstein/compass/issues/401
#
Compass::BrowserSupport.add_support("repeating-linear-gradient", "webkit", "moz", "ms")

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
#
# sass-convert -R --from scss --to sass scss scss && rm -rf sass && mv scss sass