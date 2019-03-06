cordova.define("phemium-enduser-plugin.PhemiumEnduserPlugin", function(require, exports, module) {

/**
 * PhemiumEnduser plugin
 *
 */
var PhemiumEnduserPlugin = function()
{

  /**
   * Returns all the available plugin settings
   *
   * @return {Array}
   */
  this.get_settings = function()
  {
    return [
      'enduser_token',
      'consultation_id',
      'appointment_external_id',
      'portal_name',
      'show_consultations_by_status',
      'environment',
      'action',
      'customer_id',
      'service_id',
      'theme',
      'face2face',
      'face2face_phone',
      'face2face_show_logo',
      'face2face_show_logo_footer',
      'lng',
      'voip_notifications',
      'extraUseCallkit',
      'origin_url'
    ];
  };



  /**
   * Open consultation
   *
   * @param {Object} data
   */
  this.open_consultation = function( data )
  {
    cordova.exec( function(){}, function(){}, 'PhemiumEnduserPlugin', 'open', [ this._get_url_params( data ) ] );
  };



  /**
   * Open app
   *
   * @param {Object} data
   */
  this.open_app = function( data )
  {
    // Read the parent url to open phemium in same localhost port
    this._parent_url_array = location.href.split("/");
    this._customer_localhost = this._parent_url_array[0] + "//" + this._parent_url_array[2];

    // Replace localhost url to load phemium
    location.replace( this._customer_localhost + '/phemium/index.html?' + this._get_url_params( data ) );

  };



  /**
   * On new notification received
   *
   * @param {Object} data
   */
  this.on_notification_received = function( data )
  {
    console.log( 'Notification received', data );

    // If undefined request origin is faye
    if( typeof data == 'undefined' )
    {
      cordova.exec( function(){}, function(){}, 'PhemiumEnduserPlugin', 'onNotificationReceived', [] );
    }
  };



  /**
   * Check notifications permissions
   *
   * @param {Function} onSuccessCallback
   * @param {Function} onErrorCallback
   */
  this.check_notifications_permissions = function( onSuccessCallback,onErrorCallback )
  {
    cordova.exec( onSuccessCallback, onErrorCallback, 'PhemiumEnduserPlugin', 'checkNotificationsPermissions', [] );
  };



  /**
   * Exit
   */
  this.exit = function()
  {
    cordova.exec( function(){}, function(){}, 'PhemiumEnduserPlugin', 'exit_app', [] );
  };



  /**
   * Exit app
   */
  this.exit_app = function( url )
  {
    location.replace( url );
  };



  /**
   * Returns URL params as query string
   *
   * @param {Object} data
   * @return {String}
   * @private
   */
  this._get_url_params = function( data )
  {
    var params = [];

    this.get_settings().forEach( function( setting )
    {
      if( [ null, 'null', undefined, '' ].indexOf( data[ setting ] ) == -1 )
      {
        params.push( encodeURIComponent( setting ) + '=' + encodeURIComponent( String( data[ setting ] ) ) );
      }
    });

    return params.join( '&' );
  };

};



if( module.exports )
{
  module.exports = PhemiumEnduserPlugin;
}

});
