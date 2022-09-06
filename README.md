# Coding Task for Brilo.team

Designed on [imgur](https://imgur.com/a/GzT7xhW).

Deployed on [brilo.janturon.cz](https://brilo.janturon.cz/) - temporary issues with Let's encrypt certificate.

## Install

1. Run `npm install` in the project root
2. Target the document root of your favorite http server to the **web** subfolder

## Build

Run `gulp` or `gulp watch` to build *.scss and *.ts files in **assets** subfolder to *.css and *.js files in **web** directory.

## Front-End Testing

Edit **web/js/data.json** with dummy data.

## Folder Structure

- **/css** styles deployed from *assets/scss*
- **/js** scripts deployed from *assets/ts*
-- **/scripts.js** ad-hoc lean template system for testing without full-blown back-end
- **/img** static images
- **/font** Montserrat Light Latin-Extended-A subset in woff format
- **/pages** targets of link fetches
-- **/index.html** - the only one implemented (based on the design above), responsivity achieved by grid system mentioned below
-- **/mywork.html /about.html** - dummy pages to enable in-page links

## CSS naming conventions

- Most of the styles are based on BEM
- There are some general styles (main container, button, css variables) in main.scss
- Simplified grid system loosely inspired by Bootstrap in grid.scss
- Rudimentary presenter (page-*.scss) and component (component-*.scss) styles suggested in two more files

## Notes

I know some HTML template system like moustache or latte could be utilized, I just prefer standards (i.e. data attributes) to frameworks. I am open to other points of views. I also didn't run web audits.

It took me two evenings to pull this out: For two hours I was thinking about what is worth to use and which approach to take. For another two hours I got stuck with gulp as I usually "just use it" and seldom set it up. 1 hour of work was reverted in attempts to implement JS as module and import data into TS, but I am not too familiar with this, so I choose the old-fashioned way.