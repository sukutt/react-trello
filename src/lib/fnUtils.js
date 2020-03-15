import storage from 'lib/storage';

export function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

export async function isSignedIn(UserActions) {
    const signedInInfo = storage.get('signedInInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!signedInInfo) return;

    try {
        await UserActions.checkStatus();
        return true;
    } catch (e) {
        storage.remove('signedInInfo');
        window.location.href = '/auth/login?expired';
    }
}