'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);
  },


  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine ' + chalk.red('.NET Core with Nancy framework [Microservice]') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'applicationName',
      message: 'The name of the application:',
      default: 'CustomApp'
    }, {
      type: 'confirm',
      name: 'includeFormsAuth',
      message: 'Would you like to include Forms authentication?',
      default: false
    }, {
      type: 'confirm',
      name: 'includeViews',
      message: 'Would you like to include Views (Super Simple View Engine)?',
      default: false
    }, {
      type: 'input',
      name: 'port',
      message: 'The port of the application:',
      default: '5000'
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
    var appBaseDir = "Application/";
    var appResultDir = this.props.applicationName + "/";
    var testBaseDir = "Test/";
    var testResultDir = this.props.applicationName + ".Tests/";

    var folderBusinessLogic = 'BusinessLogic/';
    var folderServices = 'Services/';
    var folderModules = 'Modules/';
    var folderProperties = 'Properties/';
    var folderModels = 'Models/';
    var folderViews = 'Views/';
    var folderTestHelpers = 'TestHelpers/';

    this.fs.copyTpl(this.templatePath(appBaseDir + 'appsettings.Development.json'), this.destinationPath(appResultDir + 'appsettings.Development.json'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'appsettings.Production.json'), this.destinationPath(appResultDir + 'appsettings.Production.json'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'Bootstrapper.cs'), this.destinationPath(appResultDir + 'Bootstrapper.cs'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'NancyCustomAPI.csproj'), this.destinationPath(appResultDir + this.props.applicationName + '.csproj'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'Program.cs'), this.destinationPath(appResultDir + 'Program.cs'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'Startup.cs'), this.destinationPath(appResultDir + 'Startup.cs'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'web.config'), this.destinationPath(appResultDir + 'web.config'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + 'hosting.json'), this.destinationPath(appResultDir + 'hosting.json'), this.props);

    this.fs.copyTpl(this.templatePath(appBaseDir + folderBusinessLogic + folderServices + 'Interfaces/IAppSettings.cs'), this.destinationPath(appResultDir + folderBusinessLogic + folderServices + 'Interfaces/IAppSettings.cs'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + folderBusinessLogic + folderServices + 'Interfaces/IVersionService.cs'), this.destinationPath(appResultDir + folderBusinessLogic + folderServices + 'Interfaces/IVersionService.cs'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + folderBusinessLogic + folderServices + 'AppSettings.cs'), this.destinationPath(appResultDir + folderBusinessLogic + folderServices + 'AppSettings.cs'), this.props);
    this.fs.copyTpl(this.templatePath(appBaseDir + folderBusinessLogic + folderServices + 'VersionService.cs'), this.destinationPath(appResultDir + folderBusinessLogic + folderServices + 'VersionService.cs'), this.props);

    this.fs.copyTpl(this.templatePath(appBaseDir + folderModules + 'MainModule.cs'), this.destinationPath(appResultDir + folderModules + 'MainModule.cs'), this.props);

    this.fs.copyTpl(this.templatePath(appBaseDir + folderProperties + 'launchSettings.json'), this.destinationPath(appResultDir + folderProperties + 'launchSettings.json'), this.props);

    if (this.props.includeFormsAuth) {
      this.fs.copyTpl(this.templatePath(appBaseDir + folderModels + 'User.cs'), this.destinationPath(appResultDir + folderModels + 'User.cs'), this.props);
      this.fs.copyTpl(this.templatePath(appBaseDir + folderBusinessLogic + folderServices + 'UserProvider.cs'), this.destinationPath(appResultDir + folderBusinessLogic + folderServices + 'UserProvider.cs'), this.props);
    }

    if (this.props.includeViews) {
      this.fs.copyTpl(this.templatePath(appBaseDir + folderViews + 'MasterPage.html'), this.destinationPath(appResultDir + folderViews + 'MasterPage.html'), this.props);
      this.fs.copyTpl(this.templatePath(appBaseDir + folderViews + 'Index.html'), this.destinationPath(appResultDir + folderViews + 'Index.html'), this.props);
      this.fs.copyTpl(this.templatePath(appBaseDir + folderViews + 'Login.html'), this.destinationPath(appResultDir + folderViews + 'Login.html'), this.props);
      this.fs.copyTpl(this.templatePath(appBaseDir + folderViews + 'Secure.html'), this.destinationPath(appResultDir + folderViews + 'Secure.html'), this.props);
    }

    if (this.props.includeUnitTests) {
      this.fs.copyTpl(this.templatePath(testBaseDir + 'appsettings.Test.json'), this.destinationPath(testResultDir + 'appsettings.Test.json'), this.props);
      this.fs.copyTpl(this.templatePath(testBaseDir + 'NancyCustomAPI.Tests.csproj'), this.destinationPath(testResultDir + this.props.applicationName + '.Tests.csproj'), this.props);

      mkdirp.sync(this.destinationPath(testResultDir + folderBusinessLogic + folderServices));

      this.fs.copyTpl(this.templatePath(testBaseDir + folderModules + 'MainModuleTests.cs'), this.destinationPath(testResultDir + folderModules + 'MainModuleTests.cs'), this.props);

      this.fs.copyTpl(this.templatePath(testBaseDir + folderProperties + 'AssemblyInfo.cs'), this.destinationPath(testResultDir + folderProperties + 'AssemblyInfo.cs'), this.props);

      this.fs.copyTpl(this.templatePath(testBaseDir + folderTestHelpers + 'MockServiceProvider.cs'), this.destinationPath(testResultDir + folderTestHelpers + 'MockServiceProvider.cs'), this.props);
      this.fs.copyTpl(this.templatePath(testBaseDir + folderTestHelpers + 'TestBase.cs'), this.destinationPath(testResultDir + folderTestHelpers + 'TestBase.cs'), this.props);
    }
  }
});
