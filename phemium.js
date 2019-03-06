/*********
 phemium.js
 Integrate phemium module to Project.

 Created by Phemium Team on 2018/12/21.
*********/
'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var xcode = require('xcode');
var shell = require('shelljs');
var plist = require('plist');


var PHEMIUMCHAT_DEST_DIRECTORY_PATH = process.argv[2];
var PROJECT_PATH = process.argv[3];

var PROJECT_NAME = PROJECT_PATH.substring(PROJECT_PATH.lastIndexOf('/') + 1, PROJECT_PATH.lastIndexOf('.xcodeproj'))
console.log("Project Name:" + PROJECT_NAME);

//Copy File To Project
console.log('Copy Files To Project');
copyFile();

// Define pbxproj file
var pbxproj_file = PROJECT_PATH + '/project.pbxproj';
var proj = xcode.project(pbxproj_file);
proj.parseSync();

//Get Project`s default Group
var criteria = {};
criteria.path = PROJECT_NAME;
var projectgroupkey = proj.findPBXGroupKey(criteria);
if(projectgroupkey == undefined){
    console.log('\x1b[31m', 'Cannot Continue Integration. Failed to get Project information, ');
    return;
}
var pluginsgroupkey;
var resourcesgroupkey;
criteria.path = "PhemiumChat";

//Create PhemiumChat Group as child of Main Group
var phemiumgroupkey = proj.findPBXGroupKey(criteria);
if (phemiumgroupkey == undefined) {
    console.log('Create Dir : PhemiumChat');
    var pbxgroup = proj.addPbxGroup([], "PhemiumChat", "PhemiumChat");
    phemiumgroupkey = pbxgroup.uuid;
    proj.addToPbxGroup(phemiumgroupkey, projectgroupkey);
}else{
    console.log('Already have PhemiumChat Module');
    return;
}
var phemiumFolder = PHEMIUMCHAT_DEST_DIRECTORY_PATH + '/PhemiumChat';

//Create Frameworks Group if not exist.
criteria.path = "Frameworks";
var frameworkgroupkey = proj.findPBXGroupKey(criteria);
if (frameworkgroupkey == undefined) {
    console.log('Create Dir:Frameworks');
    fs.mkdirSync(path.join(PHEMIUMCHAT_DEST_DIRECTORY_PATH, "Frameworks"));
    var pbxgroup = proj.addPbxGroup([], "Frameworks", "Frameworks");
    frameworkgroupkey = pbxgroup.uuid;
    proj.addToPbxGroup(frameworkgroupkey, projectgroupkey);
}

// If the build phase doesn't exist, add it
if (proj.pbxEmbedFrameworksBuildPhaseObj(proj.getFirstTarget().uuid) == undefined) {
    console.log("BuildPhase not found in XCode project. Adding PBXCopyFilesBuildPhase - Embed Frameworks");
    proj.addBuildPhase([], 'PBXCopyFilesBuildPhase', "Embed Frameworks", proj.getFirstTarget().uuid, 'frameworks');
}

//Add File to XCode Project
removeFromXcodeProject(phemiumFolder);
addToXcodeProject(phemiumFolder);

//Prefix Header
var prefix_header = proj.getBuildProperty('GCC_PREFIX_HEADER');
if (prefix_header !== undefined) {
    if (prefix_header !== '\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/PrefixHeader.pch\"') {
        console.log('\x1b[36m%s\x1b[0m', 'Prefix PCH Header(' + prefix_header + ') has been already set on this project. \n Need to update it manually. Please check document.');
    }
}else{
    console.log('Set Prefix PCH Header: PhemiumChat/PrefixHeader.pch');
    proj.addBuildProperty('GCC_PREFIX_HEADER', '\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/PrefixHeader.pch\"');
}

// Header Search Path
console.log('Add Header Search Path');
proj.addToHeaderSearchPaths('\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/**\"');
//Libary Search Path
proj.addToLibrarySearchPaths('\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/**\"');

