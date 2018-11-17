const dockerfileGenerator = require('../dockerfile-generator');
const SchemaValidationError = require('../schema-validation-error');
const fs = require('fs-extra');

it('throws schema validation error', async () => {
    expect.assertions(1);
    const negativeExample = await fs.readJson('./examples/config-negative-example.json');
    await expect(dockerfileGenerator(negativeExample)).rejects.toThrow(SchemaValidationError);
});

it('generates dockerfile successfully', async () => {
    expect.assertions(1);
    const example = await fs.readJson('./examples/config-example.json');
    const result = await dockerfileGenerator(example);
    const dockerFilePath = './out/dockerfile';
    expect(result).toEqual(dockerFilePath);
});