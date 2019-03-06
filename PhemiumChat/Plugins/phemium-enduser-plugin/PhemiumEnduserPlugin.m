#import "PhemiumEnduserPlugin.h"
#import "EnduserViewController.h"
#import <UIKit/UIKit.h>
#import <Cordova/CDVViewController.h>
#import <AudioToolbox/AudioServices.h>

@implementation PhemiumEnduserPlugin


- (void)exit_app: (CDVInvokedUrlCommand*)command
{
    [[self topViewController] dismissViewControllerAnimated:YES completion:nil];
}

- (void)open: (CDVInvokedUrlCommand*)command
{
    UIUserNotificationType types = (UIUserNotificationType) (UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert);

    NSString* base_url = @"phemium/index.html";
    NSString* url_params = (NSString*)[command.arguments objectAtIndex:0];
    NSString* url = [NSString stringWithFormat: @"%@?%@", base_url, url_params];

    UIUserNotificationSettings *mySettings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:mySettings];

    EnduserViewController* testViewController = [[EnduserViewController alloc] init];
    testViewController.wwwFolderName = @"file://www";
    testViewController.startPage = url;
    testViewController.modalPresentationStyle = UIModalPresentationFullScreen;

    [[self topViewController] presentViewController:testViewController animated:YES completion:nil];
}

- (void)onNotificationReceived: (CDVInvokedUrlCommand*)command
{
    UIApplicationState state = [UIApplication sharedApplication].applicationState;

    if( state == UIApplicationStateActive )
    {
        CDVViewController* viewController = [CDVViewController new];
        viewController.startPage = @"phemium_incoming_call.html";
        viewController.modalPresentationStyle = UIModalPresentationFullScreen;

        [[self topViewController] presentViewController:viewController animated:YES completion:nil];

    }
    else
    {
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
        [[UIApplication sharedApplication] cancelAllLocalNotifications];

        UILocalNotification *localNot = [[UILocalNotification alloc] init];

        localNot.fireDate = [[NSDate alloc] initWithTimeIntervalSinceNow:0];
        localNot.alertBody = @"Llamada entrante";
        localNot.soundName = UILocalNotificationDefaultSoundName;
        localNot.applicationIconBadgeNumber = 0;

        [[UIApplication sharedApplication] scheduleLocalNotification:localNot];
    }


}


- (void)checkNotificationsPermissions: (CDVInvokedUrlCommand*)command
{
    CDVCommandStatus allowed = CDVCommandStatus_ERROR;
    if ([[UIApplication sharedApplication] backgroundRefreshStatus] == UIBackgroundRefreshStatusAvailable)
    {
        UIUserNotificationSettings *grantedSettings = [[UIApplication sharedApplication] currentUserNotificationSettings];

        if (grantedSettings.types & UIUserNotificationTypeAlert ){
            allowed = CDVCommandStatus_OK;
        }
    }

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus: allowed];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}


- (UIViewController *)topViewController{
    return [self topViewController:[UIApplication sharedApplication].keyWindow.rootViewController];
}

- (UIViewController *)topViewController:(UIViewController *)rootViewController
{
    if (rootViewController.presentedViewController == nil) {
        return rootViewController;
    }

    if ([rootViewController.presentedViewController isMemberOfClass:[UINavigationController class]]) {
        UINavigationController *navigationController = (UINavigationController *)rootViewController.presentedViewController;
        UIViewController *lastViewController = [[navigationController viewControllers] lastObject];
        return [self topViewController:lastViewController];
    }

    UIViewController *presentedViewController = (UIViewController *)rootViewController.presentedViewController;
    return [self topViewController:presentedViewController];
}

- (void)dealloc
{

}

@end
