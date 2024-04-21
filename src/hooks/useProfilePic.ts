import { useMemo } from 'react';

const useProfilePic = (displayName : any) => {
  const getInitial = (name: any) => {
    if (!name || typeof name !== 'string') return '';

    const initials = name
      .trim()
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');

    return initials;
  };

  const getBackgroundColor = (initial : any) => {
    const colors = ['#FFC0CB', '#FFA07A', '#20B2AA', '#87CEEB', '#9370DB']; // Add more colors as needed
    const charCodeSum = initial.split('').reduce((acc: any, char: any) => acc + char.charCodeAt(0), 0);
    const colorIndex = charCodeSum % colors.length;
    return colors[colorIndex];
  };

  const profilePicInitial = useMemo(() => getInitial(displayName), [displayName]);
  const backgroundColor = useMemo(() => getBackgroundColor(profilePicInitial), [profilePicInitial]);

  return { profilePicInitial, backgroundColor };
};

export default useProfilePic;
