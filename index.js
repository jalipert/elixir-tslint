var gulp   = require( 'gulp' );
var jshint = require( 'gulp-tslint' );
var Elixir = require( 'laravel-elixir' );

/*
 |----------------------------------------------------------------
 | tslint
 |----------------------------------------------------------------
 |
 | This task uses tslint to enforce proper coding conventions and
 | detect errors or potential problems in your TypeScript code
 | before the files are transpiled and minified.
 */

Elixir.extend( 'tslint', function( src, options )
{
    var paths = new Elixir.GulpPaths().src( src );

    new Elixir.Task( 'tslint', function()
    {
        this.log( paths.src );

        return gulp
            .src( src )
            .pipe( tslint( options || {} ))
            .pipe( tslint.report( 'prose' ))
            .on( 'error', function( e )
            {
                new Elixir.Notification().error( e, 'tslint Failed!' )
                this.emit('end');
            })
            .pipe( new Elixir.Notification( 'tslint Passed!' ));
    })
    .watch( paths.src.path );
});