window.settings = {
  "app_name": "Phemium Luxmed",
  "package_name": "com.phemium.enduser.luxmed",
  "default_theme": "grupa-luxmed",
  "default_environment": "dev",
  "default_language": "pl",
  "default_locale": "pl",
  "guiVideoCallPluginSettings": {
    "main_color": "#18a606",
    "secondary_color": "#0e6303",
    "font_size": 0,
    "font_color": null,
    "display_topview_mode": null,
    "call_recording_notification_visible": "no",
    "log_mode": false,
    "chat_mode": "WithChat",
    "zoom_mode": "zoom"
  },
  "VideoCallPluginExtraSettings": {
    "transport_mode": "tls",
    "extra_toemail": "testphemium@gmail.com",
    "use_callkit": "true"
  },
  "cordova_build": {
    "ios": {
      "debug": {
        "developmentTeam": "DEFINED_IN_CUSTOMER"
      },
      "release": {
        "developmentTeam": "DEFINED_IN_CUSTOMER"
      }
    }
  },
  "environments": {
    "devel": {
      "files_folder": "phemium_enduser_app_luxmed_dev",
      "api_url": "https://vchata-dev.luxmed.pl/v1/api",
      "bayeux_url": "https://vchata-dev.luxmed.pl/v1/faye",
      "resources_url": "https://vchata-dev.luxmed.pl/v1/api/resources?resid=",
      "templates_url": "https://vchatt-dev.luxmed.pl",
      "default_params": {
        "enduser_token": null,
        "portal_name": null
      }
    },
    "preproduction": {
      "files_folder": "phemium_enduser_app_luxmed_preproduction",
      "api_url": "https://vchata-pre.luxmed.pl/v1/api",
      "bayeux_url": "https://vchata-pre.luxmed.pl/v1/faye",
      "resources_url": "https://vchata-pre.luxmed.pl/v1/api/resources?resid=",
      "templates_url": "https://vchatt-pre.luxmed.pl",
      "default_params": {
        "enduser_token": null,
        "portal_name": null
      }
    },
    "production": {
      "files_folder": "phemium_enduser_app_luxmed_production",
      "api_url": "https://vchata.luxmed.pl/v1/api",
      "bayeux_url": "https://vchata.luxmed.pl/v1/faye",
      "resources_url": "https://vchata.luxmed.pl/v1/api/resources?resid=",
      "templates_url": "https://vhcatt.luxmed.pl",
      "default_params": {
        "enduser_token": null,
        "portal_name": null
      }
    }
  },
  "firebase": {
    "apiKey": "AIzaSyBLdU7pnkKhK_zHoK8efFqdbRap3G1e_3k",
    "authDomain": "FIREBASE_AUTHDOMAIN",
    "databaseURL": "FIREBASE_DBURL",
    "projectId": "phemium-enduser-webapp",
    "storageBucket": "FIREBASE_STORAGEBUCKET",
    "messagingSenderId": "293981345852"
  },
  "version": "0.0.0-20190225104008-50ee79c2-release-3.5.0",
  "branch": "release-3.5.0"
};