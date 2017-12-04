/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtable'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      self.data = ko.observableArray();
      var clientId = 'EgxgxINFK0tHioSYiY87Og..';
      var state = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var ordsOauth2AuthBaseUrl = "http://localhost:8888/ords/pdbadmin/oauth/auth";
      var ordsOauth2AuthUrl = ordsOauth2AuthBaseUrl + "?response_type=token&client_id=" + clientId + "&state=" + state;
      var apiUrl = "http://localhost:8888/ords/pdbadmin/tech17demo/second_line_support/customer/";
      $(document).ready(function () {
          $.ajax({
              url: apiUrl,
              type: 'GET',
              dataType: 'json',
              success: function (settings) {
                  console.log(settings);
                  $.each(settings.items, function () {
                      self.data.push({
                          id: this.id,
                          name: this.name,
                          lastname: this.lastname,
                          financial_statement_status: this.financial_statement_status,
                          comments: this.comments
                      });
                  });
              },
              error: function () {
                  window.location = ordsOauth2AuthUrl;
              },
              beforeSend: function (xhr) {
                  setHeader(xhr);
              }
          });
      });
      self.dataSource = new oj.ArrayTableDataSource(
              self.data,
              {idAttribute: 'id'});
    }

    function setHeader(xhr) {
      var token = getUrlVars()["access_token"];
      if (token !== undefined) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
      } else {
          console.log("No token in the request");
      }
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
        for (var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    
    return new DashboardViewModel();
  }
);