// Add Other Flag to Project Settings
console.log('Add Other Linker Flag: -ObjC');
proj.addBuildProperty('OTHER_LDFLAGS', '\"-ObjC\"');

// Add Configuration for iosrtc plugin
console.log('Add Configuration for iosrtc plugin');
var runpath_searchpath = proj.getBuildProperty('LD_RUNPATH_SEARCH_PATHS');
if (runpath_searchpath === undefined) {
    proj.addBuildProperty('LD_RUNPATH_SEARCH_PATHS', ['\"@executable_path/Frameworks\"']);
}else if (typeof runpath_searchpath === 'string') {
    if(runpath_searchpath.indexOf("@executable_path/Frameworks") == -1){
        proj.addBuildProperty('LD_RUNPATH_SEARCH_PATHS', [runpath_searchpath, '\"@executable_path/Frameworks\"']);
    }
}else{
    var value = [];
    runpath_searchpath.forEach(function(element){
        if(element.indexOf("@executable_path/Frameworks") == -1){
            value.push(element);
        }
    });
    value.push('\"@executable_path/Frameworks\"');
    proj.addBuildProperty('LD_RUNPATH_SEARCH_PATHS', value);
}

proj.addBuildProperty('ENABLE_BITCODE', '\"NO\"');
proj.addBuildProperty('SWIFT_VERSION', '\"4.0\"');

var bridge_header = proj.getBuildProperty('SWIFT_OBJC_BRIDGING_HEADER');
if (bridge_header != undefined) {
    console.log('\x1b[36m%s\x1b[0m', 'Objective C Bridging Header(' + bridge_header + ') has been already set on this project. \n Need to update it manually. Please check document.');
}else{
    console.log('Set Objective C Bridging Header: PhemiumChat/Bridging-Header.h');
    proj.addBuildProperty('SWIFT_OBJC_BRIDGING_HEADER', '\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/Bridging-Header.h\"');
}

// if (bridge_header === undefined) {
//     proj.addBuildProperty('SWIFT_OBJC_BRIDGING_HEADER', ['\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/Bridging-Header.h\"']);
// }else if (typeof bridge_header === 'string') {
//     proj.addBuildProperty('SWIFT_OBJC_BRIDGING_HEADER', [bridge_header, '\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/Bridging-Header.h\"']);
// }else{
//     bridge_header.push('\"$(SRCROOT)/$(PROJECT_NAME)/PhemiumChat/Bridging-Header.h\"');
//     proj.addBuildProperty('SWIFT_OBJC_BRIDGING_HEADER', bridge_header);
// }

// Add Run Script
console.log('Add Shell Script');
var shellOut = fs.readFileSync('shellscript.txt').toString();
var optionsForShellScript = {};
optionsForShellScript.shellPath = '\"/bin/sh\"';
optionsForShellScript.shellScript = shellOut;
proj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Run Script For Phemium', null, optionsForShellScript);

// Add System Framework
console.log('Add System Framework');
var frameworkFile = proj.addFramework('usr/lib/libz.tbd');
proj.addToPbxGroup(frameworkFile, frameworkgroupkey);
var frameworkFile = proj.addFramework('usr/lib/libiconv.tbd');
proj.addToPbxGroup(frameworkFile, frameworkgroupkey);
var frameworkFile = proj.addFramework('usr/lib/libresolv.tbd');
proj.addToPbxGroup(frameworkFile, frameworkgroupkey);
var frameworkFile = proj.addFramework('System/Library/Frameworks/OpenGLES.framework');
proj.addToPbxGroup(frameworkFile, frameworkgroupkey);
var frameworkFile = proj.addFramework('System/Library/Frameworks/AudioToolbox.framework');
proj.addToPbxGroup(frameworkFile, frameworkgroupkey);
var frameworkFile = proj.addFramework('System/Library/Frameworks/VideoToolbox.framework');
proj.addToPbxGroup(frameworkFile, frameworkgroupkey);

