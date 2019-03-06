
var App =
{

  /**
   * Start
   */
  start: function()
  {
    var test_settings = window.localStorage.getItem( 'test_settings' );

    if( test_settings )
    {
      test_settings = JSON.parse( test_settings );

      document.getElementById( 'environment' ).value = test_settings.environment;
      document.getElementById( 'theme' ).value = test_settings.theme;
      document.getElementById( 'enduser_token' ).value = test_settings.enduser_token;
      document.getElementById( 'consultation_id' ).value = test_settings.consultation_id;
      document.getElementById( 'customer_id' ).value = test_settings.customer_id;
      document.getElementById( 'action' ).value = test_settings.action;
      document.getElementById( 'tls' ).value = test_settings.tls;
      document.getElementById( 'portal_name' ).value = test_settings.portal_name;
      document.getElementById( 'service_id' ).value = test_settings.service_id;
      document.getElementById( 'face2face' ).value = test_settings.face2face;
      document.getElementById( 'lng' ).value = null;
      document.getElementById( 'voip_notifications' ).value = test_settings.voip_notifications;
      // CALLKIT
      document.getElementById( 'extraUseCallkit' ).value = test_settings.extraUseCallkit;
    }

    this._printInstalledPlugins();
  },



  /**
   * Open Phemium plugin
   */
  openPhemium: function()
  {
    var test_settings =
    {
      environment: document.getElementById( 'environment' ).value,
      theme: document.getElementById( 'theme' ).value,
      enduser_token: document.getElementById( 'enduser_token' ).value || null,
      consultation_id: document.getElementById( 'consultation_id' ).value || null,
      appointment_external_id: null,
      show_consultations_by_status: null,
      customer_id: document.getElementById( 'customer_id' ).value || null,
      action: document.getElementById( 'action' ).value || null,
      tls: document.getElementById( 'tls' ).value,
      portal_name: document.getElementById( 'portal_name' ).value,
      service_id: document.getElementById( 'service_id' ).value,
      face2face: document.getElementById( 'face2face' ).value,
      lng: document.getElementById( 'lng' ).value || null,
      voip_notifications: document.getElementById( 'voip_notifications' ).value,
      // CALLKIT
      extraUseCallkit: document.getElementById( 'extraUseCallkit' ).value,
      //ORIGIN URL TO RETURN FROM PHEMIUM
      origin_url: document.getElementById( 'origin_url' ).value

    };

    window.localStorage.setItem( 'test_settings', JSON.stringify( test_settings ) );

    var plugin = new window.plugins.PhemiumEnduserPlugin();

    plugin.open_consultation( test_settings );

  },



  /**
   * Print installed plugins
   *
   * @private
   */
  _printInstalledPlugins: function()
  {
    if( !window.cordova )
    {
      return;
    }

    var installedPlugins = cordova.require( 'cordova/plugin_list' ).metadata;
    var key;

    for( key in installedPlugins )
    {
      if( installedPlugins.hasOwnProperty( key ) )
      {
        console.log( key + ' = ' + installedPlugins[ key ] );

        var pluginNVersion = key + ': ' + installedPlugins[ key ];
        this._addPluginToList( pluginNVersion );
      }
    }
  },



  /**
   * Add plugin to list
   *
   * @param {String} pluginNVersion
   * @private
   */
  _addPluginToList: function( pluginNVersion )
  {
    var ul = document.getElementById( 'plugin-list' );
    var li = document.createElement( 'li' );
    li.innerHTML = pluginNVersion;
    li.classList.add( 'item' );
    li.classList.add( 'item-text-wrap' );
    ul.appendChild( li );
  },


  /**
   * Facilitate token input on testApp interface
   *
   * @param {String} token
   */
  setToken: function( token )
  {
    document.getElementById( 'enduser_token' ).value = token;
  },



  /**
   * Start VoIP notifications
   *
   * @private
   */
  start_voip_notifications: function()
  {
    var push = VoIPPushNotification.init();

    // Handle VoIP Push Notifications events
    push.on( 'registration', function( data )
    {
      document.getElementById( 'voip_token' ).value = data.deviceToken;

    });

    push.on( 'notification', function( data )
    {

      // These configurations must arrive with voip notification
      var test_settings = window.localStorage.getItem( 'test_settings' );
      if( test_settings )
      {
        voip_settings = JSON.parse( test_settings );
        voip_settings.action = "call_request";

        // ***********************
        // Open Enduser plugin with action = call_request to open incoming call
        // ***********************
        var plugin = new window.plugins.PhemiumEnduserPlugin();

        // Open phemium over localhost with ionic webview
        if ( window.location.hostname === "localhost" )
        {
          plugin.open_consultation( voip_settings );
        }
        // Open phemium with  Apache wkwebview engine
        else
        {
          plugin.open_consultation( voip_settings );
        }
      }
    });

    push.on( 'error', function( e )
    {
      console.error( "Error on VoIP notifications", e );
    });
  },


};
