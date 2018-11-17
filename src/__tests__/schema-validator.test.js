const schemaValidator = require('../schema-validator');
const fs = require('fs-extra');

it('schema validation succeeds', async () => {
    expect.assertions(1);
    const schema = await fs.readJson('.\\schemas\\config-schema.json').then();
    const example = await fs.readJson('.\\examples\\config-example.json');
    const validation = await schemaValidator(schema, example);
    expect(validation.valid).toBe(true);
});

it('schema validation fails', async () => {
    expect.assertions(1);
    const schema = await fs.readJson('.\\schemas\\config-schema.json').then();
    const negativeExample = await fs.readJson('.\\examples\\config-negative-example.json');
    const validation = await schemaValidator(schema, negativeExample);
    expect(validation.valid).toBe(false);
});