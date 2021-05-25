/* tslint:disable */
import * as io from 'socket.io-client';
/**
 * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
 * @module SocketBrowser
 * @license MIT
 * @description
 * This module handle socket connections for web browsers, it will be DI Swapped
 * depending on the platform environment.
 * This module will be generated when the -d ng2web flag is set
 **/
export class SocketBrowser {
  /**
   * @method connect
   * @param  url URL path to connect with the server.
   * @param  options Any socket.io v1 =< valid options
   * @return  Not currently a socket.io-client for web Typings implemented.
   * @description
   * This method will return a valid socket connection.
   **/
  connect(url: string, options: any): any {
    return io(url, options);
  }
}
