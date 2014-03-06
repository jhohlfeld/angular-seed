module.exports = function(grunt) {

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
    var dirs = {
        app: 'app'
    };

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

    	title: 'angular-seed.hoodie',

        dirs: dirs,

        hoodie: {
            start: {
                options: {
                    callback: function(config) {
                        grunt.config.set('connect.proxies.0.port', config.stack.www.port);
                        console.log('connect: serving hoodie api via proxy');
                    }
                }
            }
        },

        connect: {
            options: {
                port: 9001,
                base: '<%= dirs.app %>',
                hostname: 'localhost',
                livereload: 35729
            },
            proxies: [{
                context: '/_api',
                host: 'localhost',
                port: 0,
                changeOrigin: false
            }],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= dirs.app %>'
                    ],
                    middleware: function(connect) {
                        return [
                            proxySnippet,
                            connect.static(require('path').resolve(dirs.app))
                        ];
                    }

                }
            }
        },


        watch: {
            js: {
                files: ['<%= dirs.app %>/js/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= dirs.app %>/{,*/}*.html',
                    '<%= dirs.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },


        // Automatically inject Bower components into the app
        'bowerInstall': {
            target: {
                src: [
                    '<%= dirs.app %>/index.html'
                ]
            }
        }

    });

    grunt.registerTask('serve', [
        'bowerInstall',
        'hoodie:start',
        'configureProxies',
        'connect:livereload',
        'watch'
    ]);
};
