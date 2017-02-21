'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);
  },


  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine ' + chalk.red('.NET Core with Nancy') + ' generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'type',
      message: 'What type of application do you want to create?',
      choices: [
        {
          name: 'API',
          value: 'api'
        },
        {
          name: 'Web application',
          value: 'web'
        }
      ],
      default: 'api'
    }, {
      type: 'input',
      name: 'applicationName',
      message: 'The name of the application:',
      default: 'CustomApp'
    }, {
      type: 'confirm',
      name: 'includeUnitTests',
      message: 'Would you like to include a UnitTest project?',
      default: false
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(this.templatePath('appsettings.Development.json'), this.destinationPath('appsettings.Development.json'), this.props);
    this.fs.copyTpl(this.templatePath('appsettings.Production.json'), this.destinationPath('appsettings.Production.json'), this.props);
    this.fs.copyTpl(this.templatePath('Bootstrapper.cs'), this.destinationPath('Bootstrapper.cs'), this.props);
    this.fs.copyTpl(this.templatePath('NancyCustomAPI.xproj'), this.destinationPath(this.props.applicationName + '.xproj'), this.props);
    this.fs.copyTpl(this.templatePath('Program.cs'), this.destinationPath('Program.cs'), this.props);
    this.fs.copyTpl(this.templatePath('project.json'), this.destinationPath('project.json'), this.props);
    this.fs.copyTpl(this.templatePath('Startup.cs'), this.destinationPath('Startup.cs'), this.props);
    this.fs.copyTpl(this.templatePath('web.config'), this.destinationPath('web.config'), this.props);

    var folderBusinessLogic = 'BusinessLogic';
    var folderServices = folderBusinessLogic + '/Services';

    this.fs.copyTpl(this.templatePath(folderServices + '/Interfaces/IAppSettings.cs'), this.destinationPath(folderServices + '/Interfaces/IAppSettings.cs'), this.props);
    this.fs.copyTpl(this.templatePath(folderServices + '/Interfaces/IHomeService.cs'), this.destinationPath(folderServices + '/Interfaces/IHomeService.cs'), this.props);
    this.fs.copyTpl(this.templatePath(folderServices + '/AppSettings.cs'), this.destinationPath(folderServices + '/AppSettings.cs'), this.props);
    this.fs.copyTpl(this.templatePath(folderServices + '/HomeService.cs'), this.destinationPath(folderServices + '/HomeService.cs'), this.props);

    var folderModules = 'Modules';

    this.fs.copyTpl(this.templatePath(folderModules + '/HomeModule.cs'), this.destinationPath(folderModules + '/HomeModule.cs'), this.props);

    var folderProperties = 'Properties';

    this.fs.copyTpl(this.templatePath(folderProperties + '/launchSettings.json'), this.destinationPath(folderProperties + '/launchSettings.json'), this.props);
  }
});
