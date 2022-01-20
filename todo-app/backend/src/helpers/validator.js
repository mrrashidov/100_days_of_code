async function validateInput(schema, input) {
    await schema.validate(input, { abortEarly: false })
    return schema.cast(input)
}

module.exports = validateInput