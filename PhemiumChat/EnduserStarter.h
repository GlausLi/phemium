//
//  EndUserStarter.h
//  PhemiumChatToNativeIntegrationTestApp2
//
//  Created by arnoldmac on 4/3/17.
//  Copyright © 2017 phemium. All rights reserved.
//

#import <Foundation/Foundation.h>

@class EnduserViewController;

@interface EnduserStarter : NSObject {
    NSString *jsString;
}
@property (nonatomic, strong) EnduserViewController *viewController;

-(instancetype) initWithEnvironment:(NSString*) environment portalName:(NSString *) portalName token:(NSString *) token theme:(NSString *) theme consultationId:(NSString *) consultationId;

@end
