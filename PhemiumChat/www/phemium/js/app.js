(function()
{
  'use strict';

  angular.module( 'app',
  [
    'ionic',
    'angular-md5',
    'ngCordova',
    'monospaced.elastic',
    'angularMoment',
    'pascalprecht.translate',
    'ngPhemiumSipVideoCall',
    'ngAnimate',
    'ngSanitize',
    'ngToast',
    'timer',
    'app.sdk.core',
    'app.sdk.enduser',
    'app.bootstrap',
    'app.consultation',
    'app.consultation_gallery',
    'app.enduser',
    'app.consultant',
    'app.call',
    'app.shared',
    'app.login',
    'angular-svg-round-progressbar',
    'app.calendar',
    'app.appointment_request'
  ]);

  angular.module( 'app' ).config( function(
    $stateProvider,
    $ionicConfigProvider,
    $compileProvider,
    $translateProvider
  )
  {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|file|blob|cdvfile|content):|ionic:|data:image\//);

    $ionicConfigProvider.tabs.position( 'bottom' );
    $ionicConfigProvider.views.swipeBackEnabled( false );
    $ionicConfigProvider.views.transition( 'none' );
    $ionicConfigProvider.views.forwardCache( true );


    /**
     * Configures routes
     */
    var configure_routes = function()
    {
      // Now set up the states
      $stateProvider
        .state( 'bootstrap',
        {
          controller: 'phemium.bootstrap.controllers.Bootstrap as ctrl',
          params:
          {
            force_no_calls: null
          }
        })
        .state( 'bootstrap/no_calls',
        {
          controller: 'phemium.bootstrap.controllers.Bootstrap as ctrl',
          params:
          {
            force_no_calls: true
          }
        })
        .state( 'login',
        {
          templateUrl: 'login/views/login.tpl.html',
          controller: 'phemium.login.controllers.Login as ctrl'
        })
        .state( 'logout',
        {
          controller: 'phemium.login.controllers.Logout as ctrl'
        })
        .state( 'goto_ios',
        {
          cache: false,
          templateUrl: 'consultation/views/goto_ios.tpl.html',
          controller: 'phemium.consultation.controllers.AppStores as ctrl'
        })
        .state( 'goto_android_mobile',
        {
          cache: false,
          templateUrl: 'consultation/views/goto_android_mobile.tpl.html',
          controller: 'phemium.consultation.controllers.AppStores as ctrl'
        })
        .state( 'goto_android_tablet',
        {
          cache: false,
          templateUrl: 'consultation/views/goto_android_tablet.tpl.html',
          controller: 'phemium.consultation.controllers.AppStores as ctrl'
        })
        .state( 'consultation.consultant_profile',
        {
          url: "consultant_profile",
          views:
          {
            'container_home':
            {
              templateUrl: 'consultant/views/consultant_profile.tpl.html',
              controller: 'phemium.consultation.controllers.ConsultantProfile as ctrl'
            }
          },
          params:
          {
            consultation: null
          }
        })
        .state( 'enduser_profile',
        {
          cache: false,
          templateUrl: 'enduser/views/enduser_profile.tpl.html',
          controller: 'phemium.enduser.controllers.EnduserProfile as ctrl'
        })
        .state( 'card_viewer',
        {
          cache: false,
          template: '<phe-card></phe-card>',
          params:
          {
            card_id: null,
            consultation: null
          }
        })

        .state( 'consultations_list',
        {
          url: 'consultations_list',
          cache: false,
          controller: 'phemium.consultation.controllers.ConsultationsList as ctrl',
          templateUrl: 'consultation/views/consultations_list.tpl.html'
        })
        .state( 'consultation',
        {
          cache: false,
          abstract: true,
          templateUrl: 'consultation/views/consultation_abstract.tpl.html',
          params:
          {
            consultation_id: null
          }
        })
        .state( 'consultation_base',
        {
          cache: false,
          controller: 'phemium.consultation.controllers.Consultation as ctrl',
          params:
          {
            consultation_id: null
          }
        })
        .state( 'consultation_unassigned',
        {
          cache: false,
          templateUrl: 'consultation/views/unassigned.tpl.html',
          controller: 'phemium.consultation.controllers.UnassignedConsultation as ctrl',
          params: { consultation: null }
        })
        .state( 'consultation.consultation_home',
        {
          url: "consultation_home",
          views:
          {
            'container_home':
            {
              templateUrl: 'consultation/views/consultation_home.tpl.html',
              controller: 'phemium.consultation.controllers.ConsultationHome as ctrl'
            }
          },
          params:
          {
            consultation: null,
            check_consultant_availability: null
          }
        })
        .state( 'consultation.consultation_detail',
        {
          url: 'consultation_detail',
          views:
          {
            'container_home':
            {
              templateUrl: 'consultation/views/consultation_detail.tpl.html',
              controller: 'phemium.consultation.controllers.ConsultationDetail as ctrl'
            }
          },
          params: { consultation: null }
        })
        .state( 'consultation.consultation_gallery',
        {
          cache: false,
          url: 'consultation_gallery',
          views:
          {
            'container_home':
            {
              templateUrl: 'consultation_gallery/views/gallery.tpl.html',
              controller: 'phemium.consultation_gallery.controllers.Gallery as ctrl'
            }
          },
          params:
          {
            consultation: null
          }
        })
        .state( 'consultation.consultation_slides',
        {
          cache: false,
          url: 'consultation_slides',
          views:
          {
            'container_home':
            {
              templateUrl: 'consultation_gallery/views/slides.tpl.html',
              controller: 'phemium.consultation_gallery.controllers.Slides as ctrl'
            }
          },
          params:
          {
            resource_id: null,
            consultation: null
          }
        })
        .state( 'consultation.card_viewer',
        {
          cache: false,
          url: 'card_viewer',
          views:
          {
            'container_home':
            {
              template: '<phe-card></phe-card>'
            }
          },
          params:
          {
            card_id: null,
            consultation: null
          }
        })
        .state( 'consultation.appointment_request',
        {
          cache: false,
          url: 'appointment_request',
          views:
          {
            'container_home':
            {
              template: '<appointment-request></appointment-request>'
            }
          },
          params:
          {
            item: null,
            consultation: null
          }
        })
        .state( 'consultation.floating_side_window',
        {
          cache: true,
          url: 'floating_side_window',
          views:
          {
            'container_home':
            {
              templateUrl: 'floating_side_window/fsw.tpl.html',
              controller: 'phemium.consultation.controllers.FloatingSideWindow as ctrl'
            }
          },
          params:
          {
            fswItem: null,
            url: null,
            consultation: null
          }
        })
        .state( 'consultation_f2f',
        {
          cache: false,
          templateUrl: 'consultation/views/consultation_f2f.tpl.html',
          controller: 'phemium.consultation.controllers.ConsultationF2F as ctrl'
        })
        .state( 'consultation.incoming_call',
        {
          cache: false,
          url: 'incoming_call',
          views:
          {
            'container_home':
            {
              templateUrl: 'call/views/incoming_call.tpl.html',
              controller: 'phemium.call.controllers.IncomingCall as ctrl'
            }
          },
          params: { consultation: null }
        })
        .state( 'consultation.outgoing_call',
        {
          cache: false,
          url: 'outgoing_call',
          views:
          {
            'container_home':
            {
              templateUrl: 'call/views/outgoing_call.tpl.html',
              controller: 'phemium.call.controllers.OutgoingCall as ctrl'
            }
          },
          params: { consultation: null }
        });
    };



    /**
     * Configures translate
     */
    var configure_translate = function()
    {
      $translateProvider
        .determinePreferredLanguage()
        .fallbackLanguage( [ 'en' ] );

      $translateProvider.useStaticFilesLoader(
      {
        prefix: 'locales/',
        suffix: '.json'
      });

      $translateProvider.registerAvailableLanguageKeys( [ 'en', 'es', 'fr', 'pl', 'ca' ],
      {
        'en_*': 'en',
        'es_*': 'es',
        'fr_*': 'fr',
        'pl': 'pl',
        'ca': 'ca'
      });

      $translateProvider.translationNotFoundIndicatorLeft( '#' );
      $translateProvider.translationNotFoundIndicatorRight( '#' );
    };



    configure_routes();
    configure_translate();
  });

  angular.module( 'app' ).constant( 'angularMomentConfig',
  {
    preprocess: function( value )
    {
      return moment.unix( value );
    }
  });

  angular.module( 'app' ).run( [ 'LoadingService', '$state', '$rootScope', '$templateCache', function( LoadingService, $state, $rootScope, $templateCache )
  {
    Object.keys( window.html_templates ).forEach( function( key )
    {
      $templateCache.put( key, window.html_templates[ key ] );
    });

    $state.go( 'bootstrap' );
  }]);

})();

(function()
{
  'use strict';

  angular.module( 'app.appointment_request', [] );
})();

(function()
{
  'use strict';

  angular.module( 'app.bootstrap', [] );
})();

(function() {
	'use strict';

	angular.module('app.calendar', []);
})();

(function()
{
  'use strict';

  angular.module( 'app.call', [] );
})();

(function()
{
  'use strict';

  angular.module( 'app.card_viewer', [] );
})();

(function()
{
  'use strict';

  angular.module( 'app.consultant', [] );
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation_gallery', [] );
})();

(function()
{
  'use strict';

  angular.module( 'app.consultation', ['rzModule'] );

  angular.module( 'app.consultation' ).constant( 'ConsultationItemType',
  {
    MESSAGE: 1,
    FILE: 2,
    PROPOSAL: 3,
    APPOINTMENT: 4,
    CALL: 5,
    CARD_CHANGES: 6,
    TRANSFER: 7,
    PAYMENT_ORDER: 8,
    STAGE_CHANGE: 9,
    CONSULTATION_SHARED: 10,
    LOGMEIN_INVITATION: 11,
    LOGMEIN_SESSION: 12,
    NTR_INVITATION: 13,
    NTR_SESSION: 14,
    CARD: 15,
    CLOSED_CONSULTATION: 16,
    CANCELLED_CONSULTATION: 17,
    WAITING_ROOM: 18,
    DIALOG_QUESTION: 19,
    DIALOG_ANSWER: 20,
    FIELD_QUESTION: 21,
    FIELD_ANSWER: 22,
    WEB_REQUEST: 23,
    ACTION_REQUEST: 24
  });

})();


(function()
{
  'use strict';

  angular.module( 'app.enduser', [] );
})();


(function()
{
  'use strict';

  angular.module( 'app.login', [] );
})();

(function()
{
  'use strict';

  angular.module( 'app.remote_list', [] );
})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.core', [] );

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser', [] );

})();


(function()
{
  'use strict';

  angular.module( 'app.shared', [] );
})();

(function ()
{
    'use strict';

    angular.module ('app.appointment_request').component ('appointmentRequest',
    {
      templateUrl: 'appointment_request/appointment_request.tpl.html',
      controller: appointmentRequestComponentController,
      controllerAs: 'ctrl',
      bindings: {
        consultation: "<"
      }
    });

    function appointmentRequestComponentController(
      $rootScope,
      $scope,
      $stateParams,
      ClientLogger,
      DialogService,
      $state
    )
    {
      var self = this;
      self.day = moment();
      var calendar_spaces = [];

      function init()
      {
        self.last_item = $stateParams.item;
        self.consultation = $stateParams.consultation;
        var dates = self.last_item.options;
        for(var i = 0; i < dates.length; i++ )
        {
          var slot = {
            value: dates[i].value,
            has_image: false
          };

          calendar_spaces.push(slot);
        }

        var month = current_date.format("MM");
        var year = current_date.format("YYYY");
        self.annual_view = self._check_annual_view( calendar_spaces , month );
        self._loadCalendar(month, year);
      }



      /**
       * Check if the annual view should be shown
       * @param {Array} calendar_spaces
       * @param {String} current_month
       * @private
       */
      self._check_annual_view = function( calendar_spaces , current_month )
      {
        var last_calendar_space = calendar_spaces[ calendar_spaces.length-1 ].value;
        var last_month = last_calendar_space.slice( 5, 7 );
        if ( last_calendar_space - current_month >= 3 )
        {
          return true;
        }
        else
        {
          return false;
        }
      }


      /**
       * Go to back action
       */
      self.back = function()
      {
        var is_plugin = !!( window.plugins && window.plugins.PhemiumEnduserPlugin );

        if( $rootScope.is_preform !== 1 )
        {
          $state.go( 'consultation.consultation_home',
          {
            consultation: self.consultation
          });
          return;
        }

        if( is_plugin )
        {
          $state.go( 'consultations_list' );
        }
        else
        {
          ClientLogger.info( 'Closing the App from preform' );
          (new window.plugins.PhemiumEnduserPlugin()).exit();
        }
      };


      /**************************** COMPONENT CALENDAR ******************************/

      var availability_this_month = [];
      var allow_month_change = true;
      var selectedCalendarDate = null;
      var selected_date = null;
      var current_date = moment();

      self.show_calendar = true;
      self.noCalendarHours = false;
      self.user_day_set = true;
      self.day = current_date;


      var safe = {
        data: {
          month: null,
          year: null
        }
      };


      function onlyUnique(value, index, self)
      {
        return self.indexOf(value) === index;
      }


      /**
       * On enter appointment section then initialize the calendar directive
       * @private
       */
      self._loadCalendar = function (month, year) {

        //self.day = new Date;

        var total_availability = calendar_spaces;
        availability_this_month = self._get_this_month_availability(total_availability, month, year);
        availability_this_month = availability_this_month.filter(onlyUnique);

        self.events = [];
        if (availability_this_month.length != undefined)
        {
          for (var a = 0; a < availability_this_month.length; a++)
          {
            //var currentMonth = safe.data.month;
            //var currentMonth = self.day.month()+1;
            //var momentDate = moment(currentMonth + "/" + availability_this_month[a] + "/" + self.day.year(), "MM-DD-YYYY");
            var momentDate = moment(month + "/" + availability_this_month[a] + "/" + year, "MM-DD-YYYY");
            var unix = momentDate.unix();
            self.events.push({
              date: unix
            });
          }
        }
        self.selectable = null;
        //ionicLoader.hide();
        return true;
      };

      self._get_this_month_availability = function (total_availability, month, year)
      {
        if (!(total_availability && total_availability.length > 0))
        {
          return [];
        }

        return total_availability.filter(function (option)
        {
          //return moment(option.value).month() == month && moment(option.value).year() == year;
          var now = month + '-' + year;
          var cur = moment(option.value).format('MM-YYYY');
          return String(now) == new String(cur);

        }).map(function (option) {
          return moment(option.value).date();
        });
      };


      self._get_month_days_from_options = function (options, month, year)
      {
        if (!(options && options.length > 0))
        {
          return [];
        }

        return options.filter(function (option)
        {
          return moment(option.value).month() == month && moment(option.value).year() == year;
        }).map( function (option)
        {
          return moment(option.value).date();
        });
      };

      self._get_hours_by_month_day_from_options = function (options, day, month, year)
      {
        if (!(options && options.length > 0)) {
          return [];
        }

        return options.filter( function (option)
        {
          var option_day = moment(option.value).format('DD');
          var option_month = moment(option.value).format('MM');
          var option_year = moment(option.value).format('YYYY');
          var get_hour = true;
          if (option_day != day) {
            get_hour = false;
          }
          if (option_month != month) {
            get_hour = false;
          }
          if (option_year != year) {
            get_hour = false;
          }
          return get_hour;

          //return moment(option.value).date() == month_day && moment(option.value).month() == month && moment(option.value).year() == year;
        }).map( function (option)
        {
          return moment(option.value).format("HH:mm");
        });
      };



      /**
       * Reset all the params of the previous hour selections
       * @private
       */

      function resetPreviousHourSelection()
      {
        $scope.selectedHourControl = true;
        $scope.activeHourButton = '-1';
        $scope.hourSelected = '';
        selectedCalendarDate = null;
      }



      /**
       * On Selected day then load all hours
       * @param {Object} date
       * @private
       */
      self.onSelectDay = function (day2)
      {
        //reset hour previous selections
        resetPreviousHourSelection();

        self.user_day_set = true;
        selected_date = day2.date.format("YYYY-MM-DD");
        selectedCalendarDate = day2.date.format("YYYY-MM-DD");
        var day = day2.date.format("DD");
        var month = day2.date.format("MM");
        var year = day2.date.format("YYYY");
        self.hours = self._get_hours_by_month_day_from_options(calendar_spaces, day, month, year);
        if (self.hours == 0) {
          self.noCalendarHours = true;
        } else {
          self.noCalendarHours = false;
        }
      };



      /**
       * On accept select hour then save data information and others
       * @public
       */

      self.onSelectHour = function (hour)
      {
        var string_date = selected_date + ' ' + hour;
        var text_date = moment(string_date).format('[Solicito cita para el día] DD [de] MMMM [a las] HH:mm');
        self.save_data(string_date, text_date);
        self.last_item.appointment_text = text_date;
        //update_item(self.last_item);
        //self.toogle_select_content();
        self.show_buttons = false;
        self.back();
      };



      /**
       * Save response
       *
       * @param {object} item_response
       * @param {String} text
      */
      self.save_data = function (item_response, text)
      {
        var response = {
          value: item_response,
          text: text
        };

        DialogService.save_data( response );
      }



    /**
     * On Selected hour option then change control params
     * @param {integer} index, {string} hour in format 'HH:mm'
     * @public
     */

    $scope.selectHourOption = function (index, hour)
    {
      $scope.selectedHourControl = false;
      $scope.activeHourButton = index;
      $scope.hourSelected = hour;
    };



    /**
     * On next month
     * @private
     */
    self.onNextMonth = function ()
    {
      if (!allow_month_change)
      {
        return;
      }
      allow_month_change = false;

      //reset hour previous selections
      resetPreviousHourSelection();

      self.hours = [];
      current_date = current_date.add(1, 'month');
      var day = current_date.format("DD");
      var month = current_date.format("MM");
      var year = current_date.format("YYYY");
      var out = current_date.format("DD/MM/YYYY");

      safe.data.month = month;
      safe.data.year = year;

      self._loadCalendar(month, year);
      allow_month_change = true;

    };



    /**
     * On next month
     * @private
     */
    self.onPreviousMonth = function () {

      if (!allow_month_change) {
        return;
      }
      //reset hour previous selections
      resetPreviousHourSelection();

      allow_month_change = false;

      current_date = current_date.subtract(1, 'month');
      var month = current_date.format("MM");
      var year = current_date.format("YYYY");
      var out = current_date.format("DD/MM/YYYY");
      self.hours = [];
      // clean appointments list if we want to load one new month
      self.selectable = {};
      safe.data.month = month;
      safe.data.year = year;

      self._loadCalendar(month, year);
      allow_month_change = true;
    };



    /**
     * On month selection
     * @param {string} m, {string} y
     * @private
     */
    self.onMonthSelect = function (m, y) {

      if (!allow_month_change) {
        return;
      }

      //reset hour previous selections
      resetPreviousHourSelection();

      allow_month_change = false;
      self.user_day_set = true;
      current_date = moment("01" + "/" + m + "/" + y, "DD-MM-YYYY"); // moment( "01" + "/" + m + "/"+y);
      var month = current_date.format("MM");
      var year = current_date.format("YYYY");
      var out = current_date.format("DD/MM/YYYY");
      self.hours = [];
      // clean appointments list if we want to load one new month
      self.selectable = {};
      safe.data.month = month;
      safe.data.year = year;

      self._loadCalendar(month, year);
      allow_month_change = true;
    };

    self.hideHours = function (boolHideHours) {
      self.noCalendarHours = boolHideHours;
    };



    /*************************** END COMPONENT CALENDAR ****************************/
    /******************************* COMPONENT SELECT ******************************/

    self.toogle_select_content = function()
    {
      self.show_calendar = !self.show_calendar;
      if(self.show_calendar) {
        var day = moment(new Date);
        current_date = moment();
        self._loadCalendar(day.format("MM"), day.format("YYYY"));
      }
    };

    self.showSelectValue = function( mySelect )
    {
      self.save_data(mySelect, '', 'select');
    };

    self.toggle_menu = function()
    {
      (self.status_menu == 'closed') ? 'open' : 'closed';
    };

    $scope.content_disp = "";

    $scope.toogle_displayed_content = function()
    {
      if ($scope.content_disp == "")
      {
        $scope.content_disp = "content_displayed";
      }
      else
      {
        $scope.content_disp = "";
      }
    }

    /**************************** END COMPONENT SELECT *****************************/


    init();


  }

})();
(function()
{
  'use strict';

  angular.module( 'app.bootstrap' ).controller( 'phemium.bootstrap.controllers.Bootstrap', Controller );

  function Controller
  (
    $rootScope,
    $translate,
    $ionicPlatform,
    $state,
    $stateParams,
    ClientLogger,
    Enduser,
    EnduserPresence,
    NotificationService,
    PushNotificationService,
    phemiumApiConnector,
    phemiumCommunicator,
    phemiumSipVideoCall,
    amMoment,
    moment,
    NetworkService,
    SoundsService,
    LoadingService,
    Settings,
    Stages,
    Roles,
    Portals,
    Customers,
    Auth,
    Utils,
    UtilsService,
    PostMessage
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * MAximum diagonal inches
     *
     * @var {Number}
     * @private
     */
    var _MAXIMUM_INCHES = 10;


    /**
     * Start
     *
     * @private
     */
    vm._start = function()
    {
      ClientLogger.start();
      Settings.start()
        .then( vm._initialize_app )
        .then( vm._check_f2f )
        .then( vm._check_auth )
        .then( _load_customer_resources )
        .then( _check_screen_size )
        .then( vm._check_offer_appstore )
        .then( vm._load_data )
        .then( vm._check_initial_page )
        .then( _load_softphone )
        .catch( function( error )
        {
          ClientLogger.error( 'Error on Start' , error );
        });
    };



    /**
     * Check screen size and redirect
     *
     * @private
     */
    function _check_screen_size()
    {
      return new Promise( function( resolve, reject )
      {
        if( window.cordova )
        {
          // Do not check screen size when we're on an installed App
          resolve();
          return;
        }

        if( !Settings.params.no_redirect )
        {
          var diagonal = _get_diagonal_size();

          if( diagonal >= _MAXIMUM_INCHES )
          {
            ClientLogger.info( 'Redirect to WebApp. Diagonal:' + diagonal + ' and _MAXIMUM_INCHES:' + _MAXIMUM_INCHES );
            var mobile_url = window.settings.environment.templates_url + '/' + window.location.search.substring( 1 );
            window.location.replace( mobile_url );
            reject();
            return;
          }
        }

        resolve();
      });
    }



    /**
     * Load softphone instance
     */
    function _load_softphone()
    {
      return new Promise( function( resolve )
      {
        self._call_plugin = phemiumSipVideoCall.get_instance();

        var config =
        {
          app_name: Settings.params.customer_name,
          use_webrtc: UtilsService.allows_webrtc === true
        };

        self._call_plugin.load( config );
        resolve();
      });
    }




    /**
     * Get diagonal size
     *
     * @return {Number}
     * @private
     */
    function _get_diagonal_size()
    {
      var screen_div_detector = document.createElement( 'div' );
      screen_div_detector.innerHTML = '<div id="dpi" style="height: 1in; width: 1in; left: 100%; position: fixed; top: 100%;"></div>';
      document.body.appendChild( screen_div_detector );
      var dpi_x = document.getElementById( 'dpi' ).offsetWidth;
      var dpi_y = document.getElementById( 'dpi' ).offsetHeight;
      document.body.removeChild( screen_div_detector );

      var width = window.innerWidth / dpi_x;
      var height = window.innerHeight / dpi_y;

      // Return diagonal
      return Math.sqrt( Math.pow( width, 2 ) + Math.pow( height, 2 ) );
    }



    /**
     * Initialize app
     *
     * @return {Promise}
     * @private
     */
    vm._initialize_app = function()
    {
      return new Promise( function( resolve )
      {
        $rootScope.theme_path = window.settings.theme_path;
        window.localStorage.setItem( 'check_if_sanitas_close_modal', 'no' );

        var tag = document.createElement( 'link' );
        tag.rel = 'stylesheet';
        tag.href = window.settings.theme_path + '/css/main.css?v=' + window.settings.version;
        document.getElementsByTagName( 'head' )[0].appendChild( tag );

        NetworkService.startWatching();
        SoundsService.preloadSounds();

        // Environment checks and sets
        UtilsService.init_ua();
        UtilsService.detect_webrtc();


        vm._configure_moment();
        vm._configure_back_button();
        vm._configure_keyboard();
        vm._configure_phemium_api_connector();
        vm._configure_background_mode();

        ClientLogger.info( 'Info Platform: ' + UtilsService.platform, UtilsService.platform );


        if( window.cordova )
        {
          ClientLogger.info( 'Model:' + window.device.model + " Version:" + window.device.version, window.cordova.device );
        }

        // Init PostMessage listeners
        // @TODO: add these listeners only for phemium embedder
        if( UtilsService.platform === 'browser' )
        {
          PostMessage.add_listener();
          PostMessage.init_consultation_events( Settings.params.consultation_id );
        }

        $rootScope.$emit( 'Bootstrap:app_ready' );
        resolve();
      });
    };



    /**
     * Loads theme
     *
     * @return {Promise}
     * @private
     */
    function _load_customer_resources()
    {
      return new Promise( function( resolve )
      {
        var tag = document.createElement( 'link' );
        tag.rel = 'stylesheet';
        tag.href = window.settings.theme_path + '/css/main.css?v=' + window.settings.version;

        tag.onload = function()
        {
          if( document.getElementById( 'baseloader' ) )
          {
            document.getElementById( 'baseloader' ).remove();
          }
        };

        document.getElementsByTagName( 'head' )[0].appendChild( tag );

        resolve();
      });
    }



    /**
     * Check if the AppStore page must be displayed or not
     *
     * @return {Promise}
     * @private
     */
    vm._check_offer_appstore = function()
    {
      return new Promise( function( resolve )
      {
        // Check if it's browser (we assume that cordova exists and it's an app)
        if( window.cordova )
        {
          resolve();
          return;
        }

        if( $stateParams.force_no_calls === true )
        {
          resolve();
          return;
        }

        // We need _check_webrtc process to be ended in order to check if allows_webrtc or not.
        if( typeof UtilsService.allows_webrtc === 'undefined' )
        {
          setTimeout( function()
          {
            vm._check_offer_appstore();
          }, 100 );

          return;
        }

        if( !UtilsService.allows_webrtc && UtilsService.is_mobile )
        {
          LoadingService.hide();

          if( UtilsService.os_name === 'Android' )
          {
            $state.go( 'goto_android_mobile' );
            return;
          }

          if( UtilsService.os_name === 'iOS' )
          {
            $state.go( 'goto_ios' );
            return;
          }
        }

        resolve();
      });
    };



    /**
     * Loads data
     *
     * @return {Promise}
     * @private
     */
    vm._load_data = function()
    {
      return new Promise( function( resolve )
      {
        Enduser.load( Auth.get_enduser_data().user_id )
          .then( Roles.load.bind( Roles ) )
          .then( Stages.load.bind( Stages ) )
          .then( Portals.load_portal_by_name.bind( Portals, Settings.params.portal_name ) )
          .then( Customers.load_customer_by_id.bind( Customers, Settings.params.customer_id ) )
          .then( _check_language )
          .then( function()
          {
            _webrtc_notification();
            resolve();
          })
          .catch( function()
          {
            NotificationService.internal_error();
          });
      });
    };



    /**
     * Checks language, sets the global language code, sets angular $translate language and also moment locale
     *
     * @param {Object} portal
     * @return {Promise}
     * @private
     */
    function _check_language( portal )
    {
      // Set global language code
      window.settings.language_code = Settings.calculate_language( portal.default_language_code );

      // Set moment locale
      amMoment.changeLocale( window.settings.language_code );

      // Tell $translate service what language to use and return Promise.
      return $translate.use( window.settings.language_code );
    }



    /**
     * Checks F2F
     *
     * @return {Promise}
     * @private
     */
    vm._check_f2f = function()
    {
      return new Promise( function( resolve )
      {

        if( !Settings.params.face2face )
        {
          resolve();
          return;
        }

        if( !Utils.is_f2f_with_login() )
        {
          Auth.clear_enduser_data(); // If login is not required, no auth could be exists, so we must clear it
          $state.go( 'consultation_f2f' );
          return;
        }

        vm._check_auth()
          .then( function()
          {
            $state.go( 'consultation_f2f' );
          });
      });
    };


    /**
     * Checks auth (checks if the token is valid)
     *
     * @return {Promise}
     * @private
     */
    vm._check_auth = function()
    {
      return new Promise( function( resolve )
      {
        Auth
          .is_valid_auth()
          .then( function(data){
            if(data==false){
              $state.go( 'login' );
            }
            else {
              resolve();
            }
          } )
          .catch( function()
          {
            $state.go( 'login' );
          });
      });
    };



    /**
     * Configure the Phemium Api Connector
     *
     * @private
     */
    vm._configure_phemium_api_connector = function()
    {
      phemiumApiConnector.url = window.settings.environment.api_url;

      $rootScope.$on( 'phemiumApiConnector:reques_terror', function( event, response )
      {
        ClientLogger.error( 'Phemium Api connector error', response );

        var error_code = response.data.code;

        if( error_code === 201 )
        {
          window.localStorage.removeItem( 'enduser_token' );
          LoadingService.hide();
          $state.go( 'login' );
          return;
        }

        LoadingService.hide();

        var error_texts =
        {
          1000: $translate.instant( 'proposal_modified' ),
          1001: $translate.instant( 'closed_consultation' )
        };

        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: $translate.instant( 'internal_error' ),
          body: error_texts[ error_code ] || $translate.instant( 'internal_error' ),
          ok_text: $translate.instant( 'back' ),
          ok_type: 'button-assertive',
          on_click: null
        });
      });

      // @TODO: Apply when debug mode is enabled
      if( false )
      {
        $rootScope.$on( 'phemiumApiConnector:request_error', function( event, response )
        {
          var message = JSON.stringify( response, null, 4 );
          alert( message );
        });
      }
    };



    /**
     * Configure back button
     *
     * @private
     */
    vm._configure_back_button = function()
    {
      if( !window.cordova )
      {
        return;
      }

      $ionicPlatform.registerBackButtonAction( function( event ){ event.preventDefault(); }, 100 );
    };



    /**
     * Configure keyboard
     *
     * @private
     */
    vm._configure_keyboard = function()
    {
      if( !window.cordova )
      {
        return;
      }

      if( ionic.Platform.isIOS() )
      {
        Keyboard.hideFormAccessoryBar( true );
      }

      // Add keyboard-open class to avoid a 400ms delay (Ionic Documentation)
      window.addEventListener( 'keyboardDidShow', function()
      {
        document.body.classList.add( 'keyboard-open' );
      });
    };



    /**
     * Configure moment locale
     *
     * @private
     */
    vm._configure_moment = function()
    {
      moment.locale
      (
        'es',
        {
          calendar:
          {
            sameDay: function()
            {
              return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },

            nextDay: function()
            {
              return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },

            nextWeek: function()
            {
              return '[el] dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },

            lastDay: function()
            {
              return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },

            lastWeek: function()
            {
              return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },

            sameElse: function()
            {
              return '[el] LL [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            }
          }
        }
      );

      amMoment.changeLocale( window.settings.default_locale );
    };



    /**
     * Configure background mode
     *
     * @private
     */
    vm._configure_background_mode = function()
    {
      if( !window.cordova )
      {
        return;
      }

      // Listening Pause and Resume Ionic events
      // Ionic events to detect background/foreground to replace backgroundMode plugin
      $rootScope.in_foreground = true;

      $ionicPlatform.on( 'pause', function()
      {
        ClientLogger.info( 'Event: onPause' );
        $rootScope.$broadcast( 'onPause' );
        $rootScope.in_background = true;
      });

      $ionicPlatform.on( 'resume', function()
      {
        ClientLogger.info( 'Event: onResume' );
        $rootScope.$broadcast( 'onResume' );
        $rootScope.in_background = false;
      });

      // Enable backgroundMode in Android (ios uses voip for incoming calls in background) or voip disabled
      if( UtilsService.platform.toLowerCase() === 'android' || !Settings.params.voip_notifications )
      {
        cordova.plugins.backgroundMode.setDefaults( { silent: true } );
        cordova.plugins.backgroundMode.enable();

        $rootScope.before_background = false;

        cordova.plugins.backgroundMode.onactivate = function()
        {
          cordova.plugins.backgroundMode.disableWebViewOptimizations();
          ClientLogger.info( 'App moved from Foreground to Background' );
          $rootScope.$emit( 'cordova.plugins.backgroundMode:onactivate' );
        };

        cordova.plugins.backgroundMode.ondeactivate = function()
        {
          ClientLogger.info( 'App moved from Background to Foreground' );
          $rootScope.$emit( 'cordova.plugins.backgroundMode:ondeactivate' );
        };
      }

    };



    /**
     * Start the Phemium Communicator
     *
     * @private
     */
    vm._start_phemium_communicator = function()
    {
      phemiumCommunicator.initialize( window.settings.environment.bayeux_url );

      phemiumCommunicator.join_channel( 'customer_' + Auth.get_enduser_data().customer_id );
      phemiumCommunicator.join_channel( 'customer_' + Auth.get_enduser_data().customer_id + '_enduser_' + Auth.get_enduser_data().user_id );

      ClientLogger.info( 'Enduser was correctly attached to channels' );
    };



    /**
     * Start enduser presence
     *
     * @private
     */
    vm._start_enduser_presence = function()
    {
      EnduserPresence.init();
      EnduserPresence.start_presence();

      $rootScope.$on( 'EnduserPresence:kicked', function()
      {
        ClientLogger.info( 'EnduserPresence:kicked' );
        phemiumCommunicator._faye_client.disconnect();
        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: '',
          body: $translate.instant( 'session_duplicate_text' ),
          ok_text: $translate.instant( 'exit' ),
          ok_type: 'button-assertive',
          force_no_close: true,
          on_click: function()
          {
            UtilsService.exit_app()
          }
        });
      });
    };



    /**
     * Check if webrtc is enabled or not
     *
     * @private
     */
    function _webrtc_notification()
    {

      if( !UtilsService.allows_webrtc && $stateParams.force_no_calls !== true )
      {
        ClientLogger.error( 'Environment does not support WebRTC.' );
        LoadingService.hide();

        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-ios-telephone"></i>',
          subtitle: $translate.instant( 'webrtc_not_supported_title' ),
          body:  $translate.instant( 'webrtc_not_supported_text' ),
          ok_text: $translate.instant( 'close' ),
          ok_type: 'button-assertive',
          on_click: null
        });

        return;
      }

      if( UtilsService.webrtc_environment_not_tested && $stateParams.force_no_calls !== true )
      {
        ClientLogger.error( 'Environment supports WebRTC but has been not tested yet.' );
        LoadingService.hide();

        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-ios-telephone"></i>',
          subtitle: $translate.instant( 'webrtc_not_tested_title' ),
          body:  $translate.instant( 'webrtc_not_tested_text' ),
          ok_text: $translate.instant( 'close' ),
          ok_type: 'button-assertive',
          on_click: null
        });
      }
    }



    /**
     * Checks which is the next page
     *
     * @private
     */
    vm._check_initial_page = function()
    {
      vm._start_phemium_communicator();
      vm._start_enduser_presence();
      PushNotificationService.initialize();

      if( Settings.params.consultation_id )
      {
        $state.go( 'consultation_base', { consultation_id: Settings.params.consultation_id } );
      }
      else
      {
        $state.go( 'consultations_list' );
      }
    };



    // *******************************************
    // Start the controller
    // *******************************************
    if( window.cordova )
    {
      document.addEventListener( 'deviceready', function()
      {
        navigator.splashscreen.hide();
        vm._start();
      }, false );
    }
    else
    {
      vm._start();
    }

  }
})();


(function()
{
  'use strict';

  angular.module( 'app.calendar' ).controller( 'appCalendarController', appCalendarController );

  function appCalendarController()
  {
    var vm = this;

    vm.day = moment();

    vm.events = {
            "RecuperarFechasActuacionsMsRslt":{
                "ListaDias":{
                    "short": [1,2,5,7]
                }
            },
            "Month": 5
        };

  }
})();

(function()
{
  'use strict';

  angular.module( 'app.calendar' ).directive( 'appCalendarDirective', appCalendarDirective );

  function appCalendarDirective($compile, $translate, $timeout,$ionicScrollDelegate )
  {
    var vm = this;
    var yearviewSelectedYear =  new Date().getFullYear();
    var January = $translate.instant("January");
    var February = $translate.instant("February");
    var March = $translate.instant("March");
    var April = $translate.instant("April");
    var May = $translate.instant("May");
    var June = $translate.instant("June");
    var July = $translate.instant("July");
    var August = $translate.instant("August");
    var September = $translate.instant("September");
    var October = $translate.instant("October");
    var November = $translate.instant("November");
    var December = $translate.instant("December");

    var mon = $translate.instant("mon");
    var tue = $translate.instant("tue");
    var wed = $translate.instant("wed");
    var thu = $translate.instant("thu");
    var fri = $translate.instant("fri");
    var sat = $translate.instant("sat");
    var sun = $translate.instant("sun");

   // these are labels for the days of the week
    var cal_days_labels = [mon, tue, wed, thu, fri, sat, sun];

    // these are human-readable month name labels, in order
    var cal_months_labels = [January, February, March, April,
                        May, June, July, August, September,
                        October, November, December];

    // these are the days of the week for each month, in order
    var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // this is the current date
    var cal_current_date = new Date();

    function Month(month, year) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.html = '';
    }

    Month.prototype.generateHTML = function(){

    // get first day of month
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay() == 0 ? 7 : firstDay.getDay();

    // find number of days in month
    var monthLength = cal_days_in_month[this.month];

    // compensate for leap year
    if (this.month == 1) { // February only!
        if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
        monthLength = 29;
        }
    }

    // do the header
    var monthName = cal_months_labels[this.month]
    var html = '<table class="calendar-table">';
    html += '<tr><th colspan="7" class="month-header">';
    html +=  monthName + "&nbsp;";
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for(var i = 0; i <= 6; i++ ){
        html += '<td class="calendar-header-day">';
        html += cal_days_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    // fill in the days
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var j = 1; j <= 7; j++) {
        html += '<td class="calendar-day1">';
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
            html += day;
            day++;
        }
        html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
        break;
        } else {
        html += '</tr><tr>';
        }
    }
    html += '</tr></table>';

    this.html = html;
    }

    Month.prototype.getHTML = function() {
    return this.html;
    }

    return {
        restrict: "E",
        templateUrl: "calendar/views/calendar.tpl.html",
        scope: {
            selected: "=",
            events: "=",
            selectable: "=",
            onSelectDay: "&",
            onNextMonth: "&",
            onPreviousMonth: "&",
            onShowMonth: "&",
            onMonthSelect:"&",
            control: "=",
            annualView: "<"
        },
        link: function(scope,element,attrs) {

            scope.setMonth = function(m,y){
                var str = "1-"+m+"-"+y;
                scope.selected  = moment(str, "DD-MM-YYYY");
                var start = scope.selected.clone();
                scope.month = scope.selected.clone();
                start.date(-6);
                _removeTime(start.day(1));
                _buildMonth(scope, start, scope.month);
                scope.showSelectedMonth(m,y);
            };

            //scope.year = yearviewSelectedYear;
            //scope.selected = _removeTime(scope.selected || moment());
            //scope.selected  = moment(new Date, "DD-MM-YYYY");
            scope.selected = scope.selected;
            scope.month = scope.selected.clone();
            var start = scope.selected.clone();
            start.date(-6);
            _removeTime(start.day(1));
            _buildMonth(scope, start, scope.month);
            var month = scope.selected.clone();
            var scopeValue = scope;
            scope.showMonthView =true;
            yearviewSelectedYear =  new Date().getFullYear();
            scope.year = yearviewSelectedYear;
            printCalendar();

            scope.$watch('events', function (val) {
              var start = scope.month.clone();
              start.date(-6);
              _removeTime(start.day(1));
              _buildMonth(scopeValue, start, scope.month);
            });

            scope.$watch('selectable', function (val) {
              _buildMonth(scopeValue, start, month);
            });

            scope.select = function( day ) {
                scope.selected = day.date;
                scope.onSelectDay( { day: day } );
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                scope.onPreviousMonth( { month: previous } );
                _removeTimeZero(previous.month(previous.month()-1).date(0));
                scope.month.month(scope.month.month()-1);
                yearviewSelectedYear = scope.month.year();
                scope.year = yearviewSelectedYear;
                _buildMonth(scope, previous, scope.month);
            };

            scope.next = function() {
                var next = scope.month.clone();
                scope.onNextMonth( { month: next } );
                _removeTimeZero(next.month(next.month()+1).date(0));
                scope.month.month(scope.month.month()+1);
                yearviewSelectedYear = scope.month.year();
                scope.year = yearviewSelectedYear;
                _buildMonth(scope, next, scope.month);
            };

            scope.prevYear = function() {
                yearviewSelectedYear -=1;
                scope.year = yearviewSelectedYear;
                printCalendar();
            }

            scope.nextYear = function() {
                yearviewSelectedYear +=1;
                scope.year = yearviewSelectedYear;
                printCalendar();
            }

            scope.showYear = function() {
                scope.showMonthView= false;
                scope.onShowMonth( { bool: false });
                $timeout(function () {
                    $ionicScrollDelegate.resize();
                }, 100);
             };

            scope.showMonth = function() {
                scope.showMonthView= true;
                scope.onShowMonth( { bool: true });
            };

            scope.showSelectedMonth = function(m,y){
                scope.showMonth();
                scope.onMonthSelect({ month: m, year:y });
            };
        }
    }

    function _isLoading( scope, bool )
    {
        return scope.isLoading = bool;
    }

    function _removeTime( date )
    {
        return date.day(1).hour(0).minute(0).second(0).millisecond(0);
    }

    function _removeTimeZero( date )
    {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth( scope, start, month )
    {
        //hups
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(scope, date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek( scope, date, month )
    {
        var days = [];
        if(!scope.events){
            scope.events = [];
        }
        for (var i = 1; i <= 7; i++) {

            /* Push days with all the data of every day */
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                areEvents: ( scope.events.length > 0 )? _hasEvents(scope, date, month): false,
                isSelectable:  _isDaySelectable(scope, date, month)
            });

            /* Increments the next day to iterate */
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }

    function _isDaySelectable( scope, date, month )
    {
        if(scope.selectable == null)
        {
            return true;
        }
        else
        {
            var shortcut = scope.selectable;
            for (var a = 0; a < shortcut.length; a++) {
                if(date.date() == shortcut[a] && date.month() === month.month()){
                    return true;
                }
            }
            return false;
        }
    }

    function _hasEvents( scope, date, month )
    {

        var shortcut = scope.events;

        for (var a = 0; a < shortcut.length; a++)
        {
            if(date.date() == moment( shortcut[a].date * 1000 ).date() && month.month() === moment( shortcut[a].date * 1000 ).month() && date.month() === month.month()){
                return true;
            }
        }
        return false;
    }

    function printCalendar (){
        var currentYear = yearviewSelectedYear;
        var monthElement;
        for (var i = 0; i < 12; i++) {
            monthElement = 'month'+(i+1);
            var myNode = document.getElementById(monthElement);
            myNode.innerHTML = '';

            var month = new Month(i,currentYear);
            month.generateHTML();
            var monthHtml = month.getHTML();
            var col = document.createElement('div');
            col.innerHTML = monthHtml;
            document.getElementById(monthElement).appendChild(col);
        }
    }
 }
})();

(function()
{
  'use strict';

  angular.module( 'app.call' ).component( 'pheVideocall',
  {
    templateUrl: 'call/views/videocall.tpl.html',
    controller: [ '$rootScope', '$scope', 'Consultant', 'Enduser', 'phemiumSipVideoCall', 'UtilsService', 'Settings', Controller ],
    controllerAs: 'ctrl'
  });

  function Controller
  (
    $rootScope,
    $scope,
    Consultant,
    Enduser,
    phemiumSipVideoCall,
    UtilsService,
    Settings
  )
  {

    var self = this;

    /**
     * X remote position coordinate
     *
     * @var {Number}
     */
    var diff_x_remote = 0;


    /**
     * Y remote position coordinate
     *
     * @var {Number}
     */
    var diff_y_remote = 0;


    /**
     * X local position coordinate
     *
     * @var {Number}
     */
    var diff_x_local = 0;


    /**
     * Y local position coordinate
     *
     * @var {Number}
     */
    var diff_y_local = 0;


    /**
     * Local DOM container
     *
     * @var {Object}
     */
    var local_pip_container;


    /**
     * Remote DOM container
     *
     * @var {Object}
     */
    var remote_pip_container;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self.initialized = false;
      self.call_connected = false;
      self.badge_number = 0;
      self.consultant = null;
      self.show_toolbar = false;
      self.fullscreen = true;
      self.micro_enabled = true;
      self.camera_enabled = true;
      self.front_camera = true;
      self.dragging = false;
      self.can_toggle_camera = false;
      self._listener_consultation_update = null;
      self._consultation_model = null;
      self.is_video_call = false;
      self.is_audio_call = false;

      // Listeners
      // var listener_call_event = $rootScope.$on( 'CallService:call_event', _on_call_event );
      // var listener_app_ready = $rootScope.$on( 'Bootstrap:app_ready', _on_app_ready );

      // @TODO. This must check also if device has front/rear camera
      // self.can_toggle_camera = ( window.device.platform != 'browser' );
      self.can_toggle_camera = false;

      // Window resize listener
      window.onresize = function()
      {
        if( self.call_connected && self.is_video_call )
        {
          _resize_videos();
        }
      };

      $scope.$on( '$destroy', function()
      {
        window.off( 'resize' );
        listener_call_event();
        listener_app_ready();
      });


      remote_pip_container = document.querySelectorAll( '.phe-videocall-wrapper' )[0];
      local_pip_container = document.querySelectorAll( '.phe-videocall-video.local' )[0];

      self.initialized = true;
    };



    /**
     * Call event received
     *
     * @param {Object} ev
     * @param {Object} data
     * @private
     */
    function _on_call_event( ev, data )
    {
      switch( data.event )
      {
        case 'call_connected':
          _on_call_connected( data );
          break;

        case 'call_disconnected':
          _on_call_disconnected( data );
          break;
      }
    }



    /**
     * App is ready
     *
     * @private
     */
    function _on_app_ready()
    {
      if( !Settings.params.customer_name )
      {
        setTimeout( _on_app_ready, 100 );
        return;
      }

      self._call_plugin = phemiumSipVideoCall.get_instance();

      var config =
      {
        app_name: Settings.params.customer_name
      };

      self._call_plugin.load( config );
    }



    /**
     * Handle consultation update event
     *
     */
    function _on_consultation_update()
    {
      // Only change badge number if we're in fullscreen mode (chat is not visible)
      if( self.fullscreen )
      {
        self.badge_number++;
      }
    }



    /**
     * On call disconnected
     *
     * @private
     */
    function _on_call_disconnected()
    {
      self.call_connected = false;
      $scope.$broadcast( 'timer-stop' );
      $rootScope.$emit( 'VideoCallComponent:call_disconnected' );
      self._call_plugin.getSoftphone().MediaMixer.undisplay();

      // Remove listener
      if( self._listener_consultation_update )
      {
        self._listener_consultation_update();
      }
    }



    /**
     * On call connected
     *
     * @private
     */
    function _on_call_connected()
    {
      // Discard duplicated event
      if( self.call_connected )
      {
        return;
      }

      // Initialize values
      self.consultant = Consultant.consultant;
      $scope.$broadcast( 'timer-start' );
      $rootScope.$emit( 'VideoCallComponent:call_connected' );
      self.call_connected = true;

      if( self._consultation_model.data.communication_channel === 'audio' )
      {
        _show_audio_call();
      }
      else
      {
        _show_video_call();
      }

      // listener
      self._listener_consultation_update = $rootScope.$on( 'Consultation:' + self._consultation_model.id  + ':add_item', _on_consultation_update );
    }



    /**
     * Show audio call UI
     *
     * @private
     */
    function _show_audio_call()
    {
      remote_pip_container = document.querySelectorAll( '[data-id="main-wrapper"]' )[0];
      self.is_video_call = false;
      self.is_audio_call = true;
    }



    /**
     * Show video call UI
     *
     * @private
     */
    function _show_video_call()
    {
      remote_pip_container = document.querySelectorAll( '.phe-videocall-wrapper' )[0];
      self.is_video_call = true;
      self.is_audio_call = false;

      var call = self._call_plugin.get_current_call();
      var softphone = self._call_plugin.getSoftphone();

      self.reset_audio_toggle();
      self.reset_video_toggle();

      var video_address_0 = call.to.get_address();
      var video_address_1 = call.from.get_address();
      var local_address = ( Enduser.enduser.sip_address.replace( 'sip:', '' ).indexOf( video_address_0 ) != -1 ) ? video_address_0 : video_address_1;
      var remote_address = ( local_address == video_address_0 ) ? video_address_1: video_address_0;

      softphone.MediaMixer.display_on( remote_address, document.querySelectorAll( '.phe-videocall-video.remote' )[0], softphone.MediaMixer.PIP_OUTER, true );
      softphone.MediaMixer.display_on( local_address, document.querySelectorAll( '.phe-videocall-video.local' )[0], softphone.MediaMixer.PIP_INNER, true );

      _resize_videos();
    }



    /**
     * Resize videos to fit current view
     *
     * @private
     */
    function _resize_videos()
    {
      var wrapper = document.querySelectorAll( '.phe-videocall-wrapper' )[0];
      var remote = document.querySelectorAll( '.phe-videocall-video.remote video' )[0];
      var height = wrapper.clientHeight;
      var width = wrapper.clientWidth;

      // We have a 4:3 ratio...
      if( height >= width )
      {
        // Height greater than width
        remote.style.height = height + 'px';
        remote.style.width = ( ( height * 4 ) / 3 ) + 'px';
      }
      else if( width > height && ( height > ( width * 3 / 4 ) ) )
      {
        // Width is not wide enough to cover all screen... So we use height anyways
        remote.style.height = height + 'px';
        remote.style.width = ( ( height * 4 ) / 3 ) + 'px';
      }
      else
      {
        // Width is larger than height
        remote.style.width = width + 'px';
        remote.style.height = ( ( width * 3 ) / 4 ) + 'px';
      }
    }



    /**
     * Click on view handler
     */
    self.click_handler = function()
    {
      if( self.fullscreen )
      {
        self.toggle_toolbar();
      }
      else
      {
        self.toggle_fullscreen();
      }
    };



    /**
     * Toggle buttons toolbar
     */
    self.toggle_toolbar = function()
    {
      self.show_toolbar = !self.show_toolbar;
    };



    /**
     * Toggle fullscreen
     */
    self.toggle_fullscreen = function()
    {
      self.fullscreen = !self.fullscreen;
      var wrapper = document.querySelectorAll( '.phe-videocall-wrapper' )[0];
      var call = self._call_plugin.get_current_call();

      if( self.fullscreen )
      {
        self.old_top = wrapper.style.top;
        self.old_left = wrapper.style.left;
        wrapper.style.top = '0px';
        wrapper.style.left = '0px';
      }
      else
      {
        wrapper.style.top = self.old_top;
        wrapper.style.left = self.old_left;
        self.badge_number = 0;
      }


      if(
        ( self._consultation_model.data.communication_channel !== null && self._consultation_model.data.communication_channel === 'video' )
      || ( self._consultation_model.data.communication_channel === null && call.media >= 2 ) ) // 2-> Video, 3-> Audio + Video
      {
        // Resize videos while animation is in process
        _resize_videos();
        setTimeout( _resize_videos, 100 );
        setTimeout( _resize_videos, 200 );
        setTimeout( _resize_videos, 300 );

        // Hide toolbar if necessary
        if( self.show_toolbar )
        {
          self.toggle_toolbar();
        }
      }
    };



    /**
     * Reset and enable the audio toggle
     */
    self.reset_audio_toggle = function()
    {
      if( !self._call_plugin )
      {
        return;
      }
      self.micro_enabled = true;
      var call = self._call_plugin.get_current_call();
      call.unmute();

    };



    /**
     * Reset and enable the video toggle
     */
    self.reset_video_toggle = function()
    {
      if( !self._call_plugin )
      {
        return;
      }
      self.camera_enabled = true;
      var call = self._call_plugin.get_current_call();
      call.add_video();
    };



    /**
     * Toggle audio
     */
    self.toggle_audio = function()
    {
      self.micro_enabled = !self.micro_enabled;
      var call = self._call_plugin.get_current_call();

      if( self.micro_enabled )
      {
        call.unmute();
      }
      else
      {
        call.mute();
      }
    };



    /**
     * Toggle video
     */
    self.toggle_video = function()
    {
      self.camera_enabled = !self.camera_enabled;
      var call = self._call_plugin.get_current_call();
      self.camera_enabled ? call.add_video() : call.remove_video();
    };



    /**
     * Toggle camera (front/rear)
     */
    self.toggle_camera = function()
    {
      self.front_camera = !self.front_camera;
    };



    /**
     * Hangup call
     */
    self.hangup = function()
    {
      self._call_plugin.get_current_call().release();
    };



    /**
     * On start drag remote video
     *
     * @param {Object} evt
     */
    self.start_drag_remote = function( evt )
    {
      diff_x_remote = evt.gesture.center.pageX - remote_pip_container.offsetLeft;
      diff_y_remote = evt.gesture.center.pageY - remote_pip_container.offsetTop;
    };



    /**
     * On start drag local video
     *
     * @param {Object} evt
     */
    self.start_drag_local = function( evt )
    {
      diff_x_local = evt.gesture.center.pageX - local_pip_container.offsetLeft;
      diff_y_local = evt.gesture.center.pageY - local_pip_container.offsetTop;
    };



    /**
     * On drag remote video
     *
     * @param {Object} evt
     */
    self.on_drag_remote = function( evt )
    {
      evt.preventDefault();

      var left = parseInt( evt.gesture.center.pageX - diff_x_remote );
      var top = parseInt( evt.gesture.center.pageY - diff_y_remote );

      // Check screen boundaries to avoid position video outside viewable part.
      if( top < 0 )
      {
        top = 0;
      }

      if( left < 0 )
      {
        left = 0;
      }

      // Check taking into account remote video size.
      if( top > window.innerHeight - remote_pip_container.clientHeight )
      {
        top = window.innerHeight - remote_pip_container.clientHeight;
      }

      if( left > window.innerWidth - remote_pip_container.clientWidth )
      {
        left = window.innerWidth - remote_pip_container.clientWidth;
      }

      remote_pip_container.style.left = left + 'px';
      remote_pip_container.style.top = top + 'px';
    }



    /**
     * On Drag local video
     *
     * @param {Object} ev
     */
    self.on_drag_local = function( evt )
    {
      evt.preventDefault();

      var left = parseInt( evt.gesture.center.pageX - diff_x_local );
      var top = parseInt( evt.gesture.center.pageY - diff_y_local );

      // Check screen boundaries to avoid position video outside viewable part.
      if( top < 0 )
      {
        top = 0;
      }

      if( left < 0 )
      {
        left = 0;
      }

      // Check taking into account remote video size.
      if( top > window.innerHeight - local_pip_container.clientHeight )
      {
        top = window.innerHeight - local_pip_container.clientHeight;
      }

      if( left > window.innerWidth - local_pip_container.clientWidth )
      {
        left = window.innerWidth - local_pip_container.clientWidth;
      }

      local_pip_container.style.left = left + 'px';
      local_pip_container.style.top = top + 'px';
    }



    /**
     * Set consultation model to be used in this controller
     *
     * @param {Object} consultation_model
     */
    self.set_consultation_model = function( consultation_model )
    {
      self._consultation_model = consultation_model;
    };


    self._constructor();
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.call' ).controller( 'phemium.call.controllers.IncomingCall', Controller );

  function Controller
  (
    $rootScope,
    $translate,
    $state,
    $timeout,
    CallService,
    Consultant,
    Enduser,
    ClientLogger,
    Auth,
    SoundsService,
    SupportsService,
    phemiumCommunicator,
    $stateParams,
    Settings
  )
  {

    var vm = this;
    vm.consultation_model = $stateParams.consultation;


    /**
     * Flag to ensure incoming call wrapper is hidden when closing the call
     *
     * @var {boolean}
     */
    vm.show_incoming_call_wrapper = true;


    /**
     * Incoming call title
     * @var {String}
     */
    vm.info_message = $translate.instant('incoming_call');


    /**
     * True if user action is pending
     * @var {Boolean}
     */
    vm.action_pending = false;


    /**
     * Consultation consultant
     * @var {Object}
     */
    vm.consultant = Consultant.consultant;


    /**
     * Consultant image
     * @var {String}
     */
    vm.consultant_image = '';


    /**
     * Consultation service name
     *
     * @type {String}
     */
    vm.service_name = '';


    /**
     * Waves animation controller
     *
     * @var {Number}
     */
    vm._waves_looper_id = null;


    /**
     * Call request timeout promise
     * @var {Object}
     */
    var _notification_timeout_promise = null;



    /**
     * Accept call method
     */
    vm.accept_call = function()
    {
      if( vm.action_pending == false )
      {
        return;
      }

      ClientLogger.info( 'Enduser has accepted incoming call' );
      $timeout.cancel( _notification_timeout_promise );
      vm.action_pending = false;

      // Configure communication data
      var config =
      {
        enduser_id: Auth.get_enduser_data().user_id,
        service_id: vm.consultation_model.data.service.id,
        portal_id: vm.consultation_model.data.portal.id,
        portal_name: vm.consultation_model.data.portal.value,
        consultant: Consultant.consultant,
        consultation_id: vm.consultation_model.data.id,
        appointment_id: null,
        language_code: null,
        auto_accept: true,
        debug_enabled: $rootScope.debug_enabled
      };

      CallService.only_audio = ( vm.consultation_model.data.communication_channel == 'audio' ) ? true : false;
      CallService.call( config );

      $rootScope.$emit( 'IncomingCallController:call_accepted' );
      $rootScope.$on( 'CallService:call_error', _on_call_error );

      _close( 5000 );
    };



    /**
     * Reject call method
     *
     * @param {Number=} error_code
     */
    vm.reject_call = function( error_code )
    {
      ClientLogger.info( 'Enduser has rejected incoming call' );
      $rootScope.$emit( 'IncomingCallService:call_rejected' );

      $timeout.cancel( _notification_timeout_promise );
      vm.action_pending = false;
      vm.info_message = $translate.instant('you_cancel_call');

      var data =
      {
        id: Date.now(),
        aliases: [],
        name: 'Communicator:outgoing_call_enduser_reject',
        data:
        {
          enduser: { presentation_name: Enduser.enduser.presentation_name },
          error_code: error_code
        }
      };

      phemiumCommunicator.send( 'consultant_' + vm.consultant.id, data );

      _close();
    };



    /**
     * Stop waves looping
     *
     * @private
     */
    vm._stop_waves = function()
    {
      cancelAnimationFrame( vm._waves_looper_id );
    };



    /**
     * Method to handle call request cancelation
     * @private
     */
    function _on_call_request_cancelled()
    {
      $timeout.cancel( _notification_timeout_promise );
      vm.info_message = $translate.instant( 'cancel_call' );
      vm.action_pending = false;
      _close();
    }



    /**
     * Method to close incoming call
     *
     * @param {Number=} delay In milliseconds
     * @private
     */
    function _close( delay )
    {
      SoundsService.stop( 'calling' );
      vm._stop_waves();
      vm.show_incoming_call_wrapper = false;

      setTimeout( function()
      {
        $state.go( 'consultation.consultation_home',
        {
          consultation: vm.consultation_model,
          check_consultant_availability: false //Workaround: Consultation.consultant properties are not updating properly
        });
      }, delay || 50 );
    }



    /**
     * On call error. This method should manage separately each type of error to act properly
     *
     * @param {Object} event
     * @param {Object} error
     * @private
     */
    function _on_call_error( event, error )
    {
      // 1 - Error on microphone permissions
      // 2 - Register failed
      // 4 - Callee is busy
      // 6 - Callee not found
      // 7 - Init timeout
      // 9 - Callee not exists
      // 10 - No internet
      if( [ 1, 2, 4, 6, 7, 9, 10 ].indexOf( error.error_code ) !== -1 )
      {
        vm.reject_call( error.error_code );
      }
    }



    /**
     * Method to handle call request timeout
     * @private
     */
    function _on_call_request_timeout()
    {
      ClientLogger.info( 'Call timeout' );
      $rootScope.$emit( 'IncomingCallService:call_request_timeout' );
      vm.info_message =  $translate.instant('cancel_call');
      vm.action_pending = false;
      _close();
    }



    vm._initialize = function()
    {
      vm.action_pending = true;
      SoundsService.loop( 'calling' );
      Settings.params.action = '';
      if( vm.consultant.pictures && typeof vm.consultant.pictures[ 2 ] != 'undefined' )
      {
        vm.consultant.picture_url = vm.consultant.pictures[ 2 ];
      }
      else
      {
        vm.consultant_image = window.settings.theme_path + '/img/avatar.png';
      }

      vm.service_name = vm.consultation_model.data.service.value;

      if( SupportsService.is_webgl_supported() )
      {
        initialize_waves();
      }

      $rootScope.$on( 'IncomingCallService:call_request_cancelled', _on_call_request_cancelled.bind( this ) );
      _notification_timeout_promise = $timeout( _on_call_request_timeout.bind( this ), 120000 );



      /**
       * Initialize waves
       *
       */
      function initialize_waves()
      {
        var r=5;
        var s_r=r/20+Math.sin(0)*r/20;
        var num_of_corners=7;
        var obj_resolution=360;
        var linewidth=0.02;
        var cmp = angular.element( document.querySelector( '.phe-incoming-call-avatar-waves' ) );
        var avatar = angular.element( document.querySelector( '.phe-incoming-call-caller-image img' ) );

        var _w = cmp.prop( 'offsetWidth' );
        var _h = cmp.prop( 'offsetHeight' );

        avatar[0].style.height = ( _h - 75 ).toString() + 'px';
        avatar[0].style.width = ( _h - 75 ).toString() + 'px';

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 65,  _w/_h, 0.1, 1000 );
        camera.position.z = 10;
        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
        renderer.setSize( _w, _h );
        cmp[0].appendChild( renderer.domElement );

        var group = new THREE.Object3D();
        var sub_group = new THREE.Object3D();
        var all_vertices=[];

        var objects=[];
        var num=2;
        var colors=[0xf4f4f4,0xf4f4f4];
        var opacities=[1.0,0.5];

        for(var i=0;i<num;i++){
          var obj=create_mesh(colors[i],opacities[i],1+linewidth*0.8*i,all_vertices,i);
          objects.push(obj);
          sub_group   .add(obj);
          obj.rotation.y =Math.PI/180*180;
        }

        group.rotation.x = sub_group.rotation.x = Math.PI/180*360;
        scene.add(group);
        scene.add(sub_group);

        function create_mesh(clr,op,r_coof,ver_arr,wave_type){
          var geometry = new THREE.BufferGeometry();
          var points=generate_points(r,s_r,5,wave_type);
          var points2=generate_points(r*(1-linewidth),s_r,5,wave_type);
          var vertices =generate_vertices(points,points2);
          ver_arr.push(vertices);
          geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
          var material = new THREE.MeshBasicMaterial( { color: clr,wireframe:false, transparent: true, opacity: op } );
          var mesh = new THREE.Mesh( geometry, material );
          mesh.anim_shape=num_of_corners;
          mesh.anim=-1;
          mesh.r_coof=r_coof;
          mesh.wave_type=wave_type;
          return mesh;
        }

        function generate_points(radius,wave_height,anim_shape,wave_type){

          var new_poistions=[];
          for (var i = 0; i <=  obj_resolution; i++) {
            var angle=2*Math.PI/obj_resolution*i;
            var raidus_addon=0;
            var speed_incrementer=counter/30;
            var sine_pct=0.5;

            if(i<sine_pct*obj_resolution||i==obj_resolution){
              var smoothing_amount=0.40;
              var smooth_pct=1;
              if(i<sine_pct*obj_resolution*smoothing_amount)smooth_pct=i/(sine_pct*obj_resolution*smoothing_amount);
              if(i>sine_pct*obj_resolution*(1-smoothing_amount)&&i<=sine_pct*obj_resolution)smooth_pct=(sine_pct*obj_resolution-i)/(sine_pct*obj_resolution*smoothing_amount);
              if(i==obj_resolution)smooth_pct=0;

              if(wave_type==1) raidus_addon=wave_height*smooth_pct*Math.cos((angle+speed_incrementer)*anim_shape);
              if(wave_type==0) raidus_addon=wave_height*smooth_pct*Math.sin((angle+speed_incrementer)*anim_shape);
              if(wave_type==2) raidus_addon=wave_height*smooth_pct*Math.cos((angle+Math.PI/180*120+speed_incrementer)*anim_shape);
            }

            var x = (radius+raidus_addon) * Math.cos(angle+speed_incrementer);
            var y = (radius+raidus_addon) * Math.sin(angle+speed_incrementer);
            var z=0;

            new_poistions.push([x,y,z]);
          }

          return new_poistions;
        }


        function generate_vertices(points,points2){
          var vertexPositions=[];

          for (var i = 0; i <  points.length-1; i++) {
            vertexPositions.push(points[i],points2[i],points[i+1]);
            vertexPositions.push(points2[i],points2[i+1],points[i+1]);
          }
          vertexPositions.push(points[ points.length-1],points2[points.length-1],points[0]);
          var vertices = new Float32Array( vertexPositions.length * 3 );

          for ( var i = 0; i < vertexPositions.length; i++ )
          {
            vertices[ i*3 + 0 ] = vertexPositions[i][0];
            vertices[ i*3 + 1 ] = vertexPositions[i][1];
            vertices[ i*3 + 2 ] = vertexPositions[i][2];
          }


          return vertices;
        }

        function update_vertices_v_2(points,points2,my_arr){

          var vertexPositions=[];

          for (var i = 0; i <  points.length-1; i++) {
            vertexPositions.push(points[i],points2[i],points[i+1]);
            vertexPositions.push(points2[i],points2[i+1],points[i+1]);
          }

          vertexPositions.push(points[ points.length-1],points2[points.length-1],points[0]);

          for ( var i = 0; i < vertexPositions.length; i++ ){
            my_arr[ i*3 + 0 ] = vertexPositions[i][0];
            my_arr[ i*3 + 1 ] = vertexPositions[i][1];
            my_arr[ i*3 + 2 ] = vertexPositions[i][2];
          }

        }


        var counter=0;
        var loop = function loop() {
          vm._waves_looper_id = requestAnimationFrame(loop);

          for (var k = 0; k <  objects.length; k++) {
            var obj=objects[k];
            var rad=r*obj.r_coof;
            s_r=rad/15;
            var points=generate_points(rad,s_r,obj.anim_shape,obj.wave_type);
            var points2=generate_points(rad*(1-linewidth),s_r,obj.anim_shape,obj.wave_type);
            update_vertices_v_2(points,points2, all_vertices[k]);
            obj.geometry.attributes.position.needsUpdate = true;

          }

          renderer.render(scene, camera);
          counter++;

        };

        loop();
      }
    };

    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.call' ).controller( 'phemium.call.controllers.OutgoingCall', Controller );

  function Controller
  (
    $rootScope,
    $scope,
    $translate,
    $state,
    Consultant,
    ClientLogger,
    SoundsService,
    SupportsService,
    $stateParams,
    phemiumSipVideoCall
  )
  {

    var vm = this;


    /**
     * Incoming call title
     * @var {String}
     */
    vm.info_message = $translate.instant( 'outgoing_call' );


    /**
     * Consultation consultant
     * @var {Object}
     */
    vm.consultant = Consultant.consultant;


    /**
     * Consultant image
     * @var {String}
     */
    vm.consultant_image = '';


    /**
     * Consultation service name
     *
     * @type {String}
     */
    vm.service_name = '';


    /**
     * Waves animation controller
     *
     * @var {Number}
     */
    var _waves_looper_id = null;


    /**
     * Consultation model object
     *
     * @type {Object}
     */
    var _consultation_model = $stateParams.consultation;



    /**
     * Cancel call method
     *
     */
    vm.cancel_call = function()
    {
      ClientLogger.info( 'Enduser has cancel outgoing call' );
      $rootScope.$emit( 'OutgoingCallService:call_canceled' );

      SoundsService.stop( 'calling' );
      var call_plugin = phemiumSipVideoCall.get_instance();
      call_plugin.get_current_call().release();
    };



    /**
     * Stop waves looping
     *
     * @private
     */
    function _stop_waves()
    {
      cancelAnimationFrame( _waves_looper_id );
    }



    /**
     * Method to close incoming call
     *
     * @param {Number=} delay In milliseconds
     * @private
     */
    function _close( delay )
    {
      SoundsService.stop( 'calling' );
      _stop_waves();

      setTimeout( function()
      {
        $state.go( 'consultation.consultation_home',
        {
          consultation: _consultation_model,
          check_consultant_availability: false //Workaround: Consultation.consultant properties are not updating properly
        });
      }, delay || 50 );
    }



    /**
     * Initialize controller
     *
     * @private
     */
    function _initialize()
    {
      if( vm.consultant.pictures && typeof vm.consultant.pictures[ 2 ] != 'undefined' )
      {
        vm.consultant_image = vm.consultant.pictures[ 2 ];
      }
      else
      {
        vm.consultant_image = window.settings.theme_path + '/img/avatar.png';
      }

      vm.service_name = _consultation_model.data.service.value;

      if( SupportsService.is_webgl_supported() )
      {
        initialize_waves();
      }

      // Play call sound
      SoundsService.loop( 'calling' );

      // Add Call events listener
      // var listener_call_event = $rootScope.$on( 'CallService:call_event', _on_call_event );

      $scope.$on( '$destroy', function()
      {
        listener_call_event();
      });



      /**
       * Initialize waves
       *
       */
      function initialize_waves()
      {
        var r=5;
        var s_r=r/20+Math.sin(0)*r/20;
        var num_of_corners=7;
        var obj_resolution=360;
        var linewidth=0.02;
        var cmp = angular.element( document.querySelector( '.phe-incoming-call-avatar-waves' ) );
        var avatar = angular.element( document.querySelector( '.phe-incoming-call-caller-image img' ) );

        var _w = cmp.prop( 'offsetWidth' );
        var _h = cmp.prop( 'offsetHeight' );

        avatar[0].style.height = ( _h - 75 ).toString() + 'px';
        avatar[0].style.width = ( _h - 75 ).toString() + 'px';

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 65,  _w/_h, 0.1, 1000 );
        camera.position.z = 10;
        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
        renderer.setSize( _w, _h );
        cmp[0].appendChild( renderer.domElement );

        var group = new THREE.Object3D();
        var sub_group = new THREE.Object3D();
        var all_vertices=[];

        var objects=[];
        var num=2;
        var colors=[0xf4f4f4,0xf4f4f4];
        var opacities=[1.0,0.5];

        for(var i=0;i<num;i++){
          var obj=create_mesh(colors[i],opacities[i],1+linewidth*0.8*i,all_vertices,i);
          objects.push(obj);
          sub_group   .add(obj);
          obj.rotation.y =Math.PI/180*180;
        }

        group.rotation.x = sub_group.rotation.x = Math.PI/180*360;
        scene.add(group);
        scene.add(sub_group);

        function create_mesh(clr,op,r_coof,ver_arr,wave_type){
          var geometry = new THREE.BufferGeometry();
          var points=generate_points(r,s_r,5,wave_type);
          var points2=generate_points(r*(1-linewidth),s_r,5,wave_type);
          var vertices =generate_vertices(points,points2);
          ver_arr.push(vertices);
          geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
          var material = new THREE.MeshBasicMaterial( { color: clr,wireframe:false, transparent: true, opacity: op } );
          var mesh = new THREE.Mesh( geometry, material );
          mesh.anim_shape=num_of_corners;
          mesh.anim=-1;
          mesh.r_coof=r_coof;
          mesh.wave_type=wave_type;
          return mesh;
        }

        function generate_points(radius,wave_height,anim_shape,wave_type){

          var new_poistions=[];
          for (var i = 0; i <=  obj_resolution; i++) {
            var angle=2*Math.PI/obj_resolution*i;
            var raidus_addon=0;
            var speed_incrementer=counter/30;
            var sine_pct=0.5;

            if(i<sine_pct*obj_resolution||i==obj_resolution){
              var smoothing_amount=0.40;
              var smooth_pct=1;
              if(i<sine_pct*obj_resolution*smoothing_amount)smooth_pct=i/(sine_pct*obj_resolution*smoothing_amount);
              if(i>sine_pct*obj_resolution*(1-smoothing_amount)&&i<=sine_pct*obj_resolution)smooth_pct=(sine_pct*obj_resolution-i)/(sine_pct*obj_resolution*smoothing_amount);
              if(i==obj_resolution)smooth_pct=0;

              if(wave_type==1) raidus_addon=wave_height*smooth_pct*Math.cos((angle+speed_incrementer)*anim_shape);
              if(wave_type==0) raidus_addon=wave_height*smooth_pct*Math.sin((angle+speed_incrementer)*anim_shape);
              if(wave_type==2) raidus_addon=wave_height*smooth_pct*Math.cos((angle+Math.PI/180*120+speed_incrementer)*anim_shape);
            }

            var x = (radius+raidus_addon) * Math.cos(angle+speed_incrementer);
            var y = (radius+raidus_addon) * Math.sin(angle+speed_incrementer);
            var z=0;

            new_poistions.push([x,y,z]);
          }

          return new_poistions;
        }


        function generate_vertices(points,points2){
          var vertexPositions=[];

          for (var i = 0; i <  points.length-1; i++) {
            vertexPositions.push(points[i],points2[i],points[i+1]);
            vertexPositions.push(points2[i],points2[i+1],points[i+1]);
          }
          vertexPositions.push(points[ points.length-1],points2[points.length-1],points[0]);
          var vertices = new Float32Array( vertexPositions.length * 3 );

          for ( var i = 0; i < vertexPositions.length; i++ )
          {
            vertices[ i*3 + 0 ] = vertexPositions[i][0];
            vertices[ i*3 + 1 ] = vertexPositions[i][1];
            vertices[ i*3 + 2 ] = vertexPositions[i][2];
          }


          return vertices;
        }

        function update_vertices_v_2(points,points2,my_arr){

          var vertexPositions=[];

          for (var i = 0; i <  points.length-1; i++) {
            vertexPositions.push(points[i],points2[i],points[i+1]);
            vertexPositions.push(points2[i],points2[i+1],points[i+1]);
          }

          vertexPositions.push(points[ points.length-1],points2[points.length-1],points[0]);

          for ( var i = 0; i < vertexPositions.length; i++ ){
            my_arr[ i*3 + 0 ] = vertexPositions[i][0];
            my_arr[ i*3 + 1 ] = vertexPositions[i][1];
            my_arr[ i*3 + 2 ] = vertexPositions[i][2];
          }

        }


        var counter=0;
        var loop = function loop() {
          _waves_looper_id = requestAnimationFrame(loop);

          for (var k = 0; k <  objects.length; k++) {
            var obj=objects[k];
            var rad=r*obj.r_coof;
            s_r=rad/15;
            var points=generate_points(rad,s_r,obj.anim_shape,obj.wave_type);
            var points2=generate_points(rad*(1-linewidth),s_r,obj.anim_shape,obj.wave_type);
            update_vertices_v_2(points,points2, all_vertices[k]);
            obj.geometry.attributes.position.needsUpdate = true;

          }

          renderer.render(scene, camera);
          counter++;

        };

        loop();
      }
    }



    /**
     * Call event received
     *
     * @param {Object} ev
     * @param {Object} data
     * @private
     */
    function _on_call_event( ev, data )
    {
      switch( data.event )
      {
        case 'call_connected':
          _close();
          break;

        case 'call_disconnected':
          // @TODO This is called here to stop using camera/microhone
          // This must be managed by Phemium VideoCall Plugin.
          Comm.webrtc.utils.UserMediaChecker.stop_stream();

          _close();
          break;
      }
    }


    _initialize();
  }
})();

(function()
{
  'use strict';

  angular.module( 'app.call' ).factory( 'CallService', CallService );

  function CallService
  (
    $rootScope,
    $translate,
    phemiumApiConnector,
    phemiumCommunicator,
    phemiumSipVideoCall,
    ClientLogger,
    NotificationService,
    Settings,
    UtilsService,
    Consultant
  )
  {
    return {

      /**
       * Defines if its calling or not
       *
       * @var {Boolean}
       */
      is_calling: false,


      /**
       * Plugin instance
       *
       * @var {Object}
       * @private
       */
      _call_plugin: null,


      /**
       * Session id
       *
       * @var {String}
       * @private
       */
      _session_id: null,


      /**
       * Communication credentials
       *
       * @var {Object}
       * @private
       */
      communication_credentials: null,


      /**
       * Credentials
       *
       * @var {Object}
       * @private
       */
      _credentials: null,


      /**
       * Only audio
       *
       * @var {Object}
       * @private
       */
      only_audio: false,



      /**
       * Keyboard Listeners attached
       *
       * @var {Boolean}
       * @private
       */
      attached_android_minimized_listeners: false,



      /**
       * Call configuration
       *
       * @var {Object}
       * @private
       */
      _config:
      {
        enduser_id: null,
        consultant_id: null,
        service_id: null,
        portal_id: null,
        portal_name: null,
        consultant: null,
        consultation_id: null,
        language_code: null,
        appointment_id: null,
        auto_accept: false
      },



      /**
       * Start
       *
       * @param {Object} config
       */
      call: function( config )
      {
        $rootScope.preparing_call = true;
        this._config = config;

        this._setup_communication()
          .then( this._prepare_call.bind( this ) )
          .then( this._start_call.bind( this ) );
      },



      /**
       * Setup communication
       *
       * @return {Promise}
       * @private
       */
      _setup_communication: function()
      {
        var self = this;

        return new Promise( function( resolve )
        {
          var call_data =
          {
            enduser_id: self._config.enduser_id,
            consultant_id: self._config.consultant.id,
            service_id: self._config.service_id,
            portal_id: self._config.portal_id,
            portal_name: self._config.portal_name,
            classification_id: null,
            language_code: self._config.language_code
          };

          ClientLogger.info( 'Send Communication setup', call_data );

          phemiumApiConnector.request( 'portals_frontend', 'setup_communication', [ call_data ] )
            .then( function( data )
            {
              ClientLogger.info( 'Communication setup succeeded', data );
              self._session_id = data.session_id;
              self.communication_credentials = data.communication_credentials;

              resolve();
            })
            .catch( function( error )
            {
              ClientLogger.error( 'Error doing the setup of the communication', error );
              $rootScope.$broadcast( 'CallService:setup_communication_error', error );
            });
        });
      },



      /**
       * Create call object for easy communication
       *
       * @return {Promise}
       * @private
       */
      _prepare_call: function()
      {
        var self = this;

        return new Promise( function( resolve )
        {
          var call =
          {
            session_id: self._session_id,
            publication_id: self._config.portal_id,
            service: { id: self._config.service_id },
            classification_id: null,
            consultation: { id: self._config.consultation_id },
            type: 3, // Access from mobile device
            from:
            {
              sip_address: self.communication_credentials.sip_address,
              enduser_id: self._config.enduser_id
            },
            to:
            {
              sip_address: self._config.consultant.sip_address,
              enduser_id: null
            },
            events:
            [
              { type: 14, info: self._config.appointment_id },
              { type: 16, info: true }
            ]
          };

          if( self._config.auto_accept )
          {
            call.events.push( { type: 17, info: self._config.auto_accept } );
          }

          phemiumApiConnector.request( 'call', 'prepare_call', [ call ] )
            .then( resolve )
            .catch( function( error )
            {
              ClientLogger.error( 'Error preparing call', error );
              $rootScope.$broadcast( 'CallService:prepare_call_error', error );
            });
        });
      },



      /**
       * Starts call
       *
       * @private
       */
      _start_call: function()
      {
        var settings =
        {
          only_audio: this.only_audio,
          download_bandwidth: null,
          upload_bandwidth: null,
          framerate: 15,
          encryption_mode: 'none'
        };

        // Set Gui Settings And Extra Setting to Config
        this._config.gui_settings = window.settings.guiVideoCallPluginSettings || {};
        this._config.gui_settings.language = window.settings.language_code;
        this._config.gui_settings.consultant_name = this._config.consultant.presentation_name;
        this._config.gui_settings.log_mode = $rootScope.debug_enabled;
        //Need to set App Name for IncomingCall Screen And Callkit in gui_settings

        this._config.extra_settings = window.settings.VideoCallPluginExtraSettings || {};
        this._config.extra_settings.transport_mode = Settings.params.tls === '1' ? 'tls' : '';
        this._config.extra_settings.consultation_id = this._config.consultation_id;
        this._config.extra_settings.enduser_version = window.settings.version;
        this._config.extra_settings.videocall_version = "2.7.5";

        // this._call_plugin = phemiumSipVideoCall;
        this._call_plugin = phemiumSipVideoCall.get_instance();

        this._call_plugin.call(
          this._config.consultant.sip_address,
          this.communication_credentials,
          settings,
          this._config,
          this._on_call_success.bind( this ),
          this._on_call_error.bind( this ),
          this._on_call_event.bind( this )
        );
      },



      /**
       * Handle call success
       *
       * @param {Object} message
       * @private
       */
      _on_call_success: function( message )
      {
        // Minimized / SenQuality Events are thrown through the call success callback.
        if( message.event.length > 9 && ( message.event.substring( 0, 9 ) == 'minimized' || message.event == 'sendQuality' ) )
        {
          ClientLogger.info( 'Call Event: ' + message.event );

          $rootScope.preparing_call = false;
          $rootScope.isCalling = true;
          this.is_calling = true;
          //$rootScope.timeStr = message.split(':')[1];

          // Call minimized
          if( message.event.substring( 0, 9 ) === 'minimized' )
          {
            // Add Android listeners to set boundaries
            if( UtilsService.platform.toLowerCase() === 'android' || this.attached_keyboard_listeners === false )
            {
              this._add_android_minimized_listeners();
              this.attached_android_minimized_listeners = true;
            }

            $rootScope.$emit( 'CallService:call_minimized', message.event );
          }
        }
        else if( message.error_code == 0 )
        {
          ClientLogger.info( 'Call finished successfully', message );
          $rootScope.preparing_call = false;
          $rootScope.isCalling = false;
          this.is_calling = false;

          // Remove Android listeners to set boundaries
          if( UtilsService.platform.toLowerCase() === 'android' )
          {
            this._remove_android_minimized_listeners();
          }

          if( $rootScope.before_background === true )
          {
            cordova.plugins.backgroundMode.moveToBackground();
          }
        }
        else
        {
          $rootScope.preparing_call = false;
          $rootScope.isCalling = true;
          this.is_calling = true;
        }
      },



      /**
       * Handle call error
       *
       * @param {Number} code
       * @param {Object} info_error
       * @private
       */
      _on_call_error: function( code, info_error )
      {
        $rootScope.preparing_call = false;
        $rootScope.isCalling = false;
        this.is_calling = false;

        // Remove Android listeners to set boundaries
        if( UtilsService.platform.toLowerCase() === 'android' )
        {
          this._remove_android_minimized_listeners();
        }

        if( code == 0 )
        {
          ClientLogger.info( 'Call finished successfully' );
          return;
        }

        ClientLogger.info( '_on_call_error', info_error );
        // IOS return code 0 if call is success

        $rootScope.$emit( 'CallService:call_error', code );
        ClientLogger.error( 'Call finished with error', code );
        var text_key;
        var type;

        switch( code.error_code )
        {
          case 0:
            text_key = '';
            break;

          case 1:
            text_key = 'call_error_permissions_denied';
            type = 'error';
            break;

          case 2:
            text_key = 'call_error_registration_failure';
            type = 'error';
            break;

          case 3:
            text_key = 'call_error_media_establishment';
            type = 'error';
            break;

          case 4:
            text_key = 'call_error_consultant_busy';
            type = 'info';
            break;

          case 5:
            text_key = 'call_error_declined';
            type = 'info';
            break;

          case 6:
            text_key = 'call_error_callee_not_found';
            type = 'info';
            break;
          case 7:
            text_key = 'call_error_init_timeout';
            type = 'info';
            break;

          case 8:
            text_key = 'call_error_ring_timeout';
            type = 'info';
            break;

          case 9:
            text_key = 'call_error_callee_not_exist';
            type = 'info';
            break;

          case 10:
            text_key = 'call_error_no_internet';
            type = 'error';
            break;

          default:
            text_key = 'call_error_network';
            type = 'error';
            break;
        }

        if( this._config )
        {
          phemiumCommunicator.send( 'consultant_' + this._config.consultant.id,
          {
            name: 'Communicator:consultation_call_request_error',
            data: { code: code, error_str: text_key }
          });
        }
        else
        {
          ClientLogger.error( 'La variable this._config no existe' );
        }

        if( type === 'info' )
        {
          NotificationService.show_alert(
          {
            css_class: 'phe-popup-error',
            title: '<i class="icon ion-ios-information-outline"></i>',
            body: $translate.instant( text_key ),
            ok_text: $translate.instant( 'ok_text' ),
            ok_type: 'button-positive',
            on_click: null
          });
        }
        else
        {
          NotificationService.show_alert(
          {
            css_class: 'phe-popup-error',
            title: '<i class="icon ion-android-alert"></i>',
            subtitle: $translate.instant( 'call_error_title' ),
            body: $translate.instant( text_key ),
            ok_text: $translate.instant( 'ok_text' ),
            ok_type: 'button-positive',
            on_click: null
          });
        }
      },



      /**
       * Add Android call minimized listeners
       *
       * @private
       */
      _add_android_minimized_listeners: function()
      {
        window.addEventListener( 'keyboardDidShow', this._set_overlay_boundaries );
        window.addEventListener( 'keyboardDidHide', this._set_overlay_boundaries );
      },



      /**
       * Remove Android call minimized listeners
       *
       * @private
       */
      _remove_android_minimized_listeners: function()
      {
        window.addEventListener( 'keyboardDidShow', this._set_overlay_boundaries );
        window.addEventListener( 'keyboardDidHide', this._set_overlay_boundaries );
        this.attached_android_minimized_listeners = false;
      },



      /**
       * Set overlay boundaries
       *
       * @private
       */
      _set_overlay_boundaries: function()
      {
        var domelement = document.querySelector( '[data-id="consultation-home-content"]' );
        var call_plugin = phemiumSipVideoCall.get_instance();

        var boundaries = domelement.getBoundingClientRect();
        call_plugin.setOverlayBoundary( boundaries );
      },



      /**
       * Handle reopen call events
       */
      reOpen: function()
      {
        this._call_plugin = phemiumSipVideoCall.get_instance();

        this._call_plugin.reOpen
        (
          function( message )
          {
            $rootScope.$emit( 'CallService:call_reopen', message.event );
            ClientLogger.info( '_on_reopen_call_event', message );

            if( message.error_code == 0 )
            {
              $rootScope.preparing_call = false;
              $rootScope.isCalling = false;
              this.is_calling = false;
            }

            if( message.event.length > 9 && message.event.substring( 0, 9 ) == 'minimized' )
            {
              $rootScope.timeStr = message.event.split(':')[1];
              $rootScope.preparing_call = false;
              $rootScope.isCalling = true;
              this.is_calling = true;
              $rootScope.$emit( 'CallService:call_minimized', message.event );
            }
          },
          function( error )
          {
            ClientLogger.error( '_on_error_reopen_call', error );
            $rootScope.preparing_call = false;
            $rootScope.isCalling = false;
            this.is_calling = false;
          }
        );
      },



      /**
       * Handle hangUp call events
       */
      hangUp: function()
      {
        console.log( 'go hangUp' );

        if( UtilsService.platform === 'browser' )
        {
          var _call_plugin = phemiumSipVideoCall.get_instance();
          _call_plugin.get_current_call().release();
          return;
        }

        $rootScope.preparing_call = false;
        $rootScope.isCalling = false;
        this.is_calling = false;
        this._call_plugin = phemiumSipVideoCall.get_instance();

        this._call_plugin.hangUp
        (
          function( message )
          {
            $rootScope.$emit( 'CallService:call_hangUp', message );
            ClientLogger.info( '_on_hangUp_call_event', message );
          },
          function( error )
          {
            ClientLogger.error( '_on_error_hangUp_call', error );
          }
        );
      },



      /**
       * Handle On Chat Message Arrived
       * @private
       */
      onChatMessageArrived: function()
      {
        this._call_plugin = phemiumSipVideoCall.get_instance();

        if( !this._call_plugin || typeof this._call_plugin.onChatMessageArrived !== 'function' )
        {
          return;
        }

        this._call_plugin.onChatMessageArrived( function( message )
        {
          $rootScope.$emit( 'CallService:onChatMessageArrived', message );

          if( message && message.event.length > 9 && message.event.substring(0, 9) == 'minimized' )
          {
            $rootScope.timeStr = message.event.split( ":" )[ 1 ];
            $rootScope.isCalling = true;
            $rootScope.$emit( 'CallService:call_minimized', message.event );
          }
        },
        function ( error )
        {
          ClientLogger.error( 'onChatMessageArrived', error );
        });
      },



      /**
       * Handle call events
       *
       * @private
       */
      _on_call_event: function( data )
      {
        ClientLogger.info( '_on_call_event', data );
        $rootScope.$emit( 'CallService:call_event', data );

        switch( data.event )
        {
          case 'call_connected':
            $rootScope.isCalling = true;
            break;

          case 'call_disconnected':
            this._reset_videocall_plugin();
            $rootScope.isCalling = false;
            break;
        }
      },



      /**
       * Resets videocall plugin to clean things up for next call
       */
      _reset_videocall_plugin: function()
      {
        this._call_plugin = phemiumSipVideoCall.get_instance();
        this._call_plugin.shutdown();
        this._call_plugin = phemiumSipVideoCall.get_instance();

        var config =
        {
          app_name: Settings.params.customer_name,
          use_webrtc: UtilsService.allows_webrtc === true
        };

        this._call_plugin.load( config );
      },



      /**
       * Check if call is enabled
       *
       */
      check_call_disable: function( )
      {
        // Call disabled if webrtc is not allowed or if Consultant is a Chatbot
        if( UtilsService.allows_webrtc === false || Consultant.consultant.treatment === 7 )
        {
          return true;
        }
        else
        {
          return false;
        }
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.call' ).factory( 'IncomingCallService', IncomingCallService );

  function IncomingCallService
  (
    $rootScope,
    $translate,
    $state,
    NotificationService,
    Consultant,
    ConsultationService,
    Enduser,
    CallService,
    phemiumCommunicator,
    ClientLogger,
    Auth,
    UtilsService,
    Settings
  )
  {


    /**
     * Initialized checker
     *
     * @var {Boolean}
     */
    var initialized = false;



    /**
     * Notification timeout id
     *
     * @var {Number}
     */
    var notification_timeout_id = null;


    /**
     * Call request local notification interval id
     *
     * @var {Number}
     */
    var call_request_local_notification_interval_id = null;


    /**
     * Current consultation model
     *
     * @var {Object}
     */
    var consultation = null;



    /**
     * App status when incoming call arrives
     *
     * @var {Boolean}
     */
    var before_call_background = null;



    /**
     * Incoming call view should be shown
     *
     * @var {Boolean}
     */
    var pending_incoming_call_view = null;



    /**
     * Pemding incoming call
     *
     * @var {Boolean}
     */
    var pending_call = null;



    /**
     * Initialize
     *
     * @param {Object} consultation_model
     */
    function initialize( consultation_model )
    {
      if( initialized )
      {
        return;
      }
      initialized = true;
      consultation = consultation_model;
      _start_voip_notifications();

      $rootScope.$on( 'Communicator:consultation_call_request', on_call_request ); // Legacy: Faye notification
      $rootScope.$on( 'PushNotificationService:consultation_call_request', on_call_request ); // New call request notification through browser/voip notifications
      $rootScope.$on( 'Communicator:consultation_call_request_cancelled', function(){ on_call_request_cancelled( 'by_consultant' ); } );
      $rootScope.$on( 'onResume', _on_resume );
      $rootScope.$on( 'onPause', _on_pause );
      $rootScope.$on( 'IncomingCallController:call_accepted', on_call_request_accepted );
      $rootScope.$on( 'IncomingCallService:call_rejected', on_call_request_rejected );
    }



    /**
     * Method to handle call request
     */
    function on_call_request()
    {
      ClientLogger.info( 'New call request arrived' );
      pending_incoming_call_view = true;
      pending_call = true;

      phemiumCommunicator.send( 'consultant_' + Consultant.consultant.id,
      {
        name: 'Communicator:consultation_call_request_received',
        data: {}
      });

      if( UtilsService.platform === 'browser' || !$rootScope.in_background )
      {
        show_incoming_call();
      }
      else if( UtilsService.platform.toLowerCase() === 'android' )
      {
        before_call_background = true;
        show_incoming_call();
        window.plugins.bringtofront();
      }
      else if( UtilsService.platform.toLowerCase() === 'ios' )
      {
        show_call_request_notification();
      }
    }



    /**
     * Method to handle call request cancellation
     *
     * @param {String} reason
     */
    function on_call_request_cancelled( reason )
    {
      ClientLogger.info( 'Call request cancelled: ' + reason );
      pending_call = false;
      _clear_call_request();

      if( $rootScope.in_background === true )
      {
        cordova.plugins.notification.local.cancelAll( NotificationService.show_local_notification( "missed_call" ) );
      }
      else if( before_call_background && UtilsService.platform.toLowerCase() === 'android' )
      {
        cordova.plugins.backgroundMode.moveToBackground();
      }

      $rootScope.$emit( 'IncomingCallService:call_request_cancelled' );
    }



    /**
     * On call request accepted
     *
     */
    function on_call_request_accepted()
    {
      ClientLogger.info( 'Call request accepted' );
      pending_call = false;
      _clear_call_request();
    }



    /**
     * Call request has been rejected by enduser
     *
     * @private
     */
    function on_call_request_rejected()
    {
      ClientLogger.info( 'Call request rejected by enduser' );
      pending_call = false;
      _clear_call_request();
    }



    /**
     * Clear intervals, timeout and variables
     *
     * @private
     */
    function _clear_call_request()
    {
      clearInterval( call_request_local_notification_interval_id );
      notification_timeout_id = null;
      pending_incoming_call_view = false;
    }



    /**
     * App changes from background to foreground
     *
     * @private
     */
    function _on_resume(){
      cordova.plugins.notification.local.cancelAll();
      if( pending_incoming_call_view  === true )
      {
        _clear_call_request();
        show_incoming_call();
      }
      else if( pending_call  === true )
      {
        _clear_call_request();
      }
    }



    /**
     * App changes from foreground to background
     *
     * @private
     */
    function _on_pause(){
      if( pending_call)
      {
        show_call_request_notification();
      }
    }



    /**
     * Show incoming call local notification
     *
     */
    function show_call_request_notification( )
    {
      NotificationService.show_local_notification( "incoming_call" );
      call_request_local_notification_interval_id = setInterval( function()
      {
        NotificationService.show_local_notification( "incoming_call" );
      }, 10000 );
      notification_timeout_id = setTimeout( function(){ on_call_request_cancelled( 'timeout' ); }, 120000 );
    }



    /**
     * Show incoming call view
     */
    function show_incoming_call()
    {
      ClientLogger.info( 'Showing incoming call screen' );
      pending_incoming_call_view = false;
      NotificationService.close();

      if( window.cordova )
      {
        Keyboard.hide();
      }

      $state.go( 'consultation.incoming_call', { consultation: consultation } );
    }



    /**
     * Register VoIP listeners
     *
     * @private
     */
    function _start_voip_notifications()
    {
      if( UtilsService.platform.toLowerCase() === 'ios' && Settings.params.voip_notifications === true )
      {
        var push = VoIPPushNotification.init();

        // Handle VoIP Push Notifications events
        push.on( 'registration', function( data )
        {
          // TODO: Call Phemium API to store voip token
          ClientLogger.info( 'VoIP push notifications registered' );
        });
        push.on( 'notification', function( data )
        {
          ClientLogger.info( 'VoIP push notifications received' );
          on_call_request();
        });
        push.on( 'error', function( e )
        {
          ClientLogger.info( 'VoIP push notifications error', e );
        });
      }
    }


    // **************************************
    // Public / Export
    // **************************************
    return {
      initialize: initialize,
      on_call_request: on_call_request
    }
  }

})();

( function()
{
  'use strict';

  angular.module('app').component('pheCard',
  {
    templateUrl: 'card_viewer/views/card_viewer.tpl.html',
    controller: CardController,
    controllerAs: 'ctrl',
    bindings: {
      card_id: "<",
      consultation: "<"
    }
  });


  function CardController
  (
    $rootScope,
    $translate,
    $stateParams,
    $state,
    ClientLogger,
    phemiumApiConnector,
    LoadingService,
    NotificationService,
    UtilsService,
    Settings
  )
  {
    var self = this;

    /**
     * Card id
     * @var {Number}
     */
    self.card_id = null;

    /**
     * Consultation id
     * @var {Object}
     */
    self.consultation = {};

    /**
     * A card is being saved
     * @var {Boolean}
     */
    self.saving_card = false;

    /**
     * Multiple question viewer
     * @var {Boolean}
     */
    self.multiple_fields = false;

    /**
     * Disable card save button
     * @var {Boolean}
     */
    self.card_button_blocked = false;


    const QUESTION_TYPE_STATIC = 12;
    const QUESTION_TYPE_RATING = 19;
    const QUESTION_TYPE_SLIDER = 20;
    const QUESTION_TYPE_LISTBUTTONS_1 = 21;
    const QUESTION_TYPE_LISTBUTTONS_2 = 22;
    const QUESTION_TYPE_TEXT_1 = 1;
    const QUESTION_TYPE_TEXT_2 = 2;
    const QUESTION_TYPE_NUMBER = 7;

    /**
     * Load card data
     * @private
     */
    self._load_card_definition = function()
    {
      phemiumApiConnector.request( 'cards', 'get_card_definition', [ self.card_id ] )
        .then( self._check_display_mode );
    };



    /**
     * Handle card loaded callback
     *
     * @param {Object} card_definition
     * @private
     */
    self._check_display_mode = function( card_definition )
    {
      self.card = card_definition;

      // If card display type is wizard, call show_question to manage sequence of questions (library_fields)
      if( self.card.display_mode === "wizard" )
      {
        LoadingService.hide();
        _card_wizard_open_field();

        // Count only questions, static texts doesn't adds to max_questions
        self.num_questions = 1;
        self.max_questions = 0;

        for(var i = 0; i < self.card.fields.length; i++)
        {
          if(self.card.fields[i].library_field.type !== 12) self.max_questions++;
        }
      }

      // If card display type is form or it is a preform, load panels data before show card
      else if( self.card.display_mode === "form" || !self.card.display_mode )
      {
        self.consultation.card_get_field_values( self.card_id )
        .then( self._process_card_panels )
        .then( function( panels )
        {
          self.card.panels = panels;
          LoadingService.hide();
        });
      }

    };



    /**
     * Open field of card depens type
     *
     * @private
     */
    var _card_wizard_open_field = function()
    {
      // Set the current library_field to show
      self.field_data = self.card.fields[self.current_question ].library_field;
      self.field_data.question_context = "card";
      check_last_question();

      // Show field answer component
       // TP_STATIC. #12
      if(self.field_data.type === QUESTION_TYPE_STATIC )
      {
        self.question_component = 'static';
      }
       // TP_RATING. #19
      if(self.field_data.type === QUESTION_TYPE_RATING )
      {
        self.question_component = 'rating';
      }
      // TP_SLIDER. #20.
      else if( self.field_data.type === QUESTION_TYPE_SLIDER )
      {
        self.question_component = 'slider';
      }
      // TP_LIST_BUTTONS. #22.
      else if( self.field_data.type === QUESTION_TYPE_LISTBUTTONS_1 || self.field_data.type === QUESTION_TYPE_LISTBUTTONS_2 )
      {
        self.question_component = 'select'
      }
      // TP_TEXT. #1 #2
      else if( self.field_data.type === QUESTION_TYPE_TEXT_1 ||  self.field_data.type === QUESTION_TYPE_TEXT_2 )
      {
       self.question_component = 'text';
      }
      else if( self.field_data.type === QUESTION_TYPE_NUMBER )
      {
       self.question_component = 'number';
      }

    };



    /**
     * Add value from field
     *
     * @param {Number|string} value
     */
    self.card_wizard_add_answer = function( value )
    {
      self.card_values.push( value );
      self.field_data = null;
      _card_wizard_next_question();
    };



    /**
     * Next field inside card
     *
     * @private
     */
    var _card_wizard_next_question = function()
    {
      self.current_question++;
      if(self.question_component !== 'static') self.num_questions++;

      if( self.current_question  < self.card.fields.length )
      {
        _card_wizard_open_field();
      }
      else
      {
        _update_card_data();
      }
    };



    /**
     * Close card,  execute callback
     *
     */
    self.close_card = function( )
    {
      _reset_card();

      if( $rootScope.is_preform === 1 )
      {
        $state.go( 'consultation_base',
        {
          consultation_id: self.consultation.id
        });
      }
      else
      {
        $state.go( 'consultation.consultation_home',
        {
          consultation: self.consultation
        });
      }
    };



    /**
     * Notification before update card
     *
     * @private
     */
    var _card_updated = function()
    {
      // When first card (preform) is filled, set true to not open it again
      if( !self.consultation.is_preform_filled() )
      {
        self.consultation.set_preform_filled();
        self.close_card();
        return;
      }

      NotificationService.show_alert(
      {
        css_class: 'phe-popup-success',
        title: '<i class="icon ion-ios-checkmark-empty phe-green"></i>',
        subtitle: $translate.instant( 'form_save_complete' ),
        body: $translate.instant( 'form_complete_thanks' ),
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-positive',
        on_click: self.close_card
      });
    };



    /**
     * Notification before update card
     *
     * @private
     */
    var _card_update_error = function (err)
    {
      NotificationService.show_alert
      (
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-empty phe-red"></i>',
        subtitle: $translate.instant( 'form_save_error' ),
        body: $translate.instant( 'try_again_later' ),
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-positive',
        on_click: self.close_card
      });
     };



    /**
     * Reset card data before
     *
     * @private
     */
     var _reset_card = function()
     {
       self.card = null;
       self.card_values = null;
       self.saving_card = false;
     };



    /**
     * Handle card values loaded callback
     *
     * @param {Object} card_values
     * @private
     */
    self._process_card_panels = function( card_values )
    {
      // Process panels to save their fields and values in same object
      var panels = [];

      angular.forEach( self.card.panels, function( panel, index )
      {
        panel.fields = [];
        angular.forEach( self.card.fields, function( field, index )
        {
          if( field.panel_id === panel.id )
          {
            angular.forEach( card_values, function( card_value, index )
            {
              if( field.library_field_id === parseInt(index) )
              {
                field.value = card_value;
                return;
              }
            });

            panel.fields.push( field );
            return;
          }
        });
        panels.push( panel );
      });

      return panels;

    };



    /**
     * Update card data
     *
     * @private
     */
    var _update_card_data = function()
    {
      self.saving_card = true;

      self.consultation.update_field_values( self.card , self.card_values )
        .then( _card_updated )
        .catch( _card_update_error );
    };



    /**
     * Save card with display_mode = 'form'
     *
     */
    self.save_card_form = function()
    {
      if( self.card_button_blocked === true )
      {
        return;
      }

      self.card_button_blocked = true;

      // Collect_values to save
      angular.forEach( self.card.panels, function( panel, index )
      {
        angular.forEach( panel.fields, function( field, index )
        {
          if( field.value )
          {
            self.card_values.push( field.value.text );
          }
          else
          {
             self.card_values.push( 'empty' );
          }
        });
      });



      // Update card data
      if( self.card_values )
      {
        _update_card_data();
      }
    };



    /**
     * Go to back action
     */
    self.back = function()
    {
      var is_plugin = !!( window.plugins && window.plugins.PhemiumEnduserPlugin );

      if( $rootScope.is_preform !== 1 )
      {
        $state.go( 'consultation.consultation_home',
        {
          consultation: self.consultation
        });
        return;
      }

      ClientLogger.info( 'Closing the form preform' );

      // If the card is a preform, go to consultation list or close the plugin
      if( is_plugin )
      {
        UtilsService.exit_app();
      }
    };



    /**
     * Check if the question is the last one
     *
     * @private
     */
    var check_last_question = function()
    {
      if( self.current_question  === self.card.fields.length-1 )
      {
        self.field_data.is_last_question = true;
      }
      else
      {
        self.field_data.is_last_question = false;
      }
    }



    /**
     * Initialize method
     *
     * @private
     */
    self._constructor = function()
    {
      if( $stateParams.card_id )
      {
        self.card_id = $stateParams.card_id;
      }
      if( $stateParams.consultation )
      {
        self.consultation = $stateParams.consultation;
      }

      // Initialize variables
      self.current_question = 0;
      self.card_values = [];

      // Load card
      self._load_card_definition();
    };

    self._constructor();

  }
})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.ConsultantProfile', Controller );

  function Controller
  (
    $scope,
    $rootScope,
    $stateParams,
    $state,
    ConsultantProfileService
  )
  {
    /* jshint validthis: true */
    var vm = this;



    /**
     * Consultation model
     *
     * @var {Object}
     */
    vm.consultation_model = $stateParams.consultation;



    /**
     * Consultation
     *
     * @var {Object}
     */
    vm.consultation = {};


    /**
     * Consultant
     *
     * @var {Object}
     */
    vm.consultant = {};



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      vm.consultation = $stateParams.consultation;
      vm.consultant = vm.consultation.get_main_consultant();
      vm.card = ConsultantProfileService.card;
      $rootScope.$on( 'Communicator:consultant_status_notification', vm._on_consultant_status_change );
    };



    /**
     * Method to handle consultant status change event
     *
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    vm._on_consultant_status_change = function( event, data )
    {
      for( var i = 0; i < vm.consultation.data.consultants.length; i++ )
      {
        var consultant = vm.consultation.data.consultants[ i ];

        if( parseInt( data.consultant_id ) !== parseInt( consultant.id ) )
        {
          continue;
        }

        consultant.status_text = data.status.replace( 'status:', '' );
        vm.consultation.data.consultants[ i ] = consultant;
        $scope.$apply();
        break;
      }
    };



    /**
     * Goes to consultation detail
     *
     * @param {number} consultation
     */
    vm.go_to_consultation_detail = function()
    {
      $state.go( 'consultation.consultation_detail', { consultation: vm.consultation } );
    };

    vm._initialize();
  }
})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).factory( 'ConsultantProfileService', ConsultantProfileService );

  function ConsultantProfileService
  (
    ClientLogger,
    phemiumApiConnector
  )
  {


    /**
     * Method to load service
     *
     * @param {object} consultation_model
     * @private
     */
    function init_consultant_profile( consultation )
    {
      service.consultation = consultation.data;

      return _load_card_definition( consultation.service )
        .then( _load_card_values )
        .then( _save_card_data )
        .catch( _profile_service_error );
    }



    /**
     * Method to card definition
     *
     * @param {Object} service
     * @private
     */
    function _load_card_definition( service )
    {
      return phemiumApiConnector.request( 'cards', 'get_card_definition', [ service.profile_id ] );
    }



    /**
     * Method to card definition
     *
     * @param {Object} card_definition
     * @private
     */
    function _load_card_values( card_definition )
    {
      service.card = card_definition;
      var card_entities = { consultant_id: service.consultation.consultants[0].id };

      return phemiumApiConnector.request( 'cards', 'get_field_values_by_card', [ service.card.id, card_entities, 'es' ] );

    }



    /**
     * Handle card values loaded callback
     *
     * @param {Array} card_values
     * @private
     */
    function _save_card_data( card_values )
    {
      return new Promise(function(resolve, reject) {
        // Process panels to save their fields and values in same object
        var panels = [];
        var value;
        service.card.panels.forEach( function( panel )
        {
          panel.fields = [];

          service.card.fields.forEach( function( field )
          {
            if( field.panel_id === panel.id )
            {
              for (value in card_values)
              {
                value = parseInt(value);
                if( field.library_field_id === card_values[value].card_library_field.id )
                {
                  field.value = card_values[value];
                }
              };

              panel.fields.push( field );
            }
          });
          panels.push( panel );
        });
        service.card.panels = panels;

        if( service.card.panels )
        {
          resolve();
          return;
        }
        else
        {
          reject();
          return;
        }
      });
    }



    /**
     * Handle load profile service error
     *
     * @param {Object} error
     * @private
     */
    function _profile_service_error( error )
    {
      ClientLogger.info( 'Error loading profile service', error );
      reject( error );
    }



    var service = {
      init_consultant_profile: init_consultant_profile,
      card: null,
      consultation: null
    };

    return service;

  }

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation_gallery' ).controller( 'phemium.consultation_gallery.controllers.Gallery', Controller );

  function Controller
  (
    $filter,
    $stateParams,
    Consultation,
    $state,
    Utils,
    ConsultationService,
    $window,
    ConsultationResourcesService,
    $scope
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * Consultation
     *
     * @var {Object}
     */
    vm.consultation = null;


    /**
     * Consultation resources
     *
     * @var {Array}
     */
    vm.resources = [];


    /**
     * Current resource
     *
     * @var {Object}
     */
    vm.current_resource = null;


    /**
     * Current resource position
     *
     * @var {Number}
     */
    vm.current_resource_position = 0;



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      vm.consultation = $stateParams.consultation;
      vm.resources = ConsultationResourcesService.resources;
    };

    /**
     * On click resource in gallery
     *
     * @var {Object}
     */
    vm.on_resource_click = function( resource )
    {
        //***********
        // Go to slide
        //***********
        $state.go( 'consultation.consultation_slides',
        {
          resource_id: resource.resource_id,
          consultation: vm.consultation,
        });
    };



    /**
     * Show more resources
     */
    vm.show_more_resources = function()
    {
      vm.consultation.load_items()
      .then( function( list_result_consultation_items )
      {
        vm.resources = ConsultationResourcesService.resources;
      });
      $scope.$broadcast( 'scroll.refreshComplete' );
    };




    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation_gallery' ).controller( 'phemium.consultation_gallery.controllers.Slides', Controller );

  function Controller
  (
    $window,
    $filter,
    $stateParams,
    $state,
    UtilsService,
    ConsultationResourcesService,
    $scope
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * Consultation
     *
     * @var {Object}
     */
    vm.consultation_model = {};


    /**
     * Consultation resources
     *
     * @var {Array}
     */
    vm.resources = [];


    /**
     * Current resource
     *
     * @var {Object}
     */
    vm.current_resource = null;


    /**
     * Current resource position
     *
     * @var {Number}
     */
    vm.current_resource_position = 0;


    /**
     * A resource is loading or not
     *
     * @var {Boolean}
     */
    vm.loading = true;


    /**
     * A resource is downloading or not
     *
     * @var {Boolean}
     */
    vm.downloading_resource = false;


    /**
     * Proxy variable to be able to use it in HTML.
     * It always be equal to UtilsService.platform
     *
     * @type {Boolean}
     */
    vm.platform = UtilsService.platform;



    /**
     * Position of resource showed in slide
     *
     * @var {Number}
     */
    vm.position = null;



    /**
     * Downloading file status
     *
     * @var {Number}
     */
    $scope.loadingStatus = 0;



    /**
     * File size to download
     *
     * @var {Number}
     */
    $scope.loadingTotal = null;



    /**
     * Loading status of slide
     *
     * @var {Number}
     */
    vm.loading_slide = true;



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      vm.resource_id = $stateParams.resource_id;
      vm.consultation_model = $stateParams.consultation;
      vm.resources = ConsultationResourcesService.resources;
      vm._load_current_resource();
    };



    /**
     * Go to next slide
     */
    vm.next_slide = function()
    {
      vm.position++;
      vm.current_resource = vm.resources[ vm.position ];
      show_slide();
    };



    /**
     * Go to previous slide
     */
    vm.previous_slide = function()
    {
      vm.position--;
      vm.current_resource = vm.resources[ vm.position ];
      show_slide();
    };



    /**
     * Go to selected slide
     */
    vm.go_to_slide = function( new_position )
    {
      vm.position = new_position;
      vm.current_resource = vm.resources[ vm.position ];
      show_slide();
    };

    /**
     * Cancel download or play video if resource is downloaded
     */
    vm.do_resource_action = function()
    {
      if( vm.downloading_resource )
      {
        vm.cancel_download();
      }
      else{
        vm.play_file();
      }
    };



    /**
     * Play video
     */
    vm.play_file = function()
    {
      //*********
      // Browser
      // ********
      if( vm.platform == "browser" )
      {
        if( vm.current_resource.type === 'pdf' || vm.current_resource.type === 'excel'
          || vm.current_resource.type === 'word' || vm.current_resource.type === 'unknown' )
        {
          window.open( vm.current_resource.url, '_blank' );
        }
      }
      //*********
      // App
      // ********
      else
      {
        if( !vm.current_resource.local_path )
        {
          return;
        }
        else if( vm.current_resource.type !== 'video' ||  UtilsService.platform.toLowerCase() === 'ios' )
        {
          $window.FileViewerPlugin.view( { url: decodeURI( vm.current_resource.local_path ), action: 'android.intent.action.VIEW' }, function(){}, function(){} );
        }
        // For Android better to use cordova-plugin-videoplayer to play videos
        else
        {
          VideoPlayer.play( decodeURI( vm.current_resource.local_path ) );
        }
      }
    };



    /**
     * Method to download current resource
     */
    vm.download_resource = function()
    {
      ConsultationResourcesService.download_and_save_resource( vm.current_resource );
    };



    /**
     * Load resource to show
     *
     * @private
     */
    vm._load_current_resource = function()
    {
      vm.current_resource = $filter('filter')( vm.resources, { resource_id: vm.resource_id })[0];

      vm.position = vm.resources.map( function( resource )
      {
        return resource.resource_id;
      }
      ).indexOf( vm.resource_id );

      show_slide();
      vm.loading_slide = false;
    };



    /**
     * Check if resource is downloaded
     *
     * @private
     */
    function show_slide()
    {
      // Only on Native. If browser, do nothing
      if( vm.platform != "browser" )
      {
        // ***************
        // If is new resource, download it
        // ***************
        if( !vm.current_resource.local_path )
        {
          // Show downloading resource
          vm.downloading_resource = true;

          // Callback when download is completed
          var callback_download_success = function()
          {
            vm.downloading_resource = false;
          };

          // Download resource
          ConsultationResourcesService.download_and_save_resource( vm.current_resource, callback_download_success );
          ConsultationResourcesService.fileTransfer.onprogress = function( progressEvent )
          {
            if (progressEvent.lengthComputable)
            {
              $scope.loadingStatus = progressEvent.loaded;
              $scope.loadingTotal = progressEvent.total;
              $scope.$apply();
            }
          };
        }

        // ***************
        // when a resource has already been downloaded
        // ***************
        else
        {
          $scope.loadingStatus = 100;
          $scope.loadingTotal = 100;
        }
      }
    }



    /**
     * Go to timeline
     */
    vm.go_to_timeline = function()
    {
      $state.go( 'consultation.consultation_home', { consultation: vm.consultation_model } );
    };



    /**
     * Cancel download
     */
    vm.cancel_download = function()
    {
      ConsultationResourcesService.abort_download();
      vm.downloading_resource = false;
    };


    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation_gallery' ).directive( 'imageonload', ImageOnload );

  /**
   * Directive to fire events when image load.
   *
   * @returns {object} directive
   */
  function ImageOnload()
  {
    return {
      restrict: 'A',
      link: function( scope, element, attrs )
      {
        element.bind( 'load', function()
        {
          scope.$apply( attrs.imageonload );
        });
      }
    };
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemActionRequest' ,
  {
    templateUrl: 'consultation/views/items/item_type_action_request.tpl.html',
    controller: [ '$translate', Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller
  (
    $translate
  )
  {

    var self = this;
  

    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self._set_status_text();
    };



    /**
     * Set proposal status text 
     *
     * @private
     */
    self._set_status_text = function()
    {
      switch( self.item.data.status ) 
      {
        case 1: // Open    
          self.status_css_class = "phe-open";                    
          break;
        case 2: // Confirmed
          self.status_css_class = "phe-confirmed";          
          break;
        case 4: // Cancelled
          self.status_css_class = "phe-cancelled";   
          break;
        case 5: // Expired
          self.status_css_class = "phe-expired";                       
          break;
        case 6: // Done
          self.status_css_class = "phe-done";                       
          break;
        default:
          self.status_css_class = "";       
          break;
      }
    };

    self._constructor();
 

  };

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemAppointmentRequest' ,
  {
    templateUrl: 'consultation/views/items/item_type_appointment_request.tpl.html',
    controller: Controller,
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller
  (
    $translate,
    $rootScope
  )
  {

    var self = this;
  

    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self._set_status_text();
    };

    /**
     * Open Appointment Request
     */
    self.open_appointment_request = function ()
    {
      //If status is open
      if( self.item.data.status === 1 )
      {
        $rootScope.$emit('open_appointment_request', self.item );
      }
    };

    /**
     * Set proposal status text 
     *
     * @private
     */
    self._set_status_text = function()
    {
      switch( self.item.data.status ) 
      {
        case 1: // Open    
          self.status_css_class = "phe-open";                    
          break;
        case 2: // Confirmed
          self.status_css_class = "phe-confirmed";          
          break;
        case 4: // Cancelled
          self.status_css_class = "phe-cancelled";   
          break;
        case 5: // Expired
          self.status_css_class = "phe-expired";                       
          break;
        case 6: // Done
          self.status_css_class = "phe-done";                       
          break;
        default:
          self.status_css_class = "";       
          break;
      }
    };

    self._constructor();
    

  };

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemAppointment' ,
  {
    templateUrl: 'consultation/views/items/item_type_appointment.tpl.html',
    controller: [ '$translate', Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller
  (
    $translate
  )
  {

    var self = this;
  

    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self._set_status_text();
    };



    /**
     * Set proposal status text 
     *
     * @private
     */
    self._set_status_text = function()
    {
      switch( self.item.data.status ) 
      {
        case 1: // Open    
          self.status_css_class = "phe-open";                    
          break;
        case 2: // Confirmed
          self.status_css_class = "phe-confirmed";          
          break;
        case 4: // Cancelled
          self.status_css_class = "phe-cancelled";   
          break;
        case 5: // Expired
          self.status_css_class = "phe-expired";                       
          break;
        case 6: // Done
          self.status_css_class = "phe-done";                       
          break;
        default:
          self.status_css_class = "";       
          break;
      }
    };

    self._constructor();
 

  };

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemCall' ,
  {
    templateUrl: 'consultation/views/items/item_type_call.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();


(function() 
{ 
  'use strict'; 
 
  angular.module( 'app.consultation' ).component( 'pheConsultationCancelledConsultation', 
  { 
    templateUrl: 'consultation/views/items/item_cancelled_consultation.tpl.html', 
    controller: [ Controller ], 
    controllerAs: 'ctrl', 
    bindings: 
    { 
      item: '<' 
    } 
  }); 
 
  function Controller() 
  { 
    var self = this; 
 
 
 
    /** 
     * Constructor 
     * 
     * @private 
     */ 
    self._constructor = function() 
    { 
    }; 
 
     
 
    self._constructor(); 
  } 
 
})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemCardChanges' ,
  {
    templateUrl: 'consultation/views/items/item_type_card_changes.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemClosedConsultation',
  {
    templateUrl: 'consultation/views/items/item_type_closed_consultation.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemConsultationShared' ,
  {
    templateUrl: 'consultation/views/items/item_type_consultation_shared.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemFieldAnswer' ,
  {
    templateUrl: 'consultation/views/items/item_type_field_answer.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemFile' ,
  {
    templateUrl: 'consultation/views/items/item_type_file.tpl.html',
    controller: Controller,
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<',
      consultation: '<',
      platform: '@'
    }
  });

  function Controller
  (
    $rootScope,
    $translate,
    $filter,
    $state,
    ClientLogger,
    NotificationService,
    Utils,
    MediaUploader,
    NetworkService,
    UtilsService,
    $scope
  )
  {
    var self = this;


    /**
     * Proxy variable to be able to use it in HTML.
     * It always be equal to UtilsService.platform
     *
     * @type {Boolean}
     */
    self.platform = UtilsService.platform;


    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self.item_ui = self.item;
      self.data = self._get_data();
      self._prepare_events();
      self.compact_layout_mode = self._check_compact_display();
    };



    /**
     * Prepares events
     *
     * @private
     */
    self._prepare_events = function()
    {
      $rootScope.$on( 'MediaUploader:file_upload_progress:' + self.item_ui.id , self._on_file_upload_progress );

    };



    /**
     * Returns template data
     *
     * @return {Object}
     * @private
     */
    self._get_data = function()
    {
      return {
        is_from_system: self.item_ui.custom.is_from_system,
        is_from_consultant: self.item_ui.custom.is_from_consultant,
        creation_timestamp: self.item_ui.data.creation_timestamp,
        status_icon: self.item_ui.custom.status_icon,
        message: self.item_ui.data.message,
        resources: self.item_ui.data.data.resources.map( function( id_value, index )
        {
          var is_inbox = id_value.id.indexOf( 'inbox:' ) > -1;
          var resource = is_inbox ? null : self.item_ui.data.data.resources_expanded[ index ];
          var type = resource && resource.mime_type && Utils.get_type_from_mime( resource.mime_type );
          var name =  self.item_ui.data.data.resources[ index ].value;
          var size = resource ? ( resource.size / ( 1024 * 1024) ).toFixed(2) : null;
          var validation_status = ( !is_inbox && self.item_ui.data.data.file_validations && self.item_ui.data.data.file_validations.length > 0 ) ? self.item_ui.data.data.file_validations[ index ].validation_status : '';

          var icon_css_by_type =
          {
            pdf: 'icon-pdf',
            video: 'icon-video',
            excel: 'icon-excel',
            word: 'icon-word'
          };

          var watermark_type = null; // download, loupe, uploading, retry

          if( is_inbox )
          {
            var mediafile_uuid = id_value.id.split( 'inbox:' )[1];
            var queue_file = MediaUploader.get_pending_upload( mediafile_uuid );
            
            if( !queue_file || queue_file.status === 'error' )
            {
              watermark_type = 'retry';
            }
            else
            {
              watermark_type = 'uploading';
            }
          }
          else if( type == "video" )
          {
            watermark_type = 'play';
          }
          else
          {
            // show_button_download: false, // ng-if="resource.type == 'pdf' && !resource.local_path && !resource.downloading && ctrl.item_ui.custom.upload_status != 3 && $root.platform != 'browser'"
            // show_button_loupe: false, // resource.type == 'pdf' && resource.local_path && ctrl.item_ui.custom.upload_status != 3

            watermark_type = 'loupe';
          }

          return {
            type: type,
            icon_css_class: icon_css_by_type[ type ] || '',
            thumbnail: (resource ? self.get_thumbnail(resource) : window.settings.theme_path + '/img/no-preview.jpg'),
            // thumbnail: ( resource && resource.previews_expanded.length > 0 && resource.previews_expanded[1] ? resource.previews_expanded[1].url : window.settings.theme_path + '/img/no-preview.jpg' ),
            watermark_type: watermark_type,
            progress_percent: 0,
            validation_status: validation_status,
            queue_file: queue_file || null,
            name: name,
            size: size
          };
        })
      }
    };

    self.get_thumbnail = function(resource){
      if(resource.previews_expanded.length > 0 )
      {
        return resource.previews_expanded[1].url;
      }
      return resource.resource_url;
    }



    /**
     * Resource click handler
     *
     * @param {Number} index
     */
    self.on_resource_click = function( index )
    {
      ClientLogger.info( 'Resource click', self.item_ui );

      var resource = $filter( 'filter' )( self.item_ui.custom.resources, { index: index } )[0];

      // Browser platform
      if( UtilsService.platform === 'browser' )
      {
        $state.go( 'consultation.consultation_slides', { resource_id: resource.resource_id, consultation: self.consultation } );
        return;
      }

      // If the resource has not been uploaded correctly add to upload queue
      if( self.data.resources[index].queue_file !== null )
      {
        var phemium_drive_file_info =
        {
          target: 'consultation_file',
          consultation_id: self.consultation.id,
          consultation_item_id: self.item.id
        };

        MediaUploader.add_pending_upload( [ self.data.resources[index].queue_file.mediafile ], phemium_drive_file_info );

      }
      else if( resource.downloading )
      {
        return;
      }
      else if( resource.local_path == null )
      {
        if( !NetworkService.isOnline() )
        {
          NotificationService.show_alert(
          {
            css_class: 'phe-popup-error',
            title: '<i class="icon ion-alert-circled"></i>',
            subtitle: $translate.instant('download_error_title'),
            body: $translate.instant('download_error_title'),
            ok_text: $translate.instant('ok_text'),
            ok_type: 'button-positive',
            on_click: null
          });
        }
        else
        {
          $state.go( 'consultation.consultation_slides', { resource_id: resource.resource_id , consultation: self.consultation } );
        }
      }
      else
      {
        if( resource.type === 'pdf' || resource.type === 'excel' || resource.type === 'word' )
        {
          cordova.plugins.disusered.open
          (
            encodeURI( resource.local_path ),
            function(){ console.log( 'Success' ); },
            function( code )
            {
              if( code === 1 )
              {
                console.log( 'No file handler found' );
              }
              else
              {
                console.log( 'Undefined error' );
              }
            }
          );
        }
        else
        {
          $state.go( 'consultation.consultation_slides', { resource_id: resource.resource_id , consultation: self.consultation } );
        }
      }
    };



    /**
     * Deletes an item
     *
     * @param {number} item_id
     * @private
     */
    self._delete_item = function( item_id )
    {
      for( var i = 0; i < self.consultation.items.length; i++ )
      {
        var m_item = self.consultation.items[i];

        if( m_item.id == item_id )
        {
          self.is_uploading_file = false;
          phemiumApiConnector.request('consultations', 'delete_items', [ [ item_id ] ] ).then();
          self.consultation.items.splice( i, 1 );
        }
      }
    };



    /**
     * File upload progress event received
     *
     * @param {Object} event
     * @param {Object} progressEvent
     * @private
     */
    self._on_file_upload_progress = function( event, progressEvent )
    {

        $scope.loadingStatus = progressEvent.percent;
        $scope.loadingTotal = 100;
        $scope.$apply();


    };



    /**
     * Check if the layout is compact mode (one file type doc, excel or pdf)
     *
     * @private
     */
    self._check_compact_display = function ( )
    {
      if( self.data.resources.length > 1 )
      {
        return false;
      }
      else if( self.data.resources[0].type == 'word' || self.data.resources[0].type == 'excel' || self.data.resources[0].type == 'unknown' )
      {
        return true;
      }
      else
      {
        return false;
      }

  };



    self._constructor();
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemMessage' ,
  {
    templateUrl: 'consultation/views/items/item_type_message.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemProposal' ,
  {
    templateUrl: 'consultation/views/items/item_type_proposal.tpl.html',
    controller: [ 'NotificationService', '$translate', '$scope', Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<',
      consultation: '<'
    }
  });

  function Controller
  (
    NotificationService,
    $translate,
    $scope
  )
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self._set_status_text();
    };



    /**
     * Confirm proposal
     */
    self.confirm_proposal = function()
    {
      self.item.custom.processing = true;
      self.consultation
        .confirm_proposal( self.item.data.id )
        .then()
        .catch( self._show_error );
    };



    /**
     * Reject proposal
     */
    self.reject_proposal = function()
    {
       self.item.custom.processing = true;
       self.consultation
         .reject_proposal( self.item.data.id )
        .then()
        .catch( self._show_error );
    };



    /**
     * Show api call error
     *
     * @param {Object} error
     * @private
     */
    self._show_error = function( error )
    {
      var message = '';

      if( error.code == 1000 )
      {
        message = $translate.instant( 'proposal_modified' );
      }
      else if( error.code == 1001 )
      {
        message = $translate.instant( 'closed_consultation' );
      }
      else
      {
        message = error.message;
      }

      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-alert-circled"></i>',
        subtitle: $translate.instant('confirm_proposal_error'),
        body: message,
        ok_text: $translate.instant('back'),
        ok_type: 'button-assertive',
        on_click: null
      });
    };



    /**
     * Sets status text
     *
     * @private
     */
    self._set_status_text = function()
    {
      switch( self.item.data.status )
      {
        case 1: // Open, pending of approval
          self.status_text = $translate.instant( 'appointment_proposal' );
          self.status_css_color = '';
          self.status_css_class = 'phe-open';
          break;

        case 2: // Rejected
          self.status_text =  $translate.instant( 'proposal_rejected' );
          self.status_css_color = 'phe-red';
          self.status_css_class = 'phe-rejected';
          break;

        case 3: // Accepted. An appointment has been created
          self.status_text =  $translate.instant( 'proposal_accepted' );
          self.status_css_color = 'phe-green';
          self.status_css_class = 'phe-accepted';
          break;

        case 4: // Expired, not accepted before ini timestamp
          self.status_text =  $translate.instant( 'proposal_expired' );
          self.status_css_color = 'phe-red';
          self.status_css_class = 'phe-expired';
          break;

        case 5: // Cancelled
          self.status_text =  $translate.instant( 'proposal_cancelled' );
          self.status_css_color = 'phe-red';
          self.status_css_class = 'phe-cancelled';
          break;

        default:
          self.status_text = '';
          self.status_css_color = '';
          self.status_css_class = '';
          break;
      }
    };



    self._constructor();

    // Watch changes in item.data.status to calculate the new css classes
    $scope.$watch( function()
    {
      return self.item.data.status;
    },function( current, original )
    {
      self._set_status_text();
    });
  }

})();

(function ()
{
    'use strict';

    angular.module ('app.consultation').component ('pheConsultationItemFieldQuestion',
    {
        templateUrl: 'consultation/views/items/item_type_field_question.tpl.html',
        controller: Controller,
        controllerAs: 'ctrl',
        bindings:
        {
            item: '<'
        }
    });


    function Controller
    (
      $scope
    )
    {
      var self = this;



      /**
       * Constructor
       *
       * @private
       */
      self._constructor = function()
      {
        // If the library_field does not have a custom label, overwrite with default label
        if( !self.item.data.data.labels[0] )
        {
          self.item.data.data.labels[0] =
          {
            value: self.item.data.data.card_library_field.labels[0].value
          }

        }
      };


      /**
       * Open field question
       *
       * @param {object} item_ui
       */

      self.open_question = function()
      {
        // Send an event to open question component (consultation_home listen)
        $scope.$emit( 'item_field_question:open_question', self.item );
      };

      self._constructor();
    }

})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemQuestion' ,
  {
    templateUrl: 'consultation/views/items/item_type_question.tpl.html',
    controller: Controller,
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller
  (
    $rootScope,
    $ionicScrollDelegate
  )
  {
    var self = this;

    self.await_for_user_action = false;
    self.loading_processing_answer = false;
    self.pending_answer = true;


    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      // If is new question, show loading
      if( self.item.custom.is_new_item )
      {
        _show_processing_answer();
      }
      else
      {
        if(self.item.data.status === 1)
        {
          self.pending_answer = false;
        }
        $rootScope.$emit( 'item_type_question:open_question_component' );
      }

      // If the next component to show is full screen, await for user action (press button)
      self.await_for_user_action = _next_question_full_screen();
    };



    /**
     * Open question component when the user press the answer button
     *
     */
    self.open_question_component = function()
    {
      $rootScope.$emit( 'item_type_question:open_question_component' );
    }



    /**
     * Show dialog question loading
     *
     * @private
     */
    function _show_processing_answer()
    {
      self.loading_processing_answer = true;
      setTimeout( function()
      {
        self.loading_processing_answer = false;
        if( self.await_for_user_action === false )
        {
          $rootScope.$emit( 'item_type_question:open_question_component' );
        }
        timeline_scroll_to_bottom();
      }, 600);
    }



    /**
     * Returns true if the answer dialog text length is large (50)
     *
     * @private
     */
    function _next_question_full_screen()
    {
      // List
      if( self.item.data.data.field.type === "LIST" )
      {
        return true;
      }
      // Remnote List
      else if( self.item.data.data.field.type === "REMOTE_LIST" )
      {
        return true;
      }
      // Redio
      else if( self.item.data.data.field.type === "RADIO" )
      {
        if( _calculate_options_length() > 50 )
        {
          return true;
        }
        else
        {
          return false;
        }

      }
      // Other options
      else
      {
        return false;
      }
    }



    /**
     * Calculate question options length
     *
     * @private
     */
    function _calculate_options_length()
    {
      // Load question actions and options
      if( self.item.data.data.field.options && self.item.data.data.actions )
      {
        var question_items = self.item.data.data.field.options.concat( self.item.data.data.actions );
      }
      // Load question options
      else if( self.item.data.data.field.options )
      {
        var question_items = self.item.data.data.field.options;
      }
      // Load question actions
      else
      {
        var question_items = self.item.data.data.actions;
      }
      var answer_length = 0;

      for( var i=0; i < question_items.length; i++)
      {
        if( question_items[i].labels )
        {
          answer_length += question_items[i].labels[0].value.length;
        }
        else
        {
          answer_length += question_items[i].texts[0].value.length;
        }
      }
      return answer_length;
    }



    /**
     * Scroll timeline
     *
     * @private
     */
    function timeline_scroll_to_bottom()
    {
      $ionicScrollDelegate.$getByHandle( 'timeline' ).scrollBottom();
    }


    self._constructor();

  }

})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemResponse' ,
  {
    templateUrl: 'consultation/views/items/item_type_response.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      console.log(self.item.data);
    };

    

    self._constructor();
  }

})();

(function () 
{
    'use strict';

    angular.module ('app.consultation').component ('pheConsultationItemStageChange', 
    {
        templateUrl: 'consultation/views/items/item_type_stage_change.tpl.html',
        controller: [Controller],
        controllerAs: 'ctrl',
        bindings:
        {
            item: '<'
        }
    });


    function Controller()
    {
      var self = this;
  
  
  
      /**
       * Constructor
       *
       * @private
       */
      self._constructor = function()
      {
      };
  
      self._constructor();
    }

})();
(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheConsultationItemWaitingRoom' ,
  {
    templateUrl: 'consultation/views/items/item_type_waiting_room_status.tpl.html',
    controller: [ Controller ],
    controllerAs: 'ctrl',
    bindings:
    {
      item: '<'
    }
  });

  function Controller()
  {
    var self = this;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };

    

    self._constructor();
  }

})();
(function ()
{
    'use strict';

    angular.module ('app.consultation').component ('pheConsultationItemWebRequest',
    {
      templateUrl: 'consultation/views/items/item_type_web_request.tpl.html',
      controller: Controller,
      controllerAs: 'ctrl',
      bindings:
      {
          item: '<'
      }
    });


    function Controller
    (
      PostMessage,
      $rootScope,
      Settings
    )
    {
      var self = this;

      /**
       * Constructor
       *
       * @private
       */
      self._constructor = function()
      {
        this.web_request = {
          url: this.item.data.data.url,
          title: typeof this.item.data.data.title ===  "string" ? this.item.data.data.title : this.item.data.data.url,
          image: typeof this.item.data.data.image ===  "string" ? this.item.data.data.image : "",
          price: typeof  this.item.data.data.price ===  "string" ? this.item.data.data.price : "",
          description: typeof this.item.data.data.description ===  "string" ? this.item.data.data.description + "..." : "",
        }
      };



      /**
       * Opens url
       *
       */
      self.open_url = function()
      {
        // Open web request in browsers
        if( Settings.params.open_urls_target !== 'fsw' )
        {
          var message = {
            action: "open_url",
            url: this.web_request.url
          }
          PostMessage.open_url( message );
        }
        else
        {
          //TODO
          $rootScope.$emit('open_url', this.web_request.url, this.item );
        }
      };
      self._constructor();
    }
})();
(function () {
  'use strict';

  angular.module('app.consultation').component('questionAppointment',
  {
    templateUrl: 'consultation/views/questions/question-appointment.html',
    controller: QuestionAppointmentController,
    controllerAs: 'ctrl',
    bindings: {
      field: "<",
      close: "<",
      consultation: "<",
    }
  });

  function QuestionAppointmentController(
    $rootScope,
    NotificationService,
    DialogService
  )
  {
    var self = this;

    /**
     * Initialize method
     * @private
     */
    self._constructor = function()
    {
      DialogService.consultation = self.consultation;
    };



    /**
     * Close question div
     */
    self.close_question = function()
    {
      self.close( "dialog_component" );
    };



    /**
     * Open Appointment Request
     */
    self.open_appointment_request = function ()
    {
      $rootScope.$emit('open_appointment_request', self.field );
    };



    /**
     * Function called to save response
     *
     * @param {object} item_response
     */
    this.save_data = function ( item_response )
    {
      self.close( "dialog_component" );

      DialogService.save_data( item_response );
    }



    /**
     * Gets the value inside an action
     *
     * @param {Array} data_actions
     * @param {String} key
     */
    this.showActionValue = function (data_actions, key)
    {
      return DialogService.showActionValue ( data_actions, key );
    };

    self._constructor();
  }
})();

(function () {
  'use strict';

  angular.module('app.consultation').component('questionButtons',
  {
    templateUrl: 'consultation/views/questions/question-buttons.html',
    controller: QuestionButtonsController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
    }
  });


  function QuestionButtonsController( phemiumApiConnector, $timeout, NotificationService )
  {
    var self = this;
    self.color_slider_bar = {};
    self.color_slider_bar.value = null;
    self.animations_leave_page = null;



    /**
     * Initialize method
     *
     * @private
     */
    self._constructor = function()
    {
      self.question = {};
      self.question.options = [];
      self.question_selected_value = null;

      for ( var i = 0; i < self.field.options.length; i++ )
      {
        self.question.options[i] = self.field.options[i].labels[0].value;
      }
    }



    // ******************************
    // Component methods
    // ******************************

    /**
    * Handle set question value
    *
    */
    self.question_set_value = function (value)
    {
      self.question_selected_value = value;
    };



    /**
     * Handle save action. Trigger animations
     *
     */
    self.save_question = function ()
    {
      // 1. Hide current elements
      self.animations_leave_page = 'step1';
      setTimeout( function()
      {
        // 2. Show confirmation elements
        self.animations_leave_page = 'step2';
        setTimeout( function()
        {
          // 3. Transition to new page
          self.animations_leave_page = 'step3';
          setTimeout( function()
          {
            // 4. End animations
            self.animations_leave_page = null;
            _save_data();
          }, 1000);
        }, 400);
      }, 300);
    };



    /**
    * Save field data
    *
    * @private
    */
    var _save_data = function()
    {
      if ( self.field.question_context == "single_question" )
      {
        self.consultation.send_field_answer( self.field, self.question_selected_value )
        .then( self.close( "question_component" ), _save_data_error );
      }
      else
      {
        self.answer( self.question_selected_value );
      }
    };



    /**
     * Error handling
     *
     * @private
     */
    var _save_data_error = function()
    {
      self.close( "question_component" );
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-outline phe-red"></i>',
        subtitle: 'Error',
        body: 'No se ha podido guardar los datos',
        ok_text: 'ok',
        ok_type: 'button-positive',
        on_click: null
      });
    };

    self._constructor();

  }

})();


(function () {
  'use strict';

  angular.module('app.consultation').component('questionList',
  {
    templateUrl: 'consultation/views/questions/question-list.html',
    controller: QuestionListController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      close: "<"
    }
  });

  function QuestionListController(
    DialogService
  )
  {
    var self = this;

    /**
     * Initialize method
     * @private
     */
    self._constructor = function()
    {
      //Dialg factory will need consultation when save data
      DialogService.consultation = self.consultation;
      self.show_list = false;
      self.selected = {};
    };



    // ******************************
    // Component methods
    // ******************************


    /**
     * Method called everytime an n item from list is selected
     * @param {Object} item
     */
    self.selectListOption = function( item )
    {
      self.selected_item = item;
    }



    /**
     * Method called to save selected item
     */
    self.save_list_item = function()
    {
      this.save_data( self.selected_item );
    }



    /**
     * Show action value
     * @param {Array} data_actions
     * @param {String} key
     * @public
     * @returns {String}
     */
    this.showActionValue = function ( data_actions, key )
    {
      return DialogService.showActionValue ( data_actions, key );
    };



    /**
     * showOptionValue
     * @param {object} data_options
     * @public
     */
    this.showOptionValue = function ( data_options )
    {
      return DialogService.showOptionValue( data_options );
    };



    /**
     * Save response
     *
     * @param {Object} item_response
     * @param {String} text
     * @param {String} type_element
     */
    this.save_data = function ( item_response )
    {
      self.close();
      DialogService.save_data( item_response );
    }


    self._constructor();

  }
})();

(function () {
  'use strict';

  angular.module( 'app.consultation' ).component( 'questionNumber' ,
   {
    templateUrl: 'consultation/views/questions/question-number.html',
    controller:  QuestionNumberController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
      }
  });

  function QuestionNumberController
  (
    $timeout,
    NotificationService
  )
  {
    var self = this;
    self.animations_leave_page = null;

    /**
      * Initialize method
      *
      * @private
      */
    self._constructor = function()
    {
      self.question = {};
      self.question_value = "";
      self.animations_leave_page = null;
      self.saving_question = null;
      // Process Data to Display
      self.question.question = self.field.labels[0].value;
      self.question.display_mode = self.field.display_mode; // HARDCODED. Adaptar al nombre de variable de la api
    }



    /**
    * Handle save action. Trigger animations
    *
    */
   self.save_question = function()
   {
      if( !self.saving_question )
      {
        self.saving_question = true;
        _save_data();
      }
   };



    /**
    * Save field data
    *
    * @private
    */
   var _save_data = function()
   {
     if( !self.question_value )
     {
      self.saving_question = false;
       return;
     }
     
     if( self.field.self )
     {
       // If question is not showed in card, call send_field answer
      if( self.field.self.field.question_context == "single_question" )
      {
        self.consultation.send_field_answer( self.field, self.question_value )
          .then(
          self.close,
          _save_data_error
          );
      }
     }
     
     // If question is a field of a card, save selected value in a card_viewer through callback
     else if( self.field.question_context == "card" )
     {
       self.animations_leave_page = true;
       $timeout( function()
       {
         self.saving_question = false;
         self.animations_leave_page = null;
         self.answer( self.question_value );
         self.question_value = "";
       }, 600 );
     }
     else
     {
      self.close( "question_component" );
      DialogService.save_data( self.question_value );
     }
   };

    /**
     * Error handling
     *
     * @private
     */
    function _save_data_error()
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-outline phe-red"></i>',
        subtitle: 'Error',
        body: 'No se ha podido guardar los datos',
        ok_text: 'ok',
        ok_type: 'button-positive',
        on_click: null
      });
    };

    self._constructor();

  }

})();

(function () {
  'use strict';

  angular.module('app.consultation').component('questionRadioList',
  {
    templateUrl: 'consultation/views/questions/question-radio-list.html',
    controller: QuestionRadioListController,
    controllerAs: 'ctrl',
    bindings: {
      item: "<",
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
    }
  });

  function QuestionRadioListController(
    phemiumApiConnector,
    $timeout,
    NotificationService,
    $rootScope,
    DialogService
  )
  {
    var self = this;

    /**
     * Initialize method
     * @private
     */
    self._constructor = function()
    {
      //Dialg factory will need consultation when save data
      DialogService.consultation = self.consultation;

      self.show_list = false;
      self.status_answer = 'new';
      self.item_save = {};

    };


    self.open_list = function()
    {
      $rootScope.$emit( "open_list", self.item );
    }

    // ******************************
    // Component methods
    // ******************************

    /**
     * Close question div
     */
    self.close_question = function()
    {
      self.status_answer = 'sent';
      self.close( "dialog_component" );
    };


    /**
     * Show action value
     * @param {Array} data_actions
     * @param {String} key
     * @public
     * @returns {String}
     */
    this.showActionValue = function ( data_actions, key )
    {
      return DialogService.showActionValue ( data_actions, key );
    };



    /**
     * showOptionValue
     * @param {object} data_options
     * @public
     */
    this.showOptionValue = function ( data_options )
    {
      return DialogService.showOptionValue( data_options );
    };


    /**
     *
     * @param {object} item_response
     * @param {String} text
     * @param {String} type_element
     */
    this.save_data = function ( item_response, text, type_element )
    {
      self.close( "dialog_component" );
      DialogService.save_data(item_response );
    }

    self._constructor();

  }
})();

(function () {
  'use strict';

  angular.module('app.consultation').component('questionRadio',
  {
    templateUrl: 'consultation/views/questions/question-radio.html',
    controller: QuestionRadioController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      close: "<",
    }
  });

  function QuestionRadioController(
    DialogService
  )
  {
    var self = this;

    /**
     * Initialize method
     * @private
     */
    self._constructor = function()
    {
      //Dialg factory will need consultation when save data
      DialogService.consultation = self.consultation;
      var field = self.field;
      self.status_answer = 'new';
      self.item_save = {};
    };

    /**
     * Close question div
     */
    self.close_question = function()
    {
      self.status_answer = 'sent';
      self.close( "dialog_component" );
    };



    /**
     * Show action value
     * @param {Array} data_actions
     * @param {String} key
     * @public
     * @returns {String}
     */
    this.showActionValue = function ( data_actions, key )
    {
      return DialogService.showActionValue ( data_actions, key );
    };



    /**
     * showOptionValue
     * @param {object} data_options
     * @public
     */
    this.showOptionValue = function ( data_options )
    {
      return DialogService.showOptionValue( data_options );
    };


    /**
     * Save response
     *
     * @param {object} item_response
     * @param {String} text
     * @param {String} type_element
     */
    this.save_data = function ( item_response )
    {
      self.close( "dialog_component" );
      DialogService.save_data( item_response );
    }



    self._constructor();

  }
})();

(function () {
  'use strict';

  angular.module('app.consultation').component('questionRating',
  {
    templateUrl: 'consultation/views/questions/question-rating.html',
    controller: QuestionRatingController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
    }
  });

  function QuestionRatingController( phemiumApiConnector, $timeout, NotificationService )
  {
    var self = this;

    /**
     * Initialize method
     * @private
     */
    self._constructor = function()
    {
      self.question = {};
      self.question.options = [];
      self.question_selected_value = null;
      self.status_answer = 'new';

      for  (var i = 0; i < self.field.options.length; i++ )
      {
        self.question.options[i] = self.field.options[i].labels[0].value;
      }
    };

    // ******************************
    // Component methods
    // ******************************

    /**
     * Handle save action
     *
     */
    self.question_set_value = function( value )
    {
      self.question_selected_value = value;
    };



    /**
     * Handle save action. Trigger animations
     *
     */
    self.save_question = function ()
    {
      if( !self.question_selected_value )
      {
        _animate_faces();
        return;
      }
      if( self.status_answer === 'new' || self.status_answer === 'error' )
      {
        self.status_answer = 'sending';
        _save_data();
      }
    };



    /**
     * Close question
     *
     */
    self.close_question = function()
    {
      self.status_answer = 'sent';
      self.close( "question_component" );
    };

   /**
    * Save field data
    *
    * @private
    */
    var _save_data = function()
    {
      if( self.field.question_context == "single_question" )
      {
        self.consultation.send_field_answer( self.field, self.question_selected_value )
        .then( self.close_question, _save_data_error );
      }
      else if( self.field.question_context == "card" )
      {
        self.answer( self.question_selected_value );
      }
      else if( self.field.question_context == "dialog" )
      {
        // TODO: CALL DIALOG SAVE VALUE CALL
      }
    };



    /**
    * Error handling
    *
    * @private
    */
    var _save_data_error = function()
    {
      self.status_answer = 'error';
      self.close( "question_component" );
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-outline phe-red"></i>',
        subtitle: 'Error',
        body: 'No se ha podido guardar los datos',
        ok_text: 'ok',
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Change variable to trigger animation
     *
     * @private
     */
    var _animate_faces = function()
    {
      self.animation_faces = true;
      setTimeout( function()
      {
        self.animation_faces = false;
      }, 400);
    }

    self._constructor();

  }

})();

(function () {
  'use strict';

  angular.module( 'app.consultation' ).component( 'questionSelect',
  {
    templateUrl: 'consultation/views/questions/question-select.html',
    controller: QuestionSelectController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
    }
  });

  function QuestionSelectController
  (
    $timeout,
    $scope

  )
  {
    var self = this;

    

    /**
     * Initialize method
     *
     * @private
     */
    self._constructor = function()
    {
      // Initialize parameters
      self.selected_item = null;
      self.selected = {};

      //Add and id for each item in select
      for( var i = 0; i < self.field.options.length; i++ )
      {
        self.field.options[i].id = i;
      }

      self.saving_question = null;
      self.color_slider_bar = {};
      self.color_slider_bar.value = null;
      self.bar_color = [];
      self.animations_leave_page = null;
    };


    /**
     * Method called everytime component changes
     * Used to set answer div height
     * TODO: Fix height logic with flexboxes
     */
    self.$onChanges = function(changesObj)
    {
      //Do it after first render
      setTimeout( function()
      {
        var select_div = document.getElementById("question-select-box");
        var question_div = document.getElementById("question-full-screen-question");

        // 230 is the sum height of static elements
        var select_height = window.innerHeight - 230 - question_div.clientHeight;

        select_div.style.height = select_height+"px";
      }, 1);
    }


    /**
     * Method called everytime an n item from list is selected
     * @param {Object} item
     */
    self.selectListOption = function( item )
    {
      self.selected_item = item;
    }

    
    // ******************************
    // Component methods
    // ******************************

    /**
    * Handle save action. Trigger animations
    *
    */
    self.save_question = function()
    {
      if( !self.saving_question )
      {
        self.saving_question = true;
        _save_data();
      }
    };



    /**
    * Save field data
    *
    * @private
    */
    var _save_data = function()
    {
      // If question is a field of a card, save selected value in a card_viewer through callback
      if( self.field.question_context == "card" )
      {
        self.animations_leave_page = true;
        $timeout( function()
        {
          self.saving_question = false;
          self.animations_leave_page = null;
          self.answer( self.selected_item.value );
          self.selected_item = null;
        }, 600 );
      }
    };


    // **********
    // Animations
    // **********
    // Watch value selected by user to trigger animation
    $scope.$watch( function()
    {
      return self.color_slider_bar.value;
    },function( current, original )
    {
      self.numberAnimate = true
      $timeout( function()
      {
        self.numberAnimate = false
      }, 400 );
    });

    self._constructor();

  }

})();

(function () {
  'use strict';

  angular.module( 'app.consultation' ).component( 'questionSlider',
  {
    templateUrl: 'consultation/views/questions/question-slider.html',
    controller: QuestionSliderController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
    }
  });

  function QuestionSliderController
  (
    $timeout,
    NotificationService,
    $scope,
    $q
  )
  {
    var self = this;



    /**
     * Initialize method
     *
     * @private
     */
    self._constructor = function()
    {
      // Initialize parameters
      self.saving_question = null;
      self.color_slider_bar = {};
      self.color_slider_bar.value = null;
      self.bar_color = [];
      self.animations_leave_page = null;

      // Configure slider
      _set_slider_params()
      _configure_slider();
    };

    /**
     * Load slider options and colors
     * @private
     */
    var _set_slider_params = function()
    {
      self.question = {};
      self.question.options = [];

      // Load options
      if ( self.field.data.options )
      {
        for ( var i = 0; i < self.field.options.length; i++ )
        {
          self.question.options[i] = self.field.options[i].labels[0].value;
        }
      }

      // Load slider colors
      if ( self.field.data.color_ranges )
      {
        self.bar_color = [];
        for ( var i = 0; i < self.field.data.color_ranges.length; i++ )
        {
          var color_range =
            {
              value: self.field.data.color_ranges[i].values[self.field.data.color_ranges[i].values.length - 1],
              color: self.field.data.color_ranges[i].color
            };
          self.bar_color.push(color_range);
        }
      }
    };

    /**
    * Create slider configuration object
    * @private
    */
    var _configure_slider = function()
    {
      $timeout( function()
      {
        self.color_slider_bar =
        {
          value: 0,
          options:
          {
            floor: self.field.data.min_value,
            ceil: self.field.data.max_value,
            step: self.field.data.step,
            showSelectionBar: true,
            showTicksValues: self.field.data.show_values,
            getSelectionBarColor: function (value) {
              for ( var i = 0; i < self.bar_color.length; i++ )
              {
                if ( value <= self.bar_color[i].value )
                {
                  return self.bar_color[i].color;
                }
              }
            }
          }
        };
      }, 0 );

    };

    // ******************************
    // Component methods
    // ******************************

    /**
    * Handle save action. Trigger animations
    *
    */
    self.save_question = function()
    {
      if( !self.saving_question )
      {
        self.saving_question = true;
        _save_data();
      }
    };



    /**
    * Save field data
    *
    * @private
    */
    var _save_data = function()
    {
      // If question is not showed in card, call send_field answer
      if( self.field.question_context == "single_question" )
      {
        self.consultation.send_field_answer( self.field, self.color_slider_bar.value )
          .then(
          self.close,
          _save_data_error
          );
      }
      // If question is a field of a card, save selected value in a card_viewer through callback
      else if( self.field.question_context == "card" )
      {
        self.animations_leave_page = true;
        $timeout( function()
        {
          self.saving_question = false;
          self.animations_leave_page = null;
          self.answer( self.color_slider_bar.value );
          self.color_slider_bar.value = 0;
        }, 600 );
      }
    };


    /**
    * Error handling
    *
    * @private
    */
    var _save_data_error = function()
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-outline phe-red"></i>',
        subtitle: 'Error',
        body: 'No se ha podido guardar los datos',
        ok_text: 'ok',
        ok_type: 'button-positive',
        on_click: null
      });
    };


    // **********
    // Animations
    // **********
    // Watch value selected by user to trigger animation
    $scope.$watch( function()
    {
      return self.color_slider_bar.value;
    },function( current, original )
    {
      self.numberAnimate = true
      $timeout( function()
      {
        self.numberAnimate = false
      }, 400 );
    });

    self._constructor();

  }

})();


(function () {
  'use strict';

  angular.module( 'app.consultation' ).component( 'questionStatic' ,
   {
    templateUrl: 'consultation/views/questions/question-static.html',
    controller:  QuestionStaticController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
      }
  });

  function QuestionStaticController
  (
    $timeout
  )
  {
    var self = this;
    self.animations_leave_page = null;

    /**
      * Initialize method
      *
      * @private
      */
    self._constructor = function()
    {
      self.question = {};
      self.animations_leave_page = null;
      self.saving_question = null;
      // Process Data to Display
      self.question.question = self.field.labels[0].value;
      self.question.display_mode = self.field.display_mode; // HARDCODED. Adaptar al nombre de variable de la api
    }



    /**
     * Method called everytime component changes
     * Used to add styles on a html question
     */
    self.$onChanges = function(changesObj)
    {
      self.help = self.field.helps[0].value;
      var style = self.help.substring(self.help.indexOf("style>") -1 , self.help.indexOf("/style>"));
      if(style !== "")
      {
        var styleDOM = document.createElement('style');
        styleDOM.innerHTML = style;
        document.getElementsByTagName('head')[0].appendChild(styleDOM);
      }
    }


    /**
    * Handle save action. Trigger animations
    *
    */
   self.save_question = function()
   {
      if( !self.saving_question )
      {
        self.saving_question = true;

        $timeout( function()
       {
         self.help = "";
       }, 600 );

        _save_data();
      }
   };



    /**
    * Save field data
    *
    * @private
    */
   var _save_data = function()
   {
     
     
                
     // If question is a field of a card, save selected value in a card_viewer through callback
     if( self.field.question_context == "card" )
     {
       self.animations_leave_page = true;
       $timeout( function()
       {
         self.saving_question = false;
         self.animations_leave_page = null;
         self.answer( self.question_value );
       }, 600 );
     }
     else
     {
      self.close( "question_component" );
      DialogService.save_data( self.question_value );
     }
   };

    self._constructor();

  }

})();

(function () {
  'use strict';

  angular.module('app.consultation').component('questionTextDialog',
  {
    templateUrl: 'consultation/views/questions/question-text-dialog.html',
    controller: QuestionTextController,
    controllerAs: 'ctrl',
    bindings: {
      item: "<",
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
    }
  });

  function QuestionTextController(
    DialogService
  )
  {

    var self = this;

    /**
     * Initialize method
     * @private
     */
    self._constructor = function()
    {
      DialogService.consultation = self.consultation;

      self.question = {};
      self.item_save = {};
    };

    // ******************************
    // Component methods
    // ******************************

    /**
     * Close question div
     */
    self.close_question = function()
    {
      self.status_answer = 'sent';
      self.close( "question_component" );
    };



    /**
     * Show action value
     * @param {Array} data_actions
     * @param {String} key
     * @public
     * @returns {String}
     */
    self.showActionValue = function ( data_actions, key )
    {
      return DialogService.showActionValue ( data_actions, key );
    };



    /**
     * Save answer data
     *
     * @param {object} item_response
     * @param {String} text
     * @param {String} type_element
     */
    self.save_data = function ()
    {
      self.close( "question_component" );
      DialogService.save_data( self.item_response );
    }

    self._constructor();

  }
})();

(function () {
  'use strict';

  angular.module( 'app.consultation' ).component( 'questionText' ,
   {
    templateUrl: 'consultation/views/questions/question-text.html',
    controller:  QuestionTextController,
    controllerAs: 'ctrl',
    bindings: {
      consultation: "<",
      field: "<",
      answer: "<",
      close: "<"
      }
  });

  function QuestionTextController
  (
    $timeout,
    NotificationService
  )
  {
    var self = this;
    self.animations_leave_page = null;

    /**
      * Initialize method
      *
      * @private
      */
    self._constructor = function()
    {
      self.question = {};
      self.animations_leave_page = null;
      self.saving_question = null;
      // Process Data to Display
      self.question.question = self.field.labels[0].value;
      self.question.display_mode = self.field.display_mode; // HARDCODED. Adaptar al nombre de variable de la api
    }



    /**
    * Handle save action. Trigger animations
    *
    */
   self.save_question = function()
   {
      if( !self.saving_question )
      {
        self.saving_question = true;
        _save_data();
      }
   };



    /**
    * Save field data
    *
    * @private
    */
   var _save_data = function()
   {
     if( !self.question_value )
     {
       return;
     }
     
     if( self.field.self )
     {
       // If question is not showed in card, call send_field answer
      if( self.field.self.field.question_context == "single_question" )
      {
        self.consultation.send_field_answer( self.field, self.question_value )
          .then(
          self.close,
          _save_data_error
          );
      }
     }
     
     // If question is a field of a card, save selected value in a card_viewer through callback
     else if( self.field.question_context == "card" )
     {
       self.animations_leave_page = true;
       $timeout( function()
       {
         self.saving_question = false;
         self.animations_leave_page = null;
         self.answer( self.question_value );
         self.question_value = "";
       }, 600 );
     }
     else
     {
      self.close( "question_component" );
      DialogService.save_data( self.question_value );
     }
   };

    /**
     * Error handling
     *
     * @private
     */
    function _save_data_error()
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-outline phe-red"></i>',
        subtitle: 'Error',
        body: 'No se ha podido guardar los datos',
        ok_text: 'ok',
        ok_type: 'button-positive',
        on_click: null
      });
    };

    self._constructor();

  }

})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).component( 'pheTimeline',
  {
    templateUrl: 'consultation/views/timeline.tpl.html',
    controller: Controller,
    controllerAs: 'ctrl',
    bindings:
    {
      consultation: '<',
      openQuestionComponent: '<'
    }
  });

  function Controller
  (
    $rootScope,
    $filter,
    $ionicScrollDelegate,
    ConsultationItemType,
    Stages,
    Auth,
    $state,
    $scope,
    $timeout,
    UtilsService,
    SoundsService,
    ConsultationResourcesService
  )
  {
    var self = this;


    /**
     * Stores typing timeout promise
     *
     * @type {Promise}
     * @private
     */
    self._typing_timeout = null;



    /**
     * Stores whether the consultant is typing or not.
     * It's managed by faye received events.
     *
     * @type {Boolean}
     */
    self.consultant_typing = false;



    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
      self.ui_items = self.get_ui_items();
      self._check_chatbot();
      self._prepare_events();

      // @WORKAROUND: Due to SVG fix in iOS some height is not being well calculated on first rendering.
      // This scroll to bottom is used to ensure view will be properly displayed.
      if( $rootScope.platform === 'ios' )
      {
        scroll_to_bottom( 1000 );
      }
    };



    /**
     * Returns UI items
     *
     * @return {Array}
     */
    self.get_ui_items = function()
    {
      var ui_items_processed = [];
      ConsultationResourcesService.resources = [];
      var items_to_iterate = self.consultation.items.filter( function( item )
      {
        return !item.private;
      }).slice().reverse();

      items_to_iterate.map( function( item, index )
      {
        var previous_item = ( index > 0 ? items_to_iterate[ index - 1 ] : null );
        var next_item = ( index < items_to_iterate.length ? items_to_iterate[ index + 1 ] : null );
        item.is_new_item = false;
        var item_processed = self._process_item( previous_item, item, next_item );

        item_processed.order = item.id;
        ui_items_processed.push( item_processed );

        ui_items_processed.sort( UtilsService.items_sort );
      });

      return ui_items_processed;
    };



    /**
     * add_new_ui_item
     * @param {Object} item
     *
     */
    self.add_new_ui_item = function ( item )
    {
       // Check if the item already exists
      if ( typeof self.ui_items !== 'undefined' )
      {
        var new_item = $filter( 'getById' )( self.ui_items, item.id );

        if( new_item != null ){
          return;
        }
      }

      // Process item to get ui_item
      var previous_item = self.consultation.items[ 1 ];
      var previous_ui_item = self.ui_items[ self.ui_items.length-1 ];
      var next_item = null;
      item.is_new_item = true;
      var item_processed = self._process_item( previous_item, item, next_item );

      if( !item_processed.data.private )
      {
        // Update previous item
        // @TODO: Remove hardcoded condition -> previous_ui_item.data.type != 19
        if ( previous_ui_item &&
          item_processed.custom.item_from == previous_ui_item.custom.item_from &&
          previous_ui_item.data.type != 19 )
        {
          previous_ui_item.custom.show_consultant_avatar = false;
          previous_ui_item.custom.show_enduser_avatar = false;
        }

        self.ui_items.push(item_processed);
        self.ui_items.sort(UtilsService.items_sort);
      }
    };



    /**
     * Update item_ui
     * @param {Object} item
     *
     */
    self.update_ui_item = function ( item )
    {
      // Check if the item already exists
      var item_to_update;

      if( item.type === ConsultationItemType.DIALOG_ANSWER )
      {
        item_to_update = $filter( 'getByQuestionItemId' )( self.ui_items, item.data.question_item_id, true );

        if( item_to_update )
        {
          item_to_update.id = parseInt( item.id );
          item_to_update.data.id = item.id;
        }
      }
      else
      {
        item_to_update = $filter( 'getById' )( self.ui_items, item.id );
      }
      if( item_to_update == null )
      {
       return;
      }

      // If the item is a type file, process associated resources
      if( item.type == ConsultationItemType.FILE )
      {
        item_to_update.custom.resources = ConsultationResourcesService.get_processed_resources( item );
      }


      item_to_update.custom.status_icon = self._get_status_icon( item );

      var item_ui_updated =
      {
        id: item_to_update.id,
        data: item,
        custom: item_to_update.custom
      };

      // Calculate css classes
      item_ui_updated.custom.css_class = self._get_item_css_class( item_ui_updated );
      item_ui_updated.custom.css_bubble = self._get_item_css_bubble( item_ui_updated );

      // Save item
      item_ui_updated.order = item.id;
      self.ui_items[ self.ui_items.indexOf( item_to_update ) ] = item_ui_updated;
      self.ui_items.sort( UtilsService.items_sort );


    };



    /**
     * Add DialogService answer
     * @param {Object} answer
     *
     */
    self.add_dialog_answer = function ( answer )
    {
      var custom =
      {
        item_from: 'enduser',
        is_first_in_day: false,
        is_first_in_block: true,
        is_last_in_block: true,
        is_last: false,
        is_pressed: false,
        processing: false,
        is_from_system: false,
        is_from_consultant:  false,
        is_from_enduser: true,
        consultant: null,
        status_icon: 'ion-checkmark',
        show_consultant_avatar: false,
        show_enduser_avatar: true,
        css_class: 'phe-item-enduser'
      };

      // @TODO: ADD THE DIALOG ID TO BE ABLE TO UPDATE THIS ITEM WHEN THE ANSWER ARRIVES
      var data =
      {
        text: answer.data.text,
      };

      var item =
      {
        id: answer.data.dialog_item_id,
        type: 20,
        data: data,
        created_by_enduser_id: true,
        created_by_professional_id:null
      };

      var item_ui =
      {
        id: answer.data.dialog_item_id,
        data: item,
        custom: custom
      };

      item_ui.order = parseInt(answer.id) + 1;
      self.ui_items.push( item_ui );
      self.ui_items.sort( UtilsService.items_sort );
    };



    /**
     * Change ui_item status icon when it is read
     * @param {Object} item_ids
     *
     */
    self.read_ui_items = function ( item_ids )
    {
      self.ui_items.forEach( function ( item )
      {
        item.custom.status_icon = 'ion-android-done-all';
      });
    };



   /**
     * Process item, get ui item data
     *
     * @private
     */
    self._process_item = function( previous_item, item, next_item )
    {
      var consultant = ( item.created_by_professional_id ) ? $filter( 'getById' )( self.consultation.data.consultants, item.created_by_professional_id ) : null;
      var item_from = self._get_item_from( item );

      var show_consultant_avatar = false;

      // *************
      // Calculate first_in_block, last_in_block, avatar, first_in_day
      // *************
      var is_first_in_day = !previous_item || moment.unix( previous_item.creation_timestamp ).format( 'L' ) != moment.unix( item.creation_timestamp ).format( 'L' );

      if( item_from == 'consultant' )
      {
        var is_last_in_block = !next_item || next_item.created_by_professional_id != item.created_by_professional_id || next_item.type == 18 || next_item.created_by_professional_id === null;
        var show_consultant_avatar = is_last_in_block;
        var is_first_in_block =  is_first_in_day || !previous_item || ( previous_item.created_by_professional_id != item.created_by_professional_id );
      }
      else if( item_from == 'enduser' )
      {
        var is_last_in_block = !next_item || next_item.created_by_enduser_id != item.created_by_enduser_id || next_item.type == 18 ||  next_item.created_by_enduser_id === null || item.type === 20;
        var show_enduser_avatar = is_last_in_block;
        var is_first_in_block =  is_first_in_day || !previous_item ||  ( previous_item.created_by_enduser_id != item.created_by_enduser_id );

      }

      var is_last = ( next_item == null );

      // *************
      // Set custom data
      // *************
      var custom =
      {
        item_from: item_from,
        is_first_in_day: is_first_in_day,
        is_first_in_block: is_first_in_block,
        is_last_in_block: is_last_in_block,
        is_last: is_last,
        is_pressed: false,
        processing: false,
        is_from_system: item_from === 'system',
        is_from_consultant:  item_from === 'consultant',
        is_from_enduser: item_from === 'enduser',
        consultant: consultant,
        status_icon: self._get_status_icon( item ),
        show_consultant_avatar: show_consultant_avatar,
        show_enduser_avatar: show_enduser_avatar,
        is_new_item: item.is_new_item
      };

      if( item.type == ConsultationItemType.STAGE_CHANGE )
      {
        custom.stage = Stages.get_stage( item.data.stage.id );
      }

      if( item.type == ConsultationItemType.FILE )
      {
        custom.resources = ConsultationResourcesService.get_processed_resources( item );
      }


      // *************
      // Process field answer
      // *************
      if( item.type == ConsultationItemType.FIELD_ANSWER )
      {
        var field = item.data.field_question_item.data.card_library_field;

        if( field )
        {
          custom.field_type = field.type;
          custom.user_name = item.data.field_question_item.user_name;
          custom.value = item.data.value;
          custom.value_text = item.data.value;
          // If library_field does not have label, set default library_field label
          if( !item.data.field_question_item.data.labels[0] )
          {
            custom.question_text = item.data.field_question_item.data.card_library_field.labels[0].value;
          }
          else
          {
            custom.question_text = item.data.field_question_item.data.labels[0].value;
          }

          field.options.forEach( function( option )
          {
            if( option.value == item.data.value )
            {
              custom.value_text = option.labels[0].value;
            }
          });
        }
      }

      var item_ui =
      {
        id: item.id,
        data: item,
        custom: custom
      };

      item_ui.custom.css_class = self._get_item_css_class( item_ui );
      item_ui.custom.css_bubble = self._get_item_css_bubble( item_ui );

      item_ui.order = item.id;
      return item_ui;
    };



    /**
     * Checks if last timeline item is a dialog question
     * if it's true emits an event to show the dialog answer div
     */
    self._check_chatbot = function()
    {
      if( !self.ui_items )
      {
        return;
      }
      var last_ui_item = self.ui_items[self.ui_items.length-1];
      if( last_ui_item
        && last_ui_item.data.type ===  ConsultationItemType.DIALOG_QUESTION
        && last_ui_item.data.data.dialog_item_id )
      {
        $rootScope.$emit( 'open_chatbot_answer', last_ui_item );
      }
      else if( last_ui_item
        && last_ui_item.data.type ===  ConsultationItemType.DIALOG_ANSWER
        && last_ui_item.data.data.dialog_item_id )
      {
        // @TODO: Call chatbot service to process data before emit event to consultation_home
        $rootScope.$emit( 'open_chatbot_answer', last_ui_item );
      }
    };


    /**
     * Returns item from entity
     *
     * @param {Object} item
     * @return {String}
     * @private
     */
    self._get_item_from = function( item )
    {
      var system_types =
      [
        ConsultationItemType.CALL,
        ConsultationItemType.CONSULTATION_SHARED,
        ConsultationItemType.STAGE_CHANGE,
        ConsultationItemType.WAITING_ROOM,
        ConsultationItemType.CARD_CHANGES,
        ConsultationItemType.CLOSED_CONSULTATION,
        ConsultationItemType.CANCELLED_CONSULTATION,
        ConsultationItemType.PROPOSAL,
        ConsultationItemType.APPOINTMENT,
        ConsultationItemType.DIALOG_QUESTION,
        ConsultationItemType.WEB_REQUEST,
        ConsultationItemType.ACTION_REQUEST
      ];

      if( item.created_by_professional_id || item.type ===  ConsultationItemType.DIALOG_QUESTION  )
      {
        return 'consultant';
      }
      else if( (system_types.indexOf( item.type ) > -1) || (!item.created_by_professional_id && !item.created_by_enduser_id )
      )
      {
        return 'system';
      }
      return 'enduser';
    };



    /**
     * Returns item css class
     *
     * @param {Object} ui_item
     * @return {String}
     * @private
     */
    self._get_item_css_class = function( ui_item )
    {
      var css_classes = [];

      var from =
      {
        enduser: 'phe-item-enduser',
        consultant: 'phe-item-consultant',
        system: 'phe-item-system'
      };

      var types =
      {
        1: 'phe-item-type-message',
        2: 'phe-item-type-appointment-request',
        3: 'phe-item-type-proposal',
        4: 'phe-item-type-appointment',
        5: 'phe-item-type-call',
        6: 'phe-item-type-card-changes',
        7: 'phe-item-type-transfer',
        8: 'phe-item-type-payment-order',
        9: 'phe-item-type-stage-change',
        10: 'phe-item-type-consultation-shared',
        11: 'phe-item-type-logmein-invitation',
        12: 'phe-item-type-logmein-session',
        13: 'phe-item-type-ntr-invitation',
        14: 'phe-item-type-ntr-session',
        15: 'phe-item-type-card',
        16: 'phe-item-type-closed-consultation',
        17: 'phe-item-type-cancelled-consultation',
        18: 'phe-item-type-waiting-room-status',
        21: 'phe-item-type-rating-question',
        22: 'phe-item-type-rating-answer',
        23: 'phe-item-type-web-request',
        24: 'phe-item-type-action-request'
      };

      css_classes.push( from[ self._get_item_from( ui_item.data ) ] );
      css_classes.push( types[ ui_item.data.type ] );

      if( ui_item.custom.is_first_in_block || ui_item.custom.is_first_in_day )
      {
        css_classes.push( 'phe-first-item' );
      }

      if( ui_item.custom.is_last_in_block )
      {
        css_classes.push( 'phe-last-item' );
      }

      if( ui_item.custom.is_pressed )
      {
        css_classes.push( 'phe-item-active' );
      }

      return css_classes.join( ' ' );
    };



    /**
     * Returns item css class for bubble
     *
     * @param {Object} ui_item
     * @return {String}
     * @private
     */
    self._get_item_css_bubble = function ( ui_item )
    {
      var css_classes = [];

      if( self._get_item_from( ui_item.data ) === 'consultant' )
      {
        css_classes.push( 'bubble-rounded' );
        if( ui_item.custom.is_last_in_block )
        {
          css_classes.push( 'bubble-pointer-left' );
        }
      }

      var is_injected = !!ui_item.data._injected;

      if( self._get_item_from( ui_item.data ) === 'enduser' )
      {
        if( ui_item.custom.is_first_in_block && !is_injected )
        {
          css_classes.push( 'bubble-rounded' );
        }

        if( !ui_item.custom.is_first_in_block || is_injected )
        {
          css_classes.push( 'enduser-next-bubble' );
        }

        if( is_injected )
        {
          css_classes.push( 'fadeInRight animated' );
        }
      }

      if( ui_item.custom.is_from_consultant && ui_item.custom.is_last )
      {
        css_classes.push( 'fadeInLeft animated' );
      }

      return css_classes.join( ' ' );
    };



    /**
     * Get status icon
     *
     * @param {Object} item
     * @return {String}
     */
    self._get_status_icon = function( item )
    {
      if( item.read_by_some_participant === true )
      {
        return 'ion-android-done-all'; // Double check
      }

      if( item._injected )
      {
        return 'ion-clock'; // Sending
      }

      return 'ion-checkmark'; // Single check
    };



    /**
     * Scroll to bottom
     *
     * @param {number=} timeout_seconds
     */
    function scroll_to_bottom ( timeout_seconds )
    {
      $timeout( function()
      {
        $ionicScrollDelegate.$getByHandle( 'timeline' ).scrollBottom();
      }, timeout_seconds || 0 );
    }



   /**
    * On consultant is writing
    *
    * @private
    */
   self._on_consultant_typing = function()
   {
     self.consultant_typing = true;
     scroll_to_bottom();

     // When the event is received the timeout is cleared
     $timeout.cancel( self._typing_timeout );

     // If we do not receive another event in 12 seconds, we will hide the typing component
     self._typing_timeout = $timeout( function()
     {
       self.consultant_typing = false;
     }, 12000 );
    };



    /**
     * Callback called when a new item has arrived to the consultation
     *
     * @private
     */
    self._on_new_item = function()
    {
      // We hide consultant_typing as we assume it's the one he/she was writing
      self.consultant_typing = false;
      $timeout.cancel( self._typing_timeout );
    };



    /**
     * Open Card
     * @param {Object} item_ui item
     *
     */
    self.open_card = function ( item_ui )
    {
      $state.go( 'consultation.card_viewer',
      {
        card_id: item_ui.data.data.card.id,
        consultation: self.consultation
      });
    };



    /**
     * Opens the Floating side window with the item_ui element
     * @param {object} item_ui
     */
    self.open_FSW = function( item_ui )
    {
      $state.go( 'consultation.floating_side_window',
      {
        fswItem: item_ui,
        consultation: self.consultation
      });
    };



    /**
     * Confirm proposal
     * @param {Object} item
     *
     */
    self.confirm_proposal = function ( item )
    {
      // Check if the item already exists
      var item_to_update = $filter( 'getById' )( self.ui_items, item.id );
      item_to_update.data.status = 3;
    };



    /**
     * Reject proposal
     * @param {Object} item
     *
     */
    self.reject_proposal = function ( item )
    {
      // Check if the item already exists
      var item_to_update = $filter( 'getById' )( self.ui_items, item.id );
      item_to_update.data.status = 2;
    };



    /**
     * Prepare events
     *
     * @private
     */
    self._prepare_events = function()
    {
      // ************
      // Items events
      // ************
      var add_item_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':add_item', function( event, item)
      {
        // @TODO: UPDATE ANSWER DIALOG ITEM WHEN ITEM TYPE 20 ARRIVES
        self.add_new_ui_item( item );
        scroll_to_bottom( 300 );
        self._check_chatbot();
        SoundsService.play( 'received_msg' );
        self._on_new_item();
        if(item.type === ConsultationItemType.DIALOG_ANSWER){
          $rootScope.$emit('answer_added');
        }
      });

      var update_item_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':update_item', function( event, item )
      {
        self.update_ui_item( item );
      });

      var items_added_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':items_added', function()
      {
        self.ui_items = self.get_ui_items();
      });

      var items_read_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':read_items', function( event, item_ids)
      {
        self.read_ui_items( item_ids );
      });

      var listener_consultant_typing = $rootScope.$on( 'Communicator:consultant_typing:' + Auth.get_enduser_data().customer_id + ':' + self.consultation.id, self._on_consultant_typing );

      // ************
      // Files events
      // ************
      var add_item_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':add_file', function( event, item)
      {
        self.add_new_ui_item( item );
        scroll_to_bottom( 300 );
      });

      // ************
      // Appointment proposal events
      // ************
      var confirm_proposal_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':proposal_confirmed', function( event, item )
      {
        self.confirm_proposal( item );
      });

      var proposal_rejected_listener = $rootScope.$on( 'Consultation:' + self.consultation.id  + ':proposal_rejected', function( event, item )
      {
        self.reject_proposal( item );
      });


      $scope.$on( '$destroy', function()
      {
        add_item_listener();
        update_item_listener();
        confirm_proposal_listener();
        proposal_rejected_listener();
        items_added_listener();
        listener_consultant_typing();
        items_read_listener();
      });
    };

    self._constructor();
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.AppStores', Controller );

  function Controller
  (
    Portals,
    Settings
  )
  {
    var vm = this;

    
    /**
     * Portal iOS App id
     *
     * @type {String}
     */
    vm.ios_app_id = null;


    /**
     * Portal Android App id
     *
     * @type {String}
     */
    vm.android_app_id = null;


    /**
     * Language code to use in iOS Store page
     *
     * @type {String}
     */
    vm.language_code = null;


    /**
     * Theme path where store images are located
     *
     * @type {String}
     */
    vm.theme_path = null;



    /**
     * Initialize controller
     *
     * @private
     */
    vm._initialize = function()
    {
      vm.language_code = window.settings.language_code;
      vm.theme_path = window.settings.theme_path;

      Portals.load_portal_by_name( Settings.params.portal_name )
        .then( function( portal )
        {
          vm.ios_app_id = portal.ios_app_id;
          vm.android_app_id = portal.android_app_id;
        });
    };


    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.ConsultationDetail', Controller );

  function Controller
  (
    $scope,
    $rootScope,
    $ionicModal,
    $window,
    $state,
    $stateParams,
    Enduser,
    ClientLogger,
    Stages,
    ConsultantProfileService
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * Consultation model
     *
     * @var {Object}
     */
    vm.consultation_model = $stateParams.consultation;


    /**
     * Debug click counter
     *
     * @type {number}
     * @private
     */
    vm._debug_click_counter = 0;


    /**
     * Enduser
     *
     * @var {Object}
     */
    vm.enduser = {};


    /**
     * Main consultant object
     *
     * @var {Object}
     */
    vm.main_consultant = {};


    /**
     * Other consultants array
     *
     * @type {Array}
     */
    vm.other_consultants = [];


    /**
     * Other consultant selected
     *
     * @type {Object}
     */
    vm.selected_other_consultant = null;



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      vm._debug_click_counter = 0;
      vm.show_debug_toggle = false;
      vm.consultation = vm.consultation_model.data;
      vm.service_profile_id = vm.consultation_model.service.profile_id;
      vm.home_boxes = vm.consultation_model.portal.home_boxes;
      vm.stage_name = Stages.get_stage( vm.consultation_model.data.stage_id ).name;
      vm.enduser = Enduser.enduser;
      vm.version_app = $window.settings.version;
      vm.branch = $window.settings.branch;
      vm.main_consultant = vm.consultation_model.get_main_consultant();
      vm.other_consultants = vm.consultation_model.get_other_consultants();
      vm.selected_other_consultant = ( vm.other_consultants.length > 0 ) ? vm.other_consultants[ 0 ] : null;
      _initialize_consultant_profile();
    };



    /**
     * Goes to timelime
     */
    vm.go_to_timeline = function()
    {
      $state.go( 'consultation.consultation_home', { consultation: vm.consultation_model } );
    };


    /**
     * Goes to consultant profile
     *
     * @param {number} consultant_id
     */
    vm.go_to_consultant_profile = function()
    {
      if( !vm.consultation_model.service.profile_id )
      {
        return;
      }
      $state.go( 'consultation.consultant_profile', { consultation:  vm.consultation_model } );
    };



    /**
     * Select consultant
     *
     * @param {object} consultant
     */
    vm.select_consultant = function( consultant )
    {
      vm.selected_other_consultant = consultant;
    };



    /**
     * Show home box
     *
     * @param {Object} box
     */
    vm.show_box = function( box )
    {
      var modal_scope = $rootScope.$new( true );
      modal_scope.box = box;
      modal_scope.close = function()
      {
        $scope.home_box_modal.remove();
      };

      var options =
      {
        scope: modal_scope,
        animation: 'slide-in-up'
      };

      $ionicModal.fromTemplateUrl( 'consultation/views/home_box.tpl.html', options ).then( function( modal )
      {
        $scope.home_box_modal = modal;
        $scope.home_box_modal.show();
      });
    };



    /**
     * Show plugin version and debug options when clicking Phemium version at footer info page
     */
    vm.show_debug_info = function()
    {
      var plugins_config = {};
      plugins_config.enduser_version = 'Phemium Enduser Mobile: ' + window.settings.version;

      if( window.cordova )
      {
        var installedPlugins = window.cordova.require( 'cordova/plugin_list' ).metadata;
        plugins_config.videocall_version = 'Phemium Video Plugin: ' + installedPlugins[ 'phemium-videocall-plugin' ];
      }

      plugins_config.use_webrtc = Comm.core.Capabilities.is_webrtc_installed() ? 'yes' : 'no';

      var modal_scope = $rootScope.$new( true );
      modal_scope.plugins_config = plugins_config;
      modal_scope.close = function()
      {
        $rootScope.debug_enabled = $scope.plugins_config.debug_enabled;
        $scope.modal.remove();
      };

      modal_scope.debug_click = function()
      {
        vm._debug_click_counter += 1;

        if( vm._debug_click_counter > 10 )
        {
          modal_scope.show_debug_toggle = true;
        }
      };

      var options =
      {
        scope: modal_scope,
        animation: 'slide-in-up'
      };

      $ionicModal.fromTemplateUrl( 'shared/views/plugin-info.tpl.html', options ).then( function( modal )
      {
        plugins_config.debug_enabled = $rootScope.debug_enabled;
        $scope.modal = modal;
        $scope.plugins_config = plugins_config;
        $scope.modal.show();
        vm.show_debug_toggle = false;
      });
    };



    /**
     * Initialize consultatn CV card
     *
     */
    function _initialize_consultant_profile()
    {
      if( ConsultantProfileService.card == null )
      {
        ConsultantProfileService.init_consultant_profile( vm.consultation_model )
        .then( _consultant_profile_load_success , _consultant_profile_load_error);
      }
    }



    /**
     * Load consultant profile data success
     *
     */
    function _consultant_profile_load_success()
    {
      ClientLogger.info( 'Consultant CV success' );
    }



    /**
     * Load consultant profile data error
     *
     */
    function _consultant_profile_load_error()
    {
      ClientLogger.info( 'Consultant CV error' );
    }


    vm._initialize();
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.ConsultationF2F', Controller );

  function Controller
  (
    $rootScope,
    $translate,
    ClientLogger,
    LoadingService,
    Auth,
    Settings,
    Portals,
    amMoment,
    CallService,
    phemiumApiConnector,
    phemiumCommunicator,
    EnduserPresence,
    UtilsService,
    Consultant
  )
  {
    /* jshint validthis: true */
    var vm = this;



    /**
     * Constructor
     *
     * @private
     */
    vm._constructor = function()
    {
      vm.loaded = false;

      vm._check_enduser()
        .then( Portals.load_portal_by_name.bind( Portals, Settings.params.portal_name ) )
        .then( vm._start_enduser_presence )
        .then( vm._start_phemium_communicator )
        .then( vm._start );
    };



    /**
     * Checks if the enduser exists or creates it
     *
     * @return {Promise}
     * @private
     */
    vm._check_enduser = function()
    {
      return new Promise( function( resolve )
      {
        if( Auth.get_enduser_data() )
        {
          resolve();
          return;
        }

        var email = ClientLogger.get_client_uuid() + '@foo.com';
        var password = btoa( email ).substr( 0, 20 ); // Password must be compatible with strength options

        Auth.login( email, password )
          .then( resolve )
          .catch( function()
          {
            var enduser =
            {
              email: email,
              password: password
            };

            phemiumApiConnector
              .request( 'portals_frontend', 'register_new_enduser', [ parseInt( Settings.params.customer_id ), Settings.params.portal_name, enduser ] )
              .then( function()
              {
                Auth.login( email, password ).then( resolve );
              });
          });

      });
    };



    /**
     * Start the Phemium Communicator
     *
     * @return {Promise}
     * @private
     */
    vm._start_phemium_communicator = function()
    {
      return new Promise( function( resolve )
      {
        phemiumCommunicator.initialize( window.settings.environment.bayeux_url );
        phemiumCommunicator.join_channel( 'customer_' + Auth.get_enduser_data().customer_id );
        phemiumCommunicator.join_channel( 'customer_' + Auth.get_enduser_data().customer_id + '_enduser_' + Auth.get_enduser_data().user_id );
        resolve();
      });
    };



    /**
     * Starts enduser presence
     *
     * @return {Promise}
     * @private
     */
    vm._start_enduser_presence = function()
    {
      return new Promise( function( resolve )
      {
        EnduserPresence.init();
        EnduserPresence.start_presence();
        resolve();
      });
    };



    /**
     * Start
     *
     * @private
     */
    vm._start = function()
    {
      vm.searching = true;
      //$translate.use( 'es' );
      vm.f2f_portal = Portals.load_portal_by_name( Settings.params.portal_name );
      vm.portal = _check_language( vm.f2f_portal );

      vm._check_online_consultants()
        .then( vm._check_create_consultation )
        .then( vm._prepare_events )
        .then( function()
        {
          LoadingService.hide();

          vm.loaded = true;
          vm.show_exit_button = !!( window.plugins && window.plugins.PhemiumEnduserPlugin );
          vm.searching = false;
          vm.phone = Settings.params.face2face_phone || 'XXX';
          vm.show_logo = Settings.params.face2face_show_logo || false;
          vm.show_logo_footer = Settings.params.face2face_show_logo_footer || false;
          vm.have_online_consultants = vm.online_consultants.length > 0;
          vm.consultant = ( vm.have_online_consultants ) ? vm.consultation.consultants[0].consultant : null;
        })
        .catch( function( error )
        {
          LoadingService.hide();

          // TODO
          //alert( error );

        });
    };

    /**
     * Checks f2f language, sets the f2f language code, sets angular $translate language and also moment locale
     *
     * @param {Object} portal_data
     * @return {Promise}
     * @private
     */
    function _check_language( portal )
    {
      // Set global language code
      window.settings.language_code = Settings.calculate_language( portal.default_language_code );

      // Set moment locale
      amMoment.changeLocale( window.settings.language_code );

      // Tell $translate service what language to use and return Promise.
      return $translate.use( window.settings.language_code );
    }



    /**
     * Check online consultants
     *
     * @return {Promise}
     * @private
     */
    vm._check_online_consultants = function()
    {
      return new Promise( function( resolve )
      {
        phemiumApiConnector
          .request( 'services', 'get_online_consultants_for_service', [ Settings.params.service_id ] )
          .then( function( consultants )
          {
            vm.online_consultants = consultants;
            resolve();
          })
          .catch( function()
          {
            vm.online_consultants = [];
            resolve();
          });
      });
    };



    /**
     * Checks create consultation
     *
     * @return {Promise}
     * @private
     */
    vm._check_create_consultation = function()
    {
      return new Promise( function( resolve )
      {
        if( vm.online_consultants.length == 0 )
        {
          resolve();
          return;
        }

        var consultation =
        {
          status_id: 1,
          enduser: { id: Auth.get_enduser_data().user_id },
          portal: { id: Portals.get_portal_by_name( Settings.params.portal_name ).id },
          service: { id: Settings.params.service_id },
          consultants: [ vm.online_consultants[0].id ]
        };

        phemiumApiConnector
          .request( 'consultations', 'create_consultation', [ consultation, false ] )
          .then( function( consultation_id )
          {
            vm.consultation_id = consultation_id;

            phemiumApiConnector.request( 'consultations', 'get_consultation', [ consultation_id, false, true ] )
              .then( function( consultation )
              {
                vm.consultation = consultation;
                resolve();
              });
          });
      });
    };



    /**
     * Prepares events
     *
     * @return {Promise}
     * @private
     */
    vm._prepare_events = function()
    {
      return new Promise( function( resolve )
      {
        if( vm._events_prepared )
        {
          resolve();
          return;
        }

        vm._events_prepared = true;

        $rootScope.$on( 'Communicator:consultant_status_notification', function( event, data )
        {
          if( !vm.consultant || parseInt( data.consultant_id ) != parseInt( vm.consultant.id ) )
          {
            return;
          }

          var status_text = data.status.replace( 'status:', '' );
          vm.have_online_consultants = ( status_text == Consultant.ST_TEXT_ONLINE );
        });

        resolve();
      });
    };



    /**
     * Start call
     */
    vm.call = function()
    {
      CallService.call(
      {
        enduser_id: Auth.get_enduser_data().user_id,
        service_id: vm.consultation.service.id,
        portal_id: vm.consultation.portal.id,
        portal_name: vm.consultation.portal.value,
        consultant: vm.consultant,
        consultation_id: vm.consultation.id,
        appointment_id: null,
        language_code: null,
        auto_accept: false,
        debug_enabled: false
      });
    };



    /**
     * Retry
     */
    vm.retry = function()
    {
      this._start();
    };



    /**
     * Exit
     */
    vm.exit = function()
    {
      UtilsService.exit_app();
    };



    vm._constructor();
  }

})();

(function ()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.ConsultationHome', Controller );

  function Controller
  (
    $scope,
    $rootScope,
    $window,
    $timeout,
    $translate,
    $filter,
    $interval,
    $ionicModal,
    $ionicScrollDelegate,
    $cordovaFileTransfer,
    $state,
    $stateParams,
    SoundsService,
    ClientLogger,
    ConsultationService,
    ConsultationItemType,
    Consultations,
    Consultant,
    Service,
    Portals,
    Enduser,
    EnduserPresence,
    NotificationService,
    Queue,
    CallService,
    phemiumApiConnector,
    phemiumCommunicator,
    IncomingCallService,
    Stages,
    Settings,
    Auth,
    LoadingService,
    UtilsService,
    MediaUploader,
    Permissions,
    ngToast,
    $sce,
    DialogService,
    $ionicPlatform,
    Customers
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * Consultation
     *
     * @var {Object}
     */
    vm.consultation_model = $stateParams.consultation;
    ConsultationService.consultation =  vm.consultation_model;

    /**
     * Enduser
     *
     * @var {Object}
     */
    vm.enduser = null;


    /**
     * Consultant
     *
     * @var {Object}
     */
    vm.consultant = null;


    /**
     * Counter seconds call
     *
     * @var {Boolean}
     */
    vm.timeStr = 0;


    /**
     * Time interval id
     *
     * @var {number}
     * @private
     */
    vm._time_interval_id = null;


    /**
     * Check if button recall
     *
     * @var {Boolean}
     */
    vm.show_recall = false;


    /**
     * Counter time call
     *
     * @var {array}
     */
    vm.clock = {time: '',interval: 1000};


    /**
     * Check if workSession is active
     *
     * @var {Boolean}
     */
    vm.is_work_session_active = false;



    /**
     * Set height textarea (px)
     *
     * @var {String}
     */
    vm.height_textarea = 42;



    /**
     * Defines when user is writing message or not
     *
     * @var {Boolean}
     */
    vm.writing_message = false;


    /**
     * Typing sent
     *
     * @type {boolean}
     */
    vm._typing_sent = false;



    /**
     * Defines when user is mode read only
     *
     * @var {Boolean}
     */
    vm.read_only = false;


    /**
     * Whether call is disabled or not
     *
     * @var {Boolean}
     */
    vm.call_disabled = false;


    /**
     * Pending appointments items
     *
     * @var {Array}
     */
    vm.pending_appointments = [];


    /**
     * Ongoing appointment
     *
     * @var {Array}
     */
    vm.ongoing_appointment = null;


    /** Check appointments promise
     *
     * @var {Promise}
     * @private
     */
    vm._check_appointments_interval_id = null;


    /**
     * Check if appointment starts in next 'before_period' seconds (12 hours if no value assigned for 'before_period')
     *
     * @var {number}
     * @private
     */
    vm._appointment_start_seconds =
      Portals.get_portal(vm.consultation_model.portal.id).only_call_from_appointments_parameters ?
        Portals.get_portal(vm.consultation_model.portal.id).only_call_from_appointments_parameters.before_period : (12 * 60 * 60);



    /**
     * Formats _appointment_start_seconds as string with format '<num_hours>h <num_minutes>m <num_seconds>s'
     *
     * @var {string}
     * @private
     */
    vm._appointment_before_period_as_text = _getTimePeriodFromSeconds(vm._appointment_start_seconds);



    /**
     * External appointment id first check done
     *
     * @var {boolean}
     * @private
     */
    vm._check_external_appointment_done = false;


    /**
     * New message text
     *
     * @var {string}
     */
    vm.m_message = '';


    /**
     * Count break
     *
     * @type {number}
     */
    vm.count_break = 0;


    /**
     * Whether message is being sent or not
     *
     * @var {Boolean}
     */
    vm.is_sending = false;


    /**
     * Allow waiting room without appointment
     *
     * @var {Boolean}
     */
    vm.allow_waiting_room_without_appointment = false;


    /**
     * Id of uploading file
     *
     * @var {Number}
     */
    vm.upload_pending_file_id = null;


    /**
     * Uploading file entry
     *
     * @var {Object}
     */
    vm.upload_pending_file_entry = null;


    /**
     * Uploading file origin
     * Posible values: 1: Gallery 2: Capture
     *
     * @var {Number}
     */
    vm._upload_pending_file_origin = null;


    /**
     * Uploading file
     *
     * @var {Boolean}
     */
    vm.is_uploading_file = false;


    /**
     * Pending thumbnail path
     *
     * @var {String}
     */
    vm._pending_thumbnail_path = null;


    /**
     * Id of thumbnail creation pending file
     *
     * @var {Number}
     */
    vm._thumbnail_pending_file_id = null;


    /**
     * Uploading file
     *
     * @var {Boolean}
     */
    vm._is_pending_thumbnail_creation = false;


    /**
     * Uploading file progress
     *
     * @var {Number}
     */
    vm.uploading_file_progress = 0;


    /**
     * Whether to show mask or not
     *
     * @var {Boolean}
     */
    vm.show_mask = true;


    /**
     * Last uploading file progress
     *
     * @var {Number}
     */
    vm._last_uploading_file_progress = null;


    /**
     * Check if enduser is in queue
     *
     * @var {Boolean}
     */
    vm.in_queue = false;


    /**
     * Allow add enduser to queue
     *
     * @var {Boolean}
     */
    vm.allow_add_enduser_to_queue = false;


    /**
     * Whether user is accessing the waiting room or not
     *
     * @var {Boolean}
     */
    vm.accessing_queue = false;


    /**
     * Enduser in queue checker promise
     *
     * @var {number}
     * @private
     */
    vm._enduser_in_queue_checker_interval_id = null;


    /**
     * Whether user as allowed to access media (micro/camera) or not
     *
     * @var {Boolean}
     */
    vm.media_access_allowed = true;

    /**
     * Whether user as allowed to access notifications or not
     *
     * @var {Boolean}
     */
    vm.notifications_permissions = true;


    /**
     * Tmp image file: used for input file on browser
     *
     * @var {string}
     * @private
     */
    vm._tmp_image_file = null;


    /**
     * Whether data required to show tpl is loaded or not
     *
     * @type {Boolean}
     */
    vm.is_loaded = false;


    /**
     * Header participant avatars
     *
     * @var {Array}
     */
    vm.header_avatars = [];


    /**
     * Header participants names
     *
     * @type {string}
     */
    vm.header_participants_names = '';


    /**
     * Proxy variable to be able to use it in HTML.
     * It always be equal to UtilsService.allows_webrtc
     *
     * @type {Boolean}
     */
    vm.allows_webrtc = UtilsService.allows_webrtc;


    /**
     * Proxy variable to be able to use it in HTML.
     * It always be equal to UtilsService.platform
     *
     * @type {Boolean}
     */
    vm.platform = UtilsService.platform;


    /**
     * Proxy variable to be able to use it in HTML.
     * It always be equal to UtilsService.is_mobile
     *
     * @type {Boolean}
     */
    vm.is_mobile = UtilsService.is_mobile;



    /**
     *Dialog question component is shown
     *
     * @type {Boolean}
     */
    vm.show_dialog_question_over_footer = false;

    /**
     * Whether there's a worksession being requested or not
     *
     * @var {Boolean}
     */
    var _worksession_requested = false;



    $scope.$on('$ionicView.enter', function( event )
    {
      showVlfNotifications();
    });

    /**
     * Whether show or hide header
     *
     * @var {Boolean}
     */
    vm.show_header = true;



    /**
     * Show consultant availability alert
     *
     * @var {Boolean}
     */
    vm.consultant_availability_alert;



    /**
     * Consultant availability status
     *
     * @var {String}
     */
    vm.consultant_status_ui;


    /**
     * Consultation finished loading or not
     *
     * @var {Boolean}
     */
    vm.consultation_ready = false;


    /**
     * if size of answer dialog is big or not
     *
     * @var {Boolean}
     */
    vm.big_dialog_mesures = false;



    /**
     * consultant is a chatbot
     *
     * @var {Boolean}
     */
    vm.consultant_chatbot = false;



    /**
     * Type of bar alert
     *
     * @var {String}
     */
    vm.top_bar_type = "";



    /**
     * Keyboard is open
     *
     * @var {Boolean}
     */
    vm.keyboard_opened = false;



    /**
     * Customer data
     *
     * @var {Object}
     */
    vm.customer = null;



  /**
     * Maximum allowed file size as Mega Bytes
     *
     * @var {number}
     */
    vm.max_size_MB = _bytesToMB(Portals.get_portal(vm.consultation_model.portal.id).max_file_size);



    /**
     * Converts a number of seconds into a string with format '<num_hours>h <num_minutes>m <num_seconds>s'.
     * If language is Polish, format is '<num_hours>g <num_minutes>m <num_seconds>s'.
     *
     * @var {number} seconds
     * @returns {string}
     * @private
     */
    function _getTimePeriodFromSeconds(seconds)
    {
      var text = '';
      var d = moment.duration(seconds, 'seconds').get('days');
      var h = moment.duration(seconds, 'seconds').get('hours');
      var m = moment.duration(seconds, 'seconds').get('minutes');
      var s = moment.duration(seconds, 'seconds').get('seconds');
      var local_hour_initial = window.settings.language_code !== 'pl' ? 'h' : 'g';

      if ( d > 0 ) h = h + (d*24);
      if ( h > 0 ) {
        text = `${h}${local_hour_initial}`;
        if ( m > 0 || s > 0 ){
          text += ' ';
        }
      }
      if ( m > 0 || ( d > 0 && s > 0) ) {
        text += `${m}m`;
      }
      if ( s > 0 ){
        text += ` ${s}s`;
      }

      return text;
    }



    /**
     * Converts an amount of bytes to a string with format '<num_megabytes>'.
     * If decimals are '.00' then decimals are ignored.
     *
     * @var {number} bytes
     * @returns {string}
     * @private
     */
    function _bytesToMB(bytes)
    {
      var megabyte = 1024 * 1024;

      return (bytes % megabyte) === 0 ? parseFloat(bytes / megabyte).toFixed(0) : parseFloat(bytes / megabyte).toFixed(2);
    }



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      ClientLogger.info( 'INIT timeline' );

      if( !vm.consultation_model )
      {
        return;
      }

      // Load Data
      ConsultationService.consultation =  vm.consultation_model;
      vm.enduser = Enduser.enduser;
      vm.consultant = vm.consultation_model.get_main_consultant();
      Consultant.consultant = vm.consultant;
      vm.consultant_chatbot = Consultant.consultant_is_chatbot();
      vm.allow_waiting_room_without_appointment = ( parseInt( vm.consultation_model.portal.only_call_from_appointments ) != 1 );
      vm.channel_selected = vm.consultation_model.data.communication_channel || _get_consultation_channel_selected();
      vm.show_stages = vm.consultation_model.portal.show_stages;
      vm.show_home_button = !!( $window.plugins && $window.plugins.PhemiumEnduserPlugin );
      vm.show_logout_button = !!( $window.plugins && $window.plugins.PhemiumEnduserPlugin );
      vm.show_back_button = !Settings.params.consultation_id;
      vm.call_disabled = CallService.check_call_disable();
      vm.show_header = !Settings.params.hide_header;
      vm.backward_from_plugin_to_app_icon = Settings.params.backward_from_plugin_to_app_icon || 'ion-ios-arrow-left';
      vm.customer = Customers.get_customer_by_id( Settings.params.customer_id );

      vm._load_availability()
        .then( continue_initialize )
        .catch( function( error )
        {
          LoadingService.hide();
          vm.is_loaded = true; // Render ion-view element

          vm._show_loading_data_error( error );
        });



      function continue_initialize()
      {
        LoadingService.hide();
        vm.is_loaded = true; // Render ion-view element


        // Checks
        _check_work_session();
        vm._check_appointments();
        vm._check_appointments_interval_id = $interval( vm._check_appointments.bind( vm ), 10000 );
        vm._check_enduser_in_queue();
        vm._enduser_in_queue_checker_interval_id = $interval( vm._check_enduser_in_queue, 10000 );

        // Set presence data
        EnduserPresence.set_presence_options( { consultation_id: vm.consultation_model.id } );

        // User is here and his environment doesn't allow calls. We set presence as devices_test_status KO
        // Only if consultation is not chat-only
        if( !UtilsService.allows_webrtc && vm.channel_selected !== 'im' )
        {
          EnduserPresence.set_presence_options( { devices_test_status: 'ko' } );
        }

        vm.scroll_to_bottom();

        $ionicModal.fromTemplateUrl( 'consultation/views/pending_appointments.tpl.html', { scope: $scope, animation: 'slide-in-up' } )
          .then( function( modal )
          {
            vm._pending_appointments_modal = modal;
          });


        vm._build_header();
        vm._manage_listeners();

        // Checks required to be able to call method on_call_button_click if consultation is not closed
        if( vm.consultation_model.data.status_id != 2 )
        {
          _check_permissions( function()
          {
            if( _has_to_start_call() )
            {
              $rootScope.is_sanitas_operator = true;
              vm.in_queue = false;
              vm.on_call_button_click();
            }
          }.bind( this ) );
        }

        IncomingCallService.initialize( vm.consultation_model );

        if( Settings.params.action === 'call_request' )
        {
          IncomingCallService.on_call_request();
        }

        if( vm.consultation_model.data.status_id == Consultations.CONSULTATION_CLOSED || vm.consultation_model.data.status_id == Consultations.CONSULTATION_CANCELLED )
        {
          vm.read_only = true;
        }
        // If the worksession has been ended
        if( vm.consultation_model.worksession_active === false )
        {
          vm.read_only = true;
        }
      }

      // var videocall_cmp = angular.element( document.getElementsByTagName( 'phe-videocall' )[0] ).controller( 'pheVideocall' );
      // videocall_cmp.set_consultation_model( vm.consultation_model );
      _set_top_bar_visibility();
    };



    /**
     *  Reposition the timeline with an animation when keyboard appears or disappears
     */
    function _timeline_reposition()
    {
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom( true );
      vm.keyboard_opened = Keyboard.isVisible;
      $scope.$digest();
    }



    /**
     * Register listeners and prepare them to be removed on view destroy.
     *
     * @private
     */
    vm._manage_listeners = function()
    {
      vm._sanitas_custom_listeners();

      // Register Event Listeners
      var listener_consultation_update = $rootScope.$on( 'ConsultationService:consultation_update', _on_consultation_update );
      var listener_consultation_set_presence = $rootScope.$on( 'EnduserPresence:set_presence', _on_set_presence );
      var listener_consultant_status_notification = $rootScope.$on( 'Communicator:consultant_status_notification', vm._on_consultant_status_change );
      var listener_error_confirming_proposal = $rootScope.$on( 'ConsultationService:error_confirming_proposal', _on_error_processing_proposal );
      var listener_error_rejecting_proposal = $rootScope.$on( 'ConsultationService:error_rejecting_proposal', _on_error_processing_proposal );
      var listener_call_minimized = $rootScope.$on( 'CallService:call_minimized', vm._on_call_minimized );
      var listener_call_request_timeout = $rootScope.$on( 'IncomingCallService:call_request_timeout', vm.allow_recall );
      var listener_call_request_cancelled = $rootScope.$on( 'IncomingCallService:call_request_cancelled', vm.allow_recall );
      var listener_open_question = $scope.$on( 'item_field_question:open_question', _open_single_question_component );
      var listener_start_call_duration_timer = $rootScope.$on( 'VideoCallComponent:call_connected', _start_call_duration_timer );
      var listener_stop_call_duration_timer = $rootScope.$on( 'VideoCallComponent:call_disconnected', _stop_call_duration_timer );
      vm._listener_on_resume = $rootScope.$on( 'onResume', _check_permissions );
      var listener_on_chatbot_open = $rootScope.$on( 'open_chatbot_answer', _open_answer_chatbot_component );
      var listener_open_url = $rootScope.$on( 'open_url', open_FSW_from_event );
      var listener_open_appointment_request = $rootScope.$on( 'open_appointment_request', _open_appointment_request );

      var listener_consultation_stage_change = $rootScope.$on( 'Communicator:consultation_update:' + vm.consultation_model.id + ':stage_change', function()
      {
        $state.go( 'consultation_base', { consultation_id: vm.consultation_model.id } );
      });


      window.addEventListener( 'keyboardDidShow', _timeline_reposition );
      window.addEventListener( 'keyboardDidHide', _timeline_reposition );

      // Listen presence kicked
      var listener_presence_kicked = $rootScope.$on( 'EnduserPresence:kicked', function()
      {
        Queue.remove_enduser_from_queue();
      });

      // Listen remove consultant
      var listener_remove_consultant = $rootScope.$on( 'Consultation:' +  vm.consultation_model.id  + ':remove_consultant', function()
      {
        vm._build_header();
      });

      var listener_consultation_closed = $rootScope.$on( 'Consultation:' +  vm.consultation_model.id  + ':closed', function()
      {
        vm.read_only = true;
      });


      // Listener Worksession started
      var listener_worksession_started = $rootScope.$on( 'worksession:start', function( data )
      {
        _worksession_requested = false;
        vm.is_work_session_active = true;
        vm.consultation_model.worksession_active = true;
        ClientLogger.info( 'Event: on_start_work_session_event', data);
      });

      // Listener Worksession ended
      var listener_worksession_ended = $rootScope.$on( 'worksession:end', function( data )
      {
        _worksession_requested = false;
        vm.is_work_session_active = false;
        vm.read_only = true;
        vm.consultation_model.worksession_active = false;
        ClientLogger.info( 'Event: on_end_work_session_event', data);
      });

      var listener_on_resume = $ionicPlatform.on( 'resume', function()
      {
        vm.consultation_model.read_all_items();
      });


      // Unregister Event Listeners on destroy
      $scope.$on( '$destroy', function()
      {
        listener_consultation_update();
        listener_consultation_set_presence();
        listener_consultant_status_notification();
        listener_error_confirming_proposal();
        listener_error_rejecting_proposal();
        listener_consultation_closed();
        listener_call_minimized();
        listener_presence_kicked();
        listener_call_request_timeout();
        listener_call_request_cancelled();
        listener_open_question();
        listener_remove_consultant();
        listener_worksession_started();
        listener_worksession_ended();
        listener_start_call_duration_timer();
        listener_stop_call_duration_timer();
        listener_on_chatbot_open();
        listener_open_url();
        listener_open_appointment_request();
        listener_consultation_stage_change();

        if( vm._listener_on_resume )
        {
          vm._listener_on_resume();
        }

        window.removeEventListener( 'keyboardDidShow', _timeline_reposition );
        window.removeEventListener( 'keyboardDidHide', _timeline_reposition );
      });

      vm.consultation_ready = true;
    };



    /**
     * Open question
     */
    function _open_single_question_component ( event, item )
    {
      ConsultationService.selected_question_id = item.id;
      var card_library_field = item.data.data.card_library_field;
      card_library_field.item_id = item.data.id;
      // Questions opened outside card
      card_library_field.question_context = "single_question";

      vm.question_data = card_library_field;
      // If the card_library_field has a custom label, overwrite default with default label
      if( item.data.data.labels[0].value )
      {
       vm.question_data.labels[0].value = item.data.data.labels[0].value;
      }
      // TP_RATING. #19
      if( card_library_field.type == 19 )
      {
        vm.show_question_component = 'rating';
      }
      // TP_SLIDER. #20.
      else if( card_library_field.type == 20 )
      {
        vm.show_question_component = 'slider';
      }
      // TP_LIST_BUTTONS. #22.
      else if( card_library_field.type == 22 )
      {
        vm.show_question_component = 'list_buttons';
      }
    }



    /**
     * Opens the div to answer the dialog question
     * @param {object} event
     * @param {object} item
     */
    function _open_answer_chatbot_component ( event, item )
    {
      if( !item.data.data.field )
      {
        return;
      }
      // Load data
      vm.question_data = item.data.data.field;
      vm.question_data.actions = item.data.data.actions;
      DialogService.dialog_item = item;
      ConsultationService.selected_question_id = item.id;

      // Questions opened in dialog context
      vm.question_data.question_context = "dialog";

      vm.last_dialog_item = item;
      if( !DialogService.has_pending_questions )
      {
        vm.waiting_to_open_question = true;
      }


      if( !vm.question_data )
      {
        return;
      }
      // Open question component
      switch( vm.question_data.type )
      {
        case 'RADIO':
          if( _dialog_options_are_large() )
          {
            vm.show_dialog_question_over_footer = false;
            vm.show_question_component = 'list_question';
            vm.question_data.list_title = item.data.data.texts[0].value;
          }
          else
          {
            vm.show_dialog_question_over_footer = true;
            vm.show_question_component = 'radio_question';
          }
          break;
        case 'REMOTE_LIST':
          // TODO: Remove old remote_list code
          vm.question_data.list_title = item.data.data.texts[0].value;
          vm.show_question_component = 'list_question';
          break;
        case 'LIST':
          vm.question_data.list_title = item.data.data.texts[0].value;
          vm.show_question_component = 'list_question';
          break;
        case 'TEXTAREA':
          vm.show_question_component = 'text_area_question';
          break;
        case 'REMOTE_CALENDAR':
          vm.show_question_component = 'appointment_question';
          break;
      }
    }

    /**
     * Returns if the answer dialog text length is large (50)
     *
     * @param {Array} answers
     * @param {Boolean} fields
     */
    function _dialog_options_are_large()
    {
      // Load actions and options
      if( vm.question_data.options && vm.question_data.actions )
      {
        var question_items = vm.question_data.options.concat(vm.question_data.actions);
      }
      // Load options
      else if( vm.question_data.options )
      {
        var question_items = vm.question_data.options;
      }
      // Load actions
      else
      {
        var question_items = vm.question_data.actions;
      }
      var answer_length = 0;

      for( var i=0; i <  question_items.length; i++)
      {
        if( question_items[0].labels )
        {
          answer_length += question_items[i].labels[0].value.length;
        }
        else
        {
          answer_length += question_items[i].texts[0].value.length;
        }
      }

      return answer_length > 50;
    }


    /**
     * Close question component
     *
     * @param {String} component
     */
    vm.close_question_component = function ( )
    {
      vm.waiting_to_open_question = true;
      vm.scroll_to_bottom();
    };



    /**
     * Reset question component
     *
     * @param {String} component
     */
    vm.reset_question_component = function ( )
    {
      vm.show_question_component = null;
      vm.show_dialog_question_over_footer = false;
      vm.scroll_to_bottom();
    };


    /**
     * Open full screen question component
     *
     * @param {String} component
     */
    vm.open_question_component = function ( )
    {
      vm.waiting_to_open_question = false;
      DialogService.has_pending_questions = true;
    };



    $rootScope.$on( 'QuestionDialogComponent:on_question_save', vm.reset_question_component );
    $rootScope.$on( 'item_type_question:open_question_component' , vm.open_question_component );




    /**
     * Sanitas custom listeners
     *
     * @private
     */
    vm._sanitas_custom_listeners = function()
    {
      if( Settings.params.action == 'call' ||
        ( Stages.get_stage( vm.consultation_model.data.stage_id ).external_id == 'pendiente_llamada'
          && vm.consultation_model.portal.external_id == 'urgencias_medicas'
          && vm.consultation_model.data.status_id == Consultations.CONSULTATION_ACTIVE ) )
      {
        $rootScope.is_sanitas_operator = true;

        $scope.$on( '$ionicView.afterEnter', function()
        {
          // If we are on a call, we don't have to do anything
          if( $rootScope.isCalling == false )
          {
            if( $window.localStorage.getItem( 'check_if_sanitas_close_modal' ) == 'no' )
            {
              $window.localStorage.setItem( 'check_if_sanitas_close_modal', 'yes' );
              vm.in_queue = false;
              vm.on_call_button_click();
            }
          }
        });
      }

      if( Stages.get_stage( vm.consultation_model.data.stage_id ).external_id == 'pendiente_especialista'
        && vm.consultation_model.portal.external_id == 'urgencias_medicas'
        && vm.consultation_model.data.status_id == Consultations.CONSULTATION_ACTIVE )
      {
        vm.call_disabled = true;
        _set_top_bar_visibility();
      }
    };



    /**
     * Loads all required data to start view
     *
     * @returns {Promise}
     * @private
     */
    vm._load_availability = function()
    {
      return new Promise( function( resolve, reject )
      {
        if( (typeof( $stateParams.check_consultant_availability ) !== 'undefined' ) &&
          $stateParams.check_consultant_availability === false )
        {
          resolve();
          return;
        }

        Service.load_availability_template( vm.consultation_model.service.id )
          .then( Consultant.load_availability.bind( Consultant, vm.consultant.id ) )
          .then( Consultant.load_availability_template.bind( Consultant, vm.consultant.id ) )
          .then( function()
          {
            LoadingService.hide();
            vm.is_loaded = true;
            resolve();
            return
          })
          .catch( function( error )
          {
            LoadingService.hide();
            reject( error );
          });
      });
    };



    /**
     * Show loading data error
     *
     * @param {Object} error
     * @private
     */
    vm._show_loading_data_error = function( error )
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<img src="' + $rootScope.theme_path + '/img/error.svg" />',
        body: $translate.instant( 'error_loading_consultation_data' ),
        ok_text: $translate.instant( 'reload' ),
        ok_type: 'button-positive',
        on_click: function()
        {
          window.location.reload();
        }
      });
    };



    /**
     * Method to build header
     *
     * @private
     */
    vm._build_header = function()
    {
      var data = UtilsService.get_consultation_consultants_for_header( vm.consultation_model );
      vm.header_participants_names = data.names;
      vm.header_avatars = data.avatars;

      if( vm.consultation_model.portal.classification_name !== "" )
      {
        vm.header_title = vm.consultation_model.portal.classification_name;
      }
      else
      {
        vm.header_title = vm.consultation_model.data.service.value;
      }
    };



    /**
     * Scroll timeline to top
     *
     * @param {Boolean=} animate
     */
    vm.scroll_to_top = function( animate )
    {
      $ionicScrollDelegate.$getByHandle( 'timeline' ).scrollTop( animate );
    };



    /**
     * Scroll to bottom
     *
     * @param {number=} timeout_seconds
     * @param {Boolean=} animate
     */
    vm.scroll_to_bottom = function( timeout_seconds )
    {
      setTimeout( function()
      {
        $ionicScrollDelegate.$getByHandle( 'timeline' ).scrollBottom();
      }, timeout_seconds || 0 );
    };



    /**
     * Show action sheet
     */
    vm.open_action_sheet = function()
    {
      if( vm.consultation_model.portal.max_non_validated_files && _get_non_validated_files_count() >= vm.consultation_model.portal.max_non_validated_files )
      {
        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: $translate.instant( 'upload_file_error_max_non_validated_title' ),
          body: $translate.instant( 'upload_file_error_max_non_validated_content' ),
          ok_text: $translate.instant( 'ok_text' ),
          ok_type: 'button-assertive',
          on_click: null
        });

        return;
      }

      $scope.subaction = null;

      $ionicModal.fromTemplateUrl( 'consultation/views/action_sheet.tpl.html', { scope: $scope, animation: 'slide-in-up' } )
        .then( function( modal )
        {
          vm._actions_modal = modal;
          vm._actions_modal.show();
        });
    };



    /**
     * Close action sheet
     */
    vm.close_action_sheet = function()
    {
      vm._actions_modal.remove();
    };



    /**
     * Slide to next action
     *
     * @param {string} action
     */
    vm.next_action_sheet = function( action )
    {
      if( UtilsService.platform === 'browser' )
      {
        // This timeout on browser is for prevent inusual click propagation
        $timeout( function()
        {
          $scope.subaction = action;
        }, 50 );
      }
      else
      {
        $scope.subaction = action;
      }
    };



    /**
     * Do media action
     *
     * @param {String} action pick_media_image, pick_media_video, capture_media_image, capture_media_video
     * @private
     */
    vm.do_media_action = function( action )
    {
      vm.close_action_sheet();
      var media_action = null;

      switch( action )
      {
        case 'pick_media_image':
          media_action = MediaUploader.pick_media( 'image' );
          break;

        case 'pick_media_video':
          media_action = MediaUploader.pick_media( 'video' );
          break;

        case 'pick_media_document':
          media_action = MediaUploader.pick_media( 'document' );
          break;

        case 'capture_media_image':
          media_action = MediaUploader.capture_media( 'image' );
          break;

        case 'capture_media_video':
          media_action = MediaUploader.capture_media( 'video' );
          break;
      }

      media_action
        .then( function( mediafile )
        {
          if( mediafile.size )
          {
            if( !vm.consultation_model.is_file_size_allowed( mediafile.size ) )
            {
              vm._show_file_error_alert( 'upload_file_error_max_size' );
              return;
            }
          }

          var item_file =
          {
            data:
            {
              resources:
              [
                {
                  id: 'inbox:' + mediafile.uuid,
                  value: mediafile.name
                }
              ]
            }
          };

          vm.consultation_model.send_file( item_file )
            .then( function( item_id )
            {
              var phemium_drive_file_info =
              {
                target: 'consultation_file',
                consultation_id: vm.consultation_model.id,
                consultation_item_id: item_id
              };

              MediaUploader.add_pending_upload( [ mediafile ], phemium_drive_file_info );
              _check_consultant_availability();
            })
            .catch( function( error )
            {

            });
        })
        .catch( function( error )
        {
          ClientLogger.error( 'Error picking a media content', error );
          vm._show_file_error_alert( 'upload_file_error_selected' );
        });
    };



    /**
     *
     * @param uri
     * @param transaction_id
     * @param {Boolean} android_resolve_path
     * @private
     */
    vm._upload_file = function( uri, transaction_id, android_resolve_path )
    {
      vm.scroll_to_bottom();

      vm.uploading_file_progress = 0;
      vm.is_uploading_file = true;
      vm.upload_pending_file_id = transaction_id;

      if( UtilsService.platform == 'browser' && vm._tmp_image_file != null )
      {
        vm._on_file_object_creation_success( vm._tmp_image_file );
      }
      else
      {
        if( uri.indexOf( 'file:/' ) < 0 && !android_resolve_path )
        {
          uri = 'file://' + uri;
        }

        if( UtilsService.platform == 'Android' && android_resolve_path )
        {
          $window.FilePath.resolveNativePath
          (
            uri,
            function(native_path)
            {
              vm._upload_file(native_path, vm.upload_pending_file_id, false);
            },
            function()
            {
              vm.is_uploading_file = false;
              _set_error_status_to_item(vm.upload_pending_file_id);
              vm.upload_pending_file_id = null;
              vm._show_file_error_alert( 'upload_file_error_text' );
            }
          );
        }
        else
        {
          $window.resolveLocalFileSystemURL = $window.resolveLocalFileSystemURL || $window.webkitResolveLocalFileSystemURL;
          $window.resolveLocalFileSystemURL
          (
            uri,
            function(fileEntry)
            {
              vm.upload_pending_file_entry = fileEntry;
              fileEntry.file( vm._on_file_object_creation_success, _on_file_object_creation_error);
            },
            function()
            {
              vm.is_uploading_file = false;
              _set_error_status_to_item(vm.upload_pending_file_id);
              vm.upload_pending_file_id = null;
              vm._show_file_error_alert( 'upload_file_error_text' );
            }
          );
        }
      }
    };



    /**
     * File created succesfully
     *
     * @param {File} file
     * @private
     */
    vm._on_file_object_creation_success = function( file )
    {
      // First check file size
      if( vm._upload_pending_file_origin == 1 )
      {

        MediaUploader.remove_pending_upload(vm.consultation_model.id, vm.upload_pending_file_id);
        ConsultationService.remove_item(vm.upload_pending_file_id);
        vm.is_uploading_file = false;
        vm.upload_pending_file_id = null;
        vm._show_file_error_alert( 'upload_file_error_max_size' );
        return;
      }

      if( UtilsService.platform == 'browser' )
      {
        // phemiumApiConnector.request( 'resources', 'upload_base64_resource', [ file.base64_data ], vm.upload_pending_file_id )
        //   .then( function( result )
        //   {
        //     vm._on_file_upload_success( { response: result }, file );
        //   },
        //   _on_file_object_creation_error );
        var formData = new FormData();

        formData.append( 'transaction_id', (new Date()).getTime());
        formData.append( 'token', phemiumApiConnector.token);
        formData.append( 'entity', 'resources' );
        formData.append( 'method', 'upload_resource' );
        formData.append( 'arguments', JSON.stringify(['file']));
        formData.append( 'file', file);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);

            if (data.resource_id) {
              vm._on_file_upload_success({ response: JSON.stringify(data) }, file);
            }
            else {
              _on_file_object_creation_error();
            }
          }
        }.bind( this );

        xhttp.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            var percentComplete = Math.round(event.loaded * 100 / event.total);
            vm.uploading_file_progress = percentComplete;
          }
        }.bind( this );

        xhttp.open( 'POST', phemiumApiConnector.url);
        xhttp.send(formData);
      }
      else
      {
        var options =
        {
          fileName: file.name,
          params:
          {
            token: phemiumApiConnector.token,
            entity: 'resources',
            method: 'upload_resource',
            arguments: JSON.stringify( [ file.name ] )
          }
        };

        $cordovaFileTransfer.upload( phemiumApiConnector.url, file.localURL, options, true ).then
        (
          function( result ){ vm._on_file_upload_success( result, file ); },
          _on_file_object_creation_error,
          function(progress) {
            if (!progress.lengthComputable) {
              return;
            }

            var uploading_file_progress = parseInt((progress.loaded / progress.total) * 100);
            vm.uploading_file_progress = uploading_file_progress;
            vm._last_uploading_file_progress = uploading_file_progress;
          }
        );
      }
    };



    /**
     * File upload success
     *
     * @param {Object} result
     * @param {File} file
     * @private
     */
    vm._on_file_upload_success = function( result, file )
    {
      var data = JSON.parse( result.response );
      var transaction_id = vm.upload_pending_file_id;

      // Search item and update item_id
      for( var i = 0; i < vm.consultation_model.items.length; i++ )
      {
        var m_item = vm.consultation_model.items[i];

        if( m_item.id != transaction_id )
        {
          continue;
        }

        if( vm._is_pending_thumbnail_creation && UtilsService.platform != 'browser' )
        {
          // Save thumbnail in local storage associated to definitive resource id and clean all thumbnail data
          $window.localStorage.setItem( 'resource_thumbnail_local_path:' + data.resource_id, vm._pending_thumbnail_path);
          $window.localStorage.removeItem( 'resource_thumbnail_local_path:' + vm._thumbnail_pending_file_id);
          vm._is_pending_thumbnail_creation = false;
          vm._pending_thumbnail_path = null;
          vm._thumbnail_pending_file_id = null;
        }
        else if( UtilsService.platform == 'browser' && !m_item.resources[0].thumbnail && data.previews )
        {
          m_item.resources[0].thumbnail = data.previews[1];
        }

        // Rename item id and resource item id
        var new_transaction_id = (new Date()).getTime();
        m_item.id = new_transaction_id;
        m_item.resources[0].item_id = new_transaction_id;
        m_item.resources[0].resource_id = data.resource_id;
        m_item.resources[0].url = data.resource_url;

        if( UtilsService.platform != 'browser' )
        {
          m_item.resources[0].local_path = (UtilsService.platform == 'Android' && vm._upload_pending_file_origin == 1) ? file.localURL : m_item.resources[0].local_path;
          $window.localStorage.setItem( 'resource_local_path:' + data.resource_id, m_item.resources[0].local_path);
        }

        vm.consultation_model.items[i] = m_item;
        $rootScope.$emit( 'ConsultationService:consultation_update', { type: 'item_updated' } );

        // Create consultation item
        var item =
        {
          type: ConsultationItemType.FILE,
          consultation_id: vm.consultation_model.id,
          created_by_enduser_id: vm.enduser.id,
          message: null,
          status: 1, // Unread
          data:
          {
            resources:
            [
              {
                id: data.resource_id,
                value: file.name
              }
            ]
          }
        };

        phemiumApiConnector
          .request( 'consultations', 'add_item', [item, true], new_transaction_id )
          .then( function( item_id )
          {
            var added_item = _add_new_item_to_list( item_id );

            if( UtilsService.platform != 'browser' )
            {
              _save_item_resources(added_item);
              MediaUploader.remove_pending_upload(vm.consultation_model.id, vm.upload_pending_file_id);
            }

            vm.is_uploading_file = false;
            vm.upload_pending_file_id = null;

          })
          .catch( function()
          {
            vm.is_uploading_file = false;
            _set_error_status_to_item(vm.upload_pending_file_id);
            vm.upload_pending_file_id = null;
            vm._show_file_error_alert( 'upload_file_error_text' );
          });

        break;
      }
    };



    /**
     * File object creation error
     *
     * @private
     */
    function _on_file_object_creation_error() {
      vm.is_uploading_file = false;
      _set_error_status_to_item(vm.upload_pending_file_id);
      vm.upload_pending_file_id = null;
      vm._show_file_error_alert( 'upload_file_error_text' );
    }



    // function _create_video_file_thumbnail() {
    //   vm._thumbnail_pending_file_id = vm.upload_pending_file_id;
    //   vm._is_pending_thumbnail_creation = true;
    //
    //   var dir = (UtilsService.platform == 'iOS' ) ? cordova.file.syncedDataDirectory : cordova.file.externalApplicationStorageDirectory;
    //
    //   var targetPath = dir + ConsultationService._clean_resource_name(vm.upload_pending_file_entry.name) + '.jpg';
    //   window.PKVideoThumbnail.createThumbnail(vm.upload_pending_file_entry.nativeURL, targetPath, function (target) {
    //     _update_thumbnail(vm._thumbnail_pending_file_id, target);
    //     vm._pending_thumbnail_path = target;
    //   }, function(){
    //     vm._is_pending_thumbnail_creation = false;
    //   });
    // };



    // /**
    //  * Set item thumbnail
    //  *
    //  * @param {Number} item_id
    //  * @param {String} thumbnail_path
    //  * @private
    //  */
    // function _update_thumbnail(item_id, thumbnail_path) {
    //   for (var i = 0; i < vm.consultation_model.items.length; i++) {
    //     var m_item = vm.consultation_model.items[i];
    //
    //     if (m_item.id == item_id) {
    //       vm.consultation_model.items[i].resources[0].thumbnail = thumbnail_path;
    //       MediaUploader.update_pending_upload(vm.consultation_model.id, vm.consultation_model.items[i]);
    //     }
    //   }
    // };



    /**
     * Set status error to an item
     *
     * @param {String} transaction_id
     * @private
     */
    function _set_error_status_to_item(transaction_id) {
      for (var i = 0; i < vm.consultation_model.items.length; i++) {
        var m_item = vm.consultation_model.items[i];

        if (m_item.id == transaction_id) {
          vm.consultation_model.items[i].upload_status = 3;
        }
      }
    }



    /**
     * Send message method
     */
    vm.send_message = function()
    {
      document.getElementById( "m_message" ).focus();
      var message = document.getElementById( 'm_message' ).value;

      if( message.length === 0 )
      {
        return;
      }

      // Send button animation
      angular.element( document.getElementById( 'm_send_button' ) ).addClass( 'sending' );
      vm.is_sending = true;
      vm._typing_sent = false;

      vm.consultation_model.send_message( { message: message } )
        .then( function()
        {
          _check_consultant_availability();
          _reset_send_text_variables();
        })
        .catch( function( error )
        {
          ClientLogger.error( 'Error adding a new item: ', error );
          vm.writing();
          _reset_send_text_variables();
        });
    };



    /**
     * Reset send text variables
     */
    function _reset_send_text_variables()
    {
      // *******************
      // Reset HTML elements
      // *******************
      document.getElementById( 'm_message' ).style.height = vm.height_textarea + 'px';
      angular.element( document.getElementById( 'm_send_button' ) ).removeClass( 'sending' );

      // **************************
      // Reset controller variables
      // **************************
      vm.m_message = '';
      // Wait for end of animation
      setTimeout( function()
      {
        vm.is_sending = false;
        vm.writing();
      }, 200 );
      vm.go_to_bottom();
    }



    /**
     * Set alert message with proper info
     */
    function _set_requirements_message()
    {
      if( vm.media_access_allowed === false && vm.notifications_permissions === false && UtilsService.platform !== 'browser' )
      {
        vm.permissions_alert_body = $translate.instant( 'permissions_denied_all' );
      }
      else if( vm.media_access_allowed === false )
      {
        vm.permissions_alert_body = $translate.instant( 'permissions_denied_media' );
      }
      else if( vm.notifications_permissions === false && UtilsService.platform !== 'browser' )
      {
        vm.permissions_alert_body = $translate.instant( 'permissions_denied_notifications' );
      }
    }



    /**
     * Show alert informing about the media/notifications permissions property
     *
     */
    vm.show_permissions_alert = function()
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-alert-circled"></i>',
        subtitle: $translate.instant( 'permissions_denied_title' ),
        body: vm.permissions_alert_body,
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Check permissions (media and notifications)
     *
     * @param {Function=} cb Callback function
     * @private
     */
    function _check_permissions( cb )
    {
      // Do not check permissions if call is not required
      if( !UtilsService.allows_webrtc || vm.call_disabled || vm.channel_selected === 'im' )
      {
        // Call callback if required
        if( typeof cb === 'function' )
        {
          cb();
        }

        return;
      }

      // Remove listener on resume because when checking permissions onResume event is fired again
      // and it was causing a onPause/onResume loop.
      vm._listener_on_resume();

      _set_requirements_message();
      var comm_tech = vm.consultation_model.portal.comm_tech_video;

      Permissions.check_media_permissions( comm_tech )
        .then( function()
        {
          // Restore onResume listener
          $timeout( function()
          {
            vm._listener_on_resume = $rootScope.$on( 'onResume', _check_permissions );
          }, 2000 );

          vm.media_access_allowed = true;
          _check_local_notifications_permissions();
          // Check top bar visibility when permissions are allowed
          _set_top_bar_visibility();

          // Call callback if required
          if( typeof cb === 'function' )
          {
            cb();
          }
        })
        .catch( function()
        {
          // Restore onResume listener
          $timeout( function()
          {
            vm._listener_on_resume = $rootScope.$on( 'onResume', _check_permissions );
          }, 2000 );

          EnduserPresence.set_presence_options( { devices_test_status:'no_media_permissions' } );
          vm.media_access_allowed = false;
          _check_local_notifications_permissions();

          // Call callback if required
          if( typeof cb === 'function' )
          {
            cb();
          }
        });
    }



    /**
     * Check local notification permissions
     *
     * @private
     */
    function _check_local_notifications_permissions()
    {
      // @WORKAROUND: Luxmed has asked that local notifications must not be a requirement to receive calls.
      // This should be removed and substituted by a customer config setting.
      if( vm.customer.name.toLowerCase().indexOf( 'luxmed' ) !== -1 )
      {
        vm.notifications_permissions = true;
        EnduserPresence.set_presence_options( { devices_test_status: 'ok' } );
        _set_requirements_message();
        return;
      }

      Permissions.check_local_notifications()
        .then( function()
        {
          vm.notifications_permissions = true;
          EnduserPresence.set_presence_options( { devices_test_status: 'ok' } );
          _set_requirements_message();
        })
        .catch( function()
        {
          EnduserPresence.set_presence_options( { devices_test_status:'no_notifications_permissions' } );
          vm.notifications_permissions = false;
          _set_requirements_message();
        });
    }



    /**
     * Check consultant status and availability to show info message
     * Only when I send a message or file && consultant is NOT online
     *
     * @param {boolean=} check_start_call
     * @private
     */
    function _check_consultant_availability( check_start_call )
    {
      // Return if availability is forced to not be checked.
      if( typeof( $stateParams.check_consultant_availability ) !== 'undefined' && $stateParams.check_consultant_availability == false )
      {
        return;
      }

      // Do not check availability if worksession has been requested
      if( _worksession_requested === true )
      {
        return;
      }

      // And I'm not in a call or in an active worksession
      if( Consultant.consultant.status !== Consultant.ST_ONLINE && !$rootScope.isCalling && !vm.is_work_session_active )
      {
        if( !Consultant.consultant_is_available() )
        {
          var config = Consultant.consultant_availability_template.config;

          if( !vm._is_availability_template_configured( config ) )
          {
            config = Service.service_availability_template.config;
          }

          if( vm._is_availability_template_configured( config ) )
          {
            var text = $translate.instant( 'consultant_not_available' );
            vm.consultant_availability = text.replace( '{availability}', Service.get_availability_text( config ) );
            vm.consultant_status_ui = "consultant_not_available";
          }
          else
          {
            vm.consultant_status_ui = "consultant_not_online";
          }
        }
        else
        {
          vm.consultant_status_ui = "consultant_not_online";
        }
      }

      // Only show bar alert if we don't have to "start call", because on_call_button_click also shows the proper modals.
      if( check_start_call !== true || ( check_start_call && !_has_to_start_call() ) )
      {
        _show_consultant_alert();
      }
    }



    /**
     * Show consultant bar alert for a limited period
     *
     * @private
     */
    function _show_consultant_alert()
    {
      // If the consultant is a chatbot do not show availability alert3
      if( vm.consultant_chatbot )
      {
        return;
      }

      vm.consultant_availability_alert = true;

      setTimeout( function()
      {
        vm.consultant_availability_alert = false;
      }, 5000 );
    }



    /**
     * Check if it needs to start a call
     *
     * @private
     */
    function _has_to_start_call()
    {
      // Environment config says we have to try to start a call (or access queue).
      if( Settings.params.action === 'call' )
      {
        return true;
      }

      // Check we're matching SANITAS/ASEPEYO conditions to start a call (or access queue) -> Portal (urgencias_medicas)/ Stage(pendiente_llamada) / Consultation status (Open).
      if( vm.consultation_model.portal.external_id === 'urgencias_medicas' && vm.consultation_model.data.status_id == Consultations.CONSULTATION_ACTIVE )
      {
        if( vm.consultation_model.stage.external_id === 'pendiente_llamada' )
        {
          return true;
        }

        return false;
      }

      // Environment config says whe have to enter directly to queue.
      if( vm.consultation_model.portal.queue_access_mode === Portals.QUEUE_ACCESS_MODE_DIRECT )
      {
        return true;
      }

      return false;
    };



    /**
     * Update uploaded item in items list
     *
     * @var {Number} item_id
     */
    vm._add_new_item_to_list = function( item_id )
    {
      angular.element( document.getElementById( 'm_send_button' ) ).removeClass( 'sending' );

      // Wait for end of animation
      $timeout( function()
      {
        vm.is_sending = false;
        vm.writing();
      }.bind( this ), 200 );


      var transaction_id = phemiumApiConnector.get_last_transaction_id();

      for( var i = 0; i < vm.consultation_model.items.length; i++ )
      {
        var item = vm.consultation_model.items[i];

        if( item.id != transaction_id )
        {
          continue;
        }

        item.id = item_id;
        item.upload_status = 1;

        item.resources.forEach( function( resource, index )
        {
          item.resources[ index ].item_id = item_id;
        });

        vm.consultation_model.items[i] = item;
        $rootScope.$emit( 'ConsultationService:consultation_update', { type: 'item_added' });
        return item;
      }
    };



    /**
     * Handle consultation update event
     *
     */
    function _on_consultation_update( event, data )
    {
      vm._check_appointments();

      if( data.type == 'item_added' )
      {
        CallService.onChatMessageArrived();

        if( !$rootScope.isCalling )
        {
          $interval.cancel( vm._time_interval_id );
          vm.timeStr = 0;
        }

        vm.scroll_to_bottom( data.item_type == ConsultationItemType.CALL ? 2000 : 1000 );
        SoundsService.play( 'received_msg' );
      }
    }



    /**
     * Show more items
     */
    vm.show_more_items = function()
    {
      vm.consultation_model.load_items();
      $scope.$broadcast( 'scroll.refreshComplete' );
    };



    /**
     * Add items loaded to timeline
     *
     * @private
     */
    vm._add_new_items = function ( new_items )
    {
      //Add new items in conslutationService
      for( var i = new_items.items.length - 1; i >= 0; i-- )
      {
        vm.consultation_model.items.unshift( new_items.items[i] );
      }
    };



    /**
     * Save resource from capture dir to app storage
     *
     * @param {Object} item
     */
    function _save_item_resources(item) {
      item.resources.forEach( function( resource )
      {
        $window.resolveLocalFileSystemURL(resource.local_path, function (file_entry_capture)
        {
          var name = file_entry_capture.name;

          $window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (file_entry_storage) {
            file_entry_capture.copyTo
              (
              file_entry_storage,
              name,
              function (file_entry_storage_copied) {
                $window.localStorage.setItem( 'resource_local_path:' + resource.id, file_entry_storage_copied.nativeURL);
              }, function(){
              }
              );
          }, function (error) {
            ClientLogger.error( 'Error saving resource file', error);
          });
        });
      });
    };



    /**
     * Exit phemium app (only working as plugin)
     */
    vm.exit_timeline = function( $event, go )
    {
      $event.stopImmediatePropagation();

      if( vm.in_queue )
      {
        ClientLogger.info( 'Exit app - in_queue' );

        NotificationService.show_confirm(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: $translate.instant( 'warning' ),
          body: $translate.instant( 'leaving_waiting_room_warning' ),
          ok_text: $translate.instant( 'leave' ),
          ok_type: 'button-assertive',
          cancel_text: $translate.instant( 'back' ),
          cancel_type: 'button-positive',
          on_ok: _exit_timeline_confirm.bind( this, go )
        });
      }
      else if( vm.is_uploading_file )
      {
        ClientLogger.info( 'Exit app - is_uploading_file' );

        NotificationService.show_confirm(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: $translate.instant( 'warning' ),
          body: $translate.instant( 'leaving_upload_pending_notice' ),
          ok_text: $translate.instant( 'leave' ),
          ok_type: 'button-assertive',
          cancel_text: $translate.instant( 'back' ),
          cancel_type: 'button-positive',
          on_ok: _exit_timeline_confirm.bind( this, go )
        });
      }
      else
      {
        _exit_timeline_confirm( go );
      }
    };



    /**
     * Exit app
     *
     * @param {string} go
     * @private
     */
    function _exit_timeline_confirm( go )
    {
      if( go === 'exit' )
      {
        ClientLogger.info( 'Exit app - vm._exit_phemium_app_confirm' );
        phemiumCommunicator._faye_client.disconnect();
        Queue.remove_enduser_from_queue();
        UtilsService.exit_app();
      }
      else
      {
        ClientLogger.info( 'Go Consultation List' );

        // Clean consultation data, reset intervals and subscriptions
        phemiumCommunicator._faye_client.unsubscribe( 'customer_' + Auth.get_enduser_data().customer_id + '_consultation_' + vm.consultation_model.id );
        vm.consultation_model = null;
        $interval.cancel( vm._check_appointments_interval_id );
        $interval.cancel( vm._enduser_in_queue_checker_interval_id );

        // Go to state
        $state.go( go );
      }
    };



    /**
     * Go to detail
     */
    vm.go_to_detail = function()
    {
      $state.go( 'consultation.consultation_detail', { consultation: vm.consultation_model } );
    };



    /**
     * Handle reopen call button click
     */
    vm.on_reopen_call_button = function()
    {
      if( UtilsService.allows_webrtc && UtilsService.platform === 'browser' )
      {
        // var videocall_cmp = angular.element( document.getElementsByTagName( 'phe-videocall' )[0] ).controller( 'pheVideocall' );
        // videocall_cmp.click_handler();
      }
      else
      {
        CallService.reOpen();
      }
    };



    /**
     * Handle queue button click
     */
    vm.on_call_button_click = function()
    {
      // Show webRTC not supported alert when in browser (and not in a device browser)
      if( !UtilsService.allows_webrtc && UtilsService.platform === 'browser' && !UtilsService.is_mobile )
      {
        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-ios-telephone"></i>',
          subtitle: $translate.instant( 'webrtc_not_supported_title' ),
          body: $translate.instant( 'webrtc_not_supported_text' ),
          ok_text: $translate.instant( 'close' ),
          ok_type: 'button-assertive',
          on_click: null
        });

        return;
      }

      // If we're on a text-only conversation, this button must not be clicked or at least, it has to do NOTHING.
      if( vm.channel_selected === 'im' )
      {
        return;
      }

      // If on call this button is to hangup the call
      if( $rootScope.isCalling )
      {
        CallService.hangUp();
        return;
      }


      // Check action depending on scenario
      if( vm.is_work_session_active )
      {
        // Work session (for instance, Luxmed)
        if( !vm.media_access_allowed )
        {
          // Access to camera/micro not allowed
          _check_permissions();
          return;
        }

        // Call
        vm.go_call();
      }
      else if( vm.in_queue )
      {
        // In queue
        vm._show_queue_leave_confirm();
      }
      else if( vm.ongoing_appointment )
      {
        // There's an appointment close
        if( !vm.media_access_allowed )
        {
          // Access to camera/micro not allowed
          _check_permissions();
          return;
        }

        if( vm.consultation_model.service.use_service_endusers_queue )
        {
          // Access queue
          vm._access_queue();
        }
        else
        {
          if( vm.consultant.status == Consultant.ST_ONLINE )
          {
            vm.go_call();
            return;
          }
          else
          {
            NotificationService.show_alert(
            {
              css_class: 'phe-popup-error',
              title: '<i class="icon ion-ios-person"></i>',
              body: $translate.instant( 'consultant_not_online' ),
              ok_text: $translate.instant( 'close' ),
              ok_type: 'button-assertive',
              on_click: null
            });
          }
        }
      }
      else if( !vm.consultation_model.service.use_service_endusers_queue )
      {
        // No waiting room configured
        if( vm.consultant.status == Consultant.ST_ONLINE )
        {
          vm.go_call();
          return;
        }
        else
        {
          NotificationService.show_alert(
          {
            css_class: 'phe-popup-error',
            title: '<i class="icon ion-ios-person"></i>',
            body: $translate.instant( 'consultant_not_online' ),
            ok_text: $translate.instant( 'close' ),
            ok_type: 'button-assertive',
            on_click: null
          });
        }
      }
      else if( vm.allow_waiting_room_without_appointment && ( vm.consultant.status == Consultant.ST_BUSY || vm.consultant.status == Consultant.ST_ONLINE || vm.consultant.status == Consultant.ST_AWAY ) )
      {
        // Access without appointment and consultant in a valid access status
        if( !vm.media_access_allowed )
        {
          // Access to camera/micro not allowed
          _check_permissions( vm._access_queue_without_appointment );
          return;
        }

        vm._access_queue_without_appointment();
      }
      else if( vm.allow_waiting_room_without_appointment )
      {
        if( !Consultant.consultant_is_available() )
        {
          var message = $translate.instant( 'consultant_not_online' );
          var title = '<i class="icon ion-ios-person"></i>';
          var config = Consultant.consultant_availability_template.config;

          if( !vm._is_availability_template_configured( config ) )
          {
            config = Service.service_availability_template.config;
          }

          if( vm._is_availability_template_configured( config ) )
          {
            message = $translate.instant( 'consultant_not_available' ).replace( '{availability}', Service.get_availability_text( config ) );
            title = '<i class="icon ion-ios-calendar"></i>';
          }

          NotificationService.show_alert(
          {
            css_class: 'phe-popup-error',
            title: title,
            body: message,
            ok_text: $translate.instant( 'close' ),
            ok_type: 'button-assertive',
            on_click: null
          });
        }
        else
        {
          NotificationService.show_alert(
          {
            css_class: 'phe-popup-error',
            title: '<i class="icon ion-ios-person"></i>',
            body: $translate.instant( 'consultant_not_online' ),
            ok_text: $translate.instant( 'close' ),
            ok_type: 'button-assertive',
            on_click: null
          });
        }
      }
      else
      {
        // Show pending appointments component
        if( vm._pending_appointments_modal )
        {
          vm._pending_appointments_modal.show();
        }
        else
        {
          $timeout( vm.on_call_button_click, 50 );
        }
      }
    };



    /**
     * Whether the availability template passed is configured or not
     *
     * @param {Object} config
     * @return {boolean}
     * @private
     */
    vm._is_availability_template_configured = function( config )
    {
      if( config.length === 0 )
      {
        return false;
      }

      // Flatten periods in config to know if something has been setup
      var config_periods = config.map( function( day_config ){ return day_config.periods; } );
      var config_flatten = [].concat.apply( [], config_periods );

      return config_flatten.length > 0;
    };



    /**
     * Call has been minimized
     *
     * @param {Object} event
     * @param {String} message
     * @private
     */
    vm._on_call_minimized = function( event, message )
    {
      // Cancel previous existing timer
      $interval.cancel( vm._time_interval_id );
      vm.timeStr = parseInt( message.split( ':' )[1], 10 );

      vm._time_interval_id = $interval(function()
      {
        vm.timeStr += 1;
      }, 1000 );
    };



    /**
     * Starts call duration timer
     *
     */
    var _start_call_duration_timer = function()
    {
      // Cancel previous existing timer
      $interval.cancel( vm._time_interval_id );
      vm.timeStr = 0;

      vm._time_interval_id = $interval(function()
      {
        vm.timeStr += 1;
      }, 1000 );
    };



    /**
     * Stop call duration timer
     *
     */
    var _stop_call_duration_timer = function()
    {
      $interval.cancel( vm._time_interval_id );
    };



    var _get_waiting_room_icon = function()
    {
      if( $rootScope.platform === 'ios' )
      {
        return '<i class="icon ion-man"></i>';
      }

      return '<img ng-src="' + $rootScope.theme_path + '/img/waiting-room.svg" />';
    };



    /**
     * Allow recall and show modal window with missing call message
     *
     * @private
     */
    vm.allow_recall = function()
    {
      vm.show_recall = true;
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-telephone phe-red"></i>',
        subtitle: $translate.instant( 'recall_popup_title' ),
        body: $translate.instant( 'recall_popup_content' ),
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-positive',
        on_click: null
      });
    }



    /**
     * Go to call
     *
     */
    vm.go_call = function()
    {
      vm.timeStr = 0;

      // // Show outgoing call window for web app
      // if( UtilsService.platform === 'browser' )
      // {
      //   if( window.cordova )
      //   {
      //     Keyboard.hide();
      //   }

      //   $state.go( 'consultation.outgoing_call',
      //   {
      //     consultation: vm.consultation_model
      //   });
      // }

      var config =
      {
        enduser_id: Auth.get_enduser_data().user_id,
        service_id: vm.consultation_model.service.id,
        portal_id: vm.consultation_model.portal.id,
        portal_name: vm.consultation_model.portal.name,
        consultant: Consultant.consultant,
        consultation_id: vm.consultation_model.id,
        appointment_id: null,
        language_code: null,
        auto_accept: false,
        debug_enabled: $rootScope.debug_enabled
      };

      CallService.only_audio = ( vm.channel_selected === 'audio' );
      CallService.call( config );
    };



    /**
     * Show queue access when no appointment confirmation is set
     *
     * @private
     */
    vm._show_queue_access_without_appointment_confirmation = function()
    {
      ClientLogger.info( 'Patient entered in waiting room' );
      SoundsService.play( 'beep' );
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-waiting-room',
        title: _get_waiting_room_icon(),
        subtitle: $translate.instant( 'waiting_room' ),
        body: $translate.instant( 'waiting_room_welcome_message' ),
        ok_text: $translate.instant( 'back_to_timeline' ),
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Show queue access when no appointment confirmation is set (SANITAS only)
     *
     * @private
     */
    vm._show_queue_access_without_appointment_confirmation_sanitas = function()
    {
      ClientLogger.info( 'Patient enters in the special waiting room from Urgencias Médicas' );
      // SoundsService.play( 'beep' );

      var body = $translate.instant( 'waiting_room_notice', { name: vm.consultant.presentation_name } );
      var button_text = $translate.instant( 'enter' );

      if( vm.consultation_model.portal.queue_access_mode === Portals.QUEUE_ACCESS_MODE_DIRECT )
      {
        body = $translate.instant( 'waiting_room_info_message' );
        button_text = $translate.instant( 'back' );
      }

      NotificationService.show_alert(
      {
        css_class: 'phe-popup-waiting-room',
        title: _get_waiting_room_icon(),
        subtitle: '',
        body: body,
        ok_text: button_text,
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Add enduser to queue
     *
     * @private
     */
    vm._access_queue = function()
    {
      Queue.remove_enduser_from_queue()
        .then( function()
        {
          Queue.add_enduser_to_queue( vm.consultation_model.id, vm.consultant.id, vm.ongoing_appointment.id, $window.language_code )
            .then( vm._on_add_enduser_to_queue_success )
            .catch( vm._on_add_enduser_to_queue_error );
        });
    };



    /**
     * Handle add enduser to queue success event
     *
     * @private
     */
    vm._on_add_enduser_to_queue_success = function()
    {
      ClientLogger.info( 'Patient enters in waiting room' );

      vm.in_queue = true;
      SoundsService.play( 'beep' );

      NotificationService.show_alert(
      {
        css_class: 'phe-popup-waiting-room',
        title: _get_waiting_room_icon(),
        subtitle: $translate.instant( 'waiting_room' ),
        body: $translate.instant( 'waiting_room_waiting_call_notice' ),
        ok_text: $translate.instant( 'back_to_timeline' ),
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Add enduser to queue
     *
     * @private
     */
    vm._access_queue_without_appointment = function()
    {
      ClientLogger.info( '_access_queue_without_appointment.' );

      // Check to avoid accessing multiple times to waiting room.
      if( vm.accessing_queue === true )
      {
        return;
      }

      // Show accessing UI
      vm.accessing_queue = true;

      Queue.remove_enduser_from_queue().then
        (
        function(){
          Queue.add_enduser_to_queue_with_remove( vm.consultation_model.id, vm.consultant.id, null, $window.language_code )
            .then( vm._on_add_enduser_to_queue_without_appointment_success )
            .catch( vm._on_add_enduser_to_queue_without_appointment_error );
        },
        function(){
          vm.accessing_queue = false;
          _set_top_bar_visibility();
        }
        );
    };



    /**
     * Handle add enduser to queue success event
     *
     * @private
     */
    vm._on_add_enduser_to_queue_without_appointment_success = function()
    {
      vm.accessing_queue = false;
      vm.in_queue = true;
      _set_top_bar_visibility();

      ClientLogger.info( 'On_add_enduser_to_queue_without_appointment_success.' );

      if( Settings.params.action === 'call_request' )
      {
        Settings.params.action = null;
        return;
      }

      if( $rootScope.is_sanitas_operator )
      {
        ClientLogger.info( '_show_queue_access_without_appointment_confirmation_sanitas.' );
        vm._show_queue_access_without_appointment_confirmation_sanitas();
      }
      else
      {
        ClientLogger.info( '_show_queue_access_without_appointment_confirmation.' );
        vm._show_queue_access_without_appointment_confirmation();
      }

    };



    /**
     * Handle add enduser to queue error event
     *
     * @param {Object} error
     * @private
     */
    vm._on_add_enduser_to_queue_error = function( error )
    {
      vm.accessing_queue = false;
      _set_top_bar_visibility();

      // Enduser already in service queue
      if( error.code == 2100 )
      {
        vm._on_add_enduser_to_queue_success();
        return;
      }

      ClientLogger.error( 'Error entering in waiting room', error );

      NotificationService.show_alert(
      {
        css_class: 'phe-popup-waiting-room',
        title: _get_waiting_room_icon(),
        subtitle: $translate.instant( 'waiting_room' ),
        body: $translate.instant( 'waiting_room_cannot_join' ),
        ok_text: $translate.instant( 'back' ),
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Handle add enduser to queue error event
     *
     * @param {Object} error
     * @private
     */
    vm._on_add_enduser_to_queue_without_appointment_error = function( error )
    {
      ClientLogger.error( 'On_add_enduser_to_queue_without_appointment_error' , error);

      // Enduser already in service queue
      if( error.code == 2100 )
      {
        vm._on_add_enduser_to_queue_without_appointment_success();
        return;
      }

      ClientLogger.error( 'Error entering in waiting room', error );

      NotificationService.show_alert(
      {
        css_class: 'phe-popup-waiting-room',
        title: _get_waiting_room_icon(),
        subtitle: $translate.instant( 'waiting_room' ),
        body: $translate.instant( 'waiting_room_cannot_join' ),
        ok_text: $translate.instant( 'back' ),
        ok_type: 'button-positive',
        on_click: null
      });
    };



    /**
     * Show queue leave confirm
     *
     * @private
     */
    vm._show_queue_leave_confirm = function()
    {

      // In direct mode you can't leave the waiting room
      if( vm.consultation_model.portal.queue_access_mode === Portals.QUEUE_ACCESS_MODE_DIRECT )
      {
        _deny_leaving_waiting_room();
      }
      else
      {

        NotificationService.show_confirm(
        {
          css_class: 'phe-popup-waiting-room',
          title: _get_waiting_room_icon(),
          subtitle: $translate.instant( 'waiting_room' ),
          body: $translate.instant( 'waiting_room_info_message' ),
          ok_text: $translate.instant( 'leave' ),
          ok_type: 'button-assertive',
          cancel_text: $translate.instant( 'back' ),
          cancel_type: 'button-positive',
          on_ok: function()
          {
            ClientLogger.info( 'Patient exited from waiting room' );
            vm.in_queue = false;
            Queue.remove_enduser_from_queue();

            // Reset mask value to show again
            vm.show_mask = true;
          }
        });
      }
    };


    /**
     * Show alert denying leave waiting room
     * @private
     */
    function _deny_leaving_waiting_room()
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-waiting-room',
        title: _get_waiting_room_icon(),
        subtitle: '',
        body: $translate.instant( 'waiting_room_info_message' ),
        ok_text: $translate.instant( 'back_to_timeline' ),
        ok_type: 'button-positive',
        on_click: null
      });
    }



    /**
     * Hide pending appointments modal
     */
    vm.hide_pending_appointments_modal = function()
    {
      vm._pending_appointments_modal.hide();
    };



    /**
     * Check appointments
     *
     * @private
     */
    vm._check_appointments = function()
    {
      var pending_appointments = [];
      var ongoing_appointment = null;

      vm.consultation_model.items.forEach( function( item )
      {
        // Check if received appointment_external_id;
        if( !vm._check_external_appointment_done && !vm.in_queue && Settings.params.appointment_external_id && item.data && item.data.extra_data && item.data.extra_data.external_id == Settings.params.appointment_external_id )
        {
          ongoing_appointment = item;
          Queue.appointment_id = item.id;
          vm.ongoing_appointment = ongoing_appointment;
          vm._access_queue();
        }

        // Check next appointments
        if( item.type == ConsultationItemType.APPOINTMENT && item.status == 2 )
        {
          item.consultant = $filter( 'filter' )(vm.consultation_model.data.consultants, { id: item.data.consultant_id })[0];
          item.data.timestamp_ini_humanized = moment(item.data.timestamp_ini, 'X').format('LLLL');
          pending_appointments.push( item );

          // Check if next appointment starts in next "vm._appointment_start_seconds" seconds
          if( !ongoing_appointment && parseInt( item.data.timestamp_ini ) < ( moment().unix() + ( vm._appointment_start_seconds ) ) )
          {
            ongoing_appointment = item;
            Queue.appointment_id = item.id;
          }
        }
      });

      // Set controller objects
      vm.pending_appointments = pending_appointments;
      vm.ongoing_appointment = ongoing_appointment;

      // Check ongoing appointment
      if( !vm.ongoing_appointment )
      {
        if( vm.in_queue == true && Queue.appointment_id != null )
        {
          vm.in_queue = false;
          Queue.appointment_id = null;
          Queue.remove_enduser_from_queue();
        }
      }

      vm._check_external_appointment_done = true;
    };




    /**
     * Method to handle when presence is set event
     * @private
     */
    function _on_set_presence() {
      vm.allow_add_enduser_to_queue = true;
    };



    /**
     * API call to proposal has been received. There has been an error in the process
     *
     * @param {Object} event
     * @param {Object} item
     * @private
     */
    function _on_error_processing_proposal(event, item) {
      item.processing = false;
    };





    /**
     * Method to handle when write message
     *
     * @private
     */
    vm.go_to_bottom = function()
    {
      _count_break_calculator();

      // Reposition actions
      var improve = document.getElementById( 'improve' );
      var timeline_bar = document.querySelector( '.phe-timeline-bar' );
      improve.style.bottom = Math.max( 57, timeline_bar.offsetHeight ).toString() + 'px';
    };



    /**
     * Check message input and display proper buttons
     *
     */
    vm.writing = function()
    {
      // Do not process if we're already sending a message
      if( vm.is_sending )
      {
        return;
      }

      // Only send typing message each 10s
      if( !vm._typing_sent )
      {
        vm._typing_sent = true;

        phemiumCommunicator.send( 'customer_' + Auth.get_enduser_data().customer_id + '_consultation_' + vm.consultation_model.id,
        {
          name: 'Communicator:enduser_typing:' + Auth.get_enduser_data().customer_id + ':' + vm.consultation_model.id
        });

        setTimeout( function()
        {
          vm._typing_sent = false;
        }, 10000 );
      }

      var send_button = angular.element( document.getElementById( 'm_send_button' ) );
      var call_button = angular.element( document.getElementById( 'm_call_button' ) );
      var string_length = vm.m_message.length;

      // If message input is empty
      if( string_length < 1 )
      {
        // Check if we're not in an environment with only messages to show call button
        if( !vm.call_disabled && UtilsService.allows_webrtc && vm.channel_selected !== 'im' )
        {
          send_button.addClass( 'phe-timeline-bar-hide' );
          call_button.removeClass( 'phe-timeline-bar-hide' );
        }

        vm.writing_message = false;
        _set_top_bar_visibility();
        return;
      }

      // User is writing a message
      vm.writing_message = true;
      _set_top_bar_visibility();

      // Check if we're not in an environment with only messages to hide call button
      if( !vm.call_disabled && UtilsService.allows_webrtc && vm.channel_selected !== 'im' )
      {
        call_button.addClass( 'phe-timeline-bar-hide' );
        send_button.removeClass( 'phe-timeline-bar-hide' );
      }
    };



    /**
     * Method to handle when user press enter
     *
     * @private
     */
    vm.enter = function()
    {
      // Send message when the enter key is pressed
      if( vm.customer.config.send_on_enter_key == 1 )
      {
        vm.send_message();
      }

      // Add new line when the enter key is pressed
      else
      {
        var scroll_height = document.getElementById( 'm_message' ).scrollHeight + vm.height_textarea;
        document.getElementById( 'm_message' ).style.height = scroll_height + 'px';
        _count_break_calculator();
      }
    };



    $scope.$on( 'elastic:resize', function (event, element, oldHeight, newHeight) {
      _count_break_calculator();
    });



    /**
     * Method count breakline
     *
     * @private
     */
    function _count_break_calculator()
    {
      vm.count_break = Math.ceil( document.getElementById( 'm_message' ).scrollHeight / vm.height_textarea );

      if( vm.count_break >= 6 )
      {
        vm.count_break = 6;
      }

      vm.scroll_to_bottom();
    }



    /**
     * Method to handle consultant status change event
     *
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    vm._on_consultant_status_change = function( event, data )
    {
      for( var i = 0; i < vm.consultation_model.data.consultants.length; i++ )
      {
        var consultant = vm.consultation_model.data.consultants[ i ];

        if( parseInt( data.consultant_id ) !== parseInt( consultant.id ) )
        {
          continue;
        }

        break;
      }

      // Notification received does not belong to any consultant assigned to this consultation
      if( i >= vm.consultation_model.data.consultants.length )
      {
        return;
      }

      var status_id = Consultant.ST_OFFLINE;
      var status_text = data.status.replace( 'status:', '' );

      ClientLogger.info( 'Consultant changed status to: ' + status_text, data );

      switch( status_text )
      {
        case Consultant.ST_TEXT_ONLINE:
          status_id = Consultant.ST_ONLINE;
          break;

        case Consultant.ST_TEXT_OFFLINE:
          status_id = Consultant.ST_OFFLINE;

          // If consultant status is offline and there is an active worksession
          // deactivate write messages bar and ends worksession
          if( vm.is_work_session_active )
          {
            vm.read_only = true;
            _end_worksession();
          }
          break;

        case Consultant.ST_TEXT_BUSY:
          status_id = Consultant.ST_BUSY;
          break;

        case Consultant.ST_TEXT_AWAY:
          status_id = Consultant.ST_AWAY;
          break;
      }

      if( parseInt( data.consultant_id ) === parseInt( vm.consultant.id ) )
      {
        vm.consultant.status = status_id;
        vm.scroll_to_bottom();
        vm._check_queue();

        // If main consultant has changed to ONLINE, we check for worksessions
        if( vm.consultant.status === Consultant.ST_ONLINE )
        {
          _check_work_session();
        }
      }

      // Clean consultant status error messages
      vm.consultant_availability = null;
      vm.consultant_status_ui = null;

      if( consultant )
      {
        consultant.status = status_id;
        consultant.status_text = Consultant.get_status_text_from_status_id( status_id );
        vm.consultation_model.data.consultants[ i ] = consultant;
      }

      vm._build_header();
      _set_top_bar_visibility();
    };



    /**
     * Count non validated files
     *
     * @returns {Number}
     * @private
     */
    function _get_non_validated_files_count()
    {
      var count_non_validated_files = 0;

      vm.consultation_model.items.forEach( function( item )
      {
        if( item.type === 2 && item.upload_status !== 3 )
        {
          item.data.file_validations.forEach( function( files )
          {
            if( files.validation_status === 0 )
            {
              count_non_validated_files++;
            }
          });
        }
      });

      return count_non_validated_files;
    }



    /**
     * Check queue
     *
     * @private
     */
    vm._check_queue = function()
    {
      if( vm.consultant.status == Consultant.ST_OFFLINE && !vm.ongoing_appointment && vm.in_queue )
      {
        NotificationService.show_alert(
        {
          css_class: 'phe-popup-waiting-room',
          title: _get_waiting_room_icon(),
          subtitle: $translate.instant( 'waiting_room' ),
          body: $translate.instant( 'we_cannot_meet' ),
          ok_text: $translate.instant( 'back_to_timeline' ),
          ok_type: 'button-positive',
          on_click: null
        });

        vm.in_queue = false;
        Queue.remove_enduser_from_queue();
      }
      else if( vm.consultant.status === Consultant.ST_ONLINE
          && vm.consultation_model.portal.queue_access_mode === Portals.QUEUE_ACCESS_MODE_DIRECT
          && !vm.in_queue )
      {
        vm.on_call_button_click();
      }

    };



    /**
     * Shows file alert error
     *
     * @param {string} message
     * @private
     */
    vm._show_file_error_alert = function( message )
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-alert-circled"></i>',
        subtitle: '',
        body: $translate.instant( message ),
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-positive',
        force_no_close: true,
        on_click: null
      });
    };



    /**
     * Check status work session
     *
     * @private
     */
    function _check_work_session()
    {
      ClientLogger.info( 'Check Work Session. Channel_selected: ' + vm.consultation_model.data.communication_channel );

      // communication_channel indicates if this consultation is working as a worksession
      if( !vm.consultation_model.data.communication_channel )
      {
        return;
      }

      // If consultation is closed we must not request for a worksession
      if( vm.consultation_model.data.status_id != Consultations.CONSULTATION_ACTIVE )
      {
        return;
      }

      // Do not ask for a worksession if consultant is offline. Status change will manage the change
      if( vm.consultant.status === Consultant.ST_OFFLINE )
      {
        return;
      }

      // Only request for a work session if we are not in an active one
      if( !vm.is_work_session_active )
      {
        vm.read_only = false;
        _worksession_requested = true;

        phemiumApiConnector.request( 'work_session', 'request_work_session', [ vm.consultant.id, vm.consultation_model.id ] )
          .then( function( data )
          {
            ClientLogger.info( 'Request Work Session Success' );

            if( !data )
            {
              ClientLogger.error( 'Request Work Session Error', data );
              _worksession_requested = false;
            }
          })
          .catch( function ( error )
          {
            ClientLogger.error( 'There has been an error requesting the worksession', error );
            _worksession_requested = false;
          });

        _set_top_bar_visibility();
      }
    }


    /**
     * Function to end worksession
     *
     * @private
     */
    function _end_worksession()
    {
      vm.is_work_session_active = false;

      phemiumApiConnector
        .request( 'work_session', 'end_work_session', [ vm.consultant.id, vm.consultation_model.id ] )
        .then( function( data )
        {
          ClientLogger.info( 'Workstation finished, consultant status offline' );
        })
        .catch( function ( error )
        {
          ClientLogger.error( 'There has been an error finishing worksession', error );
        });
    }



    /**
     * Function to check if enduser is still in queue
     *
     * @private
     */
    vm._check_enduser_in_queue = function()
    {
      phemiumApiConnector
        .request( 'services_endusers_queues', 'is_enduser_on_queue', [ vm.enduser.id ] )
        .then( function( in_queue )
        {
          vm.in_queue = in_queue;
        });
    };



    /**
     * Hide guide mask
     */
    vm.hide_mask = function()
    {
      vm.show_mask = false;
    };



    /**
     * Trasnform text clicked
     *
     * @param {string} tag
     */
    vm.transform_text = function( tag )
    {
      var input = document.getElementById( 'm_message' );
      var text = this._get_selected_text( input );

      if( text.length === 0 )
      {
        return;
      }

      var replace_text = '<' + tag + '>' + text + '</' + tag + '>';
      input.value = input.value.replace( text, replace_text );
    };



    /**
     * On List text clicked
     *
     */
    vm.on_list_text = function()
    {
      var input = document.getElementById( 'm_message' );
      var text = this._get_selected_text( input );

      if( text.length === 0 )
      {
        return;
      }

      var items = text.split( '\n' );

      var replace_text = '<ul>';

      items.forEach( function( item )
      {
        replace_text += '<li>' + item + '</li>';
      });

      replace_text += '</ul>';

      input.value = input.value.replace( text, replace_text );
    };



    /**
     * Get selected text
     *
     * @param {Object} input
     * @private
     */
    vm._get_selected_text = function( input )
    {
      if( document.activeElement !== input )
      {
        input.focus();
      }

      var text = '';
      var activeEl = document.activeElement;
      var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

      if(
        (activeElTagName === "textarea") || (activeElTagName === "input" &&
          /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
      )
      {
        text = activeEl.value.slice( activeEl.selectionStart, activeEl.selectionEnd );
      }
      else if( window.getSelection )
      {
        text = window.getSelection().toString();
      }

      return text;
    };



    /**
     * Get call button CSS class
     *
     * @returns {String}
     */
    vm.get_call_button_css = function()
    {
      var css_call_button;

      if( $rootScope.isCalling )
      {
        css_call_button = 'phe-call-close';
      }
      else if( vm.media_access_allowed && !vm.ongoing_appointment && !vm.allow_waiting_room_without_appointment )
      {
        css_call_button = 'phe-call-active';
      }
      else if( vm.media_access_allowed && !vm.accessing_queue &&   ( !$rootScope.isCalling && vm.is_work_session_active || ( !$rootScope.isCalling && vm.ongoing_appointment || ( vm.allow_waiting_room_without_appointment && ( vm.consultant.status == 1 || vm.consultant.status == 3 ) ) ) ) )
      {
        css_call_button = 'phe-call-ongoing';
      }
      else
      {
        css_call_button = 'phe-call-disabled';
      }
      return css_call_button;
    };



    /**
     * Get call button status
     *
     * @returns {String}
     */
    vm.get_call_button_status = function()
    {
      var call_button_status;

      if( vm.call_disabled || vm.channel_selected === 'im' )
      {
        call_button_status = 'not_allowed';
      }
      else
      {
        call_button_status = 'allowed';
      }
      return call_button_status;
    };



    /**
     * Returns waiting room banner visibility
     */
    function _can_enter_waiting_room_manually()
    {
      // There are no waiting rooms
      if( vm.consultation_model.service.use_service_endusers_queue === 0 )
      {
        return false;
      }

      // Enter auto mode
      if( vm.consultation_model.portal.queue_access_mode === Portals.QUEUE_ACCESS_MODE_DIRECT )
      {
        return false;
      }

      return true;
    }


    /**
     *  Check top bar visibility
     */
    function _set_top_bar_visibility()
    {
      _set_top_bar_container_visibility();
      _set_top_bar_type();
    }



    /**
     * Set timeline alert bar visibility
     */
    function _set_top_bar_container_visibility()
    {
      var _can_access_waiting_room_manually = _can_enter_waiting_room_manually();
      vm.show_top_message_bar = false;
      var show_alert_bar = true;

      // Check if call is disabled
      if( vm.call_disabled || !vm.media_access_allowed )
      {
        show_alert_bar = false;
      }

      // Do not show alert bar if there's no waiting room configured
      if( vm.consultation_model.service.use_service_endusers_queue === 0 )
      {
        show_alert_bar = false;
      }

      // Check queue access mode
      if( vm.consultation_model.portal.queue_access_mode === Portals.QUEUE_ACCESS_MODE_DIRECT )
      {
        show_alert_bar = false;
      }

      // WebRTC environment condition
      if( vm.allows_webrtc || vm.platform === "browser" )
      {
        //do nothing
      }
      else
      {
        show_alert_bar = false;
      }

      // IM consultation (worksession)
      if( vm.channel_selected === 'im' )
      {
        show_alert_bar = false;
      }

      // Closed or Cancelled consultation
      if( vm.consultation_model.data.status_id === Consultations.CONSULTATION_CLOSED || vm.consultation_model.data.status_id === Consultations.CONSULTATION_CANCELLED )
      {
        show_alert_bar = false;
      }

      // Consultation in read only mode (Used in worksessions)
      if( vm.read_only )
      {
        show_alert_bar = false;
      }

      // If we're writing a message
      if( vm.writing_message )
      {
        show_alert_bar = false;
      }

      // If there's an appointment in progress
      // OR we can access waiting room without appointments and consultant is ONLINE or AWAY or BUSY
      if(
        vm.ongoing_appointment
        || ( vm.allow_waiting_room_without_appointment
          && ( vm.consultant.status === Consultant.ST_ONLINE || vm.consultant.status === Consultant.ST_AWAY || vm.consultant.status === Consultant.ST_BUSY )
        )
      )
      {
        //do nothing
      }
      else
      {
        show_alert_bar = false;
      }

      vm.show_top_message_bar = ( show_alert_bar || _can_access_waiting_room_manually ) && !vm.consultant_chatbot;

    }



    /**
     * Eneable waiting room banner visibility
     */
    function _set_top_bar_type()
    {
      vm.show_top_waiting_room_bar = false;
      if
      ( !vm.in_queue
        && vm.ongoing_appointment
      )
      {
        vm.top_bar_type = "appointment";
      }
      else if
      (
        vm.consultation_model.portal.queue_access_mode != 2
        && !vm.in_queue
        && !vm.ongoing_appointment
        && vm.allow_waiting_room_without_appointment
        && vm.consultation_model.service.use_service_endusers_queue
      )
      {
        vm.top_bar_type = "before_waiting_room";
      }
      else if(
        vm.in_queue
        && !$rootScope.isCalling
      )
      {
        vm.top_bar_type = "in_waiting_room";
      }
    }



      /**
       * Show toast notifications
       */
      function showVlfNotifications()
      {
        if( vm.consultation_model.fswItems == undefined )
        {
          vm.consultation_model.fswItems = [];
        }

        for( var i = 0; i < vm.consultation_model.fswItems.length; i++ )
        {
          // Create a new toast if doesn't exists in fswItems array
          if( vm.consultation_model.fswItems[i].toast == undefined )
          {

            var image = "";
            var title = "";
            var description = "";
            var title_description_col = '<div class="col col-80">';

            // add or not add an Image to the toast
            if( typeof vm.consultation_model.fswItems[i].image === "string" )
            {
              image = '<div class="col col-20 phe-thumbnail" style="background-image: url('+vm.consultation_model.fswItems[i].image + ');"></div>';
            }
            else
            {
              title_description_col = '<div class="col">';
            }

            if( typeof vm.consultation_model.fswItems[i].title === "string" )
            {
              title = '<p><b>' + vm.consultation_model.fswItems[i].title + '</b></p>';
            }
            else
            {
              title = '<p><b>' +  vm.consultation_model.fswItems[i].url + '</b></p>';
            }

            if(typeof vm.consultation_model.fswItems[i].description === "string")
            {
              description = '<p>' + vm.consultation_model.fswItems[i].description + '</p>';
            }

            var html = '<div class="custom-ngToast" ng-click="ctrl.open_FSW(\''+vm.consultation_model.fswItems[i].url + '\')">'
              + '<div class="row phe-padl-20">'
              + image
              + title_description_col
              + title
              + description
              + '</div></div></div>';

            var newToast = ngToast.create(
            {
              className: 'custom-ngToast',
              content: $sce.trustAsHtml(html),
              dismissOnClick: true,
              verticalPosition: top,
              maxNumber: 3,
              dismissOnTimeout: false,
              //dismissButton: true,
              compileContent: true,
              //onDismiss: open_FSW,
              url: vm.consultation_model.fswItems[i].url,
              fswItem: vm.consultation_model.fswItems[i]
            });
            vm.consultation_model.fswItems[i].toast = newToast;
          }
        }
      }



      /**
       * Function called from event to open Floating Side Window
       * @param {string} url
       */
      function open_FSW_from_event( event, url, item )
      {
        vm.open_FSW(url, item);
      }



      /**
       * Function called from toast notification to open Floating Side Window
       * @param {string} url
       */
      vm.open_FSW = function( url, item )
      {
        var fswItem;

        //If it comes from toast doesn't contains item
        if(item !== undefined)
        {
          fswItem =  {
            url: url,
            showIFrame: true,
            title: item.data.data.title,
            description: item.data.data.description,
            image: item.data.data.image
          };
        }
        else
        {
          //Already exists in fswItems array
          for( var i = 0; i < vm.consultation_model.fswItems.length; i++ )
          {
            if( vm.consultation_model.fswItems[i].url == url )
            {
              fswItem = vm.consultation_model.fswItems[i];
            }
          }
        }


        $state.go( 'consultation.floating_side_window',
        {
          fswItem: fswItem,
          consultation: vm.consultation_model
        });
      };



      /**
       * Function called from event to open Floating Side Window
       * @param {Object} event
       * @param {Object} item
       */
      function _open_remote_list_event( event, item )
      {
        open_remote_list( item );
      }

      /**
       * Opens the remote_list view
       * @param {Object} item
       */
      function open_remote_list( item )
      {
        $state.go( 'consultation.remote_list',
        {
          item: item,
          consultation: vm.consultation_model
        });
      }


      /**
       * Function called when appointment request timeline item is clicked
       *
       * @param {Object} item
       */
      function _open_appointment_request( event, item )
      {
        $state.go( 'consultation.appointment_request',
        {
          item: item,
          consultation: vm.consultation_model
        });
      }



      /**
       * Returns consultation channel depending on portal/service config
       * @TODO: For now, only audio calls are not working properly, this is why we only check
       * 'im' consultations for the moment.
       */
      function _get_consultation_channel_selected()
      {
        if( !vm.consultation_model.portal.comm_tech_audio && !vm.consultation_model.portal.comm_tech_video && vm.consultation_model.portal.comm_tech_im )
        {
          return 'im';
        }

        return null;
      }

    vm._initialize();

  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.Consultation', Controller );

  function Controller
  (
    $rootScope,
    $translate,
    $state,
    $stateParams,
    LoadingService,
    Consultations,
    NotificationService,
    EnduserPresence,
    UtilsService,
    Settings
  )
  {
    /* jshint validthis: true */
    var vm = this;



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      if( Settings.params.action !== 'call_request' )
      {
        LoadingService.show( { title: $translate.instant( 'loading_consultation' ) + '...' } );
      }
      else
      {
        LoadingService.show( { title: $translate.instant( 'preparing_call' ) + '...' } );
      }

      Consultations.get_consultation( $stateParams.consultation_id )
        .then( function( consultation_model )
        {
          vm._show_consultation( consultation_model );
        });
    };



    /**
     * Show consultation
     *
     * @param {Object} consultation_model
     * @private
     */
    vm._show_consultation = function( consultation_model )
    {
      // Check if we're allowed to access consultation
      if( !consultation_model.can_access() )
      {
        LoadingService.hide();

        NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: '',
          body: $translate.instant( 'error_access_consultation_cancelled' ),
          ok_text: $translate.instant( 'ok_text' ),
          ok_type: 'button-positive',
          force_no_close: true,
          on_click: function()
          {
            UtilsService.exit_app();
          }
        });
      }

      // Check preform
      if( !consultation_model.is_preform_filled() )
      {
        LoadingService.hide();
        $rootScope.is_preform = 1;
        $state.go( 'card_viewer',
        {
          card_id: consultation_model.service.form_id,
          consultation: consultation_model
        });

        return;
      }

      // Check assignation
      if( !consultation_model.is_consultant_assigned() )
      {
        LoadingService.hide();
        EnduserPresence.set_presence_options( { consultation_id: consultation_model.data.id } );
        $state.go( 'consultation_unassigned', { consultation: consultation_model } );
        return;
      }

      // Go to consultation view
      EnduserPresence.set_presence_options( { consultation_id: consultation_model.data.id } );
      $state.go( 'consultation.consultation_home', { consultation: consultation_model } );

    };



    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.ConsultationsList', Controller );

  function Controller
  (
    $scope,
    $window,
    $translate,
    $state,
    ClientLogger,
    phemiumApiConnector,
    EnduserPresence,
    LoadingService,
    Settings,
    Auth,
    UtilsService,
    Consultations,
    NotificationService
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * Set bar title
     *
     * @var {String}
     */
    vm.title = '';


    /**
     * Consultations list
     *
     * @var {Array}
     */
    vm.consultations_list_ui = [];


    /**
     * Show home button or not
     *
     * @var {Boolean}
     */
    vm.show_home_button = false;


    /**
     * Allow load more consultations
     *
     * @var {Boolean}
     */
    vm.allow_more_consultations = true;



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      LoadingService.show(
      {
        title: $translate.instant( 'loading_consultations' ) + '...',
        text: $translate.instant( 'loading_consultations_text' )
      });

      vm.show_home_button = !!( $window.plugins && $window.plugins.PhemiumEnduserPlugin );
      vm.title = Settings.params.portal_name || $translate.instant( 'consultations' );

      EnduserPresence.set_presence_options( { consultation_id: null } );

      this.show_more_consultations();
    };



    /**
     * Goes to consultation
     *
     * @param {Number} consultation_id
     */
    vm.goto_consultation = function( consultation_id )
    {
      ClientLogger.info( 'Selected consultation: ' + consultation_id );
      $state.go( 'consultation_base', { consultation_id: consultation_id } );
    };



    /**
     * Exit phemium app
     */
    vm.exit_phemium_app = function()
    {
      ClientLogger.info( 'Closing the App from the consultation list' );
      UtilsService.exit_app();
    };



    /**
     * Logout
     */
    vm.logout = function()
    {
      $state.go( 'logout' );
    };



    /**
     * Show more consultations
     */
    vm.show_more_consultations = function()
    {
      if( !vm._consultations_list_options )
      {
        vm._consultations_list_options =
        {
          sort_column: 'ini_timestamp',
          sort_type: 'DESC',
          page: 1,
          rows_per_page: 10
        };

        if( Settings.params.show_consultations_by_status === 'open' )
        {
          vm._consultations_list_options.filters =
          [
            {
              column: 'status_id',
              operator: 'equals',
              value: "[1,3]"
            }
          ];
        }
        else if( Settings.params.show_consultations_by_status === 'closed' )
        {
          vm._consultations_list_options.filters =
          [
            {
              column: 'status_id',
              operator: 'equals',
              value: 2
            }
          ];
        }
      }
      else
      {
        vm._consultations_list_options.page += 1;
      }

      Consultations.get_consultations( false, false, vm._consultations_list_options )
        .then( vm._get_consultations_success )
        .catch( vm._get_consultations_error );
    };



    /**
     * Get consultations success handler
     *
     * @param {Object} consultations
     * @private
     */
    vm._get_consultations_success = function( consultations )
    {
      ClientLogger.info( 'Consultation list loaded successfully', consultations );

      // Add loaded consultations to existing ones
      vm.consultations_list_ui = vm.consultations_list_ui.concat( consultations.map( function( consultation )
      {
        // Prepare UI data
        consultation.data.consultants_for_ui = vm._get_consultation_participants_for_ui( consultation );
        return consultation.data;
      }.bind( this )));

      LoadingService.hide();

      // Fire event to inform that inifinite scroll has been complete. So the loading UI will be hidden
      $scope.$broadcast( 'scroll.infiniteScrollComplete' );

      if( vm.consultations_list_ui.length === consultations.length )
      {
        vm.allow_more_consultations = false;
      }
    };



    /**
     * Get consultations error handler
     *
     * @param {Object} error
     * @private
     */
    vm._get_consultations_error = function( error )
    {
      ClientLogger.error( 'Error loading consultation list', error );

      // Send event to complete refresh if necessary
      $scope.$broadcast( 'scroll.refreshComplete' );

      // Hide loading mask
      LoadingService.hide();

      // Show error
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-alert-circled"></i>',
        body: $translate.instant( 'error_loading_consultation_data' ),
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-assertive',
        on_click: null
      });
    };



    /**
     * Gets the list of consultation participants to use in the UI
     *
     * @param {Object} consultation
     * @return {Object}
     * @private
     */
    vm._get_consultation_participants_for_ui = function( consultation )
    {
      return UtilsService.get_consultation_consultants_for_header( consultation );
    };



    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).controller( 'phemium.consultation.controllers.UnassignedConsultation', Controller );

  function Controller
  (
    $rootScope,
    $scope,
    $translate,
    $window,
    $state,
    $stateParams,
    NotificationService,
    UtilsService,
    ClientLogger,
    LoadingService,
    CommChannel,
    phemiumApiConnector,
    phemiumCommunicator
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * Alert timeout id
     *
     * @var {Number}
     * @private
     */
    vm._alert_timeout_id = null;


    /**
     * Consultation model
     *
     * @var {Consultation}
     */
    vm.consultation_model = $stateParams.consultation;


    /**
     * View mode (unassigned, comm_channel_selection, comm_channel_confirm)
     *
     * @type {string}
     */
    vm.mode = null;


    /**
     * Which channel has been selected.
     *
     * @type {string}
     */
    vm.channel_selected = null;


    /**
     * Average waiting text.
     *
     * @type {string}
     */
    vm._average_waiting_text = '';


    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      LoadingService.hide();

      if( CommChannel.is_enabled( vm.consultation_model ) )
      {
        if( !vm.consultation_model.data.communication_channel )
        {
          ClientLogger.info( 'Communication channel not selected' );

          var channels = CommChannel.get_channels( vm.consultation_model ).reverse();
          vm.channels = channels.map( function( channel )
          {
            return {
              channel: channel,
              icons: ( channel === 'video' ) ? [ 'camera', 'android-microphone', 'chatbubbles' ] : ( channel === 'audio' ) ? [ 'android-microphone', 'chatbubbles' ] : [ 'chatbubbles' ],
              selected: false
            }
          });

          vm.mode = 'comm_channel_selection';
          return;
        }
      }

      vm.mode = 'unassigned';

      vm._prepare_events();
      vm._get_expected_waiting_text();
    };



    /**
     * Prepare events
     *
     * @private
     */
    vm._prepare_events = function()
    {
      var add_consultant_listener = $rootScope.$on( 'Consultation:' + vm.consultation_model.id  + ':add_consultant', vm._check_communication_channel );
      var rejected_listener = $rootScope.$on( 'Consultation:' + vm.consultation_model.id  + ':canceled', vm._on_rejected );

      $scope.$on('$destroy', function()
      {
        add_consultant_listener();
        rejected_listener();
      });
    };



    /**
     * Fetch Average Waiting Text and then show Pending Assignation Popup
     *
     * @private
     */
    vm._get_expected_waiting_text = function () {
      phemiumApiConnector.request( 'consultations', 'get_expected_waiting_text', [ vm.consultation_model.id ], false )
        .then( function( waiting_text )
        {
          vm._average_waiting_text = waiting_text;
          vm._show_pending_assignation();
        })
        .catch( function ( err )
        {
          ClientLogger.error( err );
        });
    };



    /**
     * Show while pending assignation
     *
     * @private
     */
    vm._show_pending_assignation = function()
    {
      ClientLogger.info( 'Assignation pending' );

      clearTimeout( vm._alert_timeout_id );

      var waiting_text = vm._average_waiting_text || $translate.instant( 'show_pending_assignation_subtitle' );

      NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-information-circled"></i>',
          subtitle: '',
          body: waiting_text +
            '<br />' +
            '<br />' +
            '<div class="spinner spinner_medium">' +
            '<div class="bounce1"></div>' +
            '<div class="bounce2"></div>' +
            '<div class="bounce3"></div>' +
            '</div>',
          ok_text: $translate.instant( 'cancel' ),
          ok_type: 'button-positive',
          on_click: vm._exit_phemium_app
        });

      vm._alert_timeout_id = setTimeout( function()
      {
        phemiumApiConnector.request( 'consultations', 'get_expected_waiting_text', [ vm.consultation_model.id ], false )
          .then(function (waiting_text)
          {
            vm._average_waiting_text = waiting_text;
            phemiumApiConnector.request('portals_frontend', 'has_available_consultants_for_service', [vm.consultation_model.service.id], false)
              .then(function (has_available)
              {
                ClientLogger.info( 'Loading available consultants: ' + has_available );

                if( !has_available )
                {
                  vm._no_available_consultants();
                }
                else
                {
                  vm._show_pending_assignation();
                }
              })
              .catch( vm._no_available_consultants );
          } )
          .catch( function ( err )
          {
            ClientLogger.error( err );
          });
      }, 30000 );
    };



    /**
     * Set type communication channel
     *
     * @param {string} comm_channel
     */
    vm.set_comm_channel = function( comm_channel )
    {
      vm.channels.forEach( function( channel )
      {
        channel.selected = ( channel.channel === comm_channel );
      });

      vm.channel_selected = comm_channel;
    };



    /**
     * Continue button handler
     *
     */
    vm.continue = function()
    {
      if( !vm.channel_selected )
      {
        return;
      }

      LoadingService.show();

      vm.consultation_model.set_comm_channel( vm.channel_selected )
        .then( function()
        {
          $state.go( 'consultation_unassigned', { consultation: vm.consultation_model }, { reload: true } );
        });
    };



    /**
     * Show if consultation rejected
     *
     * @private
     */
    vm._on_rejected = function()
    {
      NotificationService.show_alert(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-alert-circled"></i>',
          subtitle: $translate.instant( 'consultation_reject' ),
          body: '',
          ok_text: $translate.instant( 'close' ),
          ok_type: 'button-positive',
          on_click: vm._exit_phemium_app
        });
    };



    /**
     * Check communication channel
     *
     * @private
     */
    vm._check_communication_channel = function()
    {
      clearTimeout( vm._alert_timeout_id );
      NotificationService.close();

      if( CommChannel.is_enabled( vm.consultation_model ) )
      {
        vm.consultant = vm.consultation_model.get_main_consultant();
        vm.consultation = vm.consultation_model.data;
        vm.mode = 'comm_channel_confirm';
      }
      else
      {
        $state.go( 'consultation.consultation_home', { consultation: vm.consultation_model } );
      }
    };



    /**
     * Show if not available consultants
     *
     * @private
     */
    vm._no_available_consultants = function()
    {
      clearTimeout( vm._alert_timeout_id );

      NotificationService.show_confirm(
        {
          css_class: 'phe-popup-error',
          title: '<i class="icon ion-information-circled"></i>',
          subtitle: $translate.instant( 'no_available_consultants_title' ),
          body: $translate.instant( 'no_available_consultants_body' ),
          ok_text: $translate.instant( 'retry' ),
          ok_type: 'button-positive ',
          cancel_text: $translate.instant( 'exit' ),
          cancel_type: 'button-assertive',
          on_ok: function()
          {
            vm._show_pending_assignation();
          },
          on_cancel: function()
          {
            vm._exit_phemium_app();
          }
        });
    };



    /**
     * Accept consultation
     */
    vm.accept_consultation = function()
    {
      vm.consultation_model.accept_comm_channel()
        .then( function()
        {
          $state.go( 'consultation_base', { consultation_id: vm.consultation_model.id } );
        });
    };



    /**
     * Reject consultation
     */
    vm.reject_consultation = function()
    {
      vm.consultation_model.reject_comm_channel()
        .then( vm._exit_phemium_app );
    };



    /**
     * Exit APP
     *
     * @private
     */
    vm._exit_phemium_app = function()
    {
      clearTimeout( vm._alert_timeout_id );

      if( $window.plugins && $window.plugins.PhemiumEnduserPlugin )
      {
        ClientLogger.info( 'Closing app and Faye' );
        phemiumCommunicator._faye_client.disconnect();
        UtilsService.exit_app();
      }
      else
      {
        $state.go( 'consultations_list' );
      }
    };



    vm._initialize();
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).factory( 'ConsultationService', ConsultationService );

  function ConsultationService
  (
    $rootScope,
    $q,
    $window,
    $filter,
    $timeout,
    $translate,
    ConsultationItemType,
    phemiumApiConnector,
    UtilsService,
    ConsultationResourcesService
  )
  {


      var selected_question_id = null;

      /**
       * Process consultation items from api_items
      * @param {Array} items
      * @return {Array} processed items
       */
      function process_consultation_items ( items )
      {
        // Check allowed types
        var raw_items = items;

        var items_processed = [];

        for (var i = 0; i < raw_items.length; i++)
        {

          if (raw_items[i].processed == true)
          {
            items_processed.push(raw_items[i]);
          }

          else {
            var item = raw_items[i];

            // Check resources
            var resources_processed = [];



            var item_processed =
              {
                id: item.id,
                type: item.type,
                creation_timestamp: item.creation_timestamp,
                status: item.status,
                upload_status: 1,
                message: item.message,
                data: item.data,
                resources: resources_processed,
                consultant: null,
                read_by_some_participant: item.read_by_some_participant,
                processed: true
              };

            items_processed.push(item_processed);

          }

        }

  // var pending_items = PendingUploadsManager.get_pending_uploads(this.consultation.id);
  // items_processed = items_processed.concat( pending_items );

        items_processed.sort(function (a, b)
        {
          a = parseInt(a.creation_timestamp);
          b = parseInt(b.creation_timestamp);
          return a - b;
        });

        return items_processed;

        // Check images to try to download
        if( UtilsService.platform !== 'browser' )
        {
          this.consultation.items.forEach( function (item)
          {
            item.resources.forEach( function (resource )
            {
              // If resource is image type and is new then download and save resource locally
              if (resource.type == 'image' && resource.local_path == null && window.cordova)
              {
                ConsultationResourcesService.download_and_save_resource(resource);
              }

            });

          });
        }
      };




    /**
     * Method to transform raw item from api to processed item function get_item_processed_from_raw_item( api_item )
     *
     * @param {Object} api_item
     * @return {Object}
     */
    function get_item_processed_from_raw_item( api_item )
    {
      // get consultant avatar
      var consultant = null;
      if( api_item.created_by_professional_id && this.consultation.data.consultants.length &&
        api_item.type != ConsultationItemType.CONSULTATION_SHARED && api_item.type != ConsultationItemType.STAGE_CHANGE && api_item.type != ConsultationItemType.WAITING_ROOM && api_item.type != ConsultationItemType.CARD_CHANGES && api_item.type != ConsultationItemType.CLOSED_CONSULTATION && api_item.type != ConsultationItemType.CANCELLED_CONSULTATION )
      {
        consultant = $filter('getById')( this.consultation.data.consultants, api_item.created_by_professional_id );
      }

      if( api_item.type == ConsultationItemType.STAGE_CHANGE )
      {
        api_item.data.stage = get_stage( api_item.data.stage.id );
      }

      if( api_item.type == ConsultationItemType.PROPOSAL )
      {
        api_item.processing = false;
      }

      // Check resources
      var resources = [];

      if( api_item.type == ConsultationItemType.FILE && api_item.data.resources_expanded && api_item.data.resources_expanded.length > 0 )
      {
        // index used to locate a resource in gallery
        api_item.data.resources_expanded.forEach( function( resource, index )
        {
          var resource_processed =
          {
            index: index,
            item_id: api_item.id,
            resource_id: resource.resource_id,
            thumbnail: null,
            url: resource.resource_url,
            local_path: null,
            type: null,
            name: $filter('filter')( resource.metadata, { id: 'original-filename' } )[ 0 ].value,
            downloading: false
          };

          if( resource.mime_type && (resource.mime_type.indexOf( 'image' ) >= 0 || resource.mime_type.indexOf( 'pdf' ) >= 0 ) )
          {
            resource_processed.type = resource.mime_type;

            if( resource.previews.length > 0 )
            {
              if( typeof resource.previews[ 1 ] == 'string' )
              {
                resource_processed.thumbnail = resource.previews[ 1 ];
              }
              else
              {
                resource_processed.thumbnail = resource.previews[ 1 ].url;
              }
            }
            else
            {
              var resource_preview = ( resource.resource_url ) ? resource.resource_url + '&size=medium' : $window.settings.environment.resources_url + resource.resource_id + '&size=medium';
              resource_processed.thumbnail = resource_preview;
            }
          }
          else if( resource.mime_type && resource.mime_type.indexOf( 'video' ) >= 0 )
          {
            if( resource.previews.length > 0 && resource.previews[ 1 ] )
            {
              resource_processed.thumbnail = resource.previews[ 1 ];
              resource_processed.type = 'video';
            }
            else
            {
              resource_processed.thumbnail = window.settings.theme_path + '/img/no-preview.jpg';
            }
          }
          else if( resource.mime_type && resource.mime_type.indexOf( 'pdf' ) >= 0 )
          {
            resource_processed.type = 'pdf';

            if( resource.previews.length > 0 )
            {
              if( typeof resource.previews[ 1 ] == 'string' )
              {
                resource_processed.thumbnail = resource.previews[ 1 ];
              }
              else
              {
                resource_processed.thumbnail = resource.previews[ 1 ].url;
              }
            }
          }
          else if( resource.mime_type && ( resource.mime_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || resource.mime_type === 'application/vnd.ms-office' || resource.mime_type === 'application/vnd.ms-excel' ) )
          {
            resource_processed.type = 'excel';
          }
          else if( resource.mime_type && ( resource.mime_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || resource.mime_type === 'text/html' ) )
          {
            resource_processed.type = 'word';
          }

          resources.push( resource_processed );
        });
      }

      var item_processed =
      {
        id: api_item.id,
        type: api_item.type,
        data: api_item.data,
        creation_timestamp: api_item.creation_timestamp,
        status: api_item.status,
        upload_status: 1,
        message: api_item.message,

        resources: resources,
        consultant: consultant,
        hold: false,
        tap: false,
        tapped: false,
        read_by_some_participant: api_item.read_by_some_participant
      };

      return item_processed;
    };



    /**
     * Method to handle consultant status change event
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    function _on_consultation_update( event, data )
    {

      if( !this.consultation || data.consultation.id != this.consultation.id || !data.item || this.allowed_types.indexOf( data.item.type ) == -1 )
      {
        return;
      }



      var item_processed = this.get_item_processed_from_raw_item( data.item );
      var event_type = null;

      if( $filter('filter')( this.consultation.items, { id: item_processed.id }).length > 0 )
      {
        this._update_item( item_processed );
        event_type = { type: 'item_updated', item_type: item_processed.type };
      }
      else
      {
        this.add_item( item_processed );
        this._check_image_resources( item_processed );
        event_type = { type: 'item_added', item_type: item_processed.type };
      }

      $rootScope.$emit( 'ConsultationService:consultation_update', event_type );


      // Retrieve items to modify read marks
      var list_options =
      {
        filters:
        [
          {
            column: 'consultation_item_id',
            operator: 'integer_equal',
            value: item_processed.id
          }
        ],
        page: 1,
        rows_per_page: 1
      };

      phemiumApiConnector.request( 'consultations', 'get_consultation_items', [ this.consultation.id, list_options, true ] );
    };



    /**
     *  Update item
     *  @param {Object} new_item
     */
    function _update_item( new_item )
    {
      // Update an item with new data
      for( var i = 0; i < this.consultation.items.length; i++ )
      {
        var item = this.consultation.items[ i ];

        if( item.id == new_item.id )
        {
          item.data = new_item.data;
          item.status = new_item.status;
          item.resources = new_item.resources;
          item.read_by_some_participant = new_item.read_by_some_participant;
          this.consultation.items[ i ] = item;
        }

        if( item.type == 21 && item.id == new_item.data.field_question_item_id )
        {
          item.status = 2; // set status 2 (answered)
        }

      }
    };



    /**
     *  Remove item
     *  @param {Number} item_id
     */
    function remove_item( item_id )
    {
      var items = [];

      //Remove item
      for( var i = 0; i < this.consultation.items.length; i++ )
      {
        var item = this.consultation.items[ i ];

        if( item.id != item_id )
        {
          items.push( item );
        }
      }

      this.consultation.items = items;
      $rootScope.$emit( 'ConsultationService:consultation_update', { type: 'item_updated' } );
    };



    /**
     * Check all image resources from an item to download
     */
    function _check_image_resources( item )
    {
      item.resources.forEach( function( new_resource )
      {
        if( new_resource.type == 'image' && new_resource.local_path == null && window.cordova )
        {
          ConsultationResourcesService.download_and_save_resource( new_resource );
        }
      });
    };



     var selectedQuestion = {};

    /**
     * Select Question to show in card_library_fields components
     *
     */
    function setSelectedQuestion( question )
    {
      selectedQuestion = question;
      $rootScope.$emit( 'ConsultationService:questionUpdated' );
    }



    var allowed_types =
    [
      ConsultationItemType.MESSAGE,
      ConsultationItemType.FILE,
      ConsultationItemType.PROPOSAL,
      ConsultationItemType.APPOINTMENT,
      ConsultationItemType.CALL,
      ConsultationItemType.CARD,
      ConsultationItemType.CARD_CHANGES,
      ConsultationItemType.STAGE_CHANGE,
      ConsultationItemType.CONSULTATION_SHARED,
      ConsultationItemType.CLOSED_CONSULTATION,
      ConsultationItemType.CANCELLED_CONSULTATION,
      ConsultationItemType.WAITING_ROOM,
      ConsultationItemType.FIELD_QUESTION,
      ConsultationItemType.FIELD_ANSWER

    ];

    var service = {
      allowed_types: allowed_types,
      remove_item: remove_item,
      get_item_processed_from_raw_item: get_item_processed_from_raw_item,
      process_consultation_items : process_consultation_items,
      selected_question_id: selected_question_id
    };

    //$rootScope.$on( 'Communicator:consultation_update', _on_consultation_update.bind( service ) );

    return service;
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.consultation' ).factory( 'ConsultationResourcesService', ConsultationResourcesService );

  function ConsultationResourcesService
  (
    $window,
    $filter,
    Utils,
    $rootScope
  )
  {

    /**
     * File transfer object to track download progress
     */
    var fileTransfer =
    {
      onprogress: null
    };


    /**
     * Returns processed resources
     *
     * @param {Object} item
     * @return {Array}
     */
    function get_processed_resources( item )
    {
      return service._process_resources( item );
    }



    /**
     * Process item resources
     *
     * @param {Object} item
     * @return {Array}
     * @private
     */
    function _process_resources( item )
    {
      if( item.data.resources_expanded )
      {
        return item.data.resources_expanded.map( function( resource, index )
        {
          if( resource.resource_id )
          {
            var res =
            {
              index: index,
              item_id: item.id,
              resource_id: resource.resource_id,
              thumbnail: null,
              url: resource.resource_url,
              type: null,
              name: $filter( 'filter' )( resource.metadata, { id: 'original-filename' } )[0].value,
              downloading: false
            };

            res.type = Utils.get_type_from_mime( resource.mime_type );
            res.thumbnail = ( resource.previews_expanded.length > 0 && resource.previews_expanded[2] ? resource.previews_expanded[2].url : window.settings.theme_path + '/img/no-preview.jpg' );

            switch( res.type )
            {
              case 'video':
                if( localStorage.getItem( 'resource_thumbnail_local_path:' + resource.resource_id ) )
                {
                  res.thumbnail = localStorage.getItem( 'resource_thumbnail_local_path:' + resource.resource_id );
                }
                break;

              case 'word':
                res.thumbnail = window.settings.theme_path + '/img/doc_icon.svg';
                break;

              case 'excel':
                res.thumbnail = window.settings.theme_path + '/img/excel_icon.svg';
                break;

              case 'unknown':
                res.thumbnail = window.settings.theme_path + '/img/file_unknown_icon.svg';
                break;

              case 'pdf':
                if( resource.previews_expanded.length > 0 && resource.previews_expanded[2] )
                {
                  res.thumbnail = resource.previews_expanded[2].url;

                  if( resource.previews_expanded[3] && resource.previews_expanded[3].url )
                  {
                    res.gallery_thumbnail = resource.previews_expanded[3].url;
                  }
                }
                else
                {
                  res.thumbnail = ( resource.resource_url ) ? resource.resource_url + '&size=medium' : window.settings.environment.resources_url + resource.resource_id + '&size=medium';
                }
                break;
            }
          }
          else
          {
            var res =
            {
              index: index,
              item_id: item.id,
              resource_id: null,
              thumbnail: null,
              url: null,
              local_path: null,
              type: null,
              name: $filter( 'filter' )( resource.metadata, { id: 'original-filename' } )[0].value,
              downloading: false
            };
          }

          // If same resource exists from the same item, do not add it again, just replace
          var found_resource_item_idx = null;
          service.resources.forEach( function( existing_resource, iteration_index )
          {
            if( parseInt( existing_resource.item_id ) === parseInt( item.id ) )
            {
              found_resource_item_idx = iteration_index;
            }
          });

          if( found_resource_item_idx !== null )
          {
            service.resources[ found_resource_item_idx ] = res;
          }
          else
          {
            service.resources.push( res );
          }

          return res;
        });
      }
    }



    /**
     * Check if resource has already been downloaded
     *
     * @param {Object} item
     * @return {Boolean}
     * @private
     */
    function _check_if_is_new_item( item )
    {
      item.data.resources_expanded.forEach( function( new_resource )
      {
        service.resources.forEach( function( service_resource )
        {
          if( new_resource.resource_id == service_resource.resource_id )
          {
            return true;
          }
        });
      });
      return false;
    }



    /**
     * Set local_path of resource
     *
     * @param {Number} new_resource_id
     * @param {String} new_resource_local_path
     */
    function set_resource_local_path( new_resource_id, new_resource_local_path )
    {
      service.resources.forEach( function( resource )
      {
       if( new_resource_id == resource.resource_id )
       {
         resource.local_path = new_resource_local_path;
       }
      });

    }



    /**
     * Download an save a resource locally
     * @param {Object} new_resource
     * @param {Object} callback
     */
    function download_and_save_resource( new_resource, callback )
    {
      //*************
      // Prepare data to download resource
      //*************
      $rootScope.$emit( 'ConsultationService:consultation_update', { type: 'item_updated' } );
      var trustHosts = true;
      var options = {};
      var dir = ( device.platform == 'iOS' ) ? cordova.file.syncedDataDirectory : cordova.file.externalApplicationStorageDirectory;
      var filename = service._clean_resource_name( new_resource.name );
      var targetPath = dir + filename;
      new_resource.url += "&disposition=attachment&filename=" + filename;
      var uri = encodeURI(new_resource.url);
      uri = uri.replace("http:","https:");

      //*************
      // FileTransfer download
      //*************
      service.fileTransfer = new FileTransfer();

      // Callbacks
      var successCallback = function( result )
      {
        var resource_local_path = 'resource_local_path:' + new_resource.resource_id;
        callback();
        $window.localStorage.setItem( resource_local_path, result.nativeURL );
        service.set_resource_local_path( new_resource.resource_id, result.nativeURL );

      };
      var errorCallback = function( error)
      {
        console.log(error);
      };

      // Download resource
      service.fileTransfer.download( uri, targetPath, successCallback, errorCallback, trustHosts, options );
  }


  /**
   * Cancel file transfer download
   */
  function abort_download()
  {
    service.fileTransfer.abort();
    service.filetransfer = null;
  }



  /**
   * Clean resource name
   *
   * @param {String} name
   * @return {String}
   */
  function _clean_resource_name( name )
  {
    var rExps=[
      {re:/[\xC0-\xC6]/g, ch:'A'},
      {re:/[\xE0-\xE6]/g, ch:'a'},
      {re:/[\xC8-\xCB]/g, ch:'E'},
      {re:/[\xE8-\xEB]/g, ch:'e'},
      {re:/[\xCC-\xCF]/g, ch:'I'},
      {re:/[\xEC-\xEF]/g, ch:'i'},
      {re:/[\xD2-\xD6]/g, ch:'O'},
      {re:/[\xF2-\xF6]/g, ch:'o'},
      {re:/[\xD9-\xDC]/g, ch:'U'},
      {re:/[\xF9-\xFC]/g, ch:'u'},
      {re:/[\xD1]/g, ch:'N'},
      {re:/[\xF1]/g, ch:'n'} ];

      for(var i=0, len=rExps.length; i<len; i++)
        name=name.replace(rExps[i].re, rExps[i].ch);

      return name.replace( / /g, '_' );

    }


    var service = {
      get_processed_resources: get_processed_resources,
      resources: [],
      set_resource_local_path: set_resource_local_path,
      download_and_save_resource: download_and_save_resource,
      _clean_resource_name: _clean_resource_name,
      abort_download: abort_download,
      fileTransfer: fileTransfer,
      _check_if_is_new_item: _check_if_is_new_item,
      _process_resources: _process_resources
    };

    return service;
  }
})();

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).factory( 'DialogService', DialogService )

  function DialogService(
    $rootScope,
    NotificationService,
    $translate
  )
  {

    var factory = {

      /**
       * Consultation object
       */
      consultation: null,


      /**
       * Item to save object
       */
      item_save: null,

      dialog_item: null,

      has_pending_questions: false,

      _prepare_events: function()
      {
        $rootScope.$on('on_question_sent', function(event, data){
          _on_question_sent();
        });
        
        $rootScope.$on('on_question_error', function(event, error){
          _save_data_error();
        });
      },


      /**
       * Save response
       *
       * @param {Object} item
       * @param {Object} response
       * @param {String} type_element
       */
      save_data: function ( response )
      {
        var item_save = {};

        if( this.dialog_item.data.data.field.type === "CALENDAR" || this.dialog_item.data.data.field.type === "REMOTE_CALENDAR" )
        {
          item_save =
          {
            "id": this.dialog_item.data.id,
            "consultation_id": this.consultation.id,
            "data": {
              "value": response.value,
              "text": response.text,
              "dialog_item_id": parseInt( this.dialog_item.data.data.dialog_item_id ) + 1
            }
          }
        }
        else if( this.dialog_item.data.data.field.type === "TEXT_INPUT" || this.dialog_item.data.data.field.type === "TEXTAREA" )
        {
          item_save =
          {
            "id": this.dialog_item.data.id,
            "consultation_id": this.consultation.id,
            "data": {
              "text": response,
              "value": response,
              "dialog_item_id": parseInt( this.dialog_item.data.data.dialog_item_id ) + 1
            }
          };
        }
        else if( this.dialog_item.data.data.field.key === "DORSIA_TREATMENT" )
        {
          item_save =
          {
            "id": this.dialog_item.data.id,
            "consultation_id": this.consultation.id,
            "data": {
              "text": this.showOptionValue (response ),
              "value": response.id,
              "dialog_item_id": parseInt( this.dialog_item.data.data.dialog_item_id ) + 1
            }
          };
        }
        else if (response.labels)
        {
          // FIELD
          item_save =
          {
            "id": this.dialog_item.data.id,
            "consultation_id": this.consultation.id,
            "data": {
              "value": response.value,
              "image_url": response.image_url,
              "text": this.showOptionValue (response ),
              "dialog_item_id": parseInt( this.dialog_item.data.data.dialog_item_id ) + 1
            }
          };
        }
        else
        {
          // ACTION
          item_save =
          {
            "id": this.dialog_item.data.id,
            "consultation_id": this.consultation.id,
            "data": {
              "value": response.key,
              "text": this.showActionValue( this.dialog_item.data.data.actions, response.key ),
              "dialog_item_id": parseInt( this.dialog_item.data.data.dialog_item_id ) + 1
            }
          };
        }

        this.item_save = item_save;
        factory.has_pending_questions = false;

        var question_button = Array.from(window.document.getElementsByClassName('timeline-item-question-button'));
        
        question_button.forEach((button)=>
        {
          if(button.parentNode)
          {
            button.parentNode.removeChild(button);
          }
        })

        this.consultation.send_question_answer( item_save );
      },



      /**
       * Show action value
       * @param {Array} data_actions
       * @param {String} key
       * @public
       * @returns {String}
       */
      showActionValue: function ( data_actions, key )
      {
        var texts = this.find_by_property( data_actions, 'key', key, 'texts' );
        return this.find_by_property( texts, 'id', 'es', 'value');
      },



      /**
       * Show option value
       * @param {Object} data_options
       */
      showOptionValue: function ( data_options )
      {
        var optionValue = null;
        if ( data_options.labels.length == 1 )
        {
          optionValue = this.find_by_property( data_options.labels, 'id', 'es', 'value' );
          //default value
          if( optionValue == null )
          {
            optionValue = data_options.labels[0].value;
          }
        } else {
          optionValue = this.find_by_property( data_options.labels, 'id', 'es', 'value' );
        }

        return optionValue;
      },



      /**
       * Finds an item by a property
       *
       * @param {Array} list
       * @param {String} property
       * @param {String} value
       * @param {String} value_to_return
       * @public
       * @returns {object}
       */
      find_by_property: function ( list, property, value, value_to_return )
      {
        var item = list.find( function ( item )
        {
          return item[property] == value;
        });
        return item ? item[value_to_return] : null;
      }
    }



    /**
     * Succes callback for send_question_answer
     *
     * @private
     */
    function _on_question_sent ()
    {
      $rootScope.$emit( 'QuestionDialogComponent:on_question_save', factory.item_save );
    }



    /**
    * Error callback for send_question_answer
    *
    * @private
    */
   function _save_data_error()
    {
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-ios-close-outline phe-red"></i>',
        subtitle: 'Error',
        body: $translate.instant( "cannot_save_data_text" ),
        ok_text: 'ok',
        ok_type: 'button-positive',
        on_click: null
      });
    };

    return factory;
  }
}());

(function()
{
  'use strict';

  angular.module( 'app.consultation' ).factory( 'MediaCapture', MediaCapture );

  function MediaCapture
  (
    $rootScope,
    $filter,
    $cordovaCamera,
    $cordovaFileTransfer,
    ConsultationService,
    Auth,
    PendingUploadsManager,
    ClientLogger,
    phemiumApiConnector,
    UtilsService
  )
  {

    var factory =
    {
      _upload_pending_file_id: null,
      _upload_pending_file_origin: null,
      _upload_pending_file_type: null,
      _upload_pending_file_entry: null,
      _is_pending_thumbnail_creation: false,
      _pending_thumbnail_path: null,
      _thumbnail_pending_file_id: null,
      _uploading_file_progress: null,
      _last_uploading_file_progress: null,



      /**
       * Set item thumbnail
       *
       * @param {Number} item_id
       * @param {String} thumbnail_path
       * @private
       */
      _update_thumbnail: function( item_id, thumbnail_path )
      {
        for( var i = 0; i < ConsultationService.consultation.items.length; i++ )
        {
          var m_item = ConsultationService.consultation.items[i];

          if( m_item.id == item_id )
          {
            ConsultationService.consultation.items[i].resources[0].thumbnail = thumbnail_path;
            PendingUploadsManager.update_pending_upload( vm.consultation.id, ConsultationService.consultation.items[i] );
          }
        }
      },



      /**
       * Save resource from capture dir to app storage
       *
       * @param {Object} item
       */
      _save_item_resources: function( item )
      {
        item.resources.forEach( function( resource )
        {
          window.resolveLocalFileSystemURL( resource.local_path, function( file_entry_capture )
          {
            var name = file_entry_capture.name;

            window.resolveLocalFileSystemURL( cordova.file.externalApplicationStorageDirectory, function( file_entry_storage )
            {
              file_entry_capture.copyTo
              (
                file_entry_storage,
                name,
                function( file_entry_storage_copied )
                {
                  window.localStorage.setItem( 'resource_local_path:' + resource.id, file_entry_storage_copied.nativeURL );
                }, function()
                {
                });
            }, function( error )
            {
              ClientLogger.error( 'Error saving a file resource', error );
            });
          });
        });
      },



      /**
       * Update uploaded item in items list
       *
       * @param {String} item_id
       */
      _add_new_item_to_list: function( item_id )
      {
        var transaction_id = phemiumApiConnector.get_last_transaction_id();

        for( var i = 0; i < ConsultationService.consultation.items.length; i++ )
        {
          var item = ConsultationService.consultation.items[ i ];

          if( item.id != transaction_id )
          {
            continue;
          }

          item.id = item_id;
          item.upload_status = 1;

          item.resources.forEach( function( resource, index )
          {
            item.resources[ index ].item_id = item_id;
          });

          ConsultationService.consultation.items[ i ] = item;
          $rootScope.$emit( 'ConsultationService:consultation_update', { type: 'item_added' } );
          return item;
        }
      },



      /**
       * Create video file thumbnail
       *
       * @private
       */
      _create_video_file_thumbnail: function()
      {
        this._thumbnail_pending_file_id = this._upload_pending_file_id;
        this._is_pending_thumbnail_creation = true;

        var dir = ( UtilsService.platform == 'iOS' ) ? cordova.file.syncedDataDirectory : cordova.file.externalApplicationStorageDirectory;

        var targetPath = dir + ConsultationService._clean_resource_name( this._upload_pending_file_entry.name ) + '.jpg';

        window.PKVideoThumbnail.createThumbnail(
          this._upload_pending_file_entry.nativeURL,
          targetPath,
          function( target )
          {
            this._update_thumbnail( this._thumbnail_pending_file_id, target );
            this._pending_thumbnail_path = target;
          },
          function()
          {
            this._is_pending_thumbnail_creation = false;
          });
      },



      /**
       * Android file object creation success handler
       *
       * @param {Object} file
       * @private
       */
      _android_on_file_object_creation_success: function( file )
      {
        //First check file size
        if( this._upload_pending_file_origin == 1 )
        {
          if( !this._check_max_file_size_allowed( file ) )
          {
            PendingUploadsManager.remove_pending_upload( ConsultationService.consultation.id, this._upload_pending_file_id );
            ConsultationService.remove_item( this._upload_pending_file_id );
            this._upload_pending_file_id = null;
            return;
          }
        }

        // If it is a video file create a thumbnail
        if( this._upload_pending_file_type == 'video' )
        {
          this._create_video_file_thumbnail();
        }

        var options =
        {
          fileName: file.name,
          params:
          {
            token: phemiumApiConnector.token,
            entity: 'resources',
            method: 'upload_resource',
            arguments: JSON.stringify( [ file.name ] )
          }
        };

        $cordovaFileTransfer.upload( phemiumApiConnector.url, file.localURL, options, true )
          .then(function( result )
          {
            var data = JSON.parse( result.response );
            var transaction_id = this._upload_pending_file_id;


            // Search item and update item_id
            for( var i = 0; i < ConsultationService.consultation.items.length; i++ )
            {
              var m_item = ConsultationService.consultation.items[ i ];

              if( m_item.id != transaction_id )
              {
                continue;
              }

              if( this._is_pending_thumbnail_creation )
              {
                //Save thumbnail in local storage associated to definitive resource id and clean all thumbnail data
                window.localStorage.setItem( 'resource_thumbnail_local_path:' + data.resource_id, this._pending_thumbnail_path );
                window.localStorage.removeItem( 'resource_thumbnail_local_path:' + this._thumbnail_pending_file_id );
                this._is_pending_thumbnail_creation = false;
                this._pending_thumbnail_path = null;
                this._thumbnail_pending_file_id = null;
              }

              // Rename item id and resource item id
              var new_transaction_id = (new Date()).getTime();
              m_item.id = new_transaction_id;
              m_item.resources[ 0 ].item_id = new_transaction_id;
              m_item.resources[ 0 ].resource_id = data.resource_id;
              m_item.resources[ 0 ].local_path = ( UtilsService.platform == 'Android' && this._upload_pending_file_origin == 1 ) ? file.localURL : m_item.resources[ 0 ].local_path;
              window.localStorage.setItem( 'resource_local_path:' + data.resource_id, m_item.resources[ 0 ].local_path );
              ConsultationService.consultation.items[ i ] = m_item;
              $rootScope.$emit( 'ConsultationService:consultation_update', { type: 'item_updated' } );

              // Create consultation item
              var item =
              {
                type: 2, // File
                consultation_id: ConsultationService.consultation.id,
                created_by_enduser_id: Auth.get_enduser_data().user_id,
                message: null,
                status: 1, // Unread
                data:
                {
                  resources:
                    [
                      {
                        id: data.resource_id,
                        value: file.name
                      }
                    ]
                }
              };

              phemiumApiConnector.request( 'consultations', 'add_item', [ item, true ], new_transaction_id )
                .then( function( item_id )
                {
                  var added_item = this._add_new_item_to_list( item_id );
                  this._save_item_resources( added_item );
                  PendingUploadsManager.remove_pending_upload( ConsultationService.consultation.id, this._upload_pending_file_id );
                  this._upload_pending_file_id = null;

                }, function( error )
                {
                  this._set_error_status_to_item( vm.upload_pending_file_id );
                  this._upload_pending_file_id = null;
                });

              break;
            }
          }.bind( this ),function( error )
          {
            this._set_error_status_to_item( this._upload_pending_file_id );
            this._upload_pending_file_id = null;
          }.bind( this ),function( progress )
          {
            var uploading_file_progress = parseInt( ( progress.loaded / progress.total ) * 100 );
            this._uploading_file_progress = uploading_file_progress;
            this._last_uploading_file_progress = uploading_file_progress;
          }.bind( this ));
      },



      /**
       * Android file object creation error handler
       *
       * @private
       */
      _android_on_file_object_creation_error: function()
      {
        this._set_error_status_to_item( this._upload_pending_file_id );
        this._upload_pending_file_id = null;
      },



      /**
       * Android resolve URL success handler
       *
       * @param {Object} fileEntry
       * @private
       */
      _android_on_resolve_local_file_system_url_success: function( fileEntry )
      {
        this._upload_pending_file_entry = fileEntry;

        fileEntry.file
        (
          this._android_on_file_object_creation_success.bind( this ),
          this._android_on_file_object_creation_error.bind( this )
        );
      },



      /**
       * Android resolve URL error handler
       *
       * @private
       */
      _android_on_resolve_local_file_system_url_error: function()
      {
        this._set_error_status_to_item( this._upload_pending_file_id );
        this._upload_pending_file_id = null;
      },



      /**
       * Android resolve path success handler
       *
       * @param {String} native_path
       * @private
       */
      _android_on_resolve_native_path_success: function( native_path )
      {
        this._android_upload_file( native_path, this._upload_pending_file_id, false );
      },



      /**
       * Android resolve path error handler
       *
       * @private
       */
      _android_on_resolve_native_path_error: function()
      {
        // TODO
      },



      /**
       * Android upload file
       *
       * @param {String} uri
       * @param {String} transaction_id
       * @param {Boolean} android_resolve_path
       * @private
       */
      _android_upload_file: function( uri, transaction_id, android_resolve_path )
      {
        this._upload_pending_file_id = transaction_id;

        window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;

        if( uri.indexOf( 'file:/' ) < 0 && !android_resolve_path )
        {
          uri = 'file://' + uri;
        }

        if( android_resolve_path )
        {
          window.FilePath.resolveNativePath(
            uri,
            this._android_on_resolve_native_path_success.bind( this ),
            this._android_on_resolve_native_path_error.bind( this )
          );
        }
        else
        {
          window.resolveLocalFileSystemURL(
            uri,
            this._android_on_resolve_local_file_system_url_success.bind( this ),
            this._on_android_resolve_local_file_system_url_error.bind( this )
          );
        }
      },



      /**
       * Android handler form pick image success callback
       *
       * @param {String} uri
       * @private
       */
      _android_on_pick_image_success: function( uri )
      {
        // Add item to current items list
        var transaction_id = (new Date()).getTime();
        var creation_timestamp = (new Date()).getTime()/1000;
        var item_processed =
        {
          id: transaction_id,
          type: 2, // File
          creation_timestamp: creation_timestamp,
          status: 1,
          upload_status: 2,
          message: null,
          is_first_in_day: false,
          resources:
          [
            {
              index: 0,
              item_id: transaction_id,
              resource_id: null,
              thumbnail: uri,
              url: uri,
              local_path: uri,
              type: 'image',
              downloading: false
            }
          ],
          consultant: null
        };

        ConsultationService.add_item( item_processed );
        PendingUploadsManager.add_pending_upload( ConsultationService.consultation.id, item_processed );

        this._upload_pending_file_origin = 1;
        this._upload_pending_file_type = 'image';
        this._android_upload_file( uri, transaction_id, true );
      },



      /**
       * Android pick image error handler
       *
       * @private
       */
      _android_on_pick_image_error: function()
      {
        // TODO
      },



      /**
       * Android method to upload image from gallery
       *
       * @private
       */
      _android_upload_image_from_gallery: function()
      {
        var options =
        {
          allowEdit: false,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          popoverOptions: CameraPopoverOptions,
          mediaType: Camera.MediaType.PICTURE
        };

        // Special options for Android 7.1, avoid app crash
        if( UtilsService.platform_camera_allowEdit === true )
        {
          options.allowEdit = true;
        }

        $cordovaCamera.getPicture( options ).then
        (
          this._android_on_pick_image_success.bind( this ),
          this._android_on_pick_media_error.bind( this )
        );
      },



      /**
       * Set status error to an item
       *
       * @param {String} transaction_id
       * @private
       */
      _set_error_status_to_item: function( transaction_id )
      {
        for( var i = 0; i < ConsultationService.consultation.items.length; i++ )
        {
          var m_item = ConsultationService.consultation.items[i];

          if( m_item.id == transaction_id )
          {
            ConsultationService.consultation.items[i].upload_status = 3;
          }
        }
      },



      /**
       * Checks max file size allowed
       *
       * @param {Object} file
       * @return {Boolean}
       * @private
       */
      _check_max_file_size_allowed: function( file )
      {
        if( this._upload_pending_file_type == 'image' && file.size > ( 5 * 1024 * 1024 ) )
        {
          return false;
        }

        if( this._upload_pending_file_type == 'video' && file.size > ( 50 * 1024 * 1024 ) )
        {
          return false;
        }

        return true;
      },



      /**
       * Upload image from gallery
       */
      upload_image_from_gallery: function()
      {
        if( UtilsService.platform.toLowerCase() === 'android' )
        {
          this._android_upload_image_from_gallery();
        }
        else if( UtilsService.platform.toLowerCase() === 'ios' )
        {
          //_ios_upload_image_from_gallery( data );
        }
        else if( UtilsService.platform === 'browser' )
        {
          //_browser_upload_image_from_gallery( data );
        }
      }
    };

    return factory;
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.enduser' ).controller( 'phemium.enduser.controllers.EnduserProfile', Controller );

  function Controller
  (
    $rootScope,
    $window,
    $http,
    Enduser,
    ConsultationService,
    $cordovaCamera,
    $cordovaFileTransfer,
    phemiumApiConnector,
    NetworkService,
    UtilsService
  )
  {
    /* jshint validthis: true */
    var vm = this;


    /**
     * True when updating avatar
     * @var {Boolean}
     */
    vm.updating_avatar = false;


    /**
     * Enduser object
     * @var {Object}
     */
    vm.enduser = {};



    /**
     * Method to staert
     */
    vm.on_avatar_click = function()
    {
      if( UtilsService.platform === 'browser' && NetworkService.isOnline() )
      {
        //Force input file click to trigger file selection
        var input_file = angular.element( document.querySelector( '#avatar_capture' ) )[0];
        input_file.click();
      }
      else if( ConsultationService.consultation.status_id != 2 && NetworkService.isOnline() )
      {
        var options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          popoverOptions: CameraPopoverOptions,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: false,
          targetWidth: 300,
          targetHeight: 300
        };

        // Special options for Android 7.1, avoid app crash
        if( UtilsService.platform_camera_allowEdit === true )
        {
          options.allowEdit = true;
        }

        $cordovaCamera.getPicture( options ).then( vm._on_take_picture_success, vm._on_take_picture_error );
      }
    };



    /**
     * If take picture successfully upload image to retrive resource id
     *
     * @param {String} uri
     * @private
     */
    vm._on_take_picture_success = function( uri )
    {
      vm.updating_avatar = true;
      vm._upload_file( uri );
    };



    /**
     * Handle take picture error
     * @private
     */
    vm._on_take_picture_error = function()
    {
    };



    /**
     * Image selected handler
     *
     * @param {Event} event
     * @private
     */
    vm._on_image_file_read = function( event )
    {
      if( event.target.files[0] )
      {
        vm.updating_avatar = true;
        _upload_browser_file( event.target.files[0] );
      }
    };



    /**
     * Method to upload enduser avatar from browser
     *
     * @param {Object} file
     * @private
     */
    function _upload_browser_file( file )
    {
      var fd = new FormData();
      fd.append('file', file );
      fd.append('token',phemiumApiConnector.token );
      fd.append('entity', 'resources' );
      fd.append('method', 'upload_resource' );
      fd.append('arguments', JSON.stringify( [ file.name ] ) );

      $http.post( phemiumApiConnector.url, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .success( function( response )
        {
          _on_browser_file_upload_success( response, file );
        });
    };


    /**
     * Function to update enduser avatar when upload is from browser
     *
     * @param {Object} result
     * @param {Object} file
     * @private
     */
    function _on_browser_file_upload_success( result, file )
    {
      var data = JSON.parse( result );
      var resource_id = data.resource_id;

      Enduser.enduser.picture_url = $window.settings.environment.resources_url + resource_id;
      Enduser.enduser.picture = resource_id;
      vm.enduser = Enduser.enduser;

      phemiumApiConnector.request( 'endusers', 'update_enduser', [ vm.enduser ]).then( function()
      {
        vm.updating_avatar = false;
      });
    };



    /**
     * Upload new enduser picture
     *
     * @param {String} uri
     * @private
     */
    vm._upload_file = function( uri )
    {
      $window.resolveLocalFileSystemURL = $window.resolveLocalFileSystemURL ||
        $window.webkitResolveLocalFileSystemURL;

      if( device.platform == 'iOS' && uri.indexOf( 'file://' ) < 0 )
      {
        uri = 'file://' + uri;
      }

      $window.resolveLocalFileSystemURL( uri, function( fileEntry )
      {
        var options =
        {
          fileName: fileEntry.name,
          params:
          {
            token: phemiumApiConnector.token,
            entity: 'resources',
            method: 'upload_resource',
            arguments: JSON.stringify( [ fileEntry.name ] )
          }
        };

        $cordovaFileTransfer.upload( phemiumApiConnector.url, fileEntry.nativeURL, options, true )
          .then(function( result )
          {
            var data = JSON.parse( result.response );
            var resource_id = data.resource_id;

            Enduser.enduser.picture_url = $window.settings.environment.resources_url + resource_id;
            Enduser.enduser.picture = resource_id;
            vm.enduser = Enduser.enduser;

            phemiumApiConnector.request( 'endusers', 'update_enduser', [ vm.enduser ]).then( function()
            {
              vm.updating_avatar = false;
            });
          }, function( error )
          {
            ClientLogger.error( 'Error capturing a picture for user profile', error );
          });
      });
    };



    /**
     * Initialize method
     * @private
     */
    vm._initialize = function()
    {
      vm.enduser = Enduser.enduser;
    };

    vm._initialize();
  }
})();

(function(){
  'use strict';

  angular.module( 'app' ).controller( 'phemium.consultation.controllers.FloatingSideWindow', fswCtrl )

  function fswCtrl(
    $scope,
    $rootScope,
    $state,
    ClientLogger,
    $sce,
    ngToast
  )
  {
      var self = this;

      // Cached view, so we need to run code when entering
      $scope.$on( '$ionicView.enter', function( event )
      {
        init();
      });

      // Add a event listener every time the consultations receive a new item to aware the user
      $scope.$on( '$ionicView.loaded', function()
      {
        var add_item_listener = $rootScope.$on( 'Consultation:' + $state.params.consultation.id  + ':add_item', function()
        {
          self.new_messages++;
        });

        $scope.$on( '$destroy', function()
        {
          add_item_listener();
        });
      });


      function init()
      {
        var fswItem = $state.params.fswItem;
        self.consultation = $state.params.consultation;
        self.new_messages = 0;
        self.title = typeof fswItem.title ===  "string" ? fswItem.title : fswItem.url;

        if( fswItem.url != undefined )
        {
          self.currentFswItem =  {
            url: fswItem.url,
            showIFrame: true,
            title: fswItem.title,
            description: fswItem.description,
            image: fswItem.image
          };
        }

        //Control if url contains 'http://' or 'https://' in url string
        if(self.currentFswItem.url.indexOf("http://") == -1 && self.currentFswItem.url.indexOf("https://") == -1)
        {
          self.currentFswItem.url = "https://" + self.currentFswItem.url;
        }

        self.currentFswItem.trustedUrl = $sce.trustAsResourceUrl( self.currentFswItem.url );
        addView();
        setVisibility( true );
        dissmissToast();
      }



      /**
       * Function used to know which fswItem will show when entering
       * @param {boolean} show
       */
      function setVisibility( show )
      {
        self.consultation.fswItems.forEach(
          function( item ) {
            if( self.currentFswItem.url == item.url )
            {
              item.showIFrame = show;
            }
            else
            {
              item.showIFrame = false;
            }
          });
      }



      /**
       * It adds a new fswItem into the fsItems array checking before if it already exists
       */
      function addView()
      {
        var exists = false;
        //if (self.consultation.fswItems == undefined) self.consultation.fswItems = [];

        for( var i = 0; i < self.consultation.fswItems.length; i++ )
        {
          if( self.consultation.fswItems[i].url == self.currentFswItem.url )
          {
            exists = true;
          }
        }
        if( !exists )
        {
          self.consultation.fswItems.push( self.currentFswItem );
        }
      }

      /**
       * Function used to clean all toast from consultation_home view
       */
      function dissmissToast()
      {
        var i = 0;

        do
        {
          ngToast.dismiss( self.consultation.fswItems[i].toast );
          self.consultation.fswItems[i].toast = undefined;
          i++;
        }
        while( i < self.consultation.fswItems.length );
     }


      /**
       * Go to back action
       */
      self.back = function()
      {
        // HIDE CURRENT VIEW
        setVisibility(false);
        $state.go( 'consultation.consultation_home', { consultation: self.consultation } );
      };

      /**
       * Remove current view
       */
      self.close = function()
      {
        var removed = false;
        var i = 0;
        do{
          if( self.consultation.fswItems[i].url == self.currentFswItem.url )
          {
            self.consultation.fswItems.splice( i, 1 );
            removed = true;
          }
          i++;
        }while( !removed );

        $state.go( 'consultation.consultation_home', { consultation: self.consultation } );
      };
  }
}());

(function()
{
  'use strict';

  angular.module( 'app.login' ).controller( 'phemium.login.controllers.Login', Controller );

  function Controller
  (
    $state,
    $translate,
    $rootScope,
    Settings,
    Auth
  )
  {
    /* jshint validthis: true */
    var vm = this;

    var is_asmedit = ( Settings.params.customer_name && Settings.params.customer_name.toLowerCase().indexOf( 'asmedit' ) > -1 );
    var is_asmedit_boadilla = ( is_asmedit && Settings.params.portal_name && Settings.params.portal_name.toLowerCase().indexOf( 'boadilla' ) > -1 );
    var is_asmedit_securitas = ( is_asmedit && Settings.params.portal_name && Settings.params.portal_name.toLowerCase().indexOf( 'securitas' ) > -1 );



    /**
     * Constructor
     *
     * @private
     */
    vm._constructor = function()
    {
      vm.show_logo_footer = Settings.params.face2face_show_logo_footer || false;
      vm.is_f2f = Settings.params.face2face;

      if( is_asmedit_boadilla )
      {
        vm.login_fields =
        [
          {
            text: $translate.instant( 'first_child_birthdate' ) + ' (DD/MM/AAAA)',
            type: 'text',
            value: ''
          },
          {
            text: $translate.instant( 'activation_code' ),
            type: 'password',
            value: ''
          }
        ];
      }
      else if( is_asmedit_securitas )
      {
        vm.login_fields =
        [
          {
            text: $translate.instant( 'activation_code' ),
            type: 'password',
            value: ''
          }
        ]
      }
      else if( is_asmedit )
      {
        vm.login_fields =
        [
          {
            text: $translate.instant( 'cif' ),
            type: 'text',
            value: ''
          }
        ];
      }
      else
      {
        vm.login_fields =
        [
          {
            text: $translate.instant( 'email' ),
            type: 'text',
            value: ''
          },
          {
            text: $translate.instant( 'password' ),
            type: 'password',
            value: ''
          }
        ];
      }

      vm.error_text = '';
    };

    /**
     * Function fired everytime any input changes
     */
    vm.input_change = function()
    {
      vm.error_text = '';
    }

    /**
     * Login
     */
    vm.login = function()
    {
      vm.error_text = '';
      var login;

      if( is_asmedit_boadilla )
      {
        var birthdate = vm.login_fields[0].value;
        var activation_code = vm.login_fields[1].value.toLowerCase();
        var external_id = ( activation_code + '-' + birthdate.replace( /\//g, '' ) );
        login = Auth.login_by_external_id( external_id, activation_code );
      }
      else if( is_asmedit || is_asmedit_securitas )
      {
        login = Auth.login_by_external_id( vm.login_fields[0].value, vm.login_fields[0].value );
      }
      else
      {
        login = Auth.login( vm.login_fields[0].value, vm.login_fields[1].value );
      }

      login
      .then( function()
      {
        $rootScope.logout = false;
        $state.go( 'bootstrap' );
      })
      .catch( function()
      {
        vm.error_text = $translate.instant( 'login_error' );
      });
    };



    vm._constructor();
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.login' ).controller( 'phemium.login.controllers.Logout', Controller );

  function Controller
  (
    Auth
  )
  {
    /* jshint validthis: true */
    var vm = this;



    /**
     * Initialize
     *
     * @private
     */
    vm._initialize = function()
    {
      Auth.logout()
        .then( function()
        {
          location.reload();
        });
    };



    vm._initialize();
  }
})();

(function()
{
    'use strict';

    angular.module( 'app.remote_list' ).controller( 'phemium.consultation.controllers.RemoteListController', RemoteListController )

    function RemoteListController(
      $scope,
      $rootScope,
      $state,
      ClientLogger
    )
    {
        var self = this;
        

        function init()
        {
          self.item = $state.params.item;
          self.consultation = $state.params.consultation;
        }



        /**
         * Go to back action
         */
        self.back = function()
        {
            $state.go( 'consultation.consultation_home', { consultation: self.consultation } );
            return;
        }

        init();
    }

}());

(function()
{
  'use strict';

  angular.module( 'app.sdk.core' ).factory( 'phemiumApiConnector', phemiumApiConnector );

  function phemiumApiConnector
  (
    $http,
    $rootScope
  )
  {
    var _last_transaction_id = null;

    return {

      /**
       * API endpoint
       *
       * @var {String}
       */
      url: null,


      /**
       * API token
       *
       * @var {String}
       */
      token: null,



      /**
       * Create api request
       *
       * @param {String} entity
       * @param {String} method
       * @param {Array} args
       * @param {Number=} transaction_id
       * @return {Promise}
       */
      request: function( entity, method, args, transaction_id )
      {
        return new Promise( function( resolve, reject )
        {
          var data =
          {
            entity: entity,
            method: method,
            arguments: angular.toJson( args ),
            format: 'json',
            transaction_id: transaction_id || ( new Date() ).getTime()
          };

          if( this.token !== null )
          {
            data.token = this.token;
          }

          // Used request id just to easy identify each call with Developer Tools network panel
          var request_id = entity + '-' + method;

          var options =
          {
            url: this.url + '?rid=' + request_id,
            method: 'post',
            headers:
            {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function( obj )
            {
              var str = [];
              for( var p in obj )
              {
                str.push( encodeURIComponent( p ) + '=' + encodeURIComponent( obj[ p ] ) );
              }
              return str.join( '&' );
            },
            data: data,
            extra_data: data
          };

          $http( options )
            .then(
              function( response )
              {
                _last_transaction_id = response.config.extra_data.transaction_id;

                if( response.data && response.data.error )
                {
                  $rootScope.$emit( 'phemiumApiConnector:request_error', response );
                  reject( response.data );
                }
                else
                {
                  resolve( response.data );
                }
              },
              function( response )
              {
                _last_transaction_id = response.config.extra_data.transaction_id;

                var error =
                {
                  error: true,
                  transaction_id: response.config.extra_data.transaction_id,
                  message: 'Unknown error',
                  code: null,
                  type: ''
                };

                $rootScope.$emit( 'phemiumApiConnector:request_error', response );
                reject( error );
              }
            );
        }.bind( this ) );
      },



      /**
       * Method to retrieve last transaction id
       *
       * @return {Number}
       */
      get_last_transaction_id: function()
      {
        return _last_transaction_id;
      }

    };
  }

})();



(function()
{
  'use strict';

  angular.module( 'app.sdk.core' ).factory( 'ClientLogger', ClientLogger );

  function ClientLogger
  (
    phemiumApiConnector,
    Utils
  )
  {
    return {

      /**
       * Saves messages that are not sent
       *
       * @var {Array}
       * @private
       */
      _data_send: [],



      /**
       * Start the client logger
       */
      start: function()
      {
        this._send_log_bucle();
      },



      /**
       * Debug
       *
       * @param {String} msg
       * @param {Object=} data
       */
      debug: function( msg, data )
      {
        this._add_log( 'debug', msg, data );
      },



      /**
       * Info
       *
       * @param {string} msg
       * @param {object} data
       */
      info: function( msg, data )
      {
        this._add_log( 'info', msg, data );
      },



      /**
       * Warn
       *
       * @param {string} msg
       * @param {object} data
       */
      warn: function( msg, data )
      {
        this._add_log( 'warn', msg, data );
      },



      /**
       * Error
       *
       * @param {string} msg
       * @param {object} data
       */
      error: function( msg, data )
      {
        this._add_log( 'error', msg, data );
      },



      /**
       * Saves messages that are not sent
       *
       * @param {string} level
       * @param {string} msg
       * @param {object=} data
       * @private
       */
      _add_log: function( level, msg, data )
      {
        var arr_data = [ level, msg, Date.now() ];

        if( typeof data !== 'undefined' )
        {
          arr_data.push( data );
        }

        this._data_send.push( arr_data );
        console.log( msg, data );

        // if( level === 'error' )
        // {
        //   this._send_log();
        // }
      },



      /**
       * Bucle sending logs
       *
       * @private
       */
      _send_log_bucle: function()
      {
        setTimeout( function()
        {
          this._send_log();
          this._send_log_bucle();
        }.bind( this ), 10000 );
      },



      /**
       * Send log
       *
       * @private
       */
      _send_log: function()
      {

        if( this._data_send.length === 0 || phemiumApiConnector.token == null )
        {
          return;
        }

        var events = this._data_send.map( function( data )
        {
          return {
            client_uuid: this.get_client_uuid(),
            location: 'phemium-endusers-app',
            level: data[0],
            message: data[1],
            user_timestamp: data[2],
            extra_data: data[3]
          };
        }.bind( this ) );

        phemiumApiConnector.request( 'events', 'add_enduser_navigator_events', [ events ] );
        this._data_send = [];
      },



      /**
       * Returns the client UUID
       *
       * @return {string}
       */
      get_client_uuid: function()
      {
        var uuid = localStorage.getItem( 'client_uuid' ) || Utils.generate_uuid();
        localStorage.setItem( 'client_uuid', uuid );
        return uuid;
      }
    };
  }

})();



(function()
{
  'use strict';

  angular.module( 'app.sdk.core' ).factory( 'phemiumCommunicator', phemiumCommunicator );

  function phemiumCommunicator
  (
    $rootScope,
    md5,
    Auth,
    Utils,
    ClientLogger
  )
  {
    return {

      EVENT_CONNECTED: 'Communicator:connected',
      EVENT_UNABLE_TO_LOAD: 'Communicator:unable_to_load',
      EVENT_TRANSPORT_DOWN: 'Communicator:transport_down',
      EVENT_TRANSPORT_UP: 'Communicator:transport_up',


      /**
       * Faye client object
       *
       * @var {Faye.Client}
       * @private
       */
      _faye_client: null,



      /**
       * Initialize communicator
       *
       * @param {String} url
       */
      initialize: function( url )
      {
        try
        {
          this._faye_client = new Faye.Client( url );

          // Fix errors with 3G connections disabling websockets (only for Cordova mobile apps)
          if( window.cordova )
          {
            this._faye_client.disable( 'websocket' );
          }

          this._faye_client.bind( 'transport:down', this._on_transport_down, this );
          this._faye_client.bind( 'transport:up', this._on_transport_up, this );

          this._faye_client.addExtension(
          {
            outgoing: function( message, callback )
            {
              if( !message.ext )
              {
                message.ext = {};
              }

              message.ext.token = Auth.get_token();
              message.ext.client_uuid = Utils.generate_uuid();

              message.ext.presence_options =
              {
                device_info:
                {
                  user_agent: navigator.userAgent,
                  model: window.cordova ? window.device.model : null,
                  platform: window.cordova ? window.device.platform : null,
                  uuid: window.cordova ? window.device.uuid : ClientLogger.get_client_uuid(),
                  version: window.cordova ? window.device.version : null,

                },
                app_info:
                {
                  name: window.settings.package_name,
                  version: window.settings.version
                }
              };

              callback( message );
            }
          });

          this._faye_client.connect( this._on_connected, this );
        }
        catch( e )
        {
          $rootScope.$emit( this.EVENT_UNABLE_TO_LOAD );
        }
      },



      /**
       * Subscribe to channel
       *
       * @param {String} channel
       */
      join_channel: function( channel )
      {
        var channelEncrypted = md5.createHash( channel );
        this._faye_client.subscribe( '/' + channelEncrypted, this._on_message_received, this );
      },



      /**
       * Cancel subscription to a channel
       *
       * @param {String} channel
       */
      leave_channel: function( channel )
      {
        var channelEncrypted =  md5.createHash( channel );
        this._faye_client.unsubscribe( '/' + channelEncrypted, this._on_message_received, this );
      },



      /**
       * Send message to a channel
       *
       * @param {String} channel
       * @param {Object} data
       */
      send: function( channel, data )
      {
        // Add unique message id to data
        data.id = md5.createHash( String( new Date().getTime() + Math.random() ) );

        // Convert data to message protocol
        var message = { text: JSON.stringify( data ) };

        var channelEncrypted =  md5.createHash( channel );
        this._faye_client.publish( '/' + channelEncrypted, message );
      },



      /**
       * On connected handler
       *
       * @private
       */
      _on_connected: function()
      {
        $rootScope.$emit( this.EVENT_CONNECTED );
      },



      /**
       * On transport down handler
       *
       * @private
       */
      _on_transport_down: function()
      {
        $rootScope.$emit( this.EVENT_TRANSPORT_DOWN );
      },



      /**
       * On transport up handler
       *
       * @private
       */
      _on_transport_up: function()
      {
        $rootScope.$emit( this.EVENT_TRANSPORT_UP );
      },



      /**
       * On message received handler
       *
       * @param {Object} message
       * @private
       */
      _on_message_received: function( message )
      {
        var event = JSON.parse( message.text );
        console.log( '[Communicator] Event: ' + event.name, event );

        // Fire original event
        $rootScope.$emit( event.name, event.data || null );

        if( !event.aliases )
        {
          return;
        }

        event.aliases.forEach( function( alias )
        {
          $rootScope.$emit( alias, event.data || null );
        });
      }
    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.core' ).factory( 'Decrypt', Decrypt );

  function Decrypt(
    $location,
    phemiumApiConnector
  )
  {
    return {
      decrypt_url: decrypt_url
    };

    
    
    /**
     * Decrypt current URL Query string
     *
     * @return {Promise}
     * @public
     */
    function decrypt_url()
    {
      var query_url = window.location.search;
      var params = [];

      query_url = query_url.replace( "?", '' );
      query_url = decodeURI( query_url );
      
      params.push( query_url );
      return phemiumApiConnector.request( 'login' , 'login_with_access_token' , params, false );
    }
  }
})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.core' ).factory( 'SupportsService', SupportsService );

  function SupportsService()
  {
    return {

      /**
       * Returns if WebGL is supported or not
       *
       * @return {Boolean}
       */
      is_webgl_supported: function()
      {
        if( !!window.WebGLRenderingContext )
        {
          var canvas = document.createElement( 'canvas' );
          var names = [ 'webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d' ];
          var context = false;

          for( var i = 0; i < 4; i++ )
          {
            try
            {
              context = canvas.getContext( names[ i ] );

              if( context && typeof context.getParameter == 'function' )
              {
                return true;
              }
            } catch( e ){}
          }
        }

        return false;
      },



      /**
       * Returns is VoIP Push notification is supported or not
       *
       * @return {Boolean}
       */
      is_voip_push_notifications_supported: function()
      {
        return true;

        // var supports_voip_push_notifications = true;
        //
        // if( cordova.plugins.notification.local.hasPermission() && ionic.Platform.isIOS() )
        // {
        //   cordova.plugins.diagnostic.isRemoteNotificationsEnabled(
        //     function( isEnabled )
        //     {
        //       supports_voip_push_notifications = isEnabled;
        //     },
        //     function( error )
        //     {
        //       supports_voip_push_notifications = true;
        //       ClientLogger.info( 'Error isRemoteNotificationsEnabled', error  );
        //     });
        // }
        // else
        // {
        //   supports_voip_push_notifications = true;
        // }
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.core' ).factory( 'Utils', Utils );

  function Utils
  (
    Settings
  )
  {
    return {

      /**
       * Generates an UUID
       *
       * @return {string}
       */
      generate_uuid: function()
      {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c )
        {
          var r = ( d + Math.random() * 16 ) % 16 | 0;
          d = Math.floor( d / 16 );
          return ( c === 'x' ? r : (r&0x3|0x8)).toString(16);
        });
      },



      /**
       * Returns type from given mime
       *
       * @param {String} mime
       * @return {String}
       */
      get_type_from_mime: function( mime )
      {
        if( mime.indexOf( 'image' ) >= 0 )
        {
          return 'image';
        }

        if( mime.indexOf( 'video' ) >= 0 )
        {
          return 'video';
        }

        if( mime.indexOf( 'pdf' ) >= 0 )
        {
          return 'pdf';
        }

        if( mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            mime === 'application/vnd.ms-office' ||
            mime === 'application/vnd.ms-excel' ||
            mime === 'application/octet-stream' )
        {
          return 'excel';
        }

        if( mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            mime === 'text/html' ||
            mime === 'application/msword' )
        {
          return 'word';
        }

        return 'unknown';
      },



      /**
       * Returns if the F2F requires login or not
       * TODO: It must be retrieved from portal configuration (access control)
       *
       * @return {boolean|null}
       */
      is_f2f_with_login: function()
      {
        var is_asmedit = ( Settings.params.customer_name && Settings.params.customer_name.toLowerCase().indexOf( 'asmedit' ) > -1 );
        var is_asmedit_boadilla = ( is_asmedit && Settings.params.portal_name && Settings.params.portal_name.toLowerCase().indexOf( 'boadilla' ) > -1 );
        var is_asmedit_securitas = ( is_asmedit && Settings.params.portal_name && Settings.params.portal_name.toLowerCase().indexOf( 'securitas' ) > -1 );

        return ( is_asmedit_boadilla || is_asmedit || is_asmedit_securitas );
      }

    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).filter( 'getById', getById );

  /**
   * Filters objects array by object.id attr
   *
   * @returns {Function}
   */
  function getById()
  {
    return function( inputs, id )
    {
      for( var i = 0; i < inputs.length; i++ )
      {
        if( +inputs[i].id === +id )
        {
          return inputs[i];
        }
      }

      return null;
    };
  }
})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).filter( 'getByQuestionItemId', getByQuestionItemId );

  /**
   * Filters objects array by object.id attr
   *
   * @returns {Function}
   */
  function getByQuestionItemId()
  {
    return function( inputs, id, checkUIItem )
    {
      var answer_id = 'A-'+id;

      if(checkUIItem == false){
          for( var i = 0; i < inputs.length; i++ )
        {
          if( inputs[i].id === answer_id )
          {
            return inputs[i];
          }
        }
      }else if (checkUIItem == true){
        for( var i = 0; i < inputs.length; i++ )
        {
          if( inputs[i].data.id === answer_id )
          {
            return inputs[i];
          }
        }
      }
      return null;
    };
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Auth', Auth );

  function Auth
  (
    phemiumApiConnector,
    ClientLogger,
    Settings,
    Decrypt,
    UtilsService
  )
  {
    return {

      /**
       * Login
       *
       * @param {string} login
       * @param {string} password
       * @return {Promise}
       */
      login: function( login, password )
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          phemiumApiConnector.token = null;

          phemiumApiConnector
            .request( 'login', 'login_enduser', [ login, password, Settings.params.customer_id ] )
            .then( function( enduser_login_data )
            {
              self.set_enduser_data( enduser_login_data.user_data );
              phemiumApiConnector.token = enduser_login_data.token;
              resolve();
            })
            .catch( reject );
        });
      },



      /**
       * Login by external id
       *
       * @param {string} external_id
       * @param {string} password
       * @return {Promise}
       */
      login_by_external_id: function( external_id, password )
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          phemiumApiConnector.token = null;

          phemiumApiConnector
            .request( 'login', 'login_enduser_by_external_id', [ external_id, password, Settings.params.customer_id ] )
            .then( function( enduser_login_data )
            {
              self.set_enduser_data( enduser_login_data.user_data );
              phemiumApiConnector.token = enduser_login_data.token;
              resolve();
            })
            .catch( reject );
        });
      },



      /**
       * Logout
       *
       * @return {Promise}
       */
      logout: function()
      {
        var self = this;

        return new Promise( function( resolve )
        {
          phemiumApiConnector.request( 'login', 'logout', [] )
            .then( function()
            {
              ClientLogger.info( 'Logout' );
              self.clear_enduser_data();
              resolve();
            });
        });
      },



      /**
       * Checks auth for browser mode using query string url
       *
       * @return {Promise}
       */
      _webapp_authentication: function()
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          self._read_url_params()
            .then( self._login_by_token.bind( self ) )
            .then( resolve )
            .catch( reject );
        });
      },



      /**
       * Checks auth for plugin mode
       *
       * @return {Promise}
       */
      _plugin_authentication: function()
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          var token = self.get_token();

          if( !token )
          {
            resolve( false );
            return;
          }

          phemiumApiConnector.token = token;

          phemiumApiConnector.request( 'login', 'get_user_data_by_token', [ token ] )
            .then( function( user_data )
            {
              if( user_data.access_type != 'enduser' )
              {
                resolve( false );
                return;
              }

              ClientLogger.info( 'Login with token', user_data );
              self.set_enduser_data( user_data );
              Settings.params.customer_id = user_data.customer_id;
              Settings.params.customer_name = user_data.customer_name;
              resolve( true );
              return;
            })
            .catch( function( reason )
            {
              ClientLogger.error( 'Error check auth for plugin mode', reason );
              self.clear_enduser_data();
              reject( reason );
              return;
            });
        });
      },



      /**
       * Checks auth (checks if the token is valid)
       *
       * @return {Promise}
       */
      is_valid_auth: function()
      {
        if( UtilsService.platform === 'browser' )
        {
          return this._webapp_authentication();
        }
        else
        {
          return this._plugin_authentication();
        }
      },



      /**
       * Decrypt current URL query string
       *
       * @return {Promise}
       */
      _read_url_params: function()
      {
        return Decrypt.decrypt_url()
          .then( function( response )
          {
            var token =  response.token;
            var consultation_id = response.url_crypted_parameters.consultation_id;
            Settings.params.enduser_token = token;
            Settings.params.consultation_id = consultation_id;
            Settings.params.portal_name = response.portal.name;
            Settings.params.customer_id = response.customer.id;
            Settings.params.customer_name = response.customer.name;
            Settings.params.theme = response.customer.branding.layout;
            Settings.params.open_urls_target = response.url_crypted_parameters.open_urls_target || "fsw";
            Settings.params.no_redirect = ( response.url_crypted_parameters.no_redirect === "true" );
            Settings.params.hide_header = ( response.url_crypted_parameters.hide_header === "true" );
            
            // Overwrite default theme_path
            if( Settings.params.theme )
            {
              window.settings.theme_path = 'themes/' + Settings.params.theme;
            }

            window.settings.language_code = Settings.calculate_language( response.portal.default_language_code );

            return;
          });
      },



      /**
       * Decrypt current URL query string
       *
       * @return {Promise}
       */
      _login_by_token: function()
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          var token = self.get_token();

          if( !token )
          {
            reject( 'Token not found.' );
            return;
          }

          phemiumApiConnector.token = token;

          phemiumApiConnector.request( 'login', 'get_user_data_by_token', [ token ] )
            .then( function( user_data )
            {
              if( user_data.access_type !== 'enduser' )
              {
                var log_message = 'Login failed. login.get_user_data_by_token using ' + token + '. ';
                log_message += ' Response: ' + JSON.stringify( user_data );
                ClientLogger.info( log_message );
                reject( 'Invalid access_type' );
                return;
              }

              ClientLogger.info( 'Login with token', user_data );
              self.set_enduser_data( user_data );
              resolve( true );
            })
            .catch( function( reason )
            {
              ClientLogger.error( 'Error Login by token', reason );
              self.clear_enduser_data();
              reject( reason );
              return;
            });
        });
      },



      /**
       * Sets user data
       *
       * @param {Object} enduser_data
       */
      set_enduser_data: function( enduser_data )
      {
        localStorage.setItem( this._get_storage_key(), JSON.stringify( enduser_data ) );
        window.settings.token = enduser_data.token;
      },



      /**
       * Returns user data
       *
       * @return {Object}
       */
      get_enduser_data: function()
      {
        try
        {
          return JSON.parse( localStorage.getItem( this._get_storage_key() ) );
        }
        catch( exc )
        {
          return null;
        }
      },



      /**
       * Clears enduser data
       */
      clear_enduser_data: function()
      {
        localStorage.removeItem( this._get_storage_key() );
        window.settings.token = null;
      },



      /**
       * Returns the storage key
       *
       * @returns {String}
       * @private
       */
      _get_storage_key: function()
      {
        //return 'patient_portal_mobile_' + window.settings.customer_id + '_' + window.settings.portal.id + '-enduser_data';
        return 'patient_portal_mobile_X-enduser_data';
      },



      /**
       * Returns the token
       *
       * @return {String}
       */
      get_token: function()
      {
        if( Settings.params.enduser_token )
        {
          return Settings.params.enduser_token;
        }

        if (phemiumApiConnector.token) {
          return phemiumApiConnector.token;
        }
        else if( this.get_enduser_data() )
        {
          return this.get_enduser_data().token;
        }

        return null;
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'CommChannel', CommChannel );

  function CommChannel()
  {
    return {

      /**
       * Returns available channels
       *
       * @param {Object} consultation_model
       * @return {Array}
       */
      get_channels: function( consultation_model )
      {
        // Maximum level of communication channel allowed by portal
        switch( consultation_model.service.communication_channel )
        {
          case 'im':
            return [ 'im' ];

          case 'audio':
            return [ 'audio', 'im' ];

          default: // max level by default
            return [ 'video', 'audio', 'im' ];
        }
      },



      /**
       * Get lowest available level
       *
       * @param {String} enduser_channel
       * @param {String} consultant_channel
       */
      get_lowest_available_level: function( enduser_channel, consultant_channel )
      {
        // User have greater level
        if( enduser_channel === 'video' && ( consultant_channel === 'audio' || consultant_channel === 'im' ) )
        {
          return consultant_channel;
        }

        if( enduser_channel === 'audio' && consultant_channel === 'im' )
        {
          return consultant_channel;
        }

        // Consultant have greater level
        return enduser_channel;
      },



      /**
       * Enduser must select comm channel (depends on service properties)
       *
       * @param {Object} consultation_model
       * @returns {Boolean}
       */
      is_enabled: function( consultation_model )
      {
        return ( consultation_model.portal.allow_reduce_communication_channel );
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Consultant', Consultant );

  function Consultant
  (
    phemiumApiConnector,
    ClientLogger
  )
  {
    return {

      ST_ONLINE: 1,
      ST_BUSY: 2,
      ST_AWAY: 3,
      ST_OFFLINE: 4,
      ST_RESTRICTED: 5,
      ST_PHONE: 6,
      ST_ONLY_ASYNCHRONOUS: 7,


      ST_TEXT_ONLINE: 'online',
      ST_TEXT_BUSY: 'busy',
      ST_TEXT_AWAY: 'away',
      ST_TEXT_OFFLINE: 'offline',
      ST_TEXT_RESTRICTED: 'restricted',
      ST_TEXT_PHONE: 'phone',
      ST_TEXT_ONLY_ASYNCHRONOUS: 'only_asynchronous',


      /**
       * Consultant
       *
       * @var {Object}
       */
      consultant: null,


      /**
       * Consultant availability
       *
       * @var {Object}
       */
      consultant_availability: null,


      /**
       * Consultant availability template
       *
       * @var {Object}
       */
      consultant_availability_template: null,



      /**
       * Method to convert consultant status id to status text
       *
       * @param {Number} status_id
       * @return {String}
       */
      get_status_text_from_status_id: function( status_id )
      {
        switch( status_id )
        {
          case this.ST_ONLINE:
            return this.ST_TEXT_ONLINE;

          case this.ST_OFFLINE:
            return this.ST_TEXT_OFFLINE;

          case this.ST_BUSY:
            return this.ST_TEXT_BUSY;

          case this.ST_AWAY:
            return this.ST_TEXT_AWAY;

          default:
            return this.ST_TEXT_OFFLINE;
        }
      },



      /**
       * Load consultant availability template
       *
       * @param {Integer} consultant_id
       * @return {Promise}
       */
      load_availability_template: function ( consultant_id )
      {
        return new Promise( function( resolve, reject )
        {
          phemiumApiConnector.request( 'consultants', 'get_consultant_availability_template', [ consultant_id ] )
            .then( function( consultant_availability_template )
            {
              this.consultant_availability_template = consultant_availability_template;
              resolve( consultant_availability_template );
            }.bind( this ))
            .catch( function( error )
            {
              reject( error );
            }.bind( this ));
        }.bind( this ));
      },



      /**
       * Load consultant availability between dates
       *
       * @return {Promise}
       */
      load_availability: function( service_id )
      {
        var params =
        [
          service_id, // Service ID
          this.consultant.id, // Consultant ID
          moment().subtract( 1, 'week' ).unix(), // ini_timestamp
          moment().add( 1, 'week' ).unix() // end_timestamp
        ];

        return new Promise( function( resolve, reject )
        {
          phemiumApiConnector.request( 'services', 'get_service_consultant_availability_config', params )
            .then( function( consultant_availability )
            {
              this.consultant_availability = consultant_availability;
              resolve( consultant_availability );
            }.bind( this ))
            .catch( function( error )
            {
              reject( error );
            }.bind( this ));
        }.bind( this ));
      },



      /**
       * Returns if consultant is avaialble or not depening on his availability config
       *
       * @returns {Boolean}
       */
      consultant_is_available: function()
      {
        if( !this.consultant || !this.consultant_availability )
        {
          return false;
        }

        var current_timestamp = moment().unix();
        var is_available = false;

        this.consultant_availability.forEach( function( period )
        {
          if( period.ini_timestamp <= current_timestamp && period.end_timestamp >= current_timestamp )
          {
            is_available = true;
            return false;
          }
        }.bind( this ));

        return is_available;
      },



       /**
       * Returns if consultant is a virtual chatbot
       *
       * @returns {Boolean}
       */
      consultant_is_chatbot: function()
      {
        if( this.consultant.treatment === 7 )
        {
          return true;
        }
        else
        {
          return false;
        }
      }

    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Consultation', function
  (
    $rootScope,
    $filter,
    ClientLogger,
    phemiumApiConnector,
    phemiumCommunicator,
    ConsultationItemType,
    Enduser,
    Stages,
    Roles,
    Portals,
    Services,
    Consultant,
    CommChannel,
    Auth,
    $translate,
    ConsultationService,
    CallService,
    PostMessage,
    $state
  )
  {

    function Consultation( id )
    {
      var self = this;

      angular.extend( self,
      {

        /**
         * Constructor
         *
         * @private
         */
        _constructor: function()
        {
          self.id = id;
          self.data = {};
          self.items = [];
          self.allowed_types = [];
          self._prepare_events();
          self.worksession_active = null;
        },



        /**
         * Load all consultation data (consultation, first items, service, portal, etc.)
         *
         * @returns {Promise}
         */
        load: function()
        {
          return self._load_consultation()
            .then( self._load_service )
            .then( self._load_portal )
            .then( self._set_allowed_types )
            .then( self._load_card )
            .then( self.load_items )
            // @TODO: Remove _set_portal_classification_name, this is not part of load consultation
            .then( self._set_portal_classification_name );
        },



        /**
         * Load consultation items
         */
        load_items: function()
        {
          var rows_per_page = 15;

          self._page = self._page || 0;
          self._page++;

          var list_options =
          {
            page: self._page,
            rows_per_page: rows_per_page,
            // This should use creation_timestamp to sort correctly, but actually it causes some issues from backend to retrieve the items correctly sorted
            //sort_column: 'creation_timestamp',
            sort_column: 'consultation_item_id',
            sort_type: 'DESC',
            filters:
            [
              {
                column: 'consultation_item_type_id',
                operator: 'in',
                value: self.allowed_types.join()
              }
            ]
          };

          return phemiumApiConnector.request( 'consultations', 'get_consultation_items', [ self.id, list_options, true ] )
            .then( function( list_result_consultation_items )
            {
              self.items = self.items.concat( list_result_consultation_items.items );
              $rootScope.$emit( 'Consultation:' + self.id  + ':items_added' );
            });
        },



        /**
         * Returns if a consultant is assigned or not
         *
         * @return {boolean}
         */
        is_consultant_assigned: function()
        {
          return self.data.consultants.length > 0;
        },



        /**
         * Is preform filled
         *
         * @return {boolean}
         */
        is_preform_filled: function()
        {
          if( !self.service.form_id )
          {
            return true;
          }

          return self.data.preform_done;
        },



        /**
         * Whether consultation is accessible or not.
         * It checks now consultation status, but it can check in the future if the enduser is allowed to access
         * or if the consultation is in the proper stage...
         *
         * @returns {boolean}
         */
        can_access: function()
        {
          // If consultation has been cancelled, then user cannot do anything
          // Cannot use Consultations factory due to a circular dependency Consultations <- Consultation <- Consultations
          // Consultations.CONSULTATION_CANCELLED
          if( self.data.status_id == 5 )
          {
            return false;
          }

          return true;
        },



        /**
         * When preform is filled
         *
         */
        set_preform_filled: function()
        {
          self.data.preform_done = true;
        },



        /**
         * Returns the main consultant
         *
         * @return {Object}
         */
        get_main_consultant: function()
        {
          var main_consultant = null;

          if( self.data.main_consultant_id && parseInt( self.data.main_consultant_id ) > 0 )
          {
            // Return consultant flagged as main. The Phemium API has the logic of which is the main consultant.
            self.data.consultants.forEach( function( consultation_consultant )
            {
              if( consultation_consultant.consultant.id === self.data.main_consultant_id )
              {
                main_consultant = consultation_consultant.consultant;
              }
            });

            return main_consultant;
          }
          else
          {
            // @WORKAROUND: Fallback implementation. To remove when API is updated in all environments,
            if( self.data.consultants.length === 0 )
            {
              return null;
            }

            if( self.data.consultants.length === 1 )
            {
              return self.data.consultants[0].consultant;
            }

            // Workaround for Sanitas: main consultant is the specialist
            var main_consultant = null;

            self.data.consultants.forEach( function( consultation_consultant )
            {
              var role = Roles.get_role( consultation_consultant.role_id );

              // WORKAROUND
              if( role && [ 'ESPECIALISTA', 'MEDICO', 'SPECIALIST' ].indexOf( role.external_id ) > -1 )
              {
                main_consultant = consultation_consultant.consultant;
              }
            });

            return main_consultant || self.data.consultants[0].consultant;
          }
        },



        /**
         * Returns the consultants assigned which are not the main consultant
         *
         * @return {Array}
         */
        get_other_consultants: function()
        {
          if( self.data.consultants.length <= 1 )
          {
            return [];
          }

          var other_consultants = [];
          var main_consultant = self.get_main_consultant();

          self.data.consultants.forEach( function( consultation_consultant )
          {
            if( consultation_consultant.id !== main_consultant.id )
            {
              other_consultants.push( consultation_consultant.consultant );
            }
          });

          return other_consultants;
        },



        /**
         * Set communication channel
         *
         * @param {string} comm_channel
         * @return {Promise}
         */
        set_comm_channel: function( comm_channel )
        {
          return new Promise( function( resolve, reject )
          {
            var consultation_data =
            {
              id: self.id,
              communication_channel: comm_channel
            };

            phemiumApiConnector
              .request( 'consultations', 'update_consultation', [ consultation_data ] )
              .then( function()
              {
                self.data.communication_channel = comm_channel;
                resolve();
              })
              .catch( reject );
          });
        },



        /**
         * Accept comm channel
         *
         * @return {Promise}
         */
        accept_comm_channel: function()
        {
          return new Promise( function( resolve, reject )
          {
            // Channel prefer enduser
            var enduser_channel = self.data.communication_channel;

            // Channel prefer
            var channel = CommChannel.get_lowest_available_level( enduser_channel, self.get_main_consultant().preferred_communication_channel );

            if( enduser_channel !== channel )
            {
              self.set_comm_channel( channel )
                .then( function()
                {
                  resolve();
                })
                .catch( reject );
            }
            else
            {
              resolve();
            }
          });
        },



        /**
         * Reject comm channel
         *
         * @return {Promise}
         */
        reject_comm_channel: function()
        {
          return phemiumApiConnector.request( 'consultations', 'cancel_consultation', [ self.id, 'User Cancel Consultation' ] );
        },



        /**
         * Load consultation
         *
         * @return {Promise}
         * @private
         */
        _load_consultation: function()
        {
          return phemiumApiConnector.request( 'consultations', 'get_consultation', [ self.id, false, true ] )
            .then( function( consultation )
            {
              ClientLogger.info( 'Consultation loaded successfully: ' + consultation.id, consultation );

              self._set_data( consultation );

              if( self.data.consultants.length === 0 )
              {
                clearInterval( self._check_consultant_interval_id );
                self._check_consultant_interval_id = setInterval( self._check_consultant, 30000 );
              }
            });
        },



        /**
         * Load service
         *
         * @return {Promise}
         * @private
         */
        _load_service: function()
        {
          return Services.load_service( self.data.service.id )
            .then( function( service )
            {
              self.service = service;
            });
        },



        /**
         * Load portal
         *
         * @return {Promise}
         * @private
         */
        _load_portal: function()
        {
          return Portals.load_portal( self.data.portal.id )
            .then( function( portal )
            {
              self.portal = portal;
            });
        },



        /**
         * Sets allowed types depending on what's implemented and the environment config
         *
         * @private
         */
        _set_allowed_types: function()
        {
          return new Promise( function( resolve )
          {
            self.allowed_types =
            [
              ConsultationItemType.MESSAGE,
              ConsultationItemType.FILE,
              ConsultationItemType.PROPOSAL,
              ConsultationItemType.APPOINTMENT,
              ConsultationItemType.CALL,
              ConsultationItemType.CARD,
              ConsultationItemType.CARD_CHANGES,
              ConsultationItemType.CONSULTATION_SHARED,
              ConsultationItemType.CLOSED_CONSULTATION,
              ConsultationItemType.CANCELLED_CONSULTATION,
              ConsultationItemType.WAITING_ROOM,
              ConsultationItemType.FIELD_QUESTION,
              ConsultationItemType.FIELD_ANSWER,
              ConsultationItemType.DIALOG_QUESTION,
              ConsultationItemType.DIALOG_ANSWER,
              ConsultationItemType.WEB_REQUEST
            ];

            if( self.portal.show_stages )
            {
              self.allowed_types.push( ConsultationItemType.STAGE_CHANGE );
            }

            resolve();
          });
        },

        /**
         * Sets the property classification_name in Portal object
         *
         * @private
         */
        _set_portal_classification_name: function()
        {
          var class_name = Portals.get_portal_classification_name( self.portal, self.service.id );
          if( class_name )
          {
            self.portal.classification_name = class_name;
          }
          else
          {
            self.portal.classification_name = '';
          }
        },



        /**
         * Load card
         *
         * @return {Promise}
         * @private
         */
        _load_card: function()
        {
          return new Promise( function( resolve )
          {
            if( !self.service.profile_id )
            {
              resolve();
              return;
            }

            phemiumApiConnector
              .request( 'cards', 'get_card_definition', [ self.service.profile_id ] )
              .then( function( card )
              {
                self.card = card;
                resolve();
              });
          });
        },



        /**
         * Set data
         *
         * @param {Object} consultation
         * @private
         */
        _set_data: function( consultation )
        {
          consultation.consultants.forEach( function( consultation_consultant )
          {
            var consultant = consultation_consultant.consultant;
            consultant.status_text = Consultant.get_status_text_from_status_id( consultant.status );
          });

          if( consultation.stage_id )
          {
            self.stage = Stages.get_stage( consultation.stage_id );
          }

          self.data = consultation;
        },



        /**
         * Prepare events to update data
         *
         * @private
         */
        _prepare_events: function()
        {
          phemiumCommunicator.join_channel( 'customer_' + Auth.get_enduser_data().customer_id + '_consultation_' + self.id );

          // Items
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':add_item', self._on_add_item );
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':item_updated', self._on_add_item );
          $rootScope.$on( 'business.consultation.consultation_items_read:' + self.id, self._on_items_read );

          // Proposals
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':confirm_proposal', self._on_proposal_change );
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':reject_proposal', self._on_proposal_change );

          // Files
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':file_validated', self._on_add_item );
          $rootScope.$on( 'MediaUploader:file_uploaded', self._on_media_uploaded );

          // Consultant
          $rootScope.$on( 'business.consultant.consultant_status', self._on_consultant_status_change );
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':add_consultant', self._on_consultant_added );
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':remove_consultant', self._on_consultant_removed );

          // Stage
          $rootScope.$on( 'Communicator:consultation_update:' + self.id + ':stage_change', self._on_state_change );

          // Consultation
          $rootScope.$on( 'Communicator:consultation_canceled:' + self.id, self._on_consultation_canceled );
          $rootScope.$on( 'Communicator:consultation_closed:' + self.id, self._on_consultation_closed );

          //Dialogs
          $rootScope.$on('answer_added', function(){
            self.items.unshift( self.new_answer_item );
            phemiumApiConnector.request('consultations', 'answer_dialog', [self.last_answer.id, self.last_answer.data.value, self.last_answer.data.text])
              .then(function(data)
              {
                $rootScope.$emit('on_question_sent');
              }, function(error)
              {
                // If error it must try it again?
                $rootScope.$emit('on_question_error', error);
              });
            })
        },



        /**
         * Method to handle consultant status change event
         *
         * @param {Object} event
         * @param {Object} data
         * @private
         */
        _on_consultant_status_change: function( event, data )
        {
          self.data.consultants.forEach( function( consultation_consultant )
          {
            if( parseInt( data.consultant_id ) === parseInt( consultation_consultant.consultant.id ) )
            {
              consultation_consultant.consultant.status = data.status;
              consultation_consultant.consultant.status_text = data.status_string.replace( 'status:', '' );
            }
          });
        },



        /**
         * Stage change event handler
         *
         * @param {Object} event
         * @param {Object} data
         * @private
         */
        _on_state_change: function( event, data )
        {
          self.data.stage_id = data.consultation.stage_id;
          self.stage = Stages.get_stage( data.consultation.stage_id );
        },



        /**
         * Consultation canceled event handler
         *
         * @param {Object} event
         * @param {Object} data
         * @private
         */
        _on_consultation_canceled: function( event, data )
        {
          self._set_data( data.consultation );
          $rootScope.$emit( 'Consultation:' + self.id  + ':canceled' );
        },



        /**
         * Consultation closed event handler
         *
         * @param {Object} event
         * @param {Object} data
         * @private
         */
        _on_consultation_closed: function( event, data )
        {
          self._set_data( data.consultation );
          $rootScope.$emit( 'Consultation:' + self.id  + ':closed' );
        },



        /**
         * Items read handler
         *
         * @param {Object} event
         * @param {Object} data
         * @private
         */
        _on_items_read: function( event, data )
        {
          if( data.read_by_some_participant )
          {
            $rootScope.$emit( 'Consultation:' + self.id  + ':read_items', data.consultation_items_ids );
          }
        },



        /**
         *  Media uploaded event handler
         *
         * @param {Object} event
         * @param {Object} queue_file
         * @private
         */
        _on_media_uploaded: function( event, queue_file, api_result )
        {
          // Leave with '!=' as sometimes id is a string and sometimes a number
          if( queue_file.info.consultation_id != self.id )
          {
            return;
          }

          // Check if the item exists
          var item = $filter( 'getById' )( self.items, queue_file.info.consultation_item_id );

          if( !item )
          {
            return;
          }
          api_result.metadata.push({id: 'original-filename', value: queue_file.mediafile.name});
          self.pending_uploaded_resources =
          {
            item_id: self.items[ self.items.indexOf( item ) ].id,
            resources: [{id: api_result.resource_id, value: queue_file.mediafile.name}],
            resources_expanded: [api_result]
          }
        },



        /**
         * Consultant added event handler
         *
         * @param {object} event
         * @param {object} data
         * @private
         */
        _on_consultant_added: function( event, data )
        {
          ClientLogger.info( 'Added consultant' );

          clearInterval( self._check_consultant_interval_id );
          self._set_data( data.consultation );
          $rootScope.$emit( 'Consultation:' + self.id  + ':add_consultant' );
        },



        /**
         * Consultant removed event handler
         *
         * @param {object} event
         * @param {object} data
         * @private
         */
        _on_consultant_removed: function( event, data )
        {
          ClientLogger.info( 'Removed consultant' );

          self._set_data( data.consultation );
          $rootScope.$emit( 'Consultation:' + self.id  + ':remove_consultant' );
        },



        /**
         * Add item event handler
         *
         * @param {object} event
         * @param {object} data
         * @private
         */
        _on_proposal_change: function( event, data )
        {
          var related_proposal = $filter( 'getById' )( self.items, data.item.id );


          if( data.reason === "confirm_proposal" )
          {
            // ***********
            // Add new appointment
            // ***********
            CallService.onChatMessageArrived();
            self.items.unshift( data.consultation.last_item );
            $rootScope.$emit( 'Consultation:' + self.id  + ':add_item', data.consultation.last_item );
            // ***********
            // Modify related proposal
            // ***********
            self.items[ self.items.indexOf( related_proposal ) ].status = 3; // Acepted
            $rootScope.$emit( 'Consultation:' + self.id  + ':proposal_confirmed', data.item );

          }
          else
          {
            // ***********
            // Modify proposal
            // ***********
            self.items[ self.items.indexOf( related_proposal ) ].status = 2; // Rejected
            $rootScope.$emit( 'Consultation:' + self.id  + ':proposal_rejected', data.item );

          }
        },



        /**
         * Add item event handler
         *
         * @param {object} event
         * @param {object} data
         * @private
         */
        _on_add_item: function( event, data )
        {
          // Item received does not belong to an allowed type
          // Because of not being implemented or not allowed by environment configuration (portal)
          if( !data.item || self.allowed_types.indexOf( data.item.type ) == -1 )
          {
            return;
          }

          if( (self.pending_uploaded_resources) && (parseInt(data.item.id) === self.pending_uploaded_resources.item_id) )
          {
            if(self.pending_uploaded_resources.resources_expanded[0].previews_expanded.length === 0){
              self.pending_uploaded_resources.resources_expanded[0].previews_expanded = data.item.data.resources_expanded[0].previews_expanded;
            }
            data.item.data.resources_expanded = self.pending_uploaded_resources.resources_expanded;
            data.item.data.resources = self.pending_uploaded_resources.resources;
          }

          CallService.onChatMessageArrived();

          // Check if the item already exists (it could be added manually)
          var item;
          if(data.item.type === ConsultationItemType.DIALOG_ANSWER){
            item = $filter( 'getByQuestionItemId' )( self.items, data.item.data.question_item_id, false );
          }else{
            item = $filter( 'getById' )( self.items, data.item.id );
          }



          // Update existing item
          if( item )
          {
            ClientLogger.info( 'Updated item' );
            self.items[ self.items.indexOf( item ) ] = data.item;

            // Rating answered, update question to "answered" (status = 2)
            if( data.item.type == ConsultationItemType.FIELD_ANSWER )
            {
              var related_question_item = $filter( 'getById' )( self.items, data.item.data.field_question_item.id );
              self.items[ self.items.indexOf( related_question_item ) ].status = 2;
            }

            $rootScope.$emit( 'Consultation:' + self.id  + ':update_item' , data.item );
          }
          // Add new item
          else
          {
            ClientLogger.info( 'Added item' );
            self.items.unshift( data.item );
            $rootScope.$emit( 'Consultation:' + self.id  + ':add_item' , data.item );
          }

          //Aware the update to a parent window
          PostMessage.consultation_update( data );

          if( $rootScope.in_background !== true )
          {
            // Retrieve items to modify read marks
            var list_options =
            {
              filters:
              [
                {
                  column: 'consultation_item_id',
                  operator: 'integer_equal',
                  value: data.item.id
                }
              ],
              page: 1,
              rows_per_page: 1
            };

            phemiumApiConnector.request( 'consultations', 'get_consultation_items', [ self.id, list_options, true ] );
          }
        },



        /**
         * Read items
         *
         */
        read_all_items: function()
        {
          phemiumApiConnector.request( 'consultations', 'get_consultation_items', [ self.id, null, true ] );
        },



        /**
         * Check every 30 seconds if exist consultant
         *
         * @private
         */
        _check_consultant: function()
        {
          return phemiumApiConnector.request( 'consultations', 'get_consultation', [ self.id, false, false ] )
            .then( function( consultation )
            {
              if( consultation.consultants.length > 0 )
              {
                ClientLogger.info( 'Added consultant' );

                clearInterval( self._check_consultant_interval_id );
                self._set_data( consultation );
                $rootScope.$emit( 'Consultation:' + self.id  + ':add_consultant' );
              }
            });
        },



        /**
         * Returns if file size is allowed to upload to the consultation
         *
         * @param {number} size in bytes
         * @return {boolean}
         */
        is_file_size_allowed: function( size )
        {
          var max_size = self.portal.max_file_size ? self.portal.max_file_size : ( 50 * 1024 * 1024 );
          return size <= max_size;
        },



        /**
         * Sends a message
         *
         * @param {object} item
         * @return {Promise}
         */
        send_message: function( item )
        {
          return new Promise( function( resolve, reject )
          {
            if( !item.message )
            {
              throw 'Missing message';
            }

            var consultation_item =
            {
              consultation_id: self.id,
              message: item.message
            };
            phemiumApiConnector
              .request( 'consultations', 'send_message', [ consultation_item ] )
              .then( function( item_id )
              {
                consultation_item._injected = true;
                consultation_item.id = item_id;
                consultation_item.type = ConsultationItemType.MESSAGE;
                consultation_item.created_by_enduser_id = Auth.get_enduser_data().user_id;
                consultation_item.creation_timestamp = moment().unix();

                self.items.unshift( consultation_item );
                $rootScope.$emit( 'Consultation:' + self.id  + ':add_item', consultation_item );
                resolve();
              })
              .catch( function()
              {
                reject();
              });
          });
        },



        /**
         * Sends a file
         *
         * @param {object} item
         * @return {Promise}
         */
        send_file: function( item )
        {
          return new Promise( function( resolve, reject )
          {
            if( !item.data || !item.data.resources )
            {
              throw 'Missing resources';
            }

            var consultation_item =
            {
              consultation_id: self.id,
              type: ConsultationItemType.FILE,
              created_by_enduser_id: Auth.get_enduser_data().user_id,
              message: '',
              data: item.data
            };

            phemiumApiConnector
              .request( 'consultations', 'add_item', [ consultation_item ] )
              .then( function( item_id )
              {
                consultation_item._injected = true;
                consultation_item.id = item_id;
                consultation_item.creation_timestamp = moment().unix();

                self.items.unshift( consultation_item );
                $rootScope.$emit( 'Consultation:' + self.id  + ':add_file', consultation_item );
                resolve( item_id );
              })
              .catch( function()
              {
                reject();
              });
          });
        },



        /**
         * Sends a field answer
         *
         * @param {object} field_question_item
         * @param {string|number} value
         * @return {Promise}
         */
        send_field_answer: function( field_question_item, value )
        {
          return new Promise( function( resolve, reject )
          {
            var selected_question_id = ConsultationService.selected_question_id;
            var value_to_save = ( typeof value === 'string' )? value :  value.toString();
            var transaction_id = (new Date()).getTime();

            var consultation_item =
            {
              consultation_id: self.id,
              data:
              {
                field_question_item_id: selected_question_id,
                value: value
              }
            };

            phemiumApiConnector
              .request( 'consultations', 'send_field_answer', [ consultation_item ], transaction_id )
              .then( function( item_id )
              {
                // Update the question item status
                var question_item = $filter( 'getById' )( self.items, field_question_item.item_id );

                if( question_item )
                {
                  question_item.status = 2; // Answered
                }

                /**

                Workaround

                Item: respuesta caras/rating

                Por una mala definición del objeto, el item no se renderiza correctamente al inyectarse de forma local.
                Se desactiva excepcionalmente para evitar el fallo y evitar otros problemas derivados,
                como un fallo del scroll automático en el timeline:

                consultation_item._injected = true;
                consultation_item.id = item_id;
                consultation_item.type = ConsultationItemType.FIELD_ANSWER;
                consultation_item.created_by_enduser_id = Auth.get_enduser_data().user_id;
                consultation_item.creation_timestamp = moment().unix();
                consultation_item.data.field_question_item = field_question_item;

                self.items.unshift( consultation_item );
                $rootScope.$emit( 'Consultation:' + self.id  + ':add_item' );

                */

                resolve();
              })
              .catch( function( error )
              {
                reject( error );
              });
          });
        },



        /**
         * Sends the answer of a question to Phemium API
         * @param {object} item
         */
        send_question_answer: function( item )
        {
          self.last_answer = item;
          var creation_timestamp = parseInt((new Date()).getTime()/1000);
          self.new_answer_item =
          {
            id: "A-"+item.id,
            type: ConsultationItemType.DIALOG_ANSWER,
            created_by_enduser_id: true,
            created_by_professional_id: null,
            creation_timestamp: creation_timestamp,
            consultation_id: self.id,
            data: item.data
          };
          $rootScope.$emit( 'Consultation:' + self.id + ':add_item' , self.new_answer_item );
        },



        /**
         * get field values
         *
         * @param {Number} card_id
         * @return {Promise}
         */
        card_get_field_values: function( card_id )
        {
          return new Promise( function( resolve, reject )
          {
            var card_entities = self.get_card_entities();

            phemiumApiConnector.request( 'cards', 'get_field_values_by_card', [ card_id, card_entities, $translate.use() ] )
              .then( function( field_values )
              {
                resolve( field_values );
              })
              .catch( function()
              {
                reject();
              });
          });
        },



        /**
         * update field values
         *
         * @param {object} card_item
         * @param {string|number} values
         * @return {Promise}
         */
        update_field_values: function( card , values )
        {
          return new Promise( function( resolve, reject )
          {
            var card_entities = self.get_card_entities();

            var card_values = [];
            card.fields.forEach( function( field , index )
            {
              var text_to_save;

              if( !values[index] )
              {
                text_to_save = "";
              }
              else
              {
                text_to_save = values[index].toString();
              }

              card_values.push
              (
              {
                library_field_id: field.library_field_id,
                text: text_to_save
              }
              )
            }
            );

            var language_code = "es";
            var card_id = card.id;

            phemiumApiConnector
              .request( 'cards', 'update_field_values', [ card_entities, card_values , language_code , card_id , "true" ] )
              .then( function( )
              {
                resolve();
              })
              .catch( function( reason )
              {
                reject( reason );
              });
          });
        },



        /**
         * Get cart entities
         *
         * @return {Object}
         */
        get_card_entities: function()
        {
          var card_entities =
          {
            enduser_id: Auth.get_enduser_data().user_id,
            consultation_id: self.id
          };
          return card_entities;
        },



        /**
         * Confirm proposal
         *
         * @param {Number} item_id
         * @return {Promise}
         */
        confirm_proposal: function( item_id )
        {
          return new Promise( function( resolve, reject )
          {
            phemiumApiConnector
              .request( 'consultations', 'confirm_proposal', [ item_id ], null )
              .then( function()
              {
                $rootScope.$emit( 'Consultation:' + self.id  + ':confirm_proposal' );
                resolve();
              })
              .catch( function( error )
              {
                reject( error );
              });
          });
        },



        /**
         * Reject proposal
         *
         * @param {Number} item_id
         * @return {Promise}
         */
        reject_proposal: function( item_id )
        {
          return new Promise( function( resolve, reject )
          {
            phemiumApiConnector
              .request( 'consultations', 'reject_proposal', [ item_id ], null )
              .then( function()
              {
                resolve();
              })
              .catch( function( error )
              {
                reject( error );
              });
          });
        }

      });

      self._constructor();
    }

    return Consultation;
  });

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Consultations', Consultations );

  function Consultations
  (
    phemiumApiConnector,
    Consultation,
    Auth
  )
  {

    // **************************************
    // Private
    // **************************************

    /**
     * Consultations (indexed by consultation id)
     *
     * @var {object}
     */
    var consultations = {};



    /**
     * Returns a loaded consultation
     *
     * @param {Number} consultation_id
     * @return {Promise}
     */
    function get_consultation( consultation_id )
    {
      return new Promise( function( resolve, reject )
      {
        if( consultations[ consultation_id ] )
        {
          resolve( consultations[ consultation_id ] );
          return;
        }

        var consultation = new Consultation( consultation_id );

        consultation
          .load()
          .then( function()
          {
            resolve( consultation );
          })
          .catch( function( error )
          {
            reject( error );
          });

        consultations[ consultation_id ] = consultation;
      });
    }



    /**
     * Get consultations
     *
     * @param fill_items Whether consultation items must be returned or not
     * @param mark_items_as_read Whether consultation items must be marked as read or not
     * @param list_options
     * @return {Promise}
     */
    function get_consultations( fill_items, mark_items_as_read, list_options )
    {
      return new Promise( function( resolve, reject )
      {
        phemiumApiConnector
          .request( 'consultations', 'get_consultations', [ Auth.get_enduser_data().user_id, 2, fill_items, list_options, mark_items_as_read ] )
          .then( function( list_result_consultations )
          {
            // We will resolve the promise only with the results asked, not all.
            var consultations_result = {};
            var promises = [];

            list_result_consultations.items.forEach( function( consultation )
            {
              var consultation_result = new Consultation( consultation.id );

              promises.push( consultation_result
                .load()
                .then( function()
                {
                  consultations_result[ consultation_result.id ] = consultation_result;
                  consultations[ consultation_result.id ] = consultation_result;
                })
                .catch( function( error )
                {
                  reject( error );
                }));

            });

            Promise.all( promises )
              .then( function()
              {
                // Transform object to array before return it
                var result = Object.keys( consultations_result ).map( function( key )
                {
                  return consultations_result[ key ];
                });

                resolve( result );
              })
              .catch( function( error )
              {
                reject( error );
              })
          })
          .catch( function( error )
          {
            reject( error );
          });
      });
    }


    // **************************************
    // Public / Export
    // **************************************

    return {
      get_consultation: get_consultation,
      get_consultations: get_consultations,
      CONSULTATION_ACTIVE: 1,
      CONSULTATION_CLOSED: 2,
      CONSULTATION_PRECREATED: 3,
      CONSULTATION_DELETED: 4,
      CONSULTATION_CANCELLED: 5
    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Customers', Portals );

  Portals.$inject = [ 'phemiumApiConnector', 'ClientLogger' ];

  function Portals
  (
    phemiumApiConnector,
    ClientLogger
  )
  {



    /**
     * Customers loaded
     *
     * @var {Array}
     */
    var customers = [];



    /**
     * Load a customer by given id
     *
     * @param {number} id
     * @return {Promise}
     */
    function load_customer_by_id( id )
    {
      return new Promise( function( resolve, reject )
      {
        var customer = get_customer_by_id( id );

        if( customer )
        {
          resolve( customer );
          return;
        }

        phemiumApiConnector
          .request( 'customers', 'get_customer_by_id', [ id ] )
          .then( function( customer )
          {
            ClientLogger.info( 'Customer loaded successfully: ' + customer.id, customer );
            customers.push( customer );
            resolve( customer );
          })
          .catch( reject );
      });
    }



    /**
     * Returns customer by given id
     *
     * @param {number} id
     * @return {Object}
     */
    function get_customer_by_id( customer_id )
    {
      var result = null;

      customers.forEach( function( customer )
      {
        if( parseInt( customer.id, 10 ) === parseInt( customer_id, 10 ) )
        {
          result = customer;
        }
      });

      return result;
    }



    // **************************************
    // Public / Export
    // **************************************

    return {
      load_customer_by_id: load_customer_by_id,
      get_customer_by_id: get_customer_by_id
    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'EnduserPresence', EnduserPresence );

  function EnduserPresence
  (
    $rootScope,
    phemiumApiConnector,
    SupportsService,
    Auth,
    UtilsService,
    ClientLogger
  )
  {
    return {

      /**
       * Enduser id
       *
       * @var {Number}
       */
      enduser_id: null,


      /**
       * Presence options
       *
       * @var {Object}
       */
      presence_options: {},


      /**
       * Is presence running
       *
       * @var {object}
       */
      is_presence_running: false,


      /**
       * Set presence interval id
       *
       * @var {number}
       * @private
       */
      _set_presence_interval_id: null,



      /**
       * Initializes presence options
       */
      init: function()
      {
        // Get screen width and height
        var ratio = window.devicePixelRatio || 1;
        var width = ( UtilsService.platform === 'browser' ) ? window.innerWidth : ( window.screen.width * ratio );
        var height = ( UtilsService.platform === 'browser' ) ? window.innerHeight : ( window.screen.height * ratio );

        this.presence_options =
        {
          consultation_id: null,
          devices_test_status: 'ok',
          access_type: 'ipad',
          communication_profile_name: null,
          app_info:
          {
            name: window.settings.package_name,
            version: window.settings.version
          },
          device_info:
          {
            model: window.cordova ? window.device.model : null,
            platform: UtilsService.platform,
            uuid: window.cordova ? window.device.uuid : ClientLogger.get_client_uuid(),
            version: window.cordova ? window.device.version : null,
            screen_resolution: width + 'x' + height,
            supports_voip_push_notifications: SupportsService.is_voip_push_notifications_supported()
          }
        };

        this.enduser_id = Auth.get_enduser_data().user_id;
      },


      /**
       * Starts presence
       */
      start_presence: function()
      {
        if( this.is_presence_running )
        {
          return;
        }

        this.is_presence_running = true;

        phemiumApiConnector
          .request( 'endusers_presence', 'clear_enduser_presence', [ this.enduser_id ] )
          .then( function()
          {
            setTimeout( function()
            {
              $rootScope.$on( 'Communicator:enduser_kicked', this._on_kicked.bind( this ) );
            }.bind( this ), 10000 );

            this._set_presence();
            this._set_presence_interval_id = setInterval( this._set_presence.bind( this ), 10000 );
          }.bind( this ) );
      },



      /**
       * Stop presence
       */
      stop_presence: function()
      {
        clearInterval( this._set_presence_interval_id );
        this.is_presence_running = false;
        $rootScope.$emit( 'EnduserPresence:stop_presence' );
      },



      /**
       * Set presence optiosn
       *
       * @param {Object} presence_options
       */
      set_presence_options: function( presence_options )
      {
        Object.keys( presence_options ).forEach( function( option_id )
        {
          this.presence_options[ option_id ] = presence_options[ option_id ];
        }.bind( this ) );

        this._set_presence();
      },



      /**
       * Set presence
       *
       * @private
       */
      _set_presence: function()
      {
        phemiumApiConnector
          .request( 'endusers_presence', 'set_enduser_presence', [ this.presence_options, this.enduser_id ] )
          .then( function()
          {
            this.is_presence_running = true;
            $rootScope.$emit( 'EnduserPresence:set_presence' );
          }.bind( this ) );
      },



      /**
       * Kicked event handler
       *
       * @param {Object} event
       * @param {Object} data
       * @private
       */
      _on_kicked: function( event, data )
      {
        if( data.enduser_id != this.enduser_id || $rootScope.logout == true )
        {
          return;
        }

        this.stop_presence();
        $rootScope.$emit( 'EnduserPresence:kicked' );
      }
    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Enduser', Enduser );

  Enduser.$inject = [ 'phemiumApiConnector' ];

  function Enduser
  (
    phemiumApiConnector
  )
  {
    return {

      /**
       * Enduser
       *
       * @var {Object}
       */
      enduser: null,


      /**
       * Loads enduser
       *
       * @param {Number} enduser_id
       * @return {Promise}
       */
      load: function( enduser_id )
      {
        return new Promise( function( resolve )
        {
          phemiumApiConnector.request( 'endusers', 'get_enduser', [ enduser_id ] ).then( function( enduser )
          {
            if( enduser.picture_resource_id && enduser.picture_resource.previews.length > 0 )
            {
              enduser.picture_url = enduser.picture_resource.previews[ 1 ];
            }

            this.enduser = enduser;
            resolve();
          }.bind( this ) );
        }.bind( this ) );
      }
    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'MediaUploader', MediaUploader );

  function MediaUploader
  (
    $cordovaCapture,
    $cordovaCamera,
    $cordovaFile,
    $rootScope,
    Utils,
    UtilsService,
    Auth,
    phemiumApiConnector,
    ClientLogger
    )
  {
    var self = this;
    var uploading = false;
    var upload_queue = [];
    var current_upload;



    // **************************************
    // Private
    // **************************************




    /**
     * Pick media to upload
     * Opens file dialog or media browser to select an image or video.
     *
     * @param {String} mediatype image or video
     * @return {Promise}
     */
    function pick_media( mediatype )
    {
      return new Promise( function( resolve, reject )
      {
        if( UtilsService.platform === 'browser' )
        {
          use_browser_controls( mediatype, resolve, reject );
        }
        else
        {
          use_native_controls( mediatype, resolve, reject );
        }
      });
    }



    /**
     * Use  browser controls
     *
     * @param mediatype
     * @param resolve
     * @param reject
     */
    function use_browser_controls( mediatype, resolve, reject )
    {
      var input = document.createElement( 'input' );
      input.type = 'file';
      input.accept = (mediatype === 'document') ? '.pdf,.doc,.docx,.xls,.xlsx' : mediatype + '/*';
      input.addEventListener( 'change', function( ev )
      {
        var file = ev.target.files[0];
        input.remove();
        resolve( get_file( file ) );
      });

      document.body.appendChild( input );
      input.click();
    }



    /**
     * Use native controls
     *
     * @param mediatype
     * @param resolve
     * @param reject
     */
    function use_native_controls( mediatype, resolve, reject )
    {
      var options =
      {
        quality: 20,
        allowEdit: false,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        popoverOptions: CameraPopoverOptions,
        mediaType: mediatype === 'image' ? Camera.MediaType.PICTURE : Camera.MediaType.VIDEO
      };

      // Special options for Android 7.1, avoid app crash
      if( UtilsService.platform_camera_allowEdit === true )
      {
        options.allowEdit = true;
      }

      navigator.camera.getPicture( device_media_taken.bind( self, resolve, reject ), device_media_error.bind( self, reject ), options );
    }



    /**
     * Capture media to upload
     *
     * @param {String} mediatype image or video
     * @return {Promise}
     */
    function capture_media( mediatype )
    {
      return new Promise( function( resolve, reject )
      {
        // capture_media not available on WebApp
        if( UtilsService.platform !== 'browser' )
        {
          var options = {};
          if( mediatype === 'image' )
          {
            options =
            {
              quality: 50,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              popoverOptions: CameraPopoverOptions,
              mediaType: Camera.MediaType.PICTURE,
              correctOrientation: true
            };
          }
          else
          {
            options =
            {
              duration: 15
            };
          }

          var success_cb = function( uri )
          {
            var directory = uri[0].localURL.replace( uri[0].name, '' );
            var name = uri[0].name;
            var final_directory = ( UtilsService.platform == 'Android' ) ? cordova.file.externalDataDirectory : cordova.file.dataDirectory;

            $cordovaFile.copyFile( directory, name, final_directory, (new Date()).getTime() + '_' + name )
              .then( function( fileEntry )
              {
                resolve( get_file( fileEntry.nativeURL ) );
              })
              .catch( function( error )
              {
                if( error == 'Camera cancelled.' || error == 'Selection cancelled.' || error == 'no image selected' )
                {
                  return;
                }

                reject( error );
              });
          };

          // Handle $cordovaCapture and $cordovaCamera success
          var _on_pick_image_success = function( uri )
          {
            resolve( get_file( uri ) );
          };

          // Handle $cordovaCapture and $cordovaCamera errors
          // cordovaCapture.captureVideo is error code CAPTURE_NO_MEDIA_FILES
          var error_cb = function( error )
          {
            if( error === 'Selection cancelled.'
              || error === 'No Image Selected'
              || error === 'Camera cancelled.'
              || error.code === 3 )
              {
                return;
              }
            reject( error );
          };

          if( mediatype === 'video' )
          {
            $cordovaCapture.captureVideo( options ).then( success_cb, error_cb );
          }
          if( mediatype === 'image' )
          {
            $cordovaCamera.getPicture( options ).then( _on_pick_image_success, error_cb );
          }
        }
      });
    }



    /**
     * Device media taken
     *
     * @param uri
     * @param resolve
     * @param reject
     */
    function device_media_taken( resolve, reject, uri )
    {
      resolve( get_file( uri ) );
    }



    /**
     * Device media error
     *
     * @param error
     * @param reject
     */
    function device_media_error( reject, error )
    {
      if( error === 'No Image Selected'
        || error === 'Selection cancelled.'
        || error === 'Camera cancelled.'
        || error === 'has no access to assets' )
      {
        return;
      }

      reject( error );
    }



    /**
     * Returns normalized file instance
     *
     * @param {Object|String} data
     * @return {Object}
     */
    function get_file( data )
    {
      var mediafile = new Object();
      mediafile.uuid = Utils.generate_uuid();
      mediafile.data = data;

      if( typeof data == 'object' )
      {
        mediafile.name = data.name;
        mediafile.size = data.size;
        mediafile.uri = null;
      }
      else
      {
        mediafile.name = data.split( '/' ).pop();
        mediafile.size = null;
        mediafile.uri = data;
      }

      return mediafile;
    }



    /**
     * Returns if is uploading or not
     *
     * @return {boolean}
     */
    function is_uploading()
    {
      return uploading === true;
    }



    /**
     * Checks upload queue
     */
    function check_upload_queue()
    {
      if( is_uploading() || upload_queue.length === 0 )
      {
        return;
      }

      current_upload = upload_queue[ 0 ];
      upload_file( current_upload );
    }



    /**
     * Uploads a queue file
     *
     * @param {Object} queue_file
     */
    function upload_file( queue_file )
    {
      uploading = true;
      queue_file.status = 'uploading';

      if( UtilsService.platform === 'browser' )
      {
        upload_browser_file( queue_file );
      }
      else
      {
        upload_native_file( queue_file );
      }
    }



    /**
     * Upload browser file
     *
     * @param {Object} queue_file
     */
    function upload_browser_file( queue_file )
    {
      var formData = new FormData();
      formData.append( 'transaction_id', (new Date()).getTime() );
      formData.append( 'token', Auth.get_enduser_data().token );
      formData.append( 'entity', 'phemium_drive' );
      formData.append( 'method', 'upload_file' );
      formData.append( 'arguments', JSON.stringify( [ queue_file.mediafile.uuid, null, queue_file.info ] ) );
      formData.append( 'file', queue_file.mediafile.data );

      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function()
      {
        // @TODO: Control another type of upload errors to properly set uploading var to it's value. If not, upload queue will be blocked.
        if( xhttp.readyState === 4 && xhttp.status === 200 )
        {
          uploading = false;
          var api_result = JSON.parse( xhttp.responseText );

          if( api_result.resource_id )
          {
            queue_file.status = 'uploaded';
            upload_queue.shift();
            uploading = false;
            $rootScope.$emit( 'MediaUploader:file_uploaded', queue_file, api_result );
            check_upload_queue();
          }
          else
          {
            queue_file.status = 'error';
            uploading = false;
            $rootScope.$emit( 'MediaUploader:file_upload_error', queue_file, api_result );
            check_upload_queue();
          }
        }
      };

      xhttp.upload.onprogress = function( event )
      {
        if( event.lengthComputable )
        {
          queue_file.percent = Math.round( event.loaded * 100 / event.total );
          $rootScope.$emit( 'MediaUploader:file_upload_progress:' + queue_file.info.consultation_item_id, queue_file );
        }
      };

      xhttp.open( 'POST', phemiumApiConnector.url );
      xhttp.send( formData );
    }



    function upload_native_file( queue_file )
    {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = queue_file.mediafile.name;
      // options.mimeType = "text/plain";

      var params = {};
      params.token = phemiumApiConnector.token;
      params.entity = 'phemium_drive';
      params.method = 'upload_file';
      params.arguments = JSON.stringify( [ queue_file.mediafile.uuid, null, queue_file.info ] );
      options.params = params;

      var ft = new FileTransfer();

      ft.onprogress = native_file_upload_progress.bind( self, queue_file );
      ft.upload( queue_file.mediafile.uri, encodeURI( phemiumApiConnector.url ), native_file_upload_success.bind( self, queue_file ), native_file_upload_error.bind( self, queue_file ), options );
    }



    /**
     * Native file upload has finished successfully
     *
     * @param {Object} response
     * @param {Object} queue_file
     */
    function native_file_upload_success( queue_file, response )
    {
      uploading = false;
      var api_result = JSON.parse( response.response );

      if( api_result.resource_id )
      {
        queue_file.status = 'uploaded';
        upload_queue.shift();
        uploading = false;
        $rootScope.$emit( 'MediaUploader:file_uploaded', queue_file, api_result );
        check_upload_queue();
      }
      else
      {
        queue_file.status = 'error';
        uploading = false;
        $rootScope.$emit( 'MediaUploader:file_upload_error', queue_file, api_result );
      }
    }



    /**
     * Native file upload error
     *
     * @param {Object} queue_file
     * @param {Object} error
     */
    function native_file_upload_error( queue_file, error )
    {
      uploading = false;
      var error_msg = '';

      // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file-transfer/#filetransfererror
      // 1 = FileTransferError.FILE_NOT_FOUND_ERR
      // 2 = FileTransferError.INVALID_URL_ERR
      // 3 = FileTransferError.CONNECTION_ERR
      // 4 = FileTransferError.ABORT_ERR
      // 5 = FileTransferError.NOT_MODIFIED_ERR
      switch( error.code )
      {
        case 1:
          error_msg = 'File not found';
          break;

        case 2:
          error_msg = 'Invalid URL';
          break;

        case 3:
          error_msg = 'Connection Error';
          break;

        case 4:
          error_msg = 'Abort Error';
          break;

        case 5:
          error_msg = 'Not modified Error';
          break;

        default:
          error_msg = 'Unknown Error';
      }

      ClientLogger.error( 'Error uploading file image:', error, error_msg );
      queue_file.status = 'error';
      $rootScope.$emit( 'MediaUploader:file_upload_error', queue_file );
    }



    /**
     * Native file is being uploaded
     *
     * @param {Object} queue_file
     * @param {Object} event
     */
    function native_file_upload_progress( queue_file, event )
    {
      if( event.lengthComputable )
      {
        queue_file.percent = Math.round( event.loaded * 100 / event.total );
        $rootScope.$emit( 'MediaUploader:file_upload_progress:' + queue_file.info.consultation_item_id, queue_file );
      }
    }



    /**
     * Add pending upload
     *
     * @param {Array} mediafiles
     * @param {Object} phemium_drive_file_info
     */
    function add_pending_upload( mediafiles, phemium_drive_file_info )
    {
      mediafiles.forEach( function( mediafile )
      {
        var queue_file =
        {
          mediafile: mediafile,
          info: phemium_drive_file_info,
          status: 'pending',
          percent: 0
        };

        upload_queue.push( queue_file );
        check_upload_queue();
      });
    }



    /**
     * Get pending upload
     *
     * @param {String} mediafile_uuid
     */
    function get_pending_upload( mediafile_uuid )
    {
      var queue_files = upload_queue.filter( function( queue_file )
      {
        return ( queue_file.mediafile.uuid === mediafile_uuid );
      });

      return queue_files.length > 0 ? queue_files[0] : null;
    }


    // **************************************
    // Public
    // **************************************
    return {
      pick_media: pick_media,
      capture_media: capture_media,
      is_uploading: is_uploading,
      add_pending_upload: add_pending_upload,
      get_pending_upload: get_pending_upload
    };
  }

})();

(function()
{
  'use strict';

  angular.module('app.sdk.enduser').factory('Permissions', Permissions);

  function Permissions
  (
    ClientLogger,
    phemiumSipVideoCall,
    $rootScope,
    NotificationService,
    $translate,
    UtilsService
  ){

    /**
    * Whether camera/micro permissions had been granted or not
    *
    * @type {Boolean}
    */
    var media_permissions = false;


    /**
    * Whether notifications permissions had been granted or not
    *
    * @type {Boolean}
    */
    var notifications_permissions = false;



    return {
      check_media_permissions: check_media_permissions,
      check_local_notifications: check_local_notifications,
      media_permissions: media_permissions,
      notifications_permissions: notifications_permissions
    };



    /**
     * Check media permissions
     *
     * @param {String} comm_tech_video
     * @public
     */
    function check_media_permissions( comm_tech_video )
    {
      var comm_tech = comm_tech_video ? { audio: true, video: true } : { audio: true, video: false };
      ClientLogger.info( 'Before check media permissions for browser, comm_tech object', JSON.stringify( comm_tech ) );

      return new Promise( function( resolve, reject )
      {
        var videocallPlugin = phemiumSipVideoCall.get_instance();

        // Media permissions allowed callback
        var on_media_permissions_allowed = function()
        {
          _on_media_permissions_allowed();
          resolve();
          return;
        };

        // Media permissions denied callback
        var on_media_permissions_denied = function( error )
        {
          ClientLogger.error( 'Media permissions denied or error requesting them: ' + JSON.stringify( error ) );
          _on_media_permissions_denied();
          reject();
          return;
        };

        // Media permissions call
        videocallPlugin.checkMediaPermissions( comm_tech, on_media_permissions_allowed, on_media_permissions_denied );
      });
    }



    /**
     * Check local notifications permission
     *
     * @public
     */
    function check_local_notifications()
    {
      if( UtilsService.platform === 'browser' )
      {
        //TODO: notification for browser
        return new Promise( function( resolve )
        {
          notifications_permissions = true;
          resolve();
        });

      }
      else
      {
        ClientLogger.info( 'Before check local notifications permissions for device' );

        return new Promise( function( resolve, reject )
        {
          cordova.plugins.notification.local.hasPermission( function( granted )
          {
            // Without local notification permissions
            if( granted === false )
            {
              cordova.plugins.notification.local.registerPermission( function( notifications_accepted )
              {
                if( notifications_accepted )
                {
                  ClientLogger.info( 'Notification permissions allowed' );
                  notifications_permissions = true;
                  resolve();
                }
                else
                {
                  on_notification_permissions_denied();
                  reject();
                }
              });
            }
            // With local notifications permissions
            else
            {
              ClientLogger.info( 'Notification permissions allowed' );
              notifications_permissions = true;
              resolve();
            }
          });
        });
      }
    }



    /**
     * Media permissions allowed callback
     *
     * @private
     */
    function _on_media_permissions_allowed()
    {
      ClientLogger.info( 'Media permissions allowed' );
      media_permissions = true;
    }



    /**
     * Media permissions denied callback
     *
     * @private
     */
    function _on_media_permissions_denied()
    {
      ClientLogger.info( 'Media permissions denied' );
      media_permissions = false;
    }



    /**
     * Notifications permissions denied callback
     *
     * @private
     */
    function on_notification_permissions_denied()
    {
      ClientLogger.info( 'Notification permissions denied' );
      notifications_permissions = false;
      NotificationService.show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-alert-circled"></i>',
        subtitle: $translate.instant( 'permissions_notifications_denied_title' ),
        body: $translate.instant( 'permissions_notifications_denied_info' ),
        ok_text: $translate.instant( 'ok_text' ),
        ok_type: 'button-positive',
        on_click: null
      });
    };
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Portals', Portals );

  Portals.$inject = [ 'phemiumApiConnector', 'ClientLogger' ];

  function Portals
  (
    phemiumApiConnector,
    ClientLogger
  )
  {

    // **************************************
    // Private
    // **************************************

    /**
     * Portals loaded
     *
     * @var {Array}
     */
    var portals = [];



    /**
     * Loads a portal by given id
     *
     * @param {number} id
     * @return {Promise}
     */
    function load_portal( id )
    {
      return new Promise( function( resolve, reject )
      {
        var portal = get_portal( id );

        if( portal )
        {
          resolve( portal );
          return;
        }

        phemiumApiConnector
          .request( 'portals', 'get_portal', [ id ] )
          .then( function( portal )
          {
            ClientLogger.info( 'Portal loaded successfully: ' + portal.external_id, portal );
            portals.push( portal );
            resolve( portal );
          })
          .catch( reject );
      });
    }



    /**
     * Loads a portal by given name
     *
     * @param {String} name
     * @return {Promise}
     */
    function load_portal_by_name( name )
    {
      return new Promise( function( resolve, reject )
      {
        var portal = get_portal_by_name( name );

        if( portal )
        {
          resolve( portal );
          return;
        }

        phemiumApiConnector
          .request( 'portals', 'get_portal_by_name', [ name, false ] )
          .then( function( portal )
          {
            ClientLogger.info( 'Portal loaded successfully: ' + portal.external_id, portal );
            portals.push( portal );
            resolve( portal );
          })
         .catch( reject );
      });
    }



    /**
     * Returns portal by given id
     *
     * @param {number} id
     * @return {Object}
     */
    function get_portal( id )
    {
      var result = null;

      portals.forEach( function( portal )
      {
        if( portal.id == id )
        {
          result = portal;
        }
      });

      return result;
    }



    /**
     * Returns portal by given name
     *
     * @param {String} name
     * @return {Object}
     */
    function get_portal_by_name( name )
    {
      var result = null;

      portals.forEach( function( portal )
      {
        if( portal.name.toLowerCase() == name.toLowerCase() )
        {
          result = portal;
        }
      });

      return result;
    }



    /**
     * Returns the classification name of a given portal
     * @param {Object} portal 
     * @param {String} service_id
     */
    function get_portal_classification_name( portal, service_id )
    {
      var name = "";
      portal.classification.classifications.forEach(function(classification) 
      {
        if( classification.names[0] && classification.service_id === service_id)
        {
          name = classification.names[0].value;
        }
      });
     
      return name;
    }



    // **************************************
    // Public / Export
    // **************************************

    return {
      load_portal: load_portal,
      load_portal_by_name: load_portal_by_name,
      get_portal: get_portal,
      get_portal_by_name: get_portal_by_name,
      get_portal_classification_name: get_portal_classification_name,
      QUEUE_ACCESS_MODE_DIRECT: 2
    };
  }

})();

(function()
{
  'use strict';

  angular
      .module('app.sdk.enduser')
      .factory('PostMessage', PostMessage)

  function PostMessage(
    $rootScope,
    UtilsService,
    EnduserPresence
  )
  {

    _init_call_listeners();
    _init_incoming_call_events();
    _init_outgoing_call_events();

    return {
      add_listener: add_listener,
      open_url: open_url,
      consultation_update: consultation_update,
      init_consultation_events: init_consultation_events
    }



    /**
     * Adds a postMessage listener and links it to a private callback
     */
    function add_listener()
    {
      window.addEventListener("message", _receive_message, false);
    }



    /**
     * Inits consultation events
     *
     * @param String consultation_id
     */
    function init_consultation_events( consultation_id )
    {
      // Items
      $rootScope.$on( 'business.consultation.consultation_items_read:' + consultation_id, consultation_event );

      // Proposals
      $rootScope.$on( 'Communicator:consultation_update:' + consultation_id + ':confirm_proposal', consultation_event );
      $rootScope.$on( 'Communicator:consultation_update:' + consultation_id + ':reject_proposal', consultation_event );

      // Files
      $rootScope.$on( 'Communicator:consultation_update:' + consultation_id + ':file_validated', consultation_event );
      $rootScope.$on( 'MediaUploader:file_uploaded', consultation_event );

      // Consultant
      $rootScope.$on( 'business.consultant.consultant_status', consultation_event );
      $rootScope.$on( 'Communicator:consultation_update:' + consultation_id + ':add_consultant', consultation_event );
      $rootScope.$on( 'Communicator:consultation_update:' + consultation_id + ':remove_consultant', consultation_event );

      // Stage
      $rootScope.$on( 'Communicator:consultation_update:' + consultation_id + ':stage_change', consultation_event );

      // Consultation
      $rootScope.$on( 'Communicator:consultation_canceled:' + consultation_id, consultation_event );
      $rootScope.$on( 'Communicator:consultation_closed:' + consultation_id, consultation_event );
    }



    /**
     * Inits call events
     * @param String consultation_id
     */
    function _init_incoming_call_events()
    {
      $rootScope.$on( 'Communicator:consultation_call_request', incoming_call_event ); // Legacy: Faye notification
      $rootScope.$on( 'PushNotificationService:consultation_call_request', incoming_call_event ); // New call request notification through browser/voip notifications
      $rootScope.$on( 'Communicator:consultation_call_request_cancelled', incoming_call_event );
      $rootScope.$on( 'onResume', incoming_call_event );
      $rootScope.$on( 'onPause', incoming_call_event );
      $rootScope.$on( 'IncomingCallController:call_accepted', incoming_call_event );
      $rootScope.$on( 'IncomingCallService:call_rejected', incoming_call_event );
    }



    /**
     * Inits call events
     * @param String consultation_id
     */
    function _init_outgoing_call_events()
    {
      $rootScope.$on( 'CallService:call_event', outgoing_call_event );
    }



    /**
     * Inits call events
     * @param String consultation_id
     */
    function _init_incoming_call_events()
    {
      $rootScope.$on( 'Communicator:consultation_call_request', incoming_call_event ); // Legacy: Faye notification
      $rootScope.$on( 'PushNotificationService:consultation_call_request', incoming_call_event ); // New call request notification through browser/voip notifications
      $rootScope.$on( 'Communicator:consultation_call_request_cancelled', incoming_call_event );
      $rootScope.$on( 'onResume', incoming_call_event );
      $rootScope.$on( 'onPause', incoming_call_event );
      $rootScope.$on( 'IncomingCallController:call_accepted', incoming_call_event );
      $rootScope.$on( 'IncomingCallService:call_rejected', incoming_call_event );
    }



    /**
     * Inits call events
     * @param String consultation_id
     */
    function _init_outgoing_call_events()
    {
      $rootScope.$on( 'CallService:call_event', outgoing_call_event );
    }



    /**
     * Sends a postMessage to warn about a consultation update in parent window
     * @param {Object} data
     */
    function consultation_update(data)
    {
      var id_from = null;

      //Checks if it's an user message or not
      if(data.item.data.from)
      {
        id_from = data.item.data.from.id;
      }

      var message = {
        action: "updated_timeline",
        text: data.item.message,
        id_from: id_from,
        from: data.user_name
      };

      window.parent.postMessage(JSON.stringify(message), "*");
    }



    /**
     * Sends a postMessage to warn about a consultation update in parent window
     * @param {Object} data
     */
    function consultation_event( event, data )
    {
      var message = {
        action: "consultation_event",
        name: event.name,
        data: data
      };

      window.parent.postMessage( JSON.stringify( message ), "*" );
    }



    /**
     * Sends a postMessage to warn about a call event
     *
     * @param {Object} data
     */
    function incoming_call_event( event, data )
    {
      var message = {
        action: "incoming_call_event",
        name: event.name,
        data: data
      };

      window.parent.postMessage( JSON.stringify( message ), "*" );
    }



    /**
     * Sends a postMessage to warn about a call event
     *
     * @param {Object} data
     */
    function outgoing_call_event( event, data )
    {
      var message = {
        action: "outgoing_call_event",
        name: event.name,
        data: data
      };

      window.parent.postMessage( JSON.stringify( message ), "*" );
    }



    /**
     * Sends a postMessage to request for a url open in parent window
     *
     * @param {Object} message
     */
    function open_url(message)
    {
      window.parent.postMessage(JSON.stringify(message), "*");
    }



    /**
     * Private method called when a postMessage event received
     *
     * @param {Object} message
     */
    function _receive_message( message )
    {
      //Discard own postMessages
      if( message.origin !== window.location.origin )
      {
        console.log("PostMessage: "+ JSON.stringify(message.data));
        switch( message.data.action )
        {
          case "close_session": _close_session(); break;
          default: $rootScope.$emit( 'postMessage:'+ message.data.action, message.data ); break;
        }
      }
    }



    /**
     * Private method to close webapp session
     */
    function _close_session()
    {
      EnduserPresence.stop_presence();
      UtilsService.exit_app();
    }



    /**
     * Init call listeners to notice Embedder when a call starts or ends
     */
    function _init_call_listeners()
    {
      $rootScope.$on( 'VideoCallComponent:call_connected', function()
      {
        var message = {
          action: "start_videocall"
        };

        window.parent.postMessage( JSON.stringify( message ), "*" );
      });

      $rootScope.$on( 'VideoCallComponent:call_disconnected', function()
      {
        var message = {
          action: "end_videocall"
        };

        window.parent.postMessage( JSON.stringify( message ), "*" );
      });
    }

  }

}());
(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Queue', Queue );

  function Queue
  (
    phemiumApiConnector,
    Auth
  )
  {
    return {

      /**
       * Is accessing queue
       *
       * @var {boolean}
       */
      is_accessing_queue: false,


      /**
       * Appointment id
       *
       * @var {number}
       */
      appointment_id: null,


      /**
       * Consultant id
       *
       * @var {number}
       */
      consultant_id: null,



      /**
       * Add enduser to queue
       *
       * @param {number} consultation_id
       * @param {number} consultant_id
       * @param {number} appointment_id
       * @param {string} language_code
       * @return {Promise}
       */
      add_enduser_to_queue: function( consultation_id, consultant_id, appointment_id, language_code )
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          self.is_accessing_queue = true;

          var params =
          [
            Auth.get_enduser_data().user_id,
            consultation_id,
            consultant_id,
            appointment_id,
            language_code
          ];

          self.consultant_id = consultant_id;

          phemiumApiConnector.request( 'services_endusers_queues', 'add_enduser_to_queue', params )
            .then( function()
            {
              self.is_accessing_queue = false;
              resolve();
            })
            .catch( function()
            {
              self.is_accessing_queue = false;
              reject();
            });
        });
      },



      /**
       * Add enduser to queue removing it previously
       *
       * @param {number} consultation_id
       * @param {number} consultant_id
       * @param {number} appointment_id
       * @param {string} language_code
       * @return {Promise}
       */
      add_enduser_to_queue_with_remove: function( consultation_id, consultant_id, appointment_id, language_code )
      {
        var self = this;

        return new Promise( function( resolve, reject )
        {
          self.remove_enduser_from_queue()
            .then( function()
            {
              self.add_enduser_to_queue( consultation_id, consultant_id, appointment_id, language_code )
                .then( resolve )
                .catch( reject );
            });
        });
      },



      /**
       * Removes enduser from queue
       */
      remove_enduser_from_queue: function()
      {
        return phemiumApiConnector.request( 'services_endusers_queues', 'remove_enduser_from_queue', [ Auth.get_enduser_data().user_id ] );
      },



      /**
       * Returns if the enduser is in queue or not
       *
       * @return {Promise}
       * @private
       */
      is_enduser_in_queue: function()
      {
        return phemiumApiConnector
          .request( 'services_endusers_queues', 'is_enduser_on_queue', [ Auth.get_enduser_data().user_id ] )
          .then( function( in_queue )
          {
            vm.in_queue = in_queue;
          });
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Roles', Roles );

  Roles.$inject = [ 'phemiumApiConnector' ];

  function Roles
  (
    phemiumApiConnector
  )
  {
    return {

      /**
       * Roles
       *
       * @var {Array}
       */
      roles: [],



      /**
       * Loads roles
       *
       * @return {Promise}
       */
      load: function()
      {
        return new Promise( function( resolve )
        {
          var list_options =
          {
            page: 1,
            rows_per_page: 99999
          };

          phemiumApiConnector.request( 'roles', 'get_roles', [ list_options ] ).then( function( list_result_roles )
          {
            this.roles = list_result_roles.items;
            resolve();
          }.bind( this ) );
        }.bind( this ) );
      },


      /**
       * Returns role by given id
       *
       * @param {Object} role_id
       * @return {Object}
       */
      get_role: function( role_id )
      {
        var role_return = null;

        this.roles.forEach( function( role )
        {
          if( role.id === role_id )
          {
            role_return = role;
          }
        });

        return role_return;
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Service', Service );

  function Service
  (
    phemiumApiConnector,
    $translate
  )
  {
    return {

      /**
       * Consultant
       *
       * @var {Object}
       */
      service: null,


      /**
       * Service availability template
       *
       * @var {Object}
       */
      service_availability_template: null,



      /**
       * Load consultant availability template
       *
       * @param {Integer} service_id
       * @return {Promise}
       */
      load_availability_template: function ( service_id )
      {
        return new Promise( function( resolve, reject )
        {
          phemiumApiConnector.request( 'services', 'get_service_availability_template', [ service_id ] )
            .then( function( service_availability_template )
            {
              this.service_availability_template = service_availability_template;
              resolve( service_availability_template );
            }.bind( this ))
            .catch( function( error )
            {
              reject( error );
            }.bind( this ));
        }.bind( this ));
      },




      /**
       * Get service availability text
       *
       * @param {Array} config
       * @returns String
       */
      get_availability_text: function( config )
      {
        if( !config || config.length === 0 )
        {
          return $translate.instant( 'service_not_available' );
        }

        var texts = [];

        // Add first config as first section
        var current_section = { periods: config[ 0 ].periods, days: [ config[ 0 ].day ] };
        var sections = [];

        for( var i = 1; i < config.length; i++ )
        {
          if( JSON.stringify( config[ i ].periods ) === JSON.stringify( current_section.periods ) )
          {
            // Add day to current section
            current_section.days.push( config[ i ].day );
          }
          else
          {
            // Add current section to result and start a new one
            sections.push( current_section );
            var current_section = { periods: config[ i ].periods, days: [ config[ i ].day ] };
          }
        }

        // Push las current section
        sections.push( current_section );

        // Process sections
        sections.forEach( function( section )
        {
          if( section.periods.length > 0 )
          {
            var text = moment().day( section.days[ 0 ] ).format( 'dddd' );

            if( section.days.length > 1 )
            {
              text += ' - ' + moment().day( section.days[ section.days.length - 1 ] ).format( 'dddd' );
            }

            var periods_texts = [];

            section.periods.forEach( function( period )
            {
              var from = moment().startOf( 'day' ).add( period.from + moment().utcOffset(), 'minutes' );
              var to = moment().startOf( 'day' ).add( period.to + moment().utcOffset(), 'minutes' );

              periods_texts.push( $translate.instant( 'from_to' ).replace( '{from}', from.format( 'LT' ) ).replace( '{to}', to.format( 'LT' ) ) );

            }.bind( this ));

            text += ' ' + periods_texts.join( ( ' ' + $translate.instant( 'and' ) + ' ' ) );

            texts.push( text );
          }
        }.bind( this ));

        if( texts.length === 0 )
        {
          return $translate.instant( 'service_not_available' );
        }

        return texts.join( ', ' );
      }
    }
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Services', Services );

  Services.$inject = [ 'phemiumApiConnector', 'ClientLogger' ];

  function Services
  (
    phemiumApiConnector,
    ClientLogger
  )
  {
    var factory =
    {

      /**
       * Services loaded
       *
       * @var {Array}
       */
      _services: [],



      /**
       * Loads a service by given id
       *
       * @param {number} id
       * @return {Promise}
       */
      load_service: function( id )
      {
        return new Promise( function( resolve )
        {
          var service = this.get_service( id );

          if( service )
          {
            resolve( service );
            return;
          }

          phemiumApiConnector.request( 'services', 'get_service', [ id ] ).then( function( service )
          {
            ClientLogger.info( 'Service loaded successfully: ' + service.external_id, service );
            this._services.push( service );
            resolve( service );
          }.bind( this ) );
        }.bind( this ) );
      },



      /**
       * Returns service by given id
       *
       * @param {number} id
       * @return {Object}
       */
      get_service: function( id )
      {
        var result = null;

        this._services.forEach( function( service )
        {
          if( service.id == id )
          {
            result = service;
          }
        });

        return result;
      }

    };

    return factory;
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Settings', Settings );

  function Settings()
  {
    return {

      /**
       * Available params
       *
       * @var {Object}
       */
      params:
      {
        environment: null,
        enduser_token: null,
        portal_name: null,
        consultation_id: null,
        appointment_external_id: null,
        show_consultations_by_status: null,
        action: null,
        customer_id: null,
        customer_name: null,
        service_id: null,
        face2face: false,
        face2face_phone: null,
        face2face_show_logo: null,
        face2face_show_logo_footer: null,
        voip_notifications: null,
        hide_header: null,
        open_urls_target: null,
        no_redirect: null,
        backward_from_plugin_to_app_icon: null,
        origin_url: null,

        // development params
        theme: null,
        lng: null,
        tls: '1'
      },



      /**
       * Start
       *
       * @return {Promise}
       */
      start: function()
      {
        return new Promise( function( resolve )
        {
          if( !window.settings )
          {
            throw 'Missing "window.settings"';
          }

          this._prepare();
          resolve();
        }.bind( this ) );
      },



      /**
       * Prepares settings
       *
       * @private
       */
      _prepare: function()
      {
        var url_params = this._get_object_from_query_string( location.search );
        var environment = url_params.environment || window.settings.default_environment;

        if( environment )
        {
          window.settings.environment = window.settings.environments[ environment ];
          window.settings.environment_name = environment;
        }
        else if( !window.settings.environment )
        {
          // No default environment has been set. Neither in the URL nor in the settings files (customer-settings / settings.m4)
          throw 'Missing "window.settings.environment"';
        }

        var default_params = window.settings.environment.default_params || {};

        Object.keys( this.params ).forEach( function( param_name )
        {
          if( !(window.plugins && window.plugins.PhemiumEnduserPlugin))
          {
            this.params[ param_name ] = url_params[ param_name ] || default_params[ param_name ] || null;
          }
          else
          {
            this.params[ param_name ] = url_params[ param_name ] || null;
          }

        }.bind( this ) );

        window.settings.theme_path = 'themes/' + ( this.params.theme || window.settings.default_theme );
        window.settings.language_code = this.calculate_language();

        // If App that integrates Phemium configure use_callkit
        if( url_params.extraUseCallkit !== undefined )
        {
          window.settings.VideoCallPluginExtraSettings.use_callkit = url_params.extraUseCallkit;
        }
      },



      /**
       * Returns string of language code
       *
       * @param {String}  portal_language
       */
      calculate_language: function( portal_language )
      {
        var language_code;

        if( this.params.lng )
        {
          language_code = this.params.lng;
        }
        else if( portal_language )
        {
          language_code = portal_language;
        }
        else
        {
          language_code = window.settings.default_language;
        }

        language_code = 'es';

        return language_code;
      },



      /**
       * Returns object from query string
       *
       * @param {String} query_string
       * @private
       */
      _get_object_from_query_string: function( query_string )
      {
        var params = {};

        // Convert query string (like "?enduser_token=xx&consultation_id=1") to parameters
        if( query_string )
        {
          query_string.substr( 1 ).split( '&' ).forEach( function( param )
          {
            var parts = param.split( '=' );

            //In case it comes a true/false value
            if(parts[1] === "true" || parts[1] === "false" )
            {
              params[ parts[0] ] = parts[1] === "true" ? true : false;
            }
            else
            {
              params[ parts[0] ] = decodeURIComponent( parts[1] );
            }

          });
        }

        return params;
      }

    };
  }

})();


(function()
{
  'use strict';

  angular.module( 'app.sdk.enduser' ).factory( 'Stages', Stages );

  Stages.$inject = [ 'phemiumApiConnector' ];

  function Stages( phemiumApiConnector )
  {
    return {

      /**
       * Stages
       *
       * @var {Array}
       */
      stages: [],



      /**
       * Loads stages
       *
       * @return {Promise}
       */
      load: function()
      {
        return new Promise( function( resolve )
        {
          var list_options =
          {
            page: 1,
            rows_per_page: 99999
          };

          phemiumApiConnector.request( 'stages', 'get_stages', [ list_options ] ).then( function( list_result_stages )
          {
            this.stages = list_result_stages.items.map( function( stage )
            {
              stage.name = this._get_stage_name( stage );
              return stage;
            }.bind( this ) );
            resolve();
          }.bind( this ) );
        }.bind( this ) );
      },



      /**
       * Returns stage by given id
       *
       * @param {Object} stage_id
       * @return {Object}
       */
      get_stage: function( stage_id )
      {
        var stage_return = null;

        this.stages.forEach( function( stage )
        {
          if( stage.id === stage_id )
          {
            stage_return = stage;
          }
        });

        return stage_return;
      },



      /**
       * Returns stage name from stage id
       *
       * @param {Object} stage
       * @return {String}
       * @private
       */
      _get_stage_name: function( stage )
      {
        var name = null;

        stage.texts.forEach( function( text )
        {
          if( text.language_code === window.settings.language_code )
          {
            name = text.name;
          }
        });

        return name || stage.texts[0].name;
      }

    };
  }

})();

(function()
{
  'use strict';

  /**
  * Component to control a global alert bar shown when the network connection is lost
  */

  angular.module( 'app' ).component( 'networkAlertBar' ,
  {
    templateUrl: 'shared/components/networkalertbar/network_alert_bar.tpl.html',
    controller: [ NetworkAlertBarController ]
  });

  function NetworkAlertBarController()
  {
    var self = this;

    /**
     * Constructor
     *
     * @private
     */
    self._constructor = function()
    {
    };


    self._constructor();
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).directive( 'pheAvatar', pheAvatar );

  /**
   * Directive to get user avatar image or default image for users without avatar.
   *
   * @returns {Object} directive
   */
  function pheAvatar()
  {
    return {
      scope:
      {
        pheUser: '=',
        pheAvatarWidth: '=',
        pheAvatarHeight: '='
      },
      replace: true,
      controller: pheAvatarController,
      controllerAs: 'pheAvatarController',
      template: '<img title="{{pheAvatarController.title}}" ng-src="{{pheAvatarController.path}}" />',
      bindToController: true
    };
  }

  pheAvatarController.$inject = [ '$window' ];

  /**
   * Avatar directive controller.
   *
   * @param $scope
   * @param $window
   */
  function pheAvatarController( $window )
  {
    this.title = 'Avatar';
    this.path = window.settings.theme_path + '/img/avatar.png';

    if( this.pheUser )
    {
      this.title = ( this.pheUser.presentation_name ) ? this.pheUser.presentation_name : this.title;

      if( this.pheUser.picture_url )
      {
        this.path = this.pheUser.picture_url + '&size=small';
      }
      else if( this.pheUser.picture_resource_id )
      {
        this.path = $window.settings.environment.resources_url  + this.pheUser.picture_resource_id + '&size=small';
      }
    }
  }
})();


(function()
{
  'use strict';

  angular.module( 'app.shared' ).directive( 'pheDevice', pheDevice );

  /**
   * Directive for do different things depending device
   *
   * phe-device="hideOnBrowser"
   *
   * @return {Function}
   */
  function pheDevice( $location )
  {
    return function( scope, element, attrs )
    {
      var value = attrs.pheDevice;
      if( value == 'hideOnBrowser' && ionic.Platform.device().platform == 'browser' )
      {
        element.addClass('hide');
      }
    };
  };
})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).directive('pheEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown", function(event) {
        if(event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.pheEnter);
          });
          //event.preventDefault();
        }
      });
    };
  });
})();


(function()
{
  'use strict';

  angular.module( 'app.shared' ).directive( 'fileread', fileread );

  /**
   * Directive for bind event change on fileread
   *
   * fileread="functionOnCtrl"
   *
   * @return {Function}
   */
  function fileread( $location, $parse )
  {
    return {
      restrict: 'A',
      link: function ( scope, element, attrs )
      {
        var onChangeHandler = scope.$eval(attrs.fileread);
        element.bind('change', onChangeHandler);
      }
    };
  };
})();


(function()
{
  'use strict';

  angular.module( 'app.shared' ).directive( 'pheGoclick', pheGoclick );

  function pheGoclick( $location, $state )
  {
    return function( scope, element, attrs )
    {
      var path = attrs.pheGoclick;

      attrs.$observe( 'pheGoclick', function( new_path )
      {
        path = new_path;
      });

      element.bind( 'click', function()
      {
        scope.$apply( function()
        {
          if( path[0] === '/')
          {
            $location.path( path );
          }
          else
          {
            $state.go( path );
          }
        });
      });
    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).filter( 'secondsToDateTime', [ function()
  {
    return function( seconds )
    {
      return new Date( 1970, 0, 1 ).setSeconds( seconds );
    };
  }]);

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).filter( 'textByLocale', function( $translate, $filter )
  {
    return function( id_values )
    {
      var filtered_id_values = $filter( 'filter' )( id_values, { id: $translate.use() } );

      if( filtered_id_values.length > 0 )
      {
        return filtered_id_values[ 0 ].value ? String( filtered_id_values[ 0 ].value ).replace( /<[^>]+>/gm, '' ) : '';
      }

      return '--';
    }
  });

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).filter( 'trustUrl', [ '$sce', function( $sce )
  {
    return function( url )
    {
      return $sce.trustAsResourceUrl( url );
    };
  }]);

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).factory( 'LoadingService', LoadingService );

  function LoadingService
  (
    $rootScope,
    $ionicLoading
  )
  {
    return {

      /**
       * Show alert popup
       *
       * @param {Object} config
       */
      show: function( config )
      {
        config = config || {};

        var loading_scope = $rootScope.$new( true );
        loading_scope.title = config.title || '';
        loading_scope.text =  config.text || '';
        loading_scope.mini =  config.mini || false;

        $ionicLoading.show(
        {
          templateUrl: 'shared/views/loading.tpl.html',
          scope: loading_scope
        });
      },



      /**
       * Close popup
       */
      hide: function()
      {
        $ionicLoading.hide();
      }

    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).factory( 'NetworkService', NetworkService );

  function NetworkService
  (
    $rootScope,
    $cordovaNetwork,
    ClientLogger
  )
  {
    return {

      /**
       * Returns if network is online
       *
       * @return {Boolean}
       */
      isOnline: function()
      {
        return ionic.Platform.isWebView() ? $cordovaNetwork.isOnline() : navigator.onLine;
      },



      /**
       * Checks network changes
       */
      startWatching: function()
      {
        $rootScope.isOnline = true;

        document.addEventListener( 'online', function()
        {
          $rootScope.isOnline = true;
          ClientLogger.info( 'Network:online Type:' + $cordovaNetwork.getNetwork() );
        }, false );

        document.addEventListener( 'offline', function()
        {
          $rootScope.isOnline = false;
          ClientLogger.info( 'Network:offline' );
        }, false );
      }
    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).factory( 'NotificationService', NotificationService );

  function NotificationService
  (
    $rootScope,
    $ionicPopup,
    $translate,
    $sce,
    Consultant,
    SoundsService
  )
  {

    // **************************************
    // Private
    // **************************************

    /**
     * Notification closed value
     *
     * @var {number}
     * @private
     */
    var NOTIFICATION_CLOSED = -1;


    /**
     * Current popup object
     *
     * @var {Object}
     * @private
     */
    var current_popup = null;


    /**
     * Ensures that keyboard is closed and input message box with ID 'm_message' is not on focus.
     * This is because having focus on m_message will keep opened the keyboard again.
     */
    function _close_keyboard_plugin()
    {
      if( typeof cordova === 'undefined' )
      {
        return;
      }

      var timeline_inputbox = document.getElementById( 'm_message' );

      if( !!timeline_inputbox )
      {
        timeline_inputbox.blur();
      }

      Keyboard.hide();
    }



    /**
     * Show alert popup
     *
     * @param {Object} config
     */
    function show_alert( config )
    {
      if( current_popup && current_popup.close && current_popup.force_no_close )
      {
        return;
      }

      if( current_popup && current_popup.close )
      {
        current_popup.close( NOTIFICATION_CLOSED );
        current_popup = null;

        setTimeout( function()
        {
          this.show_alert( config );
        }.bind( this ), 100 );

        return;
      }

      var modal_scope = $rootScope.$new( true );
      modal_scope.subtitle = config.subtitle;
      modal_scope.body = $sce.trustAsHtml(config.body);

      _close_keyboard_plugin();
      current_popup = $ionicPopup.alert(
      {
        scope: modal_scope,
        cssClass: config.css_class,
        title: config.title,
        templateUrl: 'shared/views/popup.tpl.html',
        okText: config.ok_text,
        okType: config.ok_type
      });

      current_popup.force_no_close = config.force_no_close;
      current_popup.then( function( res )
      {
        config.on_close && config.on_close();

        if( res === true )
        {
          config.on_click && config.on_click();
        }
      });
    }



    /**
     * Show confirm popup
     *
     * @param {Object} config
     */
    function show_confirm( config )
    {
      if( current_popup && current_popup.close && current_popup.force_no_close )
      {
        return;
      }

      if( current_popup && current_popup.close && current_popup )
      {
        current_popup.close( NOTIFICATION_CLOSED );
        current_popup = null;

        setTimeout( function()
        {
          this.show_confirm( config );
        }.bind( this ), 100 );

        return;
      }

      var modal_scope = $rootScope.$new( true );
      modal_scope.subtitle = config.subtitle;
      modal_scope.body = config.body;

      _close_keyboard_plugin();
      current_popup = $ionicPopup.confirm(
      {
        scope: modal_scope,
        cssClass: config.css_class,
        title: config.title,
        templateUrl: 'shared/views/popup.tpl.html',
        okText: config.ok_text,
        okType: config.ok_type,
        cancelText: config.cancel_text,
        cancelType: config.cancel_type
      });

      current_popup.force_no_close = config.force_no_close;
      current_popup.then( function( res )
      {
        config.on_close && config.on_close();

        switch( res )
        {
          case true:
            config.on_ok && config.on_ok();
            break;

          case false:
            config.on_cancel && config.on_cancel();
            break;
        }
      });
    }



    /**
     * Close popup
     */
    function close()
    {
      if( current_popup && current_popup.close && current_popup.force_no_close )
      {
        return;
      }

      if( current_popup && current_popup.close )
      {
        current_popup.close( NOTIFICATION_CLOSED );
        current_popup = null;
      }
    }



    /**
     * Show internal error
     */
    function internal_error()
    {
      show_alert(
      {
        css_class: 'phe-popup-error',
        title: '<i class="icon ion-alert-circled"></i>',
        body: $translate.instant( 'internal_error' ),
        ok_text: $translate.instant( 'retry' ),
        ok_type: 'button-assertive',
        on_click: function()
        {
          window.location.reload();
        }
      });
    }


    /**
     * Show local notification
     *
     * @param {String} local_notification_type
     */
    function show_local_notification( local_notification_type )
    {
      var notification_body;
      var notification_sound;

      switch( local_notification_type )
      {
        case "incoming_call":
          SoundsService.loop( 'calling' );
          notification_body = $translate.instant( 'incoming_call' ) + ' ' + Consultant.consultant.presentation_name;
          notification_sound = "";
          break;
        case "missed_call":
          notification_body = $translate.instant( 'missed_call' ) + ' ' + Consultant.consultant.presentation_name;
          notification_sound = "";
          break
      }

      cordova.plugins.notification.local.schedule(
      {
        id: 1,
        at: Date.now(),
        text: notification_body,
        sound: notification_sound,
        ongoing: true,
        priority: 2
      });

    }


    // **************************************
    // Public / Export
    // **************************************

    return {
      show_alert: show_alert,
      show_confirm: show_confirm,
      close: close,
      internal_error: internal_error,
      show_local_notification: show_local_notification
    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).factory( 'PushNotificationService', PushNotificationService );

  function PushNotificationService
  (
    $rootScope,
    UtilsService,
    ClientLogger,
    phemiumApiConnector,
    Settings,
    $translate
  )
  {

    // **************************************
    // Private
    // **************************************

    /**
     * Initialize process and request permission
     *
     */
    function initialize()
    {
      ClientLogger.debug( '[PushNotificationService.initialize]' );

      if( UtilsService.platform === 'browser' )
      {
        init_firebase_config();
      }
      else
      {
        ClientLogger.debug( '[PushNotificationService.initialize] Push Notifications for installed Apps not yet supported' );
        return;
      }

      has_permission()
        .then( start_notifications );
    }



    /**
     * Initialize Firebase configuration
     *
     */
    function init_firebase_config()
    {
      // Initialize Firebase
      try
      {
        // Only if not previously initialized
        if( firebase.apps.length === 0 )
        {
          firebase.initializeApp( window.settings.firebase );
        }
      }
      catch( exc )
      {
        ClientLogger.error( '[PushNotificationsService.init_firebase_config] Error initializing firebase', exc );
      }
    }



    /**
     * Check if user has given permissions to receive push notifications or not
     *
     * @returns {Promise}
     */
    function has_permission()
    {
      if( UtilsService.platform === 'browser' )
      {
        return new Promise( function( resolve, reject )
        {
          var messaging = firebase.messaging();

          messaging.requestPermission()
            .then( function()
            {
              ClientLogger.info( '[PushNotificationService.has_permission] Notification permission granted.' );
              resolve();
            })
            .catch( function( err )
            {
              ClientLogger.error( '[PushNotificationService.has_permission] Unable to get permission to notify.', err );
              reject();
            });
        });
      }
      else
      {
        ClientLogger.debug( '[PushNotificationService.has_permission] Push Notifications for installed Apps not yet supported' );
      }
    }



    /**
     * Start notifications
     *
     */
    function start_notifications()
    {
      if( UtilsService.platform === 'browser' )
      {
        configure_firebase_remote_notifications();
      }
      else
      {
        ClientLogger.debug( '[PushNotificationService.has_permission] Push Notifications for installed Apps not yet supported' );
      }
    }



    /**
     * Configure Firebase Cloud Messaging
     * This method retrieves the device token and sets the refresh token protocol
     *
     */
    function configure_firebase_remote_notifications()
    {
      if( !( 'serviceWorker' in navigator ) )
      {
        ClientLogger.error( '[PushNotificationService.configure_firebase_remote_notifications] Browser does not support service workers' );
        return;
      }

      // Register service worker
      navigator.serviceWorker.register( './firebase-messaging-sw.js' )
        .then( on_service_worker_registered )
        .catch( function( error )
        {
          ClientLogger.error( '[PushNotificationService.configure_firebase_remote_notifications] An error occurred registering service worker.', error );
        });
    }



    /**
     * Firebase service worker has been registered
     *
     * @param {Object} registration
     */
    function on_service_worker_registered( registration )
    {
      // Register service worker
      var data =
      {
        customer_name: Settings.params.customer_name,
        portal_name: Settings.params.portal_name,
        theme_path: window.settings.theme_path,
        languages: $translate.getTranslationTable( window.settings.language_code ),
        reopen_url: window.location.href
      };

      // Init Service worker and pass initialization data.
      var messaging = firebase.messaging();
      messaging.useServiceWorker( registration );
      registration.active.postMessage( JSON.stringify( data ) );

      get_firebase_token( messaging );
      listen_firebase_token_refresh( messaging );
    }



    /**
     * Get Firebase token
     *
     * @param {Object} messaging
     */
    function get_firebase_token( messaging )
    {
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken()
        .then( function( currentToken )
        {
          if( currentToken )
          {
            ClientLogger.info( '[PushNotificationService.configure_firebase_remote_notifications] Token received', currentToken );
            on_register( { registrationId: currentToken } );
            initialize_firebase_notification_listeners( messaging );
          }
          else
          {
            ClientLogger.error( '[PushNotificationService.configure_firebase_remote_notifications] No Instance ID token available. Request permission to generate one.' );
          }
        })
        .catch( function( err )
        {
          ClientLogger.error( '[PushNotificationService.configure_firebase_remote_notifications] An error occurred while retrieving token.', err );
        });
    }



    /**
     * Initialize firebase notification reception listeners
     *
     * @param {Object} messaging
     */
    function initialize_firebase_notification_listeners( messaging )
    {
      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      //   `messaging.setBackgroundMessageHandler` handler.
      messaging.onMessage( function( payload )
      {
        ClientLogger.info( '[PushNotificationService.foreground_notification] Foreground event', payload );
        on_message_received( payload );
      });

      // Start service worker listener
      navigator.serviceWorker.addEventListener( 'message', function( event )
      {
        // We only expect here messages from the Firebase SW in object format.
        if( typeof event.data !== 'string' )
        {
          return;
        }

        var payload = { data: JSON.parse( event.data ) };
        ClientLogger.info( '[PushNotificationService.background_notification] Background event', payload );
        on_message_received( payload );
      });
    }



    /**
     * Listen for Firebase token refresh
     *
     * @param {Object} messaging
     */
    function listen_firebase_token_refresh( messaging )
    {
      // Manage Token refresh
      messaging.onTokenRefresh( function()
      {
        messaging.getToken()
          .then( function( refresehdToken )
          {
            ClientLogger.info( '[PushNotificationService.on_register] Token refreshed', refresehdToken );
            on_register( { registrationId: refresehdToken } );
          })
          .catch( function( err )
          {
            ClientLogger.error( '[PushNotificationService.configure_firebase_remote_notifications] An error occurred while refreshing token.', err );
          });
      });
    }



    /**
     * Message has been received
     *
     * @param {Object} payload
     */
    function on_message_received( payload )
    {
      if( !payload.data )
      {
        return;
      }

      if( payload.data.type === 'CONSULTATION_CALL_REQUEST' )
      {
        $rootScope.$emit( 'PushNotificationService:consultation_call_request', payload.data );
      }
    }



    /**
     * Device token has been received so we send it to the API.
     *
     * @param {Object} data
     */
    function on_register( data )
    {
      ClientLogger.info( '[PushNotificationService.on_register] Device token', data );
      update_token( data.registrationId );
    }



    /**
     * Update token for enduser
     *
     * @param {String} token
     */
    function update_token( token )
    {
      var push_notification_token_info =
      {
        platform: UtilsService.platform.toLowerCase(),
        app_id: window.settings.package_name,
        registration_token: token,
        device_uuid: ( window.device ) ? window.device.uuid : ClientLogger.get_client_uuid(),
        ios_environment: ( [ 'devel', 'dev', 'integra' ].indexOf( window.settings.environment_name ) !== 1 ) ? 'sandbox': 'production'
      };

      // Update user device token
      phemiumApiConnector.request( 'endusers', 'update_push_notications_token_info', [ push_notification_token_info ] )
        .then( function()
        {
          // Nothing to do
        })
        .catch( function( error )
        {
          ClientLogger.error( '[PushNotificationService.on_register] Error registering token', error );
        });
    }


    // **************************************
    // Public / Export
    // **************************************

    return {
      initialize: initialize
    };
  }

})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).factory( 'SoundsService', SoundsService );

  function SoundsService
  (
    $q,
    $window
  )
  {
    /**
     * Sounds for browser
     *
     * @var {object}
     * @private
     */
    var _sounds_for_browser =  {};

    return {
      preloadSounds: preloadSounds,
      play: play,
      loop: loop,
      stop: stop
    };



    /**
     * Preload sounds
     *
     */
    function preloadSounds()
    {
      if( window.cordova )
      {
        _preloadSimple( 'beep', 'phemium/' + window.settings.theme_path + '/sounds/beep.mp3' );
        _preloadSimple( 'received_msg', 'phemium/' + window.settings.theme_path + '/sounds/received_msg.mp3' );
        _preloadComplex( 'calling', 'phemium/' + window.settings.theme_path + '/sounds/calling.mp3', 1, 1, 0 );
      }
      else
      {
        _sounds_for_browser.received_msg = new Audio( window.settings.theme_path + '/sounds/received_msg.mp3' );
        _sounds_for_browser.calling = new Audio( window.settings.theme_path + '/sounds/calling.mp3' );
        _sounds_for_browser.beep = new Audio( window.settings.theme_path + '/sounds/beep.mp3' );
      }
    }



    /**
     * Play sound
     *
     * @param {string} sound_name
     */
    function play( sound_name )
    {
      if( window.cordova )
      {
        var q = $q.defer();
        $window.plugins.NativeAudio.play( sound_name, function( result )
        {
          q.resolve( result );
        }, function( err )
        {
          q.reject( err );
        }, null);

        return q.promise;
      }
      else
      {
        _sounds_for_browser[ sound_name ].loop = false;
        _sounds_for_browser[ sound_name ].play();
      }
    }



    /**
     * Loop sound
     *
     * @param {string} sound_name
     */
    function loop( sound_name )
    {
      if( window.cordova )
      {
        var q = $q.defer();
        $window.plugins.NativeAudio.loop( sound_name, function( result )
        {
          q.resolve( result );
        }, function( err )
        {
          q.reject( err );
        });

        return q.promise;
      }
      else
      {
        _sounds_for_browser[ sound_name ].loop = true;
        _sounds_for_browser[ sound_name ].play();
      }
    }



    /**
     * Stop
     *
     * @param {string} sound_name
     */
    function stop( sound_name )
    {
      if( window.cordova )
      {
        var q = $q.defer();
        $window.plugins.NativeAudio.stop(sound_name, function( result )
        {
          q.resolve( result );
        }, function( err )
        {
          q.reject( err );
        });
        return q.promise;
      }
      else
      {
        _sounds_for_browser[ sound_name ].pause();
        _sounds_for_browser[ sound_name ].currentTime = 0;
      }
    }



    /**
     * Preload Simple
     *
     * @param {string} id
     * @param {string} assetPath
     */
    function _preloadSimple( id, assetPath )
    {
      var q = $q.defer();

      $window.plugins.NativeAudio.preloadSimple( id, assetPath, function( result )
      {
        q.resolve( result );
      }, function( err )
      {
        q.reject( err );
      });

      return q.promise;
    }



    /**
     * Preload Complex
     *
     * @param {string} id
     * @param {string} assetPath
     * @param {integer} volume
     * @param {integer} voices
     * @param {integer} delay
     */
    function _preloadComplex( id, assetPath, volume, voices, delay )
    {
      var q = $q.defer();

      $window.plugins.NativeAudio.preloadComplex( id, assetPath, volume, voices, delay, function( result )
      {
        q.resolve( result );
      }, function( err )
      {
        q.reject( err );
      });

      return q.promise;
    }

  }
})();

(function()
{
  'use strict';

  angular.module( 'app.shared' ).factory( 'UtilsService', UtilsService );

  function UtilsService
  (
    $rootScope,
    Consultant,
    Portals,
    Settings,
    $state
  )
  {

    /**
     * Allows WebRTC or not
     *
     * @type {Boolean}
     */
    var allows_webrtc;


    /**
     * Set to true when environment supports webRTC but Phemium has not approved it yet.
     *
     * @type {Boolean}
     */
    var webrtc_environment_not_tested;


    /**
     * UAParser Object
     *
     * @type {Object}
     */
    var parser = new UAParser();


    /**
     * Tells if the platform is mobile or not
     *
     * @type {Boolean}
     */
    var is_mobile;


    /**
     * Returns the OS of the platform
     *
     * @type {String}
     */
    var os_name;


    /**
     * Whether we are executing the App over an Android, iOS or browser platform
     *
     * @type {String}
     */
    var platform;



    /* Platform Android version 7.1 requires allow edit camera parameter
     *
     * @type {String}
     */
   var platform_camera_allowEdit = null;



    return {
      get_consultation_consultants_for_header: get_consultation_consultants_for_header,
      detect_webrtc: detect_webrtc,
      get_ua: get_ua,
      init_ua: init_ua,
      items_sort: items_sort,
      allows_webrtc: allows_webrtc,
      webrtc_environment_not_tested: webrtc_environment_not_tested,
      is_mobile: is_mobile,
      os_name: os_name,
      exit_app: exit_app,
      platform: platform,
      platform_camera_allowEdit: platform_camera_allowEdit
    };


    /**
     * Process consultation consultants and return them organized
     *
     * @param {Object} consultation_model
     */
    function get_consultation_consultants_for_header( consultation_model )
    {
      var result =
      {
        names: '',
        avatars: []
      };

      if( consultation_model.data.consultants.length === 0 )
      {
        return result;
      }

      // If we have only one consultant assigned
      if( consultation_model.data.consultants.length === 1 )
      {
        result.names = consultation_model.data.consultants[ 0 ].consultant.presentation_name;
        var consultant = consultation_model.data.consultants[ 0 ].consultant;
        consultant.status_text = Consultant.get_status_text_from_status_id( consultant.status );
        result.avatars = [ consultant ];
        return result;
      }

      // Process multi consultants.
      // Main consultant avatar appears the last as it's the one shown completely
      // Main consultant name appears the first because will be placed alongside his avatar
      var main_consultant = consultation_model.get_main_consultant();
      main_consultant.status_text = Consultant.get_status_text_from_status_id( main_consultant.status );
      var presentation_names = [ main_consultant.presentation_name ];
      result.avatars = [];

      consultation_model.data.consultants.forEach( function( consultant )
      {
        if( consultant.id !== main_consultant.id )
        {
          consultant.status_text = Consultant.get_status_text_from_status_id( consultant.status );
          result.avatars.push( consultant.consultant );

          if( presentation_names.length < 2 )
          {
            presentation_names.push( consultant.consultant.presentation_name );
          }
        }
      }.bind( this ));

      result.avatars.push( main_consultant );
      result.names = presentation_names.join( ', ' );

      // We only show two names. If there are more, it's shown as, for instance, "+3".
      if( consultation_model.data.consultants.length > 2 )
      {
        result.names += ( ' +' + consultation_model.data.consultants.length - 2 );
      }

      return result;
    }



    /**
     * Exit App, check if plugin
     */
    function exit_app()
    {
      if( this.platform !== 'browser' )
      {
        if( Settings.params.consultation_id || Settings.params.face2face )
        {
          ( new window.plugins.PhemiumEnduserPlugin() ).exit();
        }
        else
        {
          $state.go( 'consultations_list' );
        }
      }
      else
      {
        window.location.replace( Portals.get_portal_by_name( Settings.params.portal_name ).redirect_location );
      }
    }



    /**
     * Detects if Web RTC is installed
     */
    function detect_webrtc()
    {
      this.webrtc_environment_not_tested = false;

      // For the moment Android/iOS installed App will always support calls by the use of Linphone
      if( this.platform !== 'browser' )
      {
        this.allows_webrtc = true;
        return;
      }

      // Mobile browser devices are (for now) not allowed to make calls due to several problems:
      // - iOS Browsers: Unable to play sounds/videos without user interaction
      // - Android Browsers: Unable to play sounds without user interaction
      // - iOS/Android waiting room UX is not yet well defined.
      if( this.is_mobile )
      {
        this.allows_webrtc = false;
        return;
      }

      var environment_supports_webrtc = DetectRTC.isWebRTCSupported;
      var phemium_supports_webrtc = Comm.core.Capabilities.is_webrtc_installed();
      this.allows_webrtc = phemium_supports_webrtc || environment_supports_webrtc;

      if( !phemium_supports_webrtc && environment_supports_webrtc )
      {
        this.webrtc_environment_not_tested = true;
      }
    }


    /**
     * Returns the parsed user agent
     */
    function get_ua()
    {
      return parser.getResult();
    }



    /**
     * Initializes user agent
     */
    function init_ua()
    {
      var userAgent = parser.getResult();
      this.is_mobile =  userAgent.device.type ? true: false;
      this.os_name = userAgent.os.name;
      this.platform = window.cordova ? window.device.platform : 'browser';
      $rootScope.platform = this.platform.toLowerCase();

      // Check special platform properties
      if( this.platform.toLowerCase() === 'android' )
      {
        // Special option allow edit for Android 7.1, avoid app crash
        var versionsAllowEdit = [ "7.1","7.1.1","7.1.2" ];
        var enable_allow_edit = versionsAllowEdit.indexOf( window.device.version );
        if( enable_allow_edit !== -1 )
        {
          this.platform_camera_allowEdit = true;
        }
      }
    }


    /**
     * Initializes user agent
     * @param {Object} item_a
     * @param {Object} item_b
     * @returns {boolean}
     *
     */
    function items_sort( item_a, item_b )
    {
      var a_order = item_a.order ? item_a.order : 987654321;
      var b_order = item_b.order ? item_b.order : 987654321;
      return a_order - b_order;
    }

  }
})();
