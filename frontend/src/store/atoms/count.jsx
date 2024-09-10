import { atom } from 'recoil';

export const usernameAtom = atom({
    key: "usernameAtom",
    default:""
});

export const passwordAtom = atom({
    key: "passwordAtom",
    default:""
});

export const firstnameAtom = atom({
    key: "firstnameAtom",
    default:""
});

export const lastnameAtom = atom({
    key: "lastnameAtom",
    default:""
});


export const amountAtom = atom({
    key:"amountAtom",
    default: 0
})

export const toAtom = atom({
    key:"toAtom",
    default:""
})

export const balanceAtom = atom({
    key:"balanceAtom",
    default:0
})