module.exports = function (grunt) {

    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.name || javascript %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        clean: {
            src: ['<%= pkg.webAssetsDir %>/**']
        },
        ts: {
            options: {
                target: 'es6',
                module: 'amd',
                sourceMap: false,
                declaration: false,
                noLib: false,
                comments: false
            },
            dev: {
                src: ['<%= pkg.srcAssetsDir %>/js/src/**/*.ts'],
                //watch: 'src',
                //reference: "src/reference.ts",
                out: '<%= pkg.webDir %>/<%= pkg.srcAssetsDir %>/js/src/main.js'
            }
        },
        copy: {
            scripts: {
                files: [
                    {
                        expand: true,
                        src: [
                            'index.html',
                            '<%= pkg.srcAssetsDir %>/js/src/**/*.js',
                            '<%= pkg.srcAssetsDir %>/js/require.config.js',
                            '<%= pkg.srcAssetsDir %>/js/lib/requirejs/require.js',
                            '<%= pkg.srcAssetsDir %>/js/lib/babylonjs/dist/babylon.2.5.js'
                        ],
                        dest: '<%= pkg.webDir %>'
                    }
                ]
            },
            extra: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            '<%= pkg.srcAssetsDir %>/images/*'
                        ],
                        dest: '<%= pkg.webAssetsDir %>/images'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                preserveComments: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.webAssetsDir %>/js/',
                        src: ['**/*.js'],
                        dest: '<%= pkg.webAssetsDir %>/js/'
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= pkg.srcAssetsDir %>/js/**',
                    '!<%= pkg.srcAssetsDir %>/js/lib/**'
                ],
                tasks: ['copy:scripts']
            },
            extra: {
                files: [
                    '<%= pkg.srcAssetsDir %>/images/**',
                    '<%= pkg.srcAssetsDir %>/fonts/**'
                ],
                tasks: ['copy:extra']
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    // tasks
    grunt.registerTask('default', ['clean', 'ts:dev', 'copy', 'uglify']);
};