var tng = [];
var casper = require('casper').create();

casper.start('https://tngportal.touchngo.com.my/tngPortal/login', function() {

  casper.waitForSelector('form[name="f"]', function() {

    this.fillSelectors('form[name="f"]', {
      'input[id="j_username"]' : '<put your username here>',
      'input[id="j_password"]' : '<put your password here>'
    }, true);

  });

});

casper.then(function () {

  this.evaluate(function () {
    $('form[name="f"]').submit();
  });

});

casper.then(function () {

  casper.waitForSelector('table[id="l_com_xerox_ts_domain_CardRegistration"]', function() {

    var serial = casper.evaluate(function () {
      return [].map.call(__utils__.findAll('table[id="l_com_xerox_ts_domain_CardRegistration"] tbody tr td:nth-child(1)'), function (e) { return e.innerHTML; });
    });

    var value = casper.evaluate(function () {
      return [].map.call(__utils__.findAll('table[id="l_com_xerox_ts_domain_CardRegistration"] tbody tr td:nth-child(2)'), function (e) { return e.innerHTML; });
    });

    var info = [];

    for (var i=0; i<serial.length; i++)
    {
      info[i] = [serial[i] ,value[i]];
    }

    tng = JSON.stringify(info);

  });

});

casper.run(function() {

  this.echo(tng).exit();

});
