export class UserInfo {
    constructor({nameSelector, bioSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector); 
        this._bio = document.querySelector(bioSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._userInfo = {
            name: this._name.textContent,
            bio: this._bio.textContent,
        };
        
        return this._userInfo;
    };

    setUserInfo(profileData) {
        this._name.textContent = profileData.name;
        this._bio.textContent = profileData.bio;
    }

    setAllInfo(allData) {
        this._name.textContent = allData.name;
        this._bio.textContent = allData.about;
        this._avatar.src = allData.avatar
        this._id = allData._id;
    }

    setAvatar(avatar) {
        this._avatar.src = avatar.avatar
    }

    getUserId() {
        return this._id;
    } 
}