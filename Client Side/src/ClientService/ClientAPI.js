import axios from 'axios';
import * as SupportMethods from './SupportMethods.js'
import Config from '../../app.json';

class ServiceClient {
  constructor() {
    this.initializeClient();
  }

  async initializeClient() {
    try {
      this.client = axios.create({
        baseURL: Config.AppEnvironment === 'P' ? Config.ProdURLRest : Config.LocalURLRest,
        timeout: 60000,
        headers: {
          Accept: 'application/json',
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
      if (!this.client) {
        await this.initializeClient();
      }  
      const controllerUri = `${controller}/${action}`;
      const source = axios.CancelToken.source();
      const response = await this.client.post(controllerUri, body, {
        cancelToken: source.token,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error from external endpoint: ${response.status}`);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
      } else if (error.toString().includes('timeout')) {
        return error.toString();
      } else if(error.toString().includes('Network')) {
        return error.toString();
      } else {
        throw new Error(`Error in API request: ${error.message}`);
      }
    }
  }
}

export default ServiceClient;