fs.writeFileSync(proj.filepath, proj.writeSync(), 'utf8');


//Modify info.plist to use Camera, Microphone
// console.log('Modify Info.plist for Camera and Microphone');

// var plist_path = proj.getBuildProperty('INFOPLIST_FILE');
// if (plist_path.startsWith("\"")) {
//     plist_path = plist_path.substring(1, plist_path.length - 1);
// }
// if (plist_path.startsWith("$(SRCROOT)")) {
//     plist_path = plist_path.substring("$(SRCROOT)".length + 1);
// }
// plist_path = PHEMIUMCHAT_DEST_DIRECTORY_PATH + "/../" + plist_path;
// var infolist = plist.parse(fs.readFileSync(plist_path, 'utf8'));
// if(infolist['NSMicrophoneUsageDescription'] == undefined){
//     infolist['NSMicrophoneUsageDescription'] = 'Use your microhphone to make calls.';
// }
// if(infolist['NSCameraUsageDescription'] == undefined){
//     infolist['NSCameraUsageDescription'] = 'Use your camera to make video calls.';
// }
// if(infolist['UIBackgroundModes'] == undefined){
//     infolist['UIBackgroundModes'] = ['audio', 'voip'];
// }else{
//     infolist['UIBackgroundModes'].push('audio', 'voip');
// }

// fs.writeFileSync(plist_path, plist.build(infolist), 'utf8');

console.log('\x1b[42m' ,'Integration finished Successfully', '\x1b[0m');

function copyFile() {
    var source_dir = 'PhemiumChat';

    if (!fs.existsSync(source_dir)) {
        throw Error("File does not Exist...");
    }

    // check that src path is inside plugin directory
    var real_path = fs.realpathSync(source_dir);

    var dest = PHEMIUMCHAT_DEST_DIRECTORY_PATH + '/' + source_dir;
    if (fs.existsSync(dest)) {
        console.log("File already Exist. Remove current directory and copy again.");
        shell.rm('-rf', dest);
    }
    shell.mkdir('-p', dest);
    //console.log(path.dirname(dest)); return;
    if (fs.statSync(source_dir).isDirectory()) {
        // XXX shelljs decides to create a directory when -R|-r is used which sucks. http://goo.gl/nbsjq
        shell.cp('-Rf', path.join(source_dir, '/*'), dest);
    } else {
        //shell.cp('-f', src, dest);
    }
}

function removeFromXcodeProject(folder) {
    
}

function addToXcodeProject(folder) {
    var phemiumGroup = proj.getPBXGroupByKey(phemiumgroupkey);
    //Create Plugins Group If not exist
    console.log('Create Dir:Plugins');
    var pbxgroup = proj.addPbxGroup([], "Plugins", "Plugins");
    pluginsgroupkey = pbxgroup.uuid;
    proj.addToPbxGroup(pluginsgroupkey, phemiumgroupkey);

    //Create Resources Group If not exist
    console.log('Create Dir:Resources');
    var pbxgroup = proj.addPbxGroup([], "Resources", "Resources");
    resourcesgroupkey = pbxgroup.uuid;
    proj.addToPbxGroup(resourcesgroupkey, phemiumgroupkey);

    fs.readdirSync(folder).forEach(file => {
        switch (file) {
            case "Plugins":
                readPluginsDirectory(path.join(folder, "Plugins"));
                break;
            case "Resources":
                readResourcesDirectory(path.join(folder, "Resources"));
                break;
            case "CordovaLib":
                // addCordovaLib(path.join(folder, "CordovaLib"));
                break;
            case "www":
                proj.addResourceFile(file, {}, phemiumgroupkey);
                break;
            case "config.xml":
                proj.addResourceFile(file, {}, phemiumgroupkey);
                break;
            case "Bridging-Header.h":
                proj.addFile(file, phemiumgroupkey);
                break;
            case "PrefixHeader.pch":
                proj.addFile(file, phemiumgroupkey);
                break;
            case "EnduserStarter.h":
                proj.addHeaderFile(file, {}, phemiumgroupkey);
                break;
            case "EnduserStarter.m":
                proj.addSourceFile(file, {}, phemiumgroupkey);
                break;
            default:
                break;
        }
    });
}

