/*
 * grunt-rails-server
 * https://github.com/joefiorini/grunt-rails-server
 *
 * Copyright (c) 2013 Joe Fiorini
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var spawn = require('child_process').spawn;
  var _currentProcess;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // grunt.registerTask('rails:server:restart', ['rails:server:kill', 'rails:server:start']);

  var _pidFile = "tmp/pids/server.pid";

  grunt.registerTask('railsServer', 'Control your Rails server via Grunt', function(environment) {
    var options = this.options();
    var args = [];

    if (environment == 'test') {
      args.push('-e', 'test');
      args.push('-p', '3001');

      _pidFile = 'tmp/pids/rails_server_test.pid';
      args.push('--pid', _pidFile);
    }

    args.unshift('server');
    _currentProcess = spawn('rails', args, {
      stdio: ['ignore', process.stdout, 'ignore']
    });

    process.on('exit', function() {
      _currentProcess.kill();
    });
  });
};
