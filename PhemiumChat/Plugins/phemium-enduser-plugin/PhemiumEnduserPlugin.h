#import <Cordova/CDVPlugin.h>

@interface PhemiumEnduserPlugin : CDVPlugin

- (void)onNotificationReceived: (CDVInvokedUrlCommand*)command;
- (void)checkNotificationsPermissions: (CDVInvokedUrlCommand*)command;


@end