function addCordovaLib(folder) {
    //Create Products Group, and add libCordova.a and Cordova.framework in group
    var cordovaProductGroup = proj.addPbxGroup([], "Products", "Products");
    var cordovaProductkey = cordovaProductGroup.uuid;

    var libCordova_a_file = proj.addFile("libCordova.a", cordovaProductkey);
    libCordova_a_file = proj.removeFile("libCordova.a", cordovaProductkey);
    libCordova_a_file.uuid = proj.generateUuid();
    proj.addToPbxBuildFileSection(libCordova_a_file);
    proj.addToPbxFrameworksBuildPhase(libCordova_a_file);

    var libCordova_a_ref = libCordova_a_file.fileRef;
    var cordova_framework_ref = proj.generateUuid();

    proj.getPBXGroupByKey(cordovaProductkey).children.push(
        {
            value: libCordova_a_ref,
            comment: "libCordova.a"
        },
        {
            value: cordova_framework_ref,
            comment: "Cordova.framework"
        }
    );

    //Get UUID from CordovaLib.xcodeproj
    var cordovalib_file = proj.addFile("CordovaLib/CordovaLib.xcodeproj", phemiumgroupkey);
    // Define pbxproj file
    var cordovalibproj_file = folder + '/CordovaLib.xcodeproj/project.pbxproj';
    var cordovalibproj = xcode.project(cordovalibproj_file);
    cordovalibproj.parseSync();

    var targetUuid1 = proj.generateUuid(),
        targetUuid2 = proj.generateUuid();

    var pbxFileReferences = cordovalibproj.pbxFileReferenceSection();
    for(var fileKey in pbxFileReferences){
        var fileRef = (pbxFileReferences[fileKey]);
        if (typeof(fileRef) !== 'string') {
            for(var subKey in fileRef){
                if((subKey == "path")  && fileRef[subKey] == 'libCordova.a'){
                    targetUuid1 = fileKey;
                }
                if((subKey == "path")  && fileRef[subKey] == 'Cordova.framework'){
                    targetUuid2 = fileKey;
                }
            }
        }
    }
    
    //Add PBXContainerItemProxy Section
    var pbxContainerItemProxy = "PBXContainerItemProxy",
        itemProxyUuid1 = proj.generateUuid(),
        itemProxyUuid2 = proj.generateUuid(),
        pbxContainerItemProxySection = proj.hash.project.objects[pbxContainerItemProxy],
        itemProxy1 = {
            isa: pbxContainerItemProxy,
            containerPortal: cordovalib_file.fileRef,
            containerPortal_comment: cordovalib_file.basename,
            proxyType: 2,
            remoteGlobalIDString: targetUuid1,
            remoteInfo: "CordovaLib"
        },
        itemProxy2 = {
            isa: pbxContainerItemProxy,
            containerPortal: cordovalib_file.fileRef,
            containerPortal_comment: cordovalib_file.basename,
            proxyType: 2,
            remoteGlobalIDString: targetUuid2,
            remoteInfo: "Cordova"
        };
    if (!pbxContainerItemProxySection) {
        pbxContainerItemProxySection = {};
    }
    pbxContainerItemProxySection[itemProxyUuid1] = itemProxy1;
    pbxContainerItemProxySection[itemProxyUuid2] = itemProxy2;
    proj.hash.project.objects[pbxContainerItemProxy] = pbxContainerItemProxySection;

    //Add PbxReferenceProxy Section
    var pbxReferenceProxy = "PBXReferenceProxy",
        pbxReferenceProxySection = proj.hash.project.objects[pbxReferenceProxy],
        itemReferenceProxy1 = {
            isa: pbxReferenceProxy,
            fileType: "archive.ar",
            path: "libCordova.a",
            remoteRef: itemProxyUuid1,
            sourceTree: "BUILT_PRODUCTS_DIR"
        },
        itemReferenceProxy2 = {
            isa: pbxReferenceProxy,
            fileType: "wrapper.framework",
            path: "Cordova.framework",
            remoteRef: itemProxyUuid2,
            sourceTree: "BUILT_PRODUCTS_DIR"
        };
    if (!pbxReferenceProxySection) {
        pbxReferenceProxySection = {};
    }
    pbxReferenceProxySection[libCordova_a_ref] = itemReferenceProxy1;
    pbxReferenceProxySection[cordova_framework_ref] = itemReferenceProxy2;
    proj.hash.project.objects[pbxReferenceProxy] = pbxReferenceProxySection;

    var projectRef = proj.getFirstProject()['firstProject']["projectReferences"];
    if (!projectRef) {
        projectRef = [];
    }
    var itemProjectRef = {
        ProductGroup: cordovaProductkey,
        ProductGroup_comment: "Products",
        ProjectRef: cordovalib_file.fileRef,
        ProjectRef_comment: cordovalib_file.basename
    };
    projectRef.push(itemProjectRef);
    proj.getFirstProject()['firstProject']["projectReferences"] = projectRef;
    console.log("projectRef: " + JSON.stringify(projectRef));
}

