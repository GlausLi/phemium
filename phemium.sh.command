#! /bin/bash

printf '\nTHIS COMMAND WILL \n1)Copy the Phemium Module code into destination project directory \n2)Attach files into the project.\n\n'
# printf '\nTHIS COMMAND WILL \n1)Copy the Phemium Module code into destination project directory \n2)Attach files into the project.\n3)Modify info.plist for Camera and Microphone.\n\n'
printf 'Please input following and click Enter.\n'

printf '*Full Path of destination directory for PhemiumModule inside Xcode project directory:(You can drag directory over here) '
read PHEMIUMCHAT_DEST_DIRECTORY_PATH
printf '*Full Path of Xcdoe project(not workspace):(You can drag xcodeproj file over here) '
read PROJECT_PATH
# printf '*Microphone Usage Description: '
# read MIC_MSG
# printf '*Camera Usage Description: '
# read CAM_MSG
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
printf '\n'

cd "${DIR}"
# node phemium.js $PHEMIUMCHAT_DEST_DIRECTORY_PATH $PROJECT_PATH $MIC_MSG $CAM_MSG
node phemium.js $PHEMIUMCHAT_DEST_DIRECTORY_PATH $PROJECT_PATH