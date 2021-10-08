
import { Alert } from 'react-native';
import {
    check,
    request,
    RESULTS,
    requestMultiple,
} from 'react-native-permissions';

// This function can be used anywhere as it supports multiple permissions. 
// It checks for permissions and then requests for it.
export async function checkMultiplePermissions(permissions) {

    try {


        let isPermissionGranted = false;
        const statuses = await requestMultiple(permissions);

        // Alert.alert("e", statuses)


        for (var index in permissions) {
            if (statuses[permissions[index]] === RESULTS.GRANTED) {

                isPermissionGranted = true;
            } else {
                isPermissionGranted = false;
                break;
            }
        }
        return isPermissionGranted;
    } catch (e) {
        // Alert.alert("e", e)
    }
}

// In case you want to check a single permission
export async function checkPermission(permission) {
    var isPermissionGranted = false;
    const result = await check(permission);
    switch (result) {
        case RESULTS.GRANTED:
            isPermissionGranted = true;
            break;
        case RESULTS.DENIED:
            isPermissionGranted = false;
            break;
        case RESULTS.BLOCKED:
            isPermissionGranted = false;
            break;
        case RESULTS.UNAVAILABLE:
            isPermissionGranted = false;
            break;
    }
    return isPermissionGranted;
}
