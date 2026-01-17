export const getAvatarUrl = (user) => {
    if (!user) return "";
    if (user.profilePic) return user.profilePic;


    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff&size=128&bold=true`;
};
