export class UserInfo {
    constructor({name, bio}) {
        this._name = name;
        this._bio = bio;
        console.log(this._name);
        console.log(this._bio)
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