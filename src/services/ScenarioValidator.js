import ROLES from "../data/roles.json";

let Types = {};
for (var role in ROLES) {
    for (var type in role["types"]) {
        Types[type] = role["affiliation"]
    }
}

const RoleInputRegex = /[a-zA-Z]+(\s?[+-]\s?[a-zA-Z]+)*/g
const Rolename = /[a-zA-Z]+/g;
const op = /[+-]/g;

const ConcatOutput = (coloredRoles, ops) => {
    let result = []
    for (let i = 0; i < coloredRoles.length; i++) {
        result.push(coloredRoles[i]);
        if (i < ops.length) {
            result.push(ops[i]);
        }
    }
    return result;
}

const MonNullMatch = (s, r) => {
    let res = s.match(r)
    if (res == null) {
        res = []
    }
    return res;
}

const ColorRoleInput = (roleInput) => {
    let Types = {};
    Object.values(ROLES).forEach((role) => {
        role.types.forEach((type) => { Types[type] = role.affiliation })
    })


    let totalMatch = MonNullMatch(roleInput, RoleInputRegex);
    if (totalMatch.length === 0 || totalMatch[0] !== roleInput) {
        return <b color='black'> {roleInput} </b>
    }
    let roleMatches = MonNullMatch(roleInput, Rolename)
    let opMatches = MonNullMatch(roleInput, op)
    if (roleMatches.length - 1 !== opMatches.length) {
        return <b color='black'> {roleInput} </b>
    }
    let coloredRoles = []
    for (var roleMatch of roleMatches) {
        let affiliation
        if (roleMatch in ROLES) {
            affiliation = ROLES[roleMatch]["affiliation"]

        } else if (roleMatch in Types) {
            affiliation = Types[roleMatch]
        } else {
            affiliation = "NotFound"
        }
        switch (affiliation) {
            case "Town": coloredRoles.push(<span style={{ color: "#00802b" }}> {roleMatch} </span>); break;
            case "Mafia": coloredRoles.push(<span style={{ color: "#990000" }}> {roleMatch} </span>); break;
            case "Neutral": coloredRoles.push(<span style={{ color: "#cccc00" }}> {roleMatch} </span>); break;
            case "SerialKiller": coloredRoles.push(<span style={{ color: "#0000b3" }}> {roleMatch} </span>); break;
            case "MassMurder": coloredRoles.push(<span style={{ color: "#602020" }}> {roleMatch} </span>); break;
            default: coloredRoles.push(<span style={{ color: "#000000" }}> {roleMatch} </span>); break;
        }
    }
    return ConcatOutput(coloredRoles, opMatches);
}

export default ColorRoleInput;