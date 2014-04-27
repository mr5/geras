module.exports = function (grunt) {

// -- Config -------------------------------------------------------------------

grunt.initConfig({

    pkg  : grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),

    // -- bower.json Config ---------------------------------------------------------

    bower_json: {
        release: {
            values: {
                main: 'demeter.css'
            },

            dest: 'build/'
        }
    },

    // -- Clean Config ---------------------------------------------------------

    clean: {
        build    : ['build/'],
        build_res: ['build/*-r.css'],
        release  : ['release/<%= pkg.version %>/']
    },

    // -- Copy Config ----------------------------------------------------------

    copy: {
        build: {
            src    : 'src/css/*.css',
            dest   : 'build/',
            expand : true,
            flatten: true
        },

        release: {
            src : '{LICENSE.md,README.md,HISTORY.md}',
            dest: 'build/'
        }
    },

    // -- Concat Config --------------------------------------------------------

    concat: {
        build: {
            files: [
                {'build/base.css': [
//                    'bower_components/normalize-css/normalize.css',
                    'build/base.css'
                ]},

                {'build/buttons.css': [
                    'build/buttons-core.css',
                    'build/buttons.css'
                ]},

                {'build/forms-nr.css': [
                    'build/forms.css'
                ]},

                {'build/forms.css': [
                    'build/forms-nr.css',
                    'build/forms-r.css'
                ]},

                {'build/grids-nr.css': [
                    'build/grids-core.css',
                    'build/grids-units.css'
                ]},

                {'build/grids.css': [
                    'build/grids-nr.css',
                    'build/grids-r.css'
                ]},

                {'build/menus-nr.css': [
                    'build/menus-core.css',
                    'build/menus.css',
//                    'build/menus-paginator.css'
                ]},
                {'build/grids-nr.css': [
                    'build/grids-core.css',
                ]},
                {'build/grids.css': [
                    'build/grids-nr.css',
                    'build/grids-r.css'
                ]},

                {'build/menus.css': [
                    'build/menus-nr.css',
                    'build/menus-r.css'
                ]},
                {'build/panels-nr.css': [
                    'build/panels.css',
                ]},
                {'build/panels.css': [
                    'build/panels-nr.css',
                    'build/panels-r.css'
                ]},
                // Rollups

                {'build/<%= pkg.name %>.css': [
                    'build/base.css',
                    'build/grids.css',
                    'build/buttons.css',
                    'build/forms.css',
                    'build/menus.css',
                    'build/tables.css',
                    'build/panels.css',
                    'build/typo.css',
                    'build/pagination.css',
                    'build/breadcrumb.css'



                ]},

                {'build/<%= pkg.name %>-nr.css': [
                    'build/base.css',
                    'build/grids-nr.css',
                    'build/buttons.css',
                    'build/forms-nr.css',
                    'build/menus-nr.css',
                    'build/tables.css',
                    'build/panels-nr.css',
                    'build/typo.css',
                    'build/pagination.css',
                    'build/breadcrumb.css'


                ]}
            ]
        }
    },

    // -- CSSLint Config -------------------------------------------------------

    csslint: {
        options: {
            csslintrc: '.csslintrc'
        },

        base   : ['src/base.css'],
        buttons: ['src/buttons.css'],
        forms  : ['src/forms/css/*.css'],
        grids  : ['src/grids/css/*.css'],
        menus  : ['src/menus/css/*.css'],
        tables : ['src/tables/css/*.css']
    },

    // -- CSSMin Config --------------------------------------------------------

    cssmin: {
        options: {
            noAdvanced: true
        },

        files: {
            expand: true,
            src   : 'build/*.css',
            ext   : '-min.css'
        }
    },

    // -- Compress Config ------------------------------------------------------

    compress: {
        release: {
            options: {
                archive: 'release/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.tar.gz'
            },

            expand : true,
            flatten: true,
            src    : 'build/*',
            dest   : '<%= pkg.name %>/<%= pkg.version %>/'
        }
    },

    // -- License Config -------------------------------------------------------

    license: {
        normalize: {
            options: {
                banner: [
                    '/*!',
                    'normalize.css v<%= bower.devDependencies["normalize-css"] %> | MIT License | git.io/normalize',
                    'Copyright (c) Nicolas Gallagher and Jonathan Neal',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            cwd   : 'build/',
            src   : ['base*.css', '<%= pkg.name %>*.css']
        },

        demeter: {
            options: {
                banner: [
                    '/*!',
                    '<%= pkg.name %> v<%= pkg.version %> | MIT License | http://demeter.mr-5.cn ',
                    'GitHub: https://github.com/mr5/demeter',
                    'https://github.com/mr5/demeter/blob/master/LICENSE.md',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            src   : ['build/*.css']
        }
    },

    // -- Pure Grids Units Config ----------------------------------------------

//    pure_grids: {
//        default_units: {
//            dest: 'build/grids-units.css',
//
//            options: {
//                units: [5, 24]
//            }
//        }
//    },

    // -- CSS Selectors Config -------------------------------------------------

    css_selectors: {
        base: {
            src : 'build/base.css',
            dest: 'build/base-context.css',

            options: {
                mutations: [{prefix: '.pure'}]
            }
        }
    },
    jade: {
        compile: {
            options: {
                pretty:true,
                data: {}
            },
            files: [{
                expand: true,
//                cwd: 'source',
                src: [ 'src/*.jade', 'src/tests/*.jade' ],
                dest: './',
                ext: '.html'
            }]
        }
    },

    // -- Watch/Observe Config -------------------------------------------------

    observe: {
        src: {
            files: 'src/**.css',
            tasks: ['test', 'suppress', 'build'],

            options: {
                interrupt: true
            }
        }
    }
    ,
    // -- KISSY Module Compile Config -------------------------------------------------

    kmc: {
        options: {
            packages: [
                {
                    name: '<%= pkg.name %>',
                    path: '../',
                    charset:'utf-8',
                    ignorePackageNameInUri:true
                }
            ],
            depFilePath:'build/mods.js',
            comboOnly:false,// 不要静态合并
            fixModuleName:true,// 补全模块名称
            comboMap:true
        },

        main: {
            files: [
                {
                    // 这里指定项目根目录下所有文件为入口文件
                    expand: true,
                    cwd: 'src/',
                    src: [ '**/*.js', '!Gruntfile.js'],
                    dest: 'build/'
                }
            ]
        }
    }
});

// -- Main Tasks ---------------------------------------------------------------

// npm tasks.
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-css-selectors');
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.loadNpmTasks('grunt-kmc');

// Local tasks.
grunt.loadTasks('tasks/');

//grunt.registerTask('default', ['import', 'test', 'build']);
grunt.registerTask('default', ['build']);

//grunt.registerTask('import');
grunt.registerTask('test', ['csslint']);
grunt.registerTask('build', [
    'clean:build',
    'copy:build',
//    'pure_grids',
//    'concat:build',
    'clean:build_res',
    'css_selectors:base',
    'cssmin',
    'jade',
    'license',
    'kmc'
]);

// Makes the `watch` task run a build first.
grunt.renameTask('watch', 'observe');
grunt.registerTask('watch', ['default', 'observe']);

grunt.registerTask('release', [
    'default',
    'clean:release',
    'copy:release',
//    'bower_json:release',
    'compress:release'
]);

};
