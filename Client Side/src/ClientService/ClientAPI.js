import axios from 'axios';
import * as SupportMethods from './SupportMethods.js'
import Config from '../../app.json';

class ServiceClient {
  constructor() {
    this.initializeClient();
  }
h
  async initializeClient() {
    try {
      this.client = axios.create({
        baseURL: Config.AppEnvironment === 'P' ? Config.ProdURLRest : Config.LocalURLRest,
        timeout: 60000,
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await SupportMethods.userToken()}`
        },
      });
    } catch (error) {
      throw new Error(`Error initializing client: ${error.message}`);
    }
  }

  async getDataAsync(controller, action, body) {
    try {      
      const controllerUri = `${controller}/${action}`;
      const response = await this.client.post(controllerUri, body);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error from external endpoint: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error in API request: ${error.message}`);
    }
  }
}

export default ServiceClient;
