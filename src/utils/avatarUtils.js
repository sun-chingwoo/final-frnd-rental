export const getAvatarUrl = (user) => {
    if (!user) return "";
    if (user.profilePic) return user.profilePic;

    // Fallback to "Initials" style for a cleaner, more professional look
    // Using ui-avatars for reliable initials generation with nice colors
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff&size=128&bold=true`;
};
