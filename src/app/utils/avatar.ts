export function getRandomAvatarUrl(seed: string) {
    const topTypes = ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'LongHairBigHair', 'ShortHairShortFlat'];
    const accessoriesTypes = ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'];
    const hairColors = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'];
    const facialHairTypes = ['Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum'];
    const clotheTypes = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck'];
    const eyeTypes = ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'];
    const eyebrowTypes = ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'SadConcerned', 'UnibrowNatural', 'UpDown', 'UpDownNatural'];
    const mouthTypes = ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'];
    const skinColors = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'];

    const randomChoice = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    return `https://avataaars.io/?avatarStyle=Circle&topType=${randomChoice(topTypes)}&accessoriesType=${randomChoice(accessoriesTypes)}&hairColor=${randomChoice(hairColors)}&facialHairType=${randomChoice(facialHairTypes)}&clotheType=${randomChoice(clotheTypes)}&eyeType=${randomChoice(eyeTypes)}&eyebrowType=${randomChoice(eyebrowTypes)}&mouthType=${randomChoice(mouthTypes)}&skinColor=${randomChoice(skinColors)}&seed=${encodeURIComponent(seed)}`;
}