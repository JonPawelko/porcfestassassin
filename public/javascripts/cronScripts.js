const cron = require('node-cron');  // scheduling shift checks, starting, stopping game
var express = require('express');
var dbConn  = require('../../lib/db');   // database object

// -----------------------------------------------

module.exports = {
   startCronScripts: function()
   {
      startGameScript();
//      endGameScript();
//      startDayScript();
//      endDayScript();
//      oneHourToGoScript();
//      twoHoursToGoScript();
      return "Started Scripts";
   }
}

// -----------------------------------------------

function startGameScript()
{
  cron.schedule('* * * * *', () => {

      // Call stored procedure test
      dbConn.query('CALL `assassin-demo1`.`temp_tester`()', function(err,rows)
      {
          if(err)
          {
              console.log("Error on temp_tester call.");
              req.flash('error', err);
          } else
          {
              // resetDatabase worked
              console.log("temp_tester rpc worked.");
              console.log(rows);
          } // end else

      }); // end query

    //console.log('running a task every minute');
  });
}

// -----------------------------------------------

function endGameScript()
{
  cron.schedule('* * * * *', () => {
    console.log('running a task at end of game.');
  });
}

// -----------------------------------------------

function startDayScript()
{
  cron.schedule('* * * * *', () => {
    console.log('running a task start of day.');
  });
}

// -----------------------------------------------

function endDayScript()
{
  cron.schedule('* * * * *', () => {
    console.log('running a task end of day.');
  });
}

// -----------------------------------------------

function oneHourToGoScript()
{
  cron.schedule('* * * * *', () => {
    console.log('running a task every day, one hour to go.');
  });
}

// -----------------------------------------------

function twoHoursToGoScript()
{
  cron.schedule('* * * * *', () => {
    console.log('running a task every day, two hours to go.');
  });
}
