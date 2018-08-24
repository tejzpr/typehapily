import { expect } from 'chai';
import * as Hapi from 'hapi';
process.env.AUTH_ENABLE = 'N';
import { getServer } from '../../src/server';

describe('Setup for Functional Tests', function():void {
  let server: Hapi.Server;
  // Setup Server before testing
  before((done: MochaDone): void => {
    this.timeout(15000);
    getServer().then((serve: Hapi.Server) => {
      server = serve;
      done();
    });
  });

  describe('Controller Tests', async function():Promise<void> {

    it('GET@/ping', async function():Promise<void> {
      const response: any = await server.inject({
        method: 'GET',
        url: '/ping',
        app: {}
      } as Hapi.ServerInjectOptions);
      expect(response.payload).to.be.equals("OK");
    });
  });
});