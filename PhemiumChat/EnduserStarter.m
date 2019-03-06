//
//  EndUserStarter.m
//  PhemiumChatToNativeIntegrationTestApp2
//
//  Created by arnoldmac on 4/3/17.
//  Copyright © 2017 phemium. All rights reserved.
//

#import "EnduserStarter.h"
#import "EnduserViewController.h"

@interface EnduserStarter ()
@end

@implementation EnduserStarter

-(instancetype) initWithEnvironment:(NSString*) environment portalName:(NSString *) portalName token:(NSString *) token theme:(NSString *) theme consultationId:(NSString *) consultationId {
    
    self = [super init];
    if (self) {
        self.viewController = [EnduserViewController new];
        
        NSString* base_url = @"phemium/index.html";
        NSString* url_params = [NSString stringWithFormat:@"enduser_token=%@&environment=%@&portal_name=%@&theme=%@&consultation_id=%@&facetoface=false", token, environment,portalName,theme, consultationId];
        NSString* url = [NSString stringWithFormat: @"%@?%@", base_url, url_params];
        
        self.viewController.startPage = url;
        self.viewController.wwwFolderName = @"file://www";
        self.viewController.modalPresentationStyle = UIModalPresentationFullScreen;
    }
    return self;
}

@end