function readPluginsDirectory(folder) {
    if (pluginsgroupkey == undefined) return;
    fs.readdirSync(folder).forEach(file => {
        var fullpath = path.join(folder, file);
        var pluginIndex = folder.indexOf('Plugins');

        if (fs.lstatSync(fullpath).isDirectory()) {
            if (file.indexOf('framework') >= 0) {
                var prefixPath = folder.substring(pluginIndex);
                var customFrameworkFile = proj.addFramework(path.join(phemiumFolder, prefixPath, file), {
                    customFramework: true,
                    embed: true,
                    sign: true
                });
                return;
            }
            readPluginsDirectory(fullpath);
        } else {
            var fileExt = path.extname(file);
            var prefixPath = folder.substring(pluginIndex + 8);
            switch (fileExt) {
                case ".h":
                    proj.addHeaderFile(path.join(prefixPath, file), {}, pluginsgroupkey);
                    break;
                case ".m":
                    proj.addSourceFile(path.join(prefixPath, file), {}, pluginsgroupkey);
                    break;
                case ".swift":
                    proj.addSourceFile(path.join(prefixPath, file), {}, pluginsgroupkey);
                    break;
                case ".a":
                    prefixPath = folder.substring(pluginIndex);
                    var libfile = proj.addFramework(path.join(phemiumFolder, prefixPath, file));
                    break;
            }
        }
    })
}

function readResourcesDirectory(folder) {
    if (resourcesgroupkey == undefined) return;
    fs.readdirSync(folder).forEach(file => {
        proj.addResourceFile(file, {}, resourcesgroupkey);
        /*
        var fullpath = path.join(folder, file);
        if (fs.lstatSync(fullpath).isDirectory()){
        if (file.indexOf('bundle') >= 0) {
        proj.addResourceFile(file, {}, resourcesgroupkey);
        return;
        }
        readResourcesDirectory(fullpath);
        }else{
        var fileExt = path.extname(file);
        switch(fileExt){
        case ".png":
        proj.addResourceFile(file, {}, resourcesgroupkey);
        break;
        case ".wav":
        proj.addResourceFile(file, {}, resourcesgroupkey);
        break;
        case ".ttf":
        proj.addResourceFile(file, {}, resourcesgroupkey);
        break;
        case ".xib":
        proj.addResourceFile(file, {}, resourcesgroupkey);
        break;
        case ".pem":
        proj.addResourceFile(file, {}, resourcesgroupkey);
        break;
        }
        }*/
    })
}
