export const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function attack({attacker, receiver}){
    const receiverDamage = attacker.attack - (attacker.level - receiver.level) * 1.25;
    const finalDamage = receiverDamage -receiver.defence / 2;
    return finalDamage;
};

export const magic = ({attacker, receiver}) => {
    const receiverDamage = attacker.magic - (attacker.level - receiver.level) * 1.25;
    const finalDamage = receiverDamage -receiver.magicDefence / 2;
    return finalDamage;
};

export const heal = ({receiver}) => {
    return receiver.magic + receiver.level * 0.25;
};

