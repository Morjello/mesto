export class UserInfo {
    constructor({nameSelector, bioSelector}) {
        this._name = nameSelector;
        this._bio = bioSelector;
    }

    getUserInfo() {
        this._userInfo = {
            name: this._name.textContent,
            bio: this._bio.textContent
        };
        
        return this._userInfo;
    };

    setUserInfo(profileData) {
        this._name.textContent = profileData.name
        this._bio.textContent = profileData.bio
    }
}