const languagePack = require("./languagePack")

module.exports = index => {
    let result

    if (index < 16) result = languagePack.RU.underweight
    else if (index < 18.5) result = languagePack.RU.thinness
    else if (index < 25) result = languagePack.RU.normalweight
    else if (index < 30) result = languagePack.RU.overweight
    else if (index < 35) result = languagePack.RU.obesity_1
    else if (index < 40) result = languagePack.RU.obesity_2
    else result = languagePack.RU.obesity_3

    return languagePack.RU.message + ` ` + index + `\n` + result
}