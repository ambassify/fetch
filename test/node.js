'use strict';

const nock = require('nock');
const assert = require('assert');
const mock = require('mock-require');

describe('node', () => {

    let fetch;
    const backupEnv = process.env;

    beforeEach(() => {
        process.env = Object.create(backupEnv);
        mock.stopAll();
        mock('uuid', {
            v4: () => 'uuid-v4-1234'
        });
    });

    afterEach(() => {
        process.env = backupEnv;
        mock.stopAll();
    });

    it('should set identification headers', async () => {
        process.env.APP_NAME = 'Test 123 (test)';
        const fetch = mock.reRequire('..');

        const reqheaders = {
            'user-agent': 'Ambassify Test 123 (test) - dev@ambassify.com',
            'x-request-id': 'test-123-test+uuid-v4-1234'
        };

        nock('https://test.ambassify.eu', { reqheaders })
            .get('/endpoint')
            .reply(200, {
                resource: 'yes'
            });

        const res = await fetch('https://test.ambassify.eu/endpoint');

        assert.equal(res.status, 200);
    });

});
