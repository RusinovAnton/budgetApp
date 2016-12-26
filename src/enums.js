import appBase from './appBase'

const enumConsts = ['expenseTypes']

const makeEnumPromises = (enumConsts) => enumConsts
    .map(name => appBase
        .get(name)
        .then(snap => ({ name, value: snap })))

let cachedEnums = null

const getEnums = () => {
    if (!cachedEnums) {
        return Promise.all(makeEnumPromises(enumConsts))
            .then(response => {
                const enums = {}
                response.forEach(({ name, value }) => {
                    enums[name] = value
                })
                cachedEnums = enums
                return enums
            })
    } else {
        return Promise.resolve(cachedEnums)
    }
}

export default getEnums()
