/*
 * grunt-htmlTjs
 * https://github.com/shehuaqigai/grunt-htmlTjs
 *
 * Copyright (c) 2014 yang chang qiu
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk');
var declare = require('nsdeclare');
module.exports = function(grunt) {
    // filename conversion for templates
    var defaultProcessName = function(filepath) {
        var name=filepath.split("/").pop();
        var jstName=name.split(".html")[0];
        return jstName;
    };
    grunt.registerMultiTask('htmltjs', 'html to js template', function() {
        var lf = grunt.util.linefeed;
        var options = this.options({
            namespace: 'JST',
            templateSettings: {},
            processContent: function (src) { return src; },
            separator: lf + lf,
            root:false,
            prettify:true
        });

        // assign filename transformation functions
        var processName = options.processName || defaultProcessName;

        var nsInfo,rootName,declaration;
        if (options.namespace !== false) {
            if(!options.root){
                rootName='this';
            }else{
                rootName=options.root;
            }
            declaration = declare(options.namespace,{root:rootName});

        }
        nsInfo=declaration.split(';');
        nsInfo.pop();
        var prefix=nsInfo.pop().split("=")[0];
        this.files.forEach(function(f) {
            var output = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
                    return false;
                } else {
                    return true;
                }
            })
                .map(function(filepath) {
                    var src = options.processContent(grunt.file.read(filepath));
                    var compiled,filename;

                    try {
                        compiled = "_.template('"+src+"')";
                    } catch (e) {
                        grunt.log.error(e);
                        grunt.fail.warn('JST ' + chalk.cyan(filepath) + ' failed to compile.');
                    }

                    if (options.prettify) {
                        compiled = compiled.replace(/(\r)*\n|\t|\<\!\-\-[\s\S]*?\-\-\>/g,"");
                    }
                    filename = processName(filepath);

                    if (options.amd && options.namespace === false) {
                        return 'return ' + compiled;
                    }
                    return prefix+'['+JSON.stringify(filename)+'] = '+compiled+';';
                });

            if (output.length < 1) {
                grunt.log.warn('Destination not written because compiled files were empty.');
            } else {
                if (options.namespace !== false) {
                    output.unshift(declaration);
                    output.unshift("(function(){");
                    output.push("})();");
                }
                if (options.amd) {
                    if (options.prettify) {
                        output.forEach(function(line, index) {
                            output[index] = "  " + line;
                        });
                    }
                    output.unshift("define(function(){");
                    if (options.namespace !== false) {
                        // Namespace has not been explicitly set to false; the AMD
                        // wrapper will return the object containing the template.
                        output.push("  return " + nsInfo.namespace + ";");
                    }
                    output.push("});");
                }
                grunt.file.write(f.dest,  output.join(grunt.util.normalizelf(options.separator)));
                grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
            }
        });
    });

};